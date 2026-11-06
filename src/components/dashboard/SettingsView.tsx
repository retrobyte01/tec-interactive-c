import React from 'react';
import { Sun, Moon, Database, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';

export const SettingsView: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { progress } = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
          Platform Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
          Preferences, theme mode, and local storage state.
        </p>
      </div>

      {/* Appearance Section */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm space-y-4">
        <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7]">
          Appearance & macOS Theme
        </h3>
        <p className="text-xs text-[#777780]">
          Select between light and macOS-inspired dark surface themes.
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-sm pt-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
              theme === 'light'
                ? 'border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF]'
                : 'border-black/[0.06] dark:border-white/[0.08] text-[#777780]'
            }`}
          >
            <Sun className="w-5 h-5" />
            <span className="text-xs font-semibold">Light Mode</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-all ${
              theme === 'dark'
                ? 'border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF]'
                : 'border-black/[0.06] dark:border-white/[0.08] text-[#777780]'
            }`}
          >
            <Moon className="w-5 h-5" />
            <span className="text-xs font-semibold">Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Persistence & Architecture Info */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-[#007AFF]" />
          <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7]">
            Client-Side State Storage
          </h3>
        </div>
        <p className="text-xs text-[#777780] leading-relaxed">
          TEC stores your active progress, bookmarked lessons, study notes, quiz scores, and streak data using browser LocalStorage. No account or backend database is required for individual study.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span className="text-[#777780]">Completed: </span>
            <span className="font-bold text-[#171719] dark:text-[#F5F5F7]">{progress.completedLessonIds.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span className="text-[#777780]">Bookmarks: </span>
            <span className="font-bold text-[#171719] dark:text-[#F5F5F7]">{progress.bookmarkedLessonIds.length}</span>
          </div>
          <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span className="text-[#777780]">Notes: </span>
            <span className="font-bold text-[#171719] dark:text-[#F5F5F7]">{Object.keys(progress.lessonNotes).length}</span>
          </div>
          <div className="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span className="text-[#777780]">Badges: </span>
            <span className="font-bold text-[#34C759]">{progress.unlockedAchievementIds.length}</span>
          </div>
        </div>
      </div>

      {/* Attribution & Curriculum Provenance */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-[#AF52DE]" />
          <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7]">
            Curriculum Specification
          </h3>
        </div>
        <p className="text-xs text-[#777780] leading-relaxed">
          The content throughout TEC is generated directly from Dennis Ritchie's foundational standard and "The Ultimate C Handbook" markdown guide, incorporating all 11 chapters from basic variables through pointers, arrays, structures, file I/O, dynamic memory allocation, and mini-projects.
        </p>
      </div>
    </div>
  );
};
