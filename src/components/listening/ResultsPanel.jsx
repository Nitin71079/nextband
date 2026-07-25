import { getIELTSListeningBand } from "../../services/BandCalculator";
import "../../styles/listening/ResultsPanel.css";
export default function ResultsPanel({

    test,

    answers,

}){

    const allQuestions=[];

    test.sections.forEach(section=>{

        if(section.form){

            section.form.forEach(q=>allQuestions.push(q));

        }

        if(section.groups){

            section.groups.forEach(group=>{

                if(group.questions){

                    group.questions.forEach(q=>allQuestions.push(q));

                }

                if(group.notes){

                    group.notes.forEach(item=>{

                        if(item.type==="blank"){

                            allQuestions.push(item);

                        }

                    });

                }

            });

        }

    });

    let score=0;

    allQuestions.forEach(question=>{

        const user=String(

            answers[question.id]||""

        ).trim().toLowerCase();

        const correct=String(

            question.answer

        ).trim().toLowerCase();

        if(user===correct){

            score++;

        }

    });

    const band=getIELTSListeningBand(score);

    return(

        <div className="results-page">

            <h1>

                IELTS Listening Results

            </h1>

            <div className="score-card">

                <h2>

                    {score}/40

                </h2>

                <h3>

                    Estimated Band {band}

                </h3>

            </div>

            <div className="answer-review">

                {allQuestions.map(question=>{

                    const user=

                        answers[question.id]||"";

                    const correct=

                        question.answer;

                    const isCorrect=

                        user.toLowerCase().trim()===

                        correct.toLowerCase().trim();

                    return(

                        <div

                            key={question.id}

                            className={`answer-card ${

                                isCorrect

                                ?"correct"

                                :"wrong"

                            }`}

                        >

                            <h4>

                                Question {question.id}

                            </h4>

                            <p>

                                <strong>

                                    Your answer:

                                </strong>{" "}

                                {user||"Not answered"}

                            </p>

                            <p>

                                <strong>

                                    Correct answer:

                                </strong>{" "}

                                {correct}

                            </p>

                            <p>

                                {question.explanation}

                            </p>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}