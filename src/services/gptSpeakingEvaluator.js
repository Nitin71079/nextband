import {
  buildSpeakingPrompt,
} from "./speakingPrompt";

import {
  callOpenAI,
} from "./openAIService";

export async function evaluateSpeakingGPT(
  response
) {
  return await callOpenAI(
    buildSpeakingPrompt(
      response
    )
  );
}