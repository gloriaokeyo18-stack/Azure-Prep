/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext.js';
import { Navbar, type ActiveTab } from './components/Navbar.js';
import { Dashboard } from './components/Dashboard.js';
import { TopicPractice } from './components/TopicPractice.js';
import { MixedPractice } from './components/MixedPractice.js';
import { MockExamView } from './components/MockExamView.js';
import { MistakeReview } from './components/MistakeReview.js';
import { BookmarksView } from './components/BookmarksView.js';
import { ProgressAnalytics } from './components/ProgressAnalytics.js';
import { QuizEngine } from './components/QuizEngine.js';
import { QuizSummary } from './components/QuizSummary.js';
import { AdminWeightsModal } from './components/AdminWeightsModal.js';
import { ProfileModal } from './components/ProfileModal.js';
import { ExternalLink, ShieldCheck, Heart } from 'lucide-react';

function AppContent() {
  const {
    activeSession,
    recommendedStudy,
    startPracticeQuiz,
    startMistakesQuiz,
    finishCurrentSession,
    exitSession,
  } = useQuiz();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [weightsModalOpen, setWeightsModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // If there's an active session, render Quiz Engine or Quiz Summary
  if (activeSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            exitSession();
            setActiveTab(tab);
          }}
          onOpenWeightsModal={() => setWeightsModalOpen(true)}
          onOpenProfileModal={() => setProfileModalOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeSession.isCompleted ? (
            <QuizSummary
              onReturnHome={() => {
                exitSession();
                setActiveTab('dashboard');
              }}
              onRetryMistakes={() => {
                exitSession();
                startMistakesQuiz(true);
              }}
              onNewQuiz={() => {
                exitSession();
                setActiveTab('topics');
              }}
            />
          ) : (
            <QuizEngine
              onFinish={() => finishCurrentSession()}
              onExit={() => exitSession()}
            />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWeightsModal={() => setWeightsModalOpen(true)}
        onOpenProfileModal={() => setProfileModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            onStartSuggested={() => {
              startPracticeQuiz({
                domainId: recommendedStudy.domainId,
                subtopicId: recommendedStudy.subtopicId,
                count: 5,
              });
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'topics' && (
          <TopicPractice onStartQuiz={() => {}} />
        )}

        {activeTab === 'mixed' && (
          <MixedPractice onStartQuiz={() => {}} />
        )}

        {activeTab === 'mock' && (
          <MockExamView
            onStartExam={() => {}}
            onOpenWeightsModal={() => setWeightsModalOpen(true)}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeReview onStartRetrySession={() => {}} />
        )}

        {activeTab === 'bookmarks' && (
          <BookmarksView onStartBookmarkPractice={() => {}} />
        )}

        {activeTab === 'progress' && <ProgressAnalytics />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/90 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                AzurePrep — Learn the Why
              </span>
              <span>•</span>
              <span>AZ-900 Certification Study System</span>
            </div>

            <div className="flex items-center gap-4 font-medium">
              <a
                href="https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-900"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>Microsoft Official AZ-900 Study Guide</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={() => setWeightsModalOpen(true)}
                className="hover:text-blue-600 hover:underline cursor-pointer"
              >
                Domain Weights
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal">
            Disclaimer: Microsoft, Azure, Entra ID, and related marks are trademarks of Microsoft
            Corporation. AzurePrep is an independent educational tool developed to teach core cloud concepts. All question content is original practice material verified against official Microsoft Learn technical documentation.
          </p>
        </div>
      </footer>

      {/* Admin Weights Modal */}
      <AdminWeightsModal
        isOpen={weightsModalOpen}
        onClose={() => setWeightsModalOpen(false)}
      />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}
