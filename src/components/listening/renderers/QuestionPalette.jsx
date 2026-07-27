import "./QuestionPalette.css";

export default function QuestionPalette({

    sections,

    answers,

    flagged,

    currentQuestion,

    onSelectQuestion,

}){

    const questions=[];

    sections.forEach(section=>{

        if(section.form){

            section.form.forEach(q=>questions.push(q));

        }

        if(section.groups){

            section.groups.forEach(group=>{

                // MCQ / Matching / Map
                if(group.questions){

                    group.questions.forEach(q=>questions.push(q));

                }

                // Notes completion blanks
                if(group.notes){

                    group.notes.forEach(item=>{

                        if(item.type==="blank"){

                            questions.push(item);

                        }

                    });

                }

                // Table rows – each row that contains a blank cell (object with id)
                if(group.rows){

                    group.rows.forEach(row=>{

                        row.forEach(cell=>{

                            if(cell.id !== undefined && cell.type === undefined){

                                questions.push(cell);

                            }

                        });

                    });

                }

                // Flowchart blank steps
                if(group.steps){

                    group.steps.forEach(step=>{

                        if(step.type==="blank"){

                            questions.push(step);

                        }

                    });

                }

            });

        }

    });

    return(

        <div className="question-palette">

            <h3>Questions</h3>

            <div className="palette-grid">

                {questions.map(question=>(

                    <button

                        key={question.id}

                        onClick={()=>onSelectQuestion(question.id)}

                        className={`

                            palette-number

                            ${currentQuestion===question.id?"current":""}

                            ${answers[question.id]?"answered":""}

                            ${flagged.includes(question.id)?"flagged":""}

                        `}

                    >

                        {question.id}

                    </button>

                ))}

            </div>

        </div>

    );

}