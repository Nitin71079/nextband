import { Link } from "react-router-dom";

import {
  getAuth,
  signOut
} from "firebase/auth";

import { app } from "../firebase";

import {
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const auth = getAuth(app);

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const handleLogout =
    async () => {
      try {
        await signOut(auth);

        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    };

  const links = [
    {
      name: "Home",
      path: "/"
    },

    {
      name: "Reading",
      path: "/reading"
    },

    {
      name: "Listening",
      path: "/listening"
    },

    {
      name: "Writing",
      path: "/writing"
    },

    {
      name: "Speaking",
      path: "/speaking"
    },

    {
      name: "Dashboard",
      path: "/dashboard"
    },

    ...(!user
      ? [
          {
            name: "Login",
            path: "/login"
          }
        ]
      : [])
  ];

  return (
    <nav
      style={{
        background: "#0f172a",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 2000,
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.2)"
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "white"
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            margin: 0,
            letterSpacing: "1px"
          }}
        >
          NextBand
        </h1>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "24px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {user && (
          <div
            style={{
              color: "#22d3ee",
              fontWeight: "bold",
              fontSize: "15px",
              background:
                "rgba(34,211,238,0.1)",
              padding: "8px 14px",
              borderRadius: "10px"
            }}
          >
            {user.email}
          </div>
        )}

        {links.map(
          (link, index) => (
            <Link
              key={index}
              to={link.path}
              style={{
                color: "#cbd5e1",
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
                fontSize: "18px",
                transition:
                  "0.3s"
              }}
            >
              {link.name}
            </Link>
          )
        )}

        {user && (
          <button
            onClick={
              handleLogout
            }
            style={{
              background:
                "#ef4444",

              border: "none",

              padding:
                "10px 18px",

              borderRadius:
                "10px",

              color: "white",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              fontSize:
                "15px"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}