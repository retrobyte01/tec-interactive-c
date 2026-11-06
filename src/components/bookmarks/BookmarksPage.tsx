import React, { useState } from 'react';
import {
  Bookmark,
  Edit3,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { getLessonById } from '../../data/courseData';

interface BookmarksPageProps {
  onSelectLesson: (lessonId: string) => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({ onSelectLesson }) => {
  const { progress, toggleBookmark } = useProgress();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'notes'>('bookmarks');

  const bookmarkedLessons = progress.bookmarkedLessonIds
    .map(id => getLessonById(id))
    .filter((l): l is NonNullable<typeof l> => l !== undefined);

  const notesList = Object.entries(progress.lessonNotes)
    .filter(([_, note]) => note.trim().length > 0)
    .map(([lessonId, note]) => ({
      lesson: getLessonById(lessonId),
      note
    }))
    .filter(item => item.lesson !== undefined);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
            Saved Resources & Notes
          </h1>
          <p className="text-xs sm:text-sm text-[#777780] dark:text-[#9898A0] mt-1">
            Access your bookmarked C chapters and personal study notes in one unified hub.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04]">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-white dark:bg-[#2C2C34] text-[#007AFF] shadow-sm'
                : 'text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7]'
            }`}
          >
            Bookmarks ({bookmarkedLessons.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'notes'
                ? 'bg-white dark:bg-[#2C2C34] text-[#AF52DE] shadow-sm'
                : 'text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7]'
            }`}
          >
            Study Notes ({notesList.length})
          </button>
        </div>
      </div>

      {activeTab === 'bookmarks' ? (
        bookmarkedLessons.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/70 dark:bg-[#1C1C24]/70 border border-black/[0.06] dark:border-white/[0.08]">
            <Bookmark className="w-10 h-10 text-[#777780]/40 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
              No bookmarked lessons yet
            </h3>
            <p className="text-xs text-[#777780] max-w-sm mx-auto">
              Click the bookmark icon in any lesson to pin essential chapters and review them quickly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarkedLessons.map(lesson => (
              <div
                key={lesson.id}
                className="p-5 rounded-2xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                      Chapter {lesson.chapterNumber}
                    </span>
                    <button
                      onClick={() => toggleBookmark(lesson.id)}
                      className="text-[#777780] hover:text-[#FF3B30] transition-colors"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-[#171719] dark:text-[#F5F5F7] mb-2 line-clamp-1">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-[#777780] dark:text-[#9898A0] line-clamp-2 mb-4">
                    {lesson.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-[#777780]">
                    {lesson.readingTimeMinutes} min read
                  </span>
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="flex items-center space-x-1 text-xs font-bold text-[#007AFF] hover:text-[#0062CC]"
                  >
                    <span>Read Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : notesList.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/70 dark:bg-[#1C1C24]/70 border border-black/[0.06] dark:border-white/[0.08]">
          <Edit3 className="w-10 h-10 text-[#777780]/40 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
            No study notes taken yet
          </h3>
          <p className="text-xs text-[#777780] max-w-sm mx-auto">
            You can write personal study notes directly inside any lesson using the edit pencil icon.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notesList.map(({ lesson, note }) => {
            if (!lesson) return null;
            return (
              <div
                key={lesson.id}
                className="p-5 rounded-2xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#AF52DE]">
                      Chapter {lesson.chapterNumber}
                    </span>
                    <span className="text-xs font-medium text-[#171719] dark:text-[#F5F5F7]">
                      {lesson.title}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="text-xs text-[#007AFF] hover:underline"
                  >
                    Go to lesson →
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] text-xs text-[#171719] dark:text-[#F5F5F7] whitespace-pre-wrap font-mono">
                  {note}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
