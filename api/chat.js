import { useState } from "react";
import toast from "react-hot-toast";
import { trackEvent } from "../utils/analytics";

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);

  async function sendMessage() {
    if (!message.trim()) return;

    const currentMessage = message;

    setChat((prev) => [
      ...prev,
      {
        role: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      trackEvent("ai_message_sent");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      console.log("Status:", response.status);

      // Read raw response first
      const rawText = await response.text();

      console.log("Raw Response:", rawText);

      let data = {};

      try {
        data = rawText
          ? JSON.parse(rawText)
          : {};
      } catch (parseError) {
        console.error(
          "JSON Parse Error:",
          parseError
        );

        throw new Error(
          `Invalid response from server: ${rawText}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Request failed (${response.status})`
        );
      }

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            data.reply ||
            "No response received.",
        },
      ]);
    } catch (error) {
      console.error(
        "AI Assistant Error:",
        error
      );

      toast.error(
        error.message ||
          "AI request failed."
      );

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Error: " +
            (error.message ||
              "Unable to contact AI."),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container fade-in">
      <div style={{ marginBottom: "40px" }}>
        <span className="badge">
          AI IELTS Assistant
        </span>

        <h1
          className="section-title"
          style={{ marginTop: "20px" }}
        >
          Ask Anything 🤖
        </h1>

        <p className="section-subtitle">
          Get AI-powered IELTS guidance,
          corrections, explanations,
          and study support.
        </p>
      </div>

      <div
        className="card"
        style={{
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {chat.length === 0 ? (
            <div
              style={{
                color: "#64748b",
                textAlign: "center",
                marginTop: "80px",
              }}
            >
              Start chatting with the AI
              IELTS Assistant.
            </div>
          ) : (
            chat.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    msg.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    msg.role === "user"
                      ? "#22d3ee"
                      : "#f1f5f9",
                  color:
                    msg.role === "user"
                      ? "white"
                      : "#0f172a",
                  padding: "16px 20px",
                  borderRadius: "18px",
                  maxWidth: "75%",
                  lineHeight: "1.8",
                }}
              >
                {msg.text}
              </div>
            ))
          )}

          {loading && (
            <div
              style={{
                color: "#64748b",
              }}
            >
              AI is typing...
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
          }}
        >
          <input
            type="text"
            className="input"
            placeholder="Ask an IELTS question..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !loading
              ) {
                sendMessage();
              }
            }}
            style={{
              flex: 1,
              marginTop: 0,
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="primary-btn"
          >
            {loading
              ? "Sending..."
              : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}