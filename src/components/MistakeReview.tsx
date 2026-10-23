import React, { useState } from 'react';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Filter,
  Check,
  ArrowRight,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

interface MistakeReviewProps {
  onStartRetrySession: () => void;
}

export const MistakeReview: React.FC<MistakeReviewProps> = ({
  onStartRetrySession,
}) => {
  const {
    questions,
    attempts,
    missedQuestionIds,
    understoodList,
    markAsUnderstood,
    unmarkUnderstood,
    isUnderstood,
    toggleBookmark,
    isBookmarked,
    startMistakesQuiz,
  } = useQuiz();

  const [filterMode, setFilterMode] = useState<'all' | 'unmastered' | 'repeated'>('all');
  const [selectedDomain, setSelectedDomain] = useState<number | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group attempts by question ID to calculate repeated failures
  const attemptMap = new Map<string, typeof attempts>();
  attempts.forEach((att) => {
    const list = attemptMap.get(att.questionId) || [];
    list.push(att);
    attemptMap.set(att.questionId, list);
  });

  // Filter missed questions
  const missedQuestionsList = questions.filter((q) => {
    if (!missedQuestionIds.includes(q.id)) return false;
    if (selectedDomain !== 'all' && q.domainId !== selectedDomain) return false;

    const qAttempts = attemptMap.get(q.id) || [];
    const failCount = qAttempts.filter((a) => !a.isCorrect).length;
    const understood = isUnderstood(q.id);

    if (filterMode === 'unmastered') return !understood;
    if (filterMode === 'repeated') return failCount >= 2;
    return true;
  });

  const unmasteredCount = missedQuestionIds.filter((id) => !isUnderstood(id)).length;
  const repeatedCount = missedQuestionIds.filter((id) => {
    const qAttempts = attemptMap.get(id) || [];
    return qAttempts.filter((a) => !a.isCorrect).length >= 2;
  }).length;

  const handleLaunchPractice = (onlyUnmastered: boolean) => {
    startMistakesQuiz(onlyUnmastered);
    onStartRetrySession();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Spaced Learning & Error Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review My Mistakes
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Revisit every question you missed. Understand exactly why your chosen answer failed, reinforce key takeaways, and retry without seeing answers.
          </p>
        </div>

        {missedQuestionIds.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLaunchPractice(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Unmastered ({unmasteredCount})</span>
            </button>
            <button
              onClick={() => handleLaunchPractice(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Practice All Missed ({missedQuestionIds.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Status filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Missed ({missedQuestionIds.length})
          </button>
          <button
            onClick={() => setFilterMode('unmastered')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterMode === 'unmastered'
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Needs Practice ({unmasteredCount})
          </button>
          <button
            onClick={() => setFilterMode('repeated')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              filterMode === 'repeated'
                ? 'bg-rose-100 text-rose-900 border border-rose-300'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Repeated Mistakes ({repeatedCount})
          </button>
        </div>

        {/* Domain filter dropdown */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Domain:</span>
          <select
            value={selectedDomain}
            onChange={(e) =>
              setSelectedDomain(e.target.value === 'all' ? 'all' : Number(e.target.value))
            }
            className="py-1 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
          >
            <option value="all">All Domains</option>
            <option value="1">Domain 1: Cloud Concepts</option>
            <option value="2">Domain 2: Architecture & Services</option>
            <option value="3">Domain 3: Management & Governance</option>
          </select>
        </div>
      </div>

      {/* Missed questions list or empty state */}
      {missedQuestionsList.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            {missedQuestionIds.length === 0
              ? 'No Mistakes Recorded Yet!'
              : 'All Filtered Questions Are Mastered'}
          </h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {missedQuestionIds.length === 0
              ? 'Complete a topic practice quiz or mock exam. If you miss any question, it will be saved here for spaced reinforcement.'
              : 'Great work! You have marked all items in this filter as understood.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {missedQuestionsList.map((q) => {
            const isExpanded = expandedId === q.id;
            const bookmarked = isBookmarked(q.id);
            const understood = isUnderstood(q.id);
            const qAttempts = attemptMap.get(q.id) || [];
            const failAttempts = qAttempts.filter((a) => !a.isCorrect);
            const latestAttempt = qAttempts[qAttempts.length - 1];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.2 rounded">
                        Missed {failAttempts.length} {failAttempts.length === 1 ? 'time' : 'times'}
                      </span>
                      <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.2 rounded">
                        Domain {q.domainId}: {q.subtopicName}
                      </span>
                      {understood && (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Understood</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.prompt}</h3>
                    {latestAttempt && (
                      <p className="text-xs text-rose-700 font-medium">
                        Last selected: Option {latestAttempt.selectedOptionIds.join(', ')} • Correct is Option {q.correctOptionIds.join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (understood) {
                          unmarkUnderstood(q.id);
                        } else {
                          markAsUnderstood(q.id);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        understood
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {understood ? 'Understood' : 'Mark Understood'}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100"
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

                {/* Expanded full explanation */}
                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 space-y-4 bg-white">
                    {/* Options list */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isCorrect = q.correctOptionIds.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                                : 'bg-slate-50/60 border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="font-bold mb-1 flex items-center justify-between">
                              <span>
                                Option {opt.id}: {opt.text}
                              </span>
                              {isCorrect && (
                                <span className="text-emerald-700 font-extrabold">
                                  ✓ Correct Option
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600">{opt.explanation}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Why correct explanation */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1">
                      <div className="font-bold text-slate-900">Why {q.correctOptionIds.join(', ')} is the correct answer:</div>
                      <p className="text-slate-700 leading-relaxed">{q.whyCorrect}</p>
                    </div>

                    {/* Key takeaway */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-1 text-blue-950">
                      <div className="font-bold flex items-center gap-1.5 text-blue-900">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Core AZ-900 Concept Takeaway:</span>
                      </div>
                      <p className="leading-relaxed">{q.keyTakeaway}</p>
                    </div>

                    {/* Documentation link */}
                    <div className="pt-2 flex justify-end">
                      <a
                        href={q.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Official Documentation: {q.docTitle}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
