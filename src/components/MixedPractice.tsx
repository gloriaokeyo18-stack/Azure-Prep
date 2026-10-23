import React, { useState } from 'react';
import { Shuffle, Zap, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

interface MixedPracticeProps {
  onStartQuiz: () => void;
}

export const MixedPractice: React.FC<MixedPracticeProps> = ({ onStartQuiz }) => {
  const { questions, startMixedPractice } = useQuiz();
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);

  const presets = [
    { count: 5, label: 'Quick Warmup', time: '~5 mins', desc: '5 randomized questions across all domains.' },
    { count: 10, label: 'Standard Sprint', time: '~10 mins', desc: '10 balanced scenario questions.' },
    { count: 20, label: 'Deep Drill', time: '~20 mins', desc: '20 comprehensive questions covering tricky areas.' },
    { count: questions.length, label: 'Full Question Bank', time: '~35 mins', desc: `All ${questions.length} questions in bank.` },
  ];

  const handleStart = (count: number) => {
    startMixedPractice(count, shuffleOptions);
    onStartQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
          <Shuffle className="w-3.5 h-3.5" />
          <span>Cross-Domain Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mixed Practice Mode
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Simulate real exam unpredictability. Questions are drawn randomly from all three official AZ-900 domains with instant, concept-by-concept feedback.
        </p>
      </div>

      {/* Preset Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presets.map((preset) => {
          const isSelected = questionCount === preset.count;
          return (
            <div
              key={preset.count}
              onClick={() => setQuestionCount(preset.count)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded">
                    {preset.time}
                  </span>
                  <span className="text-lg font-black text-slate-900">{preset.count} Qs</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{preset.label}</h3>
                <p className="text-xs text-slate-500 mt-1">{preset.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">Immediate explanation</span>
                <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Options box & launch button */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={shuffleOptions}
            onChange={(e) => setShuffleOptions(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
          />
          <span className="text-xs font-semibold text-slate-700">
            Shuffle answer choices (anti-memorization)
          </span>
        </label>

        <button
          onClick={() => handleStart(questionCount)}
          className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Launch Mixed Quiz ({questionCount} Qs)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
