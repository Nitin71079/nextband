import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getResults } from "../services/resultService";
import "./Certificates.css";

/* ─────────────────────────────────────────────
   Certificate definitions
   Each cert has:
     id          – unique key
     title       – display name
     subtitle    – short description
     icon        – emoji
     color       – card accent color (CSS gradient)
     check(data) – returns true when unlocked
───────────────────────────────────────────── */
const CERT_DEFS = [
  {
    id: "first_mock",
    title: "First Step",
    subtitle: "Completed your first mock test",
    icon: "🎓",
    color: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    check: (d) => d.totalTests >= 1,
  },
  {
    id: "five_mocks",
    title: "Consistent Learner",
    subtitle: "Completed 5 mock tests",
    icon: "📚",
    color: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    check: (d) => d.totalTests >= 5,
  },
  {
    id: "ten_mocks",
    title: "Dedicated Practitioner",
    subtitle: "Completed 10 mock tests",
    icon: "🏅",
    color: "linear-gradient(135deg,#0891b2,#0e7490)",
    check: (d) => d.totalTests >= 10,
  },
  {
    id: "twentyfive_mocks",
    title: "Elite Trainer",
    subtitle: "Completed 25 mock tests",
    icon: "⚡",
    color: "linear-gradient(135deg,#d97706,#b45309)",
    check: (d) => d.totalTests >= 25,
  },
  {
    id: "band6",
    title: "Band 6 Achiever",
    subtitle: "Scored Band 6 or above",
    icon: "⭐",
    color: "linear-gradient(135deg,#16a34a,#15803d)",
    check: (d) => d.bestBand >= 6,
  },
  {
    id: "band7",
    title: "Band 7 Achiever",
    subtitle: "Scored Band 7 or above",
    icon: "🥇",
    color: "linear-gradient(135deg,#ca8a04,#a16207)",
    check: (d) => d.bestBand >= 7,
  },
  {
    id: "band8",
    title: "Band 8 Expert",
    subtitle: "Scored Band 8 or above",
    icon: "🏆",
    color: "linear-gradient(135deg,#ea580c,#c2410c)",
    check: (d) => d.bestBand >= 8,
  },
  {
    id: "band9",
    title: "Band 9 Master",
    subtitle: "Achieved the perfect Band 9",
    icon: "👑",
    color: "linear-gradient(135deg,#9333ea,#7e22ce)",
    check: (d) => d.bestBand >= 9,
  },
  {
    id: "writing_star",
    title: "Writing Star",
    subtitle: "Completed 5 writing evaluations",
    icon: "✍️",
    color: "linear-gradient(135deg,#0f766e,#0d9488)",
    check: (d) => d.writingCount >= 5,
  },
  {
    id: "speaking_star",
    title: "Speaking Star",
    subtitle: "Completed 5 speaking evaluations",
    icon: "🎤",
    color: "linear-gradient(135deg,#be185d,#9d174d)",
    check: (d) => d.speakingCount >= 5,
  },
  {
    id: "reading_master",
    title: "Reading Master",
    subtitle: "Completed 10 reading tests",
    icon: "📖",
    color: "linear-gradient(135deg,#1e40af,#1e3a8a)",
    check: (d) => d.readingCount >= 10,
  },
  {
    id: "listening_master",
    title: "Listening Master",
    subtitle: "Completed 10 listening tests",
    icon: "🎧",
    color: "linear-gradient(135deg,#065f46,#047857)",
    check: (d) => d.listeningCount >= 10,
  },
  {
    id: "premium_member",
    title: "Premium Member",
    subtitle: "Upgraded to a Premium plan",
    icon: "💎",
    color: "linear-gradient(135deg,#2563eb,#7c3aed)",
    check: (d) => d.isPremium,
  },
  {
    id: "streak_7",
    title: "7-Day Streak",
    subtitle: "Practiced 7 days in a row",
    icon: "🔥",
    color: "linear-gradient(135deg,#dc2626,#b91c1c)",
    check: (d) => d.streak >= 7,
  },
  {
    id: "early_bird",
    title: "Early Bird",
    subtitle: "One of the first 100 Knarrow users",
    icon: "🐦",
    color: "linear-gradient(135deg,#0284c7,#0369a1)",
    check: (d) => d.isPremium, // rewarded to premium early adopters
  },
];

/* ── tiny confetti burst ── */
function burst(el) {
  if (!el) return;
  const colors = ["#2563eb","#7c3aed","#f59e0b","#16a34a","#e11d48"];
  for (let i = 0; i < 28; i++) {
    const dot = document.createElement("span");
    dot.className = "cert-confetti-dot";
    dot.style.cssText = `
      position:absolute;
      width:${6 + Math.random()*6}px;
      height:${6 + Math.random()*6}px;
      border-radius:50%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:50%;top:50%;
      animation:cert-confetti-fly .9s ease-out forwards;
      --tx:${(Math.random()-0.5)*200}px;
      --ty:${-(80 + Math.random()*120)}px;
      --rot:${Math.random()*720}deg;
    `;
    el.appendChild(dot);
    setTimeout(() => dot.remove(), 950);
  }
}

/* ── SVG certificate for printing ── */
function buildCertSVG({ title, subtitle, icon, userName, date, color }) {
  // extract rough colour for SVG
  const c1 = color.includes("2563eb") ? "#2563eb" : color.includes("7c3aed") ? "#7c3aed" : "#2563eb";
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#eff6ff"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="900" height="620" fill="url(#bg)" rx="24"/>
  <!-- Border -->
  <rect x="18" y="18" width="864" height="584" rx="18" fill="none" stroke="${c1}" stroke-width="2.5" stroke-dasharray="12 6"/>
  <rect x="28" y="28" width="844" height="564" rx="14" fill="none" stroke="${c1}" stroke-width="1" opacity="0.3"/>
  <!-- Top bar -->
  <rect x="0" y="0" width="900" height="8" rx="4" fill="url(#accent)"/>
  <!-- Knarrow wordmark -->
  <text x="450" y="80" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-weight="700" fill="${c1}" letter-spacing="3">KNARROW</text>
  <text x="450" y="100" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#64748b" letter-spacing="4">AI-POWERED IELTS PREPARATION PLATFORM</text>
  <!-- Divider -->
  <rect x="340" y="115" width="220" height="1.5" fill="url(#accent)" opacity="0.5"/>
  <!-- Certificate of -->
  <text x="450" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#94a3b8" letter-spacing="5">CERTIFICATE OF ACHIEVEMENT</text>
  <!-- Icon -->
  <text x="450" y="240" text-anchor="middle" font-size="72">${icon}</text>
  <!-- Title -->
  <text x="450" y="300" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="700" fill="#0f172a">${title}</text>
  <!-- Subtitle -->
  <text x="450" y="336" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#64748b">${subtitle}</text>
  <!-- Awarded to -->
  <text x="450" y="390" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#94a3b8" letter-spacing="3">AWARDED TO</text>
  <text x="450" y="428" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="700" fill="${c1}">${userName}</text>
  <!-- Date -->
  <text x="450" y="468" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="#94a3b8">${date}</text>
  <!-- Bottom divider -->
  <rect x="340" y="490" width="220" height="1.5" fill="url(#accent)" opacity="0.5"/>
  <!-- Signature line -->
  <line x1="180" y1="545" x2="360" y2="545" stroke="#cbd5e1" stroke-width="1"/>
  <line x1="540" y1="545" x2="720" y2="545" stroke="#cbd5e1" stroke-width="1"/>
  <text x="270" y="560" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#94a3b8">Knarrow Team</text>
  <text x="630" y="560" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#94a3b8">${date}</text>
  <!-- Corner ornaments -->
  <circle cx="60" cy="60" r="30" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <circle cx="60" cy="60" r="20" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <circle cx="840" cy="60" r="30" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <circle cx="840" cy="60" r="20" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <circle cx="60" cy="560" r="30" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
  <circle cx="840" cy="560" r="30" fill="none" stroke="${c1}" stroke-width="1" opacity="0.2"/>
</svg>`;
}

export default function Certificates() {
  const { user, name, premium } = useAuth();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePreview, setActivePreview] = useState(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState(new Set());
  const burstRefs = useRef({});

  /* ── load results ── */
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getResults(user.uid)
      .then((data) => { setResults(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [user]);

  /* ── derived stats ── */
  const stats = (() => {
    const bands = results.map((r) => Number(r.overall || r.band || 0)).filter(Boolean);
    return {
      totalTests:    results.length,
      bestBand:      bands.length ? Math.max(...bands) : 0,
      writingCount:  results.filter((r) => r.type === "writing").length,
      speakingCount: results.filter((r) => r.type === "speaking").length,
      readingCount:  results.filter((r) => r.type === "reading").length,
      listeningCount:results.filter((r) => r.type === "listening").length,
      isPremium:     premium,
      streak:        0, // would need separate streak data
    };
  })();

  const certs = CERT_DEFS.map((def) => ({
    ...def,
    unlocked: def.check(stats),
  }));

  const unlockedCount = certs.filter((c) => c.unlocked).length;

  /* ── animate newly unlocked on first load ── */
  useEffect(() => {
    if (loading) return;
    const unlocked = new Set(certs.filter((c) => c.unlocked).map((c) => c.id));
    setNewlyUnlocked(unlocked);
    // trigger burst after short delay
    setTimeout(() => {
      unlocked.forEach((id) => burst(burstRefs.current[id]));
    }, 400);
  }, [loading]); // eslint-disable-line

  /* ── download certificate as SVG → PNG ── */
  const downloadCert = useCallback((cert) => {
    const userName = name || user?.email?.split("@")[0] || "Student";
    const date = new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" });
    const svg = buildCertSVG({ ...cert, userName, date });
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `knarrow-${cert.id}-certificate.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [name, user]);

  if (!user) {
    return (
      <div className="cert-page cert-auth-wall">
        <div className="cert-auth-card">
          <div className="cert-auth-icon">🔒</div>
          <h2>Sign In to View Certificates</h2>
          <p>Your achievements are tied to your account. Sign in to see what you've unlocked.</p>
          <button className="cert-primary-btn" onClick={() => navigate("/login")}>Sign In</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cert-page">

      {/* ── confetti keyframes injected once ── */}
      <style>{`
        @keyframes cert-confetti-fly {
          to { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)); opacity: 0; }
        }
      `}</style>

      {/* ══════════ HERO ══════════ */}
      <section className="cert-hero">
        <div className="cert-hero-inner">
          <div className="cert-hero-pill">🏆 Your Achievement Wall</div>
          <h1>
            Certificates &amp; <span>Achievements</span>
          </h1>
          <p>
            Every milestone you hit on Knarrow earns you a certificate.
            Complete tests, score higher bands, and unlock them all.
          </p>

          <div className="cert-progress-bar-wrap">
            <div className="cert-progress-meta">
              <span>{unlockedCount} of {certs.length} unlocked</span>
              <span>{Math.round((unlockedCount / certs.length) * 100)}%</span>
            </div>
            <div className="cert-progress-track">
              <div
                className="cert-progress-fill"
                style={{ width: `${(unlockedCount / certs.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ROW ══════════ */}
      {!loading && (
        <div className="cert-stats-row">
          {[
            { label: "Tests Completed", value: stats.totalTests, icon: "📋" },
            { label: "Best Band",        value: stats.bestBand || "—", icon: "📊" },
            { label: "Writing Evals",    value: stats.writingCount, icon: "✍️" },
            { label: "Speaking Evals",   value: stats.speakingCount, icon: "🎤" },
          ].map((s) => (
            <div key={s.label} className="cert-stat-card">
              <span className="cert-stat-icon">{s.icon}</span>
              <span className="cert-stat-value">{s.value}</span>
              <span className="cert-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ══════════ GRID ══════════ */}
      {loading ? (
        <div className="cert-loading">
          <div className="cert-spinner" />
          <p>Loading your achievements…</p>
        </div>
      ) : (
        <div className="cert-grid">
          {certs.map((cert) => (
            <div
              key={cert.id}
              ref={(el) => { burstRefs.current[cert.id] = el; }}
              className={`cert-card${cert.unlocked ? " cert-unlocked" : " cert-locked"}${newlyUnlocked.has(cert.id) ? " cert-pop" : ""}`}
              style={cert.unlocked ? { "--cert-color": cert.color } : {}}
            >
              {/* shimmer on locked */}
              {!cert.unlocked && <div className="cert-lock-overlay"><span>🔒</span></div>}

              {/* accent bar */}
              {cert.unlocked && <div className="cert-accent-bar" />}

              <div className="cert-card-icon">{cert.icon}</div>

              <div className="cert-card-body">
                <h3>{cert.title}</h3>
                <p>{cert.subtitle}</p>

                {cert.unlocked ? (
                  <div className="cert-unlocked-tag">
                    <span className="cert-live-dot" /> Earned
                  </div>
                ) : (
                  <div className="cert-locked-tag">Locked</div>
                )}
              </div>

              {cert.unlocked && (
                <div className="cert-card-actions">
                  <button
                    className="cert-preview-btn"
                    onClick={() => setActivePreview(cert)}
                  >
                    👁 Preview
                  </button>
                  <button
                    className="cert-download-btn"
                    onClick={() => downloadCert(cert)}
                  >
                    ⬇ Download
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ══════════ HOW TO EARN ══════════ */}
      <section className="cert-how">
        <div className="cert-how-inner">
          <h2>How to Earn More Certificates</h2>
          <div className="cert-how-grid">
            {[
              { icon: "📋", title: "Take Mock Tests",    desc: "Complete Reading, Listening, Writing and Speaking tests to unlock milestone certificates." },
              { icon: "📈", title: "Improve Your Band",  desc: "Push your scores higher — Band 6, 7, 8 and 9 each unlock their own exclusive certificate." },
              { icon: "💎", title: "Go Premium",         desc: "Premium membership unlocks the Premium Member certificate instantly." },
              { icon: "🔥", title: "Build Your Streak",  desc: "Practice every day and earn streak-based achievement certificates." },
            ].map((item) => (
              <div key={item.title} className="cert-how-card">
                <div className="cert-how-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PREVIEW MODAL ══════════ */}
      {activePreview && (
        <div className="cert-modal-backdrop" onClick={() => setActivePreview(null)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setActivePreview(null)}>✕</button>

            <div className="cert-modal-preview" style={{ background: activePreview.color }}>
              <div className="cert-modal-watermark">KNARROW</div>
              <div className="cert-modal-icon">{activePreview.icon}</div>
              <h2>{activePreview.title}</h2>
              <p>{activePreview.subtitle}</p>
              <div className="cert-modal-name">{name || user?.email?.split("@")[0]}</div>
              <div className="cert-modal-date">
                {new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}
              </div>
              <div className="cert-modal-footer">
                <span>Knarrow</span>
                <span>AI-Powered IELTS Preparation</span>
              </div>
            </div>

            <div className="cert-modal-actions">
              <button className="cert-download-btn-lg" onClick={() => { downloadCert(activePreview); setActivePreview(null); }}>
                ⬇ Download Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
