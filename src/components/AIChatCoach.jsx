import { useState } from "react";

import {
askAICoach,
} from "../services/aiCoachService";

export default function AIChatCoach() {
const [messages, setMessages] =
useState([]);

const [input, setInput] =
useState("");

const [loading, setLoading] =
useState(false);

async function sendMessage() {
if (!input.trim())
return;

const userMessage = {
  role: "user",
  content: input,
};

setMessages((prev) => [
  ...prev,
  userMessage,
]);

setLoading(true);

try {
  const reply =
    await askAICoach(
      input
    );

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content: reply,
    },
  ]);
} catch (error) {
  console.error(error);

  setMessages((prev) => [
    ...prev,
    {
      role: "assistant",
      content:
        "Sorry, I couldn't respond right now.",
    },
  ]);
}

setInput("");

setLoading(false);

}

return (
<div
style={{
background: "#fff",
padding: "30px",
borderRadius: "20px",
marginTop: "30px",
}}
> <h2>
AI Coach Chat </h2>

  <div
    style={{
      minHeight:
        "250px",
      maxHeight:
        "400px",
      overflowY:
        "auto",
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
            {msg.role ===
            "user"
              ? "You"
              : "AI Coach"}
            :
          </strong>{" "}
          {msg.content}
        </p>
      )
    )}

    {loading && (
      <p>
        AI Coach is typing...
      </p>
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
    disabled={loading}
  >
    Send
  </button>
</div>

);
}
