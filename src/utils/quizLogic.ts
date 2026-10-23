import type {
  Question,
  UserAttempt,
  ExamDomainConfig,
  TopicStat,
} from '../types/quiz.js';

export interface EvaluationResult {
  isCorrect: boolean;
  isPartial: boolean;
  missingCorrect: string[];
  unexpectedSelected: string[];
}

/**
 * Deterministically evaluates a user's selection against the correct options.
 */
export function evaluateAnswer(
  selectedOptionIds: string[],
  correctOptionIds: string[]
): EvaluationResult {
  const selectedSet = new Set(selectedOptionIds);
  const correctSet = new Set(correctOptionIds);

  const missingCorrect = correctOptionIds.filter((id) => !selectedSet.has(id));
  const unexpectedSelected = selectedOptionIds.filter((id) => !correctSet.has(id));

  const isCorrect =
    missingCorrect.length === 0 && unexpectedSelected.length === 0 && selectedOptionIds.length > 0;

  // For multi-select, partial means at least one correct was chosen without getting all or choosing wrong ones
  const isPartial =
    !isCorrect &&
    selectedOptionIds.some((id) => correctSet.has(id)) &&
    (unexpectedSelected.length === 0 || correctSet.size > 1);

  return {
    isCorrect,
    isPartial,
    missingCorrect,
    unexpectedSelected,
  };
}

/**
 * Calculates domain and subtopic breakdown statistics.
 * Distinguishes first-attempt accuracy from repeat accuracy to avoid inflating apparent mastery.
 * Requires at least 3 attempts before classifying as 'strong', 'developing', or 'weak' (otherwise 'insufficient_data').
 */
export function calculateTopicStats(
  attempts: UserAttempt[],
  questions: Question[],
  domains: ExamDomainConfig[]
): TopicStat[] {
  const questionMap = new Map<string, Question>();
  questions.forEach((q) => questionMap.set(q.id, q));

  return domains.map((domain) => {
    // Filter attempts for questions belonging to this domain
    const domainAttempts = attempts.filter((att) => {
      const q = questionMap.get(att.questionId);
      return q && q.domainId === domain.id;
    });

    const totalAttempts = domainAttempts.length;
    const firstAttempts = domainAttempts.filter((a) => a.isFirstAttempt);
    const firstAttemptsCount = firstAttempts.length;
    const firstCorrect = firstAttempts.filter((a) => a.isCorrect).length;
    const totalCorrect = domainAttempts.filter((a) => a.isCorrect).length;

    const firstAttemptAccuracy =
      firstAttemptsCount > 0 ? Math.round((firstCorrect / firstAttemptsCount) * 100) : 0;

    const overallAccuracy =
      totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

    // Classification threshold (using first attempt accuracy when available, or overall):
    let classification: 'strong' | 'developing' | 'weak' | 'insufficient_data' =
      'insufficient_data';
    if (firstAttemptsCount >= 3 || totalAttempts >= 4) {
      const metric = firstAttemptsCount >= 3 ? firstAttemptAccuracy : overallAccuracy;
      if (metric >= 80) {
        classification = 'strong';
      } else if (metric >= 60) {
        classification = 'developing';
      } else {
        classification = 'weak';
      }
    }

    // Subtopics calculation
    const subtopics = domain.subtopics.map((st) => {
      const stAttempts = domainAttempts.filter((att) => {
        const q = questionMap.get(att.questionId);
        return q && q.subtopicId === st.id;
      });
      const stCorrect = stAttempts.filter((a) => a.isCorrect).length;
      const stAcc =
        stAttempts.length > 0 ? Math.round((stCorrect / stAttempts.length) * 100) : 0;

      return {
        id: st.id,
        name: st.name,
        attempts: stAttempts.length,
        correct: stCorrect,
        accuracy: stAcc,
      };
    });

    return {
      domainId: domain.id,
      domainName: domain.name,
      totalAttempts,
      firstAttempts: firstAttemptsCount,
      firstCorrect,
      totalCorrect,
      firstAttemptAccuracy,
      overallAccuracy,
      classification,
      subtopics,
    };
  });
}

/**
 * Computes high-level user metrics
 */
export function calculateOverallStats(
  attempts: UserAttempt[],
  totalQuestionsCount: number
) {
  const attemptedQuestionIds = new Set(attempts.map((a) => a.questionId));
  const uniqueAttempted = attemptedQuestionIds.size;

  const firstAttempts = attempts.filter((a) => a.isFirstAttempt);
  const firstCorrect = firstAttempts.filter((a) => a.isCorrect).length;
  const firstAttemptAccuracy =
    firstAttempts.length > 0
      ? Math.round((firstCorrect / firstAttempts.length) * 100)
      : 0;

  const totalCorrect = attempts.filter((a) => a.isCorrect).length;
  const overallAccuracy =
    attempts.length > 0 ? Math.round((totalCorrect / attempts.length) * 100) : 0;

  return {
    totalAttempts: attempts.length,
    uniqueAttempted,
    totalQuestionsCount,
    firstAttemptsCount: firstAttempts.length,
    firstCorrect,
    firstAttemptAccuracy,
    totalCorrect,
    overallAccuracy,
    completionPercentage:
      totalQuestionsCount > 0
        ? Math.min(100, Math.round((uniqueAttempted / totalQuestionsCount) * 100))
        : 0,
  };
}

/**
 * Identifies the domain or subtopic the learner is struggling with most,
 * or the one with lowest coverage, to recommend the next study session.
 */
export function getRecommendedPracticeDomain(
  topicStats: TopicStat[],
  domains: ExamDomainConfig[]
): {
  domainId: 1 | 2 | 3;
  domainName: string;
  reason: string;
  subtopicId?: string;
  subtopicName?: string;
} {
  // If no attempts or insufficient data anywhere, recommend the highest weighted domain
  const hasAttempts = topicStats.some((ts) => ts.totalAttempts > 0);
  if (!hasAttempts) {
    const highestWeight = [...domains].sort(
      (a, b) => b.weightPercentage - a.weightPercentage
    )[0];
    return {
      domainId: highestWeight.id,
      domainName: highestWeight.name,
      reason: `Highest exam weight (${highestWeight.weightPercentage}%). Great starting point for your AZ-900 foundation.`,
    };
  }

  // Check for any classified 'weak' domain
  const weakDomains = topicStats.filter((ts) => ts.classification === 'weak');
  if (weakDomains.length > 0) {
    const sortedWeak = [...weakDomains].sort(
      (a, b) => a.firstAttemptAccuracy - b.firstAttemptAccuracy
    );
    const worst = sortedWeak[0];
    // Find lowest subtopic within it
    const subtopicsWithAttempts = worst.subtopics.filter((st) => st.attempts > 0);
    const worstSubtopic =
      subtopicsWithAttempts.length > 0
        ? [...subtopicsWithAttempts].sort((a, b) => a.accuracy - b.accuracy)[0]
        : undefined;

    return {
      domainId: worst.domainId,
      domainName: worst.domainName,
      reason: `Accuracy is currently ${worst.firstAttemptAccuracy}% (${worst.totalAttempts} attempts). Targeted practice will raise your passing odds.`,
      subtopicId: worstSubtopic?.id,
      subtopicName: worstSubtopic?.name,
    };
  }

  // Check for unattempted or least attempted domain
  const leastAttempted = [...topicStats].sort(
    (a, b) => a.totalAttempts - b.totalAttempts
  )[0];
  if (leastAttempted.totalAttempts < 3) {
    return {
      domainId: leastAttempted.domainId,
      domainName: leastAttempted.domainName,
      reason: `Low practice sample size (${leastAttempted.totalAttempts} questions answered). Test your knowledge here to discover any hidden gaps.`,
    };
  }

  // Check for developing domain
  const developing = topicStats.filter((ts) => ts.classification === 'developing');
  if (developing.length > 0) {
    const firstDev = developing[0];
    return {
      domainId: firstDev.domainId,
      domainName: firstDev.domainName,
      reason: `Currently developing at ${firstDev.firstAttemptAccuracy}%. Reinforcing these concepts will push you into the 85%+ mastery tier.`,
    };
  }

  // All strong! Pick the highest weighted domain to keep sharp
  const highestWeight = [...domains].sort(
    (a, b) => b.weightPercentage - a.weightPercentage
  )[0];
  return {
    domainId: highestWeight.id,
    domainName: highestWeight.name,
    reason: `All practiced domains are strong! Keep your skills sharp with a refresher on the core Azure architecture domain.`,
  };
}

/**
 * Samples questions for a mock exam according to domain percentage weights.
 * Official AZ-900 ranges:
 * - Domain 1 (Cloud Concepts): ~25-30%
 * - Domain 2 (Azure Architecture & Services): ~35-40%
 * - Domain 3 (Management & Governance): ~30-35%
 */
export function sampleMockExamQuestions(
  allQuestions: Question[],
  totalCount: number,
  domainWeights: Record<number, number>
): Question[] {
  if (allQuestions.length === 0) return [];
  if (allQuestions.length <= totalCount) {
    // Shuffle and return all available
    return [...allQuestions].sort(() => Math.random() - 0.5);
  }

  const byDomain: Record<number, Question[]> = { 1: [], 2: [], 3: [] };
  allQuestions.forEach((q) => {
    if (!byDomain[q.domainId]) byDomain[q.domainId] = [];
    byDomain[q.domainId].push(q);
  });

  // Calculate target counts per domain
  const totalWeight =
    (domainWeights[1] || 25) + (domainWeights[2] || 40) + (domainWeights[3] || 35);

  const targets: Record<number, number> = {
    1: Math.round((totalCount * (domainWeights[1] || 25)) / totalWeight),
    2: Math.round((totalCount * (domainWeights[2] || 40)) / totalWeight),
    3: Math.round((totalCount * (domainWeights[3] || 35)) / totalWeight),
  };

  // Adjust total to equal target totalCount
  let currentSum = targets[1] + targets[2] + targets[3];
  while (currentSum > totalCount) {
    const maxDomain = [1, 2, 3].sort((a, b) => targets[b] - targets[a])[0];
    if (targets[maxDomain] > 0) {
      targets[maxDomain]--;
      currentSum--;
    } else break;
  }
  while (currentSum < totalCount) {
    // distribute to highest weighted domain
    const maxDomain = [1, 2, 3].sort((a, b) => (domainWeights[b] || 0) - (domainWeights[a] || 0))[0];
    targets[maxDomain]++;
    currentSum++;
  }

  const selected: Question[] = [];

  [1, 2, 3].forEach((domId) => {
    const pool = [...(byDomain[domId] || [])].sort(() => Math.random() - 0.5);
    const count = Math.min(pool.length, targets[domId]);
    selected.push(...pool.slice(0, count));
  });

  // If short due to domain size limitations, fill from any remaining questions
  if (selected.length < totalCount) {
    const selectedIds = new Set(selected.map((q) => q.id));
    const remaining = allQuestions
      .filter((q) => !selectedIds.has(q.id))
      .sort(() => Math.random() - 0.5);
    selected.push(...remaining.slice(0, totalCount - selected.length));
  }

  // Shuffle final list and slice exact totalCount
  return selected.sort(() => Math.random() - 0.5).slice(0, totalCount);
}

/**
 * Fisher-Yates array shuffle (pure)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
