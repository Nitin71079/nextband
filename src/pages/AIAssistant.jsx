import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { trackEvent } from "../utils/analytics";

export default function AIAssistant() {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [chat, setChat] =
    useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  async function sendMessage() {
    if (
      !message.trim() ||
      loading
    )
      return;

    const currentMessage =
      message.trim();

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
      trackEvent(
        "ai_message_sent"
      );

      const response =
        await fetch(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  currentMessage,
              }),
          }
        );

      const data =
        await response.json();

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
      console.error(error);

      toast.error(
        error.message ||
          "AI request failed."
      );

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "❌ Unable to contact AI. Check API configuration.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container fade-in">
      <div
        style={{
          marginBottom: "40px",
        }}
      >
        <span className="badge">
          AI IELTS Assistant
        </span>

        <h1
          className="section-title"
          style={{
            marginTop: "20px",
          }}
        >
          Ask Anything 🤖
        </h1>

        <p className="section-subtitle">
          Get AI-powered IELTS
          guidance, corrections,
          explanations and study
          support.
        </p>
      </div>

      <div
        className="card"
        style={{
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection:
              "column",
            gap: "20px",
            overflowY: "auto",
            marginBottom:
              "25px",
          }}
        >
          {chat.length === 0 ? (
            <div
              style={{
                textAlign:
                  "center",
                color:
                  "#64748b",
                marginTop:
                  "80px",
              }}
            >
              Start chatting
              with the AI IELTS
              Assistant.
            </div>
          ) : (
            chat.map(
              (
                msg,
                index
              ) => (
                <div
                  key={index}
                  style={{
                    alignSelf:
                      msg.role ===
                      "user"
                        ? "flex-end"
                        : "flex-start",

                    background:
                      msg.role ===
                      "user"
                        ? "#22d3ee"
                        : "#f1f5f9",

                    color:
                      msg.role ===
                      "user"
                        ? "#fff"
                        : "#0f172a",

                    padding:
                      "16px 20px",

                    borderRadius:
                      "18px",

                    maxWidth:
                      "80%",

                    lineHeight:
                      "1.8",

                    whiteSpace:
                      "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              )
            )
          )}

          {loading && (
            <div
              style={{
                color:
                  "#64748b",
              }}
            >
              AI is typing...
            </div>
          )}

          <div
            ref={chatEndRef}
          />
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
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key ===
                  "Enter" &&
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
            className="primary-btn"
            disabled={loading}
            onClick={
              sendMessage
            }
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