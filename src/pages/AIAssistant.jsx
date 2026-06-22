import ReactMarkdown from "react-markdown";
import PremiumGate
from "../components/PremiumGate";
import { useState } from "react";
console.log(
  "Groq Key:",
  import.meta.env
    .VITE_GROQ_API_KEY
);
export default function AIAssistant() {
  const [messages, setMessages] =
    useState([
      {
        role: "assistant",
        content:
          "Hello! I'm your IELTS AI Coach. Ask me anything about Reading, Listening, Writing, Speaking, study plans, vocabulary, or band improvement.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const quickPrompts = [
    "How do I reach Band 7?",
    "Improve my Writing score",
    "Improve my Speaking score",
    "Best Reading strategies",
    "Best Listening strategies",
    "Create a 30-day study plan",
  ];

  async function sendMessage() {
  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  const currentInput =
    input;

  setInput("");
  setLoading(true);

  try {
    const response =
      await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${
                import.meta.env
                  .VITE_GROQ_API_KEY
              }`,
          },

          body: JSON.stringify({
            model:
              "llama-3.3-70b-versatile",
messages: [
  {
    role: "system",
    content: `
You are NextBand AI Coach.

You are an expert IELTS mentor.

Rules:
- Use clean formatting.
- Use bullet points.
- Use headings.
- Keep responses concise.
- Never exceed 200 words unless asked.
- Give practical IELTS advice.
- For study plans, create tables or day-by-day lists.
- For score improvement, focus on actionable steps.
- Use emojis sparingly.
- Sound like a professional tutor.
`,
  },

  {
    role: "user",
    content: `
Question:
${currentInput}

Format your answer professionally.
`,
  },
],

            temperature: 0.5,
          }),
        }
      );

    const data =
      await response.json();

    console.log(
      "GROQ RESPONSE:",
      data
    );

    if (!response.ok) {
      throw new Error(
        JSON.stringify(data)
      );
    }

    const aiReply =
      data.choices[0]
        .message.content;

    setMessages((prev) => [
      ...prev,
      {
        role:
          "assistant",
        content:
          aiReply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role:
          "assistant",
        content:
          "Unable to contact AI Coach.",
      },
    ]);
  }

  setLoading(false);
}

  return (
        <PremiumGate>

    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        IELTS AI Coach
      </h1>

      <p>
        Ask anything about IELTS
        Reading, Listening,
        Writing, Speaking,
        vocabulary, band scores,
        or study plans.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {quickPrompts.map(
          (prompt) => (
            <button
              key={prompt}
              onClick={() =>
                setInput(
                  prompt
                )
              }
              style={{
                padding:
                  "10px 15px",
                borderRadius:
                  "12px",
                border:
                  "1px solid #cbd5e1",
                cursor:
                  "pointer",
              }}
            >
              {prompt}
            </button>
          )
        )}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          height: "600px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {messages.map(
          (
            message,
            index
          ) => (
            <div
              key={index}
              style={{
                marginBottom:
                  "20px",
              }}
            >
              <strong>
                {message.role ===
                "assistant"
                  ? "AI Coach"
                  : "You"}
              </strong>

          <ReactMarkdown>
  {message.content}
</ReactMarkdown>
            </div>
          )
        )}

        {loading && (
          <p>
            AI Coach is
            thinking...
          </p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          value={input}
          onChange={(e) =>
            setInput(
              e.target.value
            )
          }
          placeholder="Ask an IELTS question..."
          style={{
            flex: 1,
            padding: "15px",
            borderRadius:
              "12px",
          }}
          onKeyDown={(e) => {
            if (
              e.key ===
              "Enter"
            ) {
              sendMessage();
            }
          }}
        />

        <button
          className="primary-btn"
          onClick={
            sendMessage
          }
          disabled={loading}
        >
          Send
        </button>
        
      </div>
      
    </div>
    </PremiumGate>

  );
}