import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const DEFAULT_MODEL = "llama-3.3-70b-versatile";

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
    let retries = 0;

    while (retries <= this.maxRetries) {
      try {
        const completion = await groq.chat.completions.create({
          model: this.model,
          temperature,
          response_format: json
            ? { type: "json_object" }
            : undefined,
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
        retries++;

        if (retries > this.maxRetries) {
          throw err;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * retries)
        );
      }
    }
  }

  async stream({
    systemPrompt = "",
    messages = [],
    temperature = this.temperature,
    onToken,
  }) {
    const stream = await groq.chat.completions.create({
      model: this.model,
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
  }

  async json({
    systemPrompt,
    messages,
  }) {
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

/**
 * Backward compatibility
 * Older pages still use:
 * import { askGroq } from "../services/aiService";
 */
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

/**
 * Optional JSON helper
 */
export async function askGroqJSON(
  systemPrompt,
  prompt
) {
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