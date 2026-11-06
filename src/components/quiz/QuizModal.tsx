import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MODULE_QUIZZES } from '../../data/quizData';
import type { ModuleQuiz, QuizQuestion } from '../../data/quizData';
import { useProgress } from '../../context/ProgressContext';

interface QuizModalProps {
  moduleId: string;
  onClose: () => void;
  onCompleteQuiz?: (score: number, total: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  moduleId,
  onClose,
  onCompleteQuiz
}) => {
  const { recordQuizScore } = useProgress();
  const quiz: ModuleQuiz = MODULE_QUIZZES[moduleId] || MODULE_QUIZZES.ch01;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const [timeTakenSec, setTimeTakenSec] = useState(0);

  const currentQ: QuizQuestion = quiz.questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctOptionIndex;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: selectedOption }));

    if (selectedOption === currentQ.correctOptionIndex) {
      try {
        confetti({
          particleCount: 20,
          spread: 30,
          origin: { y: 0.8 },
          colors: ['#34C759', '#007AFF']
        });
      } catch {}
    }
  };

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished!
      const totalTime = Math.round((Date.now() - startTime) / 1000);
      setTimeTakenSec(totalTime);
      setIsFinished(true);

      // Calculate score
      let correctCount = 0;
      quiz.questions.forEach(q => {
        if (userAnswers[q.id] === q.correctOptionIndex || (q.id === currentQ.id && selectedOption === q.correctOptionIndex)) {
          correctCount++;
        }
      });

      recordQuizScore(quiz.moduleId, correctCount, quiz.questions.length);
      if (onCompleteQuiz) {
        onCompleteQuiz(correctCount, quiz.questions.length);
      }

      if (correctCount === quiz.questions.length) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}
      }
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  // Compute final stats
  const totalQuestions = quiz.questions.length;
  const correctCount = quiz.questions.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctOptionIndex ? acc + 1 : acc;
  }, 0);
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white/95 dark:bg-[#1C1C24]/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] dark:border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#171719] dark:text-[#F5F5F7] truncate max-w-md">
                {quiz.title}
              </h2>
              <div className="flex items-center space-x-2 text-[11px] text-[#777780]">
                <span>Difficulty: {quiz.difficulty}</span>
                <span>•</span>
                <span>{quiz.questions.length} Questions</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#777780] hover:text-[#171719] dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Progress Bar */}
        {!isFinished && (
          <div className="w-full bg-black/[0.04] dark:bg-white/[0.06] h-1.5">
            <div
              className="bg-[#AF52DE] h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isFinished ? (
            <div className="space-y-6">
              {/* Question Index & Type */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#777780]">
                <span className="text-[#AF52DE] uppercase tracking-wider">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className="capitalize px-2 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06]">
                  {currentQ.type.replace('-', ' ')}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-[#171719] dark:text-[#F5F5F7]">
                {currentQ.question}
              </h3>

              {/* Optional Code Snippet */}
              {currentQ.codeSnippet && (
                <div className="p-3.5 rounded-2xl bg-[#17171C] text-[#E2E8F0] font-mono text-xs overflow-x-auto border border-white/[0.06]">
                  <pre>
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectChoice = idx === currentQ.correctOptionIndex;

                  let borderClass = 'border-black/[0.06] dark:border-white/[0.08]';
                  let bgClass = 'bg-black/[0.02] dark:bg-white/[0.02]';
                  let textClass = 'text-[#171719] dark:text-[#F5F5F7]';

                  if (isAnswerSubmitted) {
                    if (isCorrectChoice) {
                      borderClass = 'border-[#34C759]';
                      bgClass = 'bg-[#34C759]/10';
                      textClass = 'text-[#34C759] font-bold';
                    } else if (isSelected && !isCorrectChoice) {
                      borderClass = 'border-[#FF3B30]';
                      bgClass = 'bg-[#FF3B30]/10';
                      textClass = 'text-[#FF3B30]';
                    }
                  } else if (isSelected) {
                    borderClass = 'border-[#AF52DE]';
                    bgClass = 'bg-[#AF52DE]/10';
                    textClass = 'text-[#AF52DE] font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all ${borderClass} ${bgClass} ${textClass} ${
                        !isAnswerSubmitted ? 'hover:border-[#AF52DE]/40' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs bg-black/[0.04] dark:bg-white/[0.06]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswerSubmitted && isCorrectChoice && (
                        <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectChoice && (
                        <AlertCircle className="w-4 h-4 text-[#FF3B30]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Explanation Drawer */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-2xl border animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-[#34C759]/10 border-[#34C759]/30'
                      : 'bg-[#FF9500]/10 border-[#FF9500]/30'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold text-xs mb-1">
                    {isCorrect ? (
                      <span className="text-[#34C759]">Correct! Nicely done.</span>
                    ) : (
                      <span className="text-[#FF9500]">
                        Incorrect. The right answer is:{' '}
                        {currentQ.options[currentQ.correctOptionIndex]}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#777780] dark:text-[#9898A0] leading-relaxed mb-2">
                    {currentQ.explanation}
                  </p>
                  <div className="flex items-start space-x-1.5 text-[11px] text-[#007AFF] font-medium">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Concept: {currentQ.conceptNote}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Final Score Summary Screen */
            <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#AF52DE] to-[#007AFF] text-white flex items-center justify-center mx-auto shadow-apple-md">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#171719] dark:text-[#F5F5F7] mb-1">
                  Quiz Completed!
                </h3>
                <p className="text-xs text-[#777780] dark:text-[#9898A0]">
                  {percentage >= 80 ? 'Outstanding grasp of C principles!' : 'Good effort! Review the lessons to sharpen your memory.'}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04]">
                  <div className="text-xs text-[#777780] mb-1">Score</div>
                  <div className="text-xl font-black text-[#171719] dark:text-[#F5F5F7]">
                    {correctCount} / {totalQuestions}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04]">
                  <div className="text-xs text-[#777780] mb-1">Accuracy</div>
                  <div className="text-xl font-black text-[#AF52DE]">
                    {percentage}%
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04]">
                  <div className="text-xs text-[#777780] mb-1">Time</div>
                  <div className="text-xl font-black text-[#007AFF]">
                    {timeTakenSec}s
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
          {!isFinished ? (
            <>
              <div className="text-xs text-[#777780]">
                {selectedOption === null ? 'Select an answer above' : 'Ready to verify'}
              </div>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-full bg-[#AF52DE] hover:bg-[#9E3FCF] text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleRetry}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#777780] hover:text-[#171719] dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#007AFF] hover:bg-[#0062CC] text-white text-xs font-semibold shadow-sm"
              >
                Continue Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
