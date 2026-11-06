import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/search/CommandPalette';
import { HeroSection } from './components/landing/HeroSection';
import { FeatureSection } from './components/landing/FeatureSection';
import { CurriculumPreview } from './components/landing/CurriculumPreview';
import { PhilosophySection } from './components/landing/PhilosophySection';
import { CtaSection } from './components/landing/CtaSection';
import { Sidebar } from './components/dashboard/Sidebar';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { AllCoursesView } from './components/dashboard/AllCoursesView';
import { LearningPathView } from './components/dashboard/LearningPathView';
import { ProgressView } from './components/dashboard/ProgressView';
import { SettingsView } from './components/dashboard/SettingsView';
import { LessonViewer } from './components/lesson/LessonViewer';
import { CodeSandbox } from './components/sandbox/CodeSandbox';
import { BookmarksPage } from './components/bookmarks/BookmarksPage';
import { QuizModal } from './components/quiz/QuizModal';
import { ALL_LESSONS, getLessonById } from './data/courseData';

export const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [activeLessonId, setActiveLessonId] = useState<string>(ALL_LESSONS[0].id);
  const [activeQuizModuleId, setActiveQuizModuleId] = useState<string | null>(null);
  const [sandboxCode, setSandboxCode] = useState<string | undefined>(undefined);
  const [sandboxExerciseId, setSandboxExerciseId] = useState<string>('ex-01');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, activeLessonId]);

  const handleNavigate = (view: string, detail?: string) => {
    if (view === 'curriculum') {
      if (currentView === 'landing') {
        const el = document.getElementById('curriculum-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      setCurrentView('all-courses');
      return;
    }

    if (view === 'lesson' && detail) {
      setActiveLessonId(detail);
      setCurrentView('lesson');
      return;
    }

    if (view === 'sandbox') {
      setCurrentView('sandbox');
      return;
    }

    setCurrentView(view);
  };

  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  const handleOpenQuiz = (moduleId: string) => {
    setActiveQuizModuleId(moduleId);
  };

  const handleOpenSandboxWithCode = (code: string) => {
    setSandboxCode(code);
    setCurrentView('sandbox');
  };

  const handleSelectModuleFromPreview = (moduleId: string) => {
    const lesson = ALL_LESSONS.find(l => l.moduleId === moduleId);
    if (lesson) {
      handleOpenLesson(lesson.id);
    } else {
      setCurrentView('all-courses');
    }
  };

  const activeLesson = getLessonById(activeLessonId) || ALL_LESSONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] dark:bg-[#0D0D11] text-[#171719] dark:text-[#F5F5F7] transition-colors duration-300">
      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={(id) => handleOpenLesson(id)}
        onSelectQuiz={(modId) => handleOpenQuiz(modId)}
        onSelectExercise={(exId) => {
          setSandboxExerciseId(exId);
          setCurrentView('sandbox');
        }}
      />

      {/* Global Quiz Modal */}
      {activeQuizModuleId && (
        <QuizModal
          moduleId={activeQuizModuleId}
          onClose={() => setActiveQuizModuleId(null)}
        />
      )}

      {/* View Render Logic */}
      {currentView === 'landing' ? (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
          <main className="flex-1">
            <HeroSection
              onStartLearning={() => setCurrentView('dashboard')}
              onExploreCurriculum={() => {
                const el = document.getElementById('curriculum-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FeatureSection />
            <CurriculumPreview onSelectModule={handleSelectModuleFromPreview} />
            <PhilosophySection />
            <CtaSection onStartLearning={() => setCurrentView('dashboard')} />
          </main>
          <Footer />
        </>
      ) : (
        /* macOS Platform Interface with Collapsible Sidebar */
        <div className="flex flex-1 min-h-screen">
          <Sidebar
            currentTab={currentView}
            onSelectTab={(tab) => {
              if (tab === 'quizzes') {
                setActiveQuizModuleId(activeLesson.moduleId);
              } else {
                setCurrentView(tab);
              }
            }}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onBackToHome={() => setCurrentView('landing')}
          />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Minimal Application Bar */}
            <header className="sticky top-0 z-30 h-14 bg-white/70 dark:bg-[#16161D]/70 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between px-6">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#777780]">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-[#171719] dark:hover:text-[#F5F5F7] transition-colors"
                >
                  TEC Home
                </button>
                <span>/</span>
                <span className="capitalize text-[#171719] dark:text-[#F5F5F7]">
                  {currentView === 'lesson' ? activeLesson.title : currentView.replace('-', ' ')}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7] transition-colors border border-black/[0.04] dark:border-white/[0.06]"
                >
                  <span>Quick Find</span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/[0.06] dark:bg-white/[0.1]">
                    ⌘K
                  </kbd>
                </button>

                <button
                  onClick={() => handleOpenQuiz(activeLesson.moduleId)}
                  className="px-3.5 py-1.5 rounded-full bg-[#AF52DE]/10 hover:bg-[#AF52DE]/20 text-[#AF52DE] text-xs font-semibold transition-colors"
                >
                  Quiz
                </button>
              </div>
            </header>

            {/* Dashboard Workspace Views */}
            <main className="flex-1 p-4 sm:p-8">
              {currentView === 'dashboard' && (
                <DashboardHome
                  onSelectLesson={handleOpenLesson}
                  onSelectQuiz={handleOpenQuiz}
                  onOpenPractice={() => setCurrentView('sandbox')}
                />
              )}

              {currentView === 'all-courses' && (
                <AllCoursesView
                  onSelectLesson={handleOpenLesson}
                  onTakeQuiz={handleOpenQuiz}
                />
              )}

              {currentView === 'learning-path' && (
                <LearningPathView
                  onSelectLesson={handleOpenLesson}
                  onTakeQuiz={handleOpenQuiz}
                />
              )}

              {currentView === 'lesson' && (
                <LessonViewer
                  lesson={activeLesson}
                  onSelectLesson={handleOpenLesson}
                  onTakeQuiz={handleOpenQuiz}
                  onOpenSandboxWithCode={handleOpenSandboxWithCode}
                  onBackToDashboard={() => setCurrentView('dashboard')}
                />
              )}

              {currentView === 'sandbox' && (
                <CodeSandbox
                  initialCode={sandboxCode}
                  selectedExerciseId={sandboxExerciseId}
                />
              )}

              {currentView === 'bookmarks' && (
                <BookmarksPage onSelectLesson={handleOpenLesson} />
              )}

              {currentView === 'progress' && <ProgressView />}

              {currentView === 'settings' && <SettingsView />}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
