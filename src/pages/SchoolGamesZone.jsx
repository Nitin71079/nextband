// src/pages/SchoolGamesZone.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Award, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle, 
  Trophy, 
  Sparkles, 
  Brain, 
  Play,
  Flame,
  Clock,
  TrendingUp,
  Gamepad2,
  Atom,
  Binary,
  Dna,
  BookText
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

const ARCADE_GAMES = [
  {
    id: "formula_rush",
    title: "Formula Rush",
    domain: "Mathematics",
    gradeRange: "Grades 1–12",
    description: "Rapid math equation solver & trigonometry identity racer!",
    accent: "from-cyan-500 to-blue-600",
    icon: Binary,
    masteryBoosts: ["Linear Equations +8%", "Trigonometry +5%"],
    questions: [
      { q: "Solve for x: 2x + 5 = 15", options: ["x = 5", "x = 10", "x = 4", "x = 6"], answer: "x = 5" },
      { q: "What is sin(30°)?", options: ["0.5", "1", "0.866", "0"], answer: "0.5" },
      { q: "Evaluate: 12 × 12 - 44", options: ["100", "144", "88", "120"], answer: "100" }
    ]
  },
  {
    id: "circuit_builder",
    title: "Circuit Builder",
    domain: "Physics",
    gradeRange: "Grades 8–12",
    description: "Assemble virtual Ohm's Law circuits and calculate current!",
    accent: "from-amber-500 to-orange-600",
    icon: Zap,
    masteryBoosts: ["Ohm's Law +8%", "Series Circuits +5%"],
    questions: [
      { q: "If V = 12V and R = 4Ω, what is Current I?", options: ["3 A", "48 A", "8 A", "16 A"], answer: "3 A" },
      { q: "What happens to total resistance in series connection?", options: ["Increases (Rs = R1+R2)", "Decreases", "Remains same", "Zero"], answer: "Increases (Rs = R1+R2)" }
    ]
  },
  {
    id: "element_hunt",
    title: "Element Hunt",
    domain: "Chemistry",
    gradeRange: "Grades 7–12",
    description: "Atomic number speed runner & periodic table quest!",
    accent: "from-emerald-500 to-teal-600",
    icon: Atom,
    masteryBoosts: ["Periodic Table +8%", "Ionic Bonding +6%"],
    questions: [
      { q: "What is the atomic symbol for Sodium?", options: ["Na", "So", "S", "K"], answer: "Na" },
      { q: "Which element has atomic number 17?", options: ["Chlorine", "Fluorine", "Oxygen", "Argon"], answer: "Chlorine" },
      { q: "What is the valence electron count of Oxygen?", options: ["6", "2", "8", "4"], answer: "6" }
    ]
  },
  {
    id: "cell_explorer",
    title: "Cell Explorer",
    domain: "Biology",
    gradeRange: "Grades 5–12",
    description: "Human organ identification & cellular double circulation quest!",
    accent: "from-rose-500 to-pink-600",
    icon: Dna,
    masteryBoosts: ["Circulatory System +7%", "Cell Structure +5%"],
    questions: [
      { q: "Which heart chamber pumps oxygenated blood to the body?", options: ["Left Ventricle", "Right Atrium", "Right Ventricle", "Left Atrium"], answer: "Left Ventricle" },
      { q: "Which organelle is known as the powerhouse of the cell?", options: ["Mitochondria", "Ribosome", "Nucleus", "Golgi Body"], answer: "Mitochondria" }
    ]
  },
  {
    id: "word_duel",
    title: "Word Duel & Grammar Sprint",
    domain: "English",
    gradeRange: "Grades 1–12",
    description: "Subject-verb agreement & active/passive voice speed duel!",
    accent: "from-purple-500 to-indigo-600",
    icon: BookText,
    masteryBoosts: ["English Tenses +8%", "Subject-Verb Agreement +6%"],
    questions: [
      { q: "Choose correct option: Neither he nor his friends ___ coming.", options: ["are", "is", "was", "has"], answer: "are" },
      { q: "Identify the past participle of 'write':", options: ["written", "wrote", "writing", "writes"], answer: "written" }
    ]
  }
];

export default function SchoolGamesZone() {
  const [activeGame, setActiveGame] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  const startGame = (game) => {
    setActiveGame(game);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOpt(null);
    setGameFinished(false);
  };

  const handleOptionClick = (opt) => {
    if (selectedOpt) return;
    setSelectedOpt(opt);

    const currentQ = activeGame.questions[currentQIndex];
    if (opt === currentQ.answer) {
      setScore((prev) => prev + 100);
    }

    setTimeout(() => {
      if (currentQIndex + 1 < activeGame.questions.length) {
        setCurrentQIndex((prev) => prev + 1);
        setSelectedOpt(null);
      } else {
        setGameFinished(true);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950 pb-32">
      <SchoolHeaderNav />
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Learning Path</span>
        </Link>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs font-mono font-bold">
          KNARROW ARCADE
        </span>
      </div>

      {/* ARCADE HERO */}
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-purple-400 uppercase tracking-wider mb-1">
            <Gamepad2 size={16} /> Learn Without Realizing You're Learning
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Knarrow Arcade</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Every game directly boosts your concept mastery scores!
          </p>
        </div>

        {/* DAILY CHALLENGE SPEED RUSH */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 shrink-0 space-y-2 min-w-[260px]">
          <div className="flex items-center justify-between text-xs font-extrabold text-amber-400">
            <span className="flex items-center gap-1"><Flame size={14} /> DAILY SPEED RUSH</span>
            <span>+120 XP</span>
          </div>
          <div className="text-xs text-slate-300">🔥 4 Speed Questions • ⏱ 90 Seconds</div>
          <button
            onClick={() => startGame(ARCADE_GAMES[0])}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-slate-950 font-black rounded-xl text-xs transition shadow-md"
          >
            Start Daily Rush
          </button>
        </div>
      </div>

      {/* GAME WORLDS GRID */}
      {!activeGame && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCADE_GAMES.map((game) => {
            const GIcon = game.icon;
            return (
              <div
                key={game.id}
                className="bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6 group hover:border-purple-500/50 transition duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 text-purple-400">
                      <GIcon size={22} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-white/5">
                      {game.domain}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition">{game.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{game.description}</p>

                  <div className="pt-2 space-y-1">
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Mastery Impact:</div>
                    {game.masteryBoosts.map((mb, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                        <TrendingUp size={12} />
                        <span>{mb}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => startGame(game)}
                  className={`w-full py-3 bg-gradient-to-r ${game.accent} text-slate-950 font-black rounded-xl hover:opacity-90 transition shadow-lg text-xs flex items-center justify-center gap-2`}
                >
                  <Play size={16} />
                  <span>Play Game Now</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ACTIVE GAME PLAY CANVAS */}
      {activeGame && (
        <div className="max-w-3xl mx-auto bg-slate-900/95 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-black text-white">{activeGame.title}</h2>
              <div className="text-xs text-slate-400">Question {currentQIndex + 1} of {activeGame.questions.length}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-2xl font-black text-amber-400">{score} XP</div>
            </div>
          </div>

          {!gameFinished ? (
            <div className="space-y-6">
              <h3 className="text-lg md:text-xl font-extrabold text-slate-100">
                {activeGame.questions[currentQIndex].q}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeGame.questions[currentQIndex].options.map((opt) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === activeGame.questions[currentQIndex].answer;
                  let btnStyle = "bg-slate-950 border-white/10 text-slate-300 hover:text-white";

                  if (selectedOpt) {
                    if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                    else if (isSelected) btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className={`p-4 rounded-2xl border text-left text-xs font-bold transition ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <Trophy size={48} className="mx-auto text-amber-400 animate-bounce" />
              <h3 className="text-2xl font-black text-white">Game Complete!</h3>
              
              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 max-w-sm mx-auto space-y-2">
                <div className="text-sm font-bold text-amber-400">+{score} XP Earned</div>
                <div className="text-xs text-slate-300 font-extrabold">Concept Mastery Score Boosts:</div>
                {activeGame.masteryBoosts.map((mb, i) => (
                  <div key={i} className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <TrendingUp size={14} /> {mb}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => startGame(activeGame)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2"
                >
                  <RotateCcw size={15} /> Play Again
                </button>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition"
                >
                  Back to Arcade
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
