/**
 * KNARROW GMAT 2026 — TRUE ITEM RESPONSE THEORY (IRT) ADAPTIVE ENGINE
 * Implements 2PL/3PL Computer-Adaptive Testing (CAT) for GMAT Focus Edition.
 * Dynamically computes Fisher Item Information I(theta) after each response
 * to scale question difficulty in real-time matching candidate ability (theta).
 */

/**
 * Calculates 3PL IRT Probability P(theta) of answering a question correctly
 * @param {number} theta - Candidate ability estimate (-3.0 to +3.0)
 * @param {number} a - Item discrimination parameter (default: 1.25)
 * @param {number} b - Item difficulty parameter (-2.5 to +2.5)
 * @param {number} c - Pseudo-guessing parameter (default: 0.20 for 5-option MCQ)
 */
export function calculateIRTProbability(theta = 0, a = 1.25, b = 0, c = 0.20) {
  const exponent = -a * (theta - b);
  const logistic = 1 / (1 + Math.exp(exponent));
  return c + (1 - c) * logistic;
}

/**
 * Calculates Fisher Item Information Function I(theta)
 * I(theta) = a^2 * ((P(theta) - c)^2 / (1 - c)^2) * ((1 - P(theta)) / P(theta))
 */
export function calculateItemInformation(theta = 0, a = 1.25, b = 0, c = 0.20) {
  const p = calculateIRTProbability(theta, a, b, c);
  if (p <= 0 || p >= 1) return 0;
  
  const num = Math.pow(a, 2) * Math.pow(p - c, 2) * (1 - p);
  const den = Math.pow(1 - c, 2) * p;
  return num / den;
}

/**
 * AbilityEstimator Module: Handles ability state estimation using damped MLE/Bayesian update steps
 */
export const AbilityEstimator = {
  updateTheta(previousTheta = 0, isCorrect = true, difficultyB = 0, discriminationA = 1.25, guessingC = 0.20) {
    const p = calculateIRTProbability(previousTheta, discriminationA, difficultyB, guessingC);
    
    // Damped gain factor scaling with sample size / ability extremity
    const gain = 0.45 / (1 + 0.3 * Math.abs(previousTheta));
    const residual = isCorrect ? (1 - p) : (0 - p);
    
    const delta = gain * (discriminationA / 1.2) * residual;
    const newTheta = Math.max(-3.0, Math.min(3.0, previousTheta + delta));

    return parseFloat(newTheta.toFixed(3));
  }
};

/**
 * QuestionSelector Module: Selects optimal next item maximizing Fisher Information while checking content constraints
 */
export const QuestionSelector = {
  selectNextQuestion(currentTheta = 0, itemPool = [], answeredIds = new Set(), targetQuestionType = null) {
    let availableItems = itemPool.filter((item) => !answeredIds.has(item.id));
    
    if (targetQuestionType) {
      const typeFiltered = availableItems.filter((item) => item.questionType === targetQuestionType);
      if (typeFiltered.length > 0) {
        availableItems = typeFiltered;
      }
    }

    if (availableItems.length === 0) return null;

    let bestItem = availableItems[0];
    let maxInfo = -1;

    availableItems.forEach((item) => {
      const a = item.irt?.a || item.discrimination || 1.25;
      const b = item.irt?.b ?? (item.difficulty === "HARD" ? 1.2 : item.difficulty === "EASY" ? -1.0 : 0.0);
      const c = item.irt?.c ?? 0.20;

      const info = calculateItemInformation(currentTheta, a, b, c);

      if (info > maxInfo) {
        maxInfo = info;
        bestItem = item;
      }
    });

    return bestItem;
  }
};

/**
 * DifficultyModel Module: Converts IRT b parameter to human-readable difficulty label
 */
export const DifficultyModel = {
  getDifficultyLabel(b = 0) {
    if (b < -0.8) return "EASY";
    if (b > 0.8) return "HARD";
    return "MEDIUM";
  }
};

/**
 * ScoringModel Module: Provides section score projection based on theta trajectory
 */
export const ScoringModel = {
  thetaToSectionScore(theta = 0) {
    const bounded = Math.max(-3.0, Math.min(3.0, Number(theta) || 0));
    const norm = (bounded + 3.0) / 6.0;
    return Math.max(60, Math.min(90, Math.round(60 + norm * 30)));
  }
};

// Backwards-compatible standalone exports
export function selectNextCATQuestion(currentTheta, itemPool, answeredIds) {
  return QuestionSelector.selectNextQuestion(currentTheta, itemPool, answeredIds);
}

export function updateAbilityEstimate(previousTheta, isCorrect, difficultyB, discriminationA, guessingC) {
  return AbilityEstimator.updateTheta(previousTheta, isCorrect, difficultyB, discriminationA, guessingC);
}

