import React from 'react';
import { Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-[#FAFAFC] dark:bg-[#0D0D11] py-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#777780] dark:text-[#9898A0]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-[#007AFF] flex items-center justify-center text-white">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#171719] dark:text-[#F5F5F7]">TEC</span>
          <span>— The Dennis Ritchie Standard for C Learning</span>
        </div>

        <div className="flex items-center space-x-6">
          <span>11 Core Modules</span>
          <span>Interactive Sandboxed C</span>
          <span>100% Client-Side Persistence</span>
        </div>

        <div className="flex items-center space-x-1">
          <span>© 2026 TEC Platform</span>
        </div>
      </div>
    </footer>
  );
};
