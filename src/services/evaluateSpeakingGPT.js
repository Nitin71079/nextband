import { callOpenAI } from "./openAIService";
import { buildSpeakingPrompt } from "./speakingPrompt";

export async function evaluateSpeakingGPT(
response
) {
const prompt =
buildSpeakingPrompt(
response
);

return await callOpenAI(
prompt
);
}
