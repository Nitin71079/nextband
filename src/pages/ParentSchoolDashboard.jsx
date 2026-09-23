// src/pages/ParentSchoolDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  Award, 
  Clock, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  TrendingUp 
} from "lucide-react";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function ParentSchoolDashboard() {
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 p-4 md:p-8 font-sans pb-32">
      <SchoolHeaderNav />
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 mb-6">
        <Link
          to="/schools"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-bold text-sm transition"
        >
          <ArrowLeft size={18} />
          <span>Back to School Hub</span>
        </Link>
        <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-emerald-400">
          PARENT & TEACHER PORTAL
        </span>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          Parent & Teacher Dashboard
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-1">
          Monitor student learning progress, subject mastery, time spent, weak areas, and board exam preparedness.
        </p>
      </div>

      {/* STUDENT PROFILE SUMMARY CARD */}
      <div className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-extrabold text-2xl">
              KS
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Student: Aarav Sharma</h2>
              <p className="text-xs text-slate-400">Grade 10 • CBSE Board • Academic Year 2026–27</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 min-w-[280px]">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase">This Week</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">4.5 Hours</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase">Tests Completed</div>
              <div className="text-lg font-bold text-cyan-400 mt-0.5">12 Mocks</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 uppercase">Mastery</div>
              <div className="text-lg font-bold text-amber-400 mt-0.5">82%</div>
            </div>
          </div>
        </div>
      </div>

      {/* SUBJECT MASTERY BREAKDOWN */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { subject: "Mathematics", score: 84, status: "Strong", color: "text-emerald-400" },
          { subject: "Science (Physics, Chem, Bio)", score: 78, status: "Proficient", color: "text-cyan-400" },
          { subject: "English", score: 88, status: "Mastered", color: "text-purple-400" }
        ].map((sub) => (
          <div key={sub.subject} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base">{sub.subject}</h3>
              <span className={`text-xs font-bold ${sub.color}`}>{sub.status}</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full" style={{ width: `${sub.score}%` }} />
            </div>
            <div className="text-xs text-slate-400 text-right font-mono">{sub.score}% Concept Mastery</div>
          </div>
        ))}
      </div>
    </div>
  );
}
