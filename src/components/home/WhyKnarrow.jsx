import "./WhyKnarrow.css";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, Gamepad2, Zap, Crown } from "lucide-react";

export default function WhyKnarrow() {
  const traditional = [
    "Limited AI Feedback",
    "Generic Study Plans",
    "Basic Progress Tracking",
    "Manual Essay Review",
    "Fewer Mock Tests",
    "Minimal Personalization",
    "No Gamification",
    "No Multiplayer Learning",
  ];

  const knarrow = [
    "AI Writing & Speaking Evaluation",
    "Personalized AI Study Planner",
    "Full IELTS CBT Experience",
    "Advanced Performance Analytics",
    "Predicted IELTS Band Score",
    "Games Zone — Solo & Multiplayer",
    "Vocab Battles, Reading Races, Band Blitz",
    "Leaderboard, Achievements & Streaks",
  ];

  const perks = [
    { icon: Gamepad2, title: "7 Games", desc: "Solo + Multiplayer" },
    { icon: Crown, title: "Full Mocks", desc: "Academic & General" },
    { icon: Zap, title: "AI 24/7", desc: "Coach & Evaluator" },
    { icon: Sparkles, title: "Certificates", desc: "On Band Achievement" },
  ];

  return (
    <motion.section className="why"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>

      <div className="why-header">
        <span><Sparkles size={15} /> WHY KNARROW</span>
        <h2>Traditional IELTS Preparation<br />vs Knarrow</h2>
        <p>Knarrow combines realistic CBT exams, AI evaluation, analytics, gamified learning and personalized coaching into one modern IELTS preparation platform.</p>
      </div>

      <div className="comparison">
        <motion.div className="comparison-card old"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}>
          <h3>Traditional Preparation</h3>
          {traditional.map((item) => (
            <div key={item} className="comparison-item">
              <XCircle size={20} /><span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="comparison-card new"
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <h3>Knarrow</h3>
          {knarrow.map((item) => (
            <div key={item} className="comparison-item">
              <CheckCircle2 size={20} /><span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Perks strip */}
      <div className="why-perks">
        {perks.map((perk, i) => {
          const Icon = perk.icon;
          return (
            <motion.div key={perk.title} className="why-perk"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.05, y: -4 }}>
              <div className="why-perk-icon"><Icon size={22} /></div>
              <div>
                <h4>{perk.title}</h4>
                <p>{perk.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
