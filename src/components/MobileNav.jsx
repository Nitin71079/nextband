import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  Users,
} from "lucide-react";
import { useExam } from "../context/ExamContext";
import "./MobileNav.css";

export default function MobileNav() {
  const { pathname } = useLocation();
  const { activeTrack } = useExam();

  const getExamHubPath = () => {
    if (activeTrack === "DET") return "/duolingo";
    if (activeTrack === "TOEFL") return "/toefl";
    if (activeTrack === "PTE") return "/pte";
    if (activeTrack === "GRE") return "/gre";
    if (activeTrack === "CAT") return "/cat";
    if (activeTrack === "ACT") return "/act";
    if (activeTrack === "SAT") return "/sat";
    if (activeTrack === "GMAT") return "/gmat";
    return "/dashboard";
  };

  const navItems = [
    { to: "/",                   label: "Home",      Icon: Home },
    { to: "/insights",           label: "Analytics", Icon: BrainCircuit },
    { to: "/planner",            label: "Planner",   Icon: CalendarDays },
    { to: "/community",          label: "Community", Icon: Users },
  ];

  return (
    <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
      {navItems.map(({ to, label, Icon }) => {
        const active = pathname === to || (to !== "/" && pathname.startsWith(to));
        return (
          <Link
            key={to}
            to={to}
            className={`mobile-nav-item${active ? " active" : ""}`}
            aria-label={label}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
