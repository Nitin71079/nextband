/**
 * KNARROW PTE ACADEMIC 2026 — FULL MOCK VALIDATOR
 * Audits PTE Academic Practice Mocks for 100% adherence to 2026 Pearson Enhanced Specifications
 */

export const FORBIDDEN_STRINGS = [
  "PTE Academic 2026 Official Simulation",
  "Official 2026 PTE Academic Score Report",
  "Official Pearson",
  "ETS TOEFL Speaker",
  "Visual Graph Metadata",
  "Main Trend",
  "Key Features",
  "Spoken Transcript Preview",
  "or type your response here"
];

export const REQUIRED_TASK_COUNTS = {
  personalIntro: 1,
  // Part 1: Speaking & Writing (35 scored)
  readAloud: 6,
  repeatSentence: 10,
  describeImage: 5,
  retellLecture: 2,
  answerShortQuestion: 5,
  summarizeGroupDiscussion: 2,
  respondToSituation: 2,
  summarizeWrittenText: 2,
  writeEssay: 1,
  // Part 2: Reading (15 scored)
  dropdownBlanks: 5,
  mcqMultiple: 2,
  reorderParagraphs: 2,
  dragDropBlanks: 4,
  mcqSingle: 2,
  // Part 3: Listening (15 scored)
  summarizeSpokenText: 1,
  listeningMcqMultiple: 2,
  fillBlanksTypeIn: 2,
  highlightCorrectSummary: 2,
  listeningMcqSingle: 2,
  selectMissingWord: 1,
  highlightIncorrectWords: 2,
  writeFromDictation: 3
};

/**
 * Validates a single PTE mock object
 */
export function validatePteMock(mock) {
  const issues = [];
  if (!mock || typeof mock !== "object") {
    return { valid: false, issues: ["Mock object is null or undefined"] };
  }

  const mockId = mock.id || "unknown-mock";
  const sections = mock.sections || {};

  // Check Sections presence
  if (!sections.personalIntro) issues.append ? issues.push(`${mockId}: missing sections.personalIntro`) : issues.push(`${mockId}: missing sections.personalIntro`);
  if (!sections.speakingWriting) issues.push(`${mockId}: missing sections.speakingWriting`);
  if (!sections.reading) issues.push(`${mockId}: missing sections.reading`);
  if (!sections.listening) issues.push(`${mockId}: missing sections.listening`);

  const sw = sections.speakingWriting || {};
  const rd = sections.reading || {};
  const ls = sections.listening || {};

  // Part 1 Speaking & Writing Counts
  if ((sw.readAloud || []).length !== REQUIRED_TASK_COUNTS.readAloud) {
    issues.push(`${mockId}: readAloud count is ${(sw.readAloud || []).length}, expected ${REQUIRED_TASK_COUNTS.readAloud}`);
  }
  if ((sw.repeatSentence || []).length !== REQUIRED_TASK_COUNTS.repeatSentence) {
    issues.push(`${mockId}: repeatSentence count is ${(sw.repeatSentence || []).length}, expected ${REQUIRED_TASK_COUNTS.repeatSentence}`);
  }
  if ((sw.describeImage || []).length !== REQUIRED_TASK_COUNTS.describeImage) {
    issues.push(`${mockId}: describeImage count is ${(sw.describeImage || []).length}, expected ${REQUIRED_TASK_COUNTS.describeImage}`);
  }
  if ((sw.retellLecture || []).length !== REQUIRED_TASK_COUNTS.retellLecture) {
    issues.push(`${mockId}: retellLecture count is ${(sw.retellLecture || []).length}, expected ${REQUIRED_TASK_COUNTS.retellLecture}`);
  }
  if ((sw.answerShortQuestion || []).length !== REQUIRED_TASK_COUNTS.answerShortQuestion) {
    issues.push(`${mockId}: answerShortQuestion count is ${(sw.answerShortQuestion || []).length}, expected ${REQUIRED_TASK_COUNTS.answerShortQuestion}`);
  }
  if ((sw.summarizeGroupDiscussion || []).length !== REQUIRED_TASK_COUNTS.summarizeGroupDiscussion) {
    issues.push(`${mockId}: summarizeGroupDiscussion count is ${(sw.summarizeGroupDiscussion || []).length}, expected ${REQUIRED_TASK_COUNTS.summarizeGroupDiscussion}`);
  }
  if ((sw.respondToSituation || []).length !== REQUIRED_TASK_COUNTS.respondToSituation) {
    issues.push(`${mockId}: respondToSituation count is ${(sw.respondToSituation || []).length}, expected ${REQUIRED_TASK_COUNTS.respondToSituation}`);
  }
  if ((sw.summarizeWrittenText || []).length !== REQUIRED_TASK_COUNTS.summarizeWrittenText) {
    issues.push(`${mockId}: summarizeWrittenText count is ${(sw.summarizeWrittenText || []).length}, expected ${REQUIRED_TASK_COUNTS.summarizeWrittenText}`);
  }

  // Part 2 Reading Counts
  if ((rd.dropdownBlanks || []).length !== REQUIRED_TASK_COUNTS.dropdownBlanks) {
    issues.push(`${mockId}: dropdownBlanks count is ${(rd.dropdownBlanks || []).length}, expected ${REQUIRED_TASK_COUNTS.dropdownBlanks}`);
  }
  if ((rd.mcqMultiple || []).length !== REQUIRED_TASK_COUNTS.mcqMultiple) {
    issues.push(`${mockId}: Reading mcqMultiple count is ${(rd.mcqMultiple || []).length}, expected ${REQUIRED_TASK_COUNTS.mcqMultiple}`);
  }
  if ((rd.reorderParagraphs || []).length !== REQUIRED_TASK_COUNTS.reorderParagraphs) {
    issues.push(`${mockId}: reorderParagraphs count is ${(rd.reorderParagraphs || []).length}, expected ${REQUIRED_TASK_COUNTS.reorderParagraphs}`);
  }
  if ((rd.dragDropBlanks || []).length !== REQUIRED_TASK_COUNTS.dragDropBlanks) {
    issues.push(`${mockId}: dragDropBlanks count is ${(rd.dragDropBlanks || []).length}, expected ${REQUIRED_TASK_COUNTS.dragDropBlanks}`);
  }
  if ((rd.mcqSingle || []).length !== REQUIRED_TASK_COUNTS.mcqSingle) {
    issues.push(`${mockId}: Reading mcqSingle count is ${(rd.mcqSingle || []).length}, expected ${REQUIRED_TASK_COUNTS.mcqSingle}`);
  }

  // Part 3 Listening Counts
  if ((ls.mcqMultiple || []).length !== REQUIRED_TASK_COUNTS.listeningMcqMultiple) {
    issues.push(`${mockId}: Listening mcqMultiple count is ${(ls.mcqMultiple || []).length}, expected ${REQUIRED_TASK_COUNTS.listeningMcqMultiple}`);
  }
  if ((ls.fillBlanksTypeIn || []).length !== REQUIRED_TASK_COUNTS.fillBlanksTypeIn) {
    issues.push(`${mockId}: fillBlanksTypeIn count is ${(ls.fillBlanksTypeIn || []).length}, expected ${REQUIRED_TASK_COUNTS.fillBlanksTypeIn}`);
  }
  if ((ls.highlightCorrectSummary || []).length !== REQUIRED_TASK_COUNTS.highlightCorrectSummary) {
    issues.push(`${mockId}: highlightCorrectSummary count is ${(ls.highlightCorrectSummary || []).length}, expected ${REQUIRED_TASK_COUNTS.highlightCorrectSummary}`);
  }
  if ((ls.mcqSingle || []).length !== REQUIRED_TASK_COUNTS.listeningMcqSingle) {
    issues.push(`${mockId}: Listening mcqSingle count is ${(ls.mcqSingle || []).length}, expected ${REQUIRED_TASK_COUNTS.listeningMcqSingle}`);
  }
  if ((ls.highlightIncorrectWords || []).length !== REQUIRED_TASK_COUNTS.highlightIncorrectWords) {
    issues.push(`${mockId}: highlightIncorrectWords count is ${(ls.highlightIncorrectWords || []).length}, expected ${REQUIRED_TASK_COUNTS.highlightIncorrectWords}`);
  }
  if ((ls.writeFromDictation || []).length !== REQUIRED_TASK_COUNTS.writeFromDictation) {
    issues.push(`${mockId}: writeFromDictation count is ${(ls.writeFromDictation || []).length}, expected ${REQUIRED_TASK_COUNTS.writeFromDictation}`);
  }

  // Scan JSON string representation for forbidden strings
  const strMock = JSON.stringify(mock);
  FORBIDDEN_STRINGS.forEach(forbidden => {
    if (strMock.includes(forbidden)) {
      issues.push(`${mockId}: contains forbidden string "${forbidden}"`);
    }
  });

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Validates array of mocks
 */
export function validateAllPteMocks(mockBank) {
  if (!Array.isArray(mockBank)) {
    return { total: 0, passed: 0, failed: 0, issues: ["Mock bank is not an array"] };
  }

  const allIssues = [];
  let passed = 0;

  mockBank.forEach(m => {
    const res = validatePteMock(m);
    if (res.valid) {
      passed++;
    } else {
      allIssues.push(...res.issues);
    }
  });

  return {
    total: mockBank.length,
    passed,
    failed: mockBank.length - passed,
    issues: allIssues
  };
}
