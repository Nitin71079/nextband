import ScoreCard from "../components/essay/ScoreCard";

export default function EssayRenderer({ result }) {
  const {
    overallBand,
    criteria = {},
    strengths = [],
    weaknesses = [],
    improvementTips = [],
    sentenceCorrections = [],
    band9Essay = "",
    summary = "",
  } = result;

  return (
    <div className="space-y-6">

      {/* Overall Band */}

      <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

        <p className="text-slate-400 text-sm">
          Overall IELTS Band
        </p>

        <h1 className="text-6xl font-bold text-cyan-400 mt-2">
          {overallBand}
        </h1>

        <p className="text-slate-300 mt-4">
          {summary}
        </p>

      </section>

      {/* Criteria */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <ScoreCard
          title="Task Response"
          score={criteria.taskResponse}
        />

        <ScoreCard
          title="Coherence & Cohesion"
          score={criteria.coherence}
        />

        <ScoreCard
          title="Lexical Resource"
          score={criteria.lexical}
        />

        <ScoreCard
          title="Grammar"
          score={criteria.grammar}
        />

      </section>

      {/* Strengths */}

      <Card
        title="Strengths"
        items={strengths}
        icon="✅"
      />

      {/* Weaknesses */}

      <Card
        title="Areas to Improve"
        items={weaknesses}
        icon="⚠️"
      />

      {/* Improvement Tips */}

      <Card
        title="Next Steps"
        items={improvementTips}
        icon="📚"
      />

      {/* Corrections */}

      {sentenceCorrections.length > 0 && (
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-xl font-semibold mb-5">
            Sentence Corrections
          </h2>

          <div className="space-y-5">

            {sentenceCorrections.map(
              (item, index) => (
                <div
                  key={index}
                  className="border-b border-slate-800 pb-5"
                >
                  <p className="text-red-400">
                    ❌ {item.original}
                  </p>

                  <p className="text-green-400 mt-3">
                    ✅ {item.corrected}
                  </p>

                  <p className="text-slate-400 mt-2 text-sm">
                    {item.reason}
                  </p>
                </div>
              )
            )}

          </div>

        </section>
      )}

      {/* Rewrite */}

      {band9Essay && (
        <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

          <h2 className="text-xl font-semibold mb-5">
            Band 9 Rewrite
          </h2>

          <div className="whitespace-pre-wrap leading-8 text-slate-200">
            {band9Essay}
          </div>

        </section>
      )}

    </div>
  );
}

function Card({
  title,
  items = [],
  icon,
}) {
  if (!items.length) return null;

  return (
    <section className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-semibold mb-4">
        {icon} {title}
      </h2>

      <ul className="space-y-3">

        {items.map((item, index) => (
          <li
            key={index}
            className="text-slate-300"
          >
            • {item}
          </li>
        ))}

      </ul>

    </section>
  );
}