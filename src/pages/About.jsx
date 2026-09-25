import React from "react";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Globe,
  ArrowRight
} from "lucide-react";
import "../styles/legal.css";

const FEATURES = [
  {
    icon: BrainCircuit,
    color: "#2563eb",
    title: "AI-Powered Evaluation & Feedback",
    description:
      "Instant, criterion-matched grading for writing essays, speaking responses, and mock tests across IELTS, TOEFL, GRE, PTE, DET, and more."
  },
  {
    icon: Target,
    color: "#8b5cf6",
    title: "Realistic Computer-Based Testing (CBT)",
    description:
      "Simulate exact exam interfaces, timing controls, section navigation, and question types for 13 major entrance and language proficiency exams."
  },
  {
    icon: Zap,
    color: "#06b6d4",
    title: "Adaptive Learning & Analytics",
    description:
      "Granular weakness analysis, subskill breakdowns, score tracking, and real-time performance metrics to maximize score potential."
  },
  {
    icon: BookOpen,
    color: "#10b981",
    title: "Intelligent Study Planner",
    description:
      "Custom study schedules tailored to your target exam date, current band/percentile level, and available daily practice hours."
  },
  {
    icon: ShieldCheck,
    color: "#f59e0b",
    title: "Independent & Transparent Content",
    description:
      "Carefully authored practice tests and study materials designed to reflect authentic exam formats without copyright infringement."
  },
  {
    icon: Globe,
    color: "#ec4899",
    title: "Global Student Community",
    description:
      "Join thousands of test takers preparing for university admissions, study abroad goals, and competitive career benchmarks worldwide."
  }
];

const EXAMS_COVERED = [
  "IELTS Academic & General",
  "Duolingo English Test (DET)",
  "TOEFL iBT",
  "PTE Academic",
  "GRE General Test",
  "GMAT Focus Edition",
  "Digital SAT",
  "ACT Exam",
  "CAT (MBA Entrance)",
  "GATE Engineering",
  "JEE Main & Advanced",
  "NEET Medical Entrance",
  "CLAT Law Entrance"
];

export default function About() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        {/* Hero Section */}
        <div className="legal-hero" style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className="legal-hero-badge">About Knarrow</div>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 900, letterSpacing: "-0.5px" }}>
            Empowering Students with Intelligent Exam Preparation
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "800px", margin: "16px auto 0", lineHeight: 1.7 }}>
            Knarrow is an all-in-one AI test preparation platform engineered to help students, professionals, and study-abroad aspirants achieve target scores across 13 major global examinations.
          </p>
        </div>

        {/* Story & Mission Card */}
        <div className="legal-card" style={{ padding: "36px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "center" }}>
            <div>
              <span style={{ color: "#2563eb", fontWeight: 800, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
                Our Mission
              </span>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "8px 0 16px" }}>
                Democratizing High-Quality Test Preparation
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "16px" }}>
                Traditional coaching centers and high-cost test prep services leave millions of ambitious students without affordable, personalized feedback. Knarrow was built to bridge this gap by harnessing advanced Artificial Intelligence and computer-based test simulation technology.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Whether preparing for study abroad language proficiency tests (IELTS, TOEFL, PTE, DET), graduate admissions (GRE, GMAT), undergraduate college entrance (SAT, ACT), or competitive national exams (CAT, GATE, JEE, NEET, CLAT), Knarrow provides realistic practice, instant scoring, and actionable feedback.
              </p>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(37,99,235,0.2)",
              borderRadius: "20px",
              padding: "28px"
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px", color: "var(--text)" }}>
                Key Platform Metrics
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2563eb" }}>13+</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Supported Exams</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#8b5cf6" }}>100+</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Full Mock Suites</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#06b6d4" }}>24/7</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>AI Evaluation</div>
                </div>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#10b981" }}>Instant</div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Score Feedback</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Knarrow */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textAlign: "center", marginBottom: "32px" }}>
            Why Students Choose Knarrow
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="legal-card"
                  style={{
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                  }}
                >
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `${feature.color}15`,
                    color: feature.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>{feature.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supported Examinations */}
        <div className="legal-card" style={{ padding: "32px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "12px" }}>
            Comprehensive Examination Coverage
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.6 }}>
            Knarrow provides tailored mock tests, practice centers, and AI scoring models specifically optimized for each unique exam format and scoring rubric:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
            {EXAMS_COVERED.map((exam, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{exam}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Affiliation Disclaimer */}
        <div className="legal-highlight" style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
            <strong>Independent Platform Notice:</strong> Knarrow is an independent educational technology platform. Knarrow is not affiliated with, endorsed by, or partnered with ETS, GMAC, NTA, IDP, British Council, Cambridge Assessment, College Board, Duolingo, Pearson, or any official examination governing body. All product names, trademarks, and registered trademarks belong to their respective holders.
          </p>
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: "center",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          padding: "40px",
          borderRadius: "24px",
          color: "#ffffff"
        }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "12px" }}>
            Ready to Accelerate Your Exam Prep?
          </h2>
          <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 24px" }}>
            Start practicing with realistic mock tests, intelligent AI scoring, and tailored study tools today.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/register">
              <button style={{
                background: "#ffffff",
                color: "#2563eb",
                padding: "14px 28px",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}>
                Get Started Free <ArrowRight size={18} />
              </button>
            </Link>
            <Link to="/pricing">
              <button style={{
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "14px",
                fontWeight: 800,
                fontSize: "1rem",
                border: "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer"
              }}>
                View Pricing Plans
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
