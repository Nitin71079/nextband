import { useState } from "react";
import {
  updateProfile,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Settings() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [displayName, setDisplayName] =
    useState(user?.displayName || "");

  const [password, setPassword] =
    useState("");

  const [notifications, setNotifications] =
    useState(true);

  const [darkMode, setDarkMode] =
    useState(false);

  async function saveProfile() {
    try {
      await updateProfile(auth.currentUser, {
        displayName,
      });

      toast.success(
        "Profile updated."
      );
    } catch {
      toast.error(
        "Unable to update profile."
      );
    }
  }

  async function changePassword() {
    if (!password) return;

    try {
      await updatePassword(
        auth.currentUser,
        password
      );

      toast.success(
        "Password updated."
      );

      setPassword("");
    } catch {
      toast.error(
        "Please login again before changing password."
      );
    }
  }

  async function logout() {
    await signOut(auth);

    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "40px",
        }}
      >
        Settings
      </h1>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      >
        <h2>Profile</h2>

        <input
          value={displayName}
          onChange={(e) =>
            setDisplayName(e.target.value)
          }
          placeholder="Display Name"
          className="input"
        />

        <button
          className="primary-btn"
          style={{
            marginTop: "20px",
          }}
          onClick={saveProfile}
        >
          Save Profile
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      >
        <h2>Password</h2>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="New Password"
          className="input"
        />

        <button
          className="primary-btn"
          style={{
            marginTop: "20px",
          }}
          onClick={changePassword}
        >
          Update Password
        </button>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      >
        <h2>Preferences</h2>

        <label
          style={{
            display: "block",
            marginBottom: "15px",
          }}
        >
          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(
                !notifications
              )
            }
          />

          Enable Notifications
        </label>

        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(
                !darkMode
              )
            }
          />

          Dark Mode
        </label>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h2>Account</h2>

        <button
          className="primary-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}