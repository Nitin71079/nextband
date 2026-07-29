import "./Footer.css";
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowUp,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* ========================= */}
        {/* BRAND */}
        {/* ========================= */}

        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <BrainCircuit size={28} />
            </div>

            <div>
              <h2>Knarrow</h2>

              <span className="footer-tagline">
                AI Powered IELTS Platform
              </span>
            </div>
          </div>

          <p>
            Prepare smarter with AI-powered IELTS practice,
            realistic CBT simulations, personalized feedback,
            detailed analytics and intelligent study plans—
            everything you need to achieve your dream IELTS
            band score in one modern platform.
          </p>

          <div className="footer-contact">
            <div className="contact-item">
              <Mail size={18} />
              <span>support@knarrow.in</span>
            </div>

            <div className="contact-item">
              <MapPin size={18} />
              <span>Bangalore, India</span>
            </div>
          </div>

          {/* SOCIALS */}

          <div className="footer-socials">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* ========================= */}
        {/* PLATFORM */}
        {/* ========================= */}

        <div className="footer-links">
          <h4>Platform</h4>

          <Link to="/reading">Reading</Link>
          <Link to="/listening">Listening</Link>
          <Link to="/writing">Writing</Link>
          <Link to="/speaking">Speaking</Link>
          <Link to="/mock-tests">Mock Tests</Link>
        </div>

        {/* ========================= */}
        {/* AI FEATURES */}
        {/* ========================= */}

        <div className="footer-links">
          <h4>AI Features</h4>

          <Link to="/ai-center">AI Coach</Link>
          <Link to="/planner">Study Planner</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/pricing">Premium</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        {/* ========================= */}
        {/* COMPANY */}
        {/* ========================= */}

        <div className="footer-links">
          <h4>Company</h4>

          <Link to="/about">About Us</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>

      {/* ========================= */}
      {/* NEWSLETTER */}
      {/* ========================= */}

      <div className="footer-newsletter">
        <div>
          <div className="newsletter-title">
            <Sparkles size={18} />
            <span>Stay Updated</span>
          </div>

          <p>
            Get IELTS tips, feature updates and AI learning
            improvements delivered straight to your inbox.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
          />

          <button type="submit">
            Subscribe
          </button>
        </form>
      </div>

      {/* ========================= */}
      {/* FOOTER BOTTOM */}
      {/* ========================= */}

      <div className="footer-bottom">
        <div className="footer-copyright">
          <span>© {year} Knarrow. All rights reserved.</span>

          <small>
            Built for ambitious IELTS learners aiming for Band 8+.
          </small>
        </div>

        <button
          className="scroll-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}