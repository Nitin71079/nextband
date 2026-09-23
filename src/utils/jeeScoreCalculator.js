/**
 * KNARROW JEE MAIN 2026/2027 — MASTER SCORE & NTA PERCENTILE ENGINE
 * Evaluates 75 Questions / 300 Marks (+4 for correct, -1 penalty for incorrect)
 * Supports MCQs (Section A) and Numerical Value Questions NVQs (Section B).
 */

export function scoreJEEQuestion(question, userResponse) {
  if (!question || userResponse === undefined || userResponse === null || String(userResponse).trim() === "") {
    return { marks: 0, penalty: 0, isCorrect: false, isAttempted: false };
  }

  const qType = String(question.questionType || "MCQ").toUpperCase();

  // 1. MCQ (Single Select, +4, -1 Penalty)
  if (qType === "MCQ") {
    const uVal = String(userResponse).trim().toUpperCase();
    const cVal = String(question.correctAnswer || "").trim().toUpperCase();

    const isCorrect = uVal === cVal || cVal.startsWith(uVal + ".") || uVal.startsWith(cVal + ".");

    if (isCorrect) {
      return { marks: 4, penalty: 0, isCorrect: true, isAttempted: true };
    } else {
      return { marks: -1, penalty: 1, isCorrect: false, isAttempted: true };
    }
  }

  // 2. NVQ / NUMERICAL (+4, -1 Penalty per current NTA guidelines)
  if (qType === "NVQ" || qType === "NUMERICAL") {
    const numUser = parseFloat(String(userResponse).trim());
    if (isNaN(numUser)) return { marks: 0, penalty: 0, isCorrect: false, isAttempted: false };

    let isCorrect = false;

    if (question.natMin !== undefined && question.natMax !== undefined) {
      isCorrect = numUser >= question.natMin && numUser <= question.natMax;
    } else if (question.correctAnswer !== undefined) {
      const numTarget = parseFloat(String(question.correctAnswer).trim());
      const tol = Number(question.natTolerance || 0.1);
      isCorrect = Math.abs(numUser - numTarget) <= tol;
    }

    if (isCorrect) {
      return { marks: 4, penalty: 0, isCorrect: true, isAttempted: true };
    } else {
      return { marks: -1, penalty: 1, isCorrect: false, isAttempted: true };
    }
  }

  return { marks: 0, penalty: 0, isCorrect: false, isAttempted: false };
}

export function evaluateFullJEEScore(questionsList = [], userAnswers = {}) {
  let totalMarks = 0;
  let totalPenalty = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const subjectScores = { physics: 0, chemistry: 0, math: 0 };
  const subjectCounts = {
    physics: { correct: 0, total: 0, marks: 0 },
    chemistry: { correct: 0, total: 0, marks: 0 },
    math: { correct: 0, total: 0, marks: 0 }
  };

  const typeBreakdown = {
    MCQ: { correct: 0, total: 0, marks: 0 },
    NVQ: { correct: 0, total: 0, marks: 0 }
  };

  const questionResults = [];

  questionsList.forEach((q) => {
    const ans = userAnswers[q.id];
    const sub = q.subject || "physics";
    const qType = (q.questionType === "NVQ" || q.questionType === "NUMERICAL") ? "NVQ" : "MCQ";

    if (subjectCounts[sub]) subjectCounts[sub].total++;
    if (typeBreakdown[qType]) typeBreakdown[qType].total++;

    const isAttempted = ans !== undefined && ans !== null && String(ans).trim() !== "";

    if (!isAttempted) {
      unattemptedCount++;
      questionResults.push({ ...q, isAttempted: false, isCorrect: false, marksAwarded: 0 });
      return;
    }

    const res = scoreJEEQuestion(q, ans);
    totalMarks += res.marks;
    totalPenalty += res.penalty;

    if (subjectScores[sub] !== undefined) {
      subjectScores[sub] += res.marks;
    }

    if (res.isCorrect) {
      correctCount++;
      if (subjectCounts[sub]) {
        subjectCounts[sub].correct++;
        subjectCounts[sub].marks += res.marks;
      }
      if (typeBreakdown[qType]) {
        typeBreakdown[qType].correct++;
        typeBreakdown[qType].marks += res.marks;
      }
    } else {
      incorrectCount++;
    }

    questionResults.push({ ...q, isAttempted: true, isCorrect: res.isCorrect, marksAwarded: res.marks });
  });

  const finalTotalMarks = Math.max(-75, Math.min(300, parseFloat(totalMarks.toFixed(2))));
  const attemptedCount = correctCount + incorrectCount;
  const accuracyPct = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Estimated NTA Percentile Rank
  let percentile = 15.0;
  if (finalTotalMarks >= 250) percentile = 99.9;
  else if (finalTotalMarks >= 210) percentile = 99.5;
  else if (finalTotalMarks >= 170) percentile = 98.5;
  else if (finalTotalMarks >= 140) percentile = 96.0;
  else if (finalTotalMarks >= 110) percentile = 90.0;
  else if (finalTotalMarks >= 80) percentile = 75.0;
  else if (finalTotalMarks >= 50) percentile = 55.0;

  return {
    finalTotalMarks,
    totalPenalty: parseFloat(totalPenalty.toFixed(2)),
    correctCount,
    incorrectCount,
    unattemptedCount,
    attemptedCount,
    totalQuestions: questionsList.length || 75,
    accuracyPct,
    subjectScores: {
      physics: parseFloat((subjectScores.physics || 0).toFixed(2)),
      chemistry: parseFloat((subjectScores.chemistry || 0).toFixed(2)),
      math: parseFloat((subjectScores.math || 0).toFixed(2))
    },
    subjectCounts,
    typeBreakdown,
    percentile,
    questionResults
  };
}
