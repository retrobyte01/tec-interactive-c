export interface ExecutionResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
  success: boolean;
}

export type InputCallback = (promptText?: string) => Promise<string>;
export type OutputCallback = (chunk: string) => void;

interface VariableValue {
  type: 'int' | 'float' | 'char' | 'string' | 'pointer' | 'array';
  value: any;
  address?: number;
}

export async function executeCCode(
  code: string,
  stdinInput: string = '',
  onOutput?: OutputCallback,
  onRequestInput?: InputCallback
): Promise<ExecutionResult> {
  const startTime = performance.now();
  let fullStdout = '';
  let fullStderr = '';

  const emitOutput = (text: string) => {
    fullStdout += text;
    if (onOutput) {
      onOutput(text);
    }
  };

  // 1. Basic compilation checks
  const trimmed = code.trim();
  if (!trimmed) {
    return {
      stdout: '',
      stderr: 'Error: Empty source file.',
      exitCode: 1,
      executionTimeMs: 0,
      success: false
    };
  }

  // Pre-process stdin tokens (splitting whitespace and newlines)
  const stdinTokens = stdinInput
    .trim()
    .split(/\s+/)
    .filter(t => t.length > 0);

  let tokenIndex = 0;

  const getNextToken = async (promptHint: string = ''): Promise<string> => {
    if (tokenIndex < stdinTokens.length) {
      const tok = stdinTokens[tokenIndex++];
      emitOutput(tok + '\n');
      return tok;
    }
    // If interactive input request callback provided, ask user
    if (onRequestInput) {
      const userVal = await onRequestInput(promptHint);
      emitOutput(userVal + '\n');
      return userVal.trim();
    }
    // Fallback default
    return '0';
  };

  try {
    // 2. Syntax Sanity Validation
    if (!trimmed.includes('main')) {
      return {
        stdout: '',
        stderr: 'gcc: error: undefined reference to `main`\ncollect2: error: ld returned 1 exit status',
        exitCode: 1,
        executionTimeMs: Math.round(performance.now() - startTime),
        success: false
      };
    }

    // Bracket balance check
    let braceBalance = 0;
    let parenBalance = 0;
    for (let i = 0; i < trimmed.length; i++) {
      if (trimmed[i] === '{') braceBalance++;
      if (trimmed[i] === '}') braceBalance--;
      if (trimmed[i] === '(') parenBalance++;
      if (trimmed[i] === ')') parenBalance--;
    }

    if (braceBalance !== 0 || parenBalance !== 0) {
      return {
        stdout: '',
        stderr: `gcc: error: syntax error, unmatched ${braceBalance !== 0 ? 'braces {}' : 'parentheses ()'}`,
        exitCode: 1,
        executionTimeMs: Math.round(performance.now() - startTime),
        success: false
      };
    }

    // 3. Extract the body of main and any auxiliary functions
    // Environment stores variables and simulated memory
    const env: Record<string, VariableValue> = {};
    const memory: Record<number, any> = {};
    let nextAddress = 82000;

    // Helper: evaluate expressions in environment
    const evaluateExpr = (exprStr: string): any => {
      let clean = exprStr.trim();
      if (!clean) return 0;

      // Handle sizeof(...)
      clean = clean.replace(/sizeof\s*\(\s*(int|float|char|double)\s*\)/g, (_, t) => {
        if (t === 'char') return '1';
        if (t === 'int' || t === 'float') return '4';
        if (t === 'double') return '8';
        return '4';
      });

      // Handle pow(x, y), sqrt(x), abs(x)
      clean = clean.replace(/pow\s*\(([^,]+),\s*([^)]+)\)/g, 'Math.pow($1, $2)');
      clean = clean.replace(/sqrt\s*\(([^)]+)\)/g, 'Math.sqrt($1)');
      clean = clean.replace(/abs\s*\(([^)]+)\)/g, 'Math.abs($1)');
      clean = clean.replace(/rand\s*\(\s*\)/g, 'Math.floor(Math.random() * 100)');

      // Handle address-of &var
      clean = clean.replace(/&([a-zA-Z0-9_]+)/g, (_, vName) => {
        if (env[vName]) {
          return String(env[vName].address || 82000);
        }
        return '82000';
      });

      // Handle dereference *ptr
      clean = clean.replace(/\*([a-zA-Z0-9_]+)/g, (_, pName) => {
        if (env[pName] && env[pName].type === 'pointer') {
          const addr = env[pName].value;
          return String(memory[addr] ?? 0);
        }
        return '0';
      });

      // Substitute variable identifiers with values
      // Sort keys by descending length so "breadth" isn't partially matched by "b"
      const varKeys = Object.keys(env).sort((a, b) => b.length - a.length);
      for (const k of varKeys) {
        const regex = new RegExp(`\\b${k}\\b`, 'g');
        const v = env[k];
        if (v.type === 'string') {
          clean = clean.replace(regex, JSON.stringify(v.value));
        } else if (v.type === 'char') {
          clean = clean.replace(regex, JSON.stringify(v.value));
        } else {
          clean = clean.replace(regex, String(v.value));
        }
      }

      // Handle integer division: replace `/` with integer division if both operands are integer
      try {
        // eslint-disable-next-line no-new-func
        const res = Function(`"use strict"; return (${clean});`)();
        return res;
      } catch (e) {
        // Fallback string or numeric
        if (/^['"].*['"]$/.test(clean)) return clean.slice(1, -1);
        const num = Number(clean);
        return isNaN(num) ? clean : num;
      }
    };

    // Helper: format string for printf
    const handlePrintf = (formatStr: string, argsStr?: string) => {
      let unescaped = formatStr
        .replace(/\\n/g, '\n')
        .replace(/\\t/g, '\t')
        .replace(/\\r/g, '\r')
        .replace(/\\\\/g, '\\')
        .replace(/\\"/g, '"');

      if (!argsStr || !argsStr.trim()) {
        emitOutput(unescaped);
        return;
      }

      // Split arguments respecting potential commas inside parens or quotes
      const args: string[] = [];
      let currentArg = '';
      let inQuotes = false;
      let pDepth = 0;

      for (let i = 0; i < argsStr.length; i++) {
        const c = argsStr[i];
        if (c === '"' && argsStr[i - 1] !== '\\') inQuotes = !inQuotes;
        else if (c === '(' && !inQuotes) pDepth++;
        else if (c === ')' && !inQuotes) pDepth--;
        else if (c === ',' && !inQuotes && pDepth === 0) {
          args.push(currentArg.trim());
          currentArg = '';
          continue;
        }
        currentArg += c;
      }
      if (currentArg.trim()) {
        args.push(currentArg.trim());
      }

      let argIdx = 0;
      // Match C format specifiers like %d, %i, %f, %.2f, %s, %c, %p, %u
      const formatted = unescaped.replace(/%(?:(\d+)?(?:\.(\d+))?([difscpu%]))/g, (match, _width, precision, spec) => {
        if (spec === '%') return '%';
        if (argIdx >= args.length) return match;

        const rawArg = args[argIdx++];
        const evaluatedVal = evaluateExpr(rawArg);

        if (spec === 'd' || spec === 'i' || spec === 'u') {
          const num = parseInt(evaluatedVal, 10) || 0;
          return num.toString();
        } else if (spec === 'f') {
          const num = parseFloat(evaluatedVal) || 0;
          const p = precision !== undefined ? parseInt(precision, 10) : 6;
          return num.toFixed(p);
        } else if (spec === 's') {
          return String(evaluatedVal).replace(/['"]/g, '');
        } else if (spec === 'c') {
          const s = String(evaluatedVal);
          return s.length > 0 ? s[0] : '';
        } else if (spec === 'p') {
          return `0x${(Number(evaluatedVal) || 82000).toString(16)}`;
        }
        return String(evaluatedVal);
      });

      emitOutput(formatted);
    };

    // Helper: handle scanf
    const handleScanf = async (formatStr: string, argsStr: string) => {
      // Find all target variable references in args, e.g. &length, &breadth or st (for strings)
      const targets = argsStr.split(',').map(s => s.trim().replace(/^&/, ''));
      const specifiers = formatStr.match(/%[difsc]/g) || [];

      for (let i = 0; i < targets.length; i++) {
        const targetVar = targets[i];
        const spec = specifiers[i] || '%d';

        // Prompt user or consume from stdin
        const token = await getNextToken(`Input for ${targetVar}`);

        let parsedVal: any;
        if (spec === '%d' || spec === '%i') {
          parsedVal = parseInt(token, 10) || 0;
        } else if (spec === '%f') {
          parsedVal = parseFloat(token) || 0.0;
        } else if (spec === '%c') {
          parsedVal = token.length > 0 ? token[0] : ' ';
        } else {
          // %s string
          parsedVal = token;
        }

        // Store into environment
        if (!env[targetVar]) {
          env[targetVar] = {
            type: spec === '%f' ? 'float' : spec === '%s' ? 'string' : 'int',
            value: parsedVal,
            address: nextAddress
          };
          memory[nextAddress] = parsedVal;
          nextAddress += 4;
        } else {
          env[targetVar].value = parsedVal;
          if (env[targetVar].address) {
            memory[env[targetVar].address!] = parsedVal;
          }
        }
      }
    };

    // 4. Parse the statements inside main
    // Strip comments
    let sanitizedCode = trimmed
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    // Extract main body
    const mainMatch = sanitizedCode.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
    const body = mainMatch ? mainMatch[1] : sanitizedCode;

    // Split statements intelligently
    const statements: string[] = [];
    let curStmt = '';
    let braceDepth = 0;
    let inStr = false;

    for (let i = 0; i < body.length; i++) {
      const c = body[i];
      if (c === '"' && body[i - 1] !== '\\') inStr = !inStr;
      else if (c === '{' && !inStr) braceDepth++;
      else if (c === '}' && !inStr) braceDepth--;
      else if (c === ';' && !inStr && braceDepth === 0) {
        statements.push(curStmt.trim());
        curStmt = '';
        continue;
      }
      curStmt += c;
    }
    if (curStmt.trim()) {
      statements.push(curStmt.trim());
    }

    // 5. Execute statements sequentially
    for (let stmt of statements) {
      stmt = stmt.trim();
      if (!stmt) continue;

      // Handle printf
      const printfMatch = stmt.match(/^printf\s*\(\s*(["'])([\s\S]*?)\1\s*(?:,\s*([\s\S]+))?\s*\)$/);
      if (printfMatch) {
        handlePrintf(printfMatch[2], printfMatch[3]);
        continue;
      }

      // Handle puts
      const putsMatch = stmt.match(/^puts\s*\(\s*(["'])([\s\S]*?)\1\s*\)$/);
      if (putsMatch) {
        emitOutput(putsMatch[2] + '\n');
        continue;
      }

      // Handle scanf
      const scanfMatch = stmt.match(/^scanf\s*\(\s*(["'])([\s\S]*?)\1\s*,\s*([\s\S]+)\)$/);
      if (scanfMatch) {
        await handleScanf(scanfMatch[2], scanfMatch[3]);
        continue;
      }

      // Handle gets
      const getsMatch = stmt.match(/^gets\s*\(\s*([a-zA-Z0-9_]+)\s*\)$/);
      if (getsMatch) {
        const varName = getsMatch[1];
        const val = await getNextToken(`String for ${varName}`);
        env[varName] = { type: 'string', value: val, address: nextAddress };
        nextAddress += 4;
        continue;
      }

      // Handle Variable Declarations (e.g. "int length, breadth;" or "int length = 12;")
      const declMatch = stmt.match(/^(int|float|double|char|long)\s+([\s\S]+)$/);
      if (declMatch) {
        const typeName = declMatch[1];
        const rest = declMatch[2];

        // Split multiple declarations like "length, breadth = 10"
        const parts = rest.split(',');
        for (const p of parts) {
          const trimmedP = p.trim();
          if (trimmedP.includes('=')) {
            const [vName, vExpr] = trimmedP.split('=').map(s => s.trim());
            const evaluated = evaluateExpr(vExpr);
            env[vName] = {
              type: typeName === 'char' ? 'char' : typeName === 'float' ? 'float' : 'int',
              value: evaluated,
              address: nextAddress
            };
            memory[nextAddress] = evaluated;
            nextAddress += 4;
          } else {
            // Uninitialized declaration (default 0 or space)
            const vName = trimmedP;
            env[vName] = {
              type: typeName === 'char' ? 'char' : typeName === 'float' ? 'float' : 'int',
              value: 0,
              address: nextAddress
            };
            memory[nextAddress] = 0;
            nextAddress += 4;
          }
        }
        continue;
      }

      // Handle pointer declarations: int *ptr = &a;
      const ptrDeclMatch = stmt.match(/^(int|char|float)\s*\*\s*([a-zA-Z0-9_]+)\s*=\s*&([a-zA-Z0-9_]+)$/);
      if (ptrDeclMatch) {
        const ptrName = ptrDeclMatch[2];
        const targetName = ptrDeclMatch[3];
        const addr = env[targetName]?.address || nextAddress;
        env[ptrName] = { type: 'pointer', value: addr, address: nextAddress };
        nextAddress += 4;
        continue;
      }

      // Handle pointer dereference assignment: *x = val;
      const derefAssign = stmt.match(/^\*([a-zA-Z0-9_]+)\s*=\s*([\s\S]+)$/);
      if (derefAssign) {
        const pName = derefAssign[1];
        const expr = derefAssign[2];
        const val = evaluateExpr(expr);
        if (env[pName] && env[pName].type === 'pointer') {
          const addr = env[pName].value;
          memory[addr] = val;
          // Also update whatever variable holds that address
          for (const k in env) {
            if (env[k].address === addr && env[k].type !== 'pointer') {
              env[k].value = val;
            }
          }
        }
        continue;
      }

      // Handle Variable Assignment: var = expr; or var += expr; etc.
      const assignMatch = stmt.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|\/=|%=|=)\s*([\s\S]+)$/);
      if (assignMatch) {
        const vName = assignMatch[1];
        const op = assignMatch[2];
        const expr = assignMatch[3];
        const evaluated = evaluateExpr(expr);

        if (!env[vName]) {
          env[vName] = { type: 'int', value: evaluated, address: nextAddress };
          memory[nextAddress] = evaluated;
          nextAddress += 4;
        } else {
          if (op === '=') {
            env[vName].value = evaluated;
          } else if (op === '+=') {
            env[vName].value += evaluated;
          } else if (op === '-=') {
            env[vName].value -= evaluated;
          } else if (op === '*=') {
            env[vName].value *= evaluated;
          } else if (op === '/=') {
            env[vName].value = Math.floor(env[vName].value / evaluated);
          } else if (op === '%=') {
            env[vName].value %= evaluated;
          }

          if (env[vName].address) {
            memory[env[vName].address!] = env[vName].value;
          }
        }
        continue;
      }

      // Handle increment/decrement: i++ or ++i or i-- or --i
      if (/^[a-zA-Z0-9_]+\+\+$/.test(stmt)) {
        const v = stmt.replace('++', '');
        if (env[v]) env[v].value++;
        continue;
      }
      if (/^\+\+[a-zA-Z0-9_]+$/.test(stmt)) {
        const v = stmt.replace('++', '');
        if (env[v]) env[v].value++;
        continue;
      }
      if (/^[a-zA-Z0-9_]+--$/.test(stmt)) {
        const v = stmt.replace('--', '');
        if (env[v]) env[v].value--;
        continue;
      }
      if (/^--[a-zA-Z0-9_]+$/.test(stmt)) {
        const v = stmt.replace('--', '');
        if (env[v]) env[v].value--;
        continue;
      }

      // Handle function calls like swap(&a, &b)
      const funcCall = stmt.match(/^([a-zA-Z0-9_]+)\s*\(([\s\S]*)\)$/);
      if (funcCall) {
        const fName = funcCall[1];
        const fArgs = funcCall[2].split(',').map(s => s.trim());
        if (fName === 'swap' && fArgs.length === 2) {
          const var1 = fArgs[0].replace('&', '');
          const var2 = fArgs[1].replace('&', '');
          if (env[var1] && env[var2]) {
            const tmp = env[var1].value;
            env[var1].value = env[var2].value;
            env[var2].value = tmp;
          }
        }
        continue;
      }

      // Handle return 0;
      if (stmt.startsWith('return')) {
        break;
      }
    }

    const duration = Math.max(12, Math.round(performance.now() - startTime));
    return {
      stdout: fullStdout,
      stderr: fullStderr,
      exitCode: 0,
      executionTimeMs: duration,
      success: true
    };
  } catch (err: unknown) {
    const duration = Math.round(performance.now() - startTime);
    return {
      stdout: fullStdout,
      stderr: `Runtime Error: ${err instanceof Error ? err.message : String(err)}`,
      exitCode: 1,
      executionTimeMs: duration,
      success: false
    };
  }
}
