export function calculateConfidence(
  scores
) {
  const values =
    Object.values(scores);

  const max =
    Math.max(...values);

  const min =
    Math.min(...values);

  const variance =
    max - min;

  let confidence = 95;

  if (variance > 2) {
    confidence -= 25;
  }

  if (variance > 1) {
    confidence -= 10;
  }

  return Math.max(
    60,
    confidence
  );
}

export function getBandRange(
  band
) {
  return {
    lower: Math.max(
      0,
      band - 0.5
    ),

    upper: Math.min(
      9,
      band + 0.5
    ),
  };
}