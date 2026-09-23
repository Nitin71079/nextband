import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, BrainCircuit, Headphones, BookOpen, Mic, PenTool,
  ArrowRight, CheckCircle2, Calculator, Play, Layers, Clock, ShieldCheck,
  HelpCircle, Search, Filter, ChevronLeft, ChevronRight, Award, Zap, Compass, RotateCcw, TrendingUp, Star
} from "lucide-react";
import { toeflTests } from "../data/toefl/toeflTests";
import { toeflToIelts, toeflToCEFR, toeflToOldScale } from "../utils/toeflScoreCalculator";
import FloatingDanglerPill from "../components/FloatingDanglerPill";

export default function TOEFLCenter() {
  const navigate = useNavigate();
  const [selectedScore, setSelectedScore] = useState(5.0);
  
  // Search, Filter & Pagination State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all" | "core" | "physical" | "life" | "humanities"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const ieltsEquiv = toeflToIelts(selectedScore);
  const cefrEquiv = toeflToCEFR(selectedScore);
  const oldScaleEquiv = toeflToOldScale(selectedScore);

  // Filtered Tests memo
  const filteredTests = useMemo(() => {
    return toeflTests.filter((test, idx) => {
      const testNum = idx + 1;
      const query = searchQuery.toLowerCase().trim();

      // Search match
      const titleMatch = test.title.toLowerCase().includes(query) || `test ${testNum}`.includes(query);
      const acadPassage = test.sections.reading?.routerModule?.find(m => m.type === "read_academic");
      const passageMatch = acadPassage?.passageTitle?.toLowerCase().includes(query) || false;
      const matchesSearch = !query || titleMatch || passageMatch;

      // Category tab match
      let matchesTab = true;
      if (activeTab === "core") matchesTab = testNum <= 25;
      else if (activeTab === "physical") matchesTab = testNum >= 26 && testNum <= 50;
      else if (activeTab === "life") matchesTab = testNum >= 51 && testNum <= 75;
      else if (activeTab === "humanities") matchesTab = testNum >= 76 && testNum <= 100;

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  // Reset page when filters change
  const totalPages = Math.max(1, Math.ceil(filteredTests.length / itemsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  
  const pagedTests = useMemo(() => {
    const start = (currentPageSafe - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPageSafe]);

  const sections = [
    {
      title: "📖 Reading Section",
      time: "Approx. 30 min",
      items: "50 Items Total (Router + Stage 2)",
      adaptive: "✅ Adaptive Reading",
      color: "#38bdf8",
      tasks: [
        "Complete the Words (Router Module only)",
        "Read in Daily Life (Campus notices, emails & bulletins)",
        "Read an Academic Passage (150–250 word authentic texts)"
      ]
    },
    {
      title: "🎧 Listening Section",
      time: "Approx. 29 min",
      items: "47 Items Total (Router + Stage 2)",
      adaptive: "✅ Adaptive Listening",
      color: "#c084fc",
      tasks: [
        "Listen and Choose a Response (Short campus prompts)",
        "Listen to a Conversation (Student & Advisor dialogues)",
        "Listen to an Announcement & Academic Talks"
      ]
    },
    {
      title: "✍️ Writing Section",
      time: "Approx. 23 min",
      items: "12 Tasks (Linear)",
      adaptive: "⚡ Automated Scoring",
      color: "#f59e0b",
      tasks: [
        "Build a Sentence (10 syntax & clause ordering items)",
        "Write an Email (Realistic campus communication)",
        "Write for an Academic Discussion (Forum post, 100+ words)"
      ]
    },
    {
      title: "🎙️ Speaking Section",
      time: "Approx. 8 min",
      items: "11 Tasks (Linear)",
      adaptive: "⚡ Automated Scoring",
      color: "#4ade80",
      tasks: [
        "Listen and Repeat (7 sentence repetition tasks, text hidden)",
        "Take an Interview (4 progressive speaking questions)",
        "Real-Time Audio Recording + Automated Rubric Evaluation"
      ]
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 70%)", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* ── HERO BANNER ── */}
        <div style={{ marginBottom: "48px", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32, alignItems: "center", marginBottom: 36 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span style={{ background: "rgba(139,92,246,0.2)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "6px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: "800", letterSpacing: "0.5px", boxShadow: "0 0 20px rgba(168,85,247,0.2)", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={15} color="#c084fc" /> 🎓 IELTS Academic &amp; TOEFL iBT 2026 100-MOCK SUITE (1.0 – 6.0 SCALE)
              </span>

              <h1 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 900, margin: "20px 0 16px", letterSpacing: "-1.5px", background: "linear-gradient(135deg, #ffffff 30%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                🎓 IELTS Academic &amp; TOEFL iBT 2026 Practice &amp; AI Hub
              </h1>
              <p style={{ color: "#94a3b8", fontSize: "1.15rem", margin: "0 0 28px", lineHeight: "1.6" }}>
                Master all <strong>100 Full Practice Tests</strong> built to official 2026 ETS Multistage Adaptive specifications—featuring <strong>150–250 word Academic Passages</strong>, <strong>Complete the Words</strong>, <strong>Build a Sentence</strong>, <strong>Listen &amp; Repeat</strong>, and live <strong>Groq AI Llama 3.3</strong> rubric evaluations.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ textAlign: "center", position: "relative", display: "inline-block" }}>
              <FloatingDanglerPill
                icon={TrendingUp}
                value="+15 Pts"
                label="Predicted Growth"
                variant="light"
                iconBg="rgba(192, 132, 252, 0.15)"
                iconColor="#9333ea"
                floatDelay={0}
                style={{ position: "absolute", top: -10, right: -15 }}
              />

              <FloatingDanglerPill
                icon={Star}
                value="98%"
                label="Candidate Pass Rate"
                variant="light"
                iconBg="rgba(56, 189, 248, 0.15)"
                iconColor="#0284c7"
                floatDelay={1.5}
                style={{ position: "absolute", bottom: 20, left: -15 }}
              />

              <img
                src="/src/assets/images/toefl_hero_banner.png"
                alt="3D TOEFL iBT Prep Banner"
                style={{ width: "100%", maxWidth: 400, borderRadius: 24, filter: "drop-shadow(0 15px 35px rgba(124, 58, 237, 0.4))", border: "1px solid rgba(255,255,255,0.15)" }}
              />
            </motion.div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: "900px", margin: "0 auto 36px" }}>
            {[
              { label: "Full Practice Mocks", val: "100 Tests", color: "#38bdf8", icon: Layers },
              { label: "Adaptive Routing", val: "Theta 2-Stage", color: "#c084fc", icon: BrainCircuit },
              { label: "Academic Passage Length", val: "150–250 Words", color: "#facc15", icon: BookOpen },
              { label: "AI Rubric Evaluator", val: "Groq Llama 3.3", color: "#4ade80", icon: Zap },
            ].map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div key={idx} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(10px)" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(${stat.color === "#38bdf8" ? "56,189,248" : stat.color === "#c084fc" ? "192,132,252" : stat.color === "#facc15" ? "250,204,21" : "74,222,128"}, 0.15)`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
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
              onClick={() => {
                const randomId = Math.floor(Math.random() * toeflTests.length) + 1;
                navigate(`/toefl/test/toefl-full-${randomId}`);
              }}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
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
                boxShadow: "0 12px 30px rgba(124, 58, 237, 0.4)",
                transition: "all 0.2s ease"
              }}
            >
              <Play size={20} fill="#ffffff" /> 🎲 Launch Random TOEFL iBT Mock (1–100)
            </button>
            <a
              href="#score-converter"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "16px",
                padding: "16px 28px",
                fontSize: "15px",
                fontWeight: "700",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Calculator size={18} /> Score Converter (1.0 – 6.0)
            </a>
          </div>
        </div>

        {/* ── 4 SECTIONS SUMMARY GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "56px" }}>
          {sections.map((sec) => (
            <div key={sec.title} style={{ background: "rgba(30,41,59,0.75)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", padding: "24px", backdropFilter: "blur(12px)", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: sec.color, background: `rgba(255,255,255,0.06)`, padding: "3px 10px", borderRadius: 6 }}>{sec.adaptive}</span>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>{sec.time}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px 0", color: "#ffffff" }}>{sec.title}</h3>
              <div style={{ fontSize: 13, color: "#cbd5e1", marginBottom: 14, fontWeight: 600 }}>{sec.items}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, color: "#94a3b8", display: "flex", flexDirection: "column", gap: 8 }}>
                {sec.tasks.map((t, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4 }}>
                    <CheckCircle2 size={15} color={sec.color} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── TEST BANK EXPLORER HEADER & FILTERS ── */}
        <div style={{ background: "rgba(30,41,59,0.8)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 28, padding: 32, marginBottom: 48, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Layers size={24} color="#c084fc" />
                <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, color: "#ffffff" }}>
                  100 TOEFL iBT 2026 Full Practice Mocks
                </h2>
              </div>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: "4px 0 0 0" }}>
                Showing {filteredTests.length} practice tests matching your filter criteria
              </p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", minWidth: 280, flex: 1, maxWidth: 400 }}>
              <Search size={18} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search tests or academic topics (e.g. Astrophysics, Test 42)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "100%",
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  padding: "12px 14px 12px 42px",
                  color: "#ffffff",
                  fontSize: 14,
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 12 }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Category Tabs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 16, marginBottom: 28 }}>
            {[
              { id: "all", label: `All Mocks (${toeflTests.length})` },
              { id: "core", label: "Mock 1–25 (Core Bank)" },
              { id: "physical", label: "Mock 26–50 (Physical Sciences)" },
              { id: "life", label: "Mock 51–75 (Life Sciences & Tech)" },
              { id: "humanities", label: "Mock 76–100 (Humanities & Econ)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                }}
                style={{
                  background: activeTab === tab.id ? "#7c3aed" : "rgba(255,255,255,0.06)",
                  color: activeTab === tab.id ? "#ffffff" : "#cbd5e1",
                  border: activeTab === tab.id ? "1px solid #a855f7" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Test Cards Grid */}
          {pagedTests.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 32 }}>
              {pagedTests.map((t) => {
                const rawNum = t.id.replace(/\D/g, "");
                const num = parseInt(rawNum, 10) || 1;
                const acadItem = t.sections?.reading?.routerModule?.find(m => m.type === "read_academic");
                const domainTitle = acadItem?.passageTitle ? acadItem.passageTitle.replace(/^Academic Passage:\s*/, "") : "Academic Practice";

                return (
                  <motion.div
                    key={t.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 22,
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <span style={{ background: "rgba(124,58,237,0.2)", color: "#c084fc", border: "1px solid rgba(192,132,252,0.3)", padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 900 }}>
                          TEST #{num}
                        </span>
                        <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                          <Clock size={13} /> 116 mins (1h 56m)
                        </span>
                      </div>

                      <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", margin: "0 0 6px 0", lineHeight: 1.4 }}>
                        {t.title}
                      </h3>

                      <div style={{ fontSize: 13, color: "#38bdf8", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <BookOpen size={14} />
                        <span>Domain: {domainTitle}</span>
                      </div>

                      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 14px", marginBottom: 18, fontSize: 12, color: "#cbd5e1", lineHeight: 1.6 }}>
                        <div>• <strong>Reading:</strong> 150–250 Word Academic + C-Test (Adaptive)</div>
                        <div>• <strong>Listening:</strong> Dialogues &amp; Lectures (Adaptive)</div>
                        <div>• <strong>Writing &amp; Speaking:</strong> Groq Llama 3.3 Evaluated</div>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/toefl/test/${t.id}`)}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: 14,
                        padding: "12px",
                        fontWeight: 800,
                        fontSize: 14,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
                      }}
                    >
                      <Play size={16} fill="#ffffff" /> Launch Practice Test #{num}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "48px 20px", color: "#94a3b8" }}>
              <HelpCircle size={48} color="#64748b" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>No matching TOEFL tests found</h3>
              <p style={{ fontSize: 14 }}>Try adjusting your search keywords or filter tab selection.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "none", borderRadius: 10, padding: "8px 18px", fontSize: 13, fontWeight: 700, marginTop: 12, cursor: "pointer" }}
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20 }}>
              <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>
                Page {currentPageSafe} of {totalPages} ({filteredTests.length} Total Tests)
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  disabled={currentPageSafe === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  style={{
                    background: currentPageSafe === 1 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
                    color: currentPageSafe === 1 ? "#64748b" : "#ffffff",
                    border: "none",
                    borderRadius: 10,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: currentPageSafe === 1 ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <ChevronLeft size={16} /> Previous Page
                </button>

                {Array.from({ length: totalPages }, (_, pIdx) => pIdx + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: currentPageSafe === p ? "#7c3aed" : "rgba(255,255,255,0.06)",
                      color: currentPageSafe === p ? "#ffffff" : "#cbd5e1",
                      border: currentPageSafe === p ? "1px solid #a855f7" : "none",
                      fontSize: 13,
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={currentPageSafe === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  style={{
                    background: currentPageSafe === totalPages ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.1)",
                    color: currentPageSafe === totalPages ? "#64748b" : "#ffffff",
                    border: "none",
                    borderRadius: 10,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: currentPageSafe === totalPages ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  Next Page <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── SCORE CONVERTER TOOL ── */}
        <div id="score-converter" style={{ background: "rgba(30,41,59,0.85)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "28px", padding: "36px", marginBottom: "48px", boxShadow: "0 12px 40px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
              <Calculator size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Official 2026 TOEFL iBT Score Converter</h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Map TOEFL 1.0 – 6.0 Band scores to IELTS (0–9), CEFR levels, and legacy 0–120 score reports</p>
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1" }}>Select TOEFL Band Score:</span>
              <span style={{ fontSize: 32, fontWeight: 900, color: "#c084fc" }}>{selectedScore.toFixed(1)} / 6.0</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="6.0"
              step="0.5"
              value={selectedScore}
              onChange={(e) => setSelectedScore(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#7c3aed", height: 10, cursor: "pointer" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>CEFR Equivalent</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", marginTop: 6 }}>{cefrEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>IELTS Equivalent</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", marginTop: 6 }}>Band {ieltsEquiv}</div>
            </div>
            <div style={{ background: "rgba(15,23,42,0.7)", padding: 20, borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", fontWeight: 800 }}>Comparable 0–120 Score</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#facc15", marginTop: 6 }}>{oldScaleEquiv} / 120</div>
            </div>
          </div>
        </div>

        {/* ── 2026 FORMAT SPECIFICATIONS vs LEGACY FORMAT ── */}
        <div style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>Key Specifications: 2026 Format vs Legacy Format</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                  <th style={{ padding: 14 }}>Feature</th>
                  <th style={{ padding: 14 }}>Old TOEFL iBT</th>
                  <th style={{ padding: 14, color: "#c084fc" }}>Current 2026 TOEFL iBT Suite</th>
                </tr>
              </thead>
              <tbody style={{ color: "#cbd5e1" }}>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: 14, fontWeight: 700 }}>Scoring Scale</td>
                  <td style={{ padding: 14 }}>0–120 total points</td>
                  <td style={{ padding: 14, color: "#4ade80", fontWeight: 800 }}>1.0 – 6.0 Section &amp; Overall Band Scale</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: 14, fontWeight: 700 }}>Reading &amp; Listening Engine</td>
                  <td style={{ padding: 14 }}>Linear static passages</td>
                  <td style={{ padding: 14, color: "#38bdf8", fontWeight: 800 }}>Multistage Adaptive (Theta-routed Stage 2)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ padding: 14, fontWeight: 700 }}>Academic Reading Passages</td>
                  <td style={{ padding: 14 }}>Long 700-word passages</td>
                  <td style={{ padding: 14, color: "#facc15", fontWeight: 800 }}>Concise 150–250 Word Authentic Academic Passages</td>
                </tr>
                <tr>
                  <td style={{ padding: 14, fontWeight: 700 }}>Writing &amp; Speaking AI Evaluation</td>
                  <td style={{ padding: 14 }}>Human raters only (weeks wait)</td>
                  <td style={{ padding: 14, color: "#c084fc", fontWeight: 800 }}>Instant Groq Llama 3.3 AI ETS 0–5 Rubric Grading</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
