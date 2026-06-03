import openai from "./openaiClient";

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        error: "Transcript is required",
      });
    }

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [
          {
            role: "system",

            content: `
You are a certified IELTS Speaking examiner.

Evaluate the student's response using official IELTS criteria:

1. Fluency & Coherence
2. Lexical Resource
3. Grammatical Range & Accuracy
4. Pronunciation

Return ONLY valid JSON.

Format:

{
  "overallBand": 0,
  "fluency": 0,
  "lexicalResource": 0,
  "grammar": 0,
  "pronunciation": 0,
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "sampleBetterAnswer": ""
}
            `,
          },

          {
            role: "user",
            content: transcript,
          },
        ],

        response_format: {
          type: "json_object",
        },
      });

    const result = JSON.parse(
      completion.choices[0]
        .message.content
    );

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(
      "Speaking Evaluation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Evaluation failed",
    });
  }
}