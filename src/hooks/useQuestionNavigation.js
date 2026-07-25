import { useState } from "react";

export default function useQuestionNavigation() {

    const [currentQuestion, setCurrentQuestion] = useState(1);

    const goToQuestion = (id) => {

        setCurrentQuestion(id);

        const element = document.getElementById(
            `question-${id}`
        );

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        element.classList.remove("question-active");

        requestAnimationFrame(() => {

            element.classList.add("question-active");

        });

        setTimeout(() => {

            element.classList.remove("question-active");

        }, 1200);

    };

    return {

        currentQuestion,

        goToQuestion,

        setCurrentQuestion,

    };

}