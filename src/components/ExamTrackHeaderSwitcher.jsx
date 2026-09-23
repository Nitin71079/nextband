import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Layers, 
  BookOpen, 
  BrainCircuit, 
  Zap, 
  Award, 
  BarChart2, 
  Compass,
  CheckCircle2,
  Globe,
  GraduationCap
} from "lucide-react";
import { useExam } from "../context/ExamContext";

export default function ExamTrackHeaderSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeTrack, selectTrack } = useExam();

  // Column 1: Language Proficiency & Undergrad Standardized Admissions
  const languageAndUndergradTracks = [
    {
      id: "IELTS",
      name: "IELTS",
      shortName: "IELTS",
      badge: "Band 0 - 9.0",
      icon: BookOpen,
      color: "#3b82f6",
    },
    {
      id: "TOEFL",
      name: "TOEFL iBT 2026",
      shortName: "TOEFL iBT",
      badge: "0 - 120 Scale",
      icon: BrainCircuit,
      color: "#a855f7",
    },
    {
      id: "PTE",
      name: "PTE Academic",
      shortName: "PTE Academic",
      badge: "10 - 90 Scale",
      icon: Award,
      color: "#c084fc",
    },
    {
      id: "DET",
      name: "Duolingo DET",
      shortName: "Duolingo DET",
      badge: "10 - 160 Scale",
      icon: Sparkles,
      color: "#10b981",
    },
    {
      id: "SAT",
      name: "Digital SAT 2026",
      shortName: "Digital SAT",
      badge: "400 - 1600 Scale",
      icon: Sparkles,
      color: "#38bdf8",
    },
  ];

  // Column 2: Graduate Aptitude & Business School Management Entrance
  const graduateAndManagementTracks = [
    {
      id: "GRE",
      name: "GRE General 2026",
      shortName: "GRE General",
      badge: "130 - 170 Scale",
      icon: Zap,
      color: "#facc15",
    },
    {
      id: "GMAT",
      name: "GMAT Focus 2026",
      shortName: "GMAT Focus",
      badge: "205 - 805 Scale",
      icon: BarChart2,
      color: "#f59e0b",
    },
    {
      id: "CAT",
      name: "CAT 2026 Mocks",
      shortName: "CAT 2026",
      badge: "Percentile Scale",
      icon: Layers,
      color: "#f472b6",
    },
    {
      id: "ACT",
      name: "ACT 2026 Exam",
      shortName: "ACT Exam",
      badge: "1 - 36 Scale",
      icon: Award,
      color: "#06b6d4",
    },
  ];

  const allTracks = [...languageAndUndergradTracks, ...graduateAndManagementTracks];
  const activeTrackObj = allTracks.find((t) => t.id === activeTrack) || allTracks[0];

  return (
    <div className="w-full mb-8 relative z-20">
      {/* MAIN CONTAINER */}
      <div className="rounded-3xl bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-slate-950/90 border border-white/15 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-5 md:p-6 space-y-5">
        
        {/* TOP STATUS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Compass size={20} className="animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  Select Active Target Track <Sparkles size={14} className="text-amber-400 fill-amber-400/20" />
                </h2>
              </div>
              <p className="text-xs text-slate-400 font-semibold">
                Switch live simulation engines &amp; 100-mock banks
              </p>
            </div>
          </div>

          {/* ACTIVE TRACK CHIP */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-white/15 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase text-slate-400">Active:</span>
            <span className="text-xs font-black text-white">{activeTrackObj.name}</span>
            <span 
              className="text-[9px] font-extrabold px-1.5 py-0.5 rounded border ml-1 font-mono"
              style={{
                borderColor: `${activeTrackObj.color}60`,
                backgroundColor: `${activeTrackObj.color}20`,
                color: activeTrackObj.color
              }}
            >
              {activeTrackObj.badge}
            </span>
          </div>
        </div>

        {/* TWO RELATABLE CATEGORY COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          
          {/* COLUMN 1: ENGLISH PROFICIENCY & UNDERGRAD ENTRANCE */}
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-4 md:p-5 flex flex-col justify-between space-y-4">
            
            {/* COLUMN HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-blue-300">
                    Language &amp; Undergrad Admissions
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    IELTS, TOEFL, PTE, DET &amp; Digital SAT
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono">
                5 Tracks
              </span>
            </div>

            {/* EXAM BUTTONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {languageAndUndergradTracks.map((t) => {
                const Icon = t.icon;
                const isActive = activeTrack === t.id;

                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectTrack(t.id, navigate)}
                    className={`relative p-3 rounded-xl text-left flex items-center justify-between gap-2.5 transition duration-200 border ${
                      isActive
                        ? "bg-slate-900 border-cyan-400/80 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50"
                        : "bg-slate-950/60 hover:bg-slate-900/80 border-white/10 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border bg-slate-950"
                        style={{ color: t.color, borderColor: `${t.color}40` }}
                      >
                        <Icon size={14} />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-black text-white truncate">{t.shortName}</span>
                        <span className="text-[9px] font-bold text-slate-400 font-mono">{t.badge}</span>
                      </div>
                    </div>

                    {isActive && (
                      <CheckCircle2 size={15} className="text-cyan-400 shrink-0 fill-cyan-400/20" />
                    )}
                  </motion.button>
                );
              })}
            </div>

          </div>

          {/* COLUMN 2: GRADUATE APTITUDE & BUSINESS MANAGEMENT ENTRANCE */}
          <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-4 md:p-5 flex flex-col justify-between space-y-4">
            
            {/* COLUMN HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-purple-300">
                    Graduate &amp; Business School Mocks
                  </h3>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    GRE, GMAT, CAT &amp; ACT Exams
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono">
                4 Tracks
              </span>
            </div>

            {/* EXAM BUTTONS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {graduateAndManagementTracks.map((t) => {
                const Icon = t.icon;
                const isActive = activeTrack === t.id;

                return (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectTrack(t.id, navigate)}
                    className={`relative p-3 rounded-xl text-left flex items-center justify-between gap-2.5 transition duration-200 border ${
                      isActive
                        ? "bg-slate-900 border-purple-400/80 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/50"
                        : "bg-slate-950/60 hover:bg-slate-900/80 border-white/10 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border bg-slate-950"
                        style={{ color: t.color, borderColor: `${t.color}40` }}
                      >
                        <Icon size={14} />
                      </div>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-black text-white truncate">{t.shortName}</span>
                        <span className="text-[9px] font-bold text-slate-400 font-mono">{t.badge}</span>
                      </div>
                    </div>

                    {isActive && (
                      <CheckCircle2 size={15} className="text-purple-400 shrink-0 fill-purple-400/20" />
                    )}
                  </motion.button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
