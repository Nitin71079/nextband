import {
  getAverageBand,
} from "./progressEngine";

export function getReadinessScore() {
  const band =
    Number(
      getAverageBand()
    );

  return Math.min(
    100,
    Math.round(
      (band / 9) * 100
    )
  );
}