import React from 'react';
import { CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { COURSE_MODULES } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';

interface AllCoursesViewProps {
  onSelectLesson: (lessonId: string) => void;
  onTakeQuiz: (moduleId: string) => void;
}

export const AllCoursesView: React.FC<AllCoursesViewProps> = ({
  onSelectLesson,
  onTakeQuiz
}) => {
  const { progress, getModuleProgressPercentage } = useProgress();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
          All Courses & Modules
        </h1>
        <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
          Explore all 11 chapters derived from the comprehensive C handbook.
        </p>
      </div>

      <div className="space-y-6">
        {COURSE_MODULES.map((mod) => {
          const modPct = getModuleProgressPercentage(mod.id);
          return (
            <div
              key={mod.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center space-x-3">
                  <span
                    className="w-9 h-9 rounded-xl text-xs font-bold text-white flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: mod.color }}
                  >
                    {mod.chapterNumber < 10 ? `0${mod.chapterNumber}` : mod.chapterNumber}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#171719] dark:text-[#F5F5F7]">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-[#777780] dark:text-[#9898A0]">
                      {mod.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-semibold text-[#007AFF]">
                    {modPct}% completed
                  </span>
                  <button
                    onClick={() => onTakeQuiz(mod.id)}
                    className="px-3 py-1 rounded-full bg-[#AF52DE]/10 hover:bg-[#AF52DE]/20 text-[#AF52DE] text-xs font-semibold transition-colors flex items-center space-x-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </button>
                </div>
              </div>

              {/* Lesson Items */}
              <div className="space-y-2 mt-4 pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
                {mod.lessons.map((lesson) => {
                  const isDone = progress.completedLessonIds.includes(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#34C759] shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#777780]/40 shrink-0" />
                        )}
                        <span className="text-xs font-semibold text-[#171719] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors truncate">
                          {lesson.title}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-[#777780] shrink-0">
                        <span>{lesson.readingTimeMinutes} min</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
