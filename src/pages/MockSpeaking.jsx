import "../styles/exam/shared.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import speakingTests from "../data/speaking/tests";

import {
  evaluateSpeakingGPT,
} from "../services/evaluateSpeakingGPT";

import {
  saveEvaluation,
} from "../services/evaluationStorage";

import {
  canUseAI,
  trackAIUsage,
  getAIUsage,
} from "../services/aiUsage";

import {
  useExam,
} from "../context/ExamContext";

import SpeakingReport from "../components/SpeakingReport";

import AudioRecorder from "../components/AudioRecorder";
import AudioPlayback from "../components/AudioPlayback";
import MicrophoneStatus from "../components/MicrophoneStatus";

export default function MockSpeaking({

  mode = "practice",

  onComplete,

  forcedTestId,

}) {

  const { testId: paramTestId } = useParams();

  const {

    setSpeakingBand,

  } = useExam();

  const resolvedTestId = forcedTestId !== undefined ? forcedTestId : Number(paramTestId);

  const test =

    speakingTests.find(

      t =>

        t.id === resolvedTestId

    ) ||

    speakingTests[0];

  const [

    currentPart,

    setCurrentPart,

  ] = useState(1);

  const [

    response,

    setResponse,

  ] = useState("");

  const [

    report,

    setReport,

  ] = useState(null);

  const [

    audioBlob,

    setAudioBlob,

  ] = useState(null);

  const [

    audioUrl,

    setAudioUrl,

  ] = useState("");

  const [

    transcript,

    setTranscript,

  ] = useState("");

  const [

    evaluating,

    setEvaluating,

  ] = useState(false);

  /* -------------------------
        RECORDING
  ------------------------- */

  function handleRecording(blob) {

    setAudioBlob(blob);

    setAudioUrl(

      URL.createObjectURL(blob)

    );

  }

  /* -------------------------
        RESET
  ------------------------- */

  function resetSpeaking() {

    setResponse("");

    setTranscript("");

    setAudioBlob(null);

    setAudioUrl("");

    setReport(null);

  }

  /* -------------------------
        SAVE TRANSCRIPT
  ------------------------- */

  function saveDraft() {

    localStorage.setItem(

      "speakingDraft",

      JSON.stringify({

        response,

        transcript,

      })

    );

    alert("Draft Saved!");

  }

  /* -------------------------
        LOAD DRAFT
  ------------------------- */

  useEffect(() => {

    const draft =

      localStorage.getItem(

        "speakingDraft"

      );

    if (!draft) return;

    try {

      const data =

        JSON.parse(draft);

      setResponse(

        data.response || ""

      );

      setTranscript(

        data.transcript || ""

      );

    } catch {}

  }, []);

  /* -------------------------
        AI EVALUATION
  ------------------------- */

  async function handleEvaluation() {

    if (!canUseAI()) {

      alert(

        "Free AI evaluation limit reached."

      );

      return;

    }

    const words =

      response

        .trim()

        .split(/\s+/)

        .filter(Boolean)

        .length;

    if (words < 15) {

      alert(

        "Speaking response is too short."

      );

      return;

    }

    setEvaluating(true);

    try {

      const result =

        await evaluateSpeakingGPT(

          response

        );

      if (!result)

        throw new Error(

          "No evaluation."

        );

      trackAIUsage();

      saveEvaluation({

        type: "speaking",

        overallBand:

          result.overallBand || 6,

        report: result,

        createdAt:

          new Date().toISOString(),

      });

      setReport(result);

      if (

        result.overallBand

      ) {

        setSpeakingBand(

          result.overallBand

        );

      }

    } catch (error) {

      console.error(error);

      alert(

        "Evaluation failed."

      );

    } finally {

      setEvaluating(false);

    }

  }

  /* -------------------------
        RETURN
  ------------------------- */

  return (
    <div
  style={{
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "30px",
  }}
>

{/* ===========================================
                PREMIUM HEADER
=========================================== */}

<div
style={{
background:
"linear-gradient(135deg,#22c55e,#16a34a)",
borderRadius:"24px",
padding:"30px 35px",
color:"white",
marginBottom:"30px",
boxShadow:
"0 20px 45px rgba(34,197,94,.25)",
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

🎤 IELTS Speaking Test

</h1>

<p
style={{
marginTop:"10px",
opacity:.95,
}}
>

Complete all three parts and receive an AI band evaluation.

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

🎯 Part

</span>

<strong>

{currentPart}/3

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

🎙 Status

</span>

<strong>

{audioBlob ? "Recorded" : "Waiting"}

</strong>

</div>

</div>

</div>

</div>

{/* ===========================================
              PROGRESS BAR
=========================================== */}

<div
style={{
marginBottom:"30px",
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
fontWeight:"700",
marginBottom:"10px",
}}
>

<span>

Interview Progress

</span>

<span>

{currentPart} / 3

</span>

</div>

<div
style={{
height:"12px",
background:"#e2e8f0",
borderRadius:"999px",
overflow:"hidden",
}}
>

<div
style={{
width:`${(currentPart/3)*100}%`,
height:"100%",
background:
"linear-gradient(90deg,#22c55e,#16a34a)",
transition:".35s",
}}
/>

</div>

</div>

{/* ===========================================
                PART SWITCHER
=========================================== */}

<div className="writing-tabs">

<button
className={
currentPart===1
?
"writing-tab active"
:
"writing-tab"
}
onClick={()=>setCurrentPart(1)}
>

👋 Part 1

</button>

<button
className={
currentPart===2
?
"writing-tab active"
:
"writing-tab"
}
onClick={()=>setCurrentPart(2)}
>

📝 Part 2

</button>

<button
className={
currentPart===3
?
"writing-tab active"
:
"writing-tab"
}
onClick={()=>setCurrentPart(3)}
>

💬 Part 3

</button>

</div>

{/* ===========================================
             QUESTION CARD
=========================================== */}

<div
style={{
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
marginBottom:"30px",
}}
>

{currentPart===1 && (

<>

<div className="question-header">

<div>

<h2>

👋 {test.part1.title}

</h2>

<p>

Answer naturally and confidently.

</p>

</div>

<div className="task-badge">

4 Questions

</div>

</div>

<ul
style={{
marginTop:"25px",
lineHeight:"2",
fontSize:"18px",
}}
>

{test.part1.questions.map(

(question,index)=>(

<li
key={index}
style={{
marginBottom:"12px",
}}
>

{question}

</li>

)

)}

</ul>

</>

)}

{currentPart===2 && (

<>

<div className="question-header">

<div>

<h2>

📝 {test.part2.title}

</h2>

<p>

You have one minute to prepare.

</p>

</div>

<div className="task-badge">

Cue Card

</div>

</div>

<div
className="question-box"
style={{
marginTop:"25px",
whiteSpace:"pre-wrap",
}}
>

{test.part2.cueCard}

</div>

</>

)}

{currentPart===3 && (

<>

<div className="question-header">

<div>

<h2>

💬 {test.part3.title}

</h2>

<p>

Discuss the topic in more detail.

</p>

</div>

<div className="task-badge">

Discussion

</div>

</div>

<ul
style={{
marginTop:"25px",
lineHeight:"2",
fontSize:"18px",
}}
>

{test.part3.questions.map(

(question,index)=>(

<li
key={index}
style={{
marginBottom:"12px",
}}
>

{question}

</li>

)

)}

</ul>

</>

)}

</div>
{/* ===========================================
            RECORDING STUDIO
=========================================== */}

<div
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"30px",
marginBottom:"30px",
}}
>

<div
style={{
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
}}
>

<div className="editor-header">

<div>

<h2>

🎙 Recording Studio

</h2>

<p>

Record your answer using your microphone.

</p>

</div>

<div className="word-chip">

{audioBlob ? "Ready" : "Waiting"}

</div>

</div>

<AudioRecorder

onRecordingComplete={
handleRecording
}

onTranscriptGenerated={
(text)=>{

setTranscript(text);

setResponse(text);

}

}

/>

<div
style={{
marginTop:"20px",
}}
>

<MicrophoneStatus

audioBlob={audioBlob}

/>

</div>

<div
style={{
marginTop:"20px",
}}
>

<AudioPlayback

audioUrl={audioUrl}

/>

</div>

</div>

{/* =========================================== */}

<div
style={{
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
}}
>

<div className="editor-header">

<div>

<h2>

📝 AI Transcript

</h2>

<p>

Generated automatically after recording.

</p>

</div>

<div className="word-chip">

{transcript
? "Ready"
: "Empty"}

</div>

</div>

<div
className="question-box"
style={{
minHeight:"280px",
whiteSpace:"pre-wrap",
}}
>

{transcript ||

"No transcript available yet."}

</div>

</div>

</div>

{/* ===========================================
            RESPONSE EDITOR
=========================================== */}

<div
style={{
background:"white",
padding:"30px",
borderRadius:"22px",
boxShadow:
"0 12px 35px rgba(15,23,42,.08)",
marginBottom:"30px",
}}
>

<div className="editor-header">

<div>

<h2>

✍ Response Editor

</h2>

<p>

Edit your transcript before AI evaluation.

</p>

</div>

<div className="word-chip">

{

response

.trim()

.split(/\s+/)

.filter(Boolean)

.length

}

Words

</div>

</div>

<textarea

value={response}

onChange={(e)=>

setResponse(

e.target.value

)

}

className="writing-editor"

placeholder="Type or edit your speaking response..."

style={{

height:"350px",

}}

/>

<div className="editor-footer">

<div>

<strong>

Minimum

</strong>

15 Words

</div>

<div>

<strong>

Recommended

</strong>

80–150

</div>

<div>

<strong>

Current

</strong>

{

response

.trim()

.split(/\s+/)

.filter(Boolean)

.length

}

</div>

</div>

</div>

{/* ===========================================
              ACTION BAR
=========================================== */}

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

onClick={resetSpeaking}

>

🔄 Reset

</button>

</div>

<div className="toolbar-right">

<button

className="primary-btn"

onClick={handleEvaluation}

disabled={evaluating}

>

{

evaluating

?

"🤖 AI Evaluating..."

:

"🤖 Evaluate Speaking"

}

</button>

</div>

</div>
{/* ===========================================
                AI REPORT
=========================================== */}

{report && (

<>

<div className="report-card">

<h2>

🤖 AI Speaking Report

</h2>

<p>

Detailed IELTS Speaking Band Analysis

</p>

<SpeakingReport

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

Continue to Results →

</button>

</div>

</>

)}

</div>

);

}