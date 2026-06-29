import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-bg"></div>

      <div className="hero-content">

        <div className="hero-left">

          <div className="hero-badge">

            <Sparkles size={16} />

            AI Powered IELTS Platform

          </div>

          <h1>

            Achieve Your Target
            <span> IELTS Band </span>
            Faster With AI

          </h1>

          <p>

            Practice Reading, Listening, Writing and
            Speaking with realistic CBT mock tests,
            AI evaluation, analytics and personalized
            study plans.

          </p>

          <div className="hero-buttons">

            <Link to="/register">

              <button className="primary-btn">

                Start Free

                <ArrowRight size={18} />

              </button>

            </Link>

            <Link to="/pricing">

              <button className="secondary-btn">

                View Premium

              </button>

            </Link>

          </div>

          <div className="hero-students">

            ⭐⭐⭐⭐⭐

            <span>

              Trusted by IELTS students preparing worldwide.

            </span>

          </div>

        </div>

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="dashboard-header">

              <div className="dashboard-title">

                NextBand Dashboard

              </div>

              <div className="band-chip">

                Band 7.5

              </div>

            </div>

            <div className="dashboard-card">

              <span>🔥 Study Streak</span>

              <h2>18 Days</h2>

            </div>

            <div className="dashboard-card">

              <span>📈 Progress</span>

              <h2>82%</h2>

            </div>

            <div className="dashboard-card">

              <span>🎯 Weekly Goal</span>

              <h2>Listening Test 2</h2>

            </div>

            <div className="dashboard-progress">

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: "82%" }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}