import aiService from "../services/aiService";
import { essayPrompt } from "./prompts/essayPrompt";

import { saveEssay } from "../repositories/essayRepository";

import {
  initializeAnalytics,
  getAnalytics,
  updateEssayAnalytics,
} from "../repositories/analyticsRepository";

import {
  initializeMemory,
  getMemory,
  updateEssayMemory,
} from "../repositories/memoryRepository";

/**
 * Count words in essay
 */
function getWordCount(text = "") {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * Build personalized system prompt
 */
function buildPrompt(memory) {
  return `
${essayPrompt}

Student Profile

Current IELTS Band:
${memory.profile.currentBand}

Target IELTS Band:
${memory.profile.targetBand}

Strongest Skill:
${memory.progress.strongestSkill ?? "Unknown"}

Weakest Skill:
${memory.progress.weakestSkill ?? "Unknown"}

Preferred Explanation Style:
${memory.ai.preferredExplanation}

Please personalize your feedback for this student.
`;
}

/**
 * Evaluate IELTS Essay
 */
export async function evaluateEssay({
  uid,
  essay,
}) {
  if (!uid) {
    throw new Error("User not authenticated.");
  }

  if (!essay?.trim()) {
    throw new Error("Essay cannot be empty.");
  }

  if (essay.trim().length < 100) {
    throw new Error(
      "Essay should contain at least 100 characters."
    );
  }

  // Ensure required documents exist
  await initializeAnalytics(uid);
  await initializeMemory(uid);

  // Load memory
  const memory = await getMemory(uid);

  // Personalized prompt
  const systemPrompt = buildPrompt(memory);

  let evaluation;

  try {
    evaluation = await aiService.json({
      systemPrompt,
      messages: [
        {
          role: "user",
          content: essay,
        },
      ],
    });
  } catch (error) {
    console.error(error);

    throw new Error(
      "AI evaluation failed. Please try again."
    );
  }

  const essayDocument = {
    essay,

    wordCount: getWordCount(essay),

    evaluation,

    aiModel:
      "llama-3.3-70b-specdec",

    promptVersion: "v1",

    schemaVersion: "1.0",
  };

  // Save essay
  const essayId = await saveEssay(
    uid,
    essayDocument
  );

  // Update analytics
  await updateEssayAnalytics(
    uid,
    evaluation
  );

  // Update memory
  await updateEssayMemory(
    uid,
    evaluation
  );

  // Fetch latest analytics
  const analytics =
    await getAnalytics(uid);

  /**
   * Return flattened response.
   * This keeps React components simple.
   */
  return {
    essayId,

    analytics,

    ...evaluation,
  };
}

export default {
  evaluateEssay,
};