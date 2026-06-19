import {
  getEvaluations,
} from "./evaluationStorage";

export function getTrend() {
  const history =
    getEvaluations();

  if (
    history.length < 2
  ) {
    return "stable";
  }

  const latest =
    Number(
      history[0]
        .overallBand
    );

  const previous =
    Number(
      history[1]
        .overallBand
    );

  if (
    latest > previous
  )
    return "improving";

  if (
    latest < previous
  )
    return "declining";

  return "stable";
}