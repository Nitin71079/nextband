import { useNavigate } from "react-router-dom";
import { Trophy, BookOpen, Clock3, BarChart3 } from "lucide-react";
import "../styles/testCenter.css";
export default function TestCenter({

title,

description,

tests,

route,

icon,

theme = "blue",

}) {

const navigate = useNavigate();

const completed =
tests.filter(t=>t.completed).length;

const remaining =
tests.length-completed;

const bestBand =
Math.max(
...tests.map(t=>Number(t.bestBand)||0),
0
).toFixed(1);

const progress =
Math.round(
(completed/tests.length)*100
);

const lastTest =
tests.find(t=>!t.completed) || tests[0];

return(

<div className="test-center">

{/* HERO */}

{/* HERO */}

<div className={`hero-card ${theme}`}>
  <div className="hero-left">

    <div className="hero-icon">
      {icon}
    </div>

    <div>

      <h1>{title}</h1>

      <p>{description}</p>

      <div className="hero-features">

        <span>📚 {tests.length} Mock Tests</span>

        <span>🤖 AI Evaluation</span>

        <span>📈 Performance Tracking</span>

      </div>

    </div>

  </div>

  <div className="hero-right">

    <div className="hero-stats">

      <div>

        <span>⭐ Best Band</span>

        <strong>
          {bestBand === "0.0" ? "--" : bestBand}
        </strong>

      </div>

      <div>

        <span>🏆 Completed</span>

        <strong>
          {completed}/{tests.length}
        </strong>

      </div>

      <div>

        <span>📈 Progress</span>

        <strong>{progress}%</strong>

      </div>

    </div>

    <button

className={`continue-btn ${theme}`}
      onClick={() =>
        navigate(`${route}/${lastTest.id}`)
      }

    >

      ▶ Continue Practice

    </button>

  </div>

</div>

{/* STATS */}

<div className="stats-grid">

<div className="stat-card">

<Trophy size={34}/>

<div>

<h3>

Best Band

</h3>

<h2>

{bestBand==="0.0"?"--":bestBand}

</h2>

</div>

</div>

<div className="stat-card">

<BookOpen size={34}/>

<div>

<h3>

Completed

</h3>

<h2>

{completed}/{tests.length}

</h2>

</div>

</div>

<div className="stat-card">

<Clock3 size={34}/>

<div>

<h3>

Remaining

</h3>

<h2>

{remaining}

</h2>

</div>

</div>

<div className="stat-card">

<BarChart3 size={34}/>

<div>

<h3>

Progress

</h3>

<h2>

{progress}%

</h2>

</div>

</div>

</div>

{/* PROGRESS */}

<div className="progress-section">

<div className="progress-title">

<span>

Overall Progress

</span>

<span>

{progress}%

</span>

</div>

<div className="progress-bar">

<div

className={`progress-fill ${theme}`}
style={{

width:`${progress}%`

}}

></div>

</div>

</div>

{/* TEST GRID */}

<div className="test-grid">

{tests.map(test=>(

<div
key={test.id}
className={`test-card ${theme}`}
>

<div className="card-top">

<div>

<h2>

{test.title}

</h2>

<p>

Practice IELTS Mock Test

</p>

</div>

<span

className={`difficulty ${(test.difficulty || "Medium").toLowerCase()}`}
>

{test.difficulty || "Medium"}
</span>

</div>
<div className="card-info">

<div>

⏱

<span>

{test.duration}

</span>

</div>

<div>

📄

<span>

{test.questions} Questions

</span>

</div>

</div>

<div className="band-section">

<div>

<span className="label">

⭐ Best Band

</span>

<h3>

{test.bestBand}

</h3>

</div>

<div>

<span className="label">

Status

</span>

<h3>

{test.completed

?

"🏅 Completed"

:

"🕓 Not Attempted"}

</h3>

</div>

</div>

<button

className={`start-btn ${theme}`}
onClick={()=>

navigate(`${route}/${test.id}`)

}

>

{test.completed

?

"Continue Test →"

:

"Start Test →"}

</button>

</div>

))}

</div>

</div>

);

}