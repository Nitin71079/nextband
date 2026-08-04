import { useState, useRef } from "react";
import {
  updateProfile,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  deleteUser,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Settings.css";

/* ── section ids for sidebar ── */
const SECTIONS = [
  { id: "profile",       icon: "👤", label: "Profile"          },
  { id: "security",      icon: "🔒", label: "Security"         },
  { id: "appearance",    icon: "🎨", label: "Appearance"       },
  { id: "notifications", icon: "🔔", label: "Notifications"    },
  { id: "privacy",       icon: "🛡️",  label: "Privacy"         },
  { id: "subscription",  icon: "💎", label: "Subscription"     },
  { id: "danger",        icon: "⚠️",  label: "Danger Zone"     },
];

export default function Settings() {
  const { user, name, premium, premiumPlan, premiumExpires } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  /* ── active section ── */
  const [active, setActive] = useState("profile");

  /* ── profile ── */
  const [displayName, setDisplayName] = useState(name || user?.displayName || "");
  const [bio, setBio] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  /* ── security ── */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  /* ── email change ── */
  const [newEmail, setNewEmail] = useState("");
  const [emailPw, setEmailPw] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  /* ── notifications ── */
  const [notifSettings, setNotifSettings] = useState({
    studyReminders: true,
    resultAlerts:   true,
    productUpdates: false,
    weeklyReport:   true,
  });

  /* ── privacy ── */
  const [privacySettings, setPrivacySettings] = useState({
    showOnLeaderboard: true,
    shareProgress:     false,
    analyticsOptIn:    true,
  });

  /* ── delete account modal ── */
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletePw, setDeletePw] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ── helpers ── */
  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(`st-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ══════════ ACTIONS ══════════ */

  async function saveProfile() {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty.");
      return;
    }
    setSavingProfile(true);
    try {
      await updateProfile(auth.currentUser, { displayName: displayName.trim() });
      await updateDoc(doc(db, "users", user.uid), { name: displayName.trim() });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Could not update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword() {
    if (!currentPw) { toast.error("Enter your current password."); return; }
    if (newPw.length < 8) { toast.error("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { toast.error("Passwords don't match."); return; }
    setSavingPw(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPw);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updatePassword(auth.currentUser, newPw);
      toast.success("Password updated!");
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        toast.error("Current password is incorrect.");
      } else {
        toast.error(err.message || "Password update failed.");
      }
    } finally {
      setSavingPw(false);
    }
  }

  async function sendResetEmail() {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Password reset email sent to ${user.email}`);
    } catch (err) {
      toast.error(err.message || "Failed to send reset email.");
    }
  }

  async function changeEmail() {
    if (!newEmail || !emailPw) { toast.error("Fill in both fields."); return; }
    setSavingEmail(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, emailPw);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await updateEmail(auth.currentUser, newEmail);
      await updateDoc(doc(db, "users", user.uid), { email: newEmail });
      toast.success("Email updated!");
      setNewEmail(""); setEmailPw("");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        toast.error("Password is incorrect.");
      } else {
        toast.error(err.message || "Could not update email.");
      }
    } finally {
      setSavingEmail(false);
    }
  }

  async function saveNotifications() {
    try {
      await updateDoc(doc(db, "users", user.uid), { notifSettings });
      toast.success("Notification preferences saved.");
    } catch {
      toast.error("Could not save preferences.");
    }
  }

  async function savePrivacy() {
    try {
      await updateDoc(doc(db, "users", user.uid), { privacySettings });
      toast.success("Privacy settings saved.");
    } catch {
      toast.error("Could not save settings.");
    }
  }

  async function logout() {
    await signOut(auth);
    toast.success("Logged out.");
    navigate("/");
  }

  async function deleteAccount() {
    if (!deletePw) { toast.error("Enter your password to confirm."); return; }
    setDeleting(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, deletePw);
      await reauthenticateWithCredential(auth.currentUser, cred);
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(auth.currentUser);
      toast.success("Account deleted.");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        toast.error("Password is incorrect.");
      } else {
        toast.error(err.message || "Could not delete account.");
      }
    } finally {
      setDeleting(false);
    }
  }

  /* ── toggle helper ── */
  const toggleNotif  = (k) => setNotifSettings((p)  => ({ ...p, [k]: !p[k] }));
  const togglePrivacy = (k) => setPrivacySettings((p) => ({ ...p, [k]: !p[k] }));

  const displayInitial = (displayName || user?.email || "U").charAt(0).toUpperCase();

  const expiryLabel = premiumExpires
    ? (() => {
        const d = premiumExpires?.toDate ? premiumExpires.toDate() : new Date(premiumExpires);
        return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
      })()
    : null;

  /* ══════════ RENDER ══════════ */
  return (
    <div className="st-page">

      {/* ── PAGE HEADER ── */}
      <div className="st-header">
        <div className="st-header-inner">
          <h1>Settings</h1>
          <p>Manage your account, security, and preferences</p>
        </div>
      </div>

      <div className="st-layout">

        {/* ── SIDEBAR ── */}
        <aside className="st-sidebar">
          {/* avatar card */}
          <div className="st-sidebar-user">
            <div className="st-sidebar-avatar">{displayInitial}</div>
            <div>
              <strong>{name || user?.displayName || user?.email?.split("@")[0]}</strong>
              <span>{user?.email}</span>
              {premium && (
                <div className="st-sidebar-plan">💎 {premiumPlan || "Premium"}</div>
              )}
            </div>
          </div>

          <nav className="st-sidebar-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`st-nav-btn${active === s.id ? " st-nav-active" : ""}${s.id === "danger" ? " st-nav-danger" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                <span className="st-nav-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          <button className="st-logout-btn" onClick={logout}>
            🚪 Sign Out
          </button>
        </aside>

        {/* ── MAIN ── */}
        <main className="st-main">

          {/* ══ PROFILE ══ */}
          <section id="st-profile" className="st-section">
            <div className="st-section-header">
              <span>👤</span>
              <div>
                <h2>Profile</h2>
                <p>Update your display name and public info</p>
              </div>
            </div>

            <div className="st-field-group">
              <label className="st-label">Email Address</label>
              <div className="st-input-readonly">
                {user?.email}
                <span className="st-badge-verified">✓ Verified</span>
              </div>
            </div>

            <div className="st-field-group">
              <label className="st-label">Display Name</label>
              <input
                className="st-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                maxLength={50}
              />
              <span className="st-hint">{displayName.length}/50 characters</span>
            </div>

            <div className="st-field-group">
              <label className="st-label">Bio <span className="st-optional">(optional)</span></label>
              <textarea
                className="st-textarea"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself…"
                rows={3}
                maxLength={160}
              />
              <span className="st-hint">{bio.length}/160 characters</span>
            </div>

            <button
              className="st-btn-primary"
              onClick={saveProfile}
              disabled={savingProfile}
            >
              {savingProfile ? <span className="st-spinner" /> : null}
              {savingProfile ? "Saving…" : "Save Profile"}
            </button>
          </section>

          {/* ══ SECURITY ══ */}
          <section id="st-security" className="st-section">
            <div className="st-section-header">
              <span>🔒</span>
              <div>
                <h2>Security</h2>
                <p>Change your password and email address</p>
              </div>
            </div>

            {/* QUICK PASSWORD RESET LINK */}
            <div style={{ background: "#f0f9ff", padding: "16px 20px", borderRadius: "14px", border: "1px solid #bae6fd", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ color: "#0369a1", fontSize: "15px" }}>Forgot or Want to Reset Password?</strong>
                <p style={{ color: "#0284c7", fontSize: "13px", margin: "2px 0 0 0" }}>We can send a secure password reset email to <strong>{user?.email}</strong>.</p>
              </div>
              <button
                type="button"
                onClick={sendResetEmail}
                style={{ background: "#0284c7", color: "#ffffff", border: "none", borderRadius: "10px", padding: "8px 16px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
              >
                Send Reset Email 📧
              </button>
            </div>

            {/* change password */}
            <div className="st-sub-section">
              <h3>Change Password</h3>

              <div className="st-field-group">
                <label className="st-label">Current Password</label>
                <div className="st-input-wrap">
                  <input
                    className="st-input"
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                  />
                  <button className="st-eye" onClick={() => setShowCurrentPw((p) => !p)}>
                    {showCurrentPw ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div className="st-field-group">
                <label className="st-label">New Password</label>
                <div className="st-input-wrap">
                  <input
                    className="st-input"
                    type={showNewPw ? "text" : "password"}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                  />
                  <button className="st-eye" onClick={() => setShowNewPw((p) => !p)}>
                    {showNewPw ? "🙈" : "👁"}
                  </button>
                </div>
                {/* strength indicator */}
                {newPw.length > 0 && (
                  <div className="st-strength">
                    {[1,2,3,4].map((n) => (
                      <div
                        key={n}
                        className={`st-strength-bar${
                          newPw.length >= n * 3 ? " st-s-active" : ""
                        }${
                          newPw.length >= 12 ? " st-s-strong" :
                          newPw.length >= 8  ? " st-s-ok"     : " st-s-weak"
                        }`}
                      />
                    ))}
                    <span className="st-strength-label">
                      {newPw.length < 8 ? "Weak" : newPw.length < 12 ? "Good" : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              <div className="st-field-group">
                <label className="st-label">Confirm New Password</label>
                <input
                  className={`st-input${confirmPw && confirmPw !== newPw ? " st-input-error" : ""}`}
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                />
                {confirmPw && confirmPw !== newPw && (
                  <span className="st-error-msg">Passwords don't match</span>
                )}
              </div>

              <button
                className="st-btn-primary"
                onClick={changePassword}
                disabled={savingPw}
              >
                {savingPw ? <span className="st-spinner" /> : null}
                {savingPw ? "Updating…" : "Update Password"}
              </button>
            </div>

            {/* change email */}
            <div className="st-sub-section">
              <h3>Change Email</h3>
              <p className="st-sub-desc">Current: <strong>{user?.email}</strong></p>

              <div className="st-field-group">
                <label className="st-label">New Email Address</label>
                <input
                  className="st-input"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="new@email.com"
                />
              </div>

              <div className="st-field-group">
                <label className="st-label">Current Password (to confirm)</label>
                <input
                  className="st-input"
                  type="password"
                  value={emailPw}
                  onChange={(e) => setEmailPw(e.target.value)}
                  placeholder="Your password"
                />
              </div>

              <button
                className="st-btn-secondary"
                onClick={changeEmail}
                disabled={savingEmail}
              >
                {savingEmail ? <span className="st-spinner" /> : null}
                {savingEmail ? "Updating…" : "Update Email"}
              </button>
            </div>
          </section>

          {/* ══ APPEARANCE ══ */}
          <section id="st-appearance" className="st-section">
            <div className="st-section-header">
              <span>🎨</span>
              <div>
                <h2>Appearance</h2>
                <p>Customise how Knarrow looks for you</p>
              </div>
            </div>

            <div className="st-toggle-row">
              <div className="st-toggle-info">
                <strong>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</strong>
                <span>Switch between light and dark theme</span>
              </div>
              <button
                className={`st-toggle${darkMode ? " st-toggle-on" : ""}`}
                onClick={toggleTheme}
                aria-pressed={darkMode}
                aria-label="Toggle dark mode"
              >
                <span className="st-toggle-thumb" />
              </button>
            </div>

            <div className="st-info-banner">
              💡 Your theme preference is saved locally and persists across sessions.
            </div>
          </section>

          {/* ══ NOTIFICATIONS ══ */}
          <section id="st-notifications" className="st-section">
            <div className="st-section-header">
              <span>🔔</span>
              <div>
                <h2>Notifications</h2>
                <p>Control what Knarrow notifies you about</p>
              </div>
            </div>

            {[
              { key: "studyReminders", label: "Study Reminders",    desc: "Daily reminders to keep your streak going" },
              { key: "resultAlerts",   label: "Result Alerts",      desc: "Get notified when your AI evaluation is ready" },
              { key: "productUpdates", label: "Product Updates",    desc: "New features, improvements and announcements" },
              { key: "weeklyReport",   label: "Weekly Report",      desc: "A summary of your progress every Monday" },
            ].map((item) => (
              <div key={item.key} className="st-toggle-row">
                <div className="st-toggle-info">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <button
                  className={`st-toggle${notifSettings[item.key] ? " st-toggle-on" : ""}`}
                  onClick={() => toggleNotif(item.key)}
                  aria-pressed={notifSettings[item.key]}
                >
                  <span className="st-toggle-thumb" />
                </button>
              </div>
            ))}

            <button className="st-btn-primary" onClick={saveNotifications}>
              Save Preferences
            </button>
          </section>

          {/* ══ PRIVACY ══ */}
          <section id="st-privacy" className="st-section">
            <div className="st-section-header">
              <span>🛡️</span>
              <div>
                <h2>Privacy</h2>
                <p>Control your data and visibility</p>
              </div>
            </div>

            {[
              { key: "showOnLeaderboard", label: "Appear on Leaderboard", desc: "Let other students see your rank and scores" },
              { key: "shareProgress",     label: "Share Progress",        desc: "Allow Knarrow to display your progress in community" },
              { key: "analyticsOptIn",    label: "Usage Analytics",       desc: "Help us improve by sending anonymised usage data" },
            ].map((item) => (
              <div key={item.key} className="st-toggle-row">
                <div className="st-toggle-info">
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </div>
                <button
                  className={`st-toggle${privacySettings[item.key] ? " st-toggle-on" : ""}`}
                  onClick={() => togglePrivacy(item.key)}
                  aria-pressed={privacySettings[item.key]}
                >
                  <span className="st-toggle-thumb" />
                </button>
              </div>
            ))}

            <button className="st-btn-primary" onClick={savePrivacy}>
              Save Privacy Settings
            </button>
          </section>

          {/* ══ SUBSCRIPTION ══ */}
          <section id="st-subscription" className="st-section">
            <div className="st-section-header">
              <span>💎</span>
              <div>
                <h2>Subscription</h2>
                <p>Your current plan and billing details</p>
              </div>
            </div>

            {premium ? (
              <div className="st-plan-card st-plan-premium">
                <div className="st-plan-top">
                  <div className="st-plan-badge">💎 {premiumPlan || "Premium"}</div>
                  <div className="st-plan-status">
                    <span className="st-live-dot" /> Active
                  </div>
                </div>
                <p className="st-plan-desc">You have full access to all Knarrow Premium features.</p>
                {expiryLabel && (
                  <div className="st-plan-expiry">
                    🗓 Active until <strong>{expiryLabel}</strong>
                  </div>
                )}
                <button
                  className="st-btn-secondary"
                  onClick={() => navigate("/pricing")}
                >
                  View Plans
                </button>
              </div>
            ) : (
              <div className="st-plan-card st-plan-free">
                <div className="st-plan-top">
                  <div className="st-plan-badge st-plan-badge-free">Free Plan</div>
                </div>
                <p className="st-plan-desc">Upgrade to Premium to unlock AI Writing &amp; Speaking evaluation, unlimited tests, and more.</p>
                <button
                  className="st-btn-primary"
                  onClick={() => navigate("/pricing")}
                >
                  🚀 Upgrade to Premium
                </button>
              </div>
            )}
          </section>

          {/* ══ DANGER ZONE ══ */}
          <section id="st-danger" className="st-section st-danger-section">
            <div className="st-section-header">
              <span>⚠️</span>
              <div>
                <h2>Danger Zone</h2>
                <p>Irreversible actions — proceed with caution</p>
              </div>
            </div>

            <div className="st-danger-row">
              <div>
                <strong>Sign Out</strong>
                <p>Sign out of your account on this device.</p>
              </div>
              <button className="st-btn-outline-danger" onClick={logout}>
                Sign Out
              </button>
            </div>

            <div className="st-danger-row">
              <div>
                <strong>Delete Account</strong>
                <p>Permanently delete your account and all data. This cannot be undone.</p>
              </div>
              <button
                className="st-btn-danger"
                onClick={() => setDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </section>

        </main>
      </div>

      {/* ══ DELETE CONFIRM MODAL ══ */}
      {deleteModal && (
        <div className="st-modal-backdrop" onClick={() => setDeleteModal(false)}>
          <div className="st-modal" onClick={(e) => e.stopPropagation()}>
            <div className="st-modal-icon">🗑️</div>
            <h2>Delete Account?</h2>
            <p>
              This will permanently delete your account, all test results, progress,
              and any data associated with <strong>{user?.email}</strong>.
              This action <strong>cannot be undone.</strong>
            </p>

            <div className="st-field-group" style={{ marginTop: "24px" }}>
              <label className="st-label">Enter your password to confirm</label>
              <input
                className="st-input st-input-error"
                type="password"
                value={deletePw}
                onChange={(e) => setDeletePw(e.target.value)}
                placeholder="Your password"
              />
            </div>

            <div className="st-modal-actions">
              <button
                className="st-btn-secondary"
                onClick={() => { setDeleteModal(false); setDeletePw(""); }}
              >
                Cancel
              </button>
              <button
                className="st-btn-danger"
                onClick={deleteAccount}
                disabled={deleting}
              >
                {deleting ? <span className="st-spinner" /> : null}
                {deleting ? "Deleting…" : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
