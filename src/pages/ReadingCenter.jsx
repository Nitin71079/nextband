import { useNavigate } from "react-router-dom";
import "../styles/testCenter.css";

export default function ReadingCenter() {
  const navigate = useNavigate();

  return (
    <div className="test-center">
      <div className="hero-card reading">
        <div className="hero-left">
          <div className="hero-icon">📘</div>

          <div>
            <h1>Reading Center</h1>
            <p>
              Choose the IELTS Reading module you want to practice.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
          gap: "25px",
          marginTop: "40px",
        }}
      >
        <div className="test-card reading">
          <h2>📘 Academic Reading</h2>

          <p>
            University-level passages with academic vocabulary and research-based texts.
          </p>

          <button
            className="start-btn reading"
            onClick={() => navigate("/reading/academic")}
          >
            Open Academic Reading →
          </button>
        </div>

        <div className="test-card reading">
          <h2>📗 General Reading</h2>

          <p>
            Everyday notices, workplace documents and general-interest articles.
          </p>

          <button
            className="start-btn reading"
            onClick={() => navigate("/reading/general")}
          >
            Open General Reading →
          </button>
        </div>
      </div>
    </div>
  );
}