import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Flag,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';
import { evaluateAnswer } from '../utils/quizLogic.js';

interface QuizEngineProps {
  onFinish: () => void;
  onExit: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ onFinish, onExit }) => {
  const {
    activeSession,
    selectOption,
    submitAnswer,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    toggleBookmark,
    isBookmarked,
    markAsUnderstood,
    isUnderstood,
  } = useQuiz();

  const [expandedDetails, setExpandedDetails] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  // Timer for mock exam
  const [timeLeft, setTimeLeft] = useState<number | null>(
    activeSession?.timeRemainingSeconds ?? null
  );

  useEffect(() => {
    if (activeSession?.mode !== 'mock' || activeSession.isCompleted) return;
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeSession?.mode, activeSession?.isCompleted, timeLeft, onFinish]);

  if (!activeSession) return null;

  const currentQ = activeSession.questions[activeSession.currentIndex];
  if (!currentQ) return null;

  const isSubmitted = !!activeSession.submittedQuestions[currentQ.id];
  const userSelected = activeSession.userAnswers[currentQ.id] || [];
  const hasSelectedAny = userSelected.length > 0;
  const isMulti = currentQ.questionType === 'multiple';
  const bookmarked = isBookmarked(currentQ.id);
  const understood = isUnderstood(currentQ.id);

  // Evaluation results (only computed/displayed if submitted and not in active mock exam mode)
  const isMockInProgress = activeSession.mode === 'mock' && !activeSession.isCompleted;
  const showFeedback = isSubmitted && !isMockInProgress;

  const evalResult = showFeedback
    ? evaluateAnswer(userSelected, currentQ.correctOptionIds)
    : null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Exam-level':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Quiz Header Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            title="Exit Quiz"
          >
            ← Exit
          </button>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeSession.title}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              Question {activeSession.currentIndex + 1} of {activeSession.questions.length}
            </div>
          </div>
        </div>

        {/* Center / Right: Timer & Controls */}
        <div className="flex items-center gap-2">
          {activeSession.mode === 'mock' && timeLeft !== null && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono font-bold text-xs ${
                timeLeft < 300
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          )}

          {/* Question palette drawer toggle */}
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Q-Grid</span>
            <span className="text-[10px] bg-slate-100 px-1 rounded font-bold text-slate-600">
              {Object.keys(activeSession.submittedQuestions).length}/
              {activeSession.questions.length}
            </span>
          </button>

          {/* Bookmark toggle */}
          <button
            onClick={() => toggleBookmark(currentQ.id)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              bookmarked
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title={bookmarked ? 'Saved in bookmarks' : 'Bookmark this question'}
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-blue-600" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden -mt-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${((activeSession.currentIndex + 1) / activeSession.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Quick Navigation Palette (Collapsible) */}
      {showPalette && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-700">Question Palette</div>
          <div className="flex flex-wrap gap-1.5">
            {activeSession.questions.map((q, idx) => {
              const hasAnswered = !!activeSession.userAnswers[q.id]?.length;
              const isCurrent = idx === activeSession.currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    goToQuestion(idx);
                    setShowPalette(false);
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-blue-600 bg-blue-600 text-white'
                      : hasAnswered
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            Domain {currentQ.domainId}: {currentQ.domainName}
          </span>
          <span className="text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
            {currentQ.subtopicName}
          </span>
          <span
            className={`font-semibold border px-2.5 py-0.5 rounded-full ${getDifficultyBadge(
              currentQ.difficulty
            )}`}
          >
            {currentQ.difficulty}
          </span>
          {isMulti && (
            <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              Multi-Select: Choose {currentQ.correctOptionIds.length}
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQ.prompt}
        </h2>

        {currentQ.codeSnippet && (
          <pre className="p-3 bg-slate-900 text-blue-200 rounded-lg text-xs font-mono overflow-x-auto">
            <code>{currentQ.codeSnippet}</code>
          </pre>
        )}

        {/* Answer Options */}
        <div className="space-y-3" role="radiogroup" aria-label="Question options">
          {currentQ.options.map((option) => {
            const isSelected = userSelected.includes(option.id);
            const isCorrectOption = currentQ.correctOptionIds.includes(option.id);

            // Determine option color styling post-submission
            let optionStyles = 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/20';
            let badgeStyles = 'border-slate-300 bg-slate-100 text-slate-700';

            if (isSelected) {
              optionStyles = 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600';
              badgeStyles = 'border-blue-600 bg-blue-600 text-white';
            }

            if (showFeedback) {
              if (isCorrectOption) {
                optionStyles =
                  'border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500 text-emerald-950';
                badgeStyles = 'border-emerald-600 bg-emerald-600 text-white';
              } else if (isSelected && !isCorrectOption) {
                optionStyles =
                  'border-rose-400 bg-rose-50/60 ring-1 ring-rose-400 text-rose-950';
                badgeStyles = 'border-rose-600 bg-rose-600 text-white';
              } else {
                optionStyles = 'border-slate-200 bg-slate-50/50 opacity-70';
                badgeStyles = 'border-slate-300 bg-slate-100 text-slate-500';
              }
            }

            return (
              <div
                key={option.id}
                onClick={() => selectOption(currentQ.id, option.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${optionStyles}`}
              >
                {/* Option Letter identifier badge */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${badgeStyles}`}
                >
                  {showFeedback && isCorrectOption ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : showFeedback && isSelected && !isCorrectOption ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    option.id
                  )}
                </div>

                <div className="flex-1 text-sm font-medium leading-relaxed pt-0.5">
                  <span>{option.text}</span>

                  {/* Immediate option inline feedback when revealed */}
                  {showFeedback && (
                    <div className="mt-2 text-xs pt-2 border-t border-slate-200/60 leading-normal">
                      <span className="font-bold mr-1">
                        {isCorrectOption ? 'Why this is correct:' : 'Why this is incorrect:'}
                      </span>
                      <span className="text-slate-700">{option.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: Submit Answer in Practice Mode */}
        {!isSubmitted && !isMockInProgress && (
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {isMulti
                ? `Select all that apply (${userSelected.length}/${currentQ.correctOptionIds.length} selected)`
                : 'Select one option'}
            </span>
            <button
              onClick={() => submitAnswer(currentQ.id)}
              disabled={!hasSelectedAny}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                hasSelectedAny
                  ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>

      {/* ESSENTIAL FEATURE: EXPLAIN EVERY ANSWER (Deep Concept Reinforcement Box) */}
      {showFeedback && evalResult && (
        <section
          className={`rounded-2xl border p-6 space-y-5 animate-in fade-in duration-300 ${
            evalResult.isCorrect
              ? 'bg-emerald-50/40 border-emerald-200'
              : evalResult.isPartial
              ? 'bg-amber-50/40 border-amber-200'
              : 'bg-rose-50/30 border-rose-200'
          }`}
          aria-label="Answer Explanation"
        >
          {/* Result Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {evalResult.isCorrect ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-emerald-900">Correct!</h3>
                    <p className="text-xs text-emerald-700 font-medium">
                      You selected option {userSelected.join(', ')}.
                    </p>
                  </div>
                </>
              ) : evalResult.isPartial ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-amber-900">Partially Correct</h3>
                    <p className="text-xs text-amber-700 font-medium">
                      Correct: {currentQ.correctOptionIds.join(', ')} • Selected: {userSelected.join(', ')}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-rose-900">Incorrect</h3>
                    <p className="text-xs text-rose-700 font-medium">
                      Correct answer is: <strong className="font-bold underline">{currentQ.correctOptionIds.join(', ')}</strong> (you chose {userSelected.join(', ')})
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Mark as understood button for missed questions */}
            {!evalResult.isCorrect && (
              <button
                onClick={() => markAsUnderstood(currentQ.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  understood
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {understood ? '✓ Marked Understood' : 'Mark as Understood'}
              </button>
            )}
          </div>

          {/* Section B: Why the answer is correct */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>The Azure Concept — Why {currentQ.correctOptionIds.join(', ')} is Correct</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {currentQ.whyCorrect}
            </p>
          </div>

          {/* Section D: Concept reinforcement (Takeaway + Analogy + Exam Trap) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Key Takeaway box */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Remember This (AZ-900 Rule)</span>
              </div>
              <p className="text-xs text-blue-950 font-medium leading-relaxed">
                {currentQ.keyTakeaway}
              </p>
            </div>

            {/* Common Exam Trap box */}
            {currentQ.examTrap && (
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Common Exam Trap</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {currentQ.examTrap}
                </p>
              </div>
            )}
          </div>

          {/* Practical everyday analogy (if present) */}
          {currentQ.practicalAnalogy && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900">Everyday Analogy: </span>
              <span>{currentQ.practicalAnalogy}</span>
            </div>
          )}

          {/* Verified Official Microsoft Documentation Reference */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Verified Microsoft Learn Reference:
            </span>
            <a
              href={currentQ.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <span>{currentQ.docTitle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      )}

      {/* Navigation Footer */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={activeSession.currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeSession.currentIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-700 hover:bg-slate-100 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          {activeSession.currentIndex + 1} / {activeSession.questions.length}
        </div>

        {activeSession.currentIndex < activeSession.questions.length - 1 ? (
          <button
            onClick={nextQuestion}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <span>Next Question</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            <span>Finish Quiz</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Exit Quiz Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Exit Current Quiz?</h3>
            <p className="text-sm text-slate-600">
              Your answers so far will be saved to your learning progress history.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Keep Practicing
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onExit();
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
              >
                Exit to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
