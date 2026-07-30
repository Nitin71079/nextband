import "./Stats.css";
import { motion } from "framer-motion";
import { Users, Brain, BookOpen, Trophy, Sparkles, Zap, Target, Star } from "lucide-react";

export default function Stats() {
  const stats = [
    { icon: Users, number: "1,000+", title: "Active Students", subtitle: "Preparing every month", color: "#2563eb" },
    { icon: Brain, number: "20,000+", title: "AI Evaluations", subtitle: "Writing & Speaking", color: "#8b5cf6" },
    { icon: BookOpen, number: "120+", title: "Mock Tests", subtitle: "Academic & General", color: "#22c55e" },
    { icon: Trophy, number: "98%", title: "Success Rate", subtitle: "Student Satisfaction", color: "#f59e0b" },
  ];

  const trust = [
    { icon: Star, text: "★★★★★ 4.9 Rating" },
    { icon: Users, text: "1,000+ Students" },
    { icon: BookOpen, text: "120+ Mock Tests" },
    { icon: Zap, text: "AI Powered" },
  ];

  return (
    <motion.section className="stats-section"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>

      <div className="stats-header">
        <span className="stats-badge"><Sparkles size={15} /> PLATFORM STATS</span>
        <h2>Trusted By IELTS Learners Worldwide</h2>
        <p>Join thousands of students preparing with AI-powered IELTS practice, personalized feedback, and realistic CBT exams.</p>
        <div className="stats-trust">
          {trust.map((t) => <span key={t.text}>{t.text}</span>)}
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.title} className="stat-card"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.02 }}>
              <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)` }}>
                <Icon size={34} />
              </div>
              <h2>{stat.number}</h2>
              <h3>{stat.title}</h3>
              <p>{stat.subtitle}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
