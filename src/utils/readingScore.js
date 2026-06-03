export function calculateReadingScore(
  answers,
  questions
) {
  let score = 0;

  questions.forEach((q) => {
    if (
      answers[q.id] === q.answer
    ) {
      score++;
    }
  });

  return score;
}