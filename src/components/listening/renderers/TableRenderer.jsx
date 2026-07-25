import React from "react";
import "../../../styles/listening/TableRenderer.css";
export default function TableRenderer({

    group,

    answers,

    updateAnswer,

    toggleFlag,

    flagged,

}){

    return(

        <div className="table-renderer">

            <h3>{group.title}</h3>

            <p>{group.instruction}</p>

            <table className="ielts-table">

                <thead>

                    <tr>

                        {group.headers.map(header=>(

                            <th key={header}>

                                {header}

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {group.rows.map((row,index)=>(

                        <tr key={index}>

                            {row.map((cell,col)=>{

                                if(cell.type==="text"){

                                    return(

                                        <td key={col}>

                                            {cell.value}

                                        </td>

                                    );

                                }

                                return(

                                    <td

                                        key={col}

                                        id={`question-${cell.id}`}

                                    >

                                        <input

                                            value={answers[cell.id]||""}

                                            onChange={(e)=>

                                                updateAnswer(

                                                    cell.id,

                                                    e.target.value

                                                )

                                            }

                                        />

                                        <button

                                            className="flag-btn"

                                            onClick={()=>

                                                toggleFlag(cell.id)

                                            }

                                        >

                                            {

                                                flagged.includes(cell.id)

                                                ?"🚩"

                                                :"⚑"

                                            }

                                        </button>

                                    </td>

                                );

                            })}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}