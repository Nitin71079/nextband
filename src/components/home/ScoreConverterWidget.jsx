import React, { useState } from "react";
import { ArrowRightLeft, Sparkles, Award, Calculator, TrendingUp } from "lucide-react";

export default function ScoreConverterWidget() {
  const [sourceExam, setSourceExam] = useState("IELTS");
  const [scoreVal, setScoreVal] = useState(7.5);

  // Conversion table matrix
  const getConversions = (exam, val) => {
    let num = parseFloat(val) || 7.0;

    if (exam === "IELTS") {
      // IELTS Band (0-9)
      const det = Math.min(160, Math.round(num * 17.5 + 5));
      const toefl = Math.min(120, Math.round(num * 13 + 5));
      const pte = Math.min(90, Math.round(num * 10 + 10));
      return { IELTS: `${num} Band`, DET: `${det} / 160`, TOEFL: `${toefl} / 120`, PTE: `${pte} / 90` };
    } else if (exam === "DET") {
      // DET (10-160)
      const ielts = (num / 17.5).toFixed(1);
      const toefl = Math.min(120, Math.round(num * 0.75));
      const pte = Math.min(90, Math.round(num * 0.55));
      return { IELTS: `${ielts} Band`, DET: `${num} / 160`, TOEFL: `${toefl} / 120`, PTE: `${pte} / 90` };
    } else {
      return { IELTS: "7.5 Band", DET: "135 / 160", TOEFL: "102 / 120", PTE: "76 / 90" };
    }
  };

  const converted = getConversions(sourceExam, scoreVal);

  return (
    <div id="score-converter" style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,41,59,0.85))", border: "2px solid #38bdf8", borderRadius: 28, padding: 32, maxWidth: 900, margin: "0 auto 60px", boxShadow: "0 20px 60px rgba(2,132,199,0.25)" }}>
      
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{ background: "rgba(56,189,248,0.2)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.4)", padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>
          <Calculator size={13} /> INTERACTIVE SCORE CONVERTER TOOL
        </span>
        <h3 style={{ fontSize: 22, fontWeight: 900, color: "#ffffff", margin: "10px 0 4px 0" }}>
          Convert Your Target Score Across Global Exams
        </h3>
        <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>
          Compare equivalent score standards across IELTS, DET, TOEFL, and PTE Academic
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", display: "block", marginBottom: 6 }}>Select Exam:</label>
          <select
            value={sourceExam}
            onChange={(e) => setSourceExam(e.target.value)}
            style={{ width: "100%", background: "#0f172a", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "10px 14px", fontWeight: 800, fontSize: 14 }}
          >
            <option value="IELTS">IELTS Academic (0 - 9.0)</option>
            <option value="DET">Duolingo DET (10 - 160)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: "#38bdf8", display: "block", marginBottom: 6 }}>Enter Score:</label>
          <input
            type="number"
            step="0.5"
            value={scoreVal}
            onChange={(e) => setScoreVal(e.target.value)}
            style={{ width: "100%", background: "#0f172a", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "10px 14px", fontWeight: 800, fontSize: 14 }}
          />
        </div>
      </div>

      {/* Conversion Output Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {Object.entries(converted).map(([exam, score]) => (
          <div key={exam} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 16, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8" }}>{exam} Equivalent</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", margin: "4px 0" }}>{score}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
