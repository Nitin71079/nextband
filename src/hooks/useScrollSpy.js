import { useEffect } from "react";

export default function useScrollSpy(setCurrentQuestion) {

    useEffect(() => {

        const observer = new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    const id = Number(

                        entry.target.id.replace(

                            "question-",

                            ""

                        )

                    );

                    if (!Number.isNaN(id)) {

                        setCurrentQuestion(id);

                    }

                });

            },

            {

                threshold: 0.55,

                rootMargin: "-20% 0px -20% 0px",

            }

        );

        const questions = document.querySelectorAll(

            "[id^='question-']"

        );

        questions.forEach((question) => {

            observer.observe(question);

        });

        return () => {

            questions.forEach((question) => {

                observer.unobserve(question);

            });

            observer.disconnect();

        };

    }, [setCurrentQuestion]);

}