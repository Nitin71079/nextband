import { useState } from "react";
import { Mail, MapPin, MessageSquare, Handshake, Lightbulb, Send, CheckCircle2 } from "lucide-react";
import "../styles/legal.css";
import "./Contact.css";

const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const SOCIALS = [
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    handle: "Nitin Thambisetty",
    href: "https://www.linkedin.com/in/nitin-thambisetty-69b478324",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.1)",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    handle: "@knarrow.official",
    href: "https://www.instagram.com/knarrow.official",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.1)",
  },
];

const INFO_CARDS = [
  {
    icon: MessageSquare,
    color: "#2563eb",
    title: "Platform Support",
    desc: "Account issues, mock test bugs, billing queries or dashboard help — our team responds within one business day.",
  },
  {
    icon: Handshake,
    color: "#8b5cf6",
    title: "Partnerships & Collaboration",
    desc: "Educational partnerships, content collaborations, institutional licensing or business opportunities — we'd love to talk.",
  },
  {
    icon: Lightbulb,
    color: "#f59e0b",
    title: "Knarrow Vision",
    desc: "Building a modern AI-powered exam prep ecosystem — IELTS today, expanding to TOEFL, GRE, GMAT and beyond.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Simulated send — wire to backend/email service when ready
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  }

  return (
    <div className="legal-page">
      <div className="contact-container">

        {/* Hero */}
        <div className="legal-hero" style={{ marginBottom: "36px" }}>
          <div className="legal-hero-badge">Contact</div>
          <h1>Get in Touch</h1>
          <p>
            Questions, feedback, partnership ideas or support requests —
            we read every message and respond as fast as we can.
          </p>
        </div>

        <div className="contact-grid">

          {/* ── Left: Form ── */}
          <div className="contact-form-card">
            {!submitted ? (
              <>
                <h2 className="contact-form-title">Send a Message</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-row-2">
                    <div className="contact-field">
                      <label htmlFor="name">Full Name</label>
                      <input
                        id="name" name="name" type="text"
                        placeholder="Your name"
                        value={form.name} onChange={handleChange} required
                      />
                    </div>
                    <div className="contact-field">
                      <label htmlFor="email">Email Address</label>
                      <input
                        id="email" name="email" type="email"
                        placeholder="you@example.com"
                        value={form.email} onChange={handleChange} required
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject" name="subject" type="text"
                      placeholder="What's this about?"
                      value={form.subject} onChange={handleChange} required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message" name="message"
                      placeholder="Write your message here…"
                      value={form.message} onChange={handleChange} required
                      rows={6}
                    />
                  </div>

                  <button type="submit" className="contact-submit" disabled={loading}>
                    {loading ? (
                      <span className="contact-spinner" />
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="contact-success">
                <CheckCircle2 size={52} color="#16a34a" strokeWidth={1.5} />
                <h2>Message Sent!</h2>
                <p>Thanks for reaching out. We'll get back to you within one business day.</p>
                <button className="contact-reset" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="contact-info-col">

            {/* Direct contact */}
            <div className="contact-info-card">
              <h3>Direct Contact</h3>
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <Mail size={18} />
                  <div>
                    <span className="ci-label">Email</span>
                    <a href="mailto:support@knarrow.in" className="ci-value">support@knarrow.in</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <MapPin size={18} />
                  <div>
                    <span className="ci-label">Location</span>
                    <span className="ci-value">Bangalore, India</span>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="contact-socials">
                {SOCIALS.map((s) => {
                  const Icon = s.Icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-btn"
                      style={{ "--s-color": s.color, "--s-bg": s.bg }}
                    >
                      <Icon />
                      <div>
                        <span className="cs-label">{s.label}</span>
                        <span className="cs-handle">{s.handle}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Info cards */}
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="contact-info-card contact-info-mini">
                  <div className="contact-info-icon" style={{ background: `${card.color}15`, color: card.color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
}
