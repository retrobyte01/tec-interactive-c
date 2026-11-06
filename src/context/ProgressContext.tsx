import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ALL_LESSONS, COURSE_MODULES } from '../data/courseData';

export interface QuizAttempt {
  moduleId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface UserProgressState {
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  lessonNotes: Record<string, string>;
  quizAttempts: Record<string, QuizAttempt[]>; // moduleId -> attempts
  completedExerciseIds: string[];
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  unlockedAchievementIds: string[];
}

interface ProgressContextType {
  progress: UserProgressState;
  isLessonCompleted: (lessonId: string) => boolean;
  isLessonBookmarked: (lessonId: string) => boolean;
  toggleLessonCompletion: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  saveLessonNote: (lessonId: string, note: string) => void;
  getLessonNote: (lessonId: string) => string;
  recordQuizScore: (moduleId: string, score: number, totalQuestions: number) => void;
  recordExerciseCompletion: (exerciseId: string) => void;
  getModuleProgressPercentage: (moduleId: string) => number;
  getOverallCompletionPercentage: () => number;
  getAverageQuizScore: () => number;
  achievements: Achievement[];
  resetProgress: () => void;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first lesson on TEC.',
    icon: 'Footprints'
  },
  {
    id: 'c-beginner',
    title: 'C Beginner',
    description: 'Complete Chapter 01: Variables, Constants & Keywords.',
    icon: 'Sparkles'
  },
  {
    id: 'loop-virtuoso',
    title: 'Loop Virtuoso',
    description: 'Master while, for, and do-while loops in Chapter 04.',
    icon: 'Repeat'
  },
  {
    id: 'pointer-pro',
    title: 'Pointer Pro',
    description: 'Conquer memory addresses and pointer dereferencing in Chapter 06.',
    icon: 'Crosshair'
  },
  {
    id: 'memory-architect',
    title: 'Memory Architect',
    description: 'Master heap management (malloc, calloc, free) in Chapter 11.',
    icon: 'Cpu'
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score a perfect 100% on any module quiz.',
    icon: 'Trophy'
  },
  {
    id: 'consistent-learner',
    title: 'Consistent Learner',
    description: 'Maintain a multi-day learning streak.',
    icon: 'Flame'
  }
];

const STORAGE_KEY = 'tec_user_learning_progress_v2';

const DEFAULT_STATE: UserProgressState = {
  completedLessonIds: [],
  bookmarkedLessonIds: [],
  lessonNotes: {},
  quizAttempts: {},
  completedExerciseIds: [],
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  unlockedAchievementIds: []
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to parse stored progress:', e);
    }
    return DEFAULT_STATE;
  });

  // Keep streak up to date on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== today) {
      const last = new Date(progress.lastActiveDate);
      const now = new Date(today);
      const diffTime = Math.abs(now.getTime() - last.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = progress.streakDays;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      setProgress(prev => ({
        ...prev,
        lastActiveDate: today,
        streakDays: newStreak
      }));
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save learning progress to localStorage:', e);
    }
  }, [progress]);

  // Check achievements unlock conditions
  useEffect(() => {
    const toUnlock: string[] = [];

    // 1. First Steps
    if (progress.completedLessonIds.length >= 1 && !progress.unlockedAchievementIds.includes('first-steps')) {
      toUnlock.push('first-steps');
    }

    // 2. C Beginner (Chapter 1)
    const ch01Lessons = COURSE_MODULES.find(m => m.id === 'ch01')?.lessons.map(l => l.id) || [];
    if (ch01Lessons.length > 0 && ch01Lessons.every(id => progress.completedLessonIds.includes(id)) && !progress.unlockedAchievementIds.includes('c-beginner')) {
      toUnlock.push('c-beginner');
    }

    // 3. Loop Virtuoso (Chapter 4)
    const ch04Lessons = COURSE_MODULES.find(m => m.id === 'ch04')?.lessons.map(l => l.id) || [];
    if (ch04Lessons.length > 0 && ch04Lessons.every(id => progress.completedLessonIds.includes(id)) && !progress.unlockedAchievementIds.includes('loop-virtuoso')) {
      toUnlock.push('loop-virtuoso');
    }

    // 4. Pointer Pro (Chapter 6)
    const ch06Lessons = COURSE_MODULES.find(m => m.id === 'ch06')?.lessons.map(l => l.id) || [];
    if (ch06Lessons.length > 0 && ch06Lessons.every(id => progress.completedLessonIds.includes(id)) && !progress.unlockedAchievementIds.includes('pointer-pro')) {
      toUnlock.push('pointer-pro');
    }

    // 5. Memory Architect (Chapter 11)
    const ch11Lessons = COURSE_MODULES.find(m => m.id === 'ch11')?.lessons.map(l => l.id) || [];
    if (ch11Lessons.length > 0 && ch11Lessons.every(id => progress.completedLessonIds.includes(id)) && !progress.unlockedAchievementIds.includes('memory-architect')) {
      toUnlock.push('memory-architect');
    }

    // 6. Consistent Learner
    if (progress.streakDays >= 3 && !progress.unlockedAchievementIds.includes('consistent-learner')) {
      toUnlock.push('consistent-learner');
    }

    if (toUnlock.length > 0) {
      setProgress(prev => ({
        ...prev,
        unlockedAchievementIds: [...prev.unlockedAchievementIds, ...toUnlock]
      }));
      // Celebrate with subtle confetti
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#007AFF', '#AF52DE', '#32ADE6', '#34C759']
        });
      } catch {
        // silent
      }
    }
  }, [progress.completedLessonIds, progress.streakDays, progress.unlockedAchievementIds]);

  const isLessonCompleted = (lessonId: string) => progress.completedLessonIds.includes(lessonId);
  const isLessonBookmarked = (lessonId: string) => progress.bookmarkedLessonIds.includes(lessonId);

  const toggleLessonCompletion = (lessonId: string) => {
    setProgress(prev => {
      const exists = prev.completedLessonIds.includes(lessonId);
      const nextCompleted = exists
        ? prev.completedLessonIds.filter(id => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];

      if (!exists) {
        // trigger micro celebration
        try {
          confetti({
            particleCount: 25,
            spread: 40,
            origin: { y: 0.9 },
            colors: ['#007AFF', '#34C759']
          });
        } catch {}
      }

      return {
        ...prev,
        completedLessonIds: nextCompleted
      };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setProgress(prev => {
      const exists = prev.bookmarkedLessonIds.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessonIds: exists
          ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
          : [...prev.bookmarkedLessonIds, lessonId]
      };
    });
  };

  const saveLessonNote = (lessonId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      lessonNotes: {
        ...prev.lessonNotes,
        [lessonId]: note
      }
    }));
  };

  const getLessonNote = (lessonId: string) => progress.lessonNotes[lessonId] || '';

  const recordQuizScore = (moduleId: string, score: number, totalQuestions: number) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const attempt: QuizAttempt = {
      moduleId,
      score,
      totalQuestions,
      percentage,
      timestamp: Date.now()
    };

    setProgress(prev => {
      const existing = prev.quizAttempts[moduleId] || [];
      const updatedAttempts = [...existing, attempt];

      let newAchievements = [...prev.unlockedAchievementIds];
      if (percentage === 100 && !newAchievements.includes('quiz-master')) {
        newAchievements.push('quiz-master');
      }

      return {
        ...prev,
        quizAttempts: {
          ...prev.quizAttempts,
          [moduleId]: updatedAttempts
        },
        unlockedAchievementIds: newAchievements
      };
    });
  };

  const recordExerciseCompletion = (exerciseId: string) => {
    setProgress(prev => {
      if (prev.completedExerciseIds.includes(exerciseId)) return prev;
      return {
        ...prev,
        completedExerciseIds: [...prev.completedExerciseIds, exerciseId]
      };
    });
  };

  const getModuleProgressPercentage = (moduleId: string) => {
    const mod = COURSE_MODULES.find(m => m.id === moduleId);
    if (!mod || mod.lessons.length === 0) return 0;
    const completedCount = mod.lessons.filter(l => progress.completedLessonIds.includes(l.id)).length;
    return Math.round((completedCount / mod.lessons.length) * 100);
  };

  const getOverallCompletionPercentage = () => {
    const total = ALL_LESSONS.length;
    if (total === 0) return 0;
    return Math.round((progress.completedLessonIds.length / total) * 100);
  };

  const getAverageQuizScore = () => {
    const allAttempts = Object.values(progress.quizAttempts).flat();
    if (allAttempts.length === 0) return 0;
    const sum = allAttempts.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / allAttempts.length);
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset your learning progress? This cannot be undone.')) {
      setProgress(DEFAULT_STATE);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const achievements = ALL_ACHIEVEMENTS.map(ach => ({
    ...ach,
    unlockedAt: progress.unlockedAchievementIds.includes(ach.id) ? 1 : undefined
  }));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLessonCompleted,
        isLessonBookmarked,
        toggleLessonCompletion,
        toggleBookmark,
        saveLessonNote,
        getLessonNote,
        recordQuizScore,
        recordExerciseCompletion,
        getModuleProgressPercentage,
        getOverallCompletionPercentage,
        getAverageQuizScore,
        achievements,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
