import React from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Aurora } from '../reactbits/Aurora';
import { TechText } from '../reactbits/TechText';
import { useTheme } from '../../context/ThemeContext';

interface HeroSectionProps {
  onStartLearning: () => void;
  onExploreCurriculum: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartLearning,
  onExploreCurriculum
}) => {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Official React Bits Aurora Background (https://reactbits.dev/c/backgrounds/aurora) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Aurora
          colorStops={
            theme === 'dark'
              ? ['#3A29FF', '#FF94B4', '#FF3232']
              : ['#5227FF', '#007AFF', '#7cff67']
          }
          blend={0.5}
          amplitude={1.0}
          speed={0.8}
          lightMode={theme === 'light'}
          className="w-full h-full opacity-80 dark:opacity-60"
        />
      </div>

      {/* Seamless bottom fade mask */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFC] dark:from-[#0E0E12] to-transparent pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/70 dark:bg-[#1C1C24]/70 backdrop-blur-md border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm mb-6 animate-in fade-in duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
          <span className="text-xs font-semibold text-[#171719] dark:text-[#F5F5F7]">
            The Dennis Ritchie Standard • Re-imagined
          </span>
        </div>

        {/* Tech Text: TEC */}
        <div className="mb-3">
          <TechText
            text="TEC"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-[#171719] dark:text-[#F5F5F7] font-black drop-shadow-sm"
            scrambleSpeed={30}
            maxIterations={12}
          />
        </div>

        {/* Tech Text: Learn C. Think Deeper. Build Anything. */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171719] dark:text-[#F5F5F7] max-w-3xl mb-6">
          <TechText
            text={`Learn C.\nThink Deeper.\nBuild Anything.`}
            className="text-center justify-center leading-tight bg-gradient-to-r from-[#171719] via-[#007AFF] to-[#AF52DE] dark:from-[#F5F5F7] dark:via-[#32ADE6] dark:to-[#AF52DE] bg-clip-text text-transparent"
            scrambleSpeed={28}
            maxIterations={16}
          />
        </h1>

        {/* Supporting Description */}
        <p className="text-base sm:text-lg md:text-xl text-[#777780] dark:text-[#9898A0] max-w-2xl mb-10 leading-relaxed font-normal">
          Your journey into programming starts here. Master the C language through
          beautifully structured lessons, interactive memory models, and hands-on compiler challenges.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <button
            onClick={onStartLearning}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#007AFF] hover:bg-[#0062CC] text-white font-semibold text-base px-8 py-3.5 rounded-full shadow-apple-md hover:shadow-apple-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreCurriculum}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-black/[0.04] dark:bg-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-[#171719] dark:text-[#F5F5F7] font-semibold text-base px-8 py-3.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Curriculum</span>
          </button>
        </div>

        {/* Trust / Value statement */}
        <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] font-medium tracking-wide">
          From your first line of code to mastering memory, pointers, and systems.
        </p>
      </div>
    </section>
  );
};
