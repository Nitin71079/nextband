// src/pages/SchoolChapterViewer.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SCHOOL_CHAPTERS } from "../data/schools/knarrowSchoolsData";
import { askSchoolAITutor } from "../services/evaluateSchoolAI";
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  Cpu, 
  Award, 
  Zap,
  Globe,
  ChevronRight,
  Layers,
  HelpCircle,
  Play
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function SchoolChapterViewer() {
  const { chapterId } = useParams();
  const chapter = SCHOOL_CHAPTERS.find((c) => c.chapterId === chapterId) || SCHOOL_CHAPTERS[4];

  const [explanationTier, setExplanationTier] = useState("standard"); // simple | standard | deep
  const [activeTab, setActiveTab] = useState("LESSON"); // LESSON | SIMULATION | EXAMPLES | PRACTICE | AI_TUTOR
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // AI Tutor state
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiLanguage, setAiLanguage] = useState("English");
  const [aiChat, setAiChat] = useState([
    {
      sender: "ai",
      text: `Hello! I am your Knarrow AI Study Coach for ${chapter.subject} (Grade ${chapter.grade}). Ask me anything about ${chapter.title}!`
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // Simulation State
  const [circuitVolts, setCircuitVolts] = useState(12);
  const [circuitResistance, setCircuitResistance] = useState(4);
  const [trigAngle, setTrigAngle] = useState(30);

  const handleAnswerSelect = (qId, val) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleAskAI = async (e) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim()) return;

    const userText = aiQuestion;
    setAiQuestion("");
    setAiChat((prev) => [...prev, { sender: "user", text: userText }]);
    setAiLoading(true);

    const response = await askSchoolAITutor({
      question: userText,
      chapterTitle: chapter.title,
      subject: chapter.subject,
      grade: chapter.grade,
      board: chapter.board,
      language: aiLanguage
    });

    setAiChat((prev) => [...prev, { sender: "ai", text: response }]);
    setAiLoading(false);
  };

  const handleQuickAiChip = (promptText) => {
    setAiQuestion(promptText);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950 pb-32">
      <SchoolHeaderNav />
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 mb-6">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Learning Path</span>
        </Link>
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 bg-slate-900 border border-white/10 rounded-md text-cyan-400 font-bold">
            {chapter.board} • Grade {chapter.grade}
          </span>
          <span className="px-2.5 py-1 bg-slate-900 border border-white/10 rounded-md text-emerald-400 font-bold">
            {chapter.domain || chapter.subject}
          </span>
        </div>
      </div>

      {/* CINEMATIC HERO LESSON HEADER */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900/90 via-[#0a0f24]/90 to-slate-950/90 border border-white/15 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl space-y-4 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
          <span>Chapter {chapter.chapterNumber}</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          {chapter.title}
        </h1>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl">
          {chapter.overview}
        </p>

        {/* MULTI-TIER EXPLANATION LEVEL TOGGLE */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-400">Explanation Depth:</div>
          <div className="flex items-center gap-2">
            {[
              { id: "simple", label: "Simple (Primary)" },
              { id: "standard", label: "Standard (Middle/Secondary)" },
              { id: "deep", label: "Deep (Senior / Derivation)" }
            ].map((tier) => (
              <button
                key={tier.id}
                onClick={() => setExplanationTier(tier.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                  explanationTier === tier.id
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25"
                    : "bg-slate-950 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-white/10">
        {[
          { id: "LESSON", label: "Interactive Lesson", icon: BookOpen },
          { id: "SIMULATION", label: "Visual Simulation", icon: Cpu },
          { id: "EXAMPLES", label: "Solved Examples", icon: Award },
          { id: "PRACTICE", label: "Practice Questions", icon: Zap },
          { id: "AI_TUTOR", label: "Ask AI Tutor", icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB PANELS */}
      <div className="max-w-5xl mx-auto">
        
        {/* --- LESSON & MULTI-TIER NOTES --- */}
        {activeTab === "LESSON" && (
          <div className="space-y-6">
            
            {/* TIERED CONCEPT SUMMARY */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl space-y-2">
              <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                {explanationTier.toUpperCase()} EXPLANATION TIER
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                {chapter.explanationTiers?.[explanationTier] || chapter.overview}
              </p>
            </div>

            {/* STRUCTURED NOTES */}
            {chapter.notes.map((n, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-2">
                <h3 className="text-base font-extrabold text-cyan-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span>{n.heading}</span>
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                  {n.content}
                </p>
              </div>
            ))}

          </div>
        )}

        {/* --- VISUAL SIMULATION --- */}
        {activeTab === "SIMULATION" && (
          <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase">
              <Cpu size={16} /> Interactive Concept Simulation
            </div>

            {chapter.domain === "Physics" ? (
              <div className="bg-slate-950 p-6 rounded-xl border border-white/10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                      Voltage V = {circuitVolts} V
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      value={circuitVolts}
                      onChange={(e) => setCircuitVolts(Number(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                      Resistance R = {circuitResistance} Ω
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={circuitResistance}
                      onChange={(e) => setCircuitResistance(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-white/10 text-center space-y-1">
                  <div className="text-xs text-slate-400 font-mono">Ohm's Law: Current I = V / R</div>
                  <div className="text-2xl font-black text-emerald-400">
                    Current I = {(circuitVolts / circuitResistance).toFixed(2)} Amperes (A)
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-6 rounded-xl border border-white/10 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                    Angle θ = {trigAngle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    step="15"
                    value={trigAngle}
                    onChange={(e) => setTrigAngle(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400">sin({trigAngle}°)</div>
                    <div className="text-lg font-bold text-cyan-400 mt-0.5">
                      {Math.sin((trigAngle * Math.PI) / 180).toFixed(4)}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400">cos({trigAngle}°)</div>
                    <div className="text-lg font-bold text-amber-400 mt-0.5">
                      {Math.cos((trigAngle * Math.PI) / 180).toFixed(4)}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/10">
                    <div className="text-xs text-slate-400">tan({trigAngle}°)</div>
                    <div className="text-lg font-bold text-emerald-400 mt-0.5">
                      {Math.tan((trigAngle * Math.PI) / 180).toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- SOLVED EXAMPLES --- */}
        {activeTab === "EXAMPLES" && (
          <div className="space-y-4">
            {chapter.workedExamples.map((ex, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase">Solved Example {idx + 1}</div>
                <h4 className="text-base font-bold text-white">{ex.question}</h4>
                <div className="p-3 bg-slate-950 rounded-xl border border-white/10 text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Setup:</span> {ex.given}
                </div>
                <div className="space-y-1 text-xs text-slate-300">
                  {ex.steps.map((s, stepIdx) => (
                    <div key={stepIdx} className="flex items-start gap-2">
                      <span className="font-mono text-cyan-400 font-bold">{stepIdx + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl font-bold text-emerald-300 text-xs">
                  Answer: {ex.answer}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PRACTICE --- */}
        {activeTab === "PRACTICE" && (
          <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-white">Practice Questions</h3>
            <div className="space-y-4">
              {chapter.practiceQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-slate-950 rounded-xl border border-white/10 space-y-3">
                  <h4 className="font-bold text-xs md:text-sm text-slate-200">
                    Q{idx + 1}. {q.question}
                  </h4>

                  {q.type === "MCQ" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswerSelect(q.id, opt)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition ${
                            userAnswers[q.id] === opt
                              ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                              : "bg-slate-900 border-white/10 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {(q.type === "NUMERIC" || q.type === "SHORT_ANSWER") && (
                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={userAnswers[q.id] || ""}
                      onChange={(e) => handleAnswerSelect(q.id, e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                  )}

                  {submitted && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-white/10 text-xs space-y-0.5">
                      <div className="font-bold text-emerald-400">Answer: {q.answer}</div>
                      <div className="text-slate-400">{q.explanation}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setSubmitted(!submitted)}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition text-xs uppercase tracking-wider"
            >
              {submitted ? "Reset Answers" : "Check Practice Answers"}
            </button>
          </div>
        )}

        {/* --- ASK AI TUTOR --- */}
        {activeTab === "AI_TUTOR" && (
          <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-[560px] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-400" />
                <h3 className="font-bold text-white text-sm">AI Study Coach ({chapter.subject})</h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <Globe size={13} className="text-slate-400" />
                <select
                  value={aiLanguage}
                  onChange={(e) => setAiLanguage(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-lg text-xs p-1 text-slate-300"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Kannada">Kannada (కన్నడ)</option>
                </select>
              </div>
            </div>

            {/* QUICK AI ACTION CHIPS */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              {[
                "Explain simpler",
                "Give an analogy",
                "Show real-world example",
                "Quiz me on this"
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickAiChip(chip)}
                  className="px-3 py-1 rounded-full bg-slate-950 border border-white/10 hover:border-cyan-500/40 text-slate-300 text-[11px] font-bold whitespace-nowrap transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* CHAT LOG */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {aiChat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyan-600 text-slate-950 font-bold"
                        : "bg-slate-950 border border-white/10 text-slate-300 whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiLoading && (
                <div className="text-xs text-cyan-400 font-mono animate-pulse">Formulating explanation...</div>
              )}
            </div>

            <form onSubmit={handleAskAI} className="flex gap-2 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="Ask AI tutor anything..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                Send
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
