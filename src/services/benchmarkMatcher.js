export function getBenchmarkFeedback(
  band
) {
  const rounded =
    Math.round(band);

  switch (
    rounded
  ) {
    case 5:
      return "Performance resembles a Band 5 candidate.";

    case 6:
      return "Performance resembles a Band 6 candidate.";

    case 7:
      return "Performance resembles a Band 7 candidate.";

    case 8:
      return "Performance resembles a Band 8 candidate.";

    case 9:
      return "Performance resembles a Band 9 candidate.";

    default:
      return "Benchmark unavailable.";
  }
}