import { Groq } from "groq-sdk";

const groqApiKey = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) || "";
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey, dangerouslyAllowBrowser: true }) : null;

/**
 * Generates Digital SAT Diagnostic Evaluation Report & 7-Day Action Plan via Groq AI (Llama 3.3 70B)
 */
export async function evaluateSATExamAI({ totalScore, rwScore, mathScore, rwRoute, mathRoute, stats = {} }) {
  if (!groq) {
    return {
      diagnosticSummary: `Digital SAT Total Score: ${totalScore}/1600 (Reading & Writing: ${rwScore}/800, Math: ${mathScore}/800). MST Routing: RW [${rwRoute}], Math [${mathRoute}].`,
      strengths: ["Strong Multistage Adaptive routing performance", "Effective time management in Module 1"],
      weaknesses: ["Complex Craft & Structure vocabulary in context", "Advanced Math non-linear systems"],
      actionPlan: [
        { day: 1, topic: "Reading & Writing — Craft & Structure Vocabulary", focus: "Practice elimination strategies for high-utility academic vocabulary in 100-word micro-passages." },
        { day: 2, topic: "Math — Algebra & Equivalent Linear Expressions", focus: "Solve multi-step linear systems under 60-second time limits using Desmos matrix shortcuts." },
        { day: 3, topic: "Reading & Writing — Standard English Conventions", focus: "Review boundary punctuation (semicolons vs dashes vs colons)." },
        { day: 4, topic: "Math — Advanced Math Quadratics & Radicals", focus: "Master factoring techniques and discriminant evaluation for non-linear equations." },
        { day: 5, topic: "Reading & Writing — Expression of Ideas Transitions", focus: "Practice transition word selection (furthermore, however, consequently)." },
        { day: 6, topic: "Math — Geometry & Trigonometry Right Triangles", focus: "Apply Pythagorean theorem and sine/cosine complementary angle relationships." },
        { day: 7, topic: "Full Digital SAT Adaptive Simulation Mock", focus: "Complete 134-minute adaptive simulation test." }
      ]
    };
  }

  const prompt = `You are a Senior College Board Certified Digital SAT Psychometric Coach.
Analyze the candidate's performance on the 2026 Multistage Adaptive Digital SAT:

Candidate Results:
- Total Score: ${totalScore} / 1600
- Reading & Writing Section: ${rwScore} / 800 (Routed to ${rwRoute} Module 2)
- Math Section: ${mathScore} / 800 (Routed to ${mathRoute} Module 2)

Instructions:
Respond strictly in valid JSON format with these exact keys:
{
  "diagnosticSummary": "Comprehensive psychometric evaluation of candidate's MST routing and domain accuracy.",
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
      model: "groq/compound-mini",
      messages: [
        { role: "system", content: "You are an expert Digital SAT Psychometrician. Respond strictly in valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const parsed = JSON.parse(response.choices[0].message.content);
    return parsed;
  } catch (error) {
    console.error("Groq AI Digital SAT evaluation error:", error);
    return {
      diagnosticSummary: `Digital SAT Total Score: ${totalScore}/1600 (RW: ${rwScore}, Math: ${mathScore}).`,
      strengths: ["Solid Module 1 performance", "Good speed on SPR Math questions"],
      weaknesses: ["Inference questions in literature passages", "Trigonometric identities"],
      actionPlan: [
        { day: 1, topic: "Reading & Writing Craft & Structure", focus: "Practice vocabulary in context." },
        { day: 2, topic: "Math Algebra & Linear Functions", focus: "Master slope-intercept interpretation." },
        { day: 3, topic: "Reading & Writing Information & Ideas", focus: "Inference and main idea drills." },
        { day: 4, topic: "Math Advanced Quadratics", focus: "Vertex form and discriminant drills." },
        { day: 5, topic: "Reading & Writing Conventions", focus: "Punctuation and clause boundaries." },
        { day: 6, topic: "Math Geometry & Circles", focus: "Arc length and circle equation forms." },
        { day: 7, topic: "Full Digital SAT Mock", focus: "Complete full 134m test." }
      ]
    };
  }
}
