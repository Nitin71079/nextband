import { callOpenAI } from "./openAIService";
import { buildSpeakingPrompt } from "./speakingPrompt";
import { roundIELTSBand } from "../utils/writingBandCalculator";

export async function evaluateSpeakingGPT(response) {
  const prompt = buildSpeakingPrompt(response);
  const aiResult = await callOpenAI(prompt);

  if (aiResult && aiResult.success) {
    const fc = Number(aiResult.fluency) || 6.0;
    const lr = Number(aiResult.lexicalResource) || 6.0;
    const gra = Number(aiResult.grammar) || 6.0;
    const p = Number(aiResult.pronunciation) || 6.0;
    const overall = roundIELTSBand((fc + lr + gra + p) / 4);

    return {
      ...aiResult,
      overallBand: overall,
      fluency: fc,
      lexicalResource: lr,
      grammar: gra,
      pronunciation: p,
      calculationBreakdown: `Fluency: ${fc}, Lexical: ${lr}, Grammar: ${gra}, Pronunciation: ${p} → Overall Speaking Band ${overall.toFixed(1)}`,
    };
  }

  return aiResult;
}