import "./ListeningReview.css";

export default function ListeningReview({

    sections,

    answers,

    flagged,

    onReturn,

    onSubmit,

    goToQuestion,

}){

    const questions=[];

    sections.forEach(section=>{

        if(section.form){

            section.form.forEach(q=>questions.push(q));

        }

        if(section.groups){

            section.groups.forEach(group=>{

                if(group.questions){

                    group.questions.forEach(q=>questions.push(q));

                }

                if(group.notes){

                    group.notes.forEach(note=>{

                        if(note.type==="blank"){

                            questions.push(note);

                        }

                    });

                }

            });

        }

    });

    const answered=

        questions.filter(

            q=>answers[q.id]

        ).length;

    return(

        <div className="review-overlay">

            <div className="review-card">

                <h1>

                    Review Your Listening Test

                </h1>

                <p>

                    Check your answers before submitting.

                </p>

                <div className="review-stats">

                    <div>

                        <h2>{questions.length}</h2>

                        <span>Total</span>

                    </div>

                    <div>

                        <h2>{answered}</h2>

                        <span>Answered</span>

                    </div>

                    <div>

                        <h2>

                            {questions.length-answered}

                        </h2>

                        <span>Remaining</span>

                    </div>

                    <div>

                        <h2>

                            {flagged.length}

                        </h2>

                        <span>Flagged</span>

                    </div>

                </div>

                <div className="review-grid">

                    {questions.map(question=>(

                        <button

                            key={question.id}

                            onClick={()=>{

                                onReturn();

                                goToQuestion(question.id);

                            }}

                            className={`

                                review-number

                                ${answers[question.id]

                                ?"answered"

                                :""

                                }

                                ${flagged.includes(question.id)

                                ?"flagged"

                                :""

                                }

                            `}

                        >

                            {question.id}

                        </button>

                    ))}

                </div>

                <div className="review-actions">

                    <button

                        className="secondary-btn"

                        onClick={onReturn}

                    >

                        Return to Test

                    </button>

                    <button

                        className="primary-btn"

                        onClick={onSubmit}

                    >

                        Submit Listening Test

                    </button>

                </div>

            </div>

        </div>

    );

}