import test from 'node:test';
import assert from 'node:assert/strict';
import {
  evaluateAnswer,
  calculateTopicStats,
  calculateOverallStats,
  getRecommendedPracticeDomain,
  sampleMockExamQuestions,
} from './quizLogic.ts';
import type { Question, UserAttempt, ExamDomainConfig } from '../types/quiz.ts';

const mockDomains: ExamDomainConfig[] = [
  {
    id: 1,
    name: 'Describe cloud concepts',
    shortName: 'Cloud Concepts',
    weightPercentage: 25,
    description: 'Cloud fundamentals and shared responsibility',
    iconName: 'Cloud',
    subtopics: [
      { id: 'cloud-fundamentals', name: 'Cloud Computing Fundamentals' },
      { id: 'shared-responsibility', name: 'Shared Responsibility Model' },
    ],
  },
  {
    id: 2,
    name: 'Describe Azure architecture and services',
    shortName: 'Architecture & Services',
    weightPercentage: 40,
    description: 'Regions, compute, networking, storage, Entra ID',
    iconName: 'Server',
    subtopics: [
      { id: 'compute', name: 'Azure Compute' },
      { id: 'storage', name: 'Azure Storage' },
    ],
  },
  {
    id: 3,
    name: 'Describe Azure management and governance',
    shortName: 'Management & Governance',
    weightPercentage: 35,
    description: 'Cost management, Policy, Monitor, Purview',
    iconName: 'ShieldCheck',
    subtopics: [
      { id: 'cost-mgmt', name: 'Cost Management & Pricing' },
      { id: 'governance', name: 'Azure Policy & Locks' },
    ],
  },
];

const mockQuestions: Question[] = [
  {
    id: 'q1',
    domainId: 1,
    domainName: 'Describe cloud concepts',
    subtopicId: 'cloud-fundamentals',
    subtopicName: 'Cloud Computing Fundamentals',
    difficulty: 'Beginner',
    questionType: 'single',
    prompt: 'Which cloud feature scales automatically in response to demand?',
    options: [
      { id: 'A', text: 'High Availability', explanation: 'HA keeps services running.' },
      { id: 'B', text: 'Elasticity', explanation: 'Elasticity dynamically scales resources.' },
      { id: 'C', text: 'Geo-redundancy', explanation: 'Geo-redundancy replicates data across regions.' },
      { id: 'D', text: 'Disaster Recovery', explanation: 'DR restores services after a disaster.' },
    ],
    correctOptionIds: ['B'],
    whyCorrect: 'Elasticity is the ability to automatically scale computing resources based on dynamic load.',
    keyTakeaway: 'Elasticity = automatic scaling to match real-time workload changes.',
    docUrl: 'https://learn.microsoft.com/azure/cloud-adoption-framework/',
    docTitle: 'Cloud Concepts Overview',
    verificationStatus: 'verified',
    lastReviewed: '2025-01-01',
  },
  {
    id: 'q2',
    domainId: 2,
    domainName: 'Describe Azure architecture and services',
    subtopicId: 'compute',
    subtopicName: 'Azure Compute',
    difficulty: 'Intermediate',
    questionType: 'multiple',
    prompt: 'Select two serverless Azure compute offerings.',
    options: [
      { id: 'A', text: 'Azure Functions', explanation: 'Event-driven serverless code.' },
      { id: 'B', text: 'Azure Virtual Machines', explanation: 'IaaS requiring OS management.' },
      { id: 'C', text: 'Azure Logic Apps', explanation: 'Serverless workflow automation.' },
      { id: 'D', text: 'Azure Dedicated Host', explanation: 'Single-tenant physical servers.' },
    ],
    correctOptionIds: ['A', 'C'],
    whyCorrect: 'Both Azure Functions and Azure Logic Apps are serverless services.',
    keyTakeaway: 'Serverless abstracts infrastructure and bills per execution/action.',
    docUrl: 'https://learn.microsoft.com/azure/architecture/guide/technology-choices/compute-overview',
    docTitle: 'Azure Compute Guide',
    verificationStatus: 'verified',
    lastReviewed: '2025-01-01',
  },
  {
    id: 'q3',
    domainId: 3,
    domainName: 'Describe Azure management and governance',
    subtopicId: 'governance',
    subtopicName: 'Azure Policy & Locks',
    difficulty: 'Exam-level',
    questionType: 'single',
    prompt: 'Which resource lock prevents modification but allows read access?',
    options: [
      { id: 'A', text: 'CannotDelete', explanation: 'CannotDelete allows read and modify, only blocks delete.' },
      { id: 'B', text: 'ReadOnly', explanation: 'ReadOnly prevents modification and deletion while allowing reads.' },
      { id: 'C', text: 'WriteOnly', explanation: 'Not a valid Azure lock type.' },
      { id: 'D', text: 'AdminOnly', explanation: 'Not a valid Azure lock type.' },
    ],
    correctOptionIds: ['B'],
    whyCorrect: 'ReadOnly locks make the resource strictly read-only for all users, including Subscription Admins.',
    keyTakeaway: 'ReadOnly blocks updates and deletions; ReadOnly inherits down to child resources.',
    docUrl: 'https://learn.microsoft.com/azure/azure-resource-manager/management/lock-resources',
    docTitle: 'Lock resources to prevent unexpected changes',
    verificationStatus: 'verified',
    lastReviewed: '2025-01-01',
  },
];

test('evaluateAnswer correctly evaluates single-choice question', () => {
  const resultCorrect = evaluateAnswer(['B'], ['B']);
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.isPartial, false);
  assert.equal(resultCorrect.missingCorrect.length, 0);
  assert.equal(resultCorrect.unexpectedSelected.length, 0);

  const resultWrong = evaluateAnswer(['A'], ['B']);
  assert.equal(resultWrong.isCorrect, false);
  assert.deepEqual(resultWrong.missingCorrect, ['B']);
  assert.deepEqual(resultWrong.unexpectedSelected, ['A']);
});

test('evaluateAnswer evaluates multi-select with full and partial correctness', () => {
  // Full match
  const fullMatch = evaluateAnswer(['A', 'C'], ['A', 'C']);
  assert.equal(fullMatch.isCorrect, true);
  assert.equal(fullMatch.isPartial, false);

  // Partial: only chose 'A' out of ['A', 'C']
  const partialMatch = evaluateAnswer(['A'], ['A', 'C']);
  assert.equal(partialMatch.isCorrect, false);
  assert.equal(partialMatch.isPartial, true);
  assert.deepEqual(partialMatch.missingCorrect, ['C']);
  assert.deepEqual(partialMatch.unexpectedSelected, []);

  // Chose one correct and one wrong
  const mixedMatch = evaluateAnswer(['A', 'B'], ['A', 'C']);
  assert.equal(mixedMatch.isCorrect, false);
  assert.deepEqual(mixedMatch.missingCorrect, ['C']);
  assert.deepEqual(mixedMatch.unexpectedSelected, ['B']);
});

test('calculateTopicStats tracks first-attempt vs overall accuracy separately', () => {
  const attempts: UserAttempt[] = [
    // First attempt on q1: wrong
    {
      id: 'att1',
      questionId: 'q1',
      selectedOptionIds: ['A'],
      isCorrect: false,
      isFirstAttempt: true,
      timestamp: 1000,
      mode: 'practice',
    },
    // Second attempt on q1: correct (retry)
    {
      id: 'att2',
      questionId: 'q1',
      selectedOptionIds: ['B'],
      isCorrect: true,
      isFirstAttempt: false,
      timestamp: 2000,
      mode: 'mistakes',
    },
    // Another attempt on q1
    {
      id: 'att3',
      questionId: 'q1',
      selectedOptionIds: ['B'],
      isCorrect: true,
      isFirstAttempt: false,
      timestamp: 3000,
      mode: 'practice',
    },
    // Fourth attempt on q1
    {
      id: 'att4',
      questionId: 'q1',
      selectedOptionIds: ['B'],
      isCorrect: true,
      isFirstAttempt: false,
      timestamp: 4000,
      mode: 'practice',
    },
  ];

  const stats = calculateTopicStats(attempts, mockQuestions, mockDomains);
  const domain1 = stats.find((s) => s.domainId === 1)!;

  assert.equal(domain1.totalAttempts, 4);
  assert.equal(domain1.firstAttempts, 1);
  assert.equal(domain1.firstCorrect, 0);
  assert.equal(domain1.firstAttemptAccuracy, 0); // 0% on first attempt!
  assert.equal(domain1.overallAccuracy, 75); // 3 out of 4 overall

  // Domain with < 3 attempts has insufficient_data if not 4 total
  const domain2 = stats.find((s) => s.domainId === 2)!;
  assert.equal(domain2.classification, 'insufficient_data');
});

test('calculateOverallStats accurately aggregates metrics', () => {
  const attempts: UserAttempt[] = [
    {
      id: '1',
      questionId: 'q1',
      selectedOptionIds: ['B'],
      isCorrect: true,
      isFirstAttempt: true,
      timestamp: 1000,
      mode: 'practice',
    },
    {
      id: '2',
      questionId: 'q2',
      selectedOptionIds: ['A'],
      isCorrect: false,
      isFirstAttempt: true,
      timestamp: 2000,
      mode: 'practice',
    },
  ];

  const overall = calculateOverallStats(attempts, 10);
  assert.equal(overall.totalAttempts, 2);
  assert.equal(overall.uniqueAttempted, 2);
  assert.equal(overall.firstCorrect, 1);
  assert.equal(overall.firstAttemptAccuracy, 50);
  assert.equal(overall.overallAccuracy, 50);
  assert.equal(overall.completionPercentage, 20); // 2 out of 10
});

test('getRecommendedPracticeDomain identifies weak topics and highest weight for beginners', () => {
  // Beginner with no attempts
  const emptyStats = calculateTopicStats([], mockQuestions, mockDomains);
  const recBeginner = getRecommendedPracticeDomain(emptyStats, mockDomains);
  // Domain 2 has 40% weight (highest)
  assert.equal(recBeginner.domainId, 2);

  // Weak domain
  const attempts: UserAttempt[] = [
    { id: '1', questionId: 'q1', selectedOptionIds: ['A'], isCorrect: false, isFirstAttempt: true, timestamp: 1, mode: 'practice' },
    { id: '2', questionId: 'q1', selectedOptionIds: ['A'], isCorrect: false, isFirstAttempt: true, timestamp: 2, mode: 'practice' },
    { id: '3', questionId: 'q1', selectedOptionIds: ['A'], isCorrect: false, isFirstAttempt: true, timestamp: 3, mode: 'practice' },
    { id: '4', questionId: 'q1', selectedOptionIds: ['A'], isCorrect: false, isFirstAttempt: false, timestamp: 4, mode: 'practice' },
  ];
  const statsWithWeak = calculateTopicStats(attempts, mockQuestions, mockDomains);
  const recWeak = getRecommendedPracticeDomain(statsWithWeak, mockDomains);
  assert.equal(recWeak.domainId, 1);
  assert.match(recWeak.reason, /Accuracy is currently 0%/);
});

test('sampleMockExamQuestions returns requested count and samples domains', () => {
  const sampled = sampleMockExamQuestions(mockQuestions, 2, { 1: 30, 2: 40, 3: 30 });
  assert.equal(sampled.length, 2);
});

test('AZ-900 Question Bank integrity check', async () => {
  const { AZ900_QUESTIONS } = await import('../data/az900Questions.ts');
  assert.ok(AZ900_QUESTIONS.length >= 30, `Expected at least 30 questions, got ${AZ900_QUESTIONS.length}`);

  const ids = new Set<string>();
  const byDomain: Record<number, number> = { 1: 0, 2: 0, 3: 0 };

  for (const q of AZ900_QUESTIONS) {
    assert.ok(!ids.has(q.id), `Duplicate ID: ${q.id}`);
    ids.add(q.id);
    byDomain[q.domainId] = (byDomain[q.domainId] || 0) + 1;

    assert.ok(q.prompt.length > 10, `Question ${q.id} prompt too short`);
    assert.ok(q.options.length >= 4, `Question ${q.id} needs at least 4 options`);
    assert.ok(q.correctOptionIds.length >= 1, `Question ${q.id} needs at least 1 correct option`);
    assert.ok(q.whyCorrect.length > 15, `Question ${q.id} whyCorrect too short`);
    assert.ok(q.keyTakeaway.length > 5, `Question ${q.id} keyTakeaway missing`);
    assert.ok(q.docUrl.startsWith('https://'), `Question ${q.id} docUrl must be valid https URL`);

    // Ensure every option has detailed non-generic explanation
    for (const opt of q.options) {
      assert.ok(
        opt.explanation.length > 20,
        `Question ${q.id} option ${opt.id} explanation is too brief: "${opt.explanation}"`
      );
      assert.ok(
        !opt.explanation.toLowerCase().includes('that is incorrect. try again'),
        `Generic distractor explanation found in ${q.id}`
      );
    }
  }

  // Ensure all 3 domains have good representation
  assert.ok(byDomain[1] >= 8, 'Domain 1 has at least 8 questions');
  assert.ok(byDomain[2] >= 10, 'Domain 2 has at least 10 questions');
  assert.ok(byDomain[3] >= 8, 'Domain 3 has at least 8 questions');
});
