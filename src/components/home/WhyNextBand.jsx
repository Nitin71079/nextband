import "./WhyNextBand.css";
import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function WhyNextBand() {
  return (
    <section className="why">

      <div className="why-header">

        <span>WHY CHOOSE US</span>

        <h2>

          Traditional IELTS Apps
          vs
          NextBand

        </h2>

        <p>

          NextBand combines realistic CBT exams,
          AI evaluation and personalized analytics
          into one complete preparation platform.

        </p>

      </div>

      <div className="comparison">

        <div className="comparison-card old">

          <h3>

            Traditional Apps

          </h3>

          <div className="comparison-item">

            <XCircle />

            Static Questions

          </div>

          <div className="comparison-item">

            <XCircle />

            Generic Feedback

          </div>

          <div className="comparison-item">

            <XCircle />

            No Speaking AI

          </div>

          <div className="comparison-item">

            <XCircle />

            No Analytics

          </div>

          <div className="comparison-item">

            <XCircle />

            Fixed Study Plans

          </div>

          <div className="comparison-item">

            <XCircle />

            Limited Mock Tests

          </div>

        </div>

        <div className="comparison-card new">

          <h3>

            NextBand

          </h3>

          <div className="comparison-item">

            <CheckCircle2 />

            AI Writing Evaluation

          </div>

          <div className="comparison-item">

            <CheckCircle2 />

            AI Speaking Feedback

          </div>

          <div className="comparison-item">

            <CheckCircle2 />

            Personalized Study Planner

          </div>

          <div className="comparison-item">

            <CheckCircle2 />

            Full CBT Experience

          </div>

          <div className="comparison-item">

            <CheckCircle2 />

            Performance Analytics

          </div>

          <div className="comparison-item">

            <CheckCircle2 />

            Predicted IELTS Band

          </div>

        </div>

      </div>

    </section>
  );
}