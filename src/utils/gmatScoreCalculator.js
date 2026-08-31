/**
 * KNARROW GMAT 2026 — MASTER SCORE & PERCENTILE ENGINE
 * Converts IRT ability estimates to Official GMAT Section Scale (60–90) and Total Score (205–805)
 */

/**
 * Scores an individual GMAT question (MCQ, DS, Table Analysis, Two-Part Analysis)
 */
export function scoreGMATQuestion(question, userResponse) {
  if (userResponse === undefined || userResponse === null) return 0;

  if (question.questionType === "TWO_PART_ANALYSIS") {
    // Requires both Part A and Part B to be correct
    const uPartA = String(userResponse?.partA || "").trim().toUpperCase();
    const uPartB = String(userResponse?.partB || "").trim().toUpperCase();
    const cPartA = String(question.correctAnswer?.partA || "").trim().toUpperCase();
    const cPartB = String(question.correctAnswer?.partB || "").trim().toUpperCase();

    if (uPartA === cPartA && uPartB === cPartB) return 1;
    return 0;
  }

  const uVal = String(userResponse).trim().toUpperCase();
  const cVal = String(question.correctAnswer || "").trim().toUpperCase();

  if (uVal === cVal) return 1;
  if (cVal.startsWith(uVal + ".") || uVal.startsWith(cVal + ".")) return 1;

  return 0;
}

/**
 * Converts final section IRT theta estimate into official GMAT Section Score (60–90 scale)
 */
export function calculateGMATSectionScore(finalTheta = 0) {
  // theta range [-3.0, +3.0] maps linearly to 60–90 scale
  const norm = (finalTheta + 3.0) / 6.0;
  const rawScore = 60 + norm * 30;

  // Round to nearest integer between 60 and 90
  const sectionScore = Math.max(60, Math.min(90, Math.round(rawScore)));
  return sectionScore;
}

/**
 * Converts 3 Section Scores (Quant, Verbal, DI) into Total GMAT Score (205–805 scale, 10-pt increments)
 */
export function calculateGMATTotalScore(quantScore = 60, verbalScore = 60, diScore = 60) {
  const q = Math.max(60, Math.min(90, Number(quantScore) || 60));
  const v = Math.max(60, Math.min(90, Number(verbalScore) || 60));
  const d = Math.max(60, Math.min(90, Number(diScore) || 60));

  const avg = (q + v + d) / 3;
  // 60-90 scale average maps to 205-805
  const norm = (avg - 60) / 30;
  const rawTotal = 205 + norm * 600;

  // Round to nearest 10-point increment ending in 5 (205, 215, 225, ..., 805)
  const roundedBase = Math.round((rawTotal - 5) / 10) * 10 + 5;
  const totalScore = Math.max(205, Math.min(805, roundedBase));
  return totalScore;
}

/**
 * Maps 205–805 Total Score to Official GMAT Estimated Percentile Rank
 */
export function calculateGMATPercentile(totalScore = 205) {
  const s = Math.max(205, Math.min(805, Number(totalScore) || 205));
  if (s >= 755) return 99;
  if (s >= 715) return 98;
  if (s >= 675) return 93;
  if (s >= 645) return 86;
  if (s >= 615) return 76;
  if (s >= 585) return 63;
  if (s >= 555) return 50;
  if (s >= 515) return 35;
  if (s >= 475) return 22;
  if (s >= 435) return 12;
  return 5;
}
