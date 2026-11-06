import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
  output?: string;
  onRunInSandbox?: (code: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language: _language = 'c',
  title,
  description,
  output,
  onRunInSandbox
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.1] bg-[#1E1E24] text-white shadow-apple-md">
      {/* Code Header Bar (macOS window style) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#17171C] border-b border-white/[0.06]">
        <div className="flex items-center space-x-2">
          {/* macOS 3 traffic lights */}
          <div className="flex items-center space-x-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          {title && (
            <span className="text-xs font-mono text-white/70 truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {onRunInSandbox && (
            <button
              onClick={() => onRunInSandbox(code)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#007AFF] hover:bg-[#0062CC] text-white text-[11px] font-semibold transition-colors"
              title="Open and run in C Sandbox"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Try Code</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white text-[11px] transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#34C759]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Text Body */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed selection:bg-[#007AFF]/30">
        <pre className="text-[#E2E8F0]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Optional Output Terminal Drawer */}
      {output && (
        <div className="border-t border-white/[0.06] bg-[#141418] px-4 py-3 text-xs font-mono">
          <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1 font-sans font-semibold">
            Program Output:
          </div>
          <div className="text-[#34C759] whitespace-pre-wrap">{output}</div>
        </div>
      )}

      {description && (
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.04] text-[11px] text-white/60">
          {description}
        </div>
      )}
    </div>
  );
};
