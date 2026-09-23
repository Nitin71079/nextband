// src/pages/AdminCurriculumDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  BarChart2, 
  Database, 
  Settings, 
  RefreshCw 
} from "lucide-react";
import { SCHOOL_BOARDS } from "../data/schools/knarrowSchoolsData";
import SchoolHeaderNav from "../components/schools/SchoolHeaderNav";

export default function AdminCurriculumDashboard() {
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
        <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-amber-400">
          ADMIN CURRICULUM ENGINE
        </span>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          Curriculum Audit & Management
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-1">
          Monitor board syllabus coverage, curriculum versioning, question bank health, and approval workflow.
        </p>
      </div>

      {/* CURRICULUM BOARDS AUDIT REPORT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {SCHOOL_BOARDS.map((b) => (
          <div key={b.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-cyan-500/20 text-cyan-300 font-mono">
                {b.curriculumVersion}
              </span>
              <span className="text-xs font-bold text-emerald-400">{b.status}</span>
            </div>

            <div>
              <h3 className="font-extrabold text-white text-lg">{b.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{b.fullName}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-slate-500 font-medium">Concepts</div>
                <div className="font-bold text-white mt-0.5">100</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Covered</div>
                <div className="font-bold text-emerald-400 mt-0.5">96</div>
              </div>
              <div>
                <div className="text-slate-500 font-medium">Missing</div>
                <div className="font-bold text-amber-400 mt-0.5">4</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT APPROVAL QUEUE & HEALTH MONITOR */}
      <div className="max-w-6xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
            <Database size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Content Approval & Quality Control Queue</h3>
            <p className="text-xs text-slate-400">Strict pipeline: AI Assistant → Fact Check → Subject Review → Published</p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { id: "Q_CBSE_G10_098", topic: "Derivation of Ohm's Law & Series Resistors", status: "APPROVED", date: "2026-09-06" },
            { id: "Q_ICSE_G10_044", topic: "Trigonometric Identities Proof", status: "IN_REVIEW", date: "2026-09-06" },
            { id: "Q_AP_G09_012", topic: "Plant vs Animal Cell Mitosis", status: "APPROVED", date: "2026-09-05" }
          ].map((item) => (
            <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-cyan-400 font-bold mr-2">{item.id}</span>
                <span className="text-slate-200 font-medium">{item.topic}</span>
              </div>
              <span className={`px-2.5 py-1 rounded font-bold ${item.status === "APPROVED" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
