import {
  useState
} from "react";

import OpenAI from "openai";

const openai =
  new OpenAI({
    apiKey:
      import.meta.env
        .VITE_OPENAI_API_KEY,

    dangerouslyAllowBrowser:
      true
  });

export default function AIChatbot() {
  const [open,
    setOpen] =
    useState(false);

  const [input,
    setInput] =
    useState("");

  const [messages,
    setMessages] =
    useState([
      {
        role:
          "assistant",

        content:
          "Hi! I'm your AI IELTS Coach. Ask me anything about IELTS preparation."
      }
    ]);

  const [loading,
    setLoading] =
    useState(false);

  async function handleSend() {
    if (!input.trim())
      return;

    const updatedMessages =
      [
        ...messages,

        {
          role: "user",

          content: input
        }
      ];

    setMessages(
      updatedMessages
    );

    setInput("");

    setLoading(true);

    try {
      const response =
        await openai.chat.completions.create(
          {
            model:
              "gpt-4.1-mini",

            messages: [
              {
                role:
                  "system",

                content:
                  "You are an expert IELTS coach helping students improve Reading, Listening, Writing, and Speaking band scores."
              },

              ...updatedMessages.map(
                (msg) => ({
                  role:
                    msg.role,

                  content:
                    msg.content
                })
              )
            ],

            temperature:
              0.7
          }
        );

      const aiReply =
        response
          .choices[0]
          .message.content;

      setMessages([
        ...updatedMessages,

        {
          role:
            "assistant",

          content:
            aiReply
        }
      ]);
    } catch (error) {
      console.error(
        error
      );

      setMessages([
        ...updatedMessages,

        {
          role:
            "assistant",

          content:
            "AI response failed."
        }
      ]);
    }

    setLoading(false);
  }

  return (
    <>
      {/* FLOATING BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        style={{
          position:
            "fixed",

          bottom: "30px",

          right: "30px",

          width: "70px",

          height: "70px",

          borderRadius:
            "50%",

          border:
            "none",

          background:
            "#22d3ee",

          color: "white",

          fontSize:
            "30px",

          cursor:
            "pointer",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",

          zIndex: 9999
        }}
      >
        🤖
      </button>

      {/* CHAT WINDOW */}

      {open && (
        <div
          style={{
            position:
              "fixed",

            bottom:
              "120px",

            right:
              "30px",

            width:
              "380px",

            maxHeight:
              "650px",

            background:
              "white",

            borderRadius:
              "24px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.2)",

            display:
              "flex",

            flexDirection:
              "column",

            overflow:
              "hidden",

            zIndex: 9999
          }}
        >
          <div
            style={{
              background:
                "#0f172a",

              color:
                "white",

              padding:
                "20px",

              fontWeight:
                "bold",

              fontSize:
                "20px"
            }}
          >
            AI IELTS Coach
          </div>

          <div
            style={{
              flex: 1,

              overflowY:
                "auto",

              padding:
                "20px",

              display:
                "flex",

              flexDirection:
                "column",

              gap: "16px",

              background:
                "#f8fafc"
            }}
          >
            {messages.map(
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
                        : "white",

                    color:
                      msg.role ===
                      "user"
                        ? "white"
                        : "#0f172a",

                    padding:
                      "14px 18px",

                    borderRadius:
                      "18px",

                    maxWidth:
                      "85%",

                    lineHeight:
                      "1.7",

                    whiteSpace:
                      "pre-wrap",

                    boxShadow:
                      "0 4px 12px rgba(0,0,0,0.05)"
                  }}
                >
                  {msg.content}
                </div>
              )
            )}

            {loading && (
              <div
                style={{
                  background:
                    "white",

                  padding:
                    "14px 18px",

                  borderRadius:
                    "18px",

                  width:
                    "fit-content"
                }}
              >
                Thinking...
              </div>
            )}
          </div>

          <div
            style={{
              display:
                "flex",

              padding:
                "16px",

              borderTop:
                "1px solid #e2e8f0",

              gap: "10px"
            }}
          >
            <input
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              placeholder="Ask IELTS doubts..."
              style={{
                flex: 1,

                padding:
                  "14px",

                borderRadius:
                  "14px",

                border:
                  "1px solid #cbd5e1",

                outline:
                  "none"
              }}
            />

            <button
              onClick={
                handleSend
              }
              style={{
                background:
                  "#22d3ee",

                border:
                  "none",

                color:
                  "white",

                padding:
                  "14px 18px",

                borderRadius:
                  "14px",

                cursor:
                  "pointer",

                fontWeight:
                  "bold"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}