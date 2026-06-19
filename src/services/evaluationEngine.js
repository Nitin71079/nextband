import {
  evaluateWriting,
} from "./writingEvaluator";

import {
  evaluateSpeaking,
} from "./speakingEvaluator";

import {
  evaluateWritingGPT,
} from "./gptWritingEvaluator";

import {
  evaluateSpeakingGPT,
} from "./gptSpeakingEvaluator";

import {
  useGPTEvaluation,
} from "./evaluationMode";

export async function evaluateSubmission(
  type,
  content
) {
  const gpt =
    useGPTEvaluation();

  if (gpt) {
    if (
      type ===
      "writing"
    ) {
      return await evaluateWritingGPT(
        content
      );
    }

    if (
      type ===
      "speaking"
    ) {
      return await evaluateSpeakingGPT(
        content
      );
    }
  }

  if (
    type ===
    "writing"
  ) {
    return evaluateWriting(
      content
    );
  }

  if (
    type ===
    "speaking"
  ) {
    return evaluateSpeaking(
      content
    );
  }

  return {
    success: false,
  };
}