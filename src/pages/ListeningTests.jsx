import ListeningTests from "./pages/ListeningTests";
import { Link } from "react-router-dom";
import listeningTests from "../data/listening";

export default function ListeningTests() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        IELTS Listening Tests
      </h1>

      {listeningTests.map(
        (test) => (
          <div
            key={test.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "20px",
            }}
          >
            <h2>
              {test.title}
            </h2>

            <p>
              Duration:
              {" "}
              {test.duration}
              {" "}
              mins
            </p>

            <Link
              to={`/listening/${test.id}`}
            >
              <button className="primary-btn">
                Start Test
              </button>
            </Link>
          </div>
        )
      )}
    </div>
  );
}