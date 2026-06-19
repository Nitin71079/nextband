export function getAchievements(
  history
) {
  const achievements = [];

  if (
    history.length >= 1
  ) {
    achievements.push(
      "🏆 First Mock Test"
    );
  }

  if (
    history.length >= 5
  ) {
    achievements.push(
      "🏆 5 Mock Tests Completed"
    );
  }

  if (
    history.length >= 10
  ) {
    achievements.push(
      "🏆 10 Mock Tests Completed"
    );
  }

  const bestBand =
    Math.max(
      ...history.map(
        (exam) =>
          (
            (Number(
              exam.reading
            ) +
              Number(
                exam.listening
              ) +
              Number(
                exam.writing
              ) +
              Number(
                exam.speaking
              )) /
            4
          )
      ),
      0
    );

  if (bestBand >= 6) {
    achievements.push(
      "🏆 Band 6 Achieved"
    );
  }

  if (bestBand >= 7) {
    achievements.push(
      "🏆 Band 7 Achieved"
    );
  }

  if (bestBand >= 8) {
    achievements.push(
      "🏆 Band 8 Achieved"
    );
  }

  return achievements;
}