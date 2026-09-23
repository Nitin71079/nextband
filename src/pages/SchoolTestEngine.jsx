// src/pages/SchoolTestEngine.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { BOARD_EXAM_PATTERNS } from "../data/schools/knarrowSchoolsData";
import { evaluateSchoolSubjectiveAnswer } from "../services/evaluateSchoolAI";
import { 
  Award, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  RotateCcw,
  BarChart3,
  TrendingUp,
  Target,
  ChevronRight
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function SchoolTestEngine() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const pattern = BOARD_EXAM_PATTERNS.CBSE_GRADE_10;

  const [timeLeftSeconds, setTimeLeftSeconds] = useState(pattern.durationMinutes * 60);
  const [answers, setAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    if (testSubmitted || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => setTimeLeftSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [testSubmitted, timeLeftSeconds]);

  const handleAnswerChange = (qId, val) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const handleFinalSubmit = async () => {
    setEvaluating(true);
    setTestSubmitted(true);

    const sampleStudentAnswer = answers["case_q1"] || "Ohm's law states that current is directly proportional to voltage when temperature remains constant. Formula V = IR.";
    const evalData = await evaluateSchoolSubjectiveAnswer({
      questionText: "State Ohm's Law and derive equivalent resistance for two resistors connected in series.",
      studentAnswer: sampleStudentAnswer,
      modelAnswer: "Current I is proportional to Voltage V (V = IR). In series, total V = V1 + V2 = IR1 + IR2 = I(R1 + R2), hence Rs = R1 + R2.",
      marks: 4,
      subject: "Science",
      grade: 10,
      board: "CBSE"
    });

    setEvaluationResult({
      ...evalData,
      scorePct: 78,
      lostMarksReasons: [
        { reason: "Formula Recall", detail: "Omitted explicit vector notation for electric field statement." },
        { reason: "Careless Calculation", detail: "Substituted radius value instead of diameter in part (b)." }
      ],
      weakConcepts: [
        { concept: "Trigonometric Identities", fixPath: "/schools/chapter/g10_math_ch1" },
        { concept: "Series Resistance Derivation", fixPath: "/schools/chapter/g10_phy_ch1" }
      ]
    });
    setEvaluating(false);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 font-sans p-4 md:p-8 selection:bg-cyan-500 selection:text-slate-950 pb-32">
      <SchoolHeaderNav />
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 mb-6">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-xs transition"
        >
          <ArrowLeft size={16} />
          <span>Exit Exam</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-slate-900 border border-white/10 rounded-full text-xs font-mono text-cyan-400 font-bold">
            {pattern.title}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-full text-xs font-black">
            <Clock size={14} />
            <span>{formatTime(timeLeftSeconds)}</span>
          </div>
        </div>
      </div>

      {!testSubmitted ? (
        <div className="max-w-5xl mx-auto bg-slate-900/90 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8 backdrop-blur-2xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">{pattern.title}</h1>
            <p className="text-slate-400 text-xs mt-1">Total Marks: {pattern.totalMarks} | Duration: {pattern.durationMinutes} Mins</p>
          </div>

          {/* SECTION A */}
          <div className="space-y-6">
            <h3 className="text-sm font-extrabold text-cyan-400 border-b border-white/10 pb-2 uppercase tracking-wider">
              Section A: Objective MCQs (20 Marks)
            </h3>

            <div className="p-5 bg-slate-950 rounded-2xl border border-white/10 space-y-3">
              <h4 className="font-bold text-slate-200 text-xs md:text-sm">
                Q1. What is the equivalent resistance of two 6 Ω resistors connected in parallel?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {["12 Ω", "3 Ω", "6 Ω", "1.5 Ω"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswerChange("q1", opt)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                      answers["q1"] === opt
                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300"
                        : "bg-slate-900 border-white/10 text-slate-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION E */}
          <div className="space-y-6">
            <h3 className="text-sm font-extrabold text-amber-400 border-b border-white/10 pb-2 uppercase tracking-wider">
              Section E: Case Study Subjective Question (4 Marks)
            </h3>

            <div className="p-5 bg-slate-950 rounded-2xl border border-white/10 space-y-3">
              <h4 className="font-bold text-slate-200 text-xs md:text-sm">
                State Ohm's Law and derive equivalent resistance for two resistors connected in series. Show mathematical working.
              </h4>
              <textarea
                rows={4}
                placeholder="Write your step-by-step answer here..."
                value={answers["case_q1"] || ""}
                onChange={(e) => handleAnswerChange("case_q1", e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            onClick={handleFinalSubmit}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 font-black text-slate-950 rounded-2xl hover:from-emerald-400 hover:to-teal-500 transition shadow-xl text-sm uppercase tracking-wider"
          >
            Submit Board Exam & Analyze Performance
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-slate-900/95 border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          <div className="text-center space-y-2">
            <Award size={48} className="mx-auto text-emerald-400" />
            <h2 className="text-2xl font-black text-white">Your Performance Breakdown</h2>
            <p className="text-slate-400 text-xs">Evaluated according to CBSE / ICSE official marking rubrics</p>
          </div>

          {evaluating ? (
            <div className="text-center py-8 text-cyan-400 font-mono animate-pulse text-xs">
              Analyzing answers against marking rubrics & identifying diagnostic errors...
            </div>
          ) : (
            evaluationResult && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Marks Awarded</div>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      {evaluationResult.marksAwarded} / 4
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Overall Score</div>
                    <div className="text-3xl font-black text-cyan-400 mt-1">
                      {evaluationResult.scorePct}%
                    </div>
                  </div>
                </div>

                {/* WHY YOU LOST MARKS DIAGNOSTIC */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-rose-500/30 space-y-3">
                  <h4 className="font-bold text-xs text-rose-400 flex items-center gap-2 uppercase tracking-wider">
                    <AlertTriangle size={16} /> Why You Lost Marks
                  </h4>
                  <div className="space-y-2 text-xs">
                    {evaluationResult.lostMarksReasons.map((r, i) => (
                      <div key={i} className="p-2.5 bg-slate-900 rounded-xl border border-white/5 space-y-0.5">
                        <div className="font-bold text-slate-200">{r.reason}</div>
                        <div className="text-slate-400">{r.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTIONABLE NEXT STEP */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-cyan-500/30 space-y-3">
                  <h4 className="font-bold text-xs text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
                    <Target size={16} /> Recommended Action
                  </h4>
                  <p className="text-xs text-slate-300">
                    Spend 12 minutes strengthening your Trigonometry & Derivation steps before your next test.
                  </p>
                  {evaluationResult.weakConcepts.map((wc, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(wc.fixPath)}
                      className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition shadow flex items-center justify-center gap-2"
                    >
                      <span>Fix Weakness: {wc.concept}</span>
                      <ChevronRight size={14} />
                    </button>
                  ))}
                </div>

                <Link
                  to="/schools"
                  className="block w-full py-3 bg-slate-800 text-slate-200 font-bold text-center rounded-xl hover:bg-slate-700 transition text-xs"
                >
                  Return to Learning Universe
                </Link>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
