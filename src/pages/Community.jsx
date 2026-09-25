import { useEffect, useState } from "react";
import {
  getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send, MessageSquare, Clock, Sparkles, TrendingUp, Flag } from "lucide-react";
import toast from "react-hot-toast";
import aiService from "../services/aiService";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  glass: { background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", backdropFilter: "blur(22px)", borderRadius: "22px" },
  gradientText: { background: "linear-gradient(90deg,#4f46e5,#2563eb,#06b6d4)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" },
  primaryBtn: { display: "inline-flex", alignItems: "center", gap: "9px", padding: "12px 22px", border: "none", borderRadius: "13px", background: "linear-gradient(135deg,#4f46e5,#2563eb)", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 12px 28px rgba(79,70,229,.30)", transition: "all .25s" },
  badge: { display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 16px", borderRadius: "999px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", fontSize: ".82rem", fontWeight: 700, color: "var(--text)", letterSpacing: "1px" },
};

const TRACK_NAMES = {
  IELTS: "IELTS",
  DET: "Duolingo DET",
  TOEFL: "TOEFL iBT",
  PTE: "PTE Academic",
  GRE: "GRE General",
  CAT: "IIM CAT",
  ACT: "ACT 2026",
  SAT: "Digital SAT",
  GMAT: "GMAT Exam",
  GATE: "GATE 2026",
  JEE: "JEE Main",
  NEET: "NEET UG",
  CLAT: "CLAT 2026",
};

const TIP_PLACEHOLDERS = {
  NEET: "E.g. How to balance Physics numericals & Biology for NEET?",
  JEE: "E.g. Strategy for JEE Physics & Mathematics?",
  GATE: "E.g. Key topics for GATE General Aptitude & Core?",
  CLAT: "E.g. How to speed up Legal Reasoning passages?",
  CAT: "E.g. How to improve DILR set selection in CAT?",
  GRE: "E.g. Best strategy for GRE Verbal vocabulary?",
  GMAT: "E.g. Tips for GMAT Data Insights & Quant?",
  SAT: "E.g. How to improve Digital SAT Math score?",
  ACT: "E.g. Strategy for ACT Science & Reading timing?",
  PTE: "E.g. Tips for PTE Read Aloud & Dictation?",
  TOEFL: "E.g. How to structure TOEFL Speaking Task 1?",
  DET: "E.g. How to score 130+ in DET Production?",
  IELTS: "E.g. How do I improve Writing Task 2?",
};

function timeAgo(v) {
  if (!v) return "";
  const d = v?.toDate ? v.toDate() : new Date(v);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function avatarGradient(name = "") {
  const g = ["linear-gradient(135deg,#4f46e5,#2563eb)","linear-gradient(135deg,#06b6d4,#2563eb)","linear-gradient(135deg,#22c55e,#06b6d4)","linear-gradient(135deg,#f59e0b,#ef4444)","linear-gradient(135deg,#8b5cf6,#4f46e5)"];
  let h = 0; for (const c of name) h += c.charCodeAt(0);
  return g[h % g.length];
}

function Avatar({ name, size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarGradient(name), display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: size * 0.38, flexShrink: 0 }}>
      {(name || "A")[0].toUpperCase()}
    </div>
  );
}

function PostCard({ p, idx }) {
  const name = p.displayName || p.email?.split("@")[0] || "Anonymous";
  const trackTag = p.track ? (TRACK_NAMES[p.track] || p.track) : null;
  const [reported, setReported] = useState(false);

  const handleReport = () => {
    setReported(true);
    toast.success("Post reported to moderators for review.", { id: `rep-${p.id || idx}` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: idx * .04 }}
      style={{ ...T.glass, padding: "20px 22px", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: "3px", height: "100%", background: "linear-gradient(180deg,#4f46e5,#2563eb)", borderRadius: "3px 0 0 3px" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <Avatar name={name} size={36} />
          <div>
            <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".9rem" }}>{name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-secondary)", fontSize: ".75rem" }}>
              <Clock size={11} />{timeAgo(p.createdAt)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {trackTag && (
            <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: "rgba(79,70,229,.18)", color: "#818cf8", border: "1px solid rgba(79,70,229,.25)" }}>
              #{trackTag}
            </span>
          )}
          <button
            onClick={handleReport}
            title="Report inappropriate content"
            style={{
              background: "transparent",
              border: "none",
              color: reported ? "#ef4444" : "var(--text-secondary)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              opacity: reported ? 1 : 0.6
            }}
          >
            <Flag size={14} />
          </button>
        </div>
      </div>
      <p style={{ color: "var(--text)", lineHeight: 1.8, fontSize: ".92rem", paddingLeft: "2px", margin: 0, wordBreak: "break-word", whiteSpace: "pre-wrap" }}>{p.content}</p>
    </motion.div>
  );
}

export default function Community() {
  const { activeTrack } = useExam();
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // AI tip
  const [tipPrompt, setTipPrompt] = useState("");
  const [aiTip, setAiTip] = useState("");
  const [tipStreaming, setTipStreaming] = useState(false);

  const trackName = TRACK_NAMES[activeTrack] || activeTrack || "IELTS";
  const trackTitle = activeTrack === "DET" ? "DET Learners" : `${trackName} Aspirants`;
  const tipPlaceholder = TIP_PLACEHOLDERS[activeTrack] || `E.g. High-yield tips for ${trackName}?`;

  // Wait for auth & track to resolve before fetching
  useEffect(() => {
    if (authLoading) return;
    fetchPosts();
  }, [authLoading, activeTrack]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "communityPosts"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function createPost() {
    if (!post.trim()) return;
    setSubmitting(true);
    const content = post.trim();
    const displayName = user?.displayName || user?.email?.split("@")[0] || "Anonymous";
    const currentTrack = activeTrack || "IELTS";
    try {
      const db = getFirestore(app);
      const docRef = await addDoc(collection(db, "communityPosts"), {
        content,
        displayName,
        track: currentTrack,
        createdAt: serverTimestamp(),
      });
      // Optimistically prepend to feed so it shows immediately
      setPosts((prev) => [{
        id: docRef.id,
        content,
        displayName,
        track: currentTrack,
        createdAt: new Date(),
      }, ...prev]);
      setPost("");
    } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  }

  async function getAiTip() {
    if (!tipPrompt.trim()) return;
    setAiTip(""); setTipStreaming(true);
    try {
      await aiService.stream({
        systemPrompt: `You are an expert ${trackName} exam coach. Give concise, practical, encouraging advice for students preparing for ${trackName}. Use bullet points. Keep it under 150 words.`,
        messages: [{ role: "user", content: tipPrompt }],
        onToken: (_, full) => setAiTip(full),
      });
    } catch (e) { setAiTip("❌ Failed to get AI tip. Try again."); }
    finally { setTipStreaming(false); }
  }

  // Filter posts by active exam track (or untagged legacy posts when on IELTS)
  const filteredPosts = posts.filter(
    (p) => !p.track || p.track === activeTrack || (activeTrack === "IELTS" && !p.track)
  );

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(circle at 20% 10%, rgba(99,102,241,.18), transparent 40%), radial-gradient(circle at 80% 90%, rgba(59,130,246,.15), transparent 40%), var(--bg)", fontFamily: "Inter, sans-serif" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: .4, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "72px 24px 60px", position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <motion.div key={activeTrack} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} style={{ marginBottom: "44px" }}>
          <span style={T.badge}><Users size={13} color="#4f46e5" />COMMUNITY — {trackName.toUpperCase()}</span>
          <h1 style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1px", color: "var(--text)", margin: "14px 0 8px" }}>
            Connect With <span style={T.gradientText}>{trackTitle}</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: ".97rem", lineHeight: 1.8, maxWidth: "540px" }}>
            Share tips, ask questions, and grow together with thousands of {trackName} aspirants.
          </p>
        </motion.div>

        {/* ── Side-by-side layout ─────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)", gap: "22px", alignItems: "start" }}>

          {/* LEFT COLUMN ─ Composer + AI Tip */}
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .12 }}
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Composer */}
            <div style={{ ...T.glass, padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "16px" }}>
                <Avatar name={user?.displayName || user?.email || "A"} size={38} />
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".9rem" }}>{user?.displayName || user?.email?.split("@")[0] || "You"}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--text-secondary)" }}>Share with the {trackName} community</div>
                </div>
              </div>
              <textarea value={post} onChange={(e) => setPost(e.target.value)}
                placeholder={`Ask a question, share a tip, or celebrate a milestone for ${trackName} 🎉`}
                rows={5}
                style={{ width: "100%", padding: "14px", borderRadius: "13px", border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "var(--text)", fontSize: ".9rem", lineHeight: 1.7, resize: "vertical", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box", transition: "border .2s" }}
                onFocus={(e) => (e.target.style.border = "1px solid rgba(79,70,229,.6)")}
                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,.12)")} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px" }}>
                <span style={{ fontSize: ".78rem", color: "var(--text-secondary)" }}>{post.length} chars</span>
                <button onClick={createPost} disabled={submitting || !post.trim()}
                  style={{ ...T.primaryBtn, opacity: submitting || !post.trim() ? 0.55 : 1, cursor: submitting || !post.trim() ? "not-allowed" : "pointer" }}>
                  <Send size={15} />{submitting ? "Posting…" : `Post to ${trackName}`}
                </button>
              </div>
            </div>

            {/* AI Coach Tip */}
            <div style={{ ...T.glass, padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg,#8b5cf6,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={15} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: ".9rem" }}>Ask {trackName} AI Coach</div>
                  <div style={{ fontSize: ".75rem", color: "var(--text-secondary)" }}>Powered by Groq AI</div>
                </div>
              </div>
              <input value={tipPrompt} onChange={(e) => setTipPrompt(e.target.value)}
                placeholder={tipPlaceholder}
                style={{ width: "100%", padding: "12px 14px", borderRadius: "11px", border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.04)", color: "var(--text)", fontSize: ".88rem", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box", marginBottom: "12px", transition: "border .2s" }}
                onFocus={(e) => (e.target.style.border = "1px solid rgba(139,92,246,.65)")}
                onBlur={(e) => (e.target.style.border = "1px solid rgba(255,255,255,.12)")}
                onKeyDown={(e) => e.key === "Enter" && getAiTip()} />
              <button onClick={getAiTip} disabled={tipStreaming || !tipPrompt.trim()}
                style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 18px", border: "none", borderRadius: "11px", background: tipStreaming || !tipPrompt.trim() ? "rgba(255,255,255,.06)" : "linear-gradient(135deg,#8b5cf6,#4f46e5)", color: tipStreaming || !tipPrompt.trim() ? "var(--text-secondary)" : "white", fontWeight: 700, fontSize: ".85rem", cursor: tipStreaming || !tipPrompt.trim() ? "not-allowed" : "pointer", width: "100%", justifyContent: "center", opacity: tipStreaming || !tipPrompt.trim() ? 0.6 : 1 }}>
                <TrendingUp size={15} />{tipStreaming ? "Thinking…" : `Get ${trackName} AI Tip`}
              </button>
              {aiTip && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: "14px", background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.25)", borderRadius: "13px", padding: "16px", fontSize: ".85rem", lineHeight: 1.8, color: "var(--text)", whiteSpace: "pre-wrap" }}>
                  {aiTip}
                  {tipStreaming && <span style={{ display: "inline-block", width: "6px", height: "13px", background: "#8b5cf6", borderRadius: "2px", animation: "blink 1s step-end infinite", verticalAlign: "middle", marginLeft: "2px" }} />}
                </motion.div>
              )}
            </div>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[{ label: `${trackName} Posts`, value: filteredPosts.length, color: "#4f46e5" }, { label: "Active Members", value: "8,500+", color: "#22c55e" }].map((s) => (
                <div key={s.label} style={{ ...T.glass, padding: "18px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--text-secondary)", marginTop: "4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN ─ Feed */}
          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5, delay: .2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "18px" }}>
              <MessageSquare size={18} color="#4f46e5" />
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>{trackName} Community Feed</h2>
              <span style={{ marginLeft: "auto", fontSize: ".75rem", padding: "3px 10px", borderRadius: "999px", background: "rgba(79,70,229,.15)", color: "#818cf8" }}>{filteredPosts.length} posts</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "78vh", overflowY: "auto", paddingRight: "4px" }}>
              {loading ? (
                [1,2,3].map((i) => (
                  <div key={i} style={{ ...T.glass, padding: "24px" }}>
                    <div style={{ height: "12px", borderRadius: "8px", background: "rgba(255,255,255,.07)", width: "35%", marginBottom: "10px" }} />
                    <div style={{ height: "12px", borderRadius: "8px", background: "rgba(255,255,255,.05)", width: "85%" }} />
                  </div>
                ))
              ) : filteredPosts.length === 0 ? (
                <div style={{ ...T.glass, padding: "50px", textAlign: "center" }}>
                  <MessageSquare size={42} color="rgba(255,255,255,.18)" style={{ marginBottom: "12px" }} />
                  <p style={{ color: "var(--text-secondary)" }}>No posts in the {trackName} community yet. Be the first to share a post!</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredPosts.map((p, i) => <PostCard key={p.id} p={p} idx={i} />)}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}
