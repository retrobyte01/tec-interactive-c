import React from 'react';
import { Moon, Database, Info, Check } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const SettingsView: React.FC = () => {
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
          Appearance & Aesthetic
        </h3>
        <p className="text-xs text-[#777780]">
          TEC is exclusively engineered in Apple-grade macOS obsidian dark mode for high code readability and contrast.
        </p>

        <div className="pt-2">
          <div className="inline-flex items-center space-x-3 px-4 py-3 rounded-2xl border border-[#007AFF]/40 bg-[#007AFF]/10 text-[#007AFF]">
            <Moon className="w-5 h-5 text-[#007AFF]" />
            <div>
              <div className="text-xs font-semibold text-[#F5F5F7]">macOS Dark Aesthetic</div>
              <div className="text-[10px] text-[#777780]">Active • Optimized for code syntax highlighting & low eye strain</div>
            </div>
            <Check className="w-4 h-4 text-[#34C759] ml-2" />
          </div>
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
