import {
  getExamHistory,
} from "./examSession";

export function getAnalytics() {
  const history =
    getExamHistory();

  if (!history.length) {
    return null;
  }

  const latest =
    history[
      history.length - 1
    ];

  const overallBands =
    history.map(
      (exam) =>
        (
          (Number(
            exam.reading
          ) +
            Number(
              exam.listening
            ) +
            Number(
              exam.writing
            ) +
            Number(
              exam.speaking
            )) /
          4
        )
    );

  const averageBand =
    (
      overallBands.reduce(
        (
          total,
          band
        ) =>
          total +
          band,
        0
      ) /
      overallBands.length
    ).toFixed(1);

  const bestBand =
    Math.max(
      ...overallBands
    ).toFixed(1);

  return {
    totalExams:
      history.length,

    averageBand,

    bestBand,

    latest,
  };
}