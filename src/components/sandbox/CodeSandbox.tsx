import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  Check,
  Terminal,
  FileCode,
  CornerDownLeft,
  Keyboard
} from 'lucide-react';
import { CODING_EXERCISES } from '../../data/exercisesData';
import type { CodingExercise } from '../../data/exercisesData';
import { executeCCode } from '../../utils/cEngine';
import type { ExecutionResult } from '../../utils/cEngine';
import { useProgress } from '../../context/ProgressContext';
import { Orb } from '../reactbits/Orb';

interface CodeSandboxProps {
  initialCode?: string;
  selectedExerciseId?: string;
}

export const CodeSandbox: React.FC<CodeSandboxProps> = ({
  initialCode,
  selectedExerciseId = 'ex-01'
}) => {
  const { recordExerciseCompletion, progress } = useProgress();

  const [activeExercise, setActiveExercise] = useState<CodingExercise>(() => {
    return CODING_EXERCISES.find(e => e.id === selectedExerciseId) || CODING_EXERCISES[0];
  });

  const [code, setCode] = useState<string>(() => initialCode || activeExercise.starterCode);
  const [stdinText, setStdinText] = useState<string>(() => activeExercise.defaultStdin || '');
  const [showStdinDrawer, setShowStdinDrawer] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState<ExecutionResult | null>(null);
  const [liveStdout, setLiveStdout] = useState<string>('');
  const [showSolution, setShowSolution] = useState(false);
  const [passedAll, setPassedAll] = useState(false);

  // Interactive input state for scanf
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [userInputValue, setUserInputValue] = useState<string>('');
  const inputResolverRef = useRef<((val: string) => void) | null>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);
  const activeInputRef = useRef<HTMLInputElement>(null);

  // When exercise changes
  const handleSelectExercise = (ex: CodingExercise) => {
    setActiveExercise(ex);
    setCode(ex.starterCode);
    setStdinText(ex.defaultStdin || '');
    setOutputResult(null);
    setLiveStdout('');
    setShowSolution(false);
    setPassedAll(false);
    setWaitingForInput(false);
  };

  useEffect(() => {
    if (waitingForInput) {
      setTimeout(() => {
        activeInputRef.current?.focus();
        consoleBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [waitingForInput]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutputResult(null);
    setLiveStdout('');
    setWaitingForInput(false);
    setPassedAll(false);

    try {
      const res = await executeCCode(
        code,
        stdinText,
        (chunk) => {
          setLiveStdout(prev => prev + chunk);
        },
        async (promptHint) => {
          // Pause execution and ask user for interactive input in the console!
          setWaitingForInput(true);
          setInputPrompt(promptHint || 'Enter input for scanf:');
          return new Promise<string>((resolve) => {
            inputResolverRef.current = (enteredVal: string) => {
              setWaitingForInput(false);
              resolve(enteredVal);
            };
          });
        }
      );

      setOutputResult(res);
      setLiveStdout(res.stdout);

      // Check against expected output
      const cleanStdout = res.stdout.trim().replace(/\r\n/g, '\n');
      const cleanExpected = activeExercise.expectedOutput.trim().replace(/\r\n/g, '\n');

      if (cleanStdout.includes(cleanExpected)) {
        setPassedAll(true);
        recordExerciseCompletion(activeExercise.id);
      } else {
        setPassedAll(false);
      }
    } catch (err: unknown) {
      setOutputResult({
        stdout: '',
        stderr: err instanceof Error ? err.message : String(err),
        exitCode: 1,
        executionTimeMs: 0,
        success: false
      });
    } finally {
      setIsRunning(false);
      setWaitingForInput(false);
    }
  };

  const handleSendInput = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputResolverRef.current) return;
    const valToSend = userInputValue.trim();
    setUserInputValue('');
    inputResolverRef.current(valToSend || '0');
  };

  const handleReset = () => {
    setCode(activeExercise.starterCode);
    setStdinText(activeExercise.defaultStdin || '');
    setOutputResult(null);
    setLiveStdout('');
    setPassedAll(false);
    setWaitingForInput(false);
  };



  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Orb Background for Code Sandbox (https://reactbits.dev/c/backgrounds/orb) */}
      <Orb hue={215} hoverIntensity={0.45} className="opacity-60 dark:opacity-40" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#007AFF] uppercase tracking-wider mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive C Sandbox & Compiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
            {activeExercise.title}
          </h1>
        </div>

        {/* Exercise selector pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
          {CODING_EXERCISES.map((ex, index) => {
            const isCurrent = ex.id === activeExercise.id;
            const exDone = progress.completedExerciseIds.includes(ex.id);
            return (
              <button
                key={ex.id}
                onClick={() => handleSelectExercise(ex)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#007AFF] text-white shadow-sm ring-2 ring-[#007AFF]/30'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#777780] hover:text-[#171719] dark:hover:text-white'
                }`}
              >
                {exDone && <Check className="w-3 h-3 text-[#34C759]" />}
                <span className="font-mono text-[10px] opacity-70">Ex {index + 1}:</span>
                <span>{ex.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Split: Left Instructions, Right Editor & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Brief & Instructions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                {activeExercise.category}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780]">
                {activeExercise.difficulty}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#171719] dark:text-[#F5F5F7] mb-2">
              Objective
            </h3>
            <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] leading-relaxed mb-6">
              {activeExercise.description}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171719] dark:text-[#F5F5F7] mb-3">
              Task Checklist:
            </h4>
            <ul className="space-y-2 mb-6">
              {activeExercise.instructions.map((step, i) => (
                <li key={i} className="flex items-start space-x-2 text-xs text-[#777780] dark:text-[#9898A0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] mt-1.5 shrink-0" />
                  <span className="leading-snug">{step}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.06] mb-6">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#777780] mb-1">
                Expected Output:
              </div>
              <div className="text-xs font-mono font-medium text-[#007AFF]">
                {activeExercise.expectedOutput}
              </div>
            </div>

            {/* Hint Dropdown */}
            {activeExercise.hints.length > 0 && (
              <details className="text-xs group">
                <summary className="cursor-pointer font-semibold text-[#777780] hover:text-[#007AFF] transition-colors select-none">
                  Need a hint?
                </summary>
                <div className="mt-2 p-3 rounded-xl bg-[#007AFF]/5 text-[#777780] dark:text-[#9898A0] leading-relaxed">
                  {activeExercise.hints[0]}
                </div>
              </details>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Terminal Output (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          {/* Editor Container with macOS Chrome */}
          <div className="rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#1E1E24] shadow-apple-md">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#17171C] border-b border-white/[0.06]">
              <div className="flex items-center space-x-2.5">
                <div className="flex items-center space-x-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center space-x-1.5 text-xs text-white/70 font-mono">
                  <FileCode className="w-3.5 h-3.5 text-[#007AFF]" />
                  <span>main.c</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-xs transition-colors"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => setShowStdinDrawer(!showStdinDrawer)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    showStdinDrawer || stdinText.trim()
                      ? 'bg-[#007AFF]/20 text-[#007AFF] border border-[#007AFF]/30'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white/80'
                  }`}
                  title="Toggle standard input (stdin) for scanf"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Stdin Input</span>
                  {stdinText.trim() && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]" />
                  )}
                </button>

                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    showSolution
                      ? 'bg-[#AF52DE] text-white'
                      : 'bg-white/[0.06] hover:bg-white/[0.1] text-white/80'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSolution ? 'Hide Solution' : 'View Solution'}</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? (waitingForInput ? 'Waiting Input...' : 'Running...') : 'Run & Test'}</span>
                </button>
              </div>
            </div>

            {/* Optional Pre-run Stdin Drawer */}
            {showStdinDrawer && (
              <div className="p-4 bg-[#141418] border-b border-white/[0.06] text-xs">
                <div className="flex items-center justify-between mb-1.5 text-white/70">
                  <span className="font-semibold text-[11px] text-[#007AFF]">
                    Standard Input (stdin)
                  </span>
                  <span className="text-[10px] text-white/40">
                    Values supplied sequentially to scanf() (separated by spaces or newlines)
                  </span>
                </div>
                <textarea
                  value={stdinText}
                  onChange={(e) => setStdinText(e.target.value)}
                  placeholder="e.g. 12 8 or multiple lines..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl bg-[#1E1E24] border border-white/[0.1] text-white font-mono text-xs outline-none focus:border-[#007AFF]"
                />
              </div>
            )}

            {/* Code Input Area with line numbers */}
            <div className="relative flex min-h-[300px] font-mono text-xs sm:text-sm bg-[#1E1E24]">
              {/* Line Numbers Column */}
              <div className="py-4 px-3 select-none text-right font-mono text-white/30 text-xs bg-[#1A1A1F] border-r border-white/[0.04]">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea for live typing */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 p-4 bg-transparent text-[#E2E8F0] font-mono leading-6 outline-none resize-none selection:bg-[#007AFF]/30"
              />
            </div>
          </div>

          {/* Solution Comparison Accordion */}
          {showSolution && (
            <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#1C1C24]/90 border border-[#AF52DE]/30 shadow-apple-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#AF52DE] uppercase tracking-wider">
                  Reference Solution Code
                </span>
                <button
                  onClick={() => setCode(activeExercise.solutionCode)}
                  className="text-xs font-semibold text-[#007AFF] hover:underline"
                >
                  Copy into Editor
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-[#17171C] text-[#E2E8F0] text-xs font-mono overflow-x-auto">
                <code>{activeExercise.solutionCode}</code>
              </pre>
            </div>
          )}

          {/* Terminal / Output Card */}
          <div className="rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#17171C] text-white shadow-apple-md">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#121216] border-b border-white/[0.06]">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#34C759]" />
                <span className="text-white/80">Execution Console</span>
                {waitingForInput && (
                  <span className="inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-full bg-[#007AFF]/20 text-[#007AFF] animate-pulse">
                    <span>Awaiting scanf input</span>
                  </span>
                )}
              </div>

              {outputResult && (
                <div className="flex items-center space-x-3 text-[11px] font-mono text-white/60">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{outputResult.executionTimeMs}ms</span>
                  </span>
                  <span>Exit: {outputResult.exitCode}</span>
                </div>
              )}
            </div>

            <div className="p-4 min-h-[140px] font-mono text-xs overflow-x-auto">
              {!outputResult && !isRunning && !liveStdout && (
                <div className="text-white/30 italic">
                  Click "Run & Test" to execute. If your code uses scanf(), you can enter inputs interactively right here.
                </div>
              )}

              {/* Streaming Live Stdout */}
              {(liveStdout || isRunning) && (
                <div className="text-[#34C759] whitespace-pre-wrap leading-relaxed">
                  {liveStdout}
                </div>
              )}

              {/* Live Interactive Input Bar right in the console when scanf awaits input! */}
              {waitingForInput && (
                <form
                  onSubmit={handleSendInput}
                  className="mt-3 flex items-center space-x-2 p-2 rounded-xl bg-[#1E1E24] border border-[#007AFF] shadow-apple-sm animate-in fade-in"
                >
                  <span className="text-[#007AFF] font-bold text-xs pl-2">
                    {inputPrompt}
                  </span>
                  <input
                    ref={activeInputRef}
                    type="text"
                    value={userInputValue}
                    onChange={(e) => setUserInputValue(e.target.value)}
                    placeholder="Type value (e.g. 12) & press Enter..."
                    className="flex-1 bg-transparent text-white font-mono text-xs outline-none px-2"
                  />
                  <button
                    type="submit"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Submit</span>
                    <CornerDownLeft className="w-3 h-3" />
                  </button>
                </form>
              )}

              <div ref={consoleBottomRef} />

              {outputResult && (
                <div className="space-y-2 mt-2">
                  {outputResult.stderr && (
                    <div className="text-[#FF453A] whitespace-pre-wrap">
                      {outputResult.stderr}
                    </div>
                  )}

                  {/* Test case validation banner */}
                  <div
                    className={`mt-3 p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      passedAll
                        ? 'bg-[#34C759]/10 border-[#34C759]/30 text-[#34C759]'
                        : 'bg-[#FF9500]/10 border-[#FF9500]/30 text-[#FF9500]'
                    }`}
                  >
                    <div className="flex items-start sm:items-center space-x-2">
                      {passedAll ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34C759] mt-0.5 sm:mt-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-[#FF9500] mt-0.5 sm:mt-0" />
                      )}
                      <div className="text-xs">
                        <span className="font-semibold block sm:inline">
                          {passedAll
                            ? 'Execution verified! All test outputs matched.'
                            : outputResult.exitCode === 0
                            ? 'Program executed successfully (Exit Code 0).'
                            : 'Compilation or Runtime error occurred.'}
                        </span>
                        {!passedAll && (
                          <span className="text-[11px] opacity-80 block sm:inline sm:ml-2">
                            {activeExercise.id === 'ex-01' && (code.includes('scanf') || code.includes('length'))
                              ? 'Tip: You are on Ex 1 (Hello World). Switch to Ex 2 (User Input & Rectangle Area) above to verify this code!'
                              : `Target output for this exercise: "${activeExercise.expectedOutput}"`}
                          </span>
                        )}
                      </div>
                    </div>

                    {passedAll && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#34C759]/20 self-start sm:self-auto">
                        +50 XP
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
