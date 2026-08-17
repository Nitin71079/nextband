/**
 * 2026 TOEFL iBT Score Calculator & Conversion Utilities
 * Based on ETS 2026 TOEFL Test Specifications (1.0 - 6.0 Scale)
 */

export function toeflToIelts(score) {
  const s = Number(score) || 1.0;
  if (s >= 6.0) return "8.5 - 9.0";
  if (s >= 5.5) return "7.5 - 8.0";
  if (s >= 5.0) return "7.0";
  if (s >= 4.5) return "6.5";
  if (s >= 4.0) return "6.0";
  if (s >= 3.5) return "5.5";
  if (s >= 3.0) return "5.0";
  if (s >= 2.5) return "4.5";
  if (s >= 2.0) return "4.0";
  if (s >= 1.5) return "3.5";
  return "3.0";
}

export function toeflToCEFR(score) {
  const s = Number(score) || 1.0;
  if (s >= 6.0) return "C2 (Highly Proficient)";
  if (s >= 5.0) return "C1 (Advanced)";
  if (s >= 4.0) return "B2 (Upper-Intermediate)";
  if (s >= 3.0) return "B1 (Intermediate)";
  if (s >= 2.0) return "A2 (Elementary)";
  return "A1 (Beginner)";
}

export function toeflToOldScale(score) {
  const s = Number(score) || 1.0;
  if (s >= 6.0) return "115 - 120";
  if (s >= 5.5) return "100 - 114";
  if (s >= 5.0) return "90 - 99";
  if (s >= 4.5) return "80 - 89";
  if (s >= 4.0) return "70 - 79";
  if (s >= 3.5) return "60 - 69";
  if (s >= 3.0) return "50 - 59";
  if (s >= 2.5) return "40 - 49";
  if (s >= 2.0) return "30 - 39";
  if (s >= 1.5) return "20 - 29";
  return "10 - 19";
}

export function calculateToeflOverallScore(reading, listening, writing, speaking) {
  const r = Number(reading) || 1.0;
  const l = Number(listening) || 1.0;
  const w = Number(writing) || 1.0;
  const s = Number(speaking) || 1.0;

  const avg = (r + l + w + s) / 4;
  // Round to nearest 0.5 half-band
  const rounded = Math.round(avg * 2) / 2;
  return Math.min(6.0, Math.max(1.0, rounded));
}

/**
 * Raw score to 1.0 - 6.0 band conversion for Reading/Listening adaptive modules
 */
export function rawToBandScore(correctCount, totalCount) {
  if (!totalCount || totalCount <= 0) return 1.0;
  const percentage = (correctCount / totalCount) * 100;
  if (percentage >= 92) return 6.0;
  if (percentage >= 84) return 5.5;
  if (percentage >= 75) return 5.0;
  if (percentage >= 65) return 4.5;
  if (percentage >= 55) return 4.0;
  if (percentage >= 45) return 3.5;
  if (percentage >= 35) return 3.0;
  if (percentage >= 25) return 2.5;
  if (percentage >= 15) return 2.0;
  if (percentage >= 8) return 1.5;
  return 1.0;
}

/**
 * Evaluate Complete the Words items
 * userAnswers: array of string inputs
 * missingParts: array of expected strings
 */
export function evaluateCompleteTheWords(userAnswers, missingParts) {
  let correct = 0;
  missingParts.forEach((expected, i) => {
    const userVal = (userAnswers[i] || "").trim().toLowerCase();
    if (userVal === expected.toLowerCase()) {
      correct++;
    }
  });
  return { correct, total: missingParts.length };
}

/**
 * Evaluate Build a Sentence items
 * userWords: array of words chosen in order
 * targetSentence: full correct sentence string
 */
export function evaluateBuildASentence(userSentence, targetSentence) {
  const cleanUser = (userSentence || "").replace(/[^\w\s]/g, "").toLowerCase().trim();
  const cleanTarget = (targetSentence || "").replace(/[^\w\s]/g, "").toLowerCase().trim();
  return cleanUser === cleanTarget;
}
