import { askGroq } from "./aiService";

export async function askAICoach(question) {
  const prompt = `System: You are Knarrow AI Coach. You help IELTS students improve Reading, Listening, Writing and Speaking. Give practical advice, generate study plans when requested, explain IELTS concepts clearly, and keep responses under 250 words.

User Question: ${question}`;

  return await askGroq(prompt);
}