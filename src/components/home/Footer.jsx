import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (

    <footer className="footer">

      <div className="footer-top">

        <div>

          <h2>NextBand</h2>

          <p>

            AI-powered IELTS preparation platform
            helping students achieve higher scores.

          </p>

        </div>

        <div>

          <h4>Platform</h4>

          <Link to="/reading">Reading</Link>

          <Link to="/listening">Listening</Link>

          <Link to="/writing">Writing</Link>

          <Link to="/speaking">Speaking</Link>

        </div>

        <div>

          <h4>Company</h4>

          <Link to="/pricing">Pricing</Link>

          <Link to="/community">Community</Link>

          <Link to="/leaderboard">Leaderboard</Link>

        </div>

        <div>

          <h4>Support</h4>

          <a href="#">Privacy</a>

          <a href="#">Terms</a>

          <a href="#">Contact</a>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 NextBand. All rights reserved.

      </div>

    </footer>

  );
}