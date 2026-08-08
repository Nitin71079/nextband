function normalize(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function compareAnswers(userAnswer, correctAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === "") return false;

  const normUser = normalize(userAnswer);
  const extractLetter = (str) => {
    const match = String(str).trim().match(/^([a-z0-9]+)[.\)]\s*/i);
    return match ? match[1].toLowerCase() : null;
  };

  const isMatch = (cand, target) => {
    const normTarget = normalize(target);
    if (normUser === normTarget) return true;
    
    // Check if one is just option letter (e.g. "B") and target is "B. Option Text"
    const targetLetter = extractLetter(target);
    const userLetter = extractLetter(cand) || normUser;

    if (targetLetter && (userLetter === targetLetter || normUser === targetLetter)) {
      return true;
    }

    // Strip leading option letter from target and compare text body
    const targetText = String(target).replace(/^[a-z0-9]+[.\)]\s*/i, "").trim();
    if (normUser === normalize(targetText)) {
      return true;
    }

    return false;
  };

  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some((ans) => isMatch(userAnswer, ans));
  }

  return isMatch(userAnswer, correctAnswer);
}

export default function scoreReading(
  questions = [],
  answers = {}
) {
  if (!Array.isArray(questions)) {
    questions = [];
  }

  let score = 0;

  const results = questions.map((question) => {
    const userAnswer = answers[question.id];

    const correct = compareAnswers(
      userAnswer,
      question.answer
    );

    if (correct) {
      score++;
    }

    return {
      id: question.id,
      type: question.type,
      question: question.question,
      userAnswer,
      correctAnswer: question.answer,
      correct,
      explanation: question.explanation || "",
      difficulty: question.difficulty || "",
      skill: question.skill || "",
    };
  });

  const total = questions.length;

  const percentage =
    total === 0
      ? 0
      : Math.round((score / total) * 100);

  return {
    score,
    total,
    percentage,
    results,
  };
}