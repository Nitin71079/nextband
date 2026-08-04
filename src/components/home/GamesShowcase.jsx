import "./GamesShowcase.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Gamepad2, Swords, Flame, Zap, BookMarked, Target, Wand2,
  Trophy, Users, Star, ArrowRight, Crown, Mic, PenSquare, Lock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const GAMES = [
  // Free Games First
  {
    icon: Flame,      title: "Reading Race",        subtitle: "1v1 Multiplayer",
    desc: "Same IELTS passage, same 5 questions. Read fast, answer first, earn the speed bonus.",
    color: "#ef4444", xp: "+80 XP",  badge: "FREE",  badgeColor: "#22c55e", link: "/games/reading-race",
    isFree: true,
  },
  {
    icon: Swords,     title: "Vocab Battle",       subtitle: "1v1 Multiplayer",
    desc: "Challenge a live opponent in a real-time IELTS vocabulary duel — 10 questions, 15 seconds each.",
    color: "#8b5cf6", xp: "+120 XP", badge: "FREE",  badgeColor: "#22c55e", link: "/games/vocab-battle",
    isFree: true,
  },
  {
    icon: PenSquare,  title: "Essay Duel",          subtitle: "1v1 Writing Battle",
    desc: "One topic, 30 minutes, two writers. AI scores both essays on all four IELTS criteria. Highest band wins.",
    color: "#f59e0b", xp: "+200 XP", badge: "FREE",  badgeColor: "#f59e0b", link: "/games/essay-duel",
    isFree: true,
  },
  // Pro Games Later
  {
    icon: Mic,        title: "Speaking Showdown",   subtitle: "2v2 / 4v4 Teams",
    desc: "Answer IELTS speaking prompts in real-time team battles. AI scores every response live.",
    color: "#a855f7", xp: "+150 XP", badge: "LIVE",  badgeColor: "#a855f7", link: "/games/speaking-showdown",
    isFree: false,
  },
  {
    icon: Target,     title: "Audio Sniper",        subtitle: "Up to 8 Players",
    desc: "Everyone hears the same recording — be the fastest to fire the correct answer across 10 rounds.",
    color: "#06b6d4", xp: "+110 XP", badge: "LIVE",  badgeColor: "#06b6d4", link: "/games/audio-sniper",
    isFree: false,
  },
  // Row 2
  {
    icon: Wand2,      title: "Band Blitz",          subtitle: "Solo vs AI",
    desc: "Read student sentences and guess the band score — learn exactly what IELTS examiners reward.",
    color: "#22c55e", xp: "+100 XP", badge: "NEW",   badgeColor: "#22c55e", link: "/games/band-blitz",
    isFree: false,
  },
  {
    icon: Zap,        title: "Synonym Sprint",      subtitle: "Solo vs AI",
    desc: "Pick the best academic synonym under the clock — the fastest way to upgrade your writing register.",
    color: "#7c3aed", xp: "+70 XP",  badge: "NEW",   badgeColor: "#a78bfa", link: "/games/synonym-sprint",
    isFree: false,
  },
  {
    icon: BookMarked, title: "Word Chain",           subtitle: "Solo vs AI",
    desc: "Follow chains of linked IELTS concepts. Race the AI bot and build your lexical range for Band 7+.",
    color: "#2563eb", xp: "+60 XP",  badge: "NEW",   badgeColor: "#60a5fa", link: "/games/word-chain",
    isFree: false,
  },
  {
    icon: Users,      title: "Grammar Gladiator",   subtitle: "1v1 Multiplayer",
    desc: "Race to fix the same broken IELTS sentence — tense, agreement, prepositions. First correct answer scores.",
    color: "#f43f5e", xp: "+90 XP",  badge: "LIVE",  badgeColor: "#f43f5e", link: "/games/grammar-gladiator",
    isFree: false,
  },
  {
    icon: Target,     title: "Sentence Fixer",      subtitle: "Solo vs AI",
    desc: "Spot and fix grammar errors in IELTS-style sentences against a timer. Train your writing eye.",
    color: "#f97316", xp: "+85 XP",  badge: "NEW",   badgeColor: "#fb923c", link: "/games/sentence-fixer",
    isFree: false,
  },
];

const PERKS = [
  { icon: Trophy, text: "Earn XP & Level Up" },
  { icon: Crown,  text: "Weekly Leaderboard" },
  { icon: Star,   text: "Unlock Achievements" },
  { icon: Users,  text: "Challenge Friends" },
];

export default function GamesShowcase() {
  const navigate = useNavigate();
  const { premium } = useAuth();

  const handleGameClick = (game) => {
    if (game.isFree || premium) {
      navigate(game.link);
    } else {
      navigate("/pricing");
    }
  };

  return (
    <motion.section className="games-showcase"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>

      {/* Ambient orbs */}
      <div className="gs-orb gs-orb-1" />
      <div className="gs-orb gs-orb-2" />
      <div className="gs-orb gs-orb-3" />
      {/* Dot grid */}
      <div className="gs-grid-overlay" />

      {/* ── Header ──────────────────────────────────── */}
      <div className="gs-header">
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <Gamepad2 size={14} /> GAMES ZONE
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Learn IELTS.{" "}
          <span className="gs-gradient">Play to Win.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}>
          10 gamified IELTS challenges — solo games, 1v1 duels and team multiplayer.
          Earn XP, top leaderboards and build real exam skills while having fun.
        </motion.p>

        <div className="gs-perks">
          {PERKS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.text} className="gs-perk"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.35 + i * 0.06 }}>
                <Icon size={14} />
                {p.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── 2 × 5 game grid ─────────────────────────── */}
      <div className="gs-grid">
        {GAMES.map((game, i) => {
          const Icon = game.icon;
          const isLockedForUser = !game.isFree && !premium;

          return (
            <motion.div key={game.title} className={`gs-card ${isLockedForUser ? "gs-card-locked" : ""}`}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.06 }}
              whileHover={{ y: -10, scale: 1.025 }}
              onClick={() => handleGameClick(game)}>

              {/* Top accent */}
              <div className="gs-card-accent" style={{ background: `linear-gradient(90deg, ${isLockedForUser ? "#f59e0b" : game.color}, ${isLockedForUser ? "#d97706" : game.color + "66"})` }} />

              {/* Badge */}
              {isLockedForUser ? (
                <div className="gs-badge" style={{ background: "rgba(245,158,11,0.18)", color: "#f59e0b", borderColor: "rgba(245,158,11,0.4)" }}>
                  <Lock size={10} style={{ marginRight: 3, verticalAlign: "middle" }} /> PRO
                </div>
              ) : game.isFree ? (
                <div className="gs-badge" style={{ background: "rgba(34,197,94,0.18)", color: "#22c55e", borderColor: "rgba(34,197,94,0.4)" }}>
                  FREE
                </div>
              ) : (
                <div className="gs-badge" style={{ background: `${game.badgeColor}22`, color: game.badgeColor, borderColor: `${game.badgeColor}44` }}>
                  {game.badge}
                </div>
              )}

              {/* Glow blob */}
              <div className="gs-card-blob" style={{ background: `${game.color}14` }} />

              {/* Icon */}
              <div className="gs-icon-wrap" style={{ background: `linear-gradient(135deg, ${game.color}, ${game.color}aa)` }}>
                <Icon size={26} />
              </div>

              {/* Text */}
              <div className="gs-card-body">
                <h3>{game.title}</h3>
                <span className="gs-subtitle" style={{ color: game.color }}>{game.subtitle}</span>
                <p>{game.desc}</p>
              </div>

              {/* Footer */}
              <div className="gs-card-footer">
                <span className="gs-xp">{game.xp}</span>
                <button
                  className="gs-play-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGameClick(game);
                  }}
                  style={{
                    color: isLockedForUser ? "#f59e0b" : game.color,
                    borderColor: isLockedForUser ? "rgba(245,158,11,0.4)" : `${game.color}44`,
                    cursor: "pointer"
                  }}
                >
                  {isLockedForUser ? (
                    <>
                      <Lock size={12} /> Pro
                    </>
                  ) : (
                    <>
                      Play <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── CTA ─────────────────────────────────────── */}
      <motion.div className="gs-cta"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <div className="gs-cta-text">
          <h3>All 10 games. One platform.</h3>
          <p>Free tier gets 3 free games — upgrade to Pro for unlimited access to all 10 games, XP boosts and weekly tournaments.</p>
        </div>
        <Link to="/games">
          <motion.button className="gs-cta-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Gamepad2 size={17} />
            Explore All Games
            <ArrowRight size={17} />
          </motion.button>
        </Link>
      </motion.div>

    </motion.section>
  );
}
