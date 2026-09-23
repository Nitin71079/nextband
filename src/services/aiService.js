import Groq from "groq-sdk";

const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";

const groq = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

const DEFAULT_MODELS = [
  "groq/compound-mini",
  "groq/compound"
];

class AIService {
  constructor() {
    this.models = DEFAULT_MODELS;
    this.model = DEFAULT_MODELS[0];
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
    const candidateModels = [this.model, ...this.models.filter(m => m !== this.model)];
    let lastError = null;

    const formattedMessages = [];
    if (systemPrompt) {
      formattedMessages.push({ role: "system", content: systemPrompt });
    }

    for (const msg of messages) {
      if (msg && msg.role && msg.content) {
        if (msg.role === "system" && !systemPrompt) {
          formattedMessages.unshift({ role: "system", content: String(msg.content) });
        } else if (msg.role !== "system") {
          formattedMessages.push({
            role: msg.role,
            content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
          });
        }
      }
    }

    // Attempt using Groq SDK
    for (const currentModel of candidateModels) {
      try {
        const completion = await groq.chat.completions.create({
          model: currentModel,
          temperature,
          response_format: json ? { type: "json_object" } : undefined,
          messages: formattedMessages,
        });

        const rawContent = completion.choices[0]?.message?.content || "";
        return rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      } catch (err) {
        console.warn(`AIService.chat SDK failed on model ${currentModel}:`, err);
        lastError = err;
      }
    }

    // Direct HTTP Fetch Fallback
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "groq/compound-mini",
          temperature,
          response_format: json ? { type: "json_object" } : undefined,
          messages: formattedMessages
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices[0]?.message?.content || "";
        return rawContent.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      }
    } catch (fetchErr) {
      console.error("AIService direct fetch fallback failed:", fetchErr);
    }

    throw lastError || new Error("Failed to generate AI response.");
  }

  async stream({
    systemPrompt = "",
    messages = [],
    temperature = this.temperature,
    onToken,
  }) {
    const candidateModels = [this.model, ...this.models.filter(m => m !== this.model)];
    let lastError = null;

    const formattedMessages = [];
    if (systemPrompt) {
      formattedMessages.push({ role: "system", content: systemPrompt });
    }
    for (const msg of messages) {
      if (msg && msg.role && msg.content) {
        if (msg.role === "system" && !systemPrompt) {
          formattedMessages.unshift({ role: "system", content: String(msg.content) });
        } else if (msg.role !== "system") {
          formattedMessages.push({
            role: msg.role,
            content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content)
          });
        }
      }
    }

    for (const currentModel of candidateModels) {
      try {
        const stream = await groq.chat.completions.create({
          model: currentModel,
          stream: true,
          temperature,
          messages: formattedMessages,
        });

        let finalText = "";
        let isInsideReasoning = false;

        for await (const chunk of stream) {
          const token = chunk.choices?.[0]?.delta?.content || "";
          
          if (token.includes("<think>")) {
            isInsideReasoning = true;
          }
          if (token.includes("</think>")) {
            isInsideReasoning = false;
            continue;
          }

          if (!isInsideReasoning) {
            finalText += token;
            if (onToken) {
              onToken(token, finalText);
            }
          }
        }

        return finalText;
      } catch (err) {
        console.warn(`AIService.stream failed on model ${currentModel}:`, err);
        lastError = err;
      }
    }

    throw lastError || new Error("Failed to stream AI response.");
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

export async function askGroq(prompt, systemPrompt = "") {
  if (Array.isArray(prompt)) {
    return aiService.chat({
      systemPrompt,
      messages: prompt,
    });
  }

  if (typeof prompt === "object" && prompt !== null) {
    return aiService.chat(prompt);
  }

  return aiService.chat({
    systemPrompt,
    messages: [
      {
        role: "user",
        content: String(prompt),
      },
    ],
  });
}

export async function askGroqJSON(
  systemPrompt,
  prompt
) {
  const messages = Array.isArray(prompt)
    ? prompt
    : [{ role: "user", content: String(prompt) }];

  return aiService.json({
    systemPrompt,
    messages,
  });
}

export default aiService;