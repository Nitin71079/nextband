/**
 * DET Scoring Engine — Calculates Knarrow Practice Estimate (10–160)
 * Computes individual subscores (Reading, Writing, Listening, Speaking)
 * and integrated subscores (Literacy, Comprehension, Conversation, Production).
 */

export function calculateDETPracticeScores(itemResponses = []) {
  if (!itemResponses || itemResponses.length === 0) {
    return {
      overall: 85,
      individual: { reading: 85, writing: 85, listening: 85, speaking: 85 },
      integrated: { literacy: 85, comprehension: 85, conversation: 85, production: 85 },
      label: "Knarrow Practice Estimate"
    };
  }

  let totalWeight = 0;
  let weightedScoreSum = 0;

  const skillSums = {
    literacy: { sum: 0, count: 0 },
    comprehension: { sum: 0, count: 0 },
    conversation: { sum: 0, count: 0 },
    production: { sum: 0, count: 0 },
  };

  itemResponses.forEach((resp) => {
    const accuracy = resp.accuracy ?? 0.8;
    const diff = resp.difficulty ?? 85;
    const score = Math.min(160, Math.max(10, Math.round(diff * (0.6 + accuracy * 0.5))));

    weightedScoreSum += score;
    totalWeight += 1;

    const skill = resp.skill || "literacy";
    if (skillSums[skill]) {
      skillSums[skill].sum += score;
      skillSums[skill].count += 1;
    }
  });

  const overall = totalWeight > 0 ? Math.min(160, Math.max(10, Math.round(weightedScoreSum / totalWeight))) : 85;

  const getSub = (key) => (skillSums[key].count > 0 ? Math.round(skillSums[key].sum / skillSums[key].count) : overall);

  const literacy = getSub("literacy");
  const comprehension = getSub("comprehension");
  const conversation = getSub("conversation");
  const production = getSub("production");

  return {
    overall,
    individual: {
      reading: Math.round((literacy + comprehension) / 2),
      listening: Math.round((comprehension + conversation) / 2),
      writing: Math.round((literacy + production) / 2),
      speaking: Math.round((conversation + production) / 2),
    },
    integrated: {
      literacy,
      comprehension,
      conversation,
      production,
    },
    label: "Knarrow Practice Estimate"
  };
}
