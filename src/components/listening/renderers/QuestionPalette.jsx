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

                if(group.questions){

                    group.questions.forEach(q=>questions.push(q));

                }

                if(group.notes){

                    group.notes.forEach(item=>{

                        if(item.type==="blank"){

                            questions.push(item);

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