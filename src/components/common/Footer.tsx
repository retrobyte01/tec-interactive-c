import React from 'react';
import { TecLogo } from './TecLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0D0D11] py-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#9898A0]">
        <div className="flex items-center space-x-2.5">
          <TecLogo className="w-6 h-6" />
          <span className="font-bold text-[#F5F5F7]">TEC</span>
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
