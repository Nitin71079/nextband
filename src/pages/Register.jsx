import { useState } from "react";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  auth,
  db
} from "../firebase";

import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid
        ),
        {
          email,

          premium: false,

          admin: false,

          averageBand: 0,

          testsTaken: 0,

          createdAt: Date.now()
        }
      );

      toast.success(
        "Account created!"
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

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
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns:
          window.innerWidth < 900
            ? "1fr"
            : "1fr 1fr"
      }}
    >
      {/* LEFT */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#0891b2,#22d3ee)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px"
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            lineHeight: "1.1",
            marginBottom: "25px"
          }}
        >
          Start Your IELTS Journey 🚀
        </h1>

        <p
          style={{
            lineHeight: "1.9",
            maxWidth: "500px",
            opacity: 0.95
          }}
        >
          Join students using
          AI-powered learning
          tools, mock tests,
          speaking evaluation,
          analytics, and smart
          study systems to
          achieve higher IELTS
          bands faster.
        </p>
      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px"
        }}
      >
        <div
          className="card fade-in"
          style={{
            width: "100%",
            maxWidth: "500px"
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "10px"
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px"
            }}
          >
            Start preparing smarter with AI.
          </p>

          <form onSubmit={handleRegister}>
            <label>Email</label>

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
                marginTop: "20px"
              }}
            >
              <label>Password</label>

              <input
                type="password"
                className="input"
                placeholder="Create password"
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
                width: "100%",
                marginTop: "30px"
              }}
            >
              {loading
                ? "Creating account..."
                : "Register"}
            </button>
          </form>

          <p
            style={{
              marginTop: "25px",
              textAlign: "center"
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#22d3ee",
                fontWeight: "700"
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}