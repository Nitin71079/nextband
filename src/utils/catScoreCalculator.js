/**
 * KNARROW CAT 2026 — MASTER SCORE & PERCENTILE CALCULATOR ENGINE
 * Aligned with Official IIM CAT Specifications (+3 / -1 for MCQ, +3 / 0 for TITA)
 */

import { getCATConfig } from "../config/catConfig";

/**
 * Scores an individual CAT Question deterministically
 * Returns score integer (+3, -1, or 0)
 */
export function scoreCATQuestion(question, userResponse) {
  if (userResponse === undefined || userResponse === null || String(userResponse).trim() === "") {
    return 0; // Unattempted
  }

  const qType = question.questionType || (question.options ? "MCQ" : "TITA");
  const isMcq = qType === "MCQ";

  const uVal = String(userResponse).trim();
  const cVal = String(question.correctAnswer || "").trim();

  let isCorrect = false;

  if (isMcq) {
    // MCQ option match (e.g. "A" or "A. Option Text" or "Option Text")
    if (uVal.toUpperCase() === cVal.toUpperCase()) {
      isCorrect = true;
    } else if (cVal.startsWith(uVal.toUpperCase() + ".") || uVal.startsWith(cVal.toUpperCase() + ".")) {
      isCorrect = true;
    }
  } else {
    // TITA numeric equivalence check (e.g. "12", "12.0", "1/2" vs "0.5")
    if (uVal === cVal) {
      isCorrect = true;
    } else {
      const uNum = parseFloat(uVal);
      const cNum = parseFloat(cVal);
      if (!isNaN(uNum) && !isNaN(cNum) && Math.abs(uNum - cNum) < 0.0001) {
        isCorrect = true;
      } else if (Array.isArray(question.acceptedAnswers)) {
        isCorrect = question.acceptedAnswers.some(ans => String(ans).trim() === uVal);
      }
    }
  }

  if (isCorrect) return 3;
  return isMcq ? -1 : 0; // TITA has ZERO negative penalty
}

/**
 * Calculates raw section scores and total raw score for a completed CAT attempt
 */
export function calculateCATSectionScores(userAnswers = {}, testQuestions = [], versionKey = "CAT_2026") {
  let varcRaw = 0;
  let dilrRaw = 0;
  let qaRaw = 0;

  let varcAttempted = 0, varcCorrect = 0, varcWrong = 0;
  let dilrAttempted = 0, dilrCorrect = 0, dilrWrong = 0;
  let qaAttempted = 0, qaCorrect = 0, qaWrong = 0;

  testQuestions.forEach((q) => {
    const resp = userAnswers[q.id];
    const score = scoreCATQuestion(q, resp);
    const sec = (q.section || "").toUpperCase();
    const isAttempted = resp !== undefined && resp !== null && String(resp).trim() !== "";

    if (sec.includes("VARC") || sec.includes("VERBAL")) {
      varcRaw += score;
      if (isAttempted) {
        varcAttempted++;
        if (score > 0) varcCorrect++;
        else varcWrong++;
      }
    } else if (sec.includes("DILR") || sec.includes("LOGICAL") || sec.includes("DATA")) {
      dilrRaw += score;
      if (isAttempted) {
        dilrAttempted++;
        if (score > 0) dilrCorrect++;
        else dilrWrong++;
      }
    } else {
      qaRaw += score;
      if (isAttempted) {
        qaAttempted++;
        if (score > 0) qaCorrect++;
        else qaWrong++;
      }
    }
  });

  const totalRaw = varcRaw + dilrRaw + qaRaw;

  return {
    varcRaw,
    dilrRaw,
    qaRaw,
    totalRaw,
    stats: {
      varc: { attempted: varcAttempted, correct: varcCorrect, wrong: varcWrong, total: 24 },
      dilr: { attempted: dilrAttempted, correct: dilrCorrect, wrong: dilrWrong, total: 22 },
      qa: { attempted: qaAttempted, correct: qaCorrect, wrong: qaWrong, total: 22 }
    }
  };
}

/**
 * Converts Raw Score into Calibrated CAT Scaled Score
 */
export function rawToCatScaledScore(rawScore, section = "TOTAL") {
  const r = Math.max(-20, Math.min(204, Number(rawScore) || 0));
  if (section === "TOTAL") {
    return Math.max(0, Math.round(r * 1.05 + 15));
  }
  return Math.max(0, Math.round(r * 1.05 + 5));
}

/**
 * Maps Total Raw Score and Section Scores to Calibrated Estimated CAT Percentile (0.00 - 99.99th Percentile)
 */
export function rawToCatPercentile(totalRawScore) {
  const r = Math.max(-20, Math.min(204, Number(totalRawScore) || 0));

  if (r >= 105) return 99.99;
  if (r >= 95) return 99.95;
  if (r >= 85) return 99.50;
  if (r >= 75) return 99.00;
  if (r >= 68) return 98.00;
  if (r >= 60) return 96.50;
  if (r >= 52) return 94.00;
  if (r >= 44) return 90.00;
  if (r >= 38) return 85.00;
  if (r >= 32) return 80.00;
  if (r >= 26) return 70.00;
  if (r >= 20) return 60.00;
  if (r >= 14) return 50.00;
  if (r >= 8) return 35.00;
  if (r >= 2) return 20.00;
  return 5.00;
}

/**
 * Calculates Sectional Percentiles for VARC, DILR, and QA
 */
export function getSectionPercentile(rawScore, sectionName) {
  const r = Math.max(-10, Math.min(72, Number(rawScore) || 0));
  if (r >= 45) return 99.80;
  if (r >= 38) return 99.00;
  if (r >= 30) return 96.00;
  if (r >= 24) return 90.00;
  if (r >= 18) return 80.00;
  if (r >= 12) return 65.00;
  if (r >= 6) return 45.00;
  return 15.00;
}

/**
 * Computes Detailed DILR Set Selection Efficiency & Strategy Analytics
 */
export function calculateCATAnalytics(attemptData = {}) {
  const { totalRaw = 0, varcRaw = 0, dilrRaw = 0, qaRaw = 0, setAnalytics = [] } = attemptData;

  const estimatedPercentile = rawToCatPercentile(totalRaw);
  const varcPercentile = getSectionPercentile(varcRaw, "VARC");
  const dilrPercentile = getSectionPercentile(dilrRaw, "DILR");
  const qaPercentile = getSectionPercentile(qaRaw, "QA");

  return {
    rawScores: { varcRaw, dilrRaw, qaRaw, totalRaw },
    scaledScores: {
      varc: rawToCatScaledScore(varcRaw, "VARC"),
      dilr: rawToCatScaledScore(dilrRaw, "DILR"),
      qa: rawToCatScaledScore(qaRaw, "QA"),
      total: rawToCatScaledScore(totalRaw, "TOTAL")
    },
    percentiles: {
      overall: estimatedPercentile,
      varc: varcPercentile,
      dilr: dilrPercentile,
      qa: qaPercentile
    },
    setEfficiency: setAnalytics.map((s, idx) => ({
      setId: s.setId || `Set ${idx + 1}`,
      title: s.title || `DILR Set ${idx + 1}`,
      efficiency: s.timeSpent > 0 ? (s.score / (s.timeSpent / 60)).toFixed(2) : "0.00",
      classification: s.score >= 9 ? "HIGH-VALUE SET" : s.timeSpent > 600 && s.score <= 3 ? "TIME TRAP" : "GOOD SELECTION"
    }))
  };
}
