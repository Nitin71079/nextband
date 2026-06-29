import "./CTA.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta">

      <div className="cta-card">

        <span>START TODAY</span>

        <h2>

          Ready To Achieve
          Your Dream IELTS Band?

        </h2>

        <p>

          Join thousands of students using
          NextBand's AI-powered preparation platform.

        </p>

        <div className="cta-buttons">

          <Link to="/register">

            <button className="cta-primary">

              Start Free

              <ArrowRight size={18} />

            </button>

          </Link>

          <Link to="/pricing">

            <button className="cta-secondary">

              View Premium

            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}