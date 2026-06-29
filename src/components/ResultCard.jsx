import "./resultCard.css";

export default function ResultCard({

  title = "Reading",

  score,

  total,

  band,

}) {

  const percentage = Math.round(

    (score / total) * 100

  );

  return (

    <div className="result-card">

      <div className="result-header">

        <h2>

          {title} Results

        </h2>

        <span>

          {percentage}%

        </span>

      </div>

      <div className="result-score">

        <h1>

          {score}

        </h1>

        <p>

          / {total}

        </p>

      </div>

      <div className="band-box">

        <span>

          Estimated IELTS Band

        </span>

        <h2>

          {band}

        </h2>

      </div>

    </div>

  );

}