import { useState } from "react";
import { getBookings, cancelBooking, updateBookingStatus, processExpertAbsenceRefund } from "../services/bookingService";
import AISessionRoomModal from "../components/AISessionRoomModal";
import toast from "react-hot-toast";
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  DollarSign,
  Video,
  ShieldCheck,
  Sparkles,
  Trash2,
  RefreshCw,
  CreditCard
} from "lucide-react";

import "../styles/dashboard/dashboard.css";

export default function MySessions() {
  const [bookings, setBookings] = useState(getBookings());
  const [isAIRoomOpen, setIsAIRoomOpen] = useState(false);
  const [activeAITopic, setActiveAITopic] = useState("Speaking Practice");

  const handleSimulateTeacherOffline = (bookingId) => {
    processExpertAbsenceRefund(bookingId);
    setBookings(getBookings());
    toast.success("⚡ Expert Marked Absent: 50% Session Fee Refunded Instantly via Razorpay! AI Examiner Class Ready.");
  };

  const handleLaunchAIClass = (topic) => {
    setActiveAITopic(topic || "Speaking Practice");
    setIsAIRoomOpen(true);
  };

  return (
    <div className="dashboard-page" style={{ paddingBottom: 60 }}>
      
      {/* ── HEADER ── */}
      <section className="dashboard-hero" style={{ padding: "40px 48px" }}>
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
            marginBottom: 14,
          }}>
            <Calendar size={14} />
            <span>My Booked Coaching Sessions</span>
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0, marginBottom: 8 }}>
            My Sessions & Live Classes
          </h1>

          <p style={{ fontSize: 14, color: "var(--text-muted, #64748b)", margin: 0, maxWidth: 640 }}>
            Manage your booked 1-hour sessions. If a teacher is unavailable, launch your 1-hour AI Live Class with an automatic 50% fee refund credit!
          </p>
        </div>
      </section>

      {/* ── SESSIONS LIST ── */}
      <main style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {bookings.length === 0 ? (
          <div style={{
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, #e2e8f0)",
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(15,23,42,.04)",
          }}>
            <Calendar size={48} style={{ color: "#94a3b8", marginBottom: 12 }} />
            <h2 style={{ fontSize: 20, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
              No Sessions Booked Yet
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted, #64748b)", marginTop: 6 }}>
              Book your 1-hour session in the Experts Corner to get started.
            </p>
          </div>
        ) : (
          bookings.map((booking, index) => {
            const isTeacherOffline = booking.status?.includes("Offline") || booking.status?.includes("Teacher Unavailable");

            return (
              <div
                key={booking.id || index}
                style={{
                  background: "var(--surface, #ffffff)",
                  border: isTeacherOffline ? "2px solid #3b82f6" : "1px solid var(--border, #e2e8f0)",
                  borderRadius: 24,
                  padding: 28,
                  boxShadow: "0 10px 30px rgba(15,23,42,.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <h2 style={{ fontSize: 18, fontWeight: 900, color: "var(--text, #0f172a)", margin: 0 }}>
                        {booking.skillFocus || booking.expertRole || "1-Hour IELTS Session"}
                      </h2>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "3px 10px",
                        borderRadius: 999,
                        background: isTeacherOffline ? "#dbeafe" : "#dcfce7",
                        color: isTeacherOffline ? "#1e40af" : "#166534",
                        border: isTeacherOffline ? "1px solid #93c5fd" : "1px solid #bbf7d0",
                      }}>
                        {booking.status || "Upcoming"}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted, #64748b)", marginTop: 4 }}>
                      Tutor: <strong>{booking.expertName}</strong> • {booking.duration || 60} Mins
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text, #0f172a)" }}>
                      Fee: {booking.pricePaid || "Paid"}
                    </div>
                    {booking.paymentId && (
                      <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace" }}>
                        ID: {booking.paymentId}
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Details Row */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                  background: "var(--surface-2, #f8fafc)",
                  padding: 16,
                  borderRadius: 16,
                  border: "1px solid var(--border, #e2e8f0)",
                  fontSize: 13,
                }}>
                  <div>
                    <span style={{ color: "var(--text-muted, #64748b)", display: "block" }}>Date & Time Slot:</span>
                    <strong>{booking.date} • {booking.timeSlot}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--text-muted, #64748b)", display: "block" }}>Guarantee Policy:</span>
                    <strong style={{ color: "#16a34a" }}>50% Refund & AI Takeover Active</strong>
                  </div>
                </div>

                {/* 50% Refund & AI Takeover Banner if Teacher Offline */}
                {isTeacherOffline ? (
                  <div style={{
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    padding: 16,
                    borderRadius: 18,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <AlertCircle size={22} style={{ color: "#2563eb", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontStyle: "normal", fontWeight: 800, color: "#1e40af" }}>
                          ⚡ Teacher Unavailable — 50% Class Fee Refunded & AI Assistant Ready!
                        </div>
                        <div style={{ fontSize: 12, color: "#1e3a8a", marginTop: 2 }}>
                          Your 50% refund has been credited. Our Band 9 AI Assistant is ready to conduct your 1-hour session with zero wait time.
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLaunchAIClass(booking.skillFocus)}
                      style={{
                        padding: "12px 20px",
                        borderRadius: 14,
                        background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                        color: "white",
                        border: "none",
                        fontWeight: 900,
                        fontSize: 13,
                        cursor: "pointer",
                        boxShadow: "0 8px 20px rgba(37,99,235,.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <BrainCircuit size={16} /> Launch 1-Hour AI Live Class
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => handleLaunchAIClass(booking.skillFocus)}
                      style={{
                        padding: "10px 18px",
                        borderRadius: 14,
                        background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                        color: "white",
                        border: "none",
                        fontWeight: 800,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <BrainCircuit size={15} /> Launch AI Class Now
                    </button>

                    <button
                      onClick={() => handleSimulateTeacherOffline(booking.id || booking.expertId)}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 14,
                        background: "var(--surface-2, #f8fafc)",
                        color: "#d97706",
                        border: "1px solid #fde68a",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Simulate Teacher Offline (Test 50% Refund)
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm("Cancel this session?")) {
                          cancelBooking(booking.id || index);
                          setBookings(getBookings());
                          toast("Session cancelled.");
                        }
                      }}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 14,
                        background: "transparent",
                        color: "#ef4444",
                        border: "1px solid #fca5a5",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        marginLeft: "auto",
                      }}
                    >
                      Cancel Session
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </main>

      {/* ── AI LIVE CLASS ROOM MODAL ── */}
      <AISessionRoomModal
        isOpen={isAIRoomOpen}
        onClose={() => setIsAIRoomOpen(false)}
        topic={activeAITopic}
      />

    </div>
  );
}