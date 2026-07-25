import "./ReviewModal.css";

export default function ReviewModal({

    sections,

    answers,

    flagged,

    onClose,

    onSubmit,

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

    const answered=questions.filter(q=>answers[q.id]).length;

    const unanswered=questions.length-answered;

    return(

        <div className="review-overlay">

            <div className="review-modal">

                <h2>

                    Review Your Answers

                </h2>

                <p>

                    Please check your answers before submitting.

                </p>

                <div className="review-summary">

                    <div>

                        <strong>

                            {answered}

                        </strong>

                        <span>

                            Answered

                        </span>

                    </div>

                    <div>

                        <strong>

                            {unanswered}

                        </strong>

                        <span>

                            Unanswered

                        </span>

                    </div>

                    <div>

                        <strong>

                            {flagged.length}

                        </strong>

                        <span>

                            Flagged

                        </span>

                    </div>

                </div>

                <div className="review-grid">

                    {questions.map(question=>(

                        <div

                            key={question.id}

                            className={`

                                review-number

                                ${answers[question.id]?"answered":""}

                                ${flagged.includes(question.id)?"flagged":""}

                            `}

                        >

                            {question.id}

                        </div>

                    ))}

                </div>

                <div className="review-buttons">

                    <button

                        className="secondary-btn"

                        onClick={onClose}

                    >

                        Return to Test

                    </button>

                    <button

                        className="primary-btn"

                        onClick={onSubmit}

                    >

                        Submit Test

                    </button>

                </div>

            </div>

        </div>

    );

}