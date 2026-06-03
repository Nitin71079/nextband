    import { useEffect, useState } from "react";

    import AudioPlayer from "../components/AudioPlayer";

    import listeningTests from "../data/listening/tests";

    export default function MockListening() {
    const [test] = useState(
    () =>
    listeningTests[
    Math.floor(
    Math.random() *
    listeningTests.length
    )
    ]
    );

    const [answers, setAnswers] =
    useState({});

    const [submitted, setSubmitted] =
    useState(false);

    const [timeLeft, setTimeLeft] =
    useState(
    (test.duration || 30) * 60
    );

    useEffect(() => {
    const timer =
    setInterval(() => {
    setTimeLeft(
    (prev) => {
    if (prev <= 1) {
    clearInterval(
    timer
    );

            setSubmitted(
                true
            );

            return 0;
            }

            return prev - 1;
        }
        );
    }, 1000);

    return () =>
    clearInterval(timer);
    }, []);

    function updateAnswer(
    questionId,
    value
    ) {
    setAnswers((prev) => ({
    ...prev,
    [questionId]: value,
    }));
    }

    function calculateScore() {
    let score = 0;

    
    test.sections.forEach(
    (section) => {
        section.questions.forEach(
        (question) => {
            const userAnswer =
            String(
                answers[
                question.id
                ] || ""
            )
                .trim()
                .toLowerCase();

            const correctAnswer =
            String(
                question.answer
            )
                .trim()
                .toLowerCase();

            if (
            userAnswer ===
            correctAnswer
            ) {
            score++;
            }
        }
        );
    }
    );

    return score;


    }

    function getBand(score) {
    if (score >= 39) return 9;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6;
    if (score >= 18) return 5.5;

    return 5;
    

    }

    const totalQuestions =
    test.sections.reduce(
    (total, section) =>
    total +
    section.questions.length,
    0
    );

    const answeredQuestions =
    Object.keys(
    answers
    ).length;

    const minutes =
    Math.floor(timeLeft / 60);

    const seconds =
    timeLeft % 60;

    if (submitted) {
    const score =
    calculateScore();


    const band =
    getBand(score);

    const result = {
    testId: test.id,
    testTitle:
        test.title,
    score,
    band,
    completedAt:
        new Date().toISOString(),
    };

    const previous =
    JSON.parse(
        localStorage.getItem(
        "listeningResults"
        ) || "[]"
    );

    localStorage.setItem(
    "listeningResults",
    JSON.stringify([
        ...previous,
        result,
    ])
    );

    return (
    <div
        style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
        }}
    >
        <h1>
        IELTS Listening Results
        </h1>

        <div
        style={{
            background:
            "#fff",
            padding: "25px",
            borderRadius:
            "16px",
            marginTop: "20px",
        }}
        >
        <h2>
            Test:
            {" "}
            {test.title}
        </h2>

        <h2>
            Score:
            {" "}
            {score}/
            {totalQuestions}
        </h2>

        <h2>
            Estimated Band:
            {" "}
            {band}
        </h2>

        <h3>
            Answered:
            {" "}
            {
            answeredQuestions
            }
            /
            {
            totalQuestions
            }
        </h3>
        </div>

        <button
        className="primary-btn"
        style={{
            marginTop:
            "20px",
        }}
        onClick={() =>
            window.location.reload()
        }
        >
        Restart Test
        </button>
    </div>
    );

    }

    return (
    <div
    style={{
    minHeight:
    "100vh",
    padding: "30px",
    maxWidth:
    "1200px",
    margin: "0 auto",
    }}
    >
    <div
    style={{
    display: "flex",
    justifyContent:
    "space-between",
    marginBottom:
    "20px",
    }}
    > <div> <h1>
    IELTS Listening Test </h1>

    ```
        <p>
            {test.title}
        </p>
        </div>

        <h2>
        {minutes}:
        {String(
            seconds
        ).padStart(
            2,
            "0"
        )}
        </h2>
    </div>

    <AudioPlayer
        audioUrl={
        test.audioUrl
        }
    />

    {test.sections.map(
        (section) => (
        <div
            key={
            section.id
            }
            style={{
            background:
                "#fff",
            padding:
                "20px",
            borderRadius:
                "16px",
            marginBottom:
                "20px",
            }}
        >
            <h2>
            {
                section.title
            }
            </h2>

            {section.questions.map(
            (
                question
            ) => (
                <div
                key={
                    question.id
                }
                style={{
                    marginBottom:
                    "20px",
                }}
                >
                <p>
                    <strong>
                    {
                        question.id
                    }
                    .
                    </strong>{" "}
                    {
                    question.question
                    }
                </p>

                <input
                    type="text"
                    value={
                    answers[
                        question.id
                    ] || ""
                    }
                    onChange={(
                    e
                    ) =>
                    updateAnswer(
                        question.id,
                        e.target
                        .value
                    )
                    }
                    style={{
                    width:
                        "100%",
                    padding:
                        "10px",
                    }}
                />
                </div>
            )
            )}
        </div>
        )
    )}

    <button
        className="primary-btn"
        onClick={() =>
        setSubmitted(
            true
        )
        }
    >
        Submit Test
    </button>
    </div>

    );
    }
