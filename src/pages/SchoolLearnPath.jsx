// src/pages/SchoolLearnPath.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  GRADES, 
  SCHOOL_BOARDS, 
  SCHOOL_CHAPTERS, 
  LEARNING_PATH_NODES, 
  SUBJECT_CONFIG 
} from "../data/schools/knarrowSchoolsData";
import { 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Binary, 
  Atom, 
  Dna, 
  BookText, 
  CheckCircle2, 
  Lock, 
  ChevronRight, 
  Compass, 
  BookOpen 
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function SchoolLearnPath() {
  const navigate = useNavigate();
  const [board] = useState(() => localStorage.getItem("knarrow_school_board") || "CBSE");
  const [grade] = useState(() => Number(localStorage.getItem("knarrow_school_grade")) || 10);
  const [selectedSubject, setSelectedSubject] = useState("ALL");

  const currentGradeObj = GRADES.find((g) => g.grade === grade) || GRADES[9];
  const availableSubjects = SUBJECT_CONFIG[currentGradeObj.band] || SUBJECT_CONFIG.SECONDARY;

  const filteredChapters = SCHOOL_CHAPTERS.filter((ch) => {
    const matchGrade = ch.grade === grade;
    const matchSubject = selectedSubject === "ALL" || ch.subject === selectedSubject || ch.domain === selectedSubject;
    return matchGrade && matchSubject;
  });

  const getNodeIcon = (iconName) => {
    switch (iconName) {
      case "Zap": return Zap;
      case "Binary": return Binary;
      case "Atom": return Atom;
      case "Dna": return Dna;
      default: return Lock;
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950 pb-32">
      <SchoolHeaderNav />
      
      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-8">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Overview</span>
        </Link>
        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-mono font-bold">
          VISUAL SKILL PATH • GRADE {grade} {board}
        </span>
      </div>

      {/* PAGE BANNER */}
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900/90 via-[#0a0f24]/90 to-slate-950/90 border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl mb-12 backdrop-blur-2xl">
        <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider mb-2">
          <Compass size={16} /> Dedicated Learning Path
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Interactive Skill Tree</h1>
        <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-2xl">
          Follow your personalized concept progression. Unlocking nodes builds mastery step-by-step.
        </p>
      </div>

      {/* VISUAL SKILL NODE PATH */}
      <div className="max-w-6xl mx-auto bg-slate-900/70 border border-white/15 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-2xl mb-16 space-y-12">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-bold">
          <span className="text-slate-300 uppercase tracking-wider">Concept Progression</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 size={15} /> Mastered</span>
            <span className="flex items-center gap-1.5 text-amber-400"><Zap size={15} /> Current</span>
            <span className="flex items-center gap-1.5 text-slate-500"><Lock size={15} /> Locked</span>
          </div>
        </div>

        <div className="py-8 space-y-12 max-w-4xl mx-auto">
          {LEARNING_PATH_NODES.map((node, idx) => {
            const NodeIcon = getNodeIcon(node.icon);
            const isMastered = node.status === "MASTERED";
            const isInProgress = node.status === "IN_PROGRESS";
            const isLocked = node.status === "LOCKED";
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={node.id}
                className={`flex flex-col sm:flex-row items-center gap-6 ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"} justify-center`}
              >
                <div
                  onClick={() => !isLocked && navigate(`/schools/chapter/${node.chapterId}`)}
                  className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center cursor-pointer transition duration-500 shrink-0 ${
                    isMastered
                      ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 border-emerald-300 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-110"
                      : isInProgress
                      ? "bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 border-amber-300 text-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-pulse hover:scale-110"
                      : !isLocked
                      ? "bg-slate-950 border-cyan-500/60 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:scale-110 hover:border-cyan-400"
                      : "bg-slate-950/80 border-white/10 text-slate-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  <NodeIcon size={38} />
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/15 max-w-sm w-full space-y-2 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-cyan-400 uppercase tracking-wider">{node.domain}</span>
                    <span className="text-[10px] font-mono text-slate-400">{node.estimatedMins} mins</span>
                  </div>
                  <h4 className="text-base font-black text-white">{node.title}</h4>
                  
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <span className="text-slate-400 font-medium">Status: <strong className={isMastered ? "text-emerald-400" : isInProgress ? "text-amber-400" : "text-slate-500"}>{node.status}</strong></span>
                    {!isLocked && (
                      <button
                        onClick={() => navigate(`/schools/chapter/${node.chapterId}`)}
                        className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-extrabold rounded-lg transition"
                      >
                        Launch →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHAPTER LESSONS LIST */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-black text-white">All Grade {grade} Chapters</h2>
          
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setSelectedSubject("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${selectedSubject === "ALL" ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"}`}
            >
              All
            </button>
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${selectedSubject === sub ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"}`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChapters.map((ch) => (
            <div key={ch.chapterId} className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-md">
                  {ch.domain || ch.subject} • Ch {ch.chapterNumber}
                </span>
                <h3 className="text-lg font-bold text-white">{ch.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{ch.overview}</p>
              </div>
              <Link
                to={`/schools/chapter/${ch.chapterId}`}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs text-center transition flex items-center justify-center gap-1"
              >
                <span>Start Chapter Lesson</span>
                <ChevronRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
