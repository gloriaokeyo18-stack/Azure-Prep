import React, { useState } from 'react';
import {
  Layers,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sliders,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';
import type { DifficultyLevel } from '../types/quiz.js';

interface TopicPracticeProps {
  onStartQuiz: () => void;
}

export const TopicPractice: React.FC<TopicPracticeProps> = ({ onStartQuiz }) => {
  const { domains, questions, topicStats, startPracticeQuiz } = useQuiz();

  const [selectedDomainId, setSelectedDomainId] = useState<1 | 2 | 3>(1);
  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('All');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);

  const activeDomain = domains.find((d) => d.id === selectedDomainId)!;
  const activeDomainStats = topicStats.find((s) => s.domainId === selectedDomainId);

  // Filter available questions count based on selections
  const availableQuestions = questions.filter((q) => {
    if (q.domainId !== selectedDomainId) return false;
    if (selectedSubtopicId !== 'all' && q.subtopicId !== selectedSubtopicId) return false;
    if (difficulty !== 'All' && q.difficulty !== difficulty) return false;
    return true;
  });

  const handleStart = () => {
    startPracticeQuiz({
      domainId: selectedDomainId,
      subtopicId: selectedSubtopicId !== 'all' ? selectedSubtopicId : undefined,
      count: Math.min(questionCount, availableQuestions.length || 5),
      difficulty,
      shuffleOptions,
    });
    onStartQuiz();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Practise by Exam Domain
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Deep-dive into specific Microsoft Azure Fundamentals domains and subtopics. Focus where you need it most with instant, option-specific explanations.
        </p>
      </div>

      {/* Domain Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {domains.map((dom) => {
          const isSelected = dom.id === selectedDomainId;
          const stat = topicStats.find((s) => s.domainId === dom.id);
          const domainQsCount = questions.filter((q) => q.domainId === dom.id).length;

          return (
            <button
              key={dom.id}
              onClick={() => {
                setSelectedDomainId(dom.id as 1 | 2 | 3);
                setSelectedSubtopicId('all');
              }}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    Domain {dom.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {dom.weightPercentage}% Weight
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{dom.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{dom.description}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-500">{domainQsCount} verified questions</span>
                <span className="font-bold text-slate-800">
                  {stat && stat.totalAttempts > 0 ? `${stat.overallAccuracy}% Acc` : 'Not attempted'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Configuration & Subtopic selection card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Customize Practice: {activeDomain.name}
            </h2>
            <p className="text-xs text-slate-500">
              Choose an individual subtopic or practice all areas across this domain.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
            {availableQuestions.length} Questions match
          </span>
        </div>

        {/* Subtopic Pills */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Subtopic Focus
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubtopicId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedSubtopicId === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Subtopics ({questions.filter((q) => q.domainId === selectedDomainId).length})
            </button>
            {activeDomain.subtopics.map((st) => {
              const count = questions.filter(
                (q) => q.domainId === selectedDomainId && q.subtopicId === st.id
              ).length;
              const isSelected = selectedSubtopicId === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedSubtopicId(st.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{st.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quiz Length & Difficulty Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          {/* Question Count */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Number of Questions
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    questionCount === num
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner (Foundations)</option>
              <option value="Intermediate">Intermediate (Core Architecture)</option>
              <option value="Exam-level">Exam-level (Scenario Tricky)</option>
            </select>
          </div>

          {/* Shuffling Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Option Randomization
            </label>
            <label className="flex items-center gap-2 py-2 px-3 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-700">Shuffle Answer Choices</span>
            </label>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleStart}
            disabled={availableQuestions.length === 0}
            className={`px-7 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md ${
              availableQuestions.length > 0
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-blue-600/25'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Start Practice Quiz ({Math.min(questionCount, availableQuestions.length)} Qs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
