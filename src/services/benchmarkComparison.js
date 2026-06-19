export function compareToBenchmark(
  band
) {
  const rounded =
    Math.round(band);

  const similarity =
    Math.min(
      95,
      65 +
        rounded * 3
    );

  return {
    matchedBand:
      rounded,

    similarity,
  };
}