import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { SoftAurora } from '../reactbits/SoftAurora';
import { TechText } from '../reactbits/TechText';
import { BlurText } from '../reactbits/BlurText';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreCurriculum: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCurriculum
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Mandatory Component 1: Soft Aurora Background */}
      <SoftAurora speed={0.5} opacity={0.7} />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1C1C24]/70 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm mb-6 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
          <span className="text-xs font-semibold text-[#171719] dark:text-[#F5F5F7]">
            The Dennis Ritchie Standard • Re-imagined
          </span>
        </div>

        {/* Mandatory Component 2: Tech Text for Website Name TEC */}
        <div className="mb-3">
          <TechText
            text="TEC"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-[#171719] dark:text-[#F5F5F7] font-black drop-shadow-sm"
            scrambleSpeed={35}
            maxIterations={12}
          />
        </div>

        {/* Apple Headline with Blur Text */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7] max-w-3xl mb-5">
          <BlurText
            text="Learn C. Think Deeper. Build Anything."
            delay={0.03}
            className="justify-center text-center"
          />
        </h1>

        {/* Supporting description */}
        <p className="text-base sm:text-lg md:text-xl text-[#777780] dark:text-[#9898A0] max-w-2xl font-normal leading-relaxed mb-8">
          Your journey into programming starts here. Master C language through beautifully structured lessons, interactive examples, and hands-on challenges.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mb-8">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-apple-md hover:shadow-apple-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreCurriculum}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/80 dark:bg-[#1C1C24]/80 hover:bg-white dark:hover:bg-[#2C2C34] text-[#171719] dark:text-[#F5F5F7] font-semibold text-sm px-7 py-3.5 rounded-full border border-black/[0.08] dark:border-white/[0.1] shadow-apple-sm transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 text-[#007AFF]" />
            <span>Explore Curriculum</span>
          </button>
        </div>

        {/* Trust / Value statement */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
          <span>From your first line of code to mastering memory and pointers.</span>
        </div>
      </div>
    </section>
  );
};
