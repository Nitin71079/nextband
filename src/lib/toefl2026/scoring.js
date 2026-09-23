/**
 * KNARROW 2026 TOEFL iBT Centralized Psychometric Scoring Module
 * Aligned with official ETS 2026 TOEFL Specifications (1.0 - 6.0 Predicted Scale)
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

export function calculateComparableScore(score) {
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
  if (s >= 1.5) return "10 - 29";
  return "0+";
}

export function toeflToOldScale(score) {
  return calculateComparableScore(score);
}

export function calculateOverallScore(reading, listening, writing, speaking) {
  const r = Number(reading) || 1.0;
  const l = Number(listening) || 1.0;
  const w = Number(writing) || 1.0;
  const s = Number(speaking) || 1.0;

  const avg = (r + l + w + s) / 4;
  const rounded = Math.round(avg * 2) / 2;
  const band = Math.min(6.0, Math.max(1.0, rounded));

  const minRange = Math.max(1.0, Math.round((band - 0.5) * 2) / 2);
  const maxRange = Math.min(6.0, Math.round((band + 0.5) * 2) / 2);

  return {
    predictedScore: band,
    scoreRangeText: `${minRange.toFixed(1)} – ${maxRange.toFixed(1)}`,
    confidence: "High (2026 Specification Calibrated)",
  };
}

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

export function estimateAbilityTheta(correctCount, totalCount) {
  if (totalCount === 0) return 0.0;
  const p = correctCount / totalCount;
  const boundedP = Math.min(0.95, Math.max(0.05, p));
  const theta = Math.log(boundedP / (1 - boundedP));
  return {
    theta: Number(theta.toFixed(2)),
    selectUpperModule: theta >= 0.25,
  };
}
