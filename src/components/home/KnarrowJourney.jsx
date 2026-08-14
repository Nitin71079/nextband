import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Trophy, Cpu, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function KnarrowJourney() {
  const milestones = [
    {
      year: "2024",
      title: "The AI Scoring Vision",
      desc: "Founded with a mission to eliminate expensive IELTS tutoring friction by engineering precision AI feedback algorithms for Writing Task 1/2 and Speaking Band scoring.",
      icon: Cpu,
      color: "#2563eb",
    },
    {
      year: "2025",
      title: "Realistic CBT Exam Engine",
      desc: "Built authentic computer-based IELTS test environments mirroring official IDP / British Council test delivery, complete with countdown timers, passage split-views, and instant grading.",
      icon: ShieldCheck,
      color: "#8b5cf6",
    },
    {
      year: "2026",
      title: "20,000+ AI Evaluations & Beyond",
      desc: "Crossed 20,000+ AI test evaluations with candidates achieving average Band 7.5+ outcomes globally. Expanded into adaptive subscore analytics, study planners, and multiplayer games.",
      icon: Trophy,
      color: "#10b981",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(37, 99, 235, 0.1)",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              color: "var(--primary, #2563eb)",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "16px",
            }}
          >
            <Compass size={14} />
            OUR STORY &amp; VISION
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: "900", color: "var(--text)", margin: 0, letterSpacing: "-1px" }}>
            The Knarrow Journey &amp; Innovation
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "14px auto 0", lineHeight: 1.6 }}>
            Empowering test takers worldwide with high-precision AI evaluation, authentic exam simulation, and actionable band diagnostics.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ y: -6 }}
                style={{
                  background: "var(--card, #ffffff)",
                  border: "1px solid var(--border, #e2e8f0)",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "16px",
                      background: `${m.color}15`,
                      border: `1px solid ${m.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={24} color={m.color} />
                  </div>
                  <span style={{ fontSize: "14px", fontWeight: "900", color: m.color, background: `${m.color}15`, padding: "4px 14px", borderRadius: "999px" }}>
                    {m.year}
                  </span>
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text)", margin: "0 0 12px 0" }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {m.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Story CTA Strip */}
        <div
          style={{
            marginTop: "60px",
            background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(139,92,246,0.08))",
            border: "1px solid rgba(37,99,235,0.2)",
            borderRadius: "24px",
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h4 style={{ fontSize: "20px", fontWeight: "900", color: "var(--text)", margin: 0 }}>
              Join 1,000+ Candidates Achieving Target Band 7.5+
            </h4>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "6px 0 0 0" }}>
              Experience the future of IELTS computer-based practice with real-time AI scoring on official knarrow.in.
            </p>
          </div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: "var(--primary, #2563eb)",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
              }}
            >
              <Zap size={16} /> Start Free Practice <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
