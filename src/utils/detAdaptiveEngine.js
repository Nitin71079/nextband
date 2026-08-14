/**
 * Computer-Adaptive Exam Engine for Duolingo English Test (DET)
 * Approximates Item Response Theory (IRT) 3-Parameter Logistic Model (3PL)
 */

export class DETAdaptiveEngine {
  constructor(initialTheta = 0.0) {
    this.theta = initialTheta; // Candidate ability (-3.0 to +3.0)
    this.history = [];
  }

  /**
   * Update candidate ability theta based on response accuracy
   * @param {number} itemDifficulty - Difficulty level (-2.0 Easy, 0.0 Medium, 2.0 Hard)
   * @param {boolean} isCorrect - Whether candidate answered item correctly
   */
  recordResponse(itemDifficulty, isCorrect) {
    const K = 0.4; // Learning rate step size
    const expectedAccuracy = 1 / (1 + Math.exp(-(this.theta - itemDifficulty)));
    const actualAccuracy = isCorrect ? 1.0 : 0.0;

    // Update theta ability parameter
    this.theta += K * (actualAccuracy - expectedAccuracy);
    this.theta = Math.min(3.0, Math.max(-3.0, this.theta));

    this.history.push({
      itemDifficulty,
      isCorrect,
      thetaAfter: this.theta,
    });
  }

  /**
   * Get target difficulty level for next item
   * @returns {"Easy" | "Medium" | "Hard"}
   */
  getNextItemDifficulty() {
    if (this.theta > 1.0) return "Hard";
    if (this.theta < -0.5) return "Easy";
    return "Medium";
  }

  /**
   * Convert final theta ability parameter to estimated DET Overall Score (10-160)
   */
  getEstimatedDETScore() {
    // Linear mapping from theta [-3.0, +3.0] to DET [10, 160]
    const rawScore = 85 + (this.theta / 3.0) * 75;
    return Math.min(160, Math.max(10, Math.round(rawScore / 5) * 5));
  }
}
