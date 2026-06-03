import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req,
  res
) {
  try {
    const { script } = req.body;

    const mp3 =
      await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: script,
      });

    const buffer = Buffer.from(
      await mp3.arrayBuffer()
    );

    res.setHeader(
      "Content-Type",
      "audio/mpeg"
    );

    res.send(buffer);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}