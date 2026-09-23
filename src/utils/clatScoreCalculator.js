/**
 * KNARROW CLAT 2026/2027 — MASTER SCORE & NLU PERCENTILE ENGINE
 * Evaluates 120 Questions / 120 Marks (+1 for correct, -0.25 penalty for incorrect)
 */

export function scoreCLATQuestion(question, userResponse) {
  if (!question || userResponse === undefined || userResponse === null || String(userResponse).trim() === "") {
    return { marks: 0, penalty: 0, isCorrect: false, isAttempted: false };
  }

  const uVal = String(userResponse).trim().toUpperCase();
  const cVal = String(question.correctAnswer || "").trim().toUpperCase();

  const isCorrect = uVal === cVal || cVal.startsWith(uVal + ".") || uVal.startsWith(cVal + ".");
  if (isCorrect) {
    return { marks: 1, penalty: 0, isCorrect: true, isAttempted: true };
  } else {
    return { marks: -0.25, penalty: 0.25, isCorrect: false, isAttempted: true };
  }
}

export function evaluateFullCLATScore(questionsList = [], userAnswers = {}) {
  let totalMarks = 0;
  let totalPenalty = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const sectionScores = { english: 0, gk: 0, legal: 0, logical: 0, quant: 0 };
  const sectionCounts = {
    english: { correct: 0, total: 0, marks: 0 },
    gk: { correct: 0, total: 0, marks: 0 },
    legal: { correct: 0, total: 0, marks: 0 },
    logical: { correct: 0, total: 0, marks: 0 },
    quant: { correct: 0, total: 0, marks: 0 }
  };

  const questionResults = [];

  questionsList.forEach((q) => {
    const ans = userAnswers[q.id];
    const sec = q.section || "english";

    if (sectionCounts[sec]) {
      sectionCounts[sec].total++;
    }

    const isAttempted = ans !== undefined && ans !== null && String(ans).trim() !== "";

    if (!isAttempted) {
      unattemptedCount++;
      questionResults.push({ ...q, isAttempted: false, isCorrect: false, marksAwarded: 0 });
      return;
    }

    const res = scoreCLATQuestion(q, ans);
    totalMarks += res.marks;
    totalPenalty += res.penalty;

    if (sectionScores[sec] !== undefined) {
      sectionScores[sec] += res.marks;
    }

    if (res.isCorrect) {
      correctCount++;
      if (sectionCounts[sec]) {
        sectionCounts[sec].correct++;
        sectionCounts[sec].marks += res.marks;
      }
    } else {
      incorrectCount++;
    }

    questionResults.push({ ...q, isAttempted: true, isCorrect: res.isCorrect, marksAwarded: res.marks });
  });

  const finalTotalMarks = Math.max(-30, Math.min(120, parseFloat(totalMarks.toFixed(2))));
  const attemptedCount = correctCount + incorrectCount;
  const accuracyPct = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Estimated NLU Percentile Rank
  let percentile = 15.0;
  if (finalTotalMarks >= 100) percentile = 99.9;
  else if (finalTotalMarks >= 90) percentile = 99.2;
  else if (finalTotalMarks >= 80) percentile = 97.5;
  else if (finalTotalMarks >= 70) percentile = 92.0;
  else if (finalTotalMarks >= 60) percentile = 84.0;
  else if (finalTotalMarks >= 50) percentile = 70.0;
  else if (finalTotalMarks >= 35) percentile = 50.0;

  return {
    finalTotalMarks,
    totalPenalty: parseFloat(totalPenalty.toFixed(2)),
    correctCount,
    incorrectCount,
    unattemptedCount,
    attemptedCount,
    totalQuestions: questionsList.length || 120,
    accuracyPct,
    sectionScores: {
      english: parseFloat((sectionScores.english || 0).toFixed(2)),
      gk: parseFloat((sectionScores.gk || 0).toFixed(2)),
      legal: parseFloat((sectionScores.legal || 0).toFixed(2)),
      logical: parseFloat((sectionScores.logical || 0).toFixed(2)),
      quant: parseFloat((sectionScores.quant || 0).toFixed(2))
    },
    sectionCounts,
    percentile,
    questionResults
  };
}
