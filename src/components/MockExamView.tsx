import React, { useState } from 'react';
import {
  Timer,
  ShieldAlert,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Sliders,
  AlertCircle,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

interface MockExamViewProps {
  onStartExam: () => void;
  onOpenWeightsModal: () => void;
}

export const MockExamView: React.FC<MockExamViewProps> = ({
  onStartExam,
  onOpenWeightsModal,
}) => {
  const { domains, domainWeights, questions, startMockExam } = useQuiz();
  const [questionCount, setQuestionCount] = useState<number>(35);
  const [timerMinutes, setTimerMinutes] = useState<number>(45);

  const handleStart = () => {
    startMockExam(questionCount, timerMinutes);
    onStartExam();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-2">
          <Timer className="w-3.5 h-3.5" />
          <span>AZ-900 Exam Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Timed Mock Examination
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Simulate official exam conditions. Explanations are withheld until the entire exam is completed to test your true independent recall under time pressure.
        </p>
      </div>

      {/* Official Exam Disclaimer Card */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Official Practice Material Notice: </span>
          This mock exam is an independent educational simulator designed to test conceptual understanding of the official Microsoft AZ-900 syllabus. Scores do not represent an official Microsoft exam score or guarantee a certification pass.
        </div>
      </div>

      {/* Exam Configuration Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Exam Parameters
        </h2>

        {/* Weights overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Official AZ-900 Domain Distribution
            </span>
            <button
              onClick={onOpenWeightsModal}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Adjust Weights</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {domains.map((dom) => (
              <div
                key={dom.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-blue-700">Domain {dom.id}</span>
                  <span className="font-extrabold text-slate-900">
                    {domainWeights[dom.id] ?? dom.weightPercentage}%
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium truncate">{dom.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Count & Time selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Question Count */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 25, 35].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    questionCount === num
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {num} Questions
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              35 questions matches official AZ-900 length.
            </p>
          </div>

          {/* Time Limit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Time Limit
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 30, 45].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimerMinutes(mins)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                    timerMinutes === mins
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {mins} Minutes
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Official exam time is 45 minutes.
            </p>
          </div>
        </div>

        {/* Rules summary */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800">Exam Simulator Rules:</div>
          <ul className="list-disc list-inside space-y-1">
            <li>Explanations are withheld until you press Finish Exam.</li>
            <li>You can move back and forth between questions using the Question Grid.</li>
            <li>Pass mark is 70% (700 out of 1000 points).</li>
            <li>A comprehensive domain breakdown will appear immediately upon submission.</li>
          </ul>
        </div>

        {/* Start Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white font-extrabold text-sm shadow-md shadow-purple-700/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>Begin Mock Exam ({questionCount} Qs • {timerMinutes} min)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
