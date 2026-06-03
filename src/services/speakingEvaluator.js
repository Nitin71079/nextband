export function evaluateSpeaking(
  response
) {
  const words =
    response
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  let fluency = 6;
  let vocabulary = 6;
  let grammar = 6;
  let pronunciation = 6;

  if (words >= 80) {
    fluency += 0.5;
  }

  if (words >= 150) {
    fluency += 0.5;
  }

  if (
    response.includes(
      "however"
    )
  ) {
    vocabulary += 0.5;
  }

  if (
    response.includes(
      "therefore"
    )
  ) {
    vocabulary += 0.5;
  }

  const overall =
    (
      fluency +
      vocabulary +
      grammar +
      pronunciation
    ) /
    4;

  return {
    overall:
      overall.toFixed(1),

    fluency,

    vocabulary,

    grammar,

    pronunciation,

    words,
  };
}