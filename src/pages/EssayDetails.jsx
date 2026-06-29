import { Link, useParams } from "react-router-dom";
import DownloadReportButton
from "../components/pdf/DownloadReportButton";
import {
  ArrowLeft,
  Calendar,
  FileText,
} from "lucide-react";

import Loader from "../components/Loader";

import EssayRenderer from "../renderers/EssayRenderer";

import useEssay from "../hooks/useEssay";

export default function EssayDetails() {
  const { essayId } = useParams();

  const {
    essay,
    loading,
    error,
  } = useEssay(essayId);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-300">

          {error.message}

        </div>

      </div>
    );
  }

  if (!essay) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="rounded-xl border border-slate-700 p-10 text-center">

          <h2 className="text-3xl font-bold">

            Essay Not Found

          </h2>

          <p className="mt-4 text-slate-400">

            This essay no longer exists.

          </p>

          <Link
            to="/essay-history"
            className="inline-flex mt-8 items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"
          >
            <ArrowLeft size={18} />

            Back to History

          </Link>

        </div>

      </div>
    );
  }

  const date = essay.createdAt?.seconds
    ? new Date(
        essay.createdAt.seconds * 1000
      ).toLocaleString()
    : "Unknown";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <Link
            to="/essay-history"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft size={18} />

            Back to History

          </Link>

          <h1 className="text-4xl font-bold mt-5">

            Essay Evaluation

          </h1>

          <p className="mt-2 text-slate-400">

            View your complete IELTS writing evaluation.

          </p>

        </div>

      </div>

      {/* Metadata */}

      <div className="mt-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-2 text-slate-400">

            <Calendar size={18} />

            Evaluated On

          </div>

          <h3 className="mt-3 text-lg font-semibold">

            {date}

          </h3>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-2 text-slate-400">

            <FileText size={18} />

            Word Count

          </div>

          <h3 className="mt-3 text-lg font-semibold">

            {essay.wordCount}

          </h3>

        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-2 text-slate-400">

            ⭐ Overall Band

          </div>

          <h3 className="mt-3 text-lg font-semibold">

            {essay.evaluation?.overallBand}

          </h3>

        </div>

      </div>

      {/* Original Essay */}

      <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-2xl font-bold">

          Original Essay

        </h2>

        <div className="mt-6 whitespace-pre-wrap leading-8 text-slate-300">

          {essay.essay}

        </div>

      </section>

      {/* AI Evaluation */}

      <div className="mt-10">

        <EssayRenderer
          result={essay.evaluation}
        />
<DownloadReportButton
    essay={essay}
/>
      </div>

    </div>
  );
}