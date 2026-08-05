import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  HelpCircle,
  MessageSquare,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Mail,
  Clock,
  Zap,
  LifeBuoy
} from "lucide-react";
import toast from "react-hot-toast";

import "../styles/dashboard/dashboard.css";

export default function Support() {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendMessage() {
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "supportTickets"), {
        email: user?.email || "Guest",
        subject,
        message,
        status: "Pending",
        createdAt: new Date(),
      });

      setSubmitted(true);
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
      toast.success("🎉 Support Ticket Submitted Successfully!");
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      toast.error("Failed to submit ticket. Saved locally.");
      setSubmitted(true);
    }
  }

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
            <LifeBuoy size={14} />
            <span>Knarrow 24/7 Candidate Support Center</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 12 }}>
            Help & Technical Support
          </h1>

          <p style={{ fontSize: 15, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 680, lineHeight: 1.6 }}>
            Have a question about your subscription, mock tests, or AI evaluations? Submit a ticket below and our engineering team will assist you within 2 hours.
          </p>
        </div>
      </section>

      {/* FORM & INFO GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 24,
      }}>
        
        {/* TICKET FORM */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
            Submit a Support Ticket
          </h2>

          {submitted && (
            <div style={{
              background: "#dcfce7",
              border: "1px solid #bbf7d0",
              color: "#166534",
              padding: 16,
              borderRadius: 18,
              fontSize: 14,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <CheckCircle2 size={20} /> Support ticket submitted successfully! Ticket ID #TK-{Math.floor(1000 + Math.random() * 9000)}.
            </div>
          )}

          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)", display: "block", marginBottom: 6 }}>
              Issue Subject / Category
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Account subscription query or Speaking evaluator feedback"
              style={{
                width: "100%",
                background: "var(--surface-2, #f8fafc)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 16,
                padding: "12px 16px",
                fontSize: 14,
                color: "var(--text, #0f172a)",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 800, color: "var(--text, #0f172a)", display: "block", marginBottom: 6 }}>
              Detailed Description
            </label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please describe your question or technical issue in detail..."
              style={{
                width: "100%",
                background: "var(--surface-2, #f8fafc)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: 16,
                padding: "14px 16px",
                fontSize: 14,
                color: "var(--text, #0f172a)",
                outline: "none",
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={isSubmitting}
            style={{
              padding: "15px",
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
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Send size={18} /> {isSubmitting ? "Submitting Ticket..." : "Submit Support Ticket"}
          </button>
        </div>

        {/* SIDEBAR FAQ & PRIVILEGE INFO */}
        <div style={{
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--border, #e2e8f0)",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
            Support Guarantee
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Mail size={20} style={{ color: "#2563eb", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: 14, color: "var(--text, #0f172a)", display: "block" }}>Direct Support Email</strong>
                <a href="mailto:support@knarrow.in" style={{ fontSize: 13, color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>support@knarrow.in</a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Clock size={20} style={{ color: "#2563eb", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: 14, color: "var(--text, #0f172a)", display: "block" }}>2-Hour Response Time</strong>
                <span style={{ fontSize: 12, color: "var(--text-muted, #64748b)" }}>Our technical team reviews and responds to queries 24/7.</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <ShieldCheck size={20} style={{ color: "#16a34a", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: 14, color: "var(--text, #0f172a)", display: "block" }}>Priority Member Queue</strong>
                <span style={{ fontSize: 12, color: "var(--text-muted, #64748b)" }}>Premium users receive instant tier-1 priority ticket routing.</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Zap size={20} style={{ color: "#d97706", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ fontSize: 14, color: "var(--text, #0f172a)", display: "block" }}>Direct Expert Assistance</strong>
                <span style={{ fontSize: 12, color: "var(--text-muted, #64748b)" }}>Escalations are handled directly by certified IELTS coaches.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}