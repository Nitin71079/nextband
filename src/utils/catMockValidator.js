/**
 * KNARROW CAT SIMULATOR 2026 — AUTOMATED MOCK BANK VALIDATOR
 * Programmatically audits all 100 CAT Full Mocks against current computer-based CAT specifications.
 * 
 * Rules:
 * 1. VARC = 24 questions (40 mins)
 * 2. DILR = 22 questions (40 mins)
 * 3. QA = 22 questions (40 mins)
 * 4. Total = 68 objective questions per test session (Max Raw Score = 204)
 * 5. MCQ questions must have valid options & correct answer (+3 / -1 marking)
 * 6. TITA (Non-MCQ) questions must have valid numerical/text answer (+3 / 0 marking, NO negative marking)
 * 7. Forbidden string checks (no false official claims)
 */

export const FORBIDDEN_CAT_STRINGS = [
  "OFFICIAL CAT SCORE REPORT",
  "IIM CALIBRATED",
  "Official CAT Percentile",
  "Official CAT Simulation",
  "Official IIM"
];

export function validateCatMock(mock) {
  const issues = [];
  if (!mock || typeof mock !== "object") {
    return { valid: false, issues: ["Mock object is null or undefined"] };
  }

  const mockId = mock.id || "unknown-mock";
  const sections = mock.sections || {};

  // 1. VARC check (24 questions)
  const varc = sections.varc;
  if (!varc || !Array.isArray(varc.questions)) {
    issues.push(`${mockId}: missing sections.varc.questions array`);
  } else if (varc.questions.length !== 24) {
    issues.push(`${mockId}: VARC question count is ${varc.questions.length}, expected 24`);
  } else {
    varc.questions.forEach((q, idx) => {
      const qErr = validateCatQuestionObject(q, `VARC Q${idx + 1}`);
      if (qErr) issues.push(`${mockId}: ${qErr}`);
    });
  }

  // 2. DILR check (22 questions)
  const dilr = sections.dilr;
  if (!dilr || !Array.isArray(dilr.questions)) {
    issues.push(`${mockId}: missing sections.dilr.questions array`);
  } else if (dilr.questions.length !== 22) {
    issues.push(`${mockId}: DILR question count is ${dilr.questions.length}, expected 22`);
  } else {
    dilr.questions.forEach((q, idx) => {
      const qErr = validateCatQuestionObject(q, `DILR Q${idx + 1}`);
      if (qErr) issues.push(`${mockId}: ${qErr}`);
    });
  }

  // 3. QA check (22 questions)
  const qa = sections.qa;
  if (!qa || !Array.isArray(qa.questions)) {
    issues.push(`${mockId}: missing sections.qa.questions array`);
  } else if (qa.questions.length !== 22) {
    issues.push(`${mockId}: QA question count is ${qa.questions.length}, expected 22`);
  } else {
    qa.questions.forEach((q, idx) => {
      const qErr = validateCatQuestionObject(q, `QA Q${idx + 1}`);
      if (qErr) issues.push(`${mockId}: ${qErr}`);
    });
  }

  // 4. Forbidden string scan
  const strMock = JSON.stringify(mock);
  FORBIDDEN_CAT_STRINGS.forEach(forbidden => {
    if (strMock.includes(forbidden)) {
      issues.push(`${mockId}: contains forbidden misleading string "${forbidden}"`);
    }
  });

  return {
    valid: issues.length === 0,
    issues
  };
}

function validateCatQuestionObject(q, contextLabel) {
  if (!q || typeof q !== "object") return `${contextLabel}: question object is null`;
  if (!q.id) return `${contextLabel}: missing question id`;
  if (!q.questionText) return `${contextLabel}: missing questionText`;

  const isTita = q.questionType === "TITA" || q.isTita === true;

  if (isTita) {
    if (q.correctAnswer === undefined || q.correctAnswer === null || String(q.correctAnswer).trim() === "") {
      return `${contextLabel} (TITA): missing correctAnswer`;
    }
  } else {
    // MCQ
    if (!Array.isArray(q.options) || q.options.length < 4) {
      return `${contextLabel} (MCQ): options count is ${q.options ? q.options.length : 0}, expected at least 4`;
    }
    if (!q.correctAnswer) {
      return `${contextLabel} (MCQ): missing correctAnswer`;
    }
  }

  return null;
}

export function validateAllCatMocks(mockBank) {
  if (!Array.isArray(mockBank)) {
    return { total: 0, passed: 0, failed: 0, issues: ["Mock bank is not an array"] };
  }

  const allIssues = [];
  let passed = 0;

  mockBank.forEach(m => {
    const res = validateCatMock(m);
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
