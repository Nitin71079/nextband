import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req,
  res
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        error: "Method not allowed",
      });
    }

    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(
      chunks
    );

    const file = new File(
      [buffer],
      "recording.webm",
      {
        type: "audio/webm",
      }
    );

    const transcript =
      await openai.audio.transcriptions.create(
        {
          file,
          model: "whisper-1",
        }
      );

    return res.status(200).json({
      success: true,
      transcript:
        transcript.text,
    });
  } catch (error) {
    console.error(
      "Whisper Error:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Transcription failed",
    });
  }
}