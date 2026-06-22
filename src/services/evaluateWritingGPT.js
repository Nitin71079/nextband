import { callOpenAI } from "./openAIService";
import { buildWritingPrompt } from "./writingPrompt";

export async function evaluateWritingGPT(
essay
) {
console.log(
"ESSAY SENT TO AI:"
);

console.log(essay);

const prompt =
buildWritingPrompt(
essay
);

return await callOpenAI(
prompt
);
}
