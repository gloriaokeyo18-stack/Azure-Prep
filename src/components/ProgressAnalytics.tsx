import React, { useState } from 'react';
import {
  BarChart3,
  Award,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Trash2,
  Check,
  TrendingUp,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

export const ProgressAnalytics: React.FC = () => {
  const {
    overallStats,
    topicStats,
    attempts,
    sessionHistory,
    domains,
    resetAllProgress,
    exportUserData,
    importUserData,
  } = useQuiz();

  const [confirmReset, setConfirmReset] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportUserData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `azureprep-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importUserData(content);
        if (success) {
          setImportStatus('Data imported successfully!');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Failed to parse progress file.');
          setTimeout(() => setImportStatus(null), 3000);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Learning Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Progress & Performance Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Detailed breakdown of your domain competencies, first-attempt accuracy vs repeated retries, and learning persistence.
          </p>
        </div>

        {/* Data export / backup actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Data</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span>Import</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-bold text-center">
          {importStatus}
        </div>
      )}

      {/* Accuracy Comparison: First Attempt vs Repeated Exposure */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            First-Attempt vs Repeat-Attempt Accuracy
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Repeated question exposure can artificially inflate score numbers. We track first-attempt scores separately to measure genuine first-time recall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Attempt Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-900 uppercase tracking-wider">
                First-Attempt Accuracy
              </span>
              <span className="font-black text-2xl text-indigo-950">
                {overallStats.firstAttemptAccuracy}%
              </span>
            </div>
            <div className="w-full bg-indigo-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${overallStats.firstAttemptAccuracy}%` }}
              />
            </div>
            <p className="text-xs text-indigo-900/80 leading-relaxed">
              Based on {overallStats.firstAttemptsCount} questions answered for the first time.
              Pass mark threshold is 70%.
            </p>
          </div>

          {/* Overall Card */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-900 uppercase tracking-wider">
                Overall Practice Accuracy
              </span>
              <span className="font-black text-2xl text-emerald-950">
                {overallStats.overallAccuracy}%
              </span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full"
                style={{ width: `${overallStats.overallAccuracy}%` }}
              />
            </div>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              Based on {overallStats.totalAttempts} total attempts (includes practice and mistake retries).
            </p>
          </div>
        </div>
      </div>

      {/* Subtopics Detailed Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6 sm:p-8">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Subtopic Mastery & Coverage Status
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            A topic must have at least 3 attempts to be classified as Strong or Developing (otherwise marked Needs Data).
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {topicStats.map((domStat) => (
            <div key={domStat.domainId} className="py-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    Domain {domStat.domainId}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{domStat.domainName}</span>
                </div>
                <div className="text-xs font-extrabold text-slate-800">
                  {domStat.firstAttemptAccuracy}% 1st-try Acc ({domStat.firstAttempts} tried)
                </div>
              </div>

              {/* Subtopic rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {domStat.subtopics.map((st) => (
                  <div
                    key={st.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-800 truncate pr-2">{st.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-500">{st.attempts} Qs</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          st.attempts === 0
                            ? 'bg-slate-100 text-slate-500'
                            : st.accuracy >= 70
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {st.attempts > 0 ? `${st.accuracy}%` : 'New'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-950">Reset Progress Data</h3>
          <p className="text-xs text-rose-800/80 mt-0.5">
            Clear all session history, attempts, and bookmarks to start fresh.
          </p>
        </div>

        {confirmReset ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetAllProgress();
                setConfirmReset(false);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 cursor-pointer shadow-xs"
            >
              Confirm Clear All
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-3 py-2 rounded-xl bg-white text-slate-700 font-semibold text-xs border border-slate-200 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-300 text-rose-700 bg-white hover:bg-rose-50 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>
        )}
      </div>
    </div>
  );
};
