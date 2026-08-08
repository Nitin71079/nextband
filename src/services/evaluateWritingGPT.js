import { callOpenAI } from "./openAIService";
import { buildWritingPrompt } from "./writingPrompt";
import { calculateIELTSTotalWritingBand, roundIELTSBand, countWords } from "../utils/writingBandCalculator";
import { evaluateWriting } from "./writingEvaluator";

export async function evaluateWritingGPT({
  task1Text = "",
  task2Text = "",
  task1Type = "Chart/Diagram",
  task1Question = "",
  task2Question = "",
  examType = "academic",
}) {
  try {
    const prompt = buildWritingPrompt({
      task1Text,
      task2Text,
      task1Type,
      task1Question,
      task2Question,
      examType,
    });

    const aiResult = await callOpenAI(prompt);

    if (aiResult && aiResult.success && aiResult.task1 && aiResult.task2) {
      const parseScore = (val) => {
        const n = Number(val);
        return !isNaN(n) && n >= 1.0 && n <= 9.0 ? n : 1.0;
      };

      // Calculate Task 1 band from sub-criteria
      const t1_ta = parseScore(aiResult.task1.taskAchievement ?? aiResult.task1.taskResponse);
      const t1_cc = parseScore(aiResult.task1.coherenceCohesion);
      const t1_lr = parseScore(aiResult.task1.lexicalResource);
      const t1_gra = parseScore(aiResult.task1.grammarRangeAccuracy);
      const t1Band = roundIELTSBand((t1_ta + t1_cc + t1_lr + t1_gra) / 4);

      // Calculate Task 2 band from sub-criteria
      const t2_tr = parseScore(aiResult.task2.taskResponse ?? aiResult.task2.taskAchievement);
      const t2_cc = parseScore(aiResult.task2.coherenceCohesion);
      const t2_lr = parseScore(aiResult.task2.lexicalResource);
      const t2_gra = parseScore(aiResult.task2.grammarRangeAccuracy);
      const t2Band = roundIELTSBand((t2_tr + t2_cc + t2_lr + t2_gra) / 4);

      const finalOverall = calculateIELTSTotalWritingBand(t1Band, t2Band);

      return {
        ...aiResult,
        overallBand: finalOverall,
        task1: {
          ...aiResult.task1,
          band: t1Band,
          taskAchievement: t1_ta,
          coherenceCohesion: t1_cc,
          lexicalResource: t1_lr,
          grammarRangeAccuracy: t1_gra,
        },
        task2: {
          ...aiResult.task2,
          band: t2Band,
          taskResponse: t2_tr,
          coherenceCohesion: t2_cc,
          lexicalResource: t2_lr,
          grammarRangeAccuracy: t2_gra,
        },
        calculationBreakdown: `Task 1: Band ${t1Band.toFixed(1)} (TA: ${t1_ta}, CC: ${t1_cc}, LR: ${t1_lr}, GRA: ${t1_gra}) | Task 2: Band ${t2Band.toFixed(1)} (TR: ${t2_tr}, CC: ${t2_cc}, LR: ${t2_lr}, GRA: ${t2_gra}) → Overall: Band ${finalOverall.toFixed(1)}`,
      };
    }

    // If AI output formatting failed, fallback to rules engine
    return evaluateWriting({ task1Text, task2Text, task1Type, task1Question, task2Question, examType });
  } catch (error) {
    console.warn("AI Evaluation fallback to rules engine:", error);
    return evaluateWriting({ task1Text, task2Text, task1Type, task1Question, task2Question, examType });
  }
}
