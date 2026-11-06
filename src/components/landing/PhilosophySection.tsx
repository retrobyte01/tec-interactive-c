import React from 'react';
import { Lightbulb, Binary, ShieldCheck } from 'lucide-react';
import { FadeContent } from '../reactbits/FadeContent';

export const PhilosophySection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-[#F2F3F7]/50 dark:via-[#16161D]/50 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <FadeContent>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold mb-6">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>The TEC Philosophy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7] leading-tight mb-8">
            "Programming isn't about memorizing syntax. It's about learning to think."
          </h2>

          <p className="text-base sm:text-lg text-[#777780] dark:text-[#9898A0] leading-relaxed max-w-2xl mx-auto mb-12">
            Syntax is easily looked up. What makes a true engineer is mental modeling — understanding how bits traverse the bus, how memory registers allocate bytes, and how recursive stack frames unwind. TEC strips away the dogma to teach you the mental mechanics of computation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#1C1C24]/60 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-apple-sm">
              <Binary className="w-5 h-5 text-[#007AFF] mb-3" />
              <h4 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                Direct Hardware Clarity
              </h4>
              <p className="text-xs text-[#777780] dark:text-[#9898A0] leading-relaxed">
                See raw byte addresses and heap pointers instead of treating memory as an opaque black box.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#1C1C24]/60 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-apple-sm">
              <Lightbulb className="w-5 h-5 text-[#AF52DE] mb-3" />
              <h4 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                Conceptual Reasoning
              </h4>
              <p className="text-xs text-[#777780] dark:text-[#9898A0] leading-relaxed">
                Every quiz question includes detailed architectural rationales, not just simple answer keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#1C1C24]/60 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] shadow-apple-sm">
              <ShieldCheck className="w-5 h-5 text-[#34C759] mb-3" />
              <h4 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                Zero Boilerplate
              </h4>
              <p className="text-xs text-[#777780] dark:text-[#9898A0] leading-relaxed">
                Experience high-signal C principles directly derived from Dennis Ritchie's foundational handbook.
              </p>
            </div>
          </div>
        </FadeContent>
      </div>
    </section>
  );
};
