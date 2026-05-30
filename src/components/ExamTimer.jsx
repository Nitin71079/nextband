import {
  useEffect,
  useState
} from "react";

export default function ExamTimer({
  initialMinutes,
  onComplete
}) {
  const [timeLeft,
    setTimeLeft] =
    useState(
      initialMinutes * 60
    );

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();

      return;
    }

    const timer =
      setInterval(() => {
        setTimeLeft(
          (prev) =>
            prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [
    timeLeft,
    onComplete
  ]);

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  return (
    <div
      style={{
        background:
          timeLeft < 300
            ? "#fef2f2"
            : "#ecfeff",

        padding:
          "18px 28px",

        borderRadius:
          "18px",

        fontWeight:
          "bold",

        fontSize:
          "22px",

        color:
          timeLeft < 300
            ? "#dc2626"
            : "#0891b2",

        display:
          "inline-flex",

        alignItems:
          "center",

        gap: "12px"
      }}
    >
      ⏱️
      {minutes}:
      {seconds < 10
        ? `0${seconds}`
        : seconds}
    </div>
  );
}