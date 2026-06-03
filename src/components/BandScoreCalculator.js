export function getReadingBand(
  correct
) {
  if (correct >= 39) return 9;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8;
  if (correct >= 30) return 7;
  if (correct >= 23) return 6;
  if (correct >= 15) return 5;
  return 4;
}