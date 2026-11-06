import React from 'react';
import { ArrowRight, Code } from 'lucide-react';
import { FadeContent } from '../reactbits/FadeContent';

interface CtaSectionProps {
  onStartLearning: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartLearning }) => {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto text-center">
      <FadeContent>
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 border border-black/[0.08] dark:border-white/[0.1] bg-gradient-to-b from-white/90 to-[#F2F3F7]/90 dark:from-[#1C1C24]/90 dark:to-[#16161D]/90 backdrop-blur-2xl shadow-apple-lg">
          {/* Subtle accent glows */}
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#007AFF]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-[#AF52DE]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#007AFF]/10 dark:bg-[#007AFF]/20 text-[#007AFF] flex items-center justify-center mb-6 shadow-sm">
              <Code className="w-6 h-6 stroke-[2.2]" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7] mb-4">
              Your first line of C starts here.
            </h2>

            <p className="text-sm sm:text-base text-[#777780] dark:text-[#9898A0] max-w-lg mb-8">
              Join thousands of developers leveling up their low-level programming skills with TEC’s interactive Apple-grade platform.
            </p>

            <button
              onClick={onStartLearning}
              className="flex items-center space-x-2 bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold text-base px-8 py-4 rounded-full shadow-apple-md hover:shadow-apple-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </FadeContent>
    </section>
  );
};
