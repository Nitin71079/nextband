import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, BookOpen, HelpCircle, ArrowLeft, BrainCircuit } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
      background: "var(--bg)",
      color: "var(--text)",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        maxWidth: "640px",
        width: "100%",
        textAlign: "center",
        background: "var(--card-bg, rgba(255,255,255,0.03))",
        border: "1px solid var(--border-color, rgba(255,255,255,0.1))",
        borderRadius: "28px",
        padding: "48px 32px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px",
          height: "72px",
          borderRadius: "20px",
          background: "rgba(37,99,235,0.12)",
          color: "#2563eb",
          marginBottom: "24px"
        }}>
          <BrainCircuit size={40} />
        </div>

        <h1 style={{
          fontSize: "5.5rem",
          fontWeight: 900,
          lineHeight: 1,
          margin: "0 0 12px",
          background: "linear-gradient(135deg, #2563eb, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          404
        </h1>

        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0 0 12px" }}>
          Page Not Found
        </h2>

        <p style={{
          fontSize: "1.05rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          maxWidth: "480px",
          margin: "0 auto 32px"
        }}>
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Explore our major test preparation hubs below:
        </p>

        {/* Quick Links */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "12px",
          marginBottom: "32px",
          textAlign: "left"
        }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Home size={16} color="#2563eb" /> Home
            </div>
          </Link>
          <Link to="/full-mocks" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <BookOpen size={16} color="#06b6d4" /> Mock Tests
            </div>
          </Link>
          <Link to="/pricing" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <Search size={16} color="#10b981" /> Pricing
            </div>
          </Link>
          <Link to="/help" style={{ textDecoration: "none" }}>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <HelpCircle size={16} color="#8b5cf6" /> Help Center
            </div>
          </Link>
        </div>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "14px",
            fontWeight: 800,
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 8px 20px rgba(37,99,235,0.3)"
          }}>
            <ArrowLeft size={18} /> Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
}