import OpenAI from "openai";

const client = new OpenAI({
apiKey: import.meta.env.VITE_GROQ_API_KEY,
baseURL: "https://api.groq.com/openai/v1",
dangerouslyAllowBrowser: true,
});

export async function callOpenAI(prompt) {
try {
const completion =
await client.chat.completions.create({
model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content:
          "You are a certified IELTS examiner. Return ONLY valid JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.3,
  });

const text =
  completion.choices[0].message.content;

console.log(
  "GROQ RESPONSE:"
);
console.log(text);

const cleaned =
  text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const parsed =
  JSON.parse(cleaned);

return {
  success: true,
  confidence: 90,
  estimatedRange:
    `${Math.max(
      1,
      parsed.overallBand - 0.5
    )} - ${
      parsed.overallBand + 0.5
    }`,
  benchmark:
    `Performance resembles Band ${parsed.overallBand}.`,
  ...parsed,
};

} catch (error) {
console.error(
"GROQ ERROR:",
error
);

alert(
  error?.message ||
    "Groq evaluation failed"
);

return {
  success: false,
  overallBand: 0,
  confidence: 0,
  estimatedRange:
    "Unavailable",
  benchmark:
    "Evaluation failed",
  taskResponse: 0,
  coherenceCohesion: 0,
  lexicalResource: 0,
  grammarRangeAccuracy: 0,
  strengths: [
    "Evaluation failed",
  ],
  weaknesses: [
    error?.message ||
      "Unknown error",
  ],
  recommendations: [
    "Check console logs",
  ],
  improvedEssay: "",
};

}
}
