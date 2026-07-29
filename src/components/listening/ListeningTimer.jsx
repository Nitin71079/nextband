import "../../styles/listening/ListeningTimer.css";

export default function ListeningTimer({ minutes, seconds }) {
  const totalSecs = minutes * 60 + Number(seconds);
  const urgency = totalSecs <= 60 ? "danger" : totalSecs <= 300 ? "warning" : "";

  return (
    <div className={`timer-card ${urgency}`}>
      <span className="timer-label">Time Left</span>
      <span className="timer-value">
        {String(minutes).padStart(2, "0")}:{seconds}
      </span>
    </div>
  );
}
