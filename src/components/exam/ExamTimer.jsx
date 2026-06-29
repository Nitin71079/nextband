import "../../styles/exam/examTimer.css";
import {
  useEffect,
  useMemo,
} from "react";

import { Clock } from "lucide-react";

import { useExam } from "../../context/ExamContext";

export default function ExamTimer({

  onTimeUp,

}) {

  const {

    timeRemaining,

    setTimeRemaining,

  } = useExam();

  useEffect(() => {

    if (
      timeRemaining === null
    )
      return;

    if (
      timeRemaining <= 0
    ) {

      onTimeUp?.();

      return;

    }

    const timer =
      setInterval(() => {

        setTimeRemaining(
          (prev) => prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [

    timeRemaining,

    onTimeUp,

    setTimeRemaining,

  ]);

  const formatted =
    useMemo(() => {

      if (
        timeRemaining === null
      )
        return "--:--";

      const hours =
        Math.floor(
          timeRemaining / 3600
        );

      const minutes =
        Math.floor(
          (timeRemaining %
            3600) /
            60
        );

      const seconds =
        timeRemaining % 60;

      if (hours > 0) {

        return `${String(
          hours
        ).padStart(
          2,
          "0"
        )}:${String(
          minutes
        ).padStart(
          2,
          "0"
        )}:${String(
          seconds
        ).padStart(
          2,
          "0"
        )}`;

      }

      return `${String(
        minutes
      ).padStart(
        2,
        "0"
      )}:${String(
        seconds
      ).padStart(
        2,
        "0"
      )}`;

    }, [timeRemaining]);

  return (

    <div className="exam-timer">

      <Clock size={20} />

      <span>

        {formatted}

      </span>

    </div>

  );

}