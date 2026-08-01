import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import writingTests from "../data/writing/tests";
import { useAuth } from "../context/AuthContext";
import { isWritingTestLocked } from "../services/freePlanLimits";

import "../styles/exam/shared.css";

import {
  getAIUsage,
  canUseAI,
  trackAIUsage,
} from "../services/aiUsage";

import {
  saveEvaluation,
} from "../services/evaluationStorage";

import {
  evaluateWritingGPT,
} from "../services/evaluateWritingGPT";

import WritingReport from "../components/WritingReport";

export default function MockWriting({
  onComplete,
  forcedTestId,
}) {
  const { testId: paramTestId } = useParams();
  const navigate = useNavigate();
  const { premium } = useAuth();
  const resolvedTestId = forcedTestId !== undefined ? forcedTestId : Number(paramTestId);

  const test =
    writingTests.find(
      (t) => t.id === resolvedTestId
    ) || writingTests[0];

  /* ── Free plan gate ── */
  useEffect(() => {
    if (forcedTestId !== undefined) return; // CBT controls its own gate
    if (isWritingTestLocked(test.id, premium)) {
      navigate("/pricing", { replace: true });
    }
  }, [test.id, premium, forcedTestId]); // eslint-disable-line

  const [
    activeTask,
    setActiveTask,
  ] = useState(1);

  const [
    task1,
    setTask1,
  ] = useState("");

  const [
    task2,
    setTask2,
  ] = useState("");

  const [
    report,
    setReport,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    timeLeft,
    setTimeLeft,
  ] = useState(60 * 60);

  /* -------------------------
      TIMER
  -------------------------- */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setTimeLeft((prev) => {

          if (prev <= 1) {

            clearInterval(timer);

            return 0;

          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  /* -------------------------
      LOAD DRAFT
  -------------------------- */

  useEffect(() => {

    const draft =
      localStorage.getItem(
        "writingDraft"
      );

    if (!draft) return;

    try {

      const data =
        JSON.parse(draft);

      setTask1(
        data.task1 || ""
      );

      setTask2(
        data.task2 || ""
      );

    } catch {

      console.log(
        "No draft found."
      );

    }

  }, []);

  /* -------------------------
      TIMER DISPLAY
  -------------------------- */

  const minutes =
    Math.floor(
      timeLeft / 60
    );

  const seconds =
    timeLeft % 60;

  /* -------------------------
      WORD COUNTS
  -------------------------- */

  const task1Words =
    task1
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  const task2Words =
    task2
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;

  /* -------------------------
      SAVE DRAFT
  -------------------------- */

  function saveDraft() {

    localStorage.setItem(

      "writingDraft",

      JSON.stringify({

        task1,

        task2,

      })

    );

    alert(
      "Draft Saved!"
    );

  }

  /* -------------------------
      RESET
  -------------------------- */

  function resetExam() {

    setTask1("");

    setTask2("");

    setReport(null);

    setTimeLeft(
      60 * 60
    );

    localStorage.removeItem(
      "writingDraft"
    );

  }

  /* -------------------------
      AI EVALUATION
  -------------------------- */

  async function handleEvaluation() {

    if (!canUseAI()) {

      alert(
        "Free AI evaluation limit reached."
      );

      return;

    }

    if (task2Words < 50) {

      alert(
        "Essay is too short."
      );

      return;

    }

    setLoading(true);

    try {

      const essay = `

Task 1

${task1}

-------------------------

Task 2

${task2}

`;

      const result =
        await evaluateWritingGPT(
          essay
        );

      trackAIUsage();

      saveEvaluation({

        type: "writing",

        overallBand:
          result.overallBand,

        report: result,

      });

      setReport(result);

    } catch (error) {

      console.error(
        error
      );

      alert(
        "Evaluation failed."
      );

    } finally {

      setLoading(false);

    }

  }

  /* -------------------------
      RETURN
  -------------------------- */

  return (
    <div
  style={{
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
  }}
>

{/* PREMIUM HEADER */}

<div
  style={{
    background:
      "linear-gradient(135deg,#f97316,#ea580c)",
    borderRadius: "24px",
    padding: "30px 35px",
    color: "white",
    marginBottom: "30px",
    boxShadow:
      "0 20px 45px rgba(249,115,22,.25)",
  }}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"25px",
}}
>

<div>

<h1
style={{
margin:0,
fontSize:"42px",
}}
>

✍ IELTS Writing Test

</h1>

<p
style={{
marginTop:"10px",
opacity:.95,
}}
>

Complete both writing tasks and receive an AI evaluation.

</p>

</div>

<div
style={{
display:"flex",
gap:"18px",
flexWrap:"wrap",
}}
>

<div className="writing-stat">

<span>

⏱ Time

</span>

<strong>

{minutes}:{String(seconds).padStart(2,"0")}

</strong>

</div>

<div className="writing-stat">

<span>

🤖 AI Used

</span>

<strong>

{getAIUsage()}/10

</strong>

</div>

<div className="writing-stat">

<span>

📝 Words

</span>

<strong>

{activeTask===1
?task1Words
:task2Words}

</strong>

</div>

</div>

</div>

</div>

{/* TASK SWITCHER */}

<div className="writing-tabs">

<button

className={
activeTask===1
?
"writing-tab active"
:
"writing-tab"
}

onClick={()=>setActiveTask(1)}

>

📊 Task 1

</button>

<button

className={
activeTask===2
?
"writing-tab active"
:
"writing-tab"
}

onClick={()=>setActiveTask(2)}

>

✍ Task 2

</button>

</div>

{/* ===========================
        TASK 1
=========================== */}

{activeTask===1 && (

<div
style={{
display:"grid",
gridTemplateColumns:"45% 55%",
gap:"30px",
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
}}
>

{/* LEFT */}

<div className="question-panel">

<div className="question-header">

<div>

<h2>

📊 Academic Writing Task 1

</h2>

<p>

Recommended Time • 20 Minutes

</p>

</div>

<div className="task-badge">

150+ Words

</div>

</div>

<div className="question-box">

{test.task1.question}

</div>

<img

src={test.task1.image}

alt="Task 1"

className="writing-image"

/>

</div>

{/* RIGHT */}

<div className="editor-panel">

<div className="editor-header">

<div>

<h2>

📝 Essay Editor

</h2>

<p>

Summarise the information shown.

</p>

</div>

<div className="word-chip">

{task1Words} Words

</div>

</div>

<textarea

value={task1}

onChange={(e)=>

setTask1(

e.target.value

)

}

placeholder="Write your Task 1 response here..."

className="writing-editor"

/>

<div className="editor-footer">

<div>

<strong>

Minimum

</strong>

150 Words

</div>

<div>

<strong>

Recommended

</strong>

170–190

</div>

<div>

<strong>

Current

</strong>

{task1Words}

</div>

</div>

</div>

</div>

)}
{/* ===========================
        TASK 2
=========================== */}

{activeTask===2 && (

<div
style={{
display:"grid",
gridTemplateColumns:"45% 55%",
gap:"30px",
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
}}
>

{/* LEFT */}

<div className="question-panel">

<div className="question-header">

<div>

<h2>

✍ Academic Writing Task 2

</h2>

<p>

Recommended Time • 40 Minutes

</p>

</div>

<div className="task-badge">

250+ Words

</div>

</div>

<div className="question-box">

{test.task2.question}

</div>

</div>

{/* RIGHT */}

<div className="editor-panel">

<div className="editor-header">

<div>

<h2>

📝 Essay Editor

</h2>

<p>

Present your opinion with relevant examples.

</p>

</div>

<div className="word-chip">

{task2Words} Words

</div>

</div>

<textarea

value={task2}

onChange={(e)=>

setTask2(

e.target.value

)

}

placeholder="Write your Task 2 essay here..."

className="writing-editor"

/>

<div className="editor-footer">

<div>

<strong>

Minimum

</strong>

250 Words

</div>

<div>

<strong>

Recommended

</strong>

280–320

</div>

<div>

<strong>

Current

</strong>

{task2Words}

</div>

</div>

</div>

</div>

)}

{/* =====================================
            TOOLBAR
===================================== */}

<div className="writing-toolbar">

<div className="toolbar-left">

<button

className="secondary-btn"

onClick={saveDraft}

>

💾 Save Draft

</button>

<button

className="secondary-btn"

onClick={resetExam}

>

🔄 Reset

</button>

</div>

<div className="toolbar-right">

<button

className="primary-btn"

onClick={handleEvaluation}

disabled={loading}

>

{loading

?

"🤖 AI Evaluating..."

:

"🤖 AI Evaluate Essay"}

</button>

</div>

</div>

{/* =====================================
            REPORT
===================================== */}

{report && (

<>

<div className="report-card">

<h2>

🤖 AI Writing Report

</h2>

<p>

Detailed IELTS Band Analysis

</p>

<WritingReport

report={report}

/>

</div>

<div
style={{
marginTop:"30px",
display:"flex",
justifyContent:"center",
}}
>

<button

className="primary-btn"

style={{
padding:"16px 42px",
fontSize:"18px",
}}

onClick={()=>{

if(onComplete){

onComplete(

report.overallBand || 6

);

}

}}

>

Continue to Speaking →

</button>

</div>

</>

)}

</div>

);

}