import "./Testimonials.css";
import { motion } from "framer-motion";
import { Star, Sparkles, Quote, Trophy, TrendingUp, Target } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson", country: "United Kingdom", band: "Band 8.0", flag: "🇬🇧",
    review: "The AI writing feedback was incredibly accurate. It helped me improve my essays within a few weeks. The CBT experience was almost identical to the real exam.",
    module: "Writing",
  },
  {
    name: "Rahul Sharma", country: "India", band: "Band 7.5", flag: "🇮🇳",
    review: "The mock tests felt almost identical to the real IELTS CBT exam. The Games Zone kept me motivated daily and the dashboard analytics showed exactly where to improve.",
    module: "Reading",
  },
  {
    name: "Emily Carter", country: "Australia", band: "Band 8.5", flag: "🇦🇺",
    review: "The AI Speaking feedback completely changed my confidence. Vocab Battle and Reading Race made studying addictive. I finally knew exactly what to improve.",
    module: "Speaking",
  },
];

const metrics = [
  { icon: TrendingUp, val: "4.9★", label: "Average Rating" },
  { icon: Target, val: "96%", label: "Student Satisfaction" },
  { icon: Trophy, val: "Band 7.5+", label: "Average Improvement" },
];

export default function Testimonials() {
  return (
    <motion.section className="testimonials"
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}>

      <div className="testimonials-header">
        <span><Sparkles size={15} /> STUDENT SUCCESS STORIES</span>
        <h2>Trusted by Future<br />IELTS Achievers</h2>
        <p>Discover how students improve their IELTS preparation with AI-powered feedback, realistic CBT practice, and personalized study guidance on Knarrow.</p>
      </div>

      {/* Metrics row */}
      <div className="testimonials-metrics">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} className="t-metric"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="t-metric-icon"><Icon size={20} /></div>
              <div>
                <strong>{m.val}</strong>
                <span>{m.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="testimonial-grid">
        {reviews.map((review, index) => (
          <motion.div key={review.name} className="testimonial-card"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: index * 0.12 }}
            whileHover={{ y: -10, scale: 1.02 }}>

            <div className="stars">
              {[...Array(5)].map((_, star) => <Star key={star} size={18} fill="#fbbf24" color="#fbbf24" />)}
            </div>

            <Quote size={28} color="#2563eb" style={{ marginBottom: "18px", opacity: 0.7 }} />

            <p className="review">"{review.review}"</p>

            <div className="review-footer">
              <div className="review-user">
                <div className="avatar">{review.name.charAt(0)}</div>
                <div>
                  <h4>{review.name}</h4>
                  <span>{review.flag} {review.country}</span>
                </div>
              </div>
              <div className="band-chip">{review.band}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
