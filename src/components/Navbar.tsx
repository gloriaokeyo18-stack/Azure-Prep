import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Shuffle,
  Timer,
  AlertTriangle,
  Bookmark,
  BarChart3,
  Sliders,
  User,
  CheckCircle2,
  Menu,
  X,
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext.js';

export type ActiveTab =
  | 'dashboard'
  | 'topics'
  | 'mixed'
  | 'mock'
  | 'mistakes'
  | 'bookmarks'
  | 'progress';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenWeightsModal: () => void;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenWeightsModal,
  onOpenProfileModal,
}) => {
  const {
    activeSession,
    missedQuestionIds,
    bookmarkedQuestionIds,
    overallStats,
    userProfile,
  } = useQuiz();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'topics', label: 'Practise by Topic', icon: Layers },
    { id: 'mixed', label: 'Mixed Practice', icon: Shuffle },
    { id: 'mock', label: 'Mock Exam', icon: Timer },
    {
      id: 'mistakes',
      label: 'Review Mistakes',
      icon: AlertTriangle,
      badge: missedQuestionIds.length > 0 ? missedQuestionIds.length : undefined,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      badge: bookmarkedQuestionIds.length > 0 ? bookmarkedQuestionIds.length : undefined,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId as ActiveTab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-extrabold text-base tracking-tight">Az</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 tracking-tight text-lg">
                  Azure<span className="text-blue-600">Prep</span>
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  AZ-900
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Learn the Why — Exam Readiness
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Quick stats, Domain weights, Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Accuracy pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Acc: <strong className="font-bold text-slate-900">{overallStats.overallAccuracy}%</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{overallStats.uniqueAttempted}/36 Qs</span>
            </div>

            {/* Configurable Weights button */}
            <button
              onClick={onOpenWeightsModal}
              title="Configure Exam Domain Weights"
              aria-label="Configure Exam Domain Weights"
              className="p-1.5 sm:p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Profile / Guest Button */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center gap-1.5 p-1.5 sm:py-1.5 sm:px-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
              aria-label="User profile settings"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline max-w-[80px] truncate">{userProfile.name}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
