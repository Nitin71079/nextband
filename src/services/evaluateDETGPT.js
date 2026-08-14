import { askGroqJSON } from "./aiService";

/**
 * Groq-Powered AI Evaluator for Duolingo English Test (DET) Speaking & Writing Tasks
 * Powered by Groq llama-3.3-70b-versatile evaluating against official DET rubrics:
 * - Grammatical Accuracy & Complexity
 * - Lexical Sophistication & Diversity
 * - Task Relevance & Coherence
 * - Fluency & Pacing
 */
export async function evaluateDETGPT({ taskType, questionPrompt, userResponse, imageUrl = null }) {
  const textResponse = typeof userResponse === "string" ? userResponse.trim() : "Audio recording submitted.";

  const systemPrompt = `You are an expert official examiner for the Duolingo English Test (DET).
Your job is to evaluate candidate responses for Speaking and Writing tasks on the official 10 to 160 DET score scale (in 5-point increments).

DET Grading Criteria:
1. Grammatical Accuracy & Complexity (Structure variety, clauses, tense accuracy)
2. Lexical Sophistication & Diversity (Advanced academic vocabulary, collocation, range)
3. Task Relevance & Coherence (Fulfillment of prompt, organization, cohesive devices)
4. Fluency / Spoken & Written Pacing (Word count, continuity)

Output ONLY valid JSON with no extra text or markdown syntax:
{
  "score": 125,
  "subscores": {
    "literacy": 125,
    "comprehension": 130,
    "conversation": 120,
    "production": 120
  },
  "feedback": {
    "grammaticalComplexity": "Detailed feedback on grammar and sentence structure...",
    "lexicalSophistication": "Detailed feedback on vocabulary range and word choices...",
    "taskRelevance": "Detailed feedback on task fulfillment...",
    "recommendation": "Actionable advice to reach DET 130-160..."
  }
}`;

  const userPrompt = `Evaluate the following DET candidate response:

Task Type: ${taskType}
Prompt: ${questionPrompt || "Respond to the task prompt."}
Image URL: ${imageUrl || "None"}
Candidate Response: "${textResponse}"

Calculate overall score (10-160 in steps of 5) and subscores for Literacy, Comprehension, Conversation, Production. Return valid JSON only.`;

  try {
    const rawResult = await askGroqJSON(systemPrompt, userPrompt);
    const parsed = typeof rawResult === "string" ? JSON.parse(rawResult) : rawResult;
    return parsed;
  } catch (error) {
    console.warn("Groq DET evaluation error, activating local backup evaluator:", error);
    return fallbackDETEvaluation({ taskType, userResponse: textResponse });
  }
}

/**
 * Fallback Local Heuristic Evaluator
 */
function fallbackDETEvaluation({ taskType, userResponse }) {
  const text = typeof userResponse === "string" ? userResponse.trim() : "Sample response provided.";
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, "")));
  const ttr = wordCount > 0 ? uniqueWords.size / wordCount : 0.5;

  let baseScore = 90;
  if (wordCount >= 50) baseScore += 25;
  else if (wordCount >= 25) baseScore += 15;
  else if (wordCount >= 10) baseScore += 5;

  if (ttr > 0.75) baseScore += 15;
  else if (ttr > 0.6) baseScore += 10;

  const estimatedDETScore = Math.min(160, Math.max(40, Math.round(baseScore / 5) * 5));

  return {
    score: estimatedDETScore,
    subscores: {
      literacy: Math.min(160, estimatedDETScore + 5),
      comprehension: Math.min(160, estimatedDETScore + 0),
      conversation: Math.min(160, estimatedDETScore - 5),
      production: Math.min(160, estimatedDETScore),
    },
    feedback: {
      grammaticalComplexity: wordCount > 30 ? "Demonstrates varied sentence structures." : "Sentences are mostly simple. Add compound/complex clauses.",
      lexicalSophistication: ttr > 0.65 ? "Strong vocabulary range with varied word choices." : "Good basic vocabulary. Incorporate advanced C1/C2 academic words.",
      taskRelevance: "Response effectively addresses the prompt.",
      recommendation: "Focus on expanding academic vocabulary and transitional phrases to push past DET 130+.",
    },
  };
}
