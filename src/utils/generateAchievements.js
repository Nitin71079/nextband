export function generateAchievements(
  results
) {
  const achievements =
    [];

  const totalTests =
    results.length;

  if (totalTests >= 1) {
    achievements.push({
      title:
        "🚀 First Step",

      description:
        "Completed first IELTS test."
    });
  }

  if (totalTests >= 10) {
    achievements.push({
      title:
        "🔥 Dedicated Learner",

      description:
        "Completed 10 IELTS tests."
    });
  }

  if (totalTests >= 25) {
    achievements.push({
      title:
        "⚡ IELTS Warrior",

      description:
        "Completed 25 IELTS tests."
    });
  }

  if (totalTests >= 50) {
    achievements.push({
      title:
        "🏆 IELTS Master",

      description:
        "Completed 50 IELTS tests."
    });
  }

  const averageBand =
    totalTests
      ? results.reduce(
          (
            total,
            result
          ) =>
            total +
            Number(
              result.band ||
                0
            ),
          0
        ) / totalTests
      : 0;

  if (averageBand >= 6) {
    achievements.push({
      title:
        "🎯 Band 6 Achiever",

      description:
        "Reached average IELTS band 6."
    });
  }

  if (averageBand >= 7) {
    achievements.push({
      title:
        "🌟 Band 7 Performer",

      description:
        "Reached average IELTS band 7."
    });
  }

  if (averageBand >= 8) {
    achievements.push({
      title:
        "👑 Elite Scorer",

      description:
        "Reached average IELTS band 8."
    });
  }

  return achievements;
}