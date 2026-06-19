import { useState } from "react";

export default function AIChatCoach() {
  const [messages, setMessages] =
    useState([]);

  const [input, setInput] =
    useState("");

  function sendMessage() {
    if (!input.trim())
      return;

    setMessages([
      ...messages,
      {
        role: "user",
        content: input,
      },
      {
        role: "assistant",
        content:
          "AI Coach response placeholder.",
      },
    ]);

    setInput("");
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "30px",
      }}
    >
      <h2>
        AI Coach Chat
      </h2>

      <div
        style={{
          minHeight:
            "250px",
          border:
            "1px solid #e2e8f0",
          padding:
            "15px",
          borderRadius:
            "12px",
          marginBottom:
            "15px",
        }}
      >
        {messages.map(
          (
            msg,
            index
          ) => (
            <p
              key={index}
            >
              <strong>
                {
                  msg.role
                }
                :
              </strong>{" "}
              {
                msg.content
              }
            </p>
          )
        )}
      </div>

      <input
        value={input}
        onChange={(e) =>
          setInput(
            e.target.value
          )
        }
        placeholder="Ask the AI Coach..."
        style={{
          width: "100%",
          padding:
            "12px",
          marginBottom:
            "10px",
        }}
      />

      <button
        className="primary-btn"
        onClick={
          sendMessage
        }
      >
        Send
      </button>
    </div>
  );
}