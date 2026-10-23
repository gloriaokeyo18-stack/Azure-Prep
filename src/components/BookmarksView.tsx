import React, { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

interface BookmarksViewProps {
  onStartBookmarkPractice: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  onStartBookmarkPractice,
}) => {
  const { questions, bookmarkedQuestionIds, toggleBookmark, startBookmarksQuiz } =
    useQuiz();

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const bookmarkedQuestions = questions.filter((q) =>
    bookmarkedQuestionIds.includes(q.id)
  );

  const handleStart = () => {
    startBookmarksQuiz();
    onStartBookmarkPractice();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Reference Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bookmarked Questions
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Questions you have pinned during practice for quick review, revision, or high-yield exam recall.
          </p>
        </div>

        {bookmarkedQuestions.length > 0 && (
          <button
            onClick={handleStart}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer transition-all"
          >
            <span>Practice Saved Questions ({bookmarkedQuestions.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">No Bookmarks Saved Yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any question during practice to save it here for quick reference.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
              >
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.2 rounded">
                        Domain {q.domainId}: {q.domainName}
                      </span>
                      <span className="font-semibold text-slate-600 bg-slate-100 px-2 py-0.2 rounded">
                        {q.subtopicName}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{q.prompt}</h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Correct: Option {q.correctOptionIds.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(q.id);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 border-t border-slate-100 space-y-4 bg-white">
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
                                  ✓ Correct Answer
                                </span>
                              )}
                            </div>
                            <p className="text-slate-600">{opt.explanation}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-1 text-blue-950">
                      <div className="font-bold flex items-center gap-1.5 text-blue-900">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Takeaway</span>
                      </div>
                      <p className="leading-relaxed">{q.keyTakeaway}</p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <a
                        href={q.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read full article on Microsoft Learn</span>
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
