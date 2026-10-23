import React, { useState } from 'react';
import { X, Sliders, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

interface AdminWeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminWeightsModal: React.FC<AdminWeightsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { domainWeights, updateDomainWeights, domains } = useQuiz();

  const [w1, setW1] = useState(domainWeights[1] || 25);
  const [w2, setW2] = useState(domainWeights[2] || 40);
  const [w3, setW3] = useState(domainWeights[3] || 35);

  if (!isOpen) return null;

  const total = Number(w1) + Number(w2) + Number(w3);
  const isValid = total === 100;

  const handleSave = () => {
    if (!isValid) return;
    updateDomainWeights({ 1: Number(w1), 2: Number(w2), 3: Number(w3) });
    onClose();
  };

  const applyPreset = (p1: number, p2: number, p3: number) => {
    setW1(p1);
    setW2(p2);
    setW3(p3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Configure Exam Domain Weights
              </h2>
              <p className="text-xs text-slate-500">
                Admin-managed exam domain percentages for mock exams.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Quick Presets
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => applyPreset(25, 40, 35)}
              className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-700 text-center cursor-pointer transition-colors"
            >
              Official (25/40/35)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(33, 34, 33)}
              className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-700 text-center cursor-pointer transition-colors"
            >
              Equal (33/34/33)
            </button>
            <button
              type="button"
              onClick={() => applyPreset(20, 50, 30)}
              className="py-1.5 px-2 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-xs font-semibold text-slate-700 text-center cursor-pointer transition-colors"
            >
              Architecture (20/50/30)
            </button>
          </div>
        </div>

        {/* Sliders / Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Domain 1: Cloud Concepts</span>
              <span className="font-bold text-blue-700">{w1}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={w1}
              onChange={(e) => setW1(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Domain 2: Architecture and Services</span>
              <span className="font-bold text-blue-700">{w2}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={w2}
              onChange={(e) => setW2(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
              <span>Domain 3: Management and Governance</span>
              <span className="font-bold text-blue-700">{w3}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={w3}
              onChange={(e) => setW3(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Validation total indicator */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
            isValid
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <span>Total Percentage:</span>
          <span>{total}% / 100% {isValid ? '✓ Valid' : '— Must equal 100%'}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-sm'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Save Weight Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
