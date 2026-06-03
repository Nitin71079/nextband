import { useEffect } from "react";

export default function IELTSTimer({
  timeLeft,
  setTimeLeft,
  onTimeUp,
}) {
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);

          if (onTimeUp) {
            onTimeUp();
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft, onTimeUp]);

  const minutes = Math.floor(
    timeLeft / 60
  );

  const seconds =
    timeLeft % 60;

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        padding: "15px 25px",
        borderRadius: "12px",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      {minutes}:
      {String(seconds).padStart(
        2,
        "0"
      )}
    </div>
  );
}