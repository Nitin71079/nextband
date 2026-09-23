// src/pages/SchoolSubjectWorld.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { SCHOOL_CHAPTERS, KNOWLEDGE_GRAPH } from "../data/schools/knarrowSchoolsData";
import { 
  ArrowLeft, 
  Sparkles, 
  Binary, 
  Zap, 
  Atom, 
  Dna, 
  BookText, 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  Cpu, 
  Gamepad2, 
  Award 
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

const SUBJECT_WORLDS = {
  Mathematics: {
    name: "Mathematics World",
    tagline: "Master patterns, spatial geometry, and algebraic structures.",
    icon: Binary,
    theme: "from-cyan-500/20 via-blue-600/10 to-slate-950",
    accent: "text-cyan-400",
    bgBorder: "border-cyan-500/30",
    button: "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
  },
  Physics: {
    name: "Physics World",
    tagline: "Understand how the physical universe moves, forces act, and energy flows.",
    icon: Zap,
    theme: "from-amber-500/20 via-orange-600/10 to-slate-950",
    accent: "text-amber-400",
    bgBorder: "border-amber-500/30",
    button: "bg-amber-500 text-slate-950 hover:bg-amber-400"
  },
  Chemistry: {
    name: "Chemistry World",
    tagline: "Explore atomic bonds, reaction dynamics, and periodic element structures.",
    icon: Atom,
    theme: "from-emerald-500/20 via-teal-600/10 to-slate-950",
    accent: "text-emerald-400",
    bgBorder: "border-emerald-500/30",
    button: "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
  },
  Biology: {
    name: "Biology World",
    tagline: "Discover cellular biology, human physiology, genetics, and ecosystems.",
    icon: Dna,
    theme: "from-rose-500/20 via-pink-600/10 to-slate-950",
    accent: "text-rose-400",
    bgBorder: "border-rose-500/30",
    button: "bg-rose-500 text-slate-950 hover:bg-rose-400"
  },
  English: {
    name: "English World",
    tagline: "Develop powerful literature analysis, grammar mastery, and creative storytelling.",
    icon: BookText,
    theme: "from-purple-500/20 via-indigo-600/10 to-slate-950",
    accent: "text-purple-400",
    bgBorder: "border-purple-500/30",
    button: "bg-purple-500 text-slate-950 hover:bg-purple-400"
  }
};

export default function SchoolSubjectWorld() {
  const { subjectId } = useParams();
  const subjectKey = Object.keys(SUBJECT_WORLDS).find(
    (k) => k.toLowerCase() === (subjectId || "physics").toLowerCase()
  ) || "Physics";

  const world = SUBJECT_WORLDS[subjectKey];
  const Icon = world.icon;

  const chapters = SCHOOL_CHAPTERS.filter(
    (ch) => ch.subject.toLowerCase() === subjectKey.toLowerCase() || ch.domain.toLowerCase() === subjectKey.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#03050c] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950">
      <SchoolHeaderNav />
      
      {/* NAVIGATION HEADER */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Learning Universe</span>
        </Link>
        <span className={`px-3 py-1 bg-slate-900 border ${world.bgBorder} rounded-full text-xs font-extrabold ${world.accent}`}>
          {world.name}
        </span>
      </div>

      {/* SUBJECT HERO BANNER */}
      <div className={`max-w-6xl mx-auto bg-gradient-to-br ${world.theme} border ${world.bgBorder} rounded-3xl p-6 md:p-10 shadow-2xl space-y-4 backdrop-blur-2xl mb-8`}>
        <div className="flex items-center gap-3">
          <div className={`p-4 bg-slate-950/80 rounded-2xl border ${world.bgBorder} ${world.accent}`}>
            <Icon size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">{world.name}</h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1">{world.tagline}</p>
          </div>
        </div>
      </div>

      {/* MODES OF LEARNING */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Concepts & Lessons", icon: BookText, to: "/schools", desc: "Structured multi-tier notes" },
          { title: "Visual Sims", icon: Cpu, to: "/schools", desc: "Interactive simulations" },
          { title: "Arcade Games", icon: Gamepad2, to: "/schools/games", desc: "Gamified practice" },
          { title: "Board Exams", icon: Award, to: "/schools/test/board_mock", desc: "Timed exam papers" }
        ].map((m) => {
          const MIcon = m.icon;
          return (
            <Link
              key={m.title}
              to={m.to}
              className={`p-5 rounded-2xl bg-slate-900/80 border border-white/10 hover:${world.bgBorder} hover:scale-[1.02] transition shadow-lg space-y-2`}
            >
              <MIcon size={20} className={world.accent} />
              <div className="font-extrabold text-sm text-white">{m.title}</div>
              <div className="text-xs text-slate-400">{m.desc}</div>
            </Link>
          );
        })}
      </div>

      {/* CHAPTERS LISTING */}
      <div className="max-w-6xl mx-auto space-y-4">
        <h2 className="text-xl font-black text-white">Curriculum Chapters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map((ch) => (
            <div key={ch.chapterId} className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase rounded bg-slate-950 text-cyan-400">
                  Chapter {ch.chapterNumber}
                </span>
                <span className="text-xs font-mono text-slate-400">Grade {ch.grade} {ch.board}</span>
              </div>

              <h3 className="text-lg font-bold text-white">{ch.title}</h3>
              <p className="text-slate-400 text-xs line-clamp-2">{ch.overview}</p>

              <Link
                to={`/schools/chapter/${ch.chapterId}`}
                className={`inline-flex items-center gap-1.5 px-4 py-2 ${world.button} font-extrabold rounded-xl text-xs transition shadow-lg`}
              >
                <span>Enter Lesson</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
