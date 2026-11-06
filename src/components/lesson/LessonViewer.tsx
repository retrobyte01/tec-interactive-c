import React, { useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Info,
  Check,
  ChevronRight,
  Edit3,
  Code2
} from 'lucide-react';
import type { Lesson } from '../../data/courseData';
import { getAdjacentLessons, getModuleById } from '../../data/courseData';
import { useProgress } from '../../context/ProgressContext';
import { CodeBlock } from './CodeBlock';

interface LessonViewerProps {
  lesson: Lesson;
  onSelectLesson: (lessonId: string) => void;
  onTakeQuiz: (moduleId: string) => void;
  onOpenSandboxWithCode: (code: string) => void;
  onBackToDashboard: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onSelectLesson,
  onTakeQuiz,
  onOpenSandboxWithCode,
  onBackToDashboard
}) => {
  const {
    isLessonCompleted,
    isLessonBookmarked,
    toggleLessonCompletion,
    toggleBookmark,
    getLessonNote,
    saveLessonNote
  } = useProgress();

  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteContent, setNoteContent] = useState(() => getLessonNote(lesson.id));

  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isLessonBookmarked(lesson.id);
  const moduleInfo = getModuleById(lesson.moduleId);
  const { prev, next } = getAdjacentLessons(lesson.id);

  const handleSaveNote = () => {
    saveLessonNote(lesson.id, noteContent);
    setIsEditingNote(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-1.5 text-xs font-semibold text-[#777780] hover:text-[#171719] dark:hover:text-[#F5F5F7] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-[#777780]">
          <span>Chapter {lesson.chapterNumber}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#171719] dark:text-[#F5F5F7] truncate max-w-xs">
            {lesson.title}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(lesson.id)}
            className={`p-2 rounded-xl border transition-colors ${
              bookmarked
                ? 'bg-[#007AFF]/10 border-[#007AFF]/30 text-[#007AFF]'
                : 'bg-black/[0.03] dark:bg-white/[0.05] border-transparent text-[#777780] hover:text-[#171719]'
            }`}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Personal Note Button */}
          <button
            onClick={() => setIsEditingNote(!isEditingNote)}
            className={`p-2 rounded-xl border transition-colors ${
              getLessonNote(lesson.id)
                ? 'bg-[#AF52DE]/10 border-[#AF52DE]/30 text-[#AF52DE]'
                : 'bg-black/[0.03] dark:bg-white/[0.05] border-transparent text-[#777780] hover:text-[#171719]'
            }`}
            title="Add or edit your personal notes"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Personal Note Editor (Collapsible) */}
      {isEditingNote && (
        <div className="mb-8 p-5 rounded-2xl bg-white dark:bg-[#1C1C24] border border-[#AF52DE]/30 shadow-apple-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#AF52DE] uppercase tracking-wider">
              Personal Study Note
            </span>
            <span className="text-[11px] text-[#777780]">Saved automatically to your device</span>
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write key memory addresses, questions, or C gotchas you want to remember..."
            className="w-full h-24 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] text-xs text-[#171719] dark:text-[#F5F5F7] outline-none focus:border-[#AF52DE] resize-none"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setIsEditingNote(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-[#777780] hover:text-[#171719]"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-4 py-1.5 rounded-lg bg-[#AF52DE] hover:bg-[#9E3FCF] text-white text-xs font-semibold shadow-sm"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Lesson Header Banner */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
            Chapter {lesson.chapterNumber} • {moduleInfo?.title}
          </span>
          <span className="flex items-center space-x-1 text-xs text-[#777780] px-2 py-0.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{lesson.readingTimeMinutes} min read</span>
          </span>
          {completed && (
            <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#34C759]/15 text-[#34C759]">
              <Check className="w-3.5 h-3.5" />
              <span>Completed</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171719] dark:text-[#F5F5F7] mb-4">
          {lesson.title}
        </h1>

        <p className="text-base text-[#777780] dark:text-[#9898A0] leading-relaxed">
          {lesson.summary}
        </p>
      </header>

      {/* Learning Objectives Box */}
      <div className="mb-12 p-6 rounded-2xl bg-white/80 dark:bg-[#1C1C24]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.08] shadow-apple-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-3">
          Learning Objectives
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {lesson.objectives.map((obj, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-[#171719] dark:text-[#F5F5F7]">
              <Check className="w-4 h-4 text-[#007AFF] shrink-0 mt-0.5" />
              <span className="leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Content Sections */}
      <div className="space-y-12">
        {lesson.sections.map((section) => (
          <article key={section.id} className="prose-apple space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171719] dark:text-[#F5F5F7]">
              {section.title}
            </h2>

            {/* Markdown paragraphs */}
            <div className="text-sm leading-relaxed text-[#171719]/90 dark:text-[#F5F5F7]/90 whitespace-pre-line space-y-3">
              {section.content}
            </div>

            {/* Alert / Callout Box */}
            {section.callout && (
              <div
                className={`my-5 p-4 rounded-2xl border flex items-start space-x-3.5 ${
                  section.callout.type === 'warning'
                    ? 'bg-[#FF9500]/10 border-[#FF9500]/25 text-[#171719] dark:text-[#F5F5F7]'
                    : section.callout.type === 'important'
                    ? 'bg-[#007AFF]/10 border-[#007AFF]/25 text-[#171719] dark:text-[#F5F5F7]'
                    : 'bg-[#34C759]/10 border-[#34C759]/25 text-[#171719] dark:text-[#F5F5F7]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {section.callout.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FF9500]" />}
                  {section.callout.type === 'important' && <Info className="w-5 h-5 text-[#007AFF]" />}
                  {section.callout.type === 'tip' && <Lightbulb className="w-5 h-5 text-[#34C759]" />}
                  {section.callout.type === 'note' && <Info className="w-5 h-5 text-[#007AFF]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
                    {section.callout.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[#777780] dark:text-[#9898A0]">
                    {section.callout.text}
                  </p>
                </div>
              </div>
            )}

            {/* Code Examples */}
            {section.codeExamples && section.codeExamples.map((example, i) => (
              <CodeBlock
                key={i}
                title={example.title}
                code={example.code}
                description={example.description}
                output={example.output}
                onRunInSandbox={example.runnable ? onOpenSandboxWithCode : undefined}
              />
            ))}
          </article>
        ))}
      </div>

      {/* Practice Problems Section */}
      {lesson.practiceProblems && lesson.practiceProblems.length > 0 && (
        <div className="mt-14 p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.06]">
          <div className="flex items-center space-x-2 mb-4">
            <Code2 className="w-4 h-4 text-[#007AFF]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#171719] dark:text-[#F5F5F7]">
              Handbook Practice Exercises
            </h3>
          </div>

          <div className="space-y-4">
            {lesson.practiceProblems.map((prob, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#1C1C24] border border-black/[0.04] dark:border-white/[0.06]">
                <div className="text-xs font-semibold text-[#171719] dark:text-[#F5F5F7] mb-2">
                  Exercise {i + 1}: {prob.question}
                </div>
                {prob.hint && (
                  <div className="text-[11px] text-[#777780] dark:text-[#9898A0] mb-2 italic">
                    Hint: {prob.hint}
                  </div>
                )}
                {prob.starterCode && (
                  <button
                    onClick={() => onOpenSandboxWithCode(prob.starterCode || '')}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#007AFF]/10 text-[#007AFF] text-xs font-semibold hover:bg-[#007AFF]/20 transition-colors"
                  >
                    <span>Load Exercise into Sandbox</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Takeaways Box */}
      <div className="mt-12 p-6 rounded-2xl bg-gradient-to-tr from-[#007AFF]/10 via-[#32ADE6]/5 to-transparent border border-[#007AFF]/20">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#007AFF] mb-3">
          Key Takeaways
        </h3>
        <ul className="space-y-2 text-xs text-[#171719] dark:text-[#F5F5F7]">
          {lesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] mt-1.5 shrink-0" />
              <span className="leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Completion & Quiz Action Footer */}
      <div className="mt-14 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Toggle Complete Button */}
        <button
          onClick={() => toggleLessonCompletion(lesson.id)}
          className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full font-semibold text-xs transition-all ${
            completed
              ? 'bg-[#34C759] text-white shadow-apple-sm'
              : 'bg-black/[0.05] dark:bg-white/[0.08] text-[#171719] dark:text-[#F5F5F7] hover:bg-black/[0.08]'
          }`}
        >
          {completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
          <span>{completed ? 'Lesson Completed' : 'Mark as Completed'}</span>
        </button>

        {/* Take Quiz Button */}
        <button
          onClick={() => onTakeQuiz(lesson.moduleId)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-[#AF52DE] hover:bg-[#9E3FCF] text-white font-semibold text-xs shadow-apple-sm transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Take Chapter Quiz</span>
        </button>
      </div>

      {/* Previous / Next Lesson Navigation Buttons */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <button
            onClick={() => onSelectLesson(prev.id)}
            className="flex flex-col items-start p-4 rounded-2xl bg-white/70 dark:bg-[#1C1C24]/70 border border-black/[0.05] dark:border-white/[0.08] hover:border-[#007AFF] text-left transition-colors"
          >
            <span className="flex items-center space-x-1 text-[11px] font-semibold text-[#777780] mb-1">
              <ArrowLeft className="w-3 h-3" />
              <span>Previous Lesson</span>
            </span>
            <span className="text-xs font-bold text-[#171719] dark:text-[#F5F5F7] truncate w-full">
              {prev.title}
            </span>
          </button>
        ) : <div />}

        {next ? (
          <button
            onClick={() => onSelectLesson(next.id)}
            className="flex flex-col items-end p-4 rounded-2xl bg-white/70 dark:bg-[#1C1C24]/70 border border-black/[0.05] dark:border-white/[0.08] hover:border-[#007AFF] text-right transition-colors"
          >
            <span className="flex items-center space-x-1 text-[11px] font-semibold text-[#777780] mb-1">
              <span>Next Lesson</span>
              <ArrowRight className="w-3 h-3" />
            </span>
            <span className="text-xs font-bold text-[#171719] dark:text-[#F5F5F7] truncate w-full">
              {next.title}
            </span>
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
