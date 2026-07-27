import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swords, Lock, Gamepad2, Zap, Trophy, Users } from "lucide-react";

const games = [
  {
    id: "vocab-battle",
    icon: "⚔️",
    title: "Vocabulary Battle",
    subtitle: "1v1 Multiplayer",
    description:
      "Challenge another student to a real-time IELTS vocabulary duel. 10 questions, 15 seconds each — fastest correct answer wins the round.",
    badge: "LIVE",
    badgeColor: "#22c55e",
    available: true,
    path: "/games/vocab-battle",
    tags: ["Multiplayer", "Vocabulary", "Real-time"],
    color: "#2563eb",
  },
  {
    id: "reading-race",
    icon: "📖",
    title: "Reading Race",
    subtitle: "1v1 Multiplayer",
    description:
      "Both players get the same IELTS passage and 5 comprehension questions. Read fast, answer accurately — speed bonus for answering first. 3-minute clock.",
    badge: "LIVE",
    badgeColor: "#22c55e",
    available: true,
    path: "/games/reading-race",
    tags: ["Multiplayer", "Reading", "Comprehension"],
    color: "#22c55e",
  },
  {
    id: "word-chain",
    icon: "🔗",
    title: "Word Chain",
    subtitle: "Solo vs AI",
    description:
      "Follow chains of related IELTS concepts — each correct answer reveals the next link. Race the AI bot and build your lexical range for band 7+.",
    badge: "NEW",
    badgeColor: "#8b5cf6",
    available: true,
    path: "/games/word-chain",
    tags: ["Solo", "Vocabulary", "Concepts"],
    color: "#8b5cf6",
  },
  {
    id: "sentence-fix",
    icon: "🛠️",
    title: "Sentence Fixer",
    subtitle: "Solo vs AI",
    description:
      "Spot and fix grammar errors in IELTS-style sentences against a timer. Tense, agreement, prepositions and more — train your writing eye.",
    badge: "NEW",
    badgeColor: "#f59e0b",
    available: true,
    path: "/games/sentence-fixer",
    tags: ["Solo", "Grammar", "Writing"],
    color: "#f59e0b",
  },
  {
    id: "band-blitz",
    icon: "🎯",
    title: "Band Blitz",
    subtitle: "Solo vs AI",
    description:
      "Read a real IELTS student sentence and guess its band score — 5, 6, 7 or 8. Learn exactly what examiners reward and what kills your score.",
    badge: "NEW",
    badgeColor: "#22c55e",
    available: true,
    path: "/games/band-blitz",
    tags: ["Solo", "Writing", "Band Score"],
    color: "#22c55e",
  },
  {
    id: "synonym-sprint",
    icon: "⚡",
    title: "Synonym Sprint",
    subtitle: "Solo vs AI",
    description:
      "A word in each IELTS sentence is highlighted — pick its best academic synonym under the clock. The fastest way to upgrade your Writing register.",
    badge: "NEW",
    badgeColor: "#a78bfa",
    available: true,
    path: "/games/synonym-sprint",
    tags: ["Solo", "Vocabulary", "Paraphrasing"],
    color: "#7c3aed",
  },
  {
    id: "grammar-gladiator",
    icon: "⚔️🔤",
    title: "Grammar Gladiator",
    subtitle: "1v1 Multiplayer",
    description:
      "Both players get the same broken IELTS sentence. Race to pick the corrected version — tense, agreement, prepositions and more. First to answer correctly scores, with a speed bonus.",
    badge: "LIVE",
    badgeColor: "#f43f5e",
    available: true,
    path: "/games/grammar-gladiator",
    tags: ["Multiplayer", "Grammar", "Real-time"],
    color: "#f43f5e",
  },
];

export default function GamesZone() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 15% 10%, rgba(37,99,235,.12), transparent 40%), radial-gradient(circle at 85% 85%, rgba(139,92,246,.10), transparent 40%), #060d1f",
        fontFamily: "Inter, sans-serif",
        padding: "80px 24px 60px",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "999px",
              background: "rgba(37,99,235,.15)",
              border: "1px solid rgba(37,99,235,.3)",
              color: "#60a5fa",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            <Gamepad2 size={13} />
            GAMES ZONE
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-2px",
              color: "#ffffff",
              lineHeight: 1.05,
              margin: "0 0 18px",
            }}
          >
            Learn IELTS.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #2563eb, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Play to Win.
            </span>
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
              lineHeight: 1.8,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Gamified IELTS practice that makes vocabulary, grammar and reading
            actually fun. One game at a time, built right.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              marginTop: "36px",
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: <Zap size={15} />, label: "Real-time Multiplayer" },
              { icon: <Trophy size={15} />, label: "IELTS Vocabulary" },
              { icon: <Users size={15} />, label: "Challenge Friends" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#2563eb" }}>{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Games grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={game.available ? { y: -8, scale: 1.015 } : {}}
              onClick={() => game.available && navigate(game.path)}
              style={{
                position: "relative",
                padding: "36px 32px",
                borderRadius: "28px",
                background: game.available
                  ? "rgba(255,255,255,.05)"
                  : "rgba(255,255,255,.02)",
                border: game.available
                  ? `1px solid rgba(37,99,235,.25)`
                  : "1px solid rgba(255,255,255,.06)",
                cursor: game.available ? "pointer" : "default",
                boxShadow: game.available
                  ? "0 8px 40px rgba(0,0,0,.3)"
                  : "none",
                overflow: "hidden",
                transition: "all .3s ease",
                opacity: game.available ? 1 : 0.55,
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: game.available
                    ? `linear-gradient(90deg, ${game.color}, #06b6d4)`
                    : "rgba(255,255,255,.1)",
                  borderRadius: "28px 28px 0 0",
                }}
              />

              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: `${game.badgeColor}20`,
                  border: `1px solid ${game.badgeColor}40`,
                  color: game.badgeColor,
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "1px",
                }}
              >
                {game.badge}
              </div>

              {/* Lock for unavailable */}
              {!game.available && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(6,13,31,.8)",
                    borderRadius: "50%",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,.12)",
                    zIndex: 2,
                  }}
                >
                  <Lock size={22} color="#64748b" />
                </div>
              )}

              <div style={{ fontSize: "42px", marginBottom: "16px" }}>{game.icon}</div>

              <div style={{ marginBottom: "6px" }}>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "#f1f5f9",
                    margin: 0,
                  }}
                >
                  {game.title}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: game.color,
                    fontWeight: 700,
                    margin: "4px 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {game.subtitle}
                </p>
              </div>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  margin: "16px 0 20px",
                }}
              >
                {game.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,.05)",
                      border: "1px solid rgba(255,255,255,.08)",
                      color: "#64748b",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {game.available && (
                <div
                  style={{
                    marginTop: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#60a5fa",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}
                >
                  <Swords size={15} />
                  Play Now →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
