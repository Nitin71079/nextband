import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function evaluateWriting(essay) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an IELTS examiner.

Evaluate this essay and provide:
- Estimated IELTS Band
- Strengths
- Weaknesses
- Suggestions for improvement

Essay:
${essay}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
}