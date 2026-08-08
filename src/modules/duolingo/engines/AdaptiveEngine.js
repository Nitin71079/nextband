import { detItemBank } from "../../../data/duolingo/itemBank";

export class AdaptiveEngine {
  constructor(initialScore = 85) {
    this.currentScoreEstimate = initialScore;
    this.servedItemIds = new Set();
    this.responseHistory = [];
  }

  /**
   * Selects the next best item from item bank based on current estimated score.
   */
  selectNextItem(desiredSkill = null) {
    const availableItems = detItemBank.filter(
      (item) => !this.servedItemIds.has(item.id) && (!desiredSkill || item.skill === desiredSkill)
    );

    if (availableItems.length === 0) {
      // Fallback if all items served in target skill
      const fallback = detItemBank.filter((item) => !this.servedItemIds.has(item.id));
      if (fallback.length === 0) return null;
      return fallback[Math.floor(Math.random() * fallback.length)];
    }

    // Sort by proximity to current estimated score
    availableItems.sort(
      (a, b) =>
        Math.abs(a.difficultyValue - this.currentScoreEstimate) -
        Math.abs(b.difficultyValue - this.currentScoreEstimate)
    );

    const nextItem = availableItems[0];
    this.servedItemIds.add(nextItem.id);
    return nextItem;
  }

  /**
   * Updates ability estimate based on response accuracy (0.0 to 1.0)
   */
  recordResponse(itemId, accuracyScore, itemDifficultyValue) {
    this.responseHistory.push({
      itemId,
      accuracyScore,
      itemDifficultyValue,
      scoreBefore: this.currentScoreEstimate,
    });

    // Adaptive step adjustment
    const K = 8; // Step scaling factor
    const expectedScore = 1 / (1 + Math.pow(10, (itemDifficultyValue - this.currentScoreEstimate) / 40));
    const delta = K * (accuracyScore - expectedScore);

    this.currentScoreEstimate = Math.min(160, Math.max(10, Math.round(this.currentScoreEstimate + delta)));
    return this.currentScoreEstimate;
  }

  getEstimatedScore() {
    return this.currentScoreEstimate;
  }
}
