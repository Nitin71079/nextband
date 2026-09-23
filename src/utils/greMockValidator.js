/**
 * KNARROW GRE GENERAL TEST 2026 — AUTOMATED MOCK BANK VALIDATOR
 * Programmatically audits all 100 GRE Full Mocks against official post-September 2023 specifications.
 * 
 * Rules:
 * 1. AW = 1 Analyze an Issue task (30 mins)
 * 2. Verbal 1 = 12 questions (18 mins)
 * 3. Verbal 2 = 15 questions per adaptive module (hard, medium, easy, 23 mins)
 * 4. Quant 1 = 12 questions (21 mins)
 * 5. Quant 2 = 15 questions per adaptive module (hard, medium, easy, 26 mins)
 * 6. Total = 54 objective questions + 1 essay per test session path
 * 7. Answer key validity check across all question types
 * 8. Forbidden string checks (no false official claims)
 */

export const FORBIDDEN_GRE_STRINGS = [
  "OFFICIAL GRE GENERAL TEST SCORE REPORT",
  "ETS Psychometric Score",
  "2026 Calibrated GRE Score",
  "Official ETS",
  "ETS Certified"
];

export function validateGreMock(mock) {
  const issues = [];
  if (!mock || typeof mock !== "object") {
    return { valid: false, issues: ["Mock object is null or undefined"] };
  }

  const mockId = mock.id || "unknown-mock";
  const sections = mock.sections || {};

  // 1. Analytical Writing check
  const aw = sections.analyticalWriting;
  if (!aw || typeof aw !== "object") {
    issues.push(`${mockId}: missing sections.analyticalWriting`);
  } else {
    if (!aw.promptText || typeof aw.promptText !== "string" || aw.promptText.trim().length < 20) {
      issues.push(`${mockId}: invalid Analytical Writing promptText`);
    }
  }

  // 2. Verbal 1 check (12 questions)
  const v1 = sections.verbal1;
  if (!v1 || !Array.isArray(v1.questions)) {
    issues.push(`${mockId}: missing sections.verbal1.questions array`);
  } else if (v1.questions.length !== 12) {
    issues.push(`${mockId}: verbal1 question count is ${v1.questions.length}, expected 12`);
  } else {
    v1.questions.forEach((q, idx) => {
      const qErr = validateQuestionObject(q, `V1 Q${idx + 1}`);
      if (qErr) issues.push(`${mockId}: ${qErr}`);
    });
  }

  // 3. Quant 1 check (12 questions)
  const q1 = sections.quant1;
  if (!q1 || !Array.isArray(q1.questions)) {
    issues.push(`${mockId}: missing sections.quant1.questions array`);
  } else if (q1.questions.length !== 12) {
    issues.push(`${mockId}: quant1 question count is ${q1.questions.length}, expected 12`);
  } else {
    q1.questions.forEach((q, idx) => {
      const qErr = validateQuestionObject(q, `Q1 Q${idx + 1}`);
      if (qErr) issues.push(`${mockId}: ${qErr}`);
    });
  }

  // 4. Verbal 2 adaptive modules check (hard, medium, easy - 15 questions each)
  const v2 = sections.verbal2;
  if (!v2 || typeof v2.adaptiveModules !== "object") {
    issues.push(`${mockId}: missing sections.verbal2.adaptiveModules`);
  } else {
    ["hard", "medium", "easy"].forEach(modKey => {
      const modList = v2.adaptiveModules[modKey];
      if (!Array.isArray(modList)) {
        issues.push(`${mockId}: missing verbal2.adaptiveModules.${modKey}`);
      } else if (modList.length !== 15) {
        issues.push(`${mockId}: verbal2.${modKey} question count is ${modList.length}, expected 15`);
      } else {
        modList.forEach((q, idx) => {
          const qErr = validateQuestionObject(q, `V2 (${modKey}) Q${idx + 1}`);
          if (qErr) issues.push(`${mockId}: ${qErr}`);
        });
      }
    });
  }

  // 5. Quant 2 adaptive modules check (hard, medium, easy - 15 questions each)
  const q2 = sections.quant2;
  if (!q2 || typeof q2.adaptiveModules !== "object") {
    issues.push(`${mockId}: missing sections.quant2.adaptiveModules`);
  } else {
    ["hard", "medium", "easy"].forEach(modKey => {
      const modList = q2.adaptiveModules[modKey];
      if (!Array.isArray(modList)) {
        issues.push(`${mockId}: missing quant2.adaptiveModules.${modKey}`);
      } else if (modList.length !== 15) {
        issues.push(`${mockId}: quant2.${modKey} question count is ${modList.length}, expected 15`);
      } else {
        modList.forEach((q, idx) => {
          const qErr = validateQuestionObject(q, `Q2 (${modKey}) Q${idx + 1}`);
          if (qErr) issues.push(`${mockId}: ${qErr}`);
        });
      }
    });
  }

  // 6. Forbidden string scan
  const strMock = JSON.stringify(mock);
  FORBIDDEN_GRE_STRINGS.forEach(forbidden => {
    if (strMock.includes(forbidden)) {
      issues.push(`${mockId}: contains forbidden misleading string "${forbidden}"`);
    }
  });

  return {
    valid: issues.length === 0,
    issues
  };
}

function validateQuestionObject(q, contextLabel) {
  if (!q || typeof q !== "object") return `${contextLabel}: question object is null`;
  if (!q.id) return `${contextLabel}: missing question id`;
  if (!q.type) return `${contextLabel}: missing question type`;

  // Specific question type validations
  switch (q.type) {
    case "quant_comparison":
      if (!q.promptText && !q.questionText) return `${contextLabel} (QC): missing promptText`;
      if (!q.quantityA || !q.quantityB) return `${contextLabel} (QC): missing quantityA or quantityB`;
      if (!q.correctAnswer || !["A", "B", "C", "D"].includes(String(q.correctAnswer).trim().toUpperCase())) {
        return `${contextLabel} (QC): invalid correctAnswer "${q.correctAnswer}" (must be A, B, C, or D)`;
      }
      break;

    case "numeric_entry":
      if (!q.promptText && !q.questionText) return `${contextLabel} (Numeric Entry): missing promptText`;
      if (q.correctAnswer === undefined || q.correctAnswer === null) {
        return `${contextLabel} (Numeric Entry): missing correctAnswer`;
      }
      break;

    case "mcq_single":
    case "reading_comp_single":
      if (!q.promptText && !q.questionText) return `${contextLabel} (MC Single): missing promptText`;
      if (!Array.isArray(q.options) || q.options.length !== 5) {
        return `${contextLabel} (MC Single): options count is ${q.options ? q.options.length : 0}, expected 5`;
      }
      if (!q.correctAnswer) return `${contextLabel} (MC Single): missing correctAnswer`;
      break;

    case "mcq_multiple":
    case "reading_comp_multiple":
      if (!q.promptText && !q.questionText) return `${contextLabel} (MC Multiple): missing promptText`;
      if (!Array.isArray(q.options) || q.options.length < 3) {
        return `${contextLabel} (MC Multiple): options count must be at least 3`;
      }
      if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) {
        return `${contextLabel} (MC Multiple): missing correctAnswers array`;
      }
      break;

    case "text_completion_1":
      if (!q.promptText) return `${contextLabel} (TC1): missing promptText`;
      if (!Array.isArray(q.options) || q.options.length !== 5) {
        return `${contextLabel} (TC1): options count is ${q.options ? q.options.length : 0}, expected 5`;
      }
      if (!q.correctAnswer) return `${contextLabel} (TC1): missing correctAnswer`;
      break;

    case "text_completion_2":
      if (!q.promptText) return `${contextLabel} (TC2): missing promptText`;
      if (!q.options || !Array.isArray(q.options.b1) || !Array.isArray(q.options.b2)) {
        return `${contextLabel} (TC2): options missing b1 or b2 arrays`;
      }
      if (!q.correctAnswers || !q.correctAnswers.b1 || !q.correctAnswers.b2) {
        return `${contextLabel} (TC2): correctAnswers missing b1 or b2`;
      }
      break;

    case "text_completion_3":
      if (!q.promptText) return `${contextLabel} (TC3): missing promptText`;
      if (!q.options || !Array.isArray(q.options.b1) || !Array.isArray(q.options.b2) || !Array.isArray(q.options.b3)) {
        return `${contextLabel} (TC3): options missing b1, b2, or b3 arrays`;
      }
      if (!q.correctAnswers || !q.correctAnswers.b1 || !q.correctAnswers.b2 || !q.correctAnswers.b3) {
        return `${contextLabel} (TC3): correctAnswers missing b1, b2, or b3`;
      }
      break;

    case "sentence_equivalence":
      if (!q.promptText) return `${contextLabel} (SE): missing promptText`;
      if (!Array.isArray(q.options) || q.options.length !== 6) {
        return `${contextLabel} (SE): options count is ${q.options ? q.options.length : 0}, expected 6`;
      }
      if (!Array.isArray(q.correctPair) || q.correctPair.length !== 2) {
        return `${contextLabel} (SE): correctPair must contain exactly 2 elements`;
      }
      break;

    case "reading_comp_select_passage":
      if (!q.questionText) return `${contextLabel} (Select-in-Passage): missing questionText`;
      if (!q.passageText) return `${contextLabel} (Select-in-Passage): missing passageText`;
      if (q.correctSentenceIndex === undefined || q.correctSentenceIndex === null) {
        return `${contextLabel} (Select-in-Passage): missing correctSentenceIndex`;
      }
      break;

    default:
      if (!q.promptText && !q.questionText) return `${contextLabel}: missing promptText/questionText`;
  }

  return null;
}

export function validateAllGreMocks(mockBank) {
  if (!Array.isArray(mockBank)) {
    return { total: 0, passed: 0, failed: 0, issues: ["Mock bank is not an array"] };
  }

  const allIssues = [];
  let passed = 0;

  mockBank.forEach(m => {
    const res = validateGreMock(m);
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
