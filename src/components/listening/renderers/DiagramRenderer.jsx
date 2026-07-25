import React from "react";
import "../../../styles/listening/DiagramRenderer.css";
export default function DiagramRenderer({

    group,

    answers,

    updateAnswer,

    toggleFlag,

    flagged,

}){

    return(

        <div className="diagram-renderer">

            <h3>{group.title}</h3>

            <p>{group.instruction}</p>

            <img

                src={group.image}

                alt="Diagram"

                className="diagram-image"

            />

            {group.questions.map(question=>(

                <div

                    key={question.id}

                    id={`question-${question.id}`}

                    className="diagram-question"

                >

                    <label>

                        {question.label}

                    </label>

                    <input

                        value={answers[question.id]||""}

                        onChange={(e)=>

                            updateAnswer(

                                question.id,

                                e.target.value

                            )

                        }

                    />

                    <button

                        className="flag-btn"

                        onClick={()=>

                            toggleFlag(question.id)

                        }

                    >

                        {

                            flagged.includes(question.id)

                            ?"🚩"

                            :"⚑"

                        }

                    </button>

                </div>

            ))}

        </div>

    );

}