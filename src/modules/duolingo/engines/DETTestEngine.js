import { AdaptiveEngine } from "./AdaptiveEngine";
import { detItemBank } from "../../../data/duolingo/itemBank";

export class DETTestEngine {
  constructor(testTemplate = null) {
    this.adaptiveEngine = new AdaptiveEngine(85);
    this.testTemplate = testTemplate;
    this.currentItem = null;
    this.itemIndex = 0;
    this.userAnswers = {};
    this.itemScores = {};
    this.totalItems = testTemplate ? testTemplate.itemIds.length : 10;
    this.isComplete = false;
    this.startTime = Date.now();
  }

  start() {
    this.itemIndex = 0;
    this.isComplete = false;
    this.startTime = Date.now();
    return this.nextItem();
  }

  nextItem() {
    if (this.itemIndex >= this.totalItems) {
      this.isComplete = true;
      return null;
    }

    let item = null;
    if (this.testTemplate && this.testTemplate.itemIds[this.itemIndex]) {
      const id = this.testTemplate.itemIds[this.itemIndex];
      item = detItemBank.find((i) => i.id === id);
    }

    if (!item) {
      item = this.adaptiveEngine.selectNextItem();
    }

    this.currentItem = item;
    this.itemIndex += 1;
    return item;
  }

  submitItemResponse(itemId, answer, accuracy = 1.0) {
    this.userAnswers[itemId] = answer;
    const item = detItemBank.find((i) => i.id === itemId);
    const diff = item ? item.difficultyValue : 85;
    
    this.adaptiveEngine.recordResponse(itemId, accuracy, diff);
    this.itemScores[itemId] = {
      answer,
      accuracy,
      difficulty: diff
    };

    return this.nextItem();
  }

  getOverallEstimate() {
    return this.adaptiveEngine.getEstimatedScore();
  }
}
