import "./CTA.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  Sparkles,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";

export default function CTA() {
  return (
    <motion.section
      className="cta"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="cta-glow"></div>
      <div className="cta-glow-two"></div>

      <motion.div
        className="cta-card"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
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
          Prepare smarter with AI-powered coaching,
          realistic CBT mock tests, writing &
          speaking evaluation, detailed analytics,
          and personalized study plans—all inside
          one modern platform.
        </p>

        <div className="cta-buttons">
          <Link to="/register">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="cta-primary"
            >
              Start Learning Free

              <ArrowRight size={18} />
            </motion.button>
          </Link>

          <Link to="/pricing">
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="cta-secondary"
            >
              See Pricing
            </motion.button>
          </Link>
        </div>

        <div className="cta-features">
          <div className="cta-feature">
            <ShieldCheck size={18} />
            No Credit Card Required
          </div>

          <div className="cta-feature">
            <BrainCircuit size={18} />
            AI Powered Learning
          </div>

          <div className="cta-feature">
            ⭐ Trusted IELTS Preparation
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}