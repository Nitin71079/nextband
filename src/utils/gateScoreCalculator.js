/**
 * KNARROW GATE 2026 — MASTER TRI-FORMAT SCORE & ACCURACY CALCULATOR ENGINE
 * Aligned with Official GATE Specifications (65 Questions / 100 Marks)
 * Supports MCQ (-1/3 or -2/3 negative), MSQ (zero negative, strict binary all-or-nothing), and NAT (zero negative, tolerance range).
 */

/**
 * Scores an individual GATE question (MCQ, MSQ, or NAT)
 */
export function scoreGATEQuestion(question, userResponse) {
  if (!question) return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false };

  const marks = Number(question.marks) || 1;
  const qType = String(question.questionType || "MCQ").toUpperCase();

  // Unattempted / Null Response
  if (userResponse === undefined || userResponse === null || String(userResponse).trim() === "") {
    if (qType === "MSQ" && Array.isArray(userResponse) && userResponse.length === 0) {
      return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false };
    }
    return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false };
  }

  // 1. MCQ (Single Select, Negative Marking)
  if (qType === "MCQ") {
    const uVal = String(userResponse).trim().toUpperCase();
    const cVal = String(question.correctAnswer || "").trim().toUpperCase();

    const isCorrect = uVal === cVal || cVal.startsWith(uVal + ".") || uVal.startsWith(cVal + ".");

    if (isCorrect) {
      return { marksAwarded: marks, negativeDeducted: 0, isCorrect: true };
    } else {
      const penalty = marks === 2 ? 0.6667 : 0.3333;
      return { marksAwarded: -penalty, negativeDeducted: penalty, isCorrect: false };
    }
  }

  // 2. MSQ (Multiple Select, Zero Negative Marking, Strict Binary Grading)
  if (qType === "MSQ") {
    let uArr = Array.isArray(userResponse) ? userResponse : [userResponse];
    let cArr = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];

    const uSet = new Set(uArr.map((s) => String(s).trim().toUpperCase()));
    const cSet = new Set(cArr.map((s) => String(s).trim().toUpperCase()));

    // Strict Binary Check: must have exact same size and elements
    let isExactMatch = uSet.size === cSet.size;
    if (isExactMatch) {
      for (const item of cSet) {
        if (!uSet.has(item)) {
          isExactMatch = false;
          break;
        }
      }
    }

    if (isExactMatch) {
      return { marksAwarded: marks, negativeDeducted: 0, isCorrect: true };
    } else {
      return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false }; // Zero Negative for MSQ
    }
  }

  // 3. NAT (Numerical Answer Type, Zero Negative Marking, Range Tolerance)
  if (qType === "NAT") {
    const numUser = parseFloat(String(userResponse).trim());
    if (isNaN(numUser)) return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false };

    let isCorrect = false;

    if (question.natMin !== undefined && question.natMax !== undefined) {
      isCorrect = numUser >= question.natMin && numUser <= question.natMax;
    } else if (question.correctAnswer !== undefined) {
      const numTarget = parseFloat(String(question.correctAnswer).trim());
      const tol = Number(question.natTolerance || 0.01);
      isCorrect = Math.abs(numUser - numTarget) <= tol;
    }

    if (isCorrect) {
      return { marksAwarded: marks, negativeDeducted: 0, isCorrect: true };
    } else {
      return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false }; // Zero Negative for NAT
    }
  }

  return { marksAwarded: 0, negativeDeducted: 0, isCorrect: false };
}

/**
 * Comprehensive GATE Exam Performance Evaluation (100 Marks Scale)
 */
export function evaluateFullGATEScore(questionsList = [], userAnswers = {}) {
  let totalMarksObtained = 0;
  let totalNegativeDeducted = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  let gaScore = 0;
  let coreScore = 0;

  const formatBreakdown = {
    MCQ: { correct: 0, total: 0, marks: 0 },
    MSQ: { correct: 0, total: 0, marks: 0 },
    NAT: { correct: 0, total: 0, marks: 0 }
  };

  questionsList.forEach((q) => {
    const ans = userAnswers[q.id];
    const qType = String(q.questionType || "MCQ").toUpperCase();

    if (formatBreakdown[qType]) {
      formatBreakdown[qType].total++;
    }

    const isAttempted = ans !== undefined && ans !== null && String(ans).trim() !== "" && !(Array.isArray(ans) && ans.length === 0);

    if (!isAttempted) {
      unattemptedCount++;
      return;
    }

    const res = scoreGATEQuestion(q, ans);
    totalMarksObtained += res.marksAwarded;
    totalNegativeDeducted += res.negativeDeducted;

    if (res.isCorrect) {
      correctCount++;
      if (formatBreakdown[qType]) {
        formatBreakdown[qType].correct++;
        formatBreakdown[qType].marks += res.marksAwarded;
      }
      if (q.section === "ga" || q.isGA) gaScore += res.marksAwarded;
      else coreScore += res.marksAwarded;
    } else {
      incorrectCount++;
    }
  });

  // Clamp final total marks between 0 and 100 (rounded to 2 decimal places)
  const finalTotalMarks = Math.max(0, Math.min(100, parseFloat(totalMarksObtained.toFixed(2))));
  const totalQuestions = questionsList.length || 65;
  const attemptedCount = correctCount + incorrectCount;
  const accuracyPct = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

  // Estimated GATE Percentile
  let percentile = 5;
  if (finalTotalMarks >= 75) percentile = 99;
  else if (finalTotalMarks >= 65) percentile = 98;
  else if (finalTotalMarks >= 55) percentile = 94;
  else if (finalTotalMarks >= 45) percentile = 86;
  else if (finalTotalMarks >= 35) percentile = 72;
  else if (finalTotalMarks >= 25) percentile = 50;

  return {
    finalTotalMarks,
    totalNegativeDeducted: parseFloat(totalNegativeDeducted.toFixed(2)),
    correctCount,
    incorrectCount,
    unattemptedCount,
    attemptedCount,
    totalQuestions,
    accuracyPct,
    gaScore: parseFloat(gaScore.toFixed(2)),
    coreScore: parseFloat(coreScore.toFixed(2)),
    formatBreakdown,
    percentile
  };
}
