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

/**
 * Calculates official IELTS writing band from Task 1 and Task 2 band scores.
 * Task 1 = 33% weight, Task 2 = 67% weight.
 * Official IELTS rounding rule:
 * - Fractional part < 0.25 -> round down to integer (.0)
 * - Fractional part >= 0.25 and < 0.75 -> round to half band (.5)
 * - Fractional part >= 0.75 -> round up to next whole band (ceil)
 */
export function calculateIELTSTotalWritingBand(task1Band = 0, task2Band = 0) {
  const t1 = Number(task1Band) || 0;
  const t2 = Number(task2Band) || 0;
  
  if (t1 === 0 && t2 === 0) return 0;

  // Weighted raw score: 33.33% Task 1 + 66.67% Task 2
  const rawWeighted = (t1 * (1 / 3)) + (t2 * (2 / 3));

  const integerPart = Math.floor(rawWeighted);
  const decimalPart = rawWeighted - integerPart;

  let roundedBand = integerPart;
  if (decimalPart >= 0.75) {
    roundedBand = integerPart + 1.0;
  } else if (decimalPart >= 0.25) {
    roundedBand = integerPart + 0.5;
  } else {
    roundedBand = integerPart + 0.0;
  }

  // IELTS bands are capped between 1.0 and 9.0
  const finalBand = Math.min(9.0, Math.max(1.0, roundedBand));
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
