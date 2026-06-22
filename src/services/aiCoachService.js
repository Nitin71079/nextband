import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true,
});

export async function askAICoach(
  question
) {
  const completion =
    await client.chat.completions.create({
      model:
        "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are NextBand AI Coach.

You help IELTS students improve Reading, Listening, Writing and Speaking.

Give practical advice.

Generate study plans when requested.

Explain IELTS concepts clearly.

Keep responses under 250 words.
`,
        },
        {
          role: "user",
          content: question,
        },
      ],

      temperature: 0.5,
    });

  return completion.choices[0]
    .message.content;
}