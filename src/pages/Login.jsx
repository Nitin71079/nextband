import {
  useState
} from "react";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { auth }
from "../firebase";

import toast
from "react-hot-toast";

export default function Login() {
  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  async function handleLogin(
    e
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      toast.success(
        "Login successful!"
      );

      navigate(
        "/dashboard"
      );
    } catch (error) {
      toast.error(
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        display: "grid",

        gridTemplateColumns:
          window.innerWidth <
          900
            ? "1fr"
            : "1fr 1fr"
      }}
    >
      {/* LEFT */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#22d3ee,#0891b2)",

          color: "white",

          display: "flex",

          flexDirection:
            "column",

          justifyContent:
            "center",

          padding:
            "60px"
        }}
      >
        <h1
          style={{
            fontSize:
              "64px",

            lineHeight:
              "1.1",

            marginBottom:
              "25px"
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            lineHeight:
              "1.9",

            maxWidth:
              "500px",

            opacity: 0.95
          }}
        >
          Continue your
          AI-powered IELTS
          preparation journey
          with mock tests,
          analytics, speaking
          evaluation, and smart
          learning tools.
        </p>
      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          padding:
            "30px"
        }}
      >
        <div
          className="card fade-in"
          style={{
            width: "100%",

            maxWidth:
              "500px"
          }}
        >
          <h2
            style={{
              fontSize:
                "42px",

              marginBottom:
                "10px"
            }}
          >
            Login
          </h2>

          <p
            style={{
              color:
                "#64748b",

              marginBottom:
                "30px"
            }}
          >
            Access your
            dashboard and
            continue learning.
          </p>

          <form
            onSubmit={
              handleLogin
            }
          >
            <label>
              Email
            </label>

            <input
              type="email"
              className="input"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

            <div
              style={{
                marginTop:
                  "20px"
              }}
            >
              <label>
                Password
              </label>

              <input
                type="password"
                className="input"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <button
              type="submit"
              className="primary-btn"
              style={{
                width:
                  "100%",

                marginTop:
                  "30px"
              }}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <p
            style={{
              marginTop:
                "25px",

              textAlign:
                "center"
            }}
          >
            Don’t have an
            account?{" "}
            <Link
              to="/register"
              style={{
                color:
                  "#22d3ee",

                fontWeight:
                  "700"
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}