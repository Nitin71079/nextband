import { Groq } from "groq-sdk";

const groqApiKey = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || "";
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

/**
 * Generates GMAT Exam Diagnostic Evaluation Report & 7-Day Action Plan via Groq AI (Llama 3.3 70B)
 */
export async function evaluateGMATExamAI({ totalScore, quantScore, verbalScore, diScore, sectionOrder = [], stats = {} }) {
  if (!groq) {
    return {
      diagnosticSummary: `GMAT Total Score: ${totalScore}/805 (Quant: ${quantScore}/90, Verbal: ${verbalScore}/90, Data Insights: ${diScore}/90). Section Order Executed: ${sectionOrder.join(" → ").toUpperCase()}.`,
      strengths: ["Strong Problem Solving accuracy under Quant 45m timer", "Effective Data Sufficiency reasoning"],
      weaknesses: ["Complex Multi-Source Reasoning tab integration", "Critical Reasoning weaken/strengthen traps"],
      actionPlan: [
        { day: 1, topic: "Data Insights — Data Sufficiency Optimization", focus: "Practice evaluating Statement 1 & 2 independently before combining." },
        { day: 2, topic: "Quantitative Reasoning — Advanced Algebra & Quadratics", focus: "Solve non-linear systems and root inequalities without calculator dependence." },
        { day: 3, topic: "Verbal Reasoning — Critical Reasoning Argument Analysis", focus: "Identify central assumptions and unstated premises in business/economic scenarios." },
        { day: 4, topic: "Data Insights — Table Analysis Sortable Data Drills", focus: "Practice column sorting and multi-condition filtering under 90-second timers." },
        { day: 5, topic: "Verbal Reasoning — Reading Comprehension Inferences", focus: "Eliminate extreme distractors in dense humanities and natural science passages." },
        { day: 6, topic: "Data Insights — Multi-Source Reasoning Tab Integration", focus: "Synthesize data across 3 conflicting tabs (sales, policy, customer rules)." },
        { day: 7, topic: "Full GMAT Computer-Adaptive Simulation Mock", focus: "Complete 135-minute computer-adaptive simulation test." }
      ]
    };
  }

  const prompt = `You are a Senior GMAC Certified GMAT Psychometric Coach.
Analyze the candidate's performance on the 2026 GMAT Exam:

Candidate Results:
- Total Score: ${totalScore} / 805
- Quantitative Reasoning Section: ${quantScore} / 90
- Verbal Reasoning Section: ${verbalScore} / 90
- Data Insights Section: ${diScore} / 90
- Chosen Section Order: ${sectionOrder.join(" → ").toUpperCase()}

Instructions:
Respond strictly in valid JSON format with these exact keys:
{
  "diagnosticSummary": "Comprehensive psychometric evaluation of candidate's CAT trajectory, section order strategy, and score balance.",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "actionPlan": [
    { "day": 1, "topic": "Topic 1", "focus": "Actionable focus 1" },
    { "day": 2, "topic": "Topic 2", "focus": "Actionable focus 2" },
    { "day": 3, "topic": "Topic 3", "focus": "Actionable focus 3" },
    { "day": 4, "topic": "Topic 4", "focus": "Actionable focus 4" },
    { "day": 5, "topic": "Topic 5", "focus": "Actionable focus 5" },
    { "day": 6, "topic": "Topic 6", "focus": "Actionable focus 6" },
    { "day": 7, "topic": "Topic 7", "focus": "Actionable focus 7" }
  ]
}`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert GMAT Psychometrician. Respond strictly in valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    return parsed;
  } catch (error) {
    console.error("Groq AI GMAT evaluation error:", error);
    return {
      diagnosticSummary: `GMAT Total Score: ${totalScore}/805 (Quant: ${quantScore}, Verbal: ${verbalScore}, DI: ${diScore}).`,
      strengths: ["Solid Quant reasoning", "Good speed on Critical Reasoning"],
      weaknesses: ["Data Sufficiency C vs E traps", "Multi-Source Reasoning tab filtering"],
      actionPlan: [
        { day: 1, topic: "Data Insights Data Sufficiency", focus: "Eliminate Statement 1 & 2 independence traps." },
        { day: 2, topic: "Quantitative Problem Solving", focus: "Work word problems and rate/ratio setups." },
        { day: 3, topic: "Verbal Critical Reasoning", focus: "Assumption and flaw identification." },
        { day: 4, topic: "Data Insights Table Analysis", focus: "Practice column sorting." },
        { day: 5, topic: "Verbal Reading Comprehension", focus: "Dense passage main idea mapping." },
        { day: 6, topic: "Data Insights Two-Part Analysis", focus: "Solve dual dependent variables." },
        { day: 7, topic: "Full GMAT CAT Mock", focus: "Complete full 135m test." }
      ]
    };
  }
}
