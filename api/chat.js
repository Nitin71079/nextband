console.log(
  "API KEY EXISTS:",
  !!process.env.OPENAI_API_KEY
);
import openai from "./openaiClient.js";

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message required",
      });
    }

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        messages: [
          {
            role: "system",
            content:
              "You are an expert IELTS tutor. Give concise, helpful IELTS advice.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

    return res.status(200).json({
      reply:
        completion.choices[0]
          .message.content,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        error.message ||
        "AI request failed",
    });
  }
}