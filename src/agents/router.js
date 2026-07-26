import { evaluateEssay } from "./essayAgent";

/**
 * Every AI feature is registered here.
 * As Phase 3 grows, simply add more agents.
 */

const AGENTS = {
  ESSAY: "essay",
  GRAMMAR: "grammar",
  VOCABULARY: "vocabulary",
  SPEAKING: "speaking",
  READING: "reading",
  LISTENING: "listening",
  PLANNER: "planner",
  GENERAL: "general",
};

/**
 * Keywords for lightweight intent detection.
 * This can later be replaced by an AI classifier.
 */
const INTENT_KEYWORDS = {
  [AGENTS.ESSAY]: [
    "essay",
    "writing",
    "band",
    "evaluate",
    "rewrite",
    "task 2",
    "task response",
    "coherence",
    "grammar",
    "lexical",
  ],

  [AGENTS.SPEAKING]: [
    "speaking",
    "cue card",
    "fluency",
    "pronunciation",
    "part 1",
    "part 2",
    "part 3",
  ],

  [AGENTS.READING]: [
    "reading",
    "true false",
    "not given",
    "matching",
    "passage",
  ],

  [AGENTS.LISTENING]: [
    "listening",
    "audio",
    "section 1",
    "section 2",
  ],

  [AGENTS.GRAMMAR]: [
    "grammar",
    "tense",
    "articles",
    "preposition",
    "correct sentence",
  ],

  [AGENTS.VOCABULARY]: [
    "vocabulary",
    "synonyms",
    "words",
    "idioms",
  ],

  [AGENTS.PLANNER]: [
    "plan",
    "study plan",
    "schedule",
    "roadmap",
    "daily plan",
  ],
};

/**
 * Detect user intent.
 */
export function detectIntent(message = "") {
  const text = message.toLowerCase();

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return intent;
    }
  }

  return AGENTS.GENERAL;
}

/**
 * Main Router
 */
export async function routeRequest({
  message,
  payload = {},
}) {
  const intent = detectIntent(message);

  switch (intent) {
    case AGENTS.ESSAY:
      return {
        intent,
        result: await evaluateEssay(payload.essay || message),
      };

    case AGENTS.SPEAKING:
      throw new Error(
        "Speaking Agent is not implemented yet."
      );

    case AGENTS.READING:
      throw new Error(
        "Reading Agent is not implemented yet."
      );

    case AGENTS.LISTENING:
      throw new Error(
        "Listening Agent is not implemented yet."
      );

    case AGENTS.GRAMMAR:
      throw new Error(
        "Grammar Agent is not implemented yet."
      );

    case AGENTS.VOCABULARY:
      throw new Error(
        "Vocabulary Agent is not implemented yet."
      );

    case AGENTS.PLANNER:
      throw new Error(
        "Planner Agent is not implemented yet."
      );

    default:
      return {
        intent: AGENTS.GENERAL,
        result: {
          message:
            "I'm your Knarrow AI assistant. I can help with IELTS Writing, Speaking, Reading, Listening, Grammar, Vocabulary, and Study Plans.",
        },
      };
  }
}

export default {
  detectIntent,
  routeRequest,
  AGENTS,
};