import { Link } from "react-router-dom";

import {
  Calendar,
  FileText,
  Eye,
  Star,
} from "lucide-react";

export default function EssayHistoryCard({
  essay,
}) {
  const {
    id,
    essay: essayText,
    wordCount,
    createdAt,
    evaluation,
  } = essay;

  const date = createdAt?.seconds
    ? new Date(
        createdAt.seconds * 1000
      ).toLocaleDateString()
    : "Today";

  const preview =
    essayText.length > 140
      ? essayText.substring(0, 140) + "..."
      : essayText;

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-300
        hover:border-cyan-500
        hover:-translate-y-1
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Star
            size={18}
            className="text-yellow-400"
          />

          <span className="font-semibold">

            Band {evaluation?.overallBand ?? "-"}

          </span>

        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm">

          <Calendar size={16} />

          {date}

        </div>

      </div>

      {/* Essay */}

      <div className="mt-5">

        <h3 className="font-semibold text-lg">

          IELTS Essay

        </h3>

        <p className="mt-3 text-slate-400 leading-7">

          {preview}

        </p>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2 text-slate-400">

          <FileText size={16} />

          {wordCount} words

        </div>

        <Link
          to={`/essay-history/${id}`}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-cyan-500
            px-4
            py-2
            font-medium
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          <Eye size={18} />

          View
        </Link>

      </div>

    </div>
  );
}