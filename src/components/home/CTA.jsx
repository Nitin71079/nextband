import "./CTA.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, BrainCircuit, ShieldCheck,
  Trophy, Zap, Gamepad2, Users,
} from "lucide-react";

export default function CTA() {
  const bullets = [
    { icon: ShieldCheck, text: "No Credit Card Required" },
    { icon: BrainCircuit, text: "AI Powered Learning" },
    { icon: Gamepad2, text: "Games Zone Included" },
    { icon: Trophy, text: "Trusted IELTS Prep" },
  ];

  return (
    <motion.section className="cta"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="cta-glow" />
      <div className="cta-glow-two" />

      <motion.div className="cta-card"
        initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.2 }}>

        <div className="cta-badge">
          <Sparkles size={15} />
          START YOUR IELTS JOURNEY
        </div>

        <h2>
          Achieve Your
          <span> Dream IELTS Band </span>
          With Knarrow
        </h2>

        <p>
          Prepare smarter with AI-powered coaching, realistic CBT mock tests,
          writing & speaking evaluation, detailed analytics, gamified learning —
          all inside one modern premium platform.
        </p>

        <div className="cta-buttons">
          <Link to="/register">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="cta-primary">
              <Zap size={18} />
              Start Learning Free
              <ArrowRight size={18} />
            </motion.button>
          </Link>
          <Link to="/pricing">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="cta-secondary">
              See Pricing
            </motion.button>
          </Link>
        </div>

        <div className="cta-features">
          {bullets.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.text} className="cta-feature">
                <Icon size={18} />
                {b.text}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
