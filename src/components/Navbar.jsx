import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

import {
  Menu,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  Trophy,
  Users,
  LogOut,
  User,
} from "lucide-react";

import "../styles/navbar.css";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  const { user, name } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  async function logout() {
    try {
      await signOut(auth);

      toast.success("Logged out successfully.");
    } catch {
      toast.error("Logout failed.");
    }
  }

  const navStyle = ({ isActive }) => ({
    color: isActive
      ? "#2563eb"
      : darkMode
      ? "#ffffff"
      : "#0f172a",

    fontWeight: isActive ? 700 : 500,

    textDecoration: "none",
  });

  const username = user
    ? user.email.split("@")[0]
    : "";

  return (
    <nav
      className={
        darkMode
          ? "navbar dark"
          : "navbar"
      }
    >
      <div className="navbar-logo">
        <NavLink
          to="/"
          className="logo-link"
        >
          <span className="logo-icon">
            K
          </span>

          <span className="logo-text">
            Knarrow
          </span>
        </NavLink>
      </div>

      <button
        className="mobile-menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <X size={28} />
        ) : (
          <Menu size={28} />
        )}
      </button>

      <div
        className={
          menuOpen
            ? "navbar-links open"
            : "navbar-links"
        }
      >
        {!user && (
          <>
            <NavLink
              to="/"
              style={navStyle}
            >
              Home
            </NavLink>

            <NavLink
              to="/pricing"
              style={navStyle}
            >
              Pricing
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink
              to="/dashboard"
              style={navStyle}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              style={navStyle}
            >
              <User size={18} />
              Profile
            </NavLink>

            <NavLink
              to="/settings"
              style={navStyle}
            >
              ⚙️ Settings
            </NavLink>

            <NavLink
              to="/certificates"
              style={navStyle}
            >
              🏅 Certificates
            </NavLink>

            <NavLink
              to="/planner"
              style={navStyle}
            >
              <CalendarDays size={18} />
              Planner
            </NavLink>

            <NavLink
              to="/ai-center"
              style={navStyle}
            >
              <BrainCircuit size={18} />
              AI Studio
            </NavLink>
          </>
        )}

        <NavLink
          to="/community"
          style={navStyle}
        >
          <Users size={18} />
          Community
        </NavLink>

        <NavLink
          to="/leaderboard"
          style={navStyle}
        >
          <Trophy size={18} />
          Leaderboard
        </NavLink>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {user && (
          <div className="navbar-user">
            <div className="user-chip">
              <div className="avatar">
                <User size={18} />
              </div>

              <div className="user-details">
                <span className="username">
                  {name || username}
                </span>

                <span className="plan">
                  Free Plan
                </span>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}