import {
  NavLink
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import { auth }
from "../firebase";

import {
  useTheme
} from "../context/ThemeContext";

import {
  useAuth
} from "../context/AuthContext";

import toast
from "react-hot-toast";

export default function Navbar() {
  const {
    darkMode,
    toggleTheme
  } = useTheme();

  const { user } =
    useAuth();

  async function logout() {
    try {
      await signOut(auth);

      toast.success(
        "Logged out!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Logout failed"
      );
    }
  }

  const navStyle = ({
    isActive
  }) => ({
    color: isActive
      ? "#22d3ee"
      : darkMode
      ? "white"
      : "#0f172a",

    fontWeight:
      isActive ? "700" : "500",

    transition:
      "0.2s ease"
  });

  return (
    <nav
      style={{
        position: "sticky",

        top: 0,

        zIndex: 1000,

        background:
          darkMode
            ? "#0f172a"
            : "white",

        padding:
          window.innerWidth <
          768
            ? "16px"
            : "18px 30px",

        display: "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        boxShadow:
          "0 4px 20px rgba(0,0,0,0.06)",

        flexWrap:
          "wrap",

        gap: "20px"
      }}
    >
      <NavLink
        to="/"
        style={{
          fontSize: "28px",

          fontWeight:
            "900",

          color:
            "#22d3ee"
        }}
      >
        NextBand
      </NavLink>

      <div
        style={{
          display: "flex",

          gap:
            window.innerWidth <
            768
              ? "12px"
              : "20px",

          alignItems:
            "center",

          flexWrap:
            "wrap",

          justifyContent:
            window.innerWidth <
            768
              ? "center"
              : "flex-end"
        }}
      >
        <NavLink
          to="/"
          style={navStyle}
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          style={navStyle}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/reading"
          style={navStyle}
        >
          Reading
        </NavLink>

        <NavLink
          to="/writing"
          style={navStyle}
        >
          Writing
        </NavLink>

        <NavLink
          to="/speaking"
          style={navStyle}
        >
          Speaking
        </NavLink>

        <NavLink
          to="/community"
          style={navStyle}
        >
          Community
        </NavLink>

        <NavLink
          to="/leaderboard"
          style={navStyle}
        >
          Leaderboard
        </NavLink>

        {user && (
          <div
            style={{
              padding:
                "10px 14px",

              borderRadius:
                "12px",

              background:
                "#f1f5f9",

              fontSize:
                "14px",

              fontWeight:
                "600"
            }}
          >
            {user.email}
          </div>
        )}

        <button
          onClick={
            toggleTheme
          }
          style={{
            background:
              "#e2e8f0",

            padding:
              "10px 18px",

            borderRadius:
              "12px",

            fontWeight:
              "700"
          }}
        >
          {darkMode
            ? "Light"
            : "Dark"}
        </button>

        {user && (
          <button
            onClick={logout}
            style={{
              background:
                "#ef4444",

              color: "white",

              padding:
                "10px 18px",

              borderRadius:
                "12px",

              fontWeight:
                "700"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}