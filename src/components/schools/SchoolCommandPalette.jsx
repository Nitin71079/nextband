// src/components/schools/SchoolCommandPalette.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SCHOOL_CHAPTERS, KNOWLEDGE_GRAPH } from "../../data/schools/knarrowSchoolsData";
import { 
  Search, 
  BookOpen, 
  Zap, 
  Gamepad2, 
  Sparkles, 
  Award, 
  ArrowRight, 
  Layers, 
  Brain, 
  Command 
} from "lucide-react";

export default function SchoolCommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose ? onClose(!isOpen) : null;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredChapters = SCHOOL_CHAPTERS.filter((ch) =>
    ch.title.toLowerCase().includes(query.toLowerCase()) ||
    ch.overview.toLowerCase().includes(query.toLowerCase()) ||
    ch.domain.toLowerCase().includes(query.toLowerCase())
  );

  const filteredConcepts = KNOWLEDGE_GRAPH.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.domain.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-50 flex items-start justify-center pt-16 md:pt-24 px-4 font-sans">
      <div className="bg-gradient-to-b from-slate-900 via-[#0a0f24] to-slate-950 border border-white/15 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden space-y-4">
        
        {/* INPUT HEADER */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search size={20} className="text-cyan-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search lessons, concepts, formulas, arcade games, board tests..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm md:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-950 border border-white/10 rounded">
            <Command size={10} /> K
          </kbd>
        </div>

        {/* RESULTS AREA */}
        <div className="max-h-[400px] overflow-y-auto px-4 pb-4 space-y-4 scrollbar-thin">
          
          {/* QUICK ACTION CHIPS */}
          {!query && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Quick Actions</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelect("/schools/games")}
                  className="p-3 rounded-xl bg-slate-950/80 border border-white/10 hover:border-purple-500/50 text-left text-xs font-bold text-slate-200 hover:text-purple-300 transition flex items-center gap-2"
                >
                  <Gamepad2 size={16} className="text-purple-400" />
                  <span>Launch Arcade Games</span>
                </button>
                <button
                  onClick={() => handleSelect("/schools/test/board_mock")}
                  className="p-3 rounded-xl bg-slate-950/80 border border-white/10 hover:border-blue-500/50 text-left text-xs font-bold text-slate-200 hover:text-blue-300 transition flex items-center gap-2"
                >
                  <Award size={16} className="text-blue-400" />
                  <span>Start Board Exam Simulation</span>
                </button>
              </div>
            </div>
          )}

          {/* CHAPTER RESULTS */}
          {filteredChapters.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Curriculum Lessons ({filteredChapters.length})</div>
              {filteredChapters.map((ch) => (
                <div
                  key={ch.chapterId}
                  onClick={() => handleSelect(`/schools/chapter/${ch.chapterId}`)}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-cyan-300 transition">{ch.title}</div>
                      <div className="text-[10px] text-slate-400">{ch.domain} • Grade {ch.grade} {ch.board}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-cyan-400 transition group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          )}

          {/* CONCEPT KNOWLEDGE GRAPH RESULTS */}
          {filteredConcepts.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Universal Concepts ({filteredConcepts.length})</div>
              {filteredConcepts.map((c) => (
                <div
                  key={c.conceptId}
                  onClick={() => handleSelect(`/schools`)}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 hover:border-emerald-500/50 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs">
                      <Brain size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-white group-hover:text-emerald-300 transition">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.domain} • Grades {c.grades.join(", ")}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-emerald-400 transition group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
