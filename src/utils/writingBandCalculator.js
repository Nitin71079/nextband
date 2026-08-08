/**
 * Official IELTS Writing Band Calculator
 * Task 1 Weight: 33.33% (1/3)
 * Task 2 Weight: 66.67% (2/3)
 */

export const TASK1_MIN_WORDS = 80;
export const TASK2_MIN_WORDS = 200;

export function countWords(text = "") {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function roundIELTSBand(score) {
  const num = Number(score) || 0;
  if (num <= 0) return 0;
  const floor = Math.floor(num);
  const diff = num - floor;

  if (diff < 0.25) {
    return floor;
  } else if (diff < 0.75) {
    return floor + 0.5;
  } else {
    return floor + 1.0;
  }
}

/**
 * Calculates official IELTS writing band from Task 1 and Task 2 band scores.
 * Task 1 = 33.33% weight, Task 2 = 66.67% weight.
 * Official IELTS rounding rule:
 * - Fractional part < 0.25 -> round down to integer (.0)
 * - Fractional part >= 0.25 and < 0.75 -> round to half band (.5)
 * - Fractional part >= 0.75 -> round up to next whole band
 */
export function calculateIELTSTotalWritingBand(task1Band = 0, task2Band = 0) {
  const t1 = Number(task1Band) || 0;
  const t2 = Number(task2Band) || 0;
  
  if (t1 === 0 && t2 === 0) return 0;
  if (t1 === 0) return roundIELTSBand(t2);
  if (t2 === 0) return roundIELTSBand(t1);

  // Weighted raw score: 1/3 Task 1 + 2/3 Task 2
  const rawWeighted = (t1 * (1 / 3)) + (t2 * (2 / 3));
  const finalBand = Math.min(9.0, Math.max(1.0, roundIELTSBand(rawWeighted)));
  return Number(finalBand.toFixed(1));
}

/**
 * Checks if Task 1 and Task 2 satisfy minimum word count requirements for submission.
 */
export function validateWritingSubmission(task1Text = "", task2Text = "") {
  const task1Words = countWords(task1Text);
  const task2Words = countWords(task2Text);

  const task1Valid = task1Words >= TASK1_MIN_WORDS;
  const task2Valid = task2Words >= TASK2_MIN_WORDS;

  if (!task1Valid && !task2Valid) {
    return {
      canSubmit: false,
      task1Words,
      task2Words,
      task1Valid,
      task2Valid,
      reason: `Task 1 needs at least ${TASK1_MIN_WORDS} words (current: ${task1Words}) and Task 2 needs at least ${TASK2_MIN_WORDS} words (current: ${task2Words}).`,
    };
  }

  if (!task1Valid) {
    return {
      canSubmit: false,
      task1Words,
      task2Words,
      task1Valid,
      task2Valid,
      reason: `Task 1 response is too short (${task1Words} words). Minimum ${TASK1_MIN_WORDS} words required to submit.`,
    };
  }

  if (!task2Valid) {
    return {
      canSubmit: false,
      task1Words,
      task2Words,
      task1Valid,
      task2Valid,
      reason: `Task 2 essay is too short (${task2Words} words). Minimum ${TASK2_MIN_WORDS} words required to submit.`,
    };
  }

  return {
    canSubmit: true,
    task1Words,
    task2Words,
    task1Valid,
    task2Valid,
    reason: "Both responses meet the word count requirement.",
  };
}
