import "./Features.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen, Headphones, PenSquare, Mic, BrainCircuit, BarChart3,
  ArrowRight, Sparkles, Crown, Users, Trophy, Star,
} from "lucide-react";

const coreFeatures = [
  {
    icon: BookOpen, title: "Reading", color: "#2563eb", badge: "120 Tests",
    description: "Real IELTS CBT reading tests with timers, passages, answer review and detailed analytics.",
    link: "/reading",
  },
  {
    icon: Headphones, title: "Listening", color: "#8b5cf6", badge: "30 Tests",
    description: "Authentic listening tests with synchronized audio, multi-format questions and automatic scoring.",
    link: "/listening",
  },
  {
    icon: PenSquare, title: "Writing", color: "#f59e0b", badge: "AI Evaluation",
    description: "Receive band-descriptor AI evaluation with detailed paragraph-by-paragraph feedback.",
    link: "/writing",
  },
  {
    icon: Mic, title: "Speaking", color: "#22c55e", badge: "Live AI",
    description: "Practice with an AI examiner. Get fluency, grammar and pronunciation scores instantly.",
    link: "/speaking",
  },
  {
    icon: BrainCircuit, title: "AI Coach", color: "#06b6d4", badge: "24/7",
    description: "Personalized study plans, band-gap analysis, daily goals and instant IELTS coaching.",
    link: "/ai-assistant",
  },
  {
    icon: BarChart3, title: "Analytics", color: "#ef4444", badge: "Insights",
    description: "Deep performance reports, predicted bands, skill breakdowns and trend tracking.",
    link: "/analytics",
  },
];

const extras = [
  { icon: Crown,  title: "Full Mock Tests", color: "#f59e0b", desc: "Academic & General CBT in exam conditions.", link: "/full-mocks"    },
  { icon: Users,  title: "Community",       color: "#2563eb", desc: "Forums, study groups and peer discussions.",  link: "/community"     },
  { icon: Trophy, title: "Leaderboard",     color: "#8b5cf6", desc: "Rank against learners globally each week.",   link: "/leaderboard"   },
  { icon: Star,   title: "Achievements",    color: "#22c55e", desc: "Badges, streaks and certificates for milestones.", link: "/achievements" },
];

export default function Features() {
  return (
    <motion.section className="features"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

      {/* ── CORE MODULES ── */}
      <div className="features-header">
        <span><Sparkles size={15} /> WHY STUDENTS CHOOSE KNARROW</span>
        <h2>Everything Required to<br />Master Every IELTS Module</h2>
        <p>Practice every IELTS module using realistic CBT exams, AI evaluation, personalized coaching and powerful analytics — all in one platform.</p>
      </div>

      <div className="features-grid">
        {coreFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} className="feature-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.02 }}>
              <div className="feature-icon" style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)` }}>
                <Icon size={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-footer">
                <span className="feature-badge">{feature.badge}</span>
                <Link to={feature.link} className="feature-link">Learn More <ArrowRight size={18} /></Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── EXTRA PERKS ── */}
      <div className="features-extras">
        {extras.map((extra, i) => {
          const Icon = extra.icon;
          return (
            <motion.div key={extra.title} className="extra-pill"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.04, y: -4 }}>
              <div className="extra-icon" style={{ background: `${extra.color}22`, color: extra.color }}>
                <Icon size={22} />
              </div>
              <div>
                <h4>{extra.title}</h4>
                <p>{extra.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
