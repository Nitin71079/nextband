import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  CalendarDays,
  Users,
  UserCircle,
} from "lucide-react";
import "./MobileNav.css";

const NAV_ITEMS = [
  { to: "/",          label: "Home",      Icon: Home             },
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard  },
  { to: "/planner",   label: "Planner",   Icon: CalendarDays     },
  { to: "/community", label: "Community", Icon: Users            },
  { to: "/profile",   label: "Profile",   Icon: UserCircle       },
];

export default function MobileNav() {
  const { pathname } = useLocation();

  return (
    <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ to, label, Icon }) => {
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
