export function getReadingBand(
  score,
  total
) {
  const percentage =
    score / total;

  if (percentage >= 0.95)
    return 9;

  if (percentage >= 0.9)
    return 8.5;

  if (percentage >= 0.85)
    return 8;

  if (percentage >= 0.75)
    return 7;

  if (percentage >= 0.65)
    return 6;

  if (percentage >= 0.55)
    return 5;

  return 4;
}