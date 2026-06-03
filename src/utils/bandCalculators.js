export function calculateReadingBand(
  score
) {
  if (score >= 39)
    return 9;

  if (score >= 37)
    return 8.5;

  if (score >= 35)
    return 8;

  if (score >= 33)
    return 7.5;

  if (score >= 30)
    return 7;

  if (score >= 27)
    return 6.5;

  if (score >= 23)
    return 6;

  if (score >= 19)
    return 5.5;

  return 5;
}