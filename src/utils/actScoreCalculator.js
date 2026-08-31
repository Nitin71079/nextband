/**
 * KNARROW ACT 2026 — MASTER SCORE, COMPOSITE, STEM, ELA & SUPERSCORE CALCULATOR ENGINE
 * Aligned with Official ACT Specifications (Core: English, Math, Reading; Optional: Science, Writing)
 */

import { getACTConfig } from "../config/actConfig";

/**
 * Scores an individual ACT Multiple Choice question
 * Returns score integer (+1 for correct, 0 for incorrect/unattempted)
 */
export function scoreACTQuestion(question, userResponse) {
  if (userResponse === undefined || userResponse === null || String(userResponse).trim() === "") {
    return 0;
  }

  const uVal = String(userResponse).trim().toUpperCase();
  const cVal = String(question.correctAnswer || "").trim().toUpperCase();

  if (uVal === cVal) return 1;
  if (cVal.startsWith(uVal + ".") || uVal.startsWith(cVal + ".")) return 1;

  return 0;
}

/**
 * Converts Raw Section Score into Calibrated 1–36 ACT Scale
 */
export function rawToActSectionScore(rawScore, sectionKey = "english") {
  const r = Math.max(0, Number(rawScore) || 0);

  if (sectionKey === "english") {
    // 50 total questions
    if (r >= 48) return 36;
    if (r >= 46) return 35;
    if (r >= 44) return 34;
    if (r >= 42) return 32;
    if (r >= 39) return 30;
    if (r >= 35) return 27;
    if (r >= 30) return 24;
    if (r >= 25) return 20;
    if (r >= 20) return 16;
    if (r >= 15) return 13;
    if (r >= 10) return 9;
    return Math.max(1, Math.round(r * 0.7));
  } else if (sectionKey === "math") {
    // 45 total questions
    if (r >= 44) return 36;
    if (r >= 42) return 35;
    if (r >= 40) return 34;
    if (r >= 37) return 32;
    if (r >= 34) return 29;
    if (r >= 30) return 26;
    if (r >= 25) return 22;
    if (r >= 20) return 18;
    if (r >= 15) return 14;
    if (r >= 10) return 10;
    return Math.max(1, Math.round(r * 0.8));
  } else if (sectionKey === "reading") {
    // 36 total questions
    if (r >= 35) return 36;
    if (r >= 34) return 35;
    if (r >= 32) return 33;
    if (r >= 30) return 31;
    if (r >= 27) return 28;
    if (r >= 24) return 25;
    if (r >= 20) return 21;
    if (r >= 16) return 17;
    if (r >= 12) return 13;
    if (r >= 8) return 9;
    return Math.max(1, Math.round(r * 1.0));
  } else if (sectionKey === "science") {
    // 40 total questions
    if (r >= 39) return 36;
    if (r >= 37) return 34;
    if (r >= 34) return 31;
    if (r >= 31) return 28;
    if (r >= 27) return 25;
    if (r >= 23) return 21;
    if (r >= 19) return 17;
    if (r >= 15) return 13;
    if (r >= 10) return 9;
    return Math.max(1, Math.round(r * 0.9));
  }

  return Math.max(1, Math.min(36, Math.round(r)));
}

/**
 * Calculates Official ACT Composite Score (Average of English, Math, and Reading)
 * Science and Writing are STRICTLY EXCLUDED from Composite Score per ACT 2026 specifications.
 */
export function calculateACTComposite(englishScore = 1, mathScore = 1, readingScore = 1) {
  const e = Math.max(1, Math.min(36, Number(englishScore) || 1));
  const m = Math.max(1, Math.min(36, Number(mathScore) || 1));
  const r = Math.max(1, Math.min(36, Number(readingScore) || 1));

  // Average rounded to the nearest whole integer
  const avg = (e + m + r) / 3;
  return Math.round(avg);
}

/**
 * Calculates ACT STEM Score (Combined Math + Science Score)
 */
export function calculateACTStemScore(mathScore = 1, scienceScore = 1) {
  const m = Math.max(1, Math.min(36, Number(mathScore) || 1));
  const s = Math.max(1, Math.min(36, Number(scienceScore) || 1));

  return Math.round((m + s) / 2);
}

/**
 * Calculates ACT ELA Score (Combined English + Reading + Writing Score)
 */
export function calculateACTElaScore(englishScore = 1, readingScore = 1, writingScore = 2) {
  const e = Math.max(1, Math.min(36, Number(englishScore) || 1));
  const r = Math.max(1, Math.min(36, Number(readingScore) || 1));
  const w = Math.max(2, Math.min(12, Number(writingScore) || 2));

  // ELA uses weighted combination mapped to 1-36
  const wScaled = Math.round((w / 12) * 36);
  return Math.round((e + r + wScaled) / 3);
}

/**
 * Calculates ACT Superscore across multiple test attempts
 * Selects highest section scores for English, Math, and Reading
 */
export function calculateACTSuperscore(attemptsList = []) {
  if (!attemptsList || attemptsList.length === 0) {
    return { english: 1, math: 1, reading: 1, composite: 1 };
  }

  let bestEnglish = 1;
  let bestMath = 1;
  let bestReading = 1;
  let bestScience = 1;

  attemptsList.forEach((att) => {
    if ((att.englishScore || 0) > bestEnglish) bestEnglish = att.englishScore;
    if ((att.mathScore || 0) > bestMath) bestMath = att.mathScore;
    if ((att.readingScore || 0) > bestReading) bestReading = att.readingScore;
    if ((att.scienceScore || 0) > bestScience) bestScience = att.scienceScore;
  });

  const superscoreComposite = calculateACTComposite(bestEnglish, bestMath, bestReading);

  return {
    bestEnglish,
    bestMath,
    bestReading,
    bestScience,
    superscoreComposite
  };
}
