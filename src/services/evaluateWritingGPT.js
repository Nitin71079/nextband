import { callOpenAI } from "./openAIService";
import { buildWritingPrompt } from "./writingPrompt";

export async function evaluateWritingGPT(
essay
) {
const prompt =
buildWritingPrompt(
essay
);

return await callOpenAI(
prompt
);
}
