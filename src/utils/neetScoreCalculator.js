// NEET-UG Score & All India Rank (AIR) Analytics Calculator
export function calculateNEETScore(mock, userAnswers = {}, questionStates = {}, timeSpentSeconds = 0) {
  if (!mock || !mock.questions) {
    return {
      totalScore: 0,
      maxScore: 720,
      percentage: 0,
      accuracy: 0,
      totalQuestions: 180,
      correctCount: 0,
      incorrectCount: 0,
      unansweredCount: 180,
      estimatedAIR: "1,50,000+",
      estimatedPercentile: "50.00%",
      subjectBreakdown: {},
      chapterStats: {},
      ncertWeaknesses: []
    };
  }

  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const subjectBreakdown = {
    physics: { score: 0, maxScore: 180, correct: 0, incorrect: 0, unanswered: 0, name: "Physics", color: "#3B82F6" },
    chemistry: { score: 0, maxScore: 180, correct: 0, incorrect: 0, unanswered: 0, name: "Chemistry", color: "#10B981" },
    botany: { score: 0, maxScore: 180, correct: 0, incorrect: 0, unanswered: 0, name: "Botany", color: "#059669" },
    zoology: { score: 0, maxScore: 180, correct: 0, incorrect: 0, unanswered: 0, name: "Zoology", color: "#EC4899" }
  };

  const chapterStats = {};

  mock.questions.forEach(q => {
    const userAns = userAnswers[q.id];
    const subjKey = q.subject || "physics";
    if (!subjectBreakdown[subjKey]) {
      subjectBreakdown[subjKey] = { score: 0, maxScore: 180, correct: 0, incorrect: 0, unanswered: 0, name: q.subSubject || subjKey, color: "#6366F1" };
    }

    if (!chapterStats[q.chapter]) {
      chapterStats[q.chapter] = { chapter: q.chapter, ncertUnit: q.ncertUnit, total: 0, correct: 0, incorrect: 0 };
    }
    chapterStats[q.chapter].total += 1;

    if (!userAns || userAns === "") {
      unansweredCount++;
      subjectBreakdown[subjKey].unanswered++;
    } else if (userAns === q.correctAnswer) {
      correctCount++;
      totalScore += 4;
      subjectBreakdown[subjKey].score += 4;
      subjectBreakdown[subjKey].correct++;
      chapterStats[q.chapter].correct++;
    } else {
      incorrectCount++;
      totalScore -= 1;
      subjectBreakdown[subjKey].score -= 1;
      subjectBreakdown[subjKey].incorrect++;
      chapterStats[q.chapter].incorrect++;
    }
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(1) : 0;
  const percentage = Math.max(0, ((totalScore / 720) * 100)).toFixed(1);

  // Estimate NEET All India Rank (AIR) based on historical NTA score cutoffs out of 720
  let estimatedAIR = "1,80,000+";
  let estimatedPercentile = "50.00";

  if (totalScore >= 700) {
    estimatedAIR = "AIR 1 - 100";
    estimatedPercentile = "99.99";
  } else if (totalScore >= 670) {
    estimatedAIR = "AIR 101 - 1,000";
    estimatedPercentile = "99.90";
  } else if (totalScore >= 640) {
    estimatedAIR = "AIR 1,001 - 5,000";
    estimatedPercentile = "99.50";
  } else if (totalScore >= 600) {
    estimatedAIR = "AIR 5,001 - 15,000 (Govt Medical Seat)";
    estimatedPercentile = "98.50";
  } else if (totalScore >= 550) {
    estimatedAIR = "AIR 15,001 - 35,000";
    estimatedPercentile = "96.50";
  } else if (totalScore >= 450) {
    estimatedAIR = "AIR 35,001 - 85,000";
    estimatedPercentile = "91.00";
  } else if (totalScore >= 350) {
    estimatedAIR = "AIR 85,001 - 1,60,000";
    estimatedPercentile = "82.00";
  } else {
    estimatedAIR = "AIR 1,60,000+";
    estimatedPercentile = Math.max(20, (totalScore / 720) * 75).toFixed(2);
  }

  // Find weak NCERT units where accuracy < 50%
  const ncertWeaknesses = Object.values(chapterStats)
    .filter(c => c.total >= 2 && (c.correct / c.total) < 0.5)
    .map(c => ({ chapter: c.chapter, ncertUnit: c.ncertUnit, accuracy: ((c.correct / c.total) * 100).toFixed(0) }));

  return {
    totalScore,
    maxScore: 720,
    percentage,
    accuracy,
    totalQuestions: mock.questions.length,
    correctCount,
    incorrectCount,
    unansweredCount,
    attemptedCount,
    estimatedAIR,
    estimatedPercentile,
    subjectBreakdown,
    chapterStats,
    ncertWeaknesses,
    timeSpentSeconds
  };
}
