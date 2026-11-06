import React from 'react';
import {
  Trophy,
  RotateCcw,
  Lock,
  Check
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { ALL_LESSONS } from '../../data/courseData';
import { CountUp } from '../reactbits/CountUp';
import { SpotlightCard } from '../reactbits/SpotlightCard';

export const ProgressView: React.FC = () => {
  const {
    progress,
    achievements,
    getOverallCompletionPercentage,
    getAverageQuizScore,
    resetProgress
  } = useProgress();

  const totalLessons = ALL_LESSONS.length;
  const completedLessons = progress.completedLessonIds.length;
  const overallPercentage = getOverallCompletionPercentage();
  const avgQuizScore = getAverageQuizScore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
          My Learning Progress
        </h1>
        <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
          Detailed metrics, streak records, and unlocked milestone badges.
        </p>
      </div>

      {/* Main Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SpotlightCard className="p-5" spotlightColor="rgba(0, 122, 255, 0.15)">
          <div className="text-xs font-medium text-[#777780] dark:text-[#9898A0] mb-2">
            Completed Lessons
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#171719] dark:text-[#F5F5F7]">
            <CountUp to={completedLessons} /> / {totalLessons}
          </div>
          <div className="w-full bg-black/[0.05] dark:bg-white/[0.08] h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#007AFF] h-full rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5" spotlightColor="rgba(52, 199, 89, 0.15)">
          <div className="text-xs font-medium text-[#777780] dark:text-[#9898A0] mb-2">
            Course Completion
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#34C759]">
            <CountUp to={overallPercentage} />%
          </div>
          <div className="text-[11px] text-[#777780] mt-3">
            Real time progress
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5" spotlightColor="rgba(175, 82, 222, 0.15)">
          <div className="text-xs font-medium text-[#777780] dark:text-[#9898A0] mb-2">
            Quiz Average
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#AF52DE]">
            <CountUp to={avgQuizScore} />%
          </div>
          <div className="text-[11px] text-[#777780] mt-3">
            Knowledge retention
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-5" spotlightColor="rgba(255, 149, 0, 0.15)">
          <div className="text-xs font-medium text-[#777780] dark:text-[#9898A0] mb-2">
            Day Streak
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#FF9500]">
            <CountUp to={progress.streakDays} /> Days
          </div>
          <div className="text-[11px] text-[#777780] mt-3">
            Consistency metric
          </div>
        </SpotlightCard>
      </div>

      {/* Unlockable Achievements Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#171719] dark:text-[#F5F5F7]">
            Milestones & Badges
          </h2>
          <span className="text-xs text-[#777780]">
            {progress.unlockedAchievementIds.length} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = progress.unlockedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-[#1C1C24] border-[#007AFF]/30 shadow-apple-sm'
                    : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.04] dark:border-white/[0.06] opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-[#007AFF] text-white shadow-sm'
                        : 'bg-black/[0.05] dark:bg-white/[0.05] text-[#777780]'
                    }`}
                  >
                    {isUnlocked ? <Trophy className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  {isUnlocked && (
                    <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#34C759] bg-[#34C759]/10 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-[#777780] dark:text-[#9898A0] leading-relaxed">
                  {ach.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7]">
            Reset Learning Data
          </h3>
          <p className="text-xs text-[#777780]">
            Clear completed lessons, streaks, and quiz records on this device.
          </p>
        </div>
        <button
          onClick={resetProgress}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#FF3B30] hover:bg-[#FF3B30]/10 border border-[#FF3B30]/30 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>
    </div>
  );
};
