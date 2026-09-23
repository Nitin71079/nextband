// src/components/schools/SchoolHeaderNav.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Compass, 
  BookOpen, 
  Target, 
  Gamepad2, 
  Award, 
  Users, 
  Settings, 
  Search, 
  Flame, 
  Sliders, 
  Command,
  Sparkles
} from "lucide-react";
import SchoolCommandPalette from "./SchoolCommandPalette";
import { USER_SCHOOL_PROFILE } from "../../data/schools/knarrowSchoolsData";

export default function SchoolHeaderNav({ onOpenOnboarding }) {
  const location = useLocation();
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);

  const board = localStorage.getItem("knarrow_school_board") || "CBSE";
  const grade = localStorage.getItem("knarrow_school_grade") || 10;
  const profile = USER_SCHOOL_PROFILE;

  const navLinks = [
    { label: "Overview", path: "/schools", icon: Compass },
    { label: "Skill Path", path: "/schools/learn", icon: BookOpen },
    { label: "Practice", path: "/schools/practice", icon: Target },
    { label: "Subject Worlds", path: "/schools/subject/physics", icon: Compass },
    { label: "Arcade", path: "/schools/games", icon: Gamepad2 },
    { label: "Board Mocks", path: "/schools/test/board_mock", icon: Award },
    { label: "Parent Hub", path: "/schools/parent", icon: Users },
    { label: "Admin", path: "/schools/admin", icon: Settings },
  ];

  const isActive = (path) => {
    if (path === "/schools") return location.pathname === "/schools";
    if (path.startsWith("/schools/subject/")) return location.pathname.startsWith("/schools/subject/");
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <SchoolCommandPalette isOpen={isCmdPaletteOpen} onClose={() => setIsCmdPaletteOpen(false)} />

      {/* SLEEK MINIMAL SUB-NAV TAB STRIP */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="rounded-2xl bg-[#0b1329]/80 border border-slate-800/80 backdrop-blur-2xl px-3 md:px-5 py-2 flex items-center justify-between gap-4 shadow-xl">
          
          {/* TAB LINKS */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon size={14} className={active ? "text-cyan-400" : "opacity-60"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCmdPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-xs text-slate-400 transition"
              title="Search curriculum & chapters"
            >
              <Search size={13} className="text-cyan-400" />
              <span className="hidden lg:inline text-[11px] font-medium">Search</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[9px] font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">
                <Command size={9} />K
              </kbd>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>{profile.streakDays}d</span>
            </div>

            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold rounded-xl text-xs transition"
            >
              <span>{board} G{grade}</span>
              <Sliders size={12} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
