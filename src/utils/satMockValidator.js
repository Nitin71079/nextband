/**
 * KNARROW DIGITAL SAT 2026 — PAYLOAD AUDIT & MOCK VALIDATOR ENGINE
 * Verifies submission payload integrity, distinguishes system errors from zero completions,
 * and enforces official College Board score floor boundaries (200 RW / 200 Math / 400 Total).
 */

/**
 * Validates a Digital SAT submission payload before passing to score calculator.
 */
export function validateSATSubmissionPayload(payload = {}) {
  if (!payload || typeof payload !== "object") {
    return {
      isValid: false,
      status: "SYSTEM_ERROR",
      errorCode: "UNSUBMITTED_PAYLOAD",
      message: "Submission payload is null or invalid object format.",
      attemptedCount: 0,
      totalQuestions: 0,
      isZeroSubmission: false
    };
  }

  const { testId, userAnswers = {}, totalQuestions = 98 } = payload;

  if (!testId && Object.keys(userAnswers).length === 0) {
    return {
      isValid: false,
      status: "SYSTEM_ERROR",
      errorCode: "EMPTY_PAYLOAD",
      message: "Unsubmitted exam payload detected.",
      attemptedCount: 0,
      totalQuestions: 0,
      isZeroSubmission: false
    };
  }

  // Count valid non-empty student answers
  let attemptedCount = 0;
  Object.values(userAnswers).forEach((ans) => {
    if (ans !== undefined && ans !== null && String(ans).trim() !== "") {
      attemptedCount++;
    }
  });

  const isZeroSubmission = attemptedCount === 0;
  const isPartialSubmission = attemptedCount > 0 && attemptedCount < totalQuestions;

  return {
    isValid: true,
    status: isZeroSubmission ? "ZERO_COMPLETION" : isPartialSubmission ? "PARTIAL_COMPLETION" : "FULL_COMPLETION",
    errorCode: null,
    message: isZeroSubmission
      ? "Legitimate zero-input exam completion detected. Floor scores assigned."
      : "Valid exam submission.",
    attemptedCount,
    totalQuestions,
    attemptPct: totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0,
    isZeroSubmission,
    isPartialSubmission
  };
}

/**
 * Enforces College Board score floor and ceiling boundaries (200–800 section, 400–1600 total)
 */
export function enforceSATScoreFloor(score, min = 200, max = 800) {
  const num = Number(score);
  if (isNaN(num) || num === null || num === undefined) {
    return min;
  }
  return Math.max(min, Math.min(max, Math.round(num / 10) * 10));
}
