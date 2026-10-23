import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';
import type { TopicStat } from '../types/quiz.js';

interface DashboardProps {
  onStartSuggested: () => void;
  onNavigateTab: (tab: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onStartSuggested,
  onNavigateTab,
}) => {
  const {
    overallStats,
    topicStats,
    recommendedStudy,
    missedQuestionIds,
    bookmarkedQuestionIds,
    sessionHistory,
    domains,
    startPracticeQuiz,
  } = useQuiz();

  const getClassificationBadge = (classification: TopicStat['classification'], sampleCount: number) => {
    switch (classification) {
      case 'strong':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Mastered ({sampleCount} Qs)
          </span>
        );
      case 'developing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <TrendingUp className="w-3 h-3 text-blue-600" />
            Developing ({sampleCount} Qs)
          </span>
        );
      case 'weak':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            Needs Focus ({sampleCount} Qs)
          </span>
        );
      case 'insufficient_data':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Needs Practice ({sampleCount} Qs)
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome & Next Recommended Study Card */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-blue-950/10 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Microsoft AZ-900 Exam Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Master the concepts, <span className="text-blue-300">learn the why</span>.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Don&apos;t just memorize right answers. Every question breaks down the underlying
              Azure architecture, explains why distractors fail, and connects to official Microsoft Learn documentation.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onStartSuggested}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/30 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Start Suggested Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateTab('mock')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all cursor-pointer"
              >
                <span>Take Mock Exam</span>
              </button>
            </div>
          </div>

          {/* Recommended Session Prompt Box */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-blue-200 uppercase tracking-wider">
              <span>What to study next</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 text-[10px] font-bold">
                Personalized
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white mb-1">
                {recommendedStudy.domainName}
              </h2>
              {recommendedStudy.subtopicName && (
                <p className="text-xs text-blue-300 font-semibold mb-1">
                  Focus: {recommendedStudy.subtopicName}
                </p>
              )}
              <p className="text-xs text-slate-300 leading-normal">
                {recommendedStudy.reason}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Target exam weight:</span>
              <span className="font-bold text-white">
                {domains.find((d) => d.id === recommendedStudy.domainId)?.weightPercentage}% of test
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Primary Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key Performance Indicators">
        {/* Total Questions Attempted */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Questions Tried</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {overallStats.uniqueAttempted}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ {overallStats.totalQuestionsCount} in bank</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${overallStats.completionPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            {overallStats.totalAttempts} total submissions
          </span>
        </div>

        {/* First-Attempt Accuracy */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">First-Attempt Acc</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-950">
                {overallStats.firstAttemptAccuracy}%
              </span>
              <span className="text-xs text-slate-500">
                ({overallStats.firstCorrect}/{overallStats.firstAttemptsCount})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Pure first-try score (uninflated by repeated retries)
            </p>
          </div>
          <div className="text-[11px] font-medium text-indigo-700 mt-1">
            {overallStats.firstAttemptAccuracy >= 70 ? '✓ Above 700 pass mark' : 'Aiming for 70% threshold'}
          </div>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Accuracy</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
                {overallStats.overallAccuracy}%
              </span>
              <span className="text-xs text-slate-500">
                ({overallStats.totalCorrect}/{overallStats.totalAttempts})
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Includes all practice & mistake retries
            </p>
          </div>
          <div className="text-[11px] font-medium text-emerald-700 mt-1">
            {overallStats.totalAttempts > 0 ? 'Active learning loop' : 'No answers submitted yet'}
          </div>
        </div>

        {/* Questions Needing Review */}
        <div
          onClick={() => onNavigateTab('mistakes')}
          className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">Needs Review</span>
            <RotateCcw className="w-4 h-4 text-amber-600 group-hover:rotate-45 transition-transform" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-950">
                {missedQuestionIds.length}
              </span>
              <span className="text-xs text-amber-700 font-medium">mistakes to retry</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Questions answered incorrectly at least once
            </p>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1 mt-1 group-hover:underline">
            Open Mistake Review <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </section>

      {/* Domain Breakdown Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Official Exam Domain Breakdown</h2>
            <p className="text-xs text-slate-500">
              Evaluated against Microsoft&apos;s AZ-900 study guide. Note: A topic requires at least 3 attempts to establish mastery.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('topics')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>All Subtopics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topicStats.map((stat) => {
            const domainCfg = domains.find((d) => d.id === stat.domainId);
            return (
              <div
                key={stat.domainId}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                      Domain {stat.domainId} • {domainCfg?.weightPercentage}% Weight
                    </span>
                    {getClassificationBadge(stat.classification, stat.totalAttempts)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {stat.domainName}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {domainCfg?.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-600">First-Attempt Accuracy</span>
                      <span className="font-bold text-slate-900">
                        {stat.firstAttempts > 0 ? `${stat.firstAttemptAccuracy}%` : 'No data'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          stat.firstAttemptAccuracy >= 80
                            ? 'bg-emerald-500'
                            : stat.firstAttemptAccuracy >= 60
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                        style={{
                          width: `${stat.firstAttempts > 0 ? stat.firstAttemptAccuracy : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Overall: <strong>{stat.overallAccuracy}%</strong> ({stat.totalCorrect}/{stat.totalAttempts})
                    </span>
                    <span>
                      {domainCfg?.subtopics.length} Subtopics
                    </span>
                  </div>

                  <button
                    onClick={() => startPracticeQuiz({ domainId: stat.domainId, count: 5 })}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Practice Domain {stat.domainId}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two columns: Recent Activity & Quick Launch shortcuts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Session Activity */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-xs text-slate-500">{sessionHistory.length} completed sessions</span>
          </div>

          {sessionHistory.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg bg-slate-50 border border-dashed border-slate-200">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">No quizzes taken yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Start a 5-question topic practice or a mixed quiz to begin tracking your Azure knowledge.
              </p>
              <button
                onClick={() => onNavigateTab('topics')}
                className="mt-3 px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                Choose a Topic
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {sessionHistory.slice(0, 5).map((sess) => (
                <div
                  key={sess.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">{sess.title}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span>{new Date(sess.completedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{sess.totalQuestions} Questions</span>
                      <span>•</span>
                      <span>{Math.round(sess.durationSeconds / 60)} min</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-extrabold ${
                        sess.accuracy >= 70 ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {sess.accuracy}%
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {sess.correctCount}/{sess.totalQuestions} correct
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Launch Cards */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Quick Practice Modes</h3>

          <div
            onClick={() => onNavigateTab('topics')}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                Practise by Topic
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Pick Compute, Storage, Entra ID, Governance or Policies
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>

          <div
            onClick={() => onNavigateTab('mixed')}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                Mixed Practice (5–20 Qs)
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Randomized cross-domain questions for fast warmup
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>

          <div
            onClick={() => onNavigateTab('mock')}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                Official Timed Mock Exam
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                Timed 45-minute simulation with explanations withheld
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
};
