import "../../styles/listening/ListeningTimer.css";
export default function ListeningTimer({
  minutes,
  seconds,
}) {
  return (
    <div className="timer-card">
      <h2>
        {minutes}:{seconds}
      </h2>
    </div>
  );
}