/**
 * KNARROW PTE ACADEMIC 2026 — CENTRAL TASK ENGINE & LIFECYCLE CONTROLLER
 * Fully aligned with Pearson PTE Academic Specifications
 * 
 * Manages task lifecycles:
 * IDLE -> PREPARING -> PLAYING_AUDIO -> READY_TO_RECORD -> RECORDING -> COMPLETED -> SUBMITTED -> ERROR
 */

export const ENGINE_STATES = {
  IDLE: "IDLE",
  PREPARING: "PREPARING",
  PLAYING_AUDIO: "PLAYING_AUDIO",
  READY_TO_RECORD: "READY_TO_RECORD",
  RECORDING: "RECORDING",
  COMPLETED: "COMPLETED",
  SUBMITTED: "SUBMITTED",
  ERROR: "ERROR"
};

/**
 * Returns default timing & recording configurations for all 22 PTE task types
 */
export function getTaskDefaultConfig(taskType) {
  switch (taskType) {
    case "personalIntro":
      return { prepSeconds: 25, responseSeconds: 30, autoPlayAudio: false, silenceDetectSeconds: 3, scored: false };
    case "readAloud":
      return { prepSeconds: 35, responseSeconds: 40, autoPlayAudio: false, silenceDetectSeconds: 3, scored: true };
    case "repeatSentence":
      return { prepSeconds: 0, responseSeconds: 15, autoPlayAudio: true, silenceDetectSeconds: 3, scored: true };
    case "describeImage":
      return { prepSeconds: 25, responseSeconds: 40, autoPlayAudio: false, silenceDetectSeconds: 3, scored: true };
    case "retellLecture":
      return { prepSeconds: 10, responseSeconds: 40, autoPlayAudio: true, silenceDetectSeconds: 3, scored: true };
    case "answerShortQuestion":
      return { prepSeconds: 0, responseSeconds: 10, autoPlayAudio: true, silenceDetectSeconds: 3, scored: true };
    case "summarizeGroupDiscussion":
      return { prepSeconds: 10, responseSeconds: 120, autoPlayAudio: true, silenceDetectSeconds: 3, scored: true };
    case "respondToSituation":
      return { prepSeconds: 10, responseSeconds: 40, autoPlayAudio: false, silenceDetectSeconds: 3, scored: true };
    case "summarizeWrittenText":
      return { taskSeconds: 600, minWords: 5, maxWords: 75, maxSentences: 1, scored: true };
    case "writeEssay":
      return { taskSeconds: 1200, minWords: 200, maxWords: 300, scored: true };
    case "dropdownBlanks":
    case "mcqMultiple":
    case "reorderParagraphs":
    case "dragDropBlanks":
    case "mcqSingle":
      return { sectionTimer: true, scored: true };
    case "summarizeSpokenText":
      return { taskSeconds: 600, minWords: 50, maxWords: 70, autoPlayAudio: true, scored: true };
    case "listeningMcqMultiple":
    case "fillBlanksTypeIn":
    case "highlightCorrectSummary":
    case "listeningMcqSingle":
    case "selectMissingWord":
    case "highlightIncorrectWords":
    case "writeFromDictation":
      return { autoPlayAudio: true, scored: true };
    default:
      return { prepSeconds: 10, responseSeconds: 30, scored: true };
  }
}

/**
 * Validates text requirements for Summarize Written Text
 */
export function validateSWTText(text) {
  const clean = (text || "").trim();
  if (!clean) return { valid: false, wordCount: 0, sentenceCount: 0, reason: "Response cannot be empty." };

  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Sentence count calculation based on end-of-sentence punctuation (.!?)
  const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = sentences.length;

  if (wordCount < 5 || wordCount > 75) {
    return { valid: false, wordCount, sentenceCount, reason: `Word count must be between 5 and 75 words (current: ${wordCount}).` };
  }

  if (sentenceCount > 1) {
    return { valid: false, wordCount, sentenceCount, reason: `Summarize Written Text must be exactly ONE single sentence (current: ${sentenceCount}).` };
  }

  return { valid: true, wordCount, sentenceCount, reason: "Valid sentence structure." };
}

/**
 * Validates text requirements for Write Essay
 */
export function validateEssayText(text) {
  const clean = (text || "").trim();
  if (!clean) return { valid: false, wordCount: 0, reason: "Essay response cannot be empty." };

  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount < 200 || wordCount > 300) {
    return { valid: false, wordCount, reason: `Word count should be between 200 and 300 words (current: ${wordCount}).` };
  }

  return { valid: true, wordCount, reason: "Valid essay word length." };
}
