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
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(
      (answer) =>
        normalize(answer) === normalize(userAnswer)
    );
  }

  return (
    normalize(userAnswer) ===
    normalize(correctAnswer)
  );
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