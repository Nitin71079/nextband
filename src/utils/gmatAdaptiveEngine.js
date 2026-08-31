/**
 * KNARROW GMAT 2026 — ITEM-LEVEL COMPUTER-ADAPTIVE TESTING (CAT) ENGINE
 * Uses Item Response Theory (2PL IRT) to dynamically select questions that maximize Item Information
 */

/**
 * Calculates 2PL IRT Probability P(theta) of answering correctly
 * P(theta) = 1 / (1 + e^(-a * (theta - b)))
 */
export function calculateIRTProbability(theta = 0, a = 1.2, b = 0) {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

/**
 * Calculates Item Information Function I(theta) = a^2 * P(theta) * (1 - P(theta))
 */
export function calculateItemInformation(theta = 0, a = 1.2, b = 0) {
  const p = calculateIRTProbability(theta, a, b);
  return Math.pow(a, 2) * p * (1 - p);
}

/**
 * Dynamically selects the next CAT question from pool maximizing Item Information
 */
export function selectNextCATQuestion(currentTheta = 0, itemPool = [], answeredIds = new Set()) {
  const availableItems = itemPool.filter((item) => !answeredIds.has(item.id));
  if (availableItems.length === 0) return null;

  let bestItem = availableItems[0];
  let maxInfo = -1;

  availableItems.forEach((item) => {
    const a = item.irt?.a || 1.2;
    const b = item.irt?.b || 0;
    const info = calculateItemInformation(currentTheta, a, b);

    if (info > maxInfo) {
      maxInfo = info;
      bestItem = item;
    }
  });

  return bestItem;
}

/**
 * Updates candidate ability estimate (theta) using Maximum Likelihood Estimation step
 */
export function updateAbilityEstimate(previousTheta = 0, isCorrect = true, difficultyB = 0, discriminationA = 1.2) {
  const p = calculateIRTProbability(previousTheta, discriminationA, difficultyB);
  const k = 0.4 / (1 + Math.abs(previousTheta)); // Damped step adjustment
  const update = isCorrect ? k * (1 - p) : -k * p;

  const newTheta = Math.max(-3.0, Math.min(3.0, previousTheta + update));
  return parseFloat(newTheta.toFixed(3));
}
