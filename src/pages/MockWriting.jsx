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

import toast from "react-hot-toast";
import WritingReport from "../components/WritingReport";
import {
  validateWritingSubmission,
  TASK1_MIN_WORDS,
  TASK2_MIN_WORDS,
  countWords,
} from "../utils/writingBandCalculator";

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
      ALWAYS START FRESH (CLEAR DRAFTS)
  -------------------------- */

  useEffect(() => {
    localStorage.removeItem("writingDraft");
    setTask1("");
    setTask2("");
    setReport(null);
    setTimeLeft(60 * 60);
  }, [test.id]);

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
      toast.error("Free AI evaluation limit reached.");
      return;
    }

    // STRICT VALIDATION: Task 1 >= 80 words, Task 2 >= 200 words
    const validation = validateWritingSubmission(task1, task2);

    if (!validation.canSubmit) {
      toast.error(validation.reason);
      if (!validation.task1Valid) {
        setActiveTask(1);
      } else if (!validation.task2Valid) {
        setActiveTask(2);
      }
      return;
    }

    setLoading(true);

    try {
      const result = await evaluateWritingGPT({
        task1Text: task1,
        task2Text: task2,
        task1Type: test?.task1?.type || "Chart/Diagram",
        task1Question: test?.task1?.question || "",
        task2Question: test?.task2?.question || "",
      });

      trackAIUsage();

      saveEvaluation({
        type: "writing",
        overallBand: result.overallBand,
        report: result,
      });

      setReport(result);
      toast.success("AI Writing Evaluation Complete!");
    } catch (error) {
      console.error("Evaluation error:", error);
      toast.error("Evaluation failed. Please try again.");
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

<div className="task-badge" style={{ background: task1Words >= 80 ? "#dcfce7" : "#fee2e2", color: task1Words >= 80 ? "#166534" : "#991b1b" }}>

{task1Words >= 80 ? "✓ Min 80 Words Met" : "80+ Words (Required)"}

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

<div className="word-chip" style={{ background: task1Words >= 80 ? "#dcfce7" : "#fee2e2", color: task1Words >= 80 ? "#166534" : "#991b1b" }}>

{task1Words} Words {task1Words < 80 ? "(< 80)" : ""}

</div>

</div>

<textarea

value={task1}

onChange={(e)=>

setTask1(

e.target.value

)

}

placeholder="Write your Task 1 response here... (Minimum 80 words required to submit)"

className="writing-editor"

/>

<div className="editor-footer">

<div>

<strong>

Minimum Required

</strong>

80 Words

</div>

<div>

<strong>

Recommended

</strong>

170–190

</div>

<div>

<strong>

Current Status

</strong>

<span style={{ color: task1Words >= 80 ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>
{task1Words >= 80 ? `✓ Ready (${task1Words})` : `❌ Short (${task1Words}/80)`}
</span>

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

<div className="task-badge" style={{ background: task2Words >= 200 ? "#dcfce7" : "#fee2e2", color: task2Words >= 200 ? "#166534" : "#991b1b" }}>

{task2Words >= 200 ? "✓ Min 200 Words Met" : "200+ Words (Required)"}

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

<div className="word-chip" style={{ background: task2Words >= 200 ? "#dcfce7" : "#fee2e2", color: task2Words >= 200 ? "#166534" : "#991b1b" }}>

{task2Words} Words {task2Words < 200 ? "(< 200)" : ""}

</div>

</div>

<textarea

value={task2}

onChange={(e)=>

setTask2(

e.target.value

)

}

placeholder="Write your Task 2 essay here... (Minimum 200 words required to submit)"

className="writing-editor"

/>

<div className="editor-footer">

<div>

<strong>

Minimum Required

</strong>

200 Words

</div>

<div>

<strong>

Recommended

</strong>

280–320

</div>

<div>

<strong>

Current Status

</strong>

<span style={{ color: task2Words >= 200 ? "#16a34a" : "#dc2626", fontWeight: "bold" }}>
{task2Words >= 200 ? `✓ Ready (${task2Words})` : `❌ Short (${task2Words}/200)`}
</span>

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