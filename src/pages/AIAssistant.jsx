import { useState } from "react";
import ReactMarkdown from "react-markdown";

import PremiumGate from "../components/PremiumGate";

import { askGroq } from "../services/aiService";
import { PROMPTS } from "../agents/prompts";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your NextBand AI Coach. Ask me anything about Reading, Listening, Writing, Speaking, vocabulary, grammar, study plans, or IELTS band improvement.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

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

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentInput,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const aiReply = await askGroq(
        currentInput,
        PROMPTS.default
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Unable to contact AI Coach. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
        <h1>NextBand AI Coach</h1>

        <p
          style={{
            marginBottom: "25px",
          }}
        >
          Ask anything about IELTS Reading,
          Listening, Writing, Speaking,
          Vocabulary, Grammar or Study Plans.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              style={{
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                cursor: "pointer",
                background: "#fff",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            height: "600px",
            overflowY: "auto",
            marginBottom: "20px",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                marginBottom: "24px",
              }}
            >
              <strong>
                {message.role === "assistant"
                  ? "🤖 AI Coach"
                  : "👤 You"}
              </strong>

              <div
                style={{
                  marginTop: "8px",
                }}
              >
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <p>
              🤖 AI Coach is thinking...
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
            placeholder="Ask an IELTS question..."
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />

          <button
            className="primary-btn"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading
              ? "Thinking..."
              : "Send"}
          </button>
        </div>
      </div>
    </PremiumGate>
  );
}