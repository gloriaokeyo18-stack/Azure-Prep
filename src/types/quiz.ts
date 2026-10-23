export type QuestionType = 'single' | 'multiple';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Exam-level';
export type VerificationStatus = 'verified' | 'review_needed';

export interface QuestionOption {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
  explanation: string; // Specific factual reason why this option is correct or incorrect
}

export interface Question {
  id: string;
  domainId: 1 | 2 | 3;
  domainName: string;
  subtopicId: string;
  subtopicName: string;
  difficulty: DifficultyLevel;
  questionType: QuestionType;
  prompt: string;
  codeSnippet?: string;
  options: QuestionOption[];
  correctOptionIds: string[]; // e.g. ['B'] or ['A', 'C']
  whyCorrect: string;
  keyTakeaway: string;
  examTrap?: string;
  practicalAnalogy?: string;
  docUrl: string;
  docTitle: string;
  verificationStatus: VerificationStatus;
  lastReviewed: string;
}

export interface ExamDomainConfig {
  id: 1 | 2 | 3;
  name: string;
  shortName: string;
  weightPercentage: number; // e.g. 25-30%, 35-40%, 30-35%
  description: string;
  iconName: string;
  subtopics: { id: string; name: string }[];
}

export interface UserAttempt {
  id: string;
  questionId: string;
  selectedOptionIds: string[];
  isCorrect: boolean;
  isPartial?: boolean;
  isFirstAttempt: boolean;
  timestamp: number;
  mode: 'practice' | 'mixed' | 'mock' | 'mistakes' | 'bookmarks';
}

export interface BookmarkRecord {
  questionId: string;
  bookmarkedAt: number;
  note?: string;
}

export interface UnderstoodRecord {
  questionId: string;
  understoodAt: number;
}

export interface QuizSessionState {
  id: string;
  mode: 'practice' | 'mixed' | 'mock' | 'mistakes' | 'bookmarks';
  title: string;
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, string[]>; // questionId -> selectedOptionIds
  submittedQuestions: Record<string, boolean>; // questionId -> true
  timeRemainingSeconds?: number;
  isCompleted: boolean;
  startedAt: number;
  completedAt?: number;
}

export interface TopicStat {
  domainId: 1 | 2 | 3;
  domainName: string;
  totalAttempts: number;
  firstAttempts: number;
  firstCorrect: number;
  totalCorrect: number;
  firstAttemptAccuracy: number;
  overallAccuracy: number;
  classification: 'strong' | 'developing' | 'weak' | 'insufficient_data';
  subtopics: {
    id: string;
    name: string;
    attempts: number;
    correct: number;
    accuracy: number;
  }[];
}
