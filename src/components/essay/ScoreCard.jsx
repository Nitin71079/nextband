import { TrendingUp, TrendingDown } from "lucide-react";

function getBandColor(score) {
  if (score >= 8.5) return "bg-emerald-500";
  if (score >= 7.5) return "bg-cyan-500";
  if (score >= 6.5) return "bg-yellow-500";
  if (score >= 5.5) return "bg-orange-500";

  return "bg-red-500";
}

function getBandLabel(score) {
  if (score >= 8.5) return "Excellent";
  if (score >= 7.5) return "Very Good";
  if (score >= 6.5) return "Good";
  if (score >= 5.5) return "Average";

  return "Needs Improvement";
}

export default function ScoreCard({
  title,
  score = 0,
  previousScore = null,
}) {
  const progress = Math.min(
    (score / 9) * 100,
    100
  );

  const improved =
    previousScore !== null &&
    score > previousScore;

  const declined =
    previousScore !== null &&
    score < previousScore;

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-5
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {score}
          </h2>

        </div>

        {improved && (
          <TrendingUp
            className="text-green-400"
            size={24}
          />
        )}

        {declined && (
          <TrendingDown
            className="text-red-400"
            size={24}
          />
        )}

      </div>

      {/* Progress */}

      <div className="mt-5 h-3 rounded-full bg-slate-700 overflow-hidden">

        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-700
            ${getBandColor(score)}
          `}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between">

        <span className="text-sm text-slate-400">

          {getBandLabel(score)}

        </span>

        <span className="text-sm text-slate-500">

          IELTS

        </span>

      </div>

    </div>
  );
}