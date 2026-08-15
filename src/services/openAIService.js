import { askGroqJSON } from "./aiService";

export async function callOpenAI(prompt) {
  try {
    const systemPrompt = "You are a certified IELTS examiner. Return ONLY valid JSON.";
    const parsed = await askGroqJSON(systemPrompt, prompt);

    const overallBand = parsed.overallBand || parsed.band || 7.0;

    return {
      success: true,
      confidence: 90,
      estimatedRange: `${Math.max(1, overallBand - 0.5)} - ${Math.min(9, overallBand + 0.5)}`,
      benchmark: `Performance resembles Band ${overallBand}.`,
      ...parsed,
    };
  } catch (error) {
    console.error("GROQ ERROR:", error);

    return {
      success: false,
      overallBand: 0,
      confidence: 0,
      estimatedRange: "Unavailable",
      benchmark: "Evaluation failed",
      taskResponse: 0,
      coherenceCohesion: 0,
      lexicalResource: 0,
      grammarRangeAccuracy: 0,
      strengths: ["Evaluation failed"],
      weaknesses: [error?.message || "Unknown error"],
      recommendations: ["Check console logs"],
      improvedEssay: "",
    };
  }
}
