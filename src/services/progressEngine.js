import {
  getEvaluations,
} from "./evaluationStorage";

export function getAverageBand() {
  const evaluations =
    getEvaluations();

  if (
    evaluations.length === 0
  ) {
    return 0;
  }

  const total =
    evaluations.reduce(
      (sum, item) =>
        sum +
        Number(
          item.overallBand
        ),
      0
    );

  return (
    total /
    evaluations.length
  ).toFixed(1);
}