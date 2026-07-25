import { useEffect } from "react";

export default function useAutosave({

  testId,

  answers,

  currentSection,

  currentQuestion,

  timeLeft,

}) {

  useEffect(() => {

    const data = {

      answers,

      currentSection,

      currentQuestion,

      timeLeft,

      updatedAt: Date.now(),

    };

    localStorage.setItem(

      `listening-${testId}`,

      JSON.stringify(data)

    );

  }, [

    testId,

    answers,

    currentSection,

    currentQuestion,

    timeLeft,

  ]);

}