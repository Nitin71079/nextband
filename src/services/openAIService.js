export async function callOpenAI(
  prompt
) {
  const text =
    prompt.toLowerCase();

  let band = 4;

  const words =
    text
      .split(/\s+/)
      .filter(Boolean)
      .length;

  if (words < 20) {
    band = 1;
  } else if (words < 50) {
    band = 3;
  } else if (words < 100) {
    band = 4.5;
  } else if (words < 200) {
    band = 5.5;
  } else if (words < 300) {
    band = 6.5;
  } else {
    band = 7;
  }

  return {
    success: true,

    overallBand: band,

    confidence: 85,

    estimatedRange:
      `${Math.max(
        1,
        band - 0.5
      )} - ${band + 0.5}`,

    benchmark:
      `Performance resembles a Band ${band} candidate.`,

    taskResponse: band,
    coherenceCohesion: band,
    lexicalResource: band,
    grammarRangeAccuracy: band,

    fluency: band,
    grammar: band,
    pronunciation: band,

    strengths: [
      "Basic response generated."
    ],

    weaknesses: [
      "Mock evaluator currently active."
    ],

    recommendations: [
      "Connect real OpenAI evaluation for accurate scoring."
    ],

    improvedEssay:
      "Improved essay placeholder.",

    improvedAnswer:
      "Improved speaking response placeholder.",
  };
}