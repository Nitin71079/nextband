import { Groq } from "groq-sdk";

const groqApiKey = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || "";
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

/**
 * Evaluates full CAT 2026 Examination Performance using Groq AI (Llama 3.3 70B)
 */
export async function evaluateCATExamAI(attemptData) {
  const { varcRaw = 0, dilrRaw = 0, qaRaw = 0, totalRaw = 0, stats = {}, percentiles = {}, setEfficiency = [] } = attemptData;

  const totalAttempted = (stats.varc?.attempted || 0) + (stats.dilr?.attempted || 0) + (stats.qa?.attempted || 0);
  const totalCorrect = (stats.varc?.correct || 0) + (stats.dilr?.correct || 0) + (stats.qa?.correct || 0);
  const totalAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  if (!groq) {
    // Local Fallback Evaluation if Groq API Key is not set
    return {
      overallDiagnostic: `You scored a Total Raw Score of ${totalRaw} out of 204 (${percentiles.overall?.toFixed(2) || "85.00"}%ile). Your overall accuracy across attempted questions is ${totalAccuracy}%.`,
      varcDiagnostic: `VARC Raw Score: ${varcRaw}/72 (${percentiles.varc?.toFixed(1) || "80"}%ile). You attempted ${stats.varc?.attempted || 0}/24 questions. Focus on active passage mapping in RC to boost inference speed.`,
      dilrDiagnostic: `DILR Raw Score: ${dilrRaw}/66 (${percentiles.dilr?.toFixed(1) || "80"}%ile). Set selection efficiency is critical in DILR. Ensure you scan all 4–5 sets within the first 3 minutes.`,
      qaDiagnostic: `QA Raw Score: ${qaRaw}/66 (${percentiles.qa?.toFixed(1) || "80"}%ile). You attempted ${stats.qa?.attempted || 0}/22 questions. Prioritize high-yield Arithmetic and Algebra questions first.`,
      targetIIMs: totalRaw >= 90 ? ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta"] : totalRaw >= 70 ? ["IIM Lucknow", "IIM Kozhikode", "IIM Indore"] : ["New IIMs", "Baby IIMs", "Top Non-IIM B-Schools"],
      actionPlan: [
        { day: 1, topic: "VARC Reading Comprehension Inference Drills", focus: "Eliminate extreme distractors in philosophical & economic RC passages." },
        { day: 2, topic: "DILR Matrix & Seating Puzzle Sets", focus: "Practice constraint-satisfaction mapping under 10-minute timers." },
        { day: 3, topic: "QA Arithmetic Speed Solvers", focus: "Master Time-Speed-Distance & Profit/Loss shortcuts." },
        { day: 4, topic: "VARC Para Jumbles & Para Summary TITA", focus: "Identify mandatory pronoun and contrast connector pairs." },
        { day: 5, topic: "DILR Table & Graph Data Interpretation", focus: "Develop rapid calculation estimation for ratios & percentages." },
        { day: 6, topic: "QA Algebra & Quadratic Functions", focus: "Solve inequalities, logarithmic equations, and progressions." },
        { day: 7, topic: "Full Timed Sectional Simulation", focus: "Execute strict 40-minute per section pacing strategy." }
      ]
    };
  }

  const prompt = `You are a Lead Psychometrician and Chief Academic Director at Indian Institutes of Management (IIM) CAT Assessment Council.
Analyze the candidate's performance on the 2-Hour CAT 2026 Computer-Based Exam.

Candidate Attempt Summary:
- Total Raw Score: ${totalRaw} / 204
- Estimated Overall Percentile: ${percentiles.overall?.toFixed(2)} %ile
- Overall Question Accuracy: ${totalAccuracy}% (${totalCorrect}/${totalAttempted} attempted)

Sectional Scores:
1. VARC (Verbal Ability & Reading Comp): Raw ${varcRaw} / 72 (Attempted ${stats.varc?.attempted}/24, Correct ${stats.varc?.correct})
2. DILR (Data Interpretation & Logical Reasoning): Raw ${dilrRaw} / 66 (Attempted ${stats.dilr?.attempted}/22, Correct ${stats.dilr?.correct})
3. QA (Quantitative Ability): Raw ${qaRaw} / 66 (Attempted ${stats.qa?.attempted}/22, Correct ${stats.qa?.correct})

DILR Set Selection Choices:
${JSON.stringify(setEfficiency)}

Instructions:
Provide a comprehensive AI Evaluation Report formatted strictly as valid JSON with these exact keys:
{
  "overallDiagnostic": "Multi-paragraph strategic evaluation of performance relative to 99+ percentile IIM standards.",
  "varcDiagnostic": "Detailed analysis of RC passage comprehension, distractor avoidance, and VA accuracy.",
  "dilrDiagnostic": "Analysis of set selection strategy, time-trap avoidance, and constraint solving.",
  "qaDiagnostic": "Analysis of Arithmetic, Algebra, Geometry, and Number Systems speed and accuracy.",
  "targetIIMs": ["List of realistic target institutions based on score range, e.g. IIM Ahmedabad, IIM Bangalore"],
  "actionPlan": [
    { "day": 1, "topic": "Name", "focus": "Actionable drill focus" },
    ... 7 days
  ]
}`;

  try {
    const response = await groq.chat.completions.create({
      model: "groq/compound-mini",
      messages: [
        { role: "system", content: "You are an expert CAT Assessment Director. Respond strictly in valid JSON format." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    return parsed;
  } catch (error) {
    console.error("Groq AI CAT evaluation error:", error);
    return {
      overallDiagnostic: `Candidate scored a Total Raw Score of ${totalRaw} (${percentiles.overall?.toFixed(2)}%ile). Focus on accuracy over raw attempt speed.`,
      varcDiagnostic: `VARC Raw: ${varcRaw}. Improve passage tone identification and pronoun linkages in VA.`,
      dilrDiagnostic: `DILR Raw: ${dilrRaw}. Avoid Spending >8 minutes on sets with non-unique constraints.`,
      qaDiagnostic: `QA Raw: ${qaRaw}. Strengthen quadratic algebra and percentage calculations.`,
      targetIIMs: ["Top Tier B-Schools"],
      actionPlan: []
    };
  }
}
