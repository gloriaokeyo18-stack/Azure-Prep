import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Home,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';
import { evaluateAnswer } from '../utils/quizLogic.js';

interface QuizSummaryProps {
  onReturnHome: () => void;
  onRetryMistakes: () => void;
  onNewQuiz: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({
  onReturnHome,
  onRetryMistakes,
  onNewQuiz,
}) => {
  const { activeSession, toggleBookmark, isBookmarked } = useQuiz();
  const [filter, setFilter] = useState<'all' | 'missed' | 'correct'>('all');
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  if (!activeSession) return null;

  // Compute session stats
  let correctCount = 0;
  const questionResults = activeSession.questions.map((q) => {
    const selected = activeSession.userAnswers[q.id] || [];
    const evaluation = evaluateAnswer(selected, q.correctOptionIds);
    if (evaluation.isCorrect) correctCount++;
    return {
      question: q,
      selected,
      evaluation,
    };
  });

  const total = activeSession.questions.length;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const passed = accuracy >= 70; // 700 out of 1000 Microsoft threshold

  const missedCount = total - correctCount;

  // Domain score breakdown
  const domainBreakdown: Record<
    number,
    { total: number; correct: number; name: string }
  > = {};
  questionResults.forEach(({ question, evaluation }) => {
    if (!domainBreakdown[question.domainId]) {
      domainBreakdown[question.domainId] = {
        total: 0,
        correct: 0,
        name: question.domainName,
      };
    }
    domainBreakdown[question.domainId].total++;
    if (evaluation.isCorrect) {
      domainBreakdown[question.domainId].correct++;
    }
  });

  const filteredQuestions = questionResults.filter((res) => {
    if (filter === 'missed') return !res.evaluation.isCorrect;
    if (filter === 'correct') return res.evaluation.isCorrect;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner / Score Card */}
      <div
        className={`rounded-3xl border p-8 text-center space-y-4 shadow-sm ${
          passed
            ? 'bg-gradient-to-b from-emerald-50/60 to-white border-emerald-200'
            : 'bg-gradient-to-b from-amber-50/50 to-white border-amber-200'
        }`}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 mx-auto">
          {passed ? (
            <Award className="w-9 h-9 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-9 h-9 text-amber-600" />
          )}
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {activeSession.title} Completed
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            {passed ? 'Great Job! Exam Pass Mark Achieved' : 'Keep Practicing — Needs Focus'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
            {passed
              ? 'You met or exceeded the Microsoft AZ-900 target benchmark of 70% (700/1000 points).'
              : 'The official pass mark for AZ-900 is 700 / 1000. Review the missed concepts below to close knowledge gaps.'}
          </p>
        </div>

        {/* Big Numbers */}
        <div className="flex items-center justify-center gap-8 pt-2">
          <div>
            <div className="text-4xl font-black text-slate-900">{accuracy}%</div>
            <div className="text-xs font-medium text-slate-500 uppercase mt-0.5">Accuracy</div>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <div className="text-4xl font-black text-emerald-600">
              {correctCount}
              <span className="text-xl text-slate-400 font-bold">/{total}</span>
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase mt-0.5">Correct</div>
          </div>
          {missedCount > 0 && (
            <>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <div className="text-4xl font-black text-rose-600">{missedCount}</div>
                <div className="text-xs font-medium text-slate-500 uppercase mt-0.5">Missed</div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          {missedCount > 0 && (
            <button
              onClick={onRetryMistakes}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow-md shadow-amber-600/20 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry {missedCount} Mistakes Now</span>
            </button>
          )}
          <button
            onClick={onNewQuiz}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <span>Start Another Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onReturnHome}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      {/* Domain Performance in this session */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Session Domain Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(domainBreakdown).map(([domainId, data]) => {
            const domAcc = Math.round((data.correct / data.total) * 100);
            return (
              <div
                key={domainId}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-700">Domain {domainId}</span>
                  <span
                    className={`text-xs font-bold ${
                      domAcc >= 70 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {domAcc}%
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">{data.name}</div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      domAcc >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${domAcc}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-500">
                  {data.correct} of {data.total} correct
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Review Answers & Explanations</h3>
            <p className="text-xs text-slate-500">
              Click any question to view the deep breakdown and takeaway.
            </p>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white font-bold text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({total})
            </button>
            <button
              onClick={() => setFilter('missed')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'missed'
                  ? 'bg-white font-bold text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Missed ({missedCount})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'correct'
                  ? 'bg-white font-bold text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correct ({correctCount})
            </button>
          </div>
        </div>

        {/* List of Question Review Cards */}
        <div className="space-y-3">
          {filteredQuestions.map(({ question: q, selected, evaluation }, idx) => {
            const isExpanded = expandedQId === q.id;
            const bookmarked = isBookmarked(q.id);

            return (
              <div
                key={q.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedQId(isExpanded ? null : q.id)}
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {evaluation.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500 font-medium">
                        Q{idx + 1} • {q.subtopicName}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {q.prompt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="p-1 text-slate-400 hover:text-blue-600"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${bookmarked ? 'fill-blue-600 text-blue-600' : ''}`}
                      />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 space-y-4">
                    <p className="text-sm font-bold text-slate-900">{q.prompt}</p>

                    {/* Options Breakdown */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isCorrect = q.correctOptionIds.includes(opt.id);
                        const isUserChoice = selected.includes(opt.id);

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-lg border text-xs leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                                : isUserChoice
                                ? 'bg-rose-50/60 border-rose-300 text-rose-950'
                                : 'bg-slate-50/60 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="font-bold mb-1 flex items-center justify-between">
                              <span>
                                Option {opt.id}: {opt.text}
                              </span>
                              <span>
                                {isCorrect && '✓ Correct Answer'}
                                {isUserChoice && !isCorrect && '✗ Your Choice'}
                              </span>
                            </div>
                            <p className="text-slate-600">{opt.explanation}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Key takeaway */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-950 space-y-1">
                      <div className="flex items-center gap-1 font-bold text-blue-900">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Takeaway</span>
                      </div>
                      <p>{q.keyTakeaway}</p>
                    </div>

                    {/* Documentation link */}
                    <div className="pt-1 flex justify-end">
                      <a
                        href={q.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Learn more on Microsoft Learn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
