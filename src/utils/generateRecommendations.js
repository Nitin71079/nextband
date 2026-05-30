export function generateRecommendations(
  results
) {
  if (!results || !results.length) {
    return [
      "Complete your first IELTS test to unlock AI recommendations."
    ];
  }

  const sectionScores = {
    Reading: [],
    Listening: [],
    Writing: [],
    Speaking: []
  };

  results.forEach(
    (result) => {
      if (
        sectionScores[
          result.section
        ]
      ) {
        sectionScores[
          result.section
        ].push(
          Number(
            result.band || 0
          )
        );
      }
    }
  );

  const averages = {};

  Object.keys(
    sectionScores
  ).forEach((section) => {
    const scores =
      sectionScores[
        section
      ];

    averages[section] =
      scores.length
        ? scores.reduce(
            (
              a,
              b
            ) => a + b,
            0
          ) /
          scores.length
        : 0;
  });

  const weakestSection =
    Object.entries(
      averages
    ).sort(
      (a, b) =>
        a[1] - b[1]
    )[0][0];

  const recommendations =
    [];

  recommendations.push(
    `Your weakest section is ${weakestSection}. Focus more practice sessions there this week.`
  );

  if (
    weakestSection ===
    "Writing"
  ) {
    recommendations.push(
      "Practice essay structure and coherence daily."
    );

    recommendations.push(
      "Aim for 250+ words with clearer paragraph organization."
    );
  }

  if (
    weakestSection ===
    "Speaking"
  ) {
    recommendations.push(
      "Record speaking responses daily to improve fluency."
    );

    recommendations.push(
      "Use more advanced vocabulary and longer answers."
    );
  }

  if (
    weakestSection ===
    "Reading"
  ) {
    recommendations.push(
      "Improve skimming and scanning techniques."
    );

    recommendations.push(
      "Practice timed reading passages regularly."
    );
  }

  if (
    weakestSection ===
    "Listening"
  ) {
    recommendations.push(
      "Improve note-taking while listening."
    );

    recommendations.push(
      "Practice identifying keywords quickly."
    );
  }

  const overallAverage =
    Object.values(
      averages
    ).reduce(
      (a, b) => a + b,
      0
    ) / 4;

  if (
    overallAverage >= 7
  ) {
    recommendations.push(
      "Excellent overall performance. Focus on consistency and advanced vocabulary."
    );
  } else if (
    overallAverage >= 6
  ) {
    recommendations.push(
      "You are close to a high IELTS band. Continue targeted improvement."
    );
  } else {
    recommendations.push(
      "Build strong daily study habits and consistent practice routines."
    );
  }

  recommendations.push(
    "Recommended weekly target: 4 mock tests + 1 full speaking session."
  );

  return recommendations;
}