// src/pages/KnarrowSchoolsCenter.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  SCHOOL_BOARDS, 
  GRADES, 
  USER_SCHOOL_PROFILE,
} from "../data/schools/knarrowSchoolsData";
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Target, 
  Gamepad2, 
  Atom, 
  Binary, 
  Dna, 
  BookText,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Compass
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function KnarrowSchoolsCenter() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(() => localStorage.getItem("knarrow_school_board") || "CBSE");
  const [grade, setGrade] = useState(() => Number(localStorage.getItem("knarrow_school_grade")) || 10);
  const [academicYear, setAcademicYear] = useState(() => localStorage.getItem("knarrow_school_academicYear") || "2026-27");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    localStorage.setItem("knarrow_school_board", board);
    localStorage.setItem("knarrow_school_grade", grade);
    localStorage.setItem("knarrow_school_academicYear", academicYear);
  }, [board, grade, academicYear]);

  const currentGradeObj = GRADES.find((g) => g.grade === grade) || GRADES[9];
  const profile = USER_SCHOOL_PROFILE;

  const subjects = [
    { id: "physics", label: "Physics World", icon: Zap, color: "#38bdf8", bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)", desc: "Electricity, Magnetism, Optics & Motion", count: "12 Chapters" },
    { id: "math", label: "Mathematics World", icon: Binary, color: "#818cf8", bg: "rgba(129,140,248,0.08)", border: "rgba(129,140,248,0.2)", desc: "Trigonometry, Polynomials & Probability", count: "15 Chapters" },
    { id: "chemistry", label: "Chemistry World", icon: Atom, color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)", desc: "Metals, Carbon Compounds & Reactions", count: "10 Chapters" },
    { id: "biology", label: "Biology World", icon: Dna, color: "#c084fc", bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.2)", desc: "Life Processes, Genetics & Reproduction", count: "11 Chapters" },
    { id: "english", label: "English World", icon: BookText, color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.2)", desc: "Grammar, Literature & Essay Masterclass", count: "8 Chapters" },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans pb-32 relative overflow-x-hidden">
      
      {/* AMBIENT GLOW BACKDROP */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyan-500/10 blur-[140px] pointer-events-none -z-10" />

      {/* SLEEK SUB-NAV STRIP */}
      <SchoolHeaderNav onOpenOnboarding={() => setShowOnboarding(true)} />

      {/* MAIN CONTENT AREA WITH HIGH BREATHING ROOM */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-12">

        {/* SECTION 1: CLEAN HERO BANNERS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* GREETING & STATUS */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/50 border border-slate-800/80 p-8 md:p-10 backdrop-blur-xl flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase">
                <Sparkles size={13} className="text-cyan-400" />
                <span>Grade {grade} · {board} Board ({academicYear})</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Good Afternoon, <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{profile.studentName}</span>
              </h1>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                You are on a <strong className="text-amber-400">{profile.streakDays}-day learning streak</strong>. Keep progressing to unlock Level {profile.level + 1}!
              </p>
            </div>

            {/* XP PROGRESS BAR */}
            <div className="pt-6 mt-6 border-t border-slate-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-purple-400">Level {profile.level}: {profile.levelTitle}</span>
                <span className="text-slate-400 font-mono">{profile.currentXP.toLocaleString()} / {profile.nextLevelXP.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(profile.currentXP / profile.nextLevelXP) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* TODAY'S MISSION CARD */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-amber-500/10 via-slate-900/50 to-slate-900/50 border border-amber-500/30 p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Target size={15} /> TODAY'S FOCUS MISSION
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  78% Complete
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">Master Electricity & Ohm's Law</h3>
                <p className="text-xs text-slate-400 mt-1">Physics Chapter 12 · 3 concepts remaining</p>
              </div>

              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => navigate("/schools/subject/physics")}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Continue Mission (15 Mins)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </section>

        {/* SECTION 2: SUBJECT WORLDS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Explore Subject Worlds</h2>
              <p className="text-xs text-slate-400 mt-0.5">Dedicated visual interactive portals for Grade {grade}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((sub) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.id}
                  onClick={() => navigate(`/schools/subject/${sub.id}`)}
                  className="group rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg"
                  style={{ background: sub.bg, border: `1px solid ${sub.border}` }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${sub.color}15`, color: sub.color }}>
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{sub.count}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">{sub.label}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{sub.desc}</p>
                    </div>
                  </div>

                  <div className="pt-6 flex items-center justify-between text-xs font-bold" style={{ color: sub.color }}>
                    <span>Enter Portal</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: MULTI-PAGE NAVIGATION HUBS */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Learning & Practice Hubs</h2>
            <p className="text-xs text-slate-400 mt-0.5">Jump directly into specialized learning tools</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* HUB 1: SKILL PATH */}
            <div 
              onClick={() => navigate("/schools/learn")}
              className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 hover:border-cyan-500/40 transition cursor-pointer space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Interactive Skill Path</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Explore chapter nodes, prerequisites, and node mastery levels on a visual interactive tree.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-cyan-400">
                <span>Open Skill Path</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* HUB 2: PRACTICE CENTER */}
            <div 
              onClick={() => navigate("/schools/practice")}
              className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 hover:border-indigo-500/40 transition cursor-pointer space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Practice & Board Mocks</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Chapter drills, past paper questions, and timed CBSE/ICSE board examination simulators.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-indigo-400">
                <span>Start Practice</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* HUB 3: ARCADE */}
            <div 
              onClick={() => navigate("/schools/games")}
              className="rounded-3xl bg-slate-900/50 border border-slate-800/80 p-6 hover:border-purple-500/40 transition cursor-pointer space-y-4 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Gamepad2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">School Arcade Games</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Gamified speed math, science formula clashes, and vocabulary duels to boost retention.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-purple-400">
                <span>Enter Arcade</span>
                <ArrowRight size={14} />
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
