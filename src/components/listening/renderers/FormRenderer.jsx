import React from "react";
import "../../../styles/listening/FormRenderer.css";
export default function FormRenderer({
    section,
    answers,
    updateAnswer,
}) {

    return (

        <div className="ielts-paper">

            <div className="question-header">

                <h2>
                    Questions {section.form[0].id}–{section.form[section.form.length - 1].id}
                </h2>

                <p>
                    {section.instruction}
                </p>

                <strong>
                    Write ONE WORD AND/OR A NUMBER.
                </strong>

            </div>

            <div className="ielts-form-card">

                <h2 className="form-title">
                    {section.formTitle}
                </h2>

                {section.form.map(field => (

                    <div

                        key={field.id}

                        id={`question-${field.id}`}

                        className="ielts-form-row"

                    >

                        <span className="question-number">

                            {field.id}.

                        </span>

                        <span className="field-label">

                            {field.label}

                        </span>

                        <div className="answer-line">

                            {field.prefix && (

                                <span className="prefix">

                                    {field.prefix}

                                </span>

                            )}

                            <input

                                value={answers[field.id] || ""}

                                onChange={(e)=>

                                    updateAnswer(

                                        field.id,

                                        e.target.value

                                    )

                                }

                                placeholder="Answer"

                            />

                            {field.suffix && (

                                <span className="suffix">

                                    {field.suffix}

                                </span>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}