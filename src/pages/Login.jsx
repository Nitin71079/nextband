import {
  useState
} from "react";

import {
  getAuth,

  signInWithEmailAndPassword,

  createUserWithEmailAndPassword
} from "firebase/auth";

import { app } from "../firebase";

export default function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [isSignup, setIsSignup] =
    useState(false);

  const auth = getAuth(app);

  const handleAuth =
    async () => {
      try {
        if (isSignup) {
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Account created successfully."
          );
        } else {
          await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          alert(
            "Login successful."
          );
        }
      } catch (error) {
        alert(error.message);
      }
    };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px"
        }}
      >
        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          {isSignup
            ? "Create Account"
            : "Login"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            border:
              "1px solid #cbd5e1"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "30px",
            borderRadius: "10px",
            border:
              "1px solid #cbd5e1"
          }}
        />

        <button
          onClick={handleAuth}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "12px",
            background: "#22d3ee",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          {isSignup
            ? "Create Account"
            : "Login"}
        </button>

        <button
          onClick={() =>
            setIsSignup(
              !isSignup
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "12px",
            background: "#e2e8f0",
            cursor: "pointer"
          }}
        >
          {isSignup
            ? "Already have an account?"
            : "Create new account"}
        </button>
      </div>
    </div>
  );
}