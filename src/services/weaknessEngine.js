import {
  getEvaluations,
} from "./evaluationStorage";

export function getWeakestArea() {
  const evaluations =
    getEvaluations();

  if (
    evaluations.length === 0
  ) {
    return "Unknown";
  }

  const latest =
    evaluations[0];

  if (
    latest.type ===
    "writing"
  ) {
    const scores = {
      TaskResponse:
        latest.report
          .taskResponse,

      Coherence:
        latest.report
          .coherenceCohesion,

      Lexical:
        latest.report
          .lexicalResource,

      Grammar:
        latest.report
          .grammarRangeAccuracy,
    };

    return Object.keys(
      scores
    ).reduce((a, b) =>
      scores[a] <
      scores[b]
        ? a
        : b
    );
  }

  return "Review Needed";
}