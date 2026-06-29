import { useState } from "react";
import { useAIContext } from "../context/AIContext";

import AIOrb from "../components/ai/AIOrb";
import ChatWindow from "../components/ai/ChatWindow";
import PromptSuggestions from "../components/ai/PromptSuggestions";
import InputBar from "../components/ai/InputBar";

export default function Workspace() {
  const {
    sendMessage,
    loading,
    currentIntent,
  } = useAIContext();

  const [input, setInput] = useState("");

  async function handleSend(text = input) {
    if (!text.trim()) return;

    await sendMessage({
      message: text,
    });

    setInput("");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <header className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              NextBand AI
            </h1>

            <p className="text-slate-400 mt-1">

              Your intelligent IELTS mentor

            </p>

          </div>

          <div className="text-sm text-slate-400">

            {currentIntent
              ? `Current Agent: ${currentIntent}`
              : "Waiting..."}

          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto">

        <div className="grid grid-cols-12 gap-8 p-8">

          {/* Left Panel */}

          <div className="col-span-3">

            <AIOrb />

            <div className="mt-8">

              <PromptSuggestions
                onSelect={handleSend}
              />

            </div>

          </div>

          {/* Chat */}

          <div className="col-span-9 flex flex-col">

            <ChatWindow />

            <div className="mt-6">

              <InputBar
                value={input}
                loading={loading}
                onChange={setInput}
                onSend={handleSend}
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}