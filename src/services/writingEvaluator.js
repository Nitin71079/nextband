import { calculateIELTSTotalWritingBand, countWords } from "../utils/writingBandCalculator";

/**
 * Fallback rules-based writing evaluator implementing official IELTS Task 1 & Task 2 scoring:
 * - 33.3% weight for Task 1
 * - 66.7% weight for Task 2
 * - Separate criteria breakdown for each task
 */
export function evaluateWriting({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
}) {
  const t1Words = countWords(task1Text);
  const t2Words = countWords(task2Text);

  // Evaluate Task 1
  const t1Eval = evaluateTask1(task1Text, t1Words);

  // Evaluate Task 2
  const t2Eval = evaluateTask2(task2Text, t2Words);

  // Final Overall Band = 33% Task 1 + 67% Task 2
  const finalOverallBand = calculateIELTSTotalWritingBand(t1Eval.band, t2Eval.band);

  return {
    success: true,
    overallBand: finalOverallBand,
    calculationBreakdown: `33% Task 1 (Band ${t1Eval.band.toFixed(1)}) + 67% Task 2 (Band ${t2Eval.band.toFixed(1)}) = Final Overall Band ${finalOverallBand.toFixed(1)}`,
    task1: t1Eval,
    task2: t2Eval,
    improvedTask1: `Improved version of Task 1 response...`,
    improvedTask2: `Improved version of Task 2 response...`,
  };
}

function evaluateTask1(text, wordCount) {
  let ta = 5.5; // Task Achievement
  let cc = 5.5; // Coherence & Cohesion
  let lr = 5.5; // Lexical Resource
  let gra = 5.5; // Grammar Range & Accuracy

  if (wordCount >= 150) ta += 1.0;
  else if (wordCount >= 120) ta += 0.5;

  const lower = text.toLowerCase();
  if (lower.includes("overall") || lower.includes("shows") || lower.includes("illustrates")) ta += 0.5;
  if (lower.includes("compared") || lower.includes("whereas") || lower.includes("while")) cc += 0.5;
  if (lower.includes("significant") || lower.includes("dramatically") || lower.includes("substantially")) lr += 0.5;
  if ((text.match(/[.,;:!?]/g) || []).length > 6) gra += 0.5;

  ta = Math.min(9.0, Math.max(1.0, ta));
  cc = Math.min(9.0, Math.max(1.0, cc));
  lr = Math.min(9.0, Math.max(1.0, lr));
  gra = Math.min(9.0, Math.max(1.0, gra));

  const band = Number(((ta + cc + lr + gra) / 4).toFixed(1));

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  if (ta >= 6.0) strengths.push("Provided a clear overview of main trends and features.");
  else weaknesses.push("Task Achievement can be improved by adding a distinct overview paragraph.");

  if (cc >= 6.0) strengths.push("Logical organization and smooth transitions between data points.");
  else recommendations.push("Use clearer linking words when making data comparisons.");

  if (lr >= 6.0) strengths.push("Good range of data reporting vocabulary.");
  else recommendations.push("Use more specific trend vocabulary (e.g., 'fluctuated', 'surpassed').");

  return {
    band,
    wordCount,
    taskAchievement: ta,
    coherenceCohesion: cc,
    lexicalResource: lr,
    grammarRangeAccuracy: gra,
    strengths,
    weaknesses,
    recommendations,
  };
}

function evaluateTask2(text, wordCount) {
  let tr = 5.5; // Task Response
  let cc = 5.5; // Coherence & Cohesion
  let lr = 5.5; // Lexical Resource
  let gra = 5.5; // Grammar Range & Accuracy

  if (wordCount >= 250) tr += 1.0;
  else if (wordCount >= 220) tr += 0.5;

  const lower = text.toLowerCase();
  if (lower.includes("agree") || lower.includes("disagree") || lower.includes("opinion") || lower.includes("believe")) tr += 0.5;
  if (lower.includes("however") || lower.includes("therefore") || lower.includes("furthermore")) cc += 0.5;
  if (lower.includes("consequently") || lower.includes("substantial") || lower.includes("pivotal")) lr += 0.5;
  if ((text.match(/[.,;:!?]/g) || []).length > 10) gra += 0.5;

  tr = Math.min(9.0, Math.max(1.0, tr));
  cc = Math.min(9.0, Math.max(1.0, cc));
  lr = Math.min(9.0, Math.max(1.0, lr));
  gra = Math.min(9.0, Math.max(1.0, gra));

  const band = Number(((tr + cc + lr + gra) / 4).toFixed(1));

  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  if (tr >= 6.0) strengths.push("Addressed main prompt questions with relevant main ideas.");
  else weaknesses.push("Arguments could be supported with more concrete examples.");

  if (cc >= 6.0) strengths.push("Clear paragraph division with effective topic sentences.");
  else recommendations.push("Ensure each body paragraph focuses on one primary central idea.");

  if (lr >= 6.0) strengths.push("Effective use of academic vocabulary and collocations.");
  else recommendations.push("Incorporate a wider range of topic-specific vocabulary.");

  return {
    band,
    wordCount,
    taskResponse: tr,
    coherenceCohesion: cc,
    lexicalResource: lr,
    grammarRangeAccuracy: gra,
    strengths,
    weaknesses,
    recommendations,
  };
}
