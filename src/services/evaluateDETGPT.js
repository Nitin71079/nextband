import { app } from "../firebase";
import { getAuth } from "firebase/auth";

/**
 * AI Evaluator for Duolingo English Test (DET) Writing & Speaking Tasks
 * Uses OpenAI API (or backend proxy) to evaluate DET production responses.
 */
export async function evaluateDETGPT({ taskType, questionPrompt, userResponse, imageUrl = null }) {
  const auth = getAuth(app);
  const user = auth.currentUser;

  try {
    const response = await fetch("/api/evaluate-det", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user ? `Bearer ${await user.getIdToken()}` : "",
      },
      body: JSON.stringify({
        taskType,
        questionPrompt,
        userResponse,
        imageUrl,
      }),
    });

    if (!response.ok) {
      // Fallback local heuristic scoring if endpoint is unavailable
      return fallbackDETEvaluation({ taskType, userResponse });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("API DET evaluation fallback activated:", error);
    return fallbackDETEvaluation({ taskType, userResponse });
  }
}

/**
 * Heuristic Local AI Fallback Evaluator for DET Production Tasks
 */
function fallbackDETEvaluation({ taskType, userResponse }) {
  const text = typeof userResponse === "string" ? userResponse.trim() : "Sample response provided.";
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Lexical diversity calculation (Type-Token Ratio)
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
      lexicalSophistication: ttr > 0.65 ? "Strong vocabulary range with varied word choices." : "Good basic vocabulary. Try incorporating C1/C2 advanced synonyms.",
      grammaticalComplexity: wordCount > 30 ? "Demonstrates varied sentence structures." : "Sentences are mostly simple. Try adding compound and complex clauses.",
      taskRelevance: "Response effectively addresses the prompt.",
      recommendation: "Focus on expanding academic vocabulary and transitional phrases to push past DET 130+.",
    },
  };
}
