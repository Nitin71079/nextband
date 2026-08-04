import { callOpenAI } from "./openAIService";
import { buildWritingPrompt } from "./writingPrompt";
import { calculateIELTSTotalWritingBand, countWords } from "../utils/writingBandCalculator";
import { evaluateWriting } from "./writingEvaluator";

export async function evaluateWritingGPT({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
}) {
  try {
    const prompt = buildWritingPrompt({
      task1Text,
      task2Text,
      task1Type,
      task1Question,
      task2Question,
    });

    const aiResult = await callOpenAI(prompt);

    if (aiResult && aiResult.success && aiResult.task1 && aiResult.task2) {
      // Re-verify the 33% / 67% weighting formula on the AI response
      const t1Band = Number(aiResult.task1.band) || 6.0;
      const t2Band = Number(aiResult.task2.band) || 6.0;
      const finalOverall = calculateIELTSTotalWritingBand(t1Band, t2Band);

      return {
        ...aiResult,
        overallBand: finalOverall,
        calculationBreakdown: `33% Task 1 (Band ${t1Band.toFixed(1)}) + 67% Task 2 (Band ${t2Band.toFixed(1)}) = Final Overall Band ${finalOverall.toFixed(1)}`,
      };
    }

    // If AI output formatting failed, fallback to rules engine
    return evaluateWriting({ task1Text, task2Text, task1Type, task1Question, task2Question });
  } catch (error) {
    console.warn("AI Evaluation fallback to rules engine:", error);
    return evaluateWriting({ task1Text, task2Text, task1Type, task1Question, task2Question });
  }
}
