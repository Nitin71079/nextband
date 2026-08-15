import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const GROQ_MODELS = [
  "llama-3.3-70b-specdec",
  "llama-3.1-70b-versatile",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
  "gemma2-9b-it",
];

const DEFAULT_MODEL = GROQ_MODELS[0];

class AIService {
  constructor() {
    this.model = DEFAULT_MODEL;
    this.temperature = 0.3;
    this.maxRetries = 2;
  }

  setModel(model) {
    this.model = model;
  }

  async chat({
    systemPrompt = "",
    messages = [],
    temperature = this.temperature,
    json = false,
  }) {
    const modelsToTry = [this.model, ...GROQ_MODELS.filter((m) => m !== this.model)];
    let lastError = null;

    for (const modelCandidate of modelsToTry) {
      let retries = 0;
      while (retries <= this.maxRetries) {
        try {
          const completion = await groq.chat.completions.create({
            model: modelCandidate,
            temperature,
            response_format: json ? { type: "json_object" } : undefined,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              ...messages,
            ],
          });

          return completion.choices[0].message.content;
        } catch (err) {
          lastError = err;
          console.warn(`Groq model ${modelCandidate} failed (attempt ${retries + 1}):`, err.message);

          if (
            err.status === 400 ||
            err.status === 404 ||
            err.message?.includes("decommissioned") ||
            err.message?.includes("not found")
          ) {
            break;
          }

          retries++;
          if (retries <= this.maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      }
    }

    throw lastError || new Error("All Groq AI models failed. Please try again later.");
  }

  async stream({
    systemPrompt = "",
    messages = [],
    temperature = this.temperature,
    onToken,
  }) {
    const modelsToTry = [this.model, ...GROQ_MODELS.filter((m) => m !== this.model)];
    let lastError = null;

    for (const modelCandidate of modelsToTry) {
      try {
        const stream = await groq.chat.completions.create({
          model: modelCandidate,
          stream: true,
          temperature,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            ...messages,
          ],
        });

        let finalText = "";
        for await (const chunk of stream) {
          const token = chunk.choices?.[0]?.delta?.content || "";
          finalText += token;
          if (onToken) {
            onToken(token, finalText);
          }
        }
        return finalText;
      } catch (err) {
        lastError = err;
        console.warn(`Groq stream failed with ${modelCandidate}:`, err.message);
        if (
          err.status === 400 ||
          err.status === 404 ||
          err.message?.includes("decommissioned") ||
          err.message?.includes("not found")
        ) {
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error("Groq streaming unavailable.");
  }

  async json({ systemPrompt, messages }) {
    const result = await this.chat({
      systemPrompt,
      messages,
      json: true,
    });

    try {
      return JSON.parse(result);
    } catch {
      throw new Error("AI returned invalid JSON.");
    }
  }
}

const aiService = new AIService();

export async function askGroq(prompt) {
  return aiService.chat({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
}

export async function askGroqJSON(systemPrompt, prompt) {
  return aiService.json({
    systemPrompt,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
}

export default aiService;