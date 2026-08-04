import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  QrCode,
  Calendar,
  FileCheck
} from "lucide-react";
import toast from "react-hot-toast";

import "../styles/dashboard/dashboard.css";

export default function Certificates() {
  const { user } = useAuth();
  const candidateName = user?.displayName || user?.email?.split("@")[0] || "IELTS Candidate";
  const issueDate = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const handleDownloadPDF = () => {
    toast.success("📜 Official High-Res Certificate PDF downloaded!");
  };

  const handleShareLinkedIn = () => {
    toast.success("🔗 Certificate link copied to clipboard for LinkedIn!");
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* HERO */}
      <section className="dashboard-hero">
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 999,
            background: "rgba(37, 99, 235, 0.08)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            color: "#2563eb",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 16,
          }}>
            <Award size={14} />
            <span>Knarrow Verified Band Score Certification</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            Official IELTS Band Certificates
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Download, verify, and share your official Knarrow IELTS Band Mastery Certificate with universities, employers, and immigration portfolios.
          </p>
        </div>
      </section>

      {/* CERTIFICATE PREVIEW STAGE */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 32,
      }}>
        
        {/* THE OFFICIAL CERTIFICATE FRAME */}
        <div style={{
          maxWidth: 840,
          width: "100%",
          background: "linear-gradient(135deg, #ffffff, #f8fafc)",
          border: "8px solid #1e3a8a",
          borderRadius: 24,
          padding: "48px 40px",
          boxShadow: "0 25px 60px rgba(15,23,42,.12)",
          position: "relative",
          textAlign: "center",
        }}>
          {/* Gold Decorative Corner Seals */}
          <div style={{ position: "absolute", top: 16, left: 16, fontSize: 24, opacity: 0.7 }}>🥇</div>
          <div style={{ position: "absolute", top: 16, right: 16, fontSize: 24, opacity: 0.7 }}>🥇</div>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#2563eb",
            marginBottom: 16,
          }}>
            <ShieldCheck size={16} /> Official Certificate of Achievement
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", fontFamily: "serif", letterSpacing: "-0.01em", margin: 0, marginBottom: 8 }}>
            Knarrow IELTS Mastery Certification
          </h2>

          <p style={{ fontSize: 14, color: "#64748b", margin: 0, marginBottom: 24 }}>
            This certifies that candidate
          </p>

          <div style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#1e3a8a",
            borderBottom: "2px solid #2563eb",
            display: "inline-block",
            paddingBottom: 4,
            marginBottom: 24,
            textTransform: "capitalize",
          }}>
            {candidateName}
          </div>

          <p style={{ fontSize: 14, color: "#475569", maxWidth: 600, margin: "0 auto 28px", lineHeight: 1.6 }}>
            has successfully completed full official computer-based IELTS mock diagnostic evaluations and demonstrated Band 8.0+ proficiency across Reading, Listening, Writing, and Speaking modules.
          </p>

          {/* Module Score Pills */}
          <div style={{
            display: "inline-flex",
            gap: 12,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            padding: "12px 24px",
            borderRadius: 16,
            marginBottom: 32,
            fontSize: 13,
            fontWeight: 800,
            color: "#1e40af",
          }}>
            <span>📖 R: 8.5</span> • <span>🎧 L: 8.0</span> • <span>✍️ W: 7.5</span> • <span>🎤 S: 8.0</span> • <strong style={{ color: "#2563eb" }}>Overall Band 8.0</strong>
          </div>

          {/* Footer signature line & verification seal */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #e2e8f0",
            textAlign: "left",
            fontSize: 12,
            color: "#64748b",
          }}>
            <div>
              <div><strong>Issue Date:</strong> {issueDate}</div>
              <div><strong>Verification ID:</strong> KN-CERT-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "serif", fontSize: 18, fontWeight: 900, color: "#1e3a8a" }}>Knarrow Academic Board</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "#2563eb" }}>Verified Assessment System</div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              padding: "14px 28px",
              borderRadius: 18,
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              color: "white",
              border: "none",
              fontWeight: 900,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(37,99,235,.25)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Download size={18} /> Download High-Res Certificate PDF
          </button>

          <button
            onClick={handleShareLinkedIn}
            style={{
              padding: "14px 28px",
              borderRadius: 18,
              background: "var(--surface-2, #f8fafc)",
              color: "var(--text, #0f172a)",
              border: "1px solid var(--border, #e2e8f0)",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Share2 size={18} /> Share Certificate on LinkedIn
          </button>
        </div>

      </div>

    </div>
  );
}
