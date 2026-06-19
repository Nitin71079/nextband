export function generateForecast({
  currentBand,
  targetBand,
  dailyHours,
}) {
  const gap =
    Number(targetBand) -
    Number(currentBand);

  const hours =
    Number(dailyHours || 1);

  const weeks =
    Math.max(
      2,
      Math.ceil(
        (gap * 8) / hours
      )
    );

  const confidence =
    hours >= 3
      ? "High"
      : hours >= 2
      ? "Medium"
      : "Low";

  return {
    weeks,
    confidence,
  };
}