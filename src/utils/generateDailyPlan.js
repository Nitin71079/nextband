export function generateDailyPlan(
  results
) {
  if (!results || !results.length) {
    return [
      "Complete your first IELTS test today.",
      "Practice 1 Reading passage.",
      "Write a short IELTS essay.",
      "Do 15 minutes of speaking practice."
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

  const sortedSections =
    Object.entries(
      averages
    ).sort(
      (a, b) =>
        a[1] - b[1]
    );

  const weakestSection =
    sortedSections[0][0];

  const plan = [];

  plan.push(
    `Focus Priority: ${weakestSection}`
  );

  if (
    weakestSection ===
    "Reading"
  ) {
    plan.push(
      "Complete 2 timed reading passages."
    );

    plan.push(
      "Practice skimming and scanning techniques."
    );
  }

  if (
    weakestSection ===
    "Listening"
  ) {
    plan.push(
      "Complete 1 listening mock test."
    );

    plan.push(
      "Practice keyword recognition while listening."
    );
  }

  if (
    weakestSection ===
    "Writing"
  ) {
    plan.push(
      "Write 1 IELTS Task 2 essay."
    );

    plan.push(
      "Focus on coherence and paragraph structure."
    );
  }

  if (
    weakestSection ===
    "Speaking"
  ) {
    plan.push(
      "Record 3 speaking responses."
    );

    plan.push(
      "Practice fluency and pronunciation."
    );
  }

  plan.push(
    "Review advanced IELTS vocabulary for 20 minutes."
  );

  plan.push(
    "Complete one full AI practice session today."
  );

  return plan;
}