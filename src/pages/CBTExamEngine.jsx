import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Headphones, PenSquare, Mic,
  Clock, ChevronRight, Shuffle, GraduationCap,
  Shield, AlertTriangle, CheckCircle2, Play,
} from "lucide-react";

import MockReading from "./MockReading";
import MockListening from "./MockListening";
import MockWriting from "./MockWriting";
import MockSpeaking from "./MockSpeaking";

import academicTests from "../data/reading/academic/academicTests";
import generalTests from "../data/reading/general/generalTests";
import listeningTests from "../data/listening/tests";
import writingTests from "../data/writing/tests";
import speakingTests from "../data/speaking/tests";

import { saveExamSession } from "../services/examSession";
import { updateStreak } from "../services/streakService";

function rand(arr) {
  return Math.floor(Math.random() * arr.length);
}

// ─── Section config ──────────────────────────────────────────────────────────
const SECTIONS = [
  { key: "listening", label: "Listening", icon: Headphones, color: "#8b5cf6", time: "30 min", questions: 40 },
  { key: "reading",   label: "Reading",   icon: BookOpen,   color: "#2563eb", time: "60 min", questions: 40 },
  { key: "writing",   label: "Writing",   icon: PenSquare,  color: "#f97316", time: "60 min", questions: "2 tasks" },
  { key: "speaking",  label: "Speaking",  icon: Mic,        color: "#22c55e", time: "15 min", questions: "3 parts" },
];

export default function CBTExamEngine({ examType = "academic" }) {
  const navigate = useNavigate();

  // Pick random tests once on mount
  const testIds = useMemo(() => ({
    readingIndex:   rand(examType === "academic" ? academicTests : generalTests),
    listeningIndex: rand(listeningTests),
    writingId:      writingTests[rand(writingTests)].id,
    speakingId:     speakingTests[rand(speakingTests)].id,
  }), [examType]);

  const [stage, setStage] = useState("briefing"); // briefing | listening | reading | writing | speaking
  const [results, setResults] = useState({ listening: null, reading: null, writing: null, speaking: null });

  function advance(section, band) {
    const next = { listening: "reading", reading: "writing", writing: "speaking" };
    setResults(prev => ({ ...prev, [section]: band }));
    if (next[section]) {
      setStage(next[section]);
    } else {
      // speaking done → finish
      finishExam({ ...results, speaking: band });
    }
  }

  function finishExam(finalResults) {
    updateStreak();
    const overall = (
      (Number(finalResults.listening || 0) + Number(finalResults.reading || 0) +
       Number(finalResults.writing || 0) + Number(finalResults.speaking || 0)) / 4
    ).toFixed(1);
    saveExamSession({ ...finalResults, overall, completedAt: new Date().toLocaleString() });
    navigate("/exam-results");
  }

  // ─── Active section renderers ────────────────────────────────────────────
  if (stage === "listening") {
    return (
      <>
        <SectionBanner section={SECTIONS[0]} current={1} total={4} />
        <MockListening
          testId={testIds.listeningIndex}
          mode="cbt"
          onComplete={(band) => advance("listening", band)}
        />
      </>
    );
  }

  if (stage === "reading") {
    const readingId = examType === "academic"
      ? academicTests[testIds.readingIndex]?.id
      : generalTests[testIds.readingIndex]?.id;
    return (
      <>
        <SectionBanner section={SECTIONS[1]} current={2} total={4} />
        <MockReading
          mode="cbt"
          forcedTestId={String(readingId)}
          onComplete={(band) => advance("reading", band)}
        />
      </>
    );
  }

  if (stage === "writing") {
    return (
      <>
        <SectionBanner section={SECTIONS[2]} current={3} total={4} />
        <MockWriting
          forcedTestId={testIds.writingId}
          onComplete={(band) => advance("writing", band)}
        />
      </>
    );
  }

  if (stage === "speaking") {
    return (
      <>
        <SectionBanner section={SECTIONS[3]} current={4} total={4} />
        <MockSpeaking
          forcedTestId={testIds.speakingId}
          onComplete={(band) => advance("speaking", band)}
        />
      </>
    );
  }

  // ─── Briefing screen ─────────────────────────────────────────────────────
  return <BriefingScreen examType={examType} onStart={() => setStage("listening")} />;
}

// ─── Section progress banner ─────────────────────────────────────────────────
function SectionBanner({ section, current, total }) {
  const Icon = section.icon;
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 999,
      background: section.color,
      padding: "10px 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "white" }}>
        <Icon size={20} />
        <span style={{ fontWeight: 700, fontSize: "16px" }}>
          IELTS CBT — {section.label}
        </span>
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        {Array.from({ length: total }, (_, i) => (
          <div key={i} style={{
            width: "28px", height: "6px", borderRadius: "3px",
            background: i < current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
          }} />
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: 600 }}>
        Section {current} of {total}
      </div>
    </div>
  );
}

// ─── Briefing screen ─────────────────────────────────────────────────────────
function BriefingScreen({ examType, onStart }) {
  const isAcademic = examType === "academic";
  const label = isAcademic ? "Academic" : "General Training";

  const rules = [
    "This is a full IELTS CBT simulation — treat it like the real exam.",
    "Do not leave the page or refresh during the test.",
    "Each section has a strict time limit. The test auto-advances when time expires.",
    "Listening comes first, followed by Reading, Writing, then Speaking.",
    "Tests are randomly assigned each session — no two exams are the same.",
    "Your results will be saved automatically on completion.",
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 10%, rgba(99,102,241,.12), transparent 40%), radial-gradient(circle at 80% 90%, rgba(59,130,246,.10), transparent 40%), var(--bg)",
      fontFamily: "Inter, sans-serif",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 20px",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{ width: "100%", maxWidth: "860px" }}
      >
        {/* Header card */}
        <div style={{
          background: `linear-gradient(135deg, ${isAcademic ? "#1e3a8a, #2563eb, #4f46e5" : "#065f46, #059669, #0891b2"})`,
          borderRadius: "28px",
          padding: "44px 48px",
          color: "white",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
          boxShadow: `0 30px 70px ${isAcademic ? "rgba(37,99,235,.30)" : "rgba(5,150,105,.30)"}`,
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,.06)", right: "-100px", top: "-100px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,.04)", left: "-60px", bottom: "-60px", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 16px", borderRadius: "999px", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.20)", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", marginBottom: "20px" }}>
              <GraduationCap size={14} />
              IELTS {label} — Computer Based Test
            </div>

            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 16px" }}>
              Full Mock Exam
            </h1>
            <p style={{ fontSize: "1rem", opacity: 0.88, lineHeight: 1.7, maxWidth: "560px", margin: 0 }}>
              A complete IELTS simulation with randomly selected tests across all four skills. Finish all sections to receive your estimated band score.
            </p>

            {/* Total time */}
            <div style={{ display: "flex", gap: "20px", marginTop: "28px", flexWrap: "wrap" }}>
              {[
                { icon: Clock, label: "Total Time", value: "2h 45min" },
                { icon: Shuffle, label: "Test Selection", value: "Randomised" },
                { icon: Shield, label: "Format", value: "Official CBT" },
              ].map(({ icon: I, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "14px", background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.15)" }}>
                  <I size={16} />
                  <div>
                    <div style={{ fontSize: "11px", opacity: 0.7, letterSpacing: "0.5px" }}>{label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 700 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section breakdown */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "24px" }}>
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.key} style={{
                background: "var(--surface, white)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: "18px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                boxShadow: "0 4px 16px rgba(15,23,42,.05)",
              }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text, #0f172a)" }}>{s.label}</span>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: s.color, padding: "3px 10px", borderRadius: "999px", background: `${s.color}14` }}>Part {i + 1}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-secondary, #64748b)", marginTop: "4px", display: "flex", gap: "12px" }}>
                    <span>⏱ {s.time}</span>
                    <span>📝 {s.questions} {typeof s.questions === "number" ? "questions" : ""}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rules */}
        <div style={{
          background: "var(--surface, white)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: "18px",
          padding: "24px 28px",
          marginBottom: "28px",
          boxShadow: "0 4px 16px rgba(15,23,42,.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <AlertTriangle size={18} color="#f59e0b" />
            <span style={{ fontWeight: 700, fontSize: "15px", color: "var(--text, #0f172a)" }}>Important Instructions</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={15} color="#22c55e" style={{ marginTop: "2px", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: "var(--text-secondary, #64748b)", lineHeight: 1.6 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -3 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          style={{
            width: "100%",
            padding: "20px",
            border: "none",
            borderRadius: "18px",
            background: isAcademic ? "linear-gradient(135deg, #2563eb, #4f46e5)" : "linear-gradient(135deg, #059669, #0891b2)",
            color: "white",
            fontSize: "17px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            boxShadow: `0 20px 50px ${isAcademic ? "rgba(37,99,235,.30)" : "rgba(5,150,105,.30)"}`,
          }}
        >
          <Play size={20} />
          Begin IELTS {label} Mock Exam
          <ChevronRight size={20} />
        </motion.button>

        <p style={{ textAlign: "center", marginTop: "14px", fontSize: "13px", color: "var(--text-secondary, #94a3b8)" }}>
          Starting with Listening → Reading → Writing → Speaking
        </p>
      </motion.div>
    </div>
  );
}
