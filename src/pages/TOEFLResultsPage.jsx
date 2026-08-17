import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award, Sparkles, CheckCircle2, ArrowRight, RefreshCw, BookOpen,
  Headphones, PenTool, Mic, ShieldCheck, ChevronRight, FileText,
  Calendar, Layers, Zap, AlertTriangle
} from "lucide-react";
import { toeflToIelts, toeflToCEFR, toeflToOldScale, calculateTOEFLAnalytics } from "../utils/toeflScoreCalculator";

export default function TOEFLResultsPage() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(`toefl_result_${resultId}`);
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch (err) {
        console.error(err);
      }
    }
  }, [resultId]);

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", padding: "60px 24px", textAlign: "center" }}>
        <h2>No TOEFL test result found.</h2>
        <button
          onClick={() => navigate("/toefl")}
          style={{ background: "#7c3aed", color: "#ffffff", border: "none", borderRadius: 12, padding: "12px 24px", marginTop: 16, cursor: "pointer", fontWeight: 800 }}
        >
          Return to TOEFL Hub
        </button>
      </div>
    );
  }

  const { overallScore, scoreRangeText, confidence, readingBand, listeningBand, writingBand, speakingBand, writingFeedback, speakingFeedback } = result;

  const ieltsEquiv = toeflToIelts(overallScore);
  const cefrEquiv = toeflToCEFR(overallScore);
  const oldScaleEquiv = toeflToOldScale(overallScore);

  const analytics = calculateTOEFLAnalytics({});

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#ffffff", fontFamily: "Inter, sans-serif", padding: "60px 24px 80px" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* ── HEADER BADGE ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)", padding: "6px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800 }}>
            <CheckCircle2 size={14} style={{ display: "inline", marginRight: 6 }} /> TOEFL iBT 2026 AI PREDICTED SCORE REPORT
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, margin: "16px 0 8px 0" }}>
            Your 2026 TOEFL iBT Exam Results
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Test Date: {new Date(result.date).toLocaleDateString()}</p>
        </div>

        {/* ── OVERALL PREDICTED SCORE CARD ── */}
        <div style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #2563eb 100%)", borderRadius: 28, padding: "40px", textAlign: "center", marginBottom: 40, boxShadow: "0 15px 40px rgba(124,58,237,0.3)" }}>
          <div style={{ fontSize: 13, color: "#e9d5ff", textTransform: "uppercase", fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>
            Predicted TOEFL iBT Score
          </div>
          <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 1, marginBottom: 8 }}>
            {overallScore.toFixed(1)} <span style={{ fontSize: 32, opacity: 0.8 }}>/ 6.0</span>
          </div>

          <div style={{ fontSize: 15, fontWeight: 800, color: "#facc15", marginBottom: 20 }}>
            Estimated Range: {scoreRangeText || `${(overallScore - 0.5).toFixed(1)} – ${(overallScore + 0.5).toFixed(1)}`} ({confidence || "High Confidence"})
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "#e9d5ff" }}>CEFR Level</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>{cefrEquiv}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#e9d5ff" }}>IELTS Equivalent</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#4ade80" }}>Band {ieltsEquiv}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#e9d5ff" }}>Legacy 0–120 Score</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#facc15" }}>{oldScaleEquiv} / 120</div>
            </div>
          </div>
        </div>

        {/* ── 4 SECTION SCORES GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 40 }}>
          {[
            { title: "📖 Reading", score: readingBand, color: "#3b82f6" },
            { title: "🎧 Listening", score: listeningBand, color: "#8b5cf6" },
            { title: "✍️ Writing", score: writingBand, color: "#f59e0b" },
            { title: "🎙️ Speaking", score: speakingBand, color: "#10b981" },
          ].map((s) => (
            <div key={s.title} style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 22, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#cbd5e1", marginBottom: 8 }}>{s.title}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: s.color }}>{s.score.toFixed(1)}</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>out of 6.0</div>
            </div>
          ))}
        </div>

        {/* ── DETAILED SUBSKILL DIMENSION BREAKDOWN ── */}
        <div style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 20, color: "#ffffff" }}>Skill Dimension Analytics</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {/* Reading Breakdown */}
            <div style={{ background: "#0f172a", padding: 18, borderRadius: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#38bdf8", marginBottom: 10 }}>📖 Reading Skills</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 6 }}>
                <div>Complete Words: <strong>{analytics.reading.completeWordsPct}%</strong></div>
                <div>Read Daily Life: <strong>{analytics.reading.dailyLifePct}%</strong></div>
                <div>Academic Passage: <strong>{analytics.reading.academicPassagePct}%</strong></div>
                <div>Vocabulary: <strong>{analytics.reading.vocabularyPct}%</strong></div>
                <div>Inference: <strong>{analytics.reading.inferencePct}%</strong></div>
              </div>
            </div>

            {/* Listening Breakdown */}
            <div style={{ background: "#0f172a", padding: 18, borderRadius: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#c084fc", marginBottom: 10 }}>🎧 Listening Skills</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 6 }}>
                <div>Choose Response: <strong>{analytics.listening.chooseResponsePct}%</strong></div>
                <div>Conversations: <strong>{analytics.listening.conversationPct}%</strong></div>
                <div>Announcements: <strong>{analytics.listening.announcementPct}%</strong></div>
                <div>Academic Talks: <strong>{analytics.listening.academicTalkPct}%</strong></div>
              </div>
            </div>

            {/* Writing Breakdown */}
            <div style={{ background: "#0f172a", padding: 18, borderRadius: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#f59e0b", marginBottom: 10 }}>✍️ Writing Tasks (0–5 Rubric)</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 6 }}>
                <div>Build Sentence: <strong>{analytics.writing.buildSentenceScore} / 10</strong></div>
                <div>Email Task Rubric: <strong>{writingFeedback?.email?.rawTaskScore ?? 4} / 5</strong></div>
                <div>Discussion Rubric: <strong>{writingFeedback?.discussion?.rawTaskScore ?? 4} / 5</strong></div>
                <div>Social Register: <strong>{analytics.writing.socialRegister}%</strong></div>
              </div>
            </div>

            {/* Speaking Breakdown */}
            <div style={{ background: "#0f172a", padding: 18, borderRadius: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#4ade80", marginBottom: 10 }}>🎙️ Speaking Tasks (0–5 Rubric)</div>
              <div style={{ fontSize: 13, color: "#cbd5e1", display: "flex", flexDirection: "column", gap: 6 }}>
                <div>Listen &amp; Repeat: <strong>{analytics.speaking.listenRepeatScore} / 35</strong></div>
                <div>Interview Rubric: <strong>{speakingFeedback?.rawTaskScore ?? 4} / 5</strong></div>
                <div>Pronunciation &amp; Accuracy: <strong>{analytics.speaking.pronunciation}%</strong></div>
                <div>Prosody &amp; Intonation: <strong>{analytics.speaking.prosody}%</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GROQ AI DETAILED FEEDBACK ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {writingFeedback && (
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b", marginBottom: 14 }}>✍️ AI Writing Evaluation Report (ETS 0–5 Rubric)</h3>
              {writingFeedback.email && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>
                    Email Task (Raw Score: {writingFeedback.email.rawTaskScore ?? 4}/5 · Band {writingFeedback.email.bandScore.toFixed(1)}):
                  </div>
                  <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{writingFeedback.email.feedback}</p>
                </div>
              )}
              {writingFeedback.discussion && (
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>
                    Academic Discussion (Raw Score: {writingFeedback.discussion.rawTaskScore ?? 4}/5 · Band {writingFeedback.discussion.bandScore.toFixed(1)}):
                  </div>
                  <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{writingFeedback.discussion.feedback}</p>
                </div>
              )}
            </div>
          )}

          {speakingFeedback && (
            <div style={{ background: "rgba(30,41,59,0.7)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#10b981", marginBottom: 14 }}>🎙️ AI Speaking Evaluation Report (ETS 0–5 Rubric)</h3>
              <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{speakingFeedback.feedback}</p>
              {speakingFeedback.suggestions?.length > 0 && (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#ffffff", marginBottom: 6 }}>Actionable Improvements:</div>
                  <ul style={{ color: "#94a3b8", fontSize: 13, margin: 0, paddingLeft: 20 }}>
                    {speakingFeedback.suggestions.map((s, idx) => (
                      <li key={idx} style={{ marginBottom: 4 }}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── 7-DAY PERSONALISED ACTION PLAN ── */}
        <div style={{ background: "rgba(30,41,59,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 28, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <Calendar size={22} color="#c084fc" />
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Recommended 7-Day TOEFL Study Plan</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {[
              { day: "Day 1", task: "Academic Discussion Development & 100+ Word Elaboration", color: "#38bdf8" },
              { day: "Day 2", task: "Build a Sentence Syntax & Word Ordering Drills", color: "#f59e0b" },
              { day: "Day 3", task: "Listening Inference & Academic Talk Main Idea Practice", color: "#c084fc" },
              { day: "Day 4", task: "Listen & Repeat Sentence Prosody & Rhythm Training", color: "#4ade80" },
              { day: "Day 5", task: "Email Social Register & Politeness Conventions", color: "#f43f5e" },
              { day: "Day 6", task: "Multistage Adaptive Reading Complete-the-Words Drills", color: "#a855f7" },
              { day: "Day 7", task: "Complete Full TOEFL 2026 Simulation Mock Test", color: "#3b82f6" },
            ].map((item) => (
              <div key={item.day} style={{ background: "#0f172a", padding: 14, borderRadius: 14, borderLeft: `4px solid ${item.color}` }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: item.color }}>{item.day}</div>
                <div style={{ fontSize: 13, color: "#ffffff", fontWeight: 600, marginTop: 4 }}>{item.task}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ACTION BUTTONS ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => navigate(`/toefl/test/${testId}`)}
            style={{ background: "#7c3aed", color: "#ffffff", border: "none", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <RefreshCw size={18} /> Retake TOEFL Test
          </button>
          <button
            onClick={() => navigate("/toefl")}
            style={{ background: "rgba(255,255,255,0.08)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}
          >
            Go to TOEFL Hub
          </button>
        </div>

      </div>
    </div>
  );
}
