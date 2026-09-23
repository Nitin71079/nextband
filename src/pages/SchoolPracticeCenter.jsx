// src/pages/SchoolPracticeCenter.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Zap, 
  Sparkles, 
  Brain, 
  Target, 
  CheckCircle2, 
  ChevronRight, 
  Sliders 
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

const WEAK_PRACTICE_TOPICS = [
  { id: "trig", topic: "Trigonometric Ratios & Identities", domain: "Mathematics", weakPct: 64, count: 12 },
  { id: "electricity", topic: "Electricity — Series & Parallel Circuits", domain: "Physics", weakPct: 71, count: 10 },
  { id: "metals", topic: "Metals & Ionic Bonding Reactions", domain: "Chemistry", weakPct: 68, count: 15 },
  { id: "tenses", topic: "English Grammar & Subject-Verb Agreement", domain: "English", weakPct: 75, count: 8 }
];

export default function SchoolPracticeCenter() {
  const [selectedTopic, setSelectedTopic] = useState(WEAK_PRACTICE_TOPICS[0]);
  const [difficulty, setDifficulty] = useState("Medium");
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);

  const sampleQuestions = [
    { q: "If sin θ = 3/5, calculate tan θ.", options: ["3/4", "4/3", "5/3", "4/5"], answer: "3/4" },
    { q: "Evaluate 1 - cos²(30°).", options: ["1/4", "3/4", "1/2", "1"], answer: "1/4" }
  ];

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950 pb-32">
      <SchoolHeaderNav />
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 mb-8">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-mono font-bold">
          ADAPTIVE PRACTICE HUB
        </span>
      </div>

      {/* BANNER */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl mb-12 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider mb-2">
          <Zap size={16} /> Smart Practice Engine
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Adaptive Practice Hub</h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-2xl">
          AI dynamically targets your weakest topics and adjusts problem difficulty in real time.
        </p>
      </div>

      {!sessionActive ? (
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* WEAK AREAS SELECTION */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white">Recommended Weak Area Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WEAK_PRACTICE_TOPICS.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t)}
                  className={`p-6 rounded-3xl border cursor-pointer transition duration-300 shadow-xl space-y-3 ${
                    selectedTopic.id === t.id
                      ? "bg-slate-900 border-amber-500 text-white shadow-amber-500/15"
                      : "bg-slate-950/80 border-white/10 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-amber-400">{t.domain}</span>
                    <span className="font-mono text-slate-400">{t.count} Questions</span>
                  </div>
                  <h3 className="font-bold text-base text-white">{t.topic}</h3>
                  <div className="text-xs text-slate-400">Current Mastery: <strong className="text-amber-400">{t.weakPct}%</strong></div>
                </div>
              ))}
            </div>
          </div>

          {/* DIFFICULTY SELECTOR & LAUNCH */}
          <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-slate-300">Select Difficulty</span>
              <div className="flex gap-2">
                {["Easy", "Medium", "Hard", "Board Exam"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      difficulty === d ? "bg-amber-500 text-slate-950" : "bg-slate-950 border border-white/10 text-slate-400"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSessionActive(true)}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black rounded-2xl hover:opacity-90 transition shadow-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Launch Smart Practice ({selectedTopic.topic})</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      ) : (
        /* ACTIVE SESSION CANVAS */
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">{selectedTopic.topic}</h3>
              <div className="text-xs text-slate-400">Difficulty: {difficulty}</div>
            </div>
            <div className="text-xs font-mono font-bold text-amber-400">
              Q{currentQIndex + 1} of {sampleQuestions.length}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-100">{sampleQuestions[currentQIndex].q}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sampleQuestions[currentQIndex].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    if (currentQIndex + 1 < sampleQuestions.length) {
                      setCurrentQIndex(currentQIndex + 1);
                    } else {
                      setSessionActive(false);
                    }
                  }}
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:border-amber-500/50 transition text-left"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
