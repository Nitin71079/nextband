export function evaluateWriting(
  essay
) {
  const words =
    essay
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  let taskAchievement = 6;
  let coherence = 6;
  let lexical = 6;
  let grammar = 6;

  if (words >= 250) {
    taskAchievement += 1;
  }

  if (words >= 350) {
    lexical += 0.5;
  }

  if (
    essay.includes(
      "however"
    )
  ) {
    coherence += 0.5;
  }

  if (
    essay.includes(
      "therefore"
    )
  ) {
    coherence += 0.5;
  }

  const overall =
    (
      taskAchievement +
      coherence +
      lexical +
      grammar
    ) /
    4;

  return {
    overall:
      overall.toFixed(1),

    taskAchievement,

    coherence,

    lexical,

    grammar,

    words,
  };
}