import OpenAI from "openai";

const client =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

export default async function handler(
  req,
  res
) {
  try {
  const { prompt } =
  req.body || {};

if (!prompt) {
  return res
    .status(400)
    .json({
      content:
        JSON.stringify({
          success: false,
          error:
            "Prompt is required.",
        }),
    });
}

    const completion =
      await client.chat.completions.create({
        
        model:
          "gpt-4o",
        messages: [
          {
            role:
              "user",
            content:
              prompt,
          },
        ],
        temperature:
          0.3,
          max_tokens: 2000,
      });

    return res.status(200).json({
      content:
        completion
          .choices[0]
          .message
          .content,
    });
  } catch (
    error
  ) {
    console.error(error);

    return res.status(500).json({
      content:
        JSON.stringify({
          success:
            false,
          error:
  "OpenAI API Error",
        }),
    });
  }
}