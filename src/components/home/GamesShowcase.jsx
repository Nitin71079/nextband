import "./GamesShowcase.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Gamepad2, Swords, Flame, Zap, BookMarked, Target, Wand2,
  Trophy, Users, Star, ArrowRight, Sparkles, Crown,
} from "lucide-react";

const games = [
  {
    icon: Swords, title: "Vocab Battle", tag: "🔥 Multiplayer",
    desc: "Duel other learners in live vocabulary battles. Top the weekly leaderboard.",
    color: "#8b5cf6", link: "/games/vocab-battle", xp: "+120 XP",
  },
  {
    icon: Flame, title: "Reading Race", tag: "⚡ Solo + Multi",
    desc: "Speed-read passages and race against friends or the clock.",
    color: "#ef4444", link: "/games/reading-race", xp: "+80 XP",
  },
  {
    icon: Wand2, title: "Band Blitz", tag: "🎯 Solo",
    desc: "Rapid-fire IELTS questions under pressure to sharpen your band score.",
    color: "#f59e0b", link: "/games/band-blitz", xp: "+100 XP",
  },
  {
    icon: BookMarked, title: "Word Chain", tag: "📚 Solo",
    desc: "Build vocabulary chains and unlock streak achievements.",
    color: "#22c55e", link: "/games/word-chain", xp: "+60 XP",
  },
  {
    icon: Zap, title: "Synonym Sprint", tag: "💡 Solo",
    desc: "Race to match synonyms in under a minute — fastest way to expand vocab.",
    color: "#06b6d4", link: "/games/synonym-sprint", xp: "+70 XP",
  },
  {
    icon: Target, title: "Grammar Gladiator", tag: "⚔️ Solo",
    desc: "Crush grammar challenges, earn XP and climb mastery ranks.",
    color: "#2563eb", link: "/games/grammar-gladiator", xp: "+90 XP",
  },
];

const perks = [
  { icon: Trophy, text: "Earn XP & Level Up" },
  { icon: Crown, text: "Weekly Leaderboard" },
  { icon: Star, text: "Unlock Achievements" },
  { icon: Users, text: "Challenge Friends" },
];

export default function GamesShowcase() {
  return (
    <motion.section className="games-showcase"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>

      {/* Background orbs */}
      <div className="gs-orb gs-orb-1" />
      <div className="gs-orb gs-orb-2" />
      <div className="gs-orb gs-orb-3" />

      <div className="gs-header">
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <Gamepad2 size={15} /> GAMES ZONE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Learn With Play
          <br />
          <span className="gs-gradient">Solo & Multiplayer Games</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}>
          Sharpen your IELTS skills through gamified challenges, vocabulary battles, reading races
          and more. Compete, earn XP, unlock achievements — and actually enjoy studying.
        </motion.p>

        {/* Perks row */}
        <div className="gs-perks">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.text} className="gs-perk"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.35 + i * 0.06 }}>
                <Icon size={16} />
                {p.text}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Game cards grid */}
      <div className="gs-grid">
        {games.map((game, i) => {
          const Icon = game.icon;
          return (
            <motion.div key={game.title} className="gs-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -12, scale: 1.02 }}>

              {/* Glow blob */}
              <div className="gs-card-blob" style={{ background: `${game.color}18` }} />

              {/* Top row */}
              <div className="gs-card-top">
                <div className="gs-card-icon" style={{ background: `linear-gradient(135deg, ${game.color}, ${game.color}bb)` }}>
                  <Icon size={28} />
                </div>
                <span className="gs-xp">{game.xp}</span>
              </div>

              <h3>{game.title}</h3>
              <span className="gs-tag">{game.tag}</span>
              <p>{game.desc}</p>

              <Link to={game.link} className="gs-play-btn" style={{ borderColor: `${game.color}40`, color: game.color }}>
                Play Now <ArrowRight size={16} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CTA row */}
      <motion.div className="gs-cta"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <div className="gs-cta-text">
          <h3>All games included in your plan</h3>
          <p>Free tier gets limited plays — upgrade for unlimited access.</p>
        </div>
        <Link to="/games">
          <motion.button className="gs-cta-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Gamepad2 size={18} />
            Explore Games Zone
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
