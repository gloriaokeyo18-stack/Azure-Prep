import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Question,
  UserAttempt,
  BookmarkRecord,
  UnderstoodRecord,
  QuizSessionState,
  ExamDomainConfig,
  TopicStat,
} from '../types/quiz.js';
import { AZ900_QUESTIONS } from '../data/az900Questions.js';
import { DEFAULT_DOMAINS } from '../data/domains.js';
import {
  evaluateAnswer,
  calculateTopicStats,
  calculateOverallStats,
  getRecommendedPracticeDomain,
  sampleMockExamQuestions,
  shuffleArray,
} from '../utils/quizLogic.js';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  joinedAt: number;
}

export interface QuizSessionSummary {
  id: string;
  title: string;
  mode: 'practice' | 'mixed' | 'mock' | 'mistakes' | 'bookmarks';
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  domainId?: number;
  completedAt: number;
  durationSeconds: number;
}

interface QuizContextValue {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  questions: Question[];
  domains: ExamDomainConfig[];
  domainWeights: Record<number, number>;
  updateDomainWeights: (weights: Record<number, number>) => void;
  attempts: UserAttempt[];
  bookmarks: BookmarkRecord[];
  understoodList: UnderstoodRecord[];
  sessionHistory: QuizSessionSummary[];
  activeSession: QuizSessionState | null;

  // Analytics
  topicStats: TopicStat[];
  overallStats: ReturnType<typeof calculateOverallStats>;
  recommendedStudy: ReturnType<typeof getRecommendedPracticeDomain>;
  missedQuestionIds: string[];
  bookmarkedQuestionIds: string[];

  // Actions
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  markAsUnderstood: (questionId: string) => void;
  isUnderstood: (questionId: string) => boolean;
  unmarkUnderstood: (questionId: string) => void;

  // Quiz execution
  startPracticeQuiz: (options: {
    domainId?: 1 | 2 | 3;
    subtopicId?: string;
    count?: number;
    difficulty?: string;
    shuffleOptions?: boolean;
  }) => void;
  startMixedPractice: (count: number, shuffleOptions?: boolean) => void;
  startMockExam: (count?: number, timeLimitMinutes?: number) => void;
  startMistakesQuiz: (onlyUnmastered?: boolean) => void;
  startBookmarksQuiz: () => void;
  selectOption: (questionId: string, optionId: string) => void;
  submitAnswer: (questionId: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  finishCurrentSession: () => void;
  exitSession: () => void;

  // Utility
  resetAllProgress: () => void;
  exportUserData: () => string;
  importUserData: (jsonData: string) => boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'azureprep_user_profile',
  ATTEMPTS: 'azureprep_user_attempts',
  BOOKMARKS: 'azureprep_user_bookmarks',
  UNDERSTOOD: 'azureprep_user_understood',
  WEIGHTS: 'azureprep_domain_weights',
  ACTIVE_SESSION: 'azureprep_active_session',
  HISTORY: 'azureprep_session_history',
};

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile state
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      id: 'guest-' + Math.random().toString(36).substring(2, 9),
      name: 'Azure Learner',
      email: 'learner@azureprep.internal',
      isGuest: true,
      joinedAt: Date.now(),
    };
  });

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  };

  // 2. Domain weights
  const [domainWeights, setDomainWeights] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return { 1: 25, 2: 40, 3: 35 };
  });

  const updateDomainWeights = (weights: Record<number, number>) => {
    setDomainWeights(weights);
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
  };

  // 3. User attempts
  const [attempts, setAttempts] = useState<UserAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 4. Bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 5. Understood status
  const [understoodList, setUnderstoodList] = useState<UnderstoodRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.UNDERSTOOD);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 6. Session History
  const [sessionHistory, setSessionHistory] = useState<QuizSessionSummary[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // 7. Active Session
  const [activeSession, setActiveSession] = useState<QuizSessionState | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  // Persist state updates to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UNDERSTOOD, JSON.stringify(understoodList));
  }, [understoodList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(activeSession));
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
  }, [activeSession]);

  // Derived Domains with active weights
  const domains: ExamDomainConfig[] = DEFAULT_DOMAINS.map((dom) => ({
    ...dom,
    weightPercentage: domainWeights[dom.id] ?? dom.weightPercentage,
  }));

  // Analytics computation
  const topicStats = calculateTopicStats(attempts, AZ900_QUESTIONS, domains);
  const overallStats = calculateOverallStats(attempts, AZ900_QUESTIONS.length);
  const recommendedStudy = getRecommendedPracticeDomain(topicStats, domains);

  // Missed questions calculation
  const questionAttemptsMap = new Map<string, UserAttempt[]>();
  attempts.forEach((att) => {
    const list = questionAttemptsMap.get(att.questionId) || [];
    list.push(att);
    questionAttemptsMap.set(att.questionId, list);
  });

  // A question is in the missed list if the user has ever gotten it wrong,
  // or if their latest attempt was wrong, and it's not marked as understood
  const understoodSet = new Set(understoodList.map((u) => u.questionId));
  const missedQuestionIds = Array.from(questionAttemptsMap.keys()).filter((qId) => {
    const qAttempts = questionAttemptsMap.get(qId)!;
    // has at least one failed attempt
    const hasFail = qAttempts.some((a) => !a.isCorrect);
    return hasFail;
  });

  const bookmarkedQuestionIds = bookmarks.map((b) => b.questionId);

  // Bookmark actions
  const toggleBookmark = (questionId: string) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.questionId === questionId)) {
        return prev.filter((b) => b.questionId !== questionId);
      } else {
        return [...prev, { questionId, bookmarkedAt: Date.now() }];
      }
    });
  };

  const isBookmarked = (questionId: string) => {
    return bookmarks.some((b) => b.questionId === questionId);
  };

  const markAsUnderstood = (questionId: string) => {
    setUnderstoodList((prev) => {
      if (!prev.some((u) => u.questionId === questionId)) {
        return [...prev, { questionId, understoodAt: Date.now() }];
      }
      return prev;
    });
  };

  const unmarkUnderstood = (questionId: string) => {
    setUnderstoodList((prev) => prev.filter((u) => u.questionId !== questionId));
  };

  const isUnderstood = (questionId: string) => {
    return understoodSet.has(questionId);
  };

  // Session builders
  const startPracticeQuiz = ({
    domainId,
    subtopicId,
    count = 5,
    difficulty,
    shuffleOptions = false,
  }: {
    domainId?: 1 | 2 | 3;
    subtopicId?: string;
    count?: number;
    difficulty?: string;
    shuffleOptions?: boolean;
  }) => {
    let pool = [...AZ900_QUESTIONS];

    if (domainId) {
      pool = pool.filter((q) => q.domainId === domainId);
    }
    if (subtopicId) {
      pool = pool.filter((q) => q.subtopicId === subtopicId);
    }
    if (difficulty && difficulty !== 'All') {
      pool = pool.filter((q) => q.difficulty === difficulty);
    }

    if (pool.length === 0) {
      pool = [...AZ900_QUESTIONS];
    }

    const shuffled = shuffleArray(pool).slice(0, count);

    const preparedQuestions = shuffleOptions
      ? shuffled.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }))
      : shuffled;

    const title = subtopicId
      ? `Practice: ${preparedQuestions[0]?.subtopicName || 'Subtopic'}`
      : domainId
      ? `Practice: ${domains.find((d) => d.id === domainId)?.shortName || 'Domain'}`
      : 'Topic Practice';

    setActiveSession({
      id: 'sess-' + Date.now(),
      mode: 'practice',
      title,
      questions: preparedQuestions,
      currentIndex: 0,
      userAnswers: {},
      submittedQuestions: {},
      isCompleted: false,
      startedAt: Date.now(),
    });
  };

  const startMixedPractice = (count: number = 10, shuffleOptions: boolean = false) => {
    const shuffled = shuffleArray(AZ900_QUESTIONS).slice(0, count);
    const preparedQuestions = shuffleOptions
      ? shuffled.map((q) => ({
          ...q,
          options: shuffleArray(q.options),
        }))
      : shuffled;

    setActiveSession({
      id: 'sess-' + Date.now(),
      mode: 'mixed',
      title: `Mixed Practice (${count} Questions)`,
      questions: preparedQuestions,
      currentIndex: 0,
      userAnswers: {},
      submittedQuestions: {},
      isCompleted: false,
      startedAt: Date.now(),
    });
  };

  const startMockExam = (count: number = 35, timeLimitMinutes: number = 45) => {
    const sampled = sampleMockExamQuestions(AZ900_QUESTIONS, count, domainWeights);

    setActiveSession({
      id: 'mock-' + Date.now(),
      mode: 'mock',
      title: 'AZ-900 Official Mock Exam Simulation',
      questions: sampled,
      currentIndex: 0,
      userAnswers: {},
      submittedQuestions: {},
      timeRemainingSeconds: timeLimitMinutes * 60,
      isCompleted: false,
      startedAt: Date.now(),
    });
  };

  const startMistakesQuiz = (onlyUnmastered: boolean = false) => {
    let targetIds = missedQuestionIds;
    if (onlyUnmastered) {
      targetIds = targetIds.filter((id) => !understoodSet.has(id));
    }

    if (targetIds.length === 0) {
      targetIds = missedQuestionIds;
    }

    const pool = AZ900_QUESTIONS.filter((q) => targetIds.includes(q.id));
    const shuffled = shuffleArray(pool);

    setActiveSession({
      id: 'mistake-sess-' + Date.now(),
      mode: 'mistakes',
      title: 'Mistake Review & Spaced Practice',
      questions: shuffled,
      currentIndex: 0,
      userAnswers: {},
      submittedQuestions: {},
      isCompleted: false,
      startedAt: Date.now(),
    });
  };

  const startBookmarksQuiz = () => {
    const pool = AZ900_QUESTIONS.filter((q) => bookmarkedQuestionIds.includes(q.id));
    const shuffled = shuffleArray(pool);

    setActiveSession({
      id: 'bookmark-sess-' + Date.now(),
      mode: 'bookmarks',
      title: 'Bookmarked Questions Practice',
      questions: shuffled,
      currentIndex: 0,
      userAnswers: {},
      submittedQuestions: {},
      isCompleted: false,
      startedAt: Date.now(),
    });
  };

  const selectOption = (questionId: string, optionId: string) => {
    if (!activeSession || activeSession.isCompleted) return;
    // If question already submitted in practice mode, lock it
    if (activeSession.mode !== 'mock' && activeSession.submittedQuestions[questionId]) return;

    const currentQuestion = activeSession.questions.find((q) => q.id === questionId);
    if (!currentQuestion) return;

    const currentSelected = activeSession.userAnswers[questionId] || [];

    let newSelected: string[];
    if (currentQuestion.questionType === 'multiple') {
      if (currentSelected.includes(optionId)) {
        newSelected = currentSelected.filter((id) => id !== optionId);
      } else {
        newSelected = [...currentSelected, optionId];
      }
    } else {
      newSelected = [optionId];
    }

    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: newSelected,
        },
      };
    });
  };

  const submitAnswer = (questionId: string) => {
    if (!activeSession || activeSession.isCompleted) return;
    if (activeSession.submittedQuestions[questionId]) return;

    const currentQuestion = activeSession.questions.find((q) => q.id === questionId);
    if (!currentQuestion) return;

    const selected = activeSession.userAnswers[questionId] || [];
    if (selected.length === 0) return;

    const evalResult = evaluateAnswer(selected, currentQuestion.correctOptionIds);

    // Check if this was the user's first time attempting this question across their history
    const existingAttempts = attempts.filter((a) => a.questionId === questionId);
    const isFirstAttempt = existingAttempts.length === 0;

    const newAttempt: UserAttempt = {
      id: 'att-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      questionId,
      selectedOptionIds: selected,
      isCorrect: evalResult.isCorrect,
      isPartial: evalResult.isPartial,
      isFirstAttempt,
      timestamp: Date.now(),
      mode: activeSession.mode,
    };

    setAttempts((prev) => [...prev, newAttempt]);

    setActiveSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        submittedQuestions: {
          ...prev.submittedQuestions,
          [questionId]: true,
        },
      };
    });
  };

  const nextQuestion = () => {
    setActiveSession((prev) => {
      if (!prev) return null;
      if (prev.currentIndex < prev.questions.length - 1) {
        return { ...prev, currentIndex: prev.currentIndex + 1 };
      }
      return prev;
    });
  };

  const prevQuestion = () => {
    setActiveSession((prev) => {
      if (!prev) return null;
      if (prev.currentIndex > 0) {
        return { ...prev, currentIndex: prev.currentIndex - 1 };
      }
      return prev;
    });
  };

  const goToQuestion = (index: number) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      if (index >= 0 && index < prev.questions.length) {
        return { ...prev, currentIndex: index };
      }
      return prev;
    });
  };

  const finishCurrentSession = () => {
    if (!activeSession) return;

    // For mock exams, record all unsubmitted attempts now
    if (activeSession.mode === 'mock') {
      const newAttempts: UserAttempt[] = [];
      activeSession.questions.forEach((q) => {
        const selected = activeSession.userAnswers[q.id] || [];
        const evalResult = evaluateAnswer(selected, q.correctOptionIds);
        const existingAttempts = attempts.filter((a) => a.questionId === q.id);
        const isFirstAttempt = existingAttempts.length === 0;

        newAttempts.push({
          id: 'att-mock-' + q.id + '-' + Date.now(),
          questionId: q.id,
          selectedOptionIds: selected,
          isCorrect: evalResult.isCorrect,
          isPartial: evalResult.isPartial,
          isFirstAttempt,
          timestamp: Date.now(),
          mode: 'mock',
        });
      });
      setAttempts((prev) => [...prev, ...newAttempts]);
    }

    // Calculate score
    let correctCount = 0;
    activeSession.questions.forEach((q) => {
      const selected = activeSession.userAnswers[q.id] || [];
      const res = evaluateAnswer(selected, q.correctOptionIds);
      if (res.isCorrect) correctCount++;
    });

    const total = activeSession.questions.length;
    const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const durationSeconds = Math.max(1, Math.round((Date.now() - activeSession.startedAt) / 1000));

    const summary: QuizSessionSummary = {
      id: activeSession.id,
      title: activeSession.title,
      mode: activeSession.mode,
      totalQuestions: total,
      correctCount,
      accuracy,
      completedAt: Date.now(),
      durationSeconds,
    };

    setSessionHistory((prev) => [summary, ...prev.slice(0, 49)]);

    setActiveSession((prev) => {
      if (!prev) return null;
      // Mark all questions as submitted for review
      const allSubmitted: Record<string, boolean> = {};
      prev.questions.forEach((q) => {
        allSubmitted[q.id] = true;
      });
      return {
        ...prev,
        isCompleted: true,
        completedAt: Date.now(),
        submittedQuestions: allSubmitted,
      };
    });
  };

  const exitSession = () => {
    setActiveSession(null);
  };

  const resetAllProgress = () => {
    setAttempts([]);
    setBookmarks([]);
    setUnderstoodList([]);
    setSessionHistory([]);
    setActiveSession(null);
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.BOOKMARKS);
    localStorage.removeItem(STORAGE_KEYS.UNDERSTOOD);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  };

  const exportUserData = (): string => {
    return JSON.stringify(
      {
        profile: userProfile,
        attempts,
        bookmarks,
        understoodList,
        domainWeights,
        sessionHistory,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importUserData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      if (Array.isArray(data.attempts)) setAttempts(data.attempts);
      if (Array.isArray(data.bookmarks)) setBookmarks(data.bookmarks);
      if (Array.isArray(data.understoodList)) setUnderstoodList(data.understoodList);
      if (data.domainWeights) setDomainWeights(data.domainWeights);
      if (Array.isArray(data.sessionHistory)) setSessionHistory(data.sessionHistory);
      if (data.profile) setUserProfile(data.profile);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <QuizContext.Provider
      value={{
        userProfile,
        setUserProfile,
        questions: AZ900_QUESTIONS,
        domains,
        domainWeights,
        updateDomainWeights,
        attempts,
        bookmarks,
        understoodList,
        sessionHistory,
        activeSession,
        topicStats,
        overallStats,
        recommendedStudy,
        missedQuestionIds,
        bookmarkedQuestionIds,
        toggleBookmark,
        isBookmarked,
        markAsUnderstood,
        isUnderstood,
        unmarkUnderstood,
        startPracticeQuiz,
        startMixedPractice,
        startMockExam,
        startMistakesQuiz,
        startBookmarksQuiz,
        selectOption,
        submitAnswer,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        finishCurrentSession,
        exitSession,
        resetAllProgress,
        exportUserData,
        importUserData,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextValue => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
