import React from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { COURSE_MODULES } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';

interface LearningPathViewProps {
  onSelectLesson: (lessonId: string) => void;
  onTakeQuiz: (moduleId: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  onSelectLesson,
  onTakeQuiz
}) => {
  const { getModuleProgressPercentage } = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
          Structured Learning Path
        </h1>
        <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
          From absolute beginner syntax to advanced pointers and dynamic heap management.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-black/[0.08] dark:border-white/[0.1] space-y-10 my-8">
        {COURSE_MODULES.map((mod, index) => {
          const modPct = getModuleProgressPercentage(mod.id);
          const isDone = modPct === 100;
          const isCurrent = !isDone && (index === 0 || getModuleProgressPercentage(COURSE_MODULES[index - 1].id) > 0);

          return (
            <div key={mod.id} className="relative">
              {/* Node indicator */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? 'bg-[#34C759] text-white ring-4 ring-white dark:ring-[#0D0D11]'
                    : isCurrent
                    ? 'bg-[#007AFF] text-white ring-4 ring-[#007AFF]/20 ring-offset-2'
                    : 'bg-[#F2F3F7] dark:bg-[#1C1C24] text-[#777780] border border-black/[0.1] dark:border-white/[0.1]'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
              </div>

              {/* Module Details Card */}
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#007AFF]">
                      Chapter {mod.chapterNumber < 10 ? `0${mod.chapterNumber}` : mod.chapterNumber}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780]">
                      {mod.badge}
                    </span>
                    {mod.hasMiniProject && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#AF52DE]/10 text-[#AF52DE] font-semibold">
                        Mini Project
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#007AFF]">{modPct}% Complete</span>
                </div>

                <h3 className="text-lg font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                  {mod.title}
                </h3>
                <p className="text-xs text-[#777780] dark:text-[#9898A0] mb-4">
                  {mod.description}
                </p>

                {/* Lesson links */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-black/[0.04] dark:border-white/[0.06]">
                  {mod.lessons.map(lesson => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className="px-3 py-1.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-[#007AFF]/10 hover:text-[#007AFF] text-xs font-medium text-[#171719] dark:text-[#F5F5F7] transition-colors flex items-center space-x-1.5"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>{lesson.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => onTakeQuiz(mod.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#AF52DE]/10 hover:bg-[#AF52DE]/20 text-xs font-semibold text-[#AF52DE] transition-colors"
                  >
                    Quiz
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
