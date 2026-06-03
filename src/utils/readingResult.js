export function generateReadingResult(
  test,
  answers
) {
  let correct = 0;

  const details = [];

  test.passages.forEach(
    (passage) => {
      passage.questions.forEach(
        (question) => {
          const userAnswer =
            answers[
              question.id
            ];

          const isCorrect =
            String(
              userAnswer || ""
            )
              .trim()
              .toLowerCase() ===
            String(
              question.answer
            )
              .trim()
              .toLowerCase();

          if (
            isCorrect
          ) {
            correct++;
          }

          details.push({
            questionId:
              question.id,

            question:
              question.question,

            userAnswer,

            correctAnswer:
              question.answer,

            isCorrect,
          });
        }
      );
    }
  );

  return {
    total:
      details.length,

    correct,

    details,
  };
}