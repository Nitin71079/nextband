export default async function handler(
  req,
  res
) {
  if (
    req.method !==
    "POST"
  ) {
    return res
      .status(405)
      .json({
        success: false,
      });
  }

  const { essay } =
    req.body;

  return res.json({
    success: true,

    overallBand: 7,

    confidence: 85,

    estimatedRange:
      "6.5 - 7.5",

    benchmark:
      "Performance resembles a Band 7 candidate.",

    explanation: {
      taskResponse:
        "Well-developed response.",

      coherence:
        "Clear progression.",

      lexical:
        "Good vocabulary range.",

      grammar:
        "Good grammatical control.",
    },

    strengths: [
      "Clear position",
      "Good vocabulary",
    ],

    weaknesses: [
      "Examples could be stronger",
    ],

    recommendations:
      [
        "Develop ideas further",
      ],

    improvedEssay:
      "Band 8 rewrite placeholder",
  });
}