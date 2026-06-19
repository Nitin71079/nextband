import {
  compareToBenchmark,
} from "./benchmarkComparison";
import {
  calculateConfidence,
  getBandRange,
} from "./calibrationEngine";

import {
  getBenchmarkFeedback,
} from "./benchmarkMatcher";

export function evaluateSpeaking(
  response
) {
  const words =
    response
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  let fluency = 6;
  let lexicalResource = 6;
  let grammar = 6;
  let pronunciation = 6;

  if (words >= 80) {
    fluency += 0.5;
  }

  if (words >= 150) {
    fluency += 0.5;
  }

  if (
    response
      .toLowerCase()
      .includes("however")
  ) {
    lexicalResource +=
      0.5;
  }

  if (
    response
      .toLowerCase()
      .includes("therefore")
  ) {
    lexicalResource +=
      0.5;
  }

  const punctuationCount =
    (
      response.match(
        /[.,;:!?]/g
      ) || []
    ).length;

  if (
    punctuationCount > 5
  ) {
    grammar += 0.5;
  }

  if (
    punctuationCount > 10
  ) {
    grammar += 0.5;
  }

  fluency =
    Math.min(9, fluency);

  lexicalResource =
    Math.min(
      9,
      lexicalResource
    );

  grammar =
    Math.min(9, grammar);

  pronunciation =
    Math.min(
      9,
      pronunciation
    );

  const overallBand =
    Number(
      (
        (
          fluency +
          lexicalResource +
          grammar +
          pronunciation
        ) / 4
      ).toFixed(1)
    );

  const confidence =
    calculateConfidence({
      fluency,
      lexicalResource,
      grammar,
      pronunciation,
    });

  const range =
    getBandRange(
      overallBand
    );

  const benchmark =
    getBenchmarkFeedback(
      overallBand
    );
    const comparison =
  compareToBenchmark(
    overallBand
  );

  const strengths = [];
  const weaknesses = [];
  const improvements =
    [];

  if (fluency >= 6.5) {
    strengths.push(
      "Good fluency and continuity."
    );
  } else {
    weaknesses.push(
      "Speech contains noticeable hesitation."
    );

    improvements.push(
      "Practice speaking for longer periods without pauses."
    );
  }

  if (
    lexicalResource >=
    6.5
  ) {
    strengths.push(
      "Adequate vocabulary range."
    );
  } else {
    weaknesses.push(
      "Vocabulary range is limited."
    );

    improvements.push(
      "Use a wider range of topic-specific vocabulary."
    );
  }

  if (grammar >= 6.5) {
    strengths.push(
      "Reasonably accurate grammar."
    );
  } else {
    weaknesses.push(
      "Grammar range needs improvement."
    );

    improvements.push(
      "Practice complex sentence structures."
    );
  }

  if (
    pronunciation >=
    6.5
  ) {
    strengths.push(
      "Generally clear pronunciation."
    );
  } else {
    weaknesses.push(
      "Pronunciation affects clarity at times."
    );

    improvements.push(
      "Practice stress, rhythm, and intonation."
    );
  }

  return {
  success: true,

  overallBand,

  confidence,

  estimatedRange:
    `${range.lower} - ${range.upper}`,

  benchmark,

  matchedBand:
    comparison.matchedBand,

  similarity:
    comparison.similarity,

  fluency,

  lexicalResource,

  grammar,

  pronunciation,

  wordCount: words,

  strengths,

  weaknesses,

  improvements,

  sampleBetterAnswer:
    "A stronger response would include more developed ideas, wider vocabulary, and greater grammatical variety.",
};
}