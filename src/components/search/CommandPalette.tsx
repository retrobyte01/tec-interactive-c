import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, HelpCircle, Code, ChevronRight, X } from 'lucide-react';
import { ALL_LESSONS, COURSE_MODULES } from '../../data/courseData';
import { CODING_EXERCISES } from '../../data/exercisesData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
  onSelectQuiz: (moduleId: string) => void;
  onSelectExercise: (exerciseId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
  onSelectQuiz,
  onSelectExercise
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search lessons
  const matchedLessons = ALL_LESSONS.filter(l =>
    l.title.toLowerCase().includes(trimmed) ||
    l.summary.toLowerCase().includes(trimmed) ||
    l.sections.some(s => s.title.toLowerCase().includes(trimmed) || s.content.toLowerCase().includes(trimmed))
  ).slice(0, 5);

  // Search modules / quizzes
  const matchedModules = COURSE_MODULES.filter(m =>
    m.title.toLowerCase().includes(trimmed) ||
    m.subtitle.toLowerCase().includes(trimmed) ||
    m.description.toLowerCase().includes(trimmed)
  ).slice(0, 3);

  // Search coding exercises
  const matchedExercises = CODING_EXERCISES.filter(ex =>
    ex.title.toLowerCase().includes(trimmed) ||
    ex.category.toLowerCase().includes(trimmed) ||
    ex.description.toLowerCase().includes(trimmed)
  ).slice(0, 3);

  const totalResults = [
    ...matchedLessons.map(l => ({ type: 'lesson' as const, id: l.id, title: l.title, subtitle: `Chapter ${l.chapterNumber} • ${l.readingTimeMinutes} min` })),
    ...matchedModules.map(m => ({ type: 'quiz' as const, id: m.id, title: `${m.title} (Quiz)`, subtitle: `${m.badge} Module Assessment` })),
    ...matchedExercises.map(e => ({ type: 'exercise' as const, id: e.id, title: e.title, subtitle: `Exercise • ${e.difficulty}` }))
  ];

  const handleSelect = (index: number) => {
    const item = totalResults[index];
    if (!item) return;
    if (item.type === 'lesson') onSelectLesson(item.id);
    else if (item.type === 'quiz') onSelectQuiz(item.id);
    else if (item.type === 'exercise') onSelectExercise(item.id);
    onClose();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < totalResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : totalResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white/95 dark:bg-[#1C1C24]/95 backdrop-blur-2xl rounded-2xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
          <Search className="w-5 h-5 text-[#777780] dark:text-[#9898A0] mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, concepts, quizzes, exercises (e.g. pointers, recursion, malloc)..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            className="flex-1 bg-transparent text-[#171719] dark:text-[#F5F5F7] text-base placeholder-[#777780]/60 dark:placeholder-[#9898A0]/60 outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#777780] hover:text-[#171719] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-black/[0.02] dark:divide-white/[0.02]">
          {totalResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#777780] dark:text-[#9898A0]">
              No results found for "{query}". Try searching for variables, loops, pointers, or file I/O.
            </div>
          ) : (
            <div className="space-y-1">
              {totalResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    onClick={() => handleSelect(idx)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all ${
                      isSelected
                        ? 'bg-[#007AFF] text-white shadow-sm'
                        : 'text-[#171719] dark:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#007AFF]'
                        }`}
                      >
                        {item.type === 'lesson' && <BookOpen className="w-4 h-4" />}
                        {item.type === 'quiz' && <HelpCircle className="w-4 h-4" />}
                        {item.type === 'exercise' && <Code className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <div className="font-medium truncate">{item.title}</div>
                        <div
                          className={`text-xs truncate ${
                            isSelected ? 'text-white/80' : 'text-[#777780] dark:text-[#9898A0]'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : 'text-[#777780]/40'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] text-[#777780] dark:text-[#9898A0]">
          <div className="flex items-center space-x-3">
            <span>
              Use <kbd className="px-1 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.1] font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.1] font-mono">↓</kbd> to navigate
            </span>
            <span>
              Press <kbd className="px-1 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.1] font-mono">↵ Enter</kbd> to select
            </span>
          </div>
          <span>
            <kbd className="px-1 py-0.5 rounded bg-black/[0.05] dark:bg-white/[0.1] font-mono">ESC</kbd> to dismiss
          </span>
        </div>
      </div>
    </div>
  );
};
