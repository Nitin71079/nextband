import "./Stats.css";
import { motion } from "framer-motion";
import { Users, Brain, BookOpen, Trophy, Sparkles, Zap, Target, Star, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Stats() {
  const stats = [
    { icon: Users, number: "1,000+", title: "Active Students", subtitle: "Preparing every month", color: "#3b82f6", gradient: "from-blue-400 via-blue-500 to-indigo-600" },
    { icon: Brain, number: "20,000+", title: "AI Evaluations", subtitle: "Writing & Speaking", color: "#a855f7", gradient: "from-purple-400 via-purple-500 to-pink-600" },
    { icon: BookOpen, number: "120+", title: "Mock Tests", subtitle: "Academic & General", color: "#10b981", gradient: "from-emerald-400 via-emerald-500 to-teal-600" },
    { icon: Trophy, number: "98%", title: "Success Rate", subtitle: "Student Satisfaction", color: "#f59e0b", gradient: "from-amber-300 via-amber-400 to-amber-600" },
  ];

  const trust = [
    { icon: Star, text: "★ ★ ★ ★ ★  4.9 Rating" },
    { icon: Users, text: "1,000+ Active Students" },
    { icon: BookOpen, text: "120+ Authentic CBT Mocks" },
    { icon: Zap, text: "Band 9 AI Powered Engine" },
  ];

  return (
    <motion.section
      className="stats-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background ambient light mesh */}
      <div className="stats-mesh-glow" />

      <div className="stats-header">
        <span className="stats-badge">
          <Sparkles size={14} className="stats-badge-sparkle" />
          <span>PLATFORM STATS</span>
        </span>

        <h2 className="stats-title">
          Trusted By IELTS<br />
          <span className="stats-title-gradient">Learners Worldwide</span>
        </h2>

        <p className="stats-subtitle">
          Join thousands of students preparing with AI-powered IELTS practice, personalized feedback, and realistic CBT exams.
        </p>

        <div className="stats-trust">
          {trust.map((t, i) => {
            const TIcon = t.icon;
            return (
              <span key={i} className="stats-trust-pill">
                <TIcon size={14} className="stats-trust-icon" />
                <span>{t.text}</span>
              </span>
            );
          })}
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="stat-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.02 }}
            >
              <div className="shine" />
              
              {/* Top Accent Line */}
              <div className="stat-card-accent" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />

              <div
                className="stat-icon"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}, #0f172a)`,
                  boxShadow: `0 14px 35px ${stat.color}40`,
                  border: `1px solid ${stat.color}60`,
                }}
              >
                <Icon size={36} />
              </div>

              <h2 className={`stat-number bg-gradient-to-r ${stat.gradient}`}>
                {stat.number}
              </h2>

              <h3 className="stat-title-text">{stat.title}</h3>
              <p className="stat-subtitle-text">{stat.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
