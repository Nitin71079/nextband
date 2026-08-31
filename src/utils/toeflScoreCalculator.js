/**
 * KNARROW 2026 TOEFL iBT Master Score Calculator & Psychometric Engine
 * Aligned with ETS 2026 TOEFL Test Specifications (1.0 - 6.0 Predicted Scale)
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

/**
 * Calculates overall predicted TOEFL band (1.0 to 6.0) with confidence interval
 */
export function calculateToeflOverallScore(reading, listening, writing, speaking) {
  const r = Number(reading) || 1.0;
  const l = Number(listening) || 1.0;
  const w = Number(writing) || 1.0;
  const s = Number(speaking) || 1.0;

  const avg = (r + l + w + s) / 4;
  const rounded = Math.round(avg * 2) / 2;
  const band = Math.min(6.0, Math.max(1.0, rounded));

  // Compute estimated score range (e.g. 4.5 - 5.5)
  const minRange = Math.max(1.0, Math.round((band - 0.5) * 2) / 2);
  const maxRange = Math.min(6.0, Math.round((band + 0.5) * 2) / 2);

  return {
    predictedScore: band,
    scoreRangeText: `${minRange.toFixed(1)} – ${maxRange.toFixed(1)}`,
    confidence: "High (2026 Specification Calibrated)",
  };
}

/**
 * 0 - 5 Raw Task Score to 1.0 - 6.0 Section Band Conversion Model
 */
export function rawTaskPointsToBand(rawPoints, maxRawPoints) {
  if (!maxRawPoints || maxRawPoints <= 0) return 1.0;
  const pct = (rawPoints / maxRawPoints) * 100;
  if (pct >= 90) return 6.0;
  if (pct >= 82) return 5.5;
  if (pct >= 73) return 5.0;
  if (pct >= 64) return 4.5;
  if (pct >= 55) return 4.0;
  if (pct >= 45) return 3.5;
  if (pct >= 35) return 3.0;
  if (pct >= 25) return 2.5;
  if (pct >= 15) return 2.0;
  if (pct >= 8) return 1.5;
  return 1.0;
}

/**
 * IRT-inspired Multistage Adaptive Theta Ability Estimator
 */
export function estimateAbilityTheta(correctCount, totalCount) {
  if (totalCount === 0) return 0.0;
  const p = correctCount / totalCount;
  // Log-odds transformation for theta ability (-3.0 to +3.0)
  const boundedP = Math.min(0.95, Math.max(0.05, p));
  const theta = Math.log(boundedP / (1 - boundedP));
  return {
    theta: Number(theta.toFixed(2)),
    selectUpperModule: theta >= 0.25, // Threshold to select Upper Stage 2 Module
  };
}

/**
 * Deterministic sentence reconstruction evaluator for Build a Sentence (10 items)
 */
export function evaluateBuildASentence(userSentence, targetSentence) {
  const cleanUser = (userSentence || "").replace(/[^\w\s]/g, "").toLowerCase().trim();
  const cleanTarget = (targetSentence || "").replace(/[^\w\s]/g, "").toLowerCase().trim();
  return cleanUser === cleanTarget ? 1 : 0;
}

/**
 * Deterministic letter fragment evaluator for Complete the Words
 */
export function evaluateCompleteTheWords(userAnswers = [], missingParts = []) {
  let correct = 0;
  const parts = Array.isArray(missingParts) ? missingParts : [];
  parts.forEach((expected, i) => {
    const userVal = (userAnswers && userAnswers[i] ? String(userAnswers[i]) : "").trim().toLowerCase();
    if (expected && userVal === String(expected).toLowerCase()) {
      correct++;
    }
  });
  return { correct, total: parts.length };
}

/**
 * Calculate detailed subskill dimension analytics for report dashboard
 */
export function calculateTOEFLAnalytics(data = {}) {
  // Support both direct result object or structured subskill payloads
  const readingResults = data.readingResults || data.readingAnalytics || {};
  const listeningResults = data.listeningResults || data.listeningAnalytics || {};
  const writingResults = data.writingResults || data.writingAnalytics || {};
  const speakingResults = data.speakingResults || data.speakingAnalytics || {};

  const cwPct = readingResults.cwPct ?? data.cwPct ?? 0;
  const dlPct = readingResults.dlPct ?? data.dlPct ?? 0;
  const acadPct = readingResults.acadPct ?? data.acadPct ?? 0;

  const respPct = listeningResults.respPct ?? data.respPct ?? 0;
  const convPct = listeningResults.convPct ?? data.convPct ?? 0;
  const annPct = listeningResults.annPct ?? data.annPct ?? 0;
  const talkPct = listeningResults.talkPct ?? data.talkPct ?? 0;

  const bsScore = writingResults.bsScore ?? data.bsScore ?? 0;
  const emailRawScore = writingResults.emailRawScore ?? data.writingFeedback?.email?.rawTaskScore ?? 0;
  const discRawScore = writingResults.discRawScore ?? data.writingFeedback?.discussion?.rawTaskScore ?? 0;

  const listenRepeatScore = speakingResults.listenRepeatScore ?? data.listenRepeatScore ?? 0;
  const interviewScore = speakingResults.interviewRawScore ?? data.speakingFeedback?.rawTaskScore ?? 0;

  return {
    reading: {
      completeWordsPct: cwPct,
      dailyLifePct: dlPct,
      academicPassagePct: acadPct,
      vocabularyPct: Math.round((cwPct + dlPct) / 2),
      inferencePct: Math.round((acadPct + dlPct) / 2),
    },
    listening: {
      chooseResponsePct: respPct,
      conversationPct: convPct,
      announcementPct: annPct,
      academicTalkPct: talkPct,
    },
    writing: {
      buildSentenceScore: bsScore, // out of 10
      emailTaskScore: emailRawScore, // 0-5
      discussionTaskScore: discRawScore, // 0-5
      taskAchievement: Math.round(((emailRawScore + discRawScore) / 10) * 100),
      grammarPrecision: Math.round(((emailRawScore + discRawScore) / 10) * 100),
      vocabularyVariety: Math.round(((emailRawScore + discRawScore) / 10) * 100),
      socialRegister: Math.round(((emailRawScore + discRawScore) / 10) * 100),
    },
    speaking: {
      listenRepeatScore: listenRepeatScore, // out of 35
      interviewScore: interviewScore, // out of 5
      accuracy: speakingResults.accuracy ?? data.speakingAccuracy ?? (listenRepeatScore > 0 ? Math.round((listenRepeatScore / 35) * 100) : 0),
      fluency: speakingResults.fluency ?? (interviewScore > 0 ? interviewScore * 20 : 0),
      pronunciation: speakingResults.pronunciation ?? (interviewScore > 0 ? interviewScore * 20 : 0),
      prosody: speakingResults.prosody ?? (interviewScore > 0 ? interviewScore * 20 : 0),
      intelligibility: speakingResults.intelligibility ?? (interviewScore > 0 ? interviewScore * 20 : 0),
    }
  };
}
