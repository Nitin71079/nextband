import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, BrainCircuit, Gamepad2, Award, CalendarDays, ArrowRight,
  X, ChevronUp, Bot, Send, User, Maximize2, RefreshCcw
} from "lucide-react";
import { askGroq } from "../services/aiService";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { getExamAiConfig } from "../config/examAiConfig";

const PROMOTIONS = [
  {
    id: "ai-eval",
    badge: "AI SCORING",
    title: "⚡ Groq AI Scoring",
    description: "Real-time rubric scoring for Essays & Speaking.",
    buttonText: "Try AI",
    path: "/insights",
    gradient: "linear-gradient(135deg, #7c3aed, #2563eb)",
    glowColor: "rgba(124, 58, 237, 0.35)",
    icon: BrainCircuit,
  },
  {
    id: "arcade",
    badge: "LIVE COMPETITION",
    title: "⚔️ Arcade Duels",
    description: "Battle peers live in Vocab & Speaking duels!",
    buttonText: "Play Arcade",
    path: "/games",
    gradient: "linear-gradient(135deg, #d97706, #059669)",
    glowColor: "rgba(217, 119, 6, 0.35)",
    icon: Gamepad2,
  },
  {
    id: "100-mocks",
    badge: "100 MOCKS",
    title: "🎯 100 Adaptive Mocks",
    description: "Complete test suites for TOEFL, GRE, PTE & DET.",
    buttonText: "Full Pass",
    path: "/pricing",
    gradient: "linear-gradient(135deg, #0284c7, #7c3aed)",
    glowColor: "rgba(2, 132, 199, 0.35)",
    icon: Award,
  },
  {
    id: "planner",
    badge: "SCORE BOOSTER",
    title: "📅 AI Study Planner",
    description: "Targeted daily drills & adaptive focus areas.",
    buttonText: "View Plan",
    path: "/planner",
    gradient: "linear-gradient(135deg, #db2777, #9333ea)",
    glowColor: "rgba(219, 39, 119, 0.35)",
    icon: CalendarDays,
  },
];

const AI_QUICK_CHIPS = [
  "Reach Band 7+",
  "Essay Tips",
  "Speaking Fluency",
  "30-Day Plan"
];

function formatAiMessage(content) {
  if (typeof content !== "string") return content;
  const lines = content.split("\n");
  return lines.map((line, lIdx) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    const formattedParts = parts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="font-semibold text-amber-300">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });

    if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
      return (
        <div key={lIdx} className="flex items-start gap-1.5 my-0.5 pl-1">
          <span className="text-rose-400 font-bold text-xs mt-0.5">•</span>
          <span className="flex-1">{formattedParts}</span>
        </div>
      );
    }

    return (
      <React.Fragment key={lIdx}>
        {formattedParts}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function PromotionalDangler() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, user } = useAuth();
  const { activeTrack } = useExam();

  const currentTrack = activeTrack || localStorage.getItem("knarrow_active_track") || "IELTS";
  const aiConfig = getExamAiConfig(currentTrack);
  const userName = name || user?.email?.split("@")[0] || "Student";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  // Floating AI Assistant drawer state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      content: aiConfig.welcomeMessage(userName)
    }
  ]);

  const aiChatEndRef = useRef(null);

  // Update welcome message when track changes
  useEffect(() => {
    setAiMessages([
      {
        role: "assistant",
        content: aiConfig.welcomeMessage(userName)
      }
    ]);
  }, [currentTrack, userName]);

  useEffect(() => {
    if (isAiOpen && aiChatEndRef.current) {
      aiChatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiMessages, aiLoading, isAiOpen]);

  // Auto-cycle through promotions every 8 seconds
  useEffect(() => {
    if (isMinimized || isClosed || isAiOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROMOTIONS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isMinimized, isClosed, isAiOpen]);

  // Do not render during active full test taking engines to avoid distraction
  const isTestEngineRoute =
    location.pathname.includes("/test/") ||
    location.pathname.includes("/mock/") ||
    location.pathname.includes("/exam/");

  if (isTestEngineRoute || isClosed) return null;

  const current = PROMOTIONS[currentIndex];
  const IconComp = current.icon;

  const handleSendAiMessage = async (textToSend) => {
    const promptText = (textToSend || aiInput).trim();
    if (!promptText || aiLoading) return;

    setAiInput("");
    setAiMessages((prev) => [...prev, { role: "user", content: promptText }]);
    setAiLoading(true);

    try {
      const response = await askGroq([
        {
          role: "system",
          content: aiConfig.systemPrompt
        },
        ...aiMessages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: promptText }
      ]);

      setAiMessages((prev) => [...prev, { role: "assistant", content: response || "I'm here to help! Could you ask again with specific details?" }]);
    } catch (err) {
      setAiMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I had a momentary connection glitch. Please try again!" }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      
      {/* FLOATING AI ASSISTANT CHAT MODAL OVERLAY */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "linear-gradient(135deg, rgba(28, 16, 38, 0.94) 0%, rgba(15, 9, 22, 0.97) 100%)",
              border: "1px solid rgba(244, 63, 94, 0.35)",
              boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(244, 63, 94, 0.25)",
              backdropFilter: "blur(24px)",
            }}
            className="w-[320px] sm:w-[350px] h-[460px] rounded-2xl flex flex-col overflow-hidden text-slate-100 mb-2 relative"
          >
            {/* Top Gloss Reflection Line */}
            <div
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)",
                height: 1,
                width: "100%",
              }}
            />

            {/* CHAT HEADER */}
            <div
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.02) 100%)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              }}
              className="px-4 py-3 flex items-center justify-between backdrop-blur-md"
            >
              <div className="flex items-center gap-2.5">
                <div
                  style={{
                    background: "linear-gradient(135deg, rgba(244, 63, 94, 0.3), rgba(245, 158, 11, 0.3))",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 0 12px rgba(244, 63, 94, 0.4)",
                  }}
                  className="w-7 h-7 rounded-xl text-rose-200 flex items-center justify-center"
                >
                  <Bot size={15} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-wide text-white drop-shadow-sm">{aiConfig.name} AI Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setAiMessages([
                      {
                        role: "assistant",
                        content: aiConfig.welcomeMessage(userName),
                      },
                    ])
                  }
                  title="Clear Chat"
                  className="p-1 text-slate-400 hover:text-rose-200 rounded-lg transition"
                >
                  <RefreshCcw size={13} />
                </button>
                <button
                  onClick={() => {
                    setIsAiOpen(false);
                    navigate("/ai-assistant");
                  }}
                  title="Open Full Page"
                  className="p-1 text-slate-400 hover:text-rose-200 rounded-lg transition"
                >
                  <Maximize2 size={13} />
                </button>
                <button
                  onClick={() => setIsAiOpen(false)}
                  title="Close"
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* CHAT MESSAGES BODY */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs scrollbar-thin scrollbar-thumb-rose-500/20">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    style={{
                      background: msg.role === "user"
                        ? "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)"
                        : "linear-gradient(135deg, rgba(38, 23, 52, 0.85) 0%, rgba(24, 15, 34, 0.85) 100%)",
                      border: msg.role === "user"
                        ? "1px solid rgba(255, 255, 255, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: msg.role === "user"
                        ? "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 16px rgba(244, 63, 94, 0.35)"
                        : "inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.5)",
                    }}
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${
                      msg.role === "user"
                        ? "text-slate-950 font-bold rounded-tr-xs"
                        : "text-rose-50 rounded-tl-xs"
                    }`}
                  >
                    {msg.role === "assistant" ? formatAiMessage(msg.content) : msg.content}
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="flex justify-start">
                  <div
                    style={{
                      background: "linear-gradient(135deg, rgba(38, 23, 52, 0.85) 0%, rgba(24, 15, 34, 0.85) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                    className="text-amber-300 px-3 py-2 rounded-2xl rounded-tl-xs text-[11px] flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={aiChatEndRef} />
            </div>

            {/* QUICK PROMPT CHIPS */}
            <div
              style={{
                background: "rgba(15, 9, 22, 0.95)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              className="px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none"
            >
              {aiConfig.chips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendAiMessage(chip)}
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                  className="px-2.5 py-1 rounded-full text-[10px] text-rose-200 font-medium hover:text-white whitespace-nowrap transition hover:scale-105 active:scale-95"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* CHAT INPUT FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAiMessage();
              }}
              style={{
                background: "rgba(12, 7, 18, 0.98)",
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              }}
              className="p-2.5 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={aiConfig.placeholder}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                style={{
                  background: "linear-gradient(180deg, rgba(30, 18, 42, 0.9) 0%, rgba(20, 12, 28, 0.9) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
                className="flex-1 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-300/40 outline-none transition focus:border-rose-400/70"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!aiInput.trim() || aiLoading}
                style={{
                  background: "linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(244, 63, 94, 0.4)",
                }}
                className="w-8 h-8 rounded-xl text-slate-950 font-bold flex items-center justify-center transition disabled:opacity-30 shrink-0"
              >
                <Send size={13} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP FLOATING BUTTON: AI ASSISTANT ICON SYMBOL (STACKED RIGHT ABOVE BOOSTER) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsAiOpen(!isAiOpen)}
        title="AI Assistant"
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: isAiOpen
            ? "linear-gradient(135deg, #f43f5e 0%, #f59e0b 100%)"
            : "linear-gradient(135deg, rgba(244, 63, 94, 0.95), rgba(245, 158, 11, 0.95))",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 8px 22px rgba(244, 63, 94, 0.45), 0 0 15px rgba(245, 158, 11, 0.35)",
          backdropFilter: "blur(16px)",
          position: "relative",
        }}
      >
        <Bot size={19} className="text-white" />
        <span
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#fde047",
            boxShadow: "0 0 8px #fde047",
            border: "1.5px solid #130d1a",
          }}
        />
      </motion.button>

      {/* BOTTOM FLOATING BUTTON: BOOSTER / PROMOTIONAL DANGLER */}
      {isMinimized ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          style={{
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 999,
            padding: "6px 14px",
            fontWeight: 800,
            fontSize: 11,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 8px 20px rgba(0,0,0,0.5), 0 0 15px rgba(56, 189, 248, 0.25)",
            backdropFilter: "blur(16px)",
          }}
        >
          <Sparkles size={13} className="text-amber-400" />
          <span>Booster</span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 6px #4ade80",
            }}
          />
        </motion.button>
      ) : (
        /* EXPANDED PROMOTIONAL DANGLER CARD */
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          style={{
            maxWidth: 270,
            width: "calc(100vw - 32px)",
          }}
        >
          <div
            className="glossy-card"
            style={{
              background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.96) 100%)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 18,
              padding: "12px 14px",
              boxShadow: `0 15px 30px rgba(0,0,0,0.6), 0 0 20px ${current.glowColor}`,
              backdropFilter: "blur(16px)",
              color: "#ffffff",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top Header & Controls */}
            <div style={{ display: "flex", justify: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#facc15",
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Sparkles size={9} color="#facc15" /> {current.badge}
              </span>

              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    color: "#94a3b8",
                    borderRadius: 6,
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={() => setIsClosed(true)}
                  title="Close"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    color: "#94a3b8",
                    borderRadius: 6,
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Content Body with Animated Transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: current.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      boxShadow: `0 4px 12px ${current.glowColor}`,
                      flexShrink: 0,
                    }}
                  >
                    <IconComp size={17} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 900, margin: "0 0 2px", color: "#ffffff" }}>
                      {current.title}
                    </h4>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0, lineHeight: 1.35 }}>
                      {current.description}
                    </p>
                  </div>
                </div>

                {/* Action Button & Dots */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  {/* Carousel Indicators */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {PROMOTIONS.map((p, idx) => (
                      <span
                        key={p.id}
                        onClick={() => setCurrentIndex(idx)}
                        style={{
                          width: currentIndex === idx ? 12 : 5,
                          height: 5,
                          borderRadius: 999,
                          background: currentIndex === idx ? "#38bdf8" : "rgba(255,255,255,0.2)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(current.path)}
                    style={{
                      background: current.gradient,
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: 8,
                      padding: "5px 11px",
                      fontSize: 11,
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      boxShadow: `0 3px 10px ${current.glowColor}`,
                    }}
                  >
                    {current.buttonText} <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

    </div>
  );
}
