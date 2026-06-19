import {
  writingRubric,
} from "../data/rubrics/writingRubric";

export function explainWritingBands(
  scores
) {
  return {
    taskResponse:
      writingRubric[
        Math.round(
          scores.taskResponse
        )
      ]?.taskResponse,

    coherence:
      writingRubric[
        Math.round(
          scores.coherenceCohesion
        )
      ]?.coherence,

    lexical:
      writingRubric[
        Math.round(
          scores.lexicalResource
        )
      ]?.lexical,

    grammar:
      writingRubric[
        Math.round(
          scores.grammarRangeAccuracy
        )
      ]?.grammar,
  };
}