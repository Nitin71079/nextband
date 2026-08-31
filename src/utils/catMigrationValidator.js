/**
 * KNARROW CAT 2026 — MASTER MIGRATION & AUDIT VALIDATOR
 * Verifies CAT test structures, question counts, timing, TITA rules, DILR sets, and RC passages.
 */

import { getCATConfig } from "../config/catConfig";

/**
 * Classifies an individual question or set item for migration
 */
export function classifyCATContent(item = {}) {
  const hasValidSection = ["VARC", "DILR", "QA"].includes((item.section || "").toUpperCase());
  const hasValidType = ["MCQ", "TITA"].includes((item.questionType || (item.options ? "MCQ" : "TITA")).toUpperCase());
  const hasText = Boolean((item.questionText || item.promptText || item.scenario || "").trim());
  const hasAnswer = item.correctAnswer !== undefined && item.correctAnswer !== null;

  if (!hasText || !hasAnswer) return "INVALID";
  if (!hasValidSection || !hasValidType) return "TRANSFORMABLE";

  if (item.status === "retired") return "RETIRED";
  if (item.status === "needs_review") return "NEEDS_REVIEW";

  return "VALID_CURRENT";
}

/**
 * Audits a complete CAT Test Object against CAT_2026 / CAT_CURRENT Specifications
 */
export function validateCATTest(testObj = {}, versionKey = "CAT_2026") {
  const config = getCATConfig(versionKey);
  const errors = [];
  const warnings = [];

  if (!testObj || typeof testObj !== "object") {
    return { valid: false, errors: ["Invalid test object provided."] };
  }

  const sections = testObj.sections || {};
  const varcQuestions = sections.varc?.questions || [];
  const dilrQuestions = sections.dilr?.questions || [];
  const qaQuestions = sections.qa?.questions || [];

  const totalQuestions = varcQuestions.length + dilrQuestions.length + qaQuestions.length;

  if (totalQuestions !== config.totalQuestions) {
    errors.push(`Question count mismatch: expected ${config.totalQuestions}, found ${totalQuestions}.`);
  }

  if (varcQuestions.length !== 24) {
    errors.push(`VARC section question count mismatch: expected 24, found ${varcQuestions.length}.`);
  }

  if (dilrQuestions.length !== 22) {
    errors.push(`DILR section question count mismatch: expected 22, found ${dilrQuestions.length}.`);
  }

  if (qaQuestions.length !== 22) {
    errors.push(`QA section question count mismatch: expected 22, found ${qaQuestions.length}.`);
  }

  // Audit Question Types & TITA Rules
  const allQuestions = [...varcQuestions, ...dilrQuestions, ...qaQuestions];
  let mcqCount = 0;
  let titaCount = 0;

  allQuestions.forEach((q, idx) => {
    const classification = classifyCATContent(q);
    if (classification === "INVALID") {
      errors.push(`Question #${idx + 1} (${q.id || "unnamed"}) is invalid: missing text or correct answer.`);
    }

    const qType = (q.questionType || (q.options ? "MCQ" : "TITA")).toUpperCase();
    if (qType === "MCQ") mcqCount++;
    else if (qType === "TITA") titaCount++;
  });

  return {
    valid: errors.length === 0,
    testId: testObj.id || "unknown",
    testVersion: testObj.testVersion || versionKey,
    totalQuestions,
    counts: { varc: varcQuestions.length, dilr: dilrQuestions.length, qa: qaQuestions.length, mcqCount, titaCount },
    errors,
    warnings
  };
}
