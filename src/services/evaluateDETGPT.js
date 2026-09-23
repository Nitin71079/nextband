import { askGroqJSON } from "./aiService";

/**
 * Groq-Powered AI Evaluator for Duolingo English Test (DET) Speaking & Writing Tasks
 * Powered by Groq groq/compound-mini evaluating against official DET rubrics:
 * - Grammatical Accuracy & Complexity
 * - Lexical Sophistication & Diversity
 * - Task Relevance & Coherence
 * - Fluency & Pacing
 */
export async function evaluateDETGPT({ taskType, questionPrompt, userResponse, imageUrl = null }) {
  const textResponse = typeof userResponse === "string" ? userResponse.trim() : "Audio recording submitted for evaluation.";

  const systemPrompt = `You are an official examiner for the Duolingo English Test (DET).
Your job is to evaluate candidate responses for Speaking and Writing tasks strictly according to official DET scoring criteria:

Official DET Scoring Rubric:
1. Grammatical Accuracy & Complexity (Sentence structure variety, clause subordination, tense control, error frequency)
2. Lexical Sophistication & Diversity (Word choice precision, C1/C2 academic vocabulary range, natural collocations, type-token ratio)
3. Task Relevance & Coherence (Prompt fulfillment, logical flow, paragraph organization, cohesive transitions)
4. Fluency & Pacing (Spoken fluency, speech rate, written elaboration, word count volume)

IMPORTANT SCORING RULE:
All overall scores and subscores MUST be integers between 10 and 160, strictly in 5-point increments (e.g., 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160).

Output ONLY valid JSON with no extra text or markdown codeblocks:
{
  "score": 125,
  "subscores": {
    "literacy": 125,
    "comprehension": 120,
    "conversation": 130,
    "production": 125
  },
  "feedback": {
    "grammaticalComplexity": "Detailed analysis of grammar, syntax errors, and sentence variety...",
    "lexicalSophistication": "Detailed analysis of vocabulary sophistication and word choice...",
    "taskRelevance": "Analysis of how thoroughly the candidate fulfilled the task prompt...",
    "recommendation": "Specific actionable advice to advance candidate score to the next 5-point tier..."
  }
}`;

  const userPrompt = `Evaluate the following DET candidate response:

Task Type: ${taskType}
Prompt: ${questionPrompt || "Respond to the task prompt."}
Image URL: ${imageUrl || "None"}
Candidate Response: "${textResponse}"

Compute DET overall score and subscores (10-160 in steps of 5). Return valid JSON only.`;

  try {
    const rawResult = await askGroqJSON(systemPrompt, userPrompt);
    const parsed = typeof rawResult === "string" ? JSON.parse(rawResult) : rawResult;

    const round5 = (val) => Math.min(160, Math.max(10, Math.round((Number(val) || 100) / 5) * 5));

    return {
      score: round5(parsed.score),
      subscores: {
        literacy: round5(parsed.subscores?.literacy || parsed.score),
        comprehension: round5(parsed.subscores?.comprehension || parsed.score),
        conversation: round5(parsed.subscores?.conversation || parsed.score),
        production: round5(parsed.subscores?.production || parsed.score),
      },
      feedback: parsed.feedback || {
        grammaticalComplexity: "Demonstrates varied sentence structures with minor grammatical errors.",
        lexicalSophistication: "Good vocabulary range with effective word choices.",
        taskRelevance: "Response directly addresses the prompt requirements.",
        recommendation: "Focus on expanding academic collocations to push past 130+.",
      },
    };
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
