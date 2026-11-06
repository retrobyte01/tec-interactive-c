import React from 'react';
import { BookOpenCheck, HelpCircle, Code2, LineChart } from 'lucide-react';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { FadeContent } from '../reactbits/FadeContent';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      title: 'Structured Learning',
      description: 'Learn C step by step, from foundational syntax and types to advanced pointer arithmetic and heap memory management.',
      icon: BookOpenCheck,
      color: '#007AFF',
      tag: 'Step-by-Step'
    },
    {
      title: 'Interactive Quizzes',
      description: 'Test your understanding with carefully designed conceptual questions, code output predictions, and bug hunting.',
      icon: HelpCircle,
      color: '#AF52DE',
      tag: 'Instant Feedback'
    },
    {
      title: 'Hands-on Coding',
      description: 'Practice programming concepts with real C code execution, test cases, sandboxed compiler feedback, and solutions.',
      icon: Code2,
      color: '#32ADE6',
      tag: 'Sandboxed C'
    },
    {
      title: 'Track Your Progress',
      description: 'See how far you have come with real completion metrics, learning streak, unlocked achievements, and quiz score analytics.',
      icon: LineChart,
      color: '#34C759',
      tag: 'Local Persistence'
    }
  ];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <FadeContent>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#007AFF] mb-2">
            Engineered for Mastery
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
            Everything you need to master C with confidence.
          </p>
        </div>
      </FadeContent>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <FadeContent key={feat.title} delay={index * 0.1}>
              <SpotlightCard
                className="p-8 h-full flex flex-col justify-between"
                spotlightColor={`${feat.color}20`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: feat.color }}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780] dark:text-[#9898A0]">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#171719] dark:text-[#F5F5F7] mb-2.5">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#777780] dark:text-[#9898A0] leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center text-xs font-semibold" style={{ color: feat.color }}>
                  <span>Crafted for clarity</span>
                </div>
              </SpotlightCard>
            </FadeContent>
          );
        })}
      </div>
    </section>
  );
};
