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

function formatCPrintf(formatStr: string, ...args: any[]): string {
  const unescaped = String(formatStr)
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\\\/g, '\\')
    .replace(/\\"/g, '"');

  let argIdx = 0;
  return unescaped.replace(/%(?:(\d+)?(?:\.(\d+))?([difscpu%]))/g, (match, _width, precision, spec) => {
    if (spec === '%') return '%';
    if (argIdx >= args.length) return match;
    const val = args[argIdx++];
    if (spec === 'd' || spec === 'i' || spec === 'u') {
      const num = parseInt(val, 10);
      return isNaN(num) ? '0' : num.toString();
    } else if (spec === 'f') {
      const num = parseFloat(val);
      const p = precision !== undefined ? parseInt(precision, 10) : 6;
      return isNaN(num) ? '0.00' : num.toFixed(p);
    } else if (spec === 's') {
      return String(val ?? '').replace(/^['"]|['"]$/g, '');
    } else if (spec === 'c') {
      const s = String(val ?? '');
      return s.length > 0 ? s[0] : '';
    } else if (spec === 'p') {
      return `0x${(Number(val) || 82000).toString(16)}`;
    }
    return String(val);
  });
}

function transpileC(cCode: string): string {
  let js = cCode;

  // 1. Strip comments
  js = js.replace(/\/\*[\s\S]*?\*\//g, '');
  js = js.replace(/\/\/.*$/gm, '');

  // 2. Strip includes
  js = js.replace(/^\s*#include\s+<[^>]+>\s*$/gm, '');
  js = js.replace(/^\s*#include\s+"[^"]+"\s*$/gm, '');

  // 3. Constants: #define PI 3.14159
  js = js.replace(/^\s*#define\s+([a-zA-Z0-9_]+)\s+([\s\S]+)$/gm, 'const $1 = $2;');

  // 4. Struct declarations & definitions
  js = js.replace(/struct\s+[a-zA-Z0-9_]+\s*\{[\s\S]*?\};/g, '');
  js = js.replace(/struct\s+[a-zA-Z0-9_]+\s+([a-zA-Z0-9_]+)\s*=\s*\{([^}]+)\};/g, (_, name, vals) => {
    const parts = vals.split(',').map((s: string) => s.trim());
    return `let ${name} = { x: ${parts[0] || 0}, y: ${parts[1] || 0} };`;
  });

  // 5. Functions defined above/outside main
  js = js.replace(/\b(int|float|double|char|long|void)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)\s*\{/g, (_, __, fnName, args) => {
    if (fnName === 'main') {
      return `async function main() {`;
    }
    const cleanedArgs = args.split(',').map((a: string) => {
      const parts = a.trim().split(/\s+/);
      return parts[parts.length - 1]?.replace(/[*&]/g, '') || '';
    }).filter(Boolean).join(', ');
    return `function ${fnName}(${cleanedArgs}) {`;
  });

  // 6. Direct variable declarations: int i = 0; -> let i = 0;
  js = js.replace(/\b(int|float|double|char|long|unsigned)\s+([a-zA-Z0-9_]+)\s*(\[[^\]]*\])?\s*=/g, 'let $2 =');
  js = js.replace(/\b(int|float|double|char|long|unsigned)\s+([a-zA-Z0-9_]+)\s*(\[[^\]]*\])?\s*;/g, 'let $2 = 0;');

  // 7. Multi-variable declarations: int a = 10, b = 20;
  js = js.replace(/\b(int|float|double|char|long)\s+([a-zA-Z0-9_,\s=]+);/g, (_, __, rest) => {
    const parts = rest.split(',').map((p: string) => {
      const trimmed = p.trim();
      return trimmed.includes('=') ? trimmed : `${trimmed} = 0`;
    });
    return `let ${parts.join(', ')};`;
  });

  // 8. Pointer declarations
  js = js.replace(/\b(int|float|char)\s*\*\s*([a-zA-Z0-9_]+)\s*=\s*&([a-zA-Z0-9_]+);/g, 'let $2 = { get val() { return $3; }, set val(v) { $3 = v; } };');

  // 9. Scanf transformations
  js = js.replace(/scanf\s*\(\s*(["'])([\s\S]*?)\1\s*,\s*&([a-zA-Z0-9_]+)\s*\);/g, '$3 = await __scanf_single($1$2$1, "$3");');

  // 10. Printf & Puts
  js = js.replace(/\bprintf\s*\(/g, '__printf(');
  js = js.replace(/\bputs\s*\(([^)]+)\);/g, '__printf("%s\\n", $1);');

  // 11. Malloc & free
  js = js.replace(/\([a-zA-Z0-9_* ]+\)\s*malloc\s*\(([^)]+)\)/g, 'new Array(10).fill(0)');
  js = js.replace(/\bfree\s*\([^)]*\);/g, '');

  return js;
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

  const emitError = (text: string) => {
    fullStderr += text;
  };

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

  // Pre-process stdin tokens
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
    if (onRequestInput) {
      const userVal = await onRequestInput(promptHint);
      emitOutput(userVal + '\n');
      return userVal.trim();
    }
    return '0';
  };

  // Syntax Sanity Validation
  if (!trimmed.includes('main')) {
    return {
      stdout: '',
      stderr: 'gcc: error: undefined reference to `main`\ncollect2: error: ld returned 1 exit status',
      exitCode: 1,
      executionTimeMs: Math.round(performance.now() - startTime),
      success: false
    };
  }

  // 1. Try Modern Transpiled Execution Runner
  try {
    const jsTranspiled = transpileC(trimmed);
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

    const __printf = (format: string, ...args: any[]) => {
      const formatted = formatCPrintf(format, ...args);
      emitOutput(formatted);
    };

    const __scanf_single = async (format: string, targetVar: string) => {
      const tok = await getNextToken(`Input for ${targetVar}`);
      if (format.includes('%f')) return parseFloat(tok) || 0.0;
      if (format.includes('%s')) return tok;
      if (format.includes('%c')) return tok[0] || ' ';
      return parseInt(tok, 10) || 0;
    };

    const runner = new AsyncFunction('__printf', '__scanf_single', `
      ${jsTranspiled}
      if (typeof main === 'function') {
        return await main();
      }
    `);

    await runner(__printf, __scanf_single);

    const duration = Math.max(12, Math.round(performance.now() - startTime));
    return {
      stdout: fullStdout,
      stderr: fullStderr,
      exitCode: 0,
      executionTimeMs: duration,
      success: true
    };
  } catch (_transpileError) {
    // 2. Fallback to Statement-by-Statement Interpreter
    try {
      const env: Record<string, VariableValue> = {};
      const memory: Record<number, any> = {};
      let nextAddress = 82000;

      const evaluateExpr = (exprStr: string): any => {
        let clean = exprStr.trim();
        if (!clean) return 0;

        clean = clean.replace(/sizeof\s*\(\s*(int|float|char|double)\s*\)/g, (_, t) => {
          if (t === 'char') return '1';
          return '4';
        });

        const varKeys = Object.keys(env).sort((a, b) => b.length - a.length);
        for (const k of varKeys) {
          const regex = new RegExp(`\\b${k}\\b`, 'g');
          const v = env[k];
          if (v.type === 'string' || v.type === 'char') {
            clean = clean.replace(regex, JSON.stringify(v.value));
          } else {
            clean = clean.replace(regex, String(v.value));
          }
        }

        try {
          // eslint-disable-next-line no-new-func
          return Function(`"use strict"; return (${clean});`)();
        } catch {
          const num = Number(clean);
          return isNaN(num) ? clean : num;
        }
      };

      const handlePrintf = (formatStr: string, argsStr?: string) => {
        const args: any[] = [];
        if (argsStr && argsStr.trim()) {
          const rawArgs = argsStr.split(',').map(s => s.trim());
          for (const a of rawArgs) {
            args.push(evaluateExpr(a));
          }
        }
        emitOutput(formatCPrintf(formatStr, ...args));
      };

      const handleScanf = async (formatStr: string, argsStr: string) => {
        const targets = argsStr.split(',').map(s => s.trim().replace(/^&/, ''));
        const specifiers = formatStr.match(/%[difsc]/g) || [];

        for (let i = 0; i < targets.length; i++) {
          const targetVar = targets[i];
          const spec = specifiers[i] || '%d';
          const token = await getNextToken(`Input for ${targetVar}`);
          let parsedVal: any = parseInt(token, 10) || 0;
          if (spec === '%f') parsedVal = parseFloat(token) || 0.0;
          else if (spec === '%c') parsedVal = token.length > 0 ? token[0] : ' ';
          else if (spec === '%s') parsedVal = token;

          env[targetVar] = {
            type: spec === '%f' ? 'float' : spec === '%s' ? 'string' : 'int',
            value: parsedVal,
            address: nextAddress
          };
          memory[nextAddress] = parsedVal;
          nextAddress += 4;
        }
      };

      let sanitizedCode = trimmed
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '');

      const mainMatch = sanitizedCode.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
      const body = mainMatch ? mainMatch[1] : sanitizedCode;

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
      if (curStmt.trim()) statements.push(curStmt.trim());

      for (let stmt of statements) {
        stmt = stmt.trim();
        if (!stmt) continue;

        const printfMatch = stmt.match(/^printf\s*\(\s*(["'])([\s\S]*?)\1\s*(?:,\s*([\s\S]+))?\s*\)$/);
        if (printfMatch) {
          handlePrintf(printfMatch[2], printfMatch[3]);
          continue;
        }

        const scanfMatch = stmt.match(/^scanf\s*\(\s*(["'])([\s\S]*?)\1\s*,\s*([\s\S]+)\)$/);
        if (scanfMatch) {
          await handleScanf(scanfMatch[2], scanfMatch[3]);
          continue;
        }

        const declMatch = stmt.match(/^(int|float|double|char|long)\s+([\s\S]+)$/);
        if (declMatch) {
          const typeName = declMatch[1];
          const parts = declMatch[2].split(',');
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
              env[trimmedP] = {
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

        const assignMatch = stmt.match(/^([a-zA-Z0-9_]+)\s*(\+=|-=|\*=|\/=|%=|=)\s*([\s\S]+)$/);
        if (assignMatch) {
          const vName = assignMatch[1];
          const op = assignMatch[2];
          const evaluated = evaluateExpr(assignMatch[3]);
          if (!env[vName]) {
            env[vName] = { type: 'int', value: evaluated, address: nextAddress };
            memory[nextAddress] = evaluated;
            nextAddress += 4;
          } else {
            if (op === '=') env[vName].value = evaluated;
            else if (op === '+=') env[vName].value += evaluated;
            else if (op === '-=') env[vName].value -= evaluated;
            else if (op === '*=') env[vName].value *= evaluated;
          }
          continue;
        }

        if (stmt.startsWith('return')) break;
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
      emitError(err instanceof Error ? err.message : String(err));
      return {
        stdout: fullStdout,
        stderr: fullStderr,
        exitCode: 1,
        executionTimeMs: Math.round(performance.now() - startTime),
        success: false
      };
    }
  }
}
