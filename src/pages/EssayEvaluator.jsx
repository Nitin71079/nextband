import { useState } from "react";

import { evaluateEssay } from "../agents/essayAgent";
import EssayRenderer from "../renderers/EssayRenderer";

import { useAuth } from "../context/AuthContext";

export default function EssayEvaluator() {
  const { user, loading: authLoading } = useAuth();

  const [essay, setEssay] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  async function handleEvaluate() {
    if (authLoading) return;

    if (!user) {
      setError("Please sign in to evaluate your essay.");
      return;
    }

    if (essay.trim().length < 100) {
      setError(
        "Essay should contain at least 100 characters."
      );
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await evaluateEssay({
        uid: user.uid,
        essay,
      });

      setResult(response);

      setSuccess(
        "✅ Essay evaluated and saved successfully."
      );
    } catch (err) {
      console.error(err);

      setError(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setEssay("");
    setResult(null);
    setError("");
    setSuccess("");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          AI Essay Evaluator
        </h1>

        <p className="mt-3 text-slate-400">
          Receive an official-style IELTS evaluation,
          sentence corrections,
          and a Band 9 rewrite.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <textarea
          rows={18}
          value={essay}
          onChange={(e) =>
            setEssay(e.target.value)
          }
          placeholder="Paste your IELTS Writing Task 2 essay here..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-700
            bg-slate-950
            p-5
            outline-none
            focus:border-cyan-500
          "
        />

        <div className="mt-4 flex items-center justify-between">

          <span className="text-sm text-slate-500">
            {essay.length} characters
          </span>

          <div className="flex gap-3">

            <button
              onClick={handleClear}
              disabled={loading}
              className="
                rounded-xl
                border
                border-slate-700
                px-6
                py-3
                hover:bg-slate-800
                transition
                disabled:opacity-50
              "
            >
              Clear
            </button>

            <button
              onClick={handleEvaluate}
              disabled={
                loading ||
                authLoading ||
                !user
              }
              className="
                rounded-xl
                bg-cyan-500
                px-8
                py-3
                font-semibold
                text-black
                transition
                hover:bg-cyan-400
                disabled:bg-slate-700
                disabled:text-slate-400
              "
            >
              {loading
                ? "Evaluating..."
                : "Evaluate Essay"}
            </button>

          </div>

        </div>

      </div>

      {error && (
        <div
          className="
            mt-6
            rounded-xl
            border
            border-red-500
            bg-red-500/10
            p-4
            text-red-300
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            mt-6
            rounded-xl
            border
            border-green-500
            bg-green-500/10
            p-4
            text-green-300
          "
        >
          {success}
        </div>
      )}

      {result && (
        <div className="mt-10">
          <EssayRenderer result={result} />
        </div>
      )}
    </div>
  );
}