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

  const {
    response,
  } = req.body;

  return res.json({
    success: true,

    overallBand: 7,

    confidence: 84,

    estimatedRange:
      "6.5 - 7.5",

    benchmark:
      "Performance resembles a Band 7 candidate.",

    fluency: 7,

    lexicalResource:
      7,

    grammar: 7,

    pronunciation: 7,

    strengths: [
      "Good fluency",
      "Clear ideas",
    ],

    weaknesses: [
      "Vocabulary could be richer",
    ],

    improvements:
      [
        "Use more advanced vocabulary",
      ],

    improvedAnswer:
      "Band 8 speaking answer placeholder",
  });
}