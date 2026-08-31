import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, BookOpen, Building, Clock, HelpCircle, CheckSquare,
  FileText, Headphones, Mic, PenTool, Play, ArrowRight, Layers, Sparkles, Image as ImageIcon, Volume2, Award,
  CheckCircle2, Globe, GraduationCap, Calculator, ShieldCheck, Search, Filter, ChevronRight, Zap, Target,
  TrendingUp, BarChart2, Star, Check, ChevronLeft, Compass, RotateCcw
} from "lucide-react";
import { detTests } from "../../../data/det/detTests";
import { detToCEFR, detToIelts } from "../../../utils/detScoreCalculator";
import ExamTrackHeaderSwitcher from "../../../components/ExamTrackHeaderSwitcher";

export default function DETDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("my-tests"); // my-tests | practice | test-info | institutions
  const [activeSkillFilter, setActiveSkillFilter] = useState("ALL"); // ALL | SPEAKING | WRITING | READING | LISTENING
  const [difficultyFilter, setDifficultyFilter] = useState("ALL"); // ALL | Medium | Medium-High | Advanced
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScore, setSelectedScore] = useState(130);

  const ITEMS_PER_PAGE = 12;

  const cefrVal = detToCEFR(selectedScore);
  const ieltsVal = detToIelts(selectedScore);

  const PRACTICE_SKILLS = [
    {
      id: "single-word-read-select",
      title: "Read and Select (Single Word)",
      category: "READING",
      icon: CheckSquare,
      progress: "5/6",
      progressPct: 83,
      color: "#38bdf8",
      desc: "Identify real English words in 5 seconds per item."
    },
    {
      id: "fill-in-the-blanks",
      title: "Fill in the Blanks",
      category: "READING",
      icon: Layers,
      progress: "6/6",
      progressPct: 100,
      color: "#10b981",
      desc: "Complete sentence words with individual letter slots."
    },
    {
      id: "read-and-complete",
      title: "Read and Complete",
      category: "READING",
      icon: FileText,
      progress: "2/6",
      progressPct: 33,
      color: "#4ade80",
      desc: "Fill in missing letters throughout C-Test passages."
    },
    {
      id: "listen-and-type",
      title: "Dictation",
      category: "LISTENING",
      icon: Headphones,
      progress: "3/6",
      progressPct: 50,
      color: "#c084fc",
      desc: "Transcribe spoken sentences with max 2 replays."
    },
    {
      id: "read-aloud",
      title: "Read Aloud",
      category: "SPEAKING",
      icon: Mic,
      progress: "4/6",
      progressPct: 67,
      color: "#f59e0b",
      desc: "Record your voice reading written sentences out loud."
    },
    {
      id: "interactive-reading",
      title: "Interactive Reading",
      category: "READING",
      icon: BookOpen,
      progress: "2/6",
      progressPct: 33,
      color: "#0284c7",
      desc: "4-step progressive reveal passage comprehension."
    },
    {
      id: "interactive-listening",
      title: "Interactive Listening",
      category: "LISTENING",
      icon: Volume2,
      progress: "1/6",
      progressPct: 17,
      color: "#a855f7",
      desc: "4-stage scenario listening, dialogue & written summary."
    },
    {
      id: "describe-image",
      title: "Write About the Image",
      category: "WRITING",
      icon: ImageIcon,
      progress: "3/6",
      progressPct: 50,
      color: "#ec4899",
      desc: "Write 1+ detailed sentences describing image prompts in 60s."
    },
    {
      id: "speak-about-image",
      title: "Speak About the Image",
      category: "SPEAKING",
      icon: Mic,
      progress: "2/6",
      progressPct: 33,
      color: "#f97316",
      desc: "Describe visual elements and context out loud for 90s."
    },
    {
      id: "interactive-writing",
      title: "Interactive Writing",
      category: "WRITING",
      icon: PenTool,
      progress: "4/6",
      progressPct: 67,
      color: "#06b6d4",
      desc: "5-minute academic writing response + AI diagnostic feedback."
    },
    {
      id: "interactive-speaking",
      title: "Interactive Speaking",
      category: "SPEAKING",
      icon: Mic,
      progress: "3/6",
      progressPct: 50,
      color: "#eab308",
      desc: "Speak about complex academic prompts for 90 seconds."
    },
    {
      id: "writing-sample",
      title: "Writing Sample",
      category: "WRITING",
      icon: PenTool,
      progress: "5/6",
      progressPct: 83,
      color: "#6366f1",
      desc: "Extended institutional writing essay response (3-5 mins)."
    },
    {
      id: "speaking-sample",
      title: "Speaking Sample",
      category: "SPEAKING",
      icon: Mic,
      progress: "4/6",
      progressPct: 67,
      color: "#10b981",
      desc: "Extended institutional spoken response (1-3 mins)."
    }
  ];

  const filteredSkills = useMemo(() => {
    if (activeSkillFilter === "ALL") return PRACTICE_SKILLS;
    return PRACTICE_SKILLS.filter(s => s.category === activeSkillFilter);
  }, [activeSkillFilter]);

  const filteredTests = useMemo(() => {
    return detTests.filter((test) => {
      const matchesSearch =
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiff =
        difficultyFilter === "ALL" || (test.difficulty || "Medium").toLowerCase() === difficultyFilter.toLowerCase();
      return matchesSearch && matchesDiff;
    });
  }, [searchQuery, difficultyFilter]);

  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE) || 1;
  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTests, currentPage]);

  const handleLaunchRandom = () => {
    const randomId = Math.floor(Math.random() * detTests.length) + 1;
    navigate(`/mock/det/${randomId}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #064e3b 0%, #0f172a 70%)", fontFamily: "'Plus Jakarta Sans', Inter, sans-serif", color: "#ffffff", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* ── EXAM TRACK SWITCHER ── */}
        <ExamTrackHeaderSwitcher />

        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span style={{ background: "rgba(16,185,129,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(16,185,129,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#4ade80" /> OFFICIAL DUOLINGO ENGLISH TEST (DET) ADAPTIVE HUB
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #4ade80 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Duolingo DET 2026 AI Adaptive Hub
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master the computer-adaptive DET exam featuring <strong>11 authentic item types</strong>—Real/Fake Word Selection, Dictation, C-Test Passages, Interactive Reading &amp; Listening, and instant <strong>Groq AI Llama 3.3</strong> evaluations.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center" }}>
              <img
                src="/src/assets/images/dashboard_ai_hero.png"
                alt="3D DET AI Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(16, 185, 129, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Adaptive Mocks", val: `${detTests.length} Full Tests`, color: "#10b981", icon: Layers },
              { label: "Subscores Evaluated", val: "4 Core Domains", color: "#38bdf8", icon: Target },
              { label: "Question Item Types", val: "11 Question Formats", color: "#facc15", icon: BookOpen },
              { label: "AI Scoring Engine", val: "Groq Llama 3.3", color: "#c084fc", icon: Zap },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${stat.color === "#10b981" ? "16,185,129" : stat.color === "#38bdf8" ? "56,189,248" : stat.color === "#facc15" ? "250,204,21" : "192,132,252"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
                    <IconComp size={20} />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>{stat.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#ffffff", marginTop: 2 }}>{stat.val}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={handleLaunchRandom}
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "#ffffff",
                border: "none",
                borderRadius: "16px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "800",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 12px 30px rgba(16, 185, 129, 0.4)",
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random DET Computer-Adaptive Mock
            </button>
            <a
              href="#score-converter"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "16px 28px",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Calculator size={18} /> Score Converter (10 – 160)
            </a>
          </div>
        </div>

        {/* ── 4 DET SUBSCORE DOMAINS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 56 }}>
          {[
            { name: "Literacy", icon: BookOpen, desc: "Reading & Writing fluency", color: "#38bdf8", val: "135/160" },
            { name: "Comprehension", icon: Headphones, desc: "Reading & Listening comprehension", color: "#c084fc", val: "130/160" },
            { name: "Conversation", icon: Mic, desc: "Listening & Speaking interaction", color: "#10b981", val: "125/160" },
            { name: "Production", icon: PenTool, desc: "Writing & Speaking expression", color: "#f59e0b", val: "120/160" },
          ].map((sub) => {
            const IconComp = sub.icon;
            return (
              <div key={sub.name} style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 24, padding: 24, backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `rgba(${sub.color === "#38bdf8" ? "56,189,248" : sub.color === "#c084fc" ? "192,132,252" : sub.color === "#10b981" ? "16,185,129" : "245,158,11"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: sub.color }}>
                    <IconComp size={22} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 900, color: sub.color, background: "rgba(255,255,255,0.06)", padding: "4px 12px", borderRadius: 8 }}>
                    {sub.val}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 6px 0", color: "#ffffff" }}>{sub.name}</h3>
                <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>{sub.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ── MOCK EXAMS EXPLORER ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Layers size={24} color="#10b981" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  Computer-Adaptive DET Full Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} official adaptive mock tests
              </p>
            </div>

            {/* Search Bar & Difficulty Filter */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", minWidth: 280, flex: 1, maxWidth: 450 }}>
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Search DET mocks..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  style={{ width: "100%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px 12px 42px", color: "#ffffff", fontSize: 14, outline: "none" }}
                />
              </div>
            </div>
          </div>

          {/* Test Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 32 }}>
            {paginatedTests.map((t, idx) => {
              const testNum = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
              return (
                <motion.div
                  key={t.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  style={{ background: "rgba(15,23,42,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 22, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 8px 25px rgba(0,0,0,0.25)" }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ background: "rgba(16,185,129,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                        DET MOCK #{testNum}
                      </span>
                      <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <Clock size={13} /> ~60 mins
                      </span>
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0" }}>{t.title}</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                      Full Computer-Adaptive DET Simulation · 11 Question Types · Instant AI Diagnostic Scoring
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/mock/det/${t.id}`)}
                    style={{ width: "100%", background: "linear-gradient(135deg, #10b981, #059669)", color: "#ffffff", border: "none", borderRadius: 14, padding: "12px", fontWeight: 800, fontSize: 14, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 14px rgba(16,185,129,0.35)" }}
                  >
                    <Play size={16} fill="#ffffff" /> Launch DET Mock #{testNum}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page {currentPage} of {totalPages} ({filteredTests.length} DET Mocks)
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  style={{ background: currentPage === 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)", color: currentPage === 1 ? "#64748b" : "#ffffff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  style={{ background: currentPage === totalPages ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)", color: currentPage === totalPages ? "#64748b" : "#ffffff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── SCORE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 36, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80" }}>
              <Calculator size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Official DET Score Converter &amp; Target Map</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Map DET scores (10 – 160) to IELTS (0–9), CEFR levels, and university admission thresholds</p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1" }}>Select DET Score:</span>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#4ade80" }}>{selectedScore} / 160</span>
            </div>
            <input
              type="range"
              min="10"
              max="160"
              step="5"
              value={selectedScore}
              onChange={(e) => setSelectedScore(parseInt(e.target.value, 10))}
              style={{ width: "100%", accentColor: "#10b981", height: 10, cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>CEFR Level</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", marginTop: 6 }}>{cefrVal}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>IELTS Equivalent</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", marginTop: 6 }}>Band {ieltsVal}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>University Acceptance</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15", marginTop: 6 }}>
                {selectedScore >= 130 ? "Top 50 US Universities & Ivy League" : selectedScore >= 115 ? "Tier-1 US & UK Universities" : selectedScore >= 95 ? "Global Undergraduate Programs" : "Preparatory & Pathway Programs"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
