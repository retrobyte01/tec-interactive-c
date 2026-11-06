import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Trophy,
  Flame,
  ArrowRight,
  Play,
  Sparkles,
  HelpCircle,
  Code
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { ALL_LESSONS, COURSE_MODULES } from '../../data/courseData';
import { CountUp } from '../reactbits/CountUp';
import { SpotlightCard } from '../reactbits/SpotlightCard';

interface DashboardHomeProps {
  onSelectLesson: (lessonId: string) => void;
  onSelectQuiz: (moduleId: string) => void;
  onOpenPractice: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  onSelectLesson,
  onSelectQuiz,
  onOpenPractice
}) => {
  const {
    progress,
    getOverallCompletionPercentage,
    getAverageQuizScore,
    getModuleProgressPercentage
  } = useProgress();

  const totalLessons = ALL_LESSONS.length;
  const completedCount = progress.completedLessonIds.length;
  const overallPercentage = getOverallCompletionPercentage();
  const avgQuizScore = getAverageQuizScore();

  // Find next uncompleted lesson
  const nextLesson = ALL_LESSONS.find(l => !progress.completedLessonIds.includes(l.id)) || ALL_LESSONS[0];

  // Current active module
  const currentModule = COURSE_MODULES.find(m => m.id === nextLesson.moduleId) || COURSE_MODULES[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#007AFF]/10 via-[#AF52DE]/5 to-transparent border border-black/[0.05] dark:border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-[#007AFF] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back to TEC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
            Your C Programming Journey
          </h1>
          <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
            Continue where you left off. Every concept brings you closer to native systems mastery.
          </p>
        </div>

        {/* Quick action resume button */}
        <button
          onClick={() => onSelectLesson(nextLesson.id)}
          className="flex items-center space-x-2 self-start sm:self-center px-5 py-3 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-apple-md hover:scale-105 active:scale-95 transition-all"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Resume Next Lesson</span>
        </button>
      </div>

      {/* 4 Stat Cards with CountUp */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Completed Lessons */}
        <SpotlightCard className="p-5" spotlightColor="rgba(0, 122, 255, 0.15)">
          <div className="flex items-center justify-between text-[#777780] dark:text-[#9898A0] mb-3">
            <span className="text-xs font-medium">Lessons</span>
            <BookOpen className="w-4 h-4 text-[#007AFF]" />
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#171719] dark:text-[#F5F5F7]">
              <CountUp to={completedCount} />
            </span>
            <span className="text-xs text-[#777780] dark:text-[#9898A0]">/ {totalLessons}</span>
          </div>
          <div className="w-full bg-black/[0.05] dark:bg-white/[0.08] h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#007AFF] h-full rounded-full transition-all duration-700"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </SpotlightCard>

        {/* Overall Completion */}
        <SpotlightCard className="p-5" spotlightColor="rgba(52, 199, 89, 0.15)">
          <div className="flex items-center justify-between text-[#777780] dark:text-[#9898A0] mb-3">
            <span className="text-xs font-medium">Completion</span>
            <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
          </div>
          <div className="flex items-baseline space-x-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#171719] dark:text-[#F5F5F7]">
              <CountUp to={overallPercentage} />
            </span>
            <span className="text-sm font-bold text-[#34C759]">%</span>
          </div>
          <p className="text-[11px] text-[#777780] dark:text-[#9898A0] mt-3">
            {overallPercentage === 100 ? 'Course completed!' : `${totalLessons - completedCount} lessons remaining`}
          </p>
        </SpotlightCard>

        {/* Quiz Avg Score */}
        <SpotlightCard className="p-5" spotlightColor="rgba(175, 82, 222, 0.15)">
          <div className="flex items-center justify-between text-[#777780] dark:text-[#9898A0] mb-3">
            <span className="text-xs font-medium">Quiz Avg</span>
            <Trophy className="w-4 h-4 text-[#AF52DE]" />
          </div>
          <div className="flex items-baseline space-x-0.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#171719] dark:text-[#F5F5F7]">
              <CountUp to={avgQuizScore} />
            </span>
            <span className="text-sm font-bold text-[#AF52DE]">%</span>
          </div>
          <p className="text-[11px] text-[#777780] dark:text-[#9898A0] mt-3">
            Across attempted modules
          </p>
        </SpotlightCard>

        {/* Learning Streak */}
        <SpotlightCard className="p-5" spotlightColor="rgba(255, 149, 0, 0.15)">
          <div className="flex items-center justify-between text-[#777780] dark:text-[#9898A0] mb-3">
            <span className="text-xs font-medium">Daily Streak</span>
            <Flame className="w-4 h-4 text-[#FF9500] fill-current" />
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#171719] dark:text-[#F5F5F7]">
              <CountUp to={progress.streakDays} />
            </span>
            <span className="text-xs font-semibold text-[#FF9500]">Days</span>
          </div>
          <p className="text-[11px] text-[#777780] dark:text-[#9898A0] mt-3">
            Active today
          </p>
        </SpotlightCard>
      </div>

      {/* Main Learning Hub Split: Recommended Next Lesson & Current Module */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Next Lesson Card (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                Recommended Next
              </span>
              <span className="text-xs text-[#777780] dark:text-[#9898A0]">
                {nextLesson.readingTimeMinutes} min read
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#171719] dark:text-[#F5F5F7] mb-2">
              {nextLesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] leading-relaxed mb-6">
              {nextLesson.summary}
            </p>

            {/* Key Objectives Preview */}
            <div className="space-y-2 mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777780] dark:text-[#9898A0]">
                What you'll master:
              </span>
              <ul className="text-xs text-[#171719] dark:text-[#F5F5F7] space-y-1.5">
                {nextLesson.objectives.slice(0, 3).map((obj, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] mt-1.5 shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-[#777780]">
              Chapter {nextLesson.chapterNumber} • {currentModule.title}
            </span>
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="flex items-center space-x-1.5 text-xs font-bold text-[#007AFF] hover:text-[#0062CC] transition-colors"
            >
              <span>Begin Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Current Module Status & Quiz Card (1 col) */}
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#AF52DE]">
                Active Module
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780]">
                {currentModule.badge}
              </span>
            </div>

            <h4 className="text-lg font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
              {currentModule.title}
            </h4>
            <p className="text-xs text-[#777780] dark:text-[#9898A0] mb-4">
              {currentModule.subtitle}
            </p>

            {/* Module progress bar */}
            <div className="space-y-1.5 mb-6">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-[#777780]">Module Completion</span>
                <span className="text-[#007AFF] font-bold">
                  {getModuleProgressPercentage(currentModule.id)}%
                </span>
              </div>
              <div className="w-full bg-black/[0.05] dark:bg-white/[0.08] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#007AFF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${getModuleProgressPercentage(currentModule.id)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-black/[0.04] dark:border-white/[0.06]">
            <button
              onClick={() => onSelectQuiz(currentModule.id)}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#AF52DE]/10 hover:bg-[#AF52DE]/20 text-[#AF52DE] text-xs font-semibold transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Take Chapter Quiz</span>
            </button>

            <button
              onClick={onOpenPractice}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] hover:bg-black/[0.06] text-[#171719] dark:text-[#F5F5F7] text-xs font-semibold transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Open Code Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Roadmap Modules list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#171719] dark:text-[#F5F5F7]">
            All 11 Handbook Modules
          </h3>
          <span className="text-xs text-[#777780] dark:text-[#9898A0]">
            Dennis Ritchie C Specification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSE_MODULES.map((mod) => {
            const modPercentage = getModuleProgressPercentage(mod.id);
            const isFinished = modPercentage === 100;
            return (
              <div
                key={mod.id}
                onClick={() => onSelectLesson(mod.lessons[0].id)}
                className="group p-5 rounded-2xl bg-white/70 dark:bg-[#1C1C24]/70 backdrop-blur-xl border border-black/[0.05] dark:border-white/[0.08] hover:border-[#007AFF]/40 hover:shadow-apple-md cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: mod.color }}
                  >
                    {mod.chapterNumber < 10 ? `0${mod.chapterNumber}` : mod.chapterNumber}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780]">
                    {mod.badge}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] group-hover:text-[#007AFF] transition-colors line-clamp-1 mb-1">
                  {mod.title}
                </h4>
                <p className="text-xs text-[#777780] dark:text-[#9898A0] line-clamp-2 mb-4">
                  {mod.subtitle}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px]">
                  <span className="text-[#777780]">
                    {mod.lessons.length} {mod.lessons.length === 1 ? 'lesson' : 'lessons'}
                  </span>
                  <span
                    className={`font-semibold ${
                      isFinished ? 'text-[#34C759]' : 'text-[#007AFF]'
                    }`}
                  >
                    {isFinished ? 'Completed' : `${modPercentage}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
