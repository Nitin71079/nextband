import { useEffect, useRef } from "react";

import { useAIContext } from "../../context/AIContext";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const {
    messages,
    loading,
  } = useAIContext();

  const bottomRef = useRef(null);

  /**
   * Auto-scroll whenever new messages arrive
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /**
   * Empty State
   */
  if (messages.length === 0) {
    return (
      <div
        className="
          flex-1
          rounded-2xl
          border
          border-slate-800
          bg-slate-900
          flex
          items-center
          justify-center
          min-h-[600px]
        "
      >
        <div className="text-center">

          <div className="text-6xl mb-6">
            🤖
          </div>

          <h2 className="text-3xl font-bold">

            Welcome to Knarrow AI

          </h2>

          <p className="mt-4 text-slate-400 max-w-lg">

            Ask anything about IELTS.

            Writing.

            Speaking.

            Reading.

            Listening.

            Grammar.

            Vocabulary.

            Study Plans.

          </p>

        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex-1
        min-h-[600px]
        max-h-[75vh]
        overflow-y-auto
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
      "
    >
      <div className="space-y-6">

        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
          />
        ))}

        {loading && (
          <TypingIndicator />
        )}

        <div ref={bottomRef} />

      </div>
    </div>
  );
}