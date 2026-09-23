import {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { signOut } from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../firebase";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useExam } from "../context/ExamContext";
import useNotifications from "../hooks/useNotifications";

import {
  Menu,
  X,
  Sun,
  Moon,
  User,
  LogOut,
  LayoutDashboard,
  BrainCircuit,
  CalendarDays,
  Trophy,
  Users,
  Award,
  Settings,
  ChevronDown,
  Crown,
  Bell,
  Sparkles,
  Gamepad2,
  HelpCircle,
  Mail,
  Globe,
  GraduationCap,
} from "lucide-react";

import "../styles/navbar.css";

/* ==========================================================
   PUBLIC NAVIGATION
========================================================== */

const NAV_ITEMS_PUBLIC = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Community",
    path: "/community",
    icon: Users,
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: Trophy,
  },
  {
    label: "Pricing",
    path: "/pricing",
    icon: Crown,
  },
  {
    label: "Help",
    path: "/help",
    icon: HelpCircle,
  },
];

/* ==========================================================
   PRIVATE NAVIGATION
========================================================== */

const NAV_ITEMS_PRIVATE = [
  {
    label: "AI Analytics",
    path: "/insights",
    icon: BrainCircuit,
  },
  {
    label: "Study Planner",
    path: "/planner",
    icon: CalendarDays,
  },
  {
    label: "Community",
    path: "/community",
    icon: Users,
  },
  {
    label: "Arcade",
    path: "/games",
    icon: Gamepad2,
  },
  {
    label: "Pricing",
    path: "/pricing",
    icon: Crown,
  },
];

/* ==========================================================
   ANIMATION VARIANTS
========================================================== */

const NAVBAR_ANIMATION = {
  initial: {
    y: -80,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    duration: 0.45,
    ease: "easeOut",
  },
};

const DROPDOWN_ANIMATION = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.96,
  },
  transition: {
    duration: 0.2,
  },
};

const MOBILE_MENU_ANIMATION = {
  initial: {
    opacity: 0,
    y: -24,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -24,
  },
  transition: {
    duration: 0.25,
  },
};
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();
  const { user, name, premium, loading } = useAuth();
  const { activeTrack, selectTrack } = useExam();
  const { notifications, unreadCount, markAllRead } = useNotifications();

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const trackRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [trackMenuOpen, setTrackMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ==========================================================
     USERNAME
  ========================================================== */

  const username = useMemo(() => {
    if (!user) return "";

    if (name?.trim()) {
      return name.trim();
    }

    return user.email?.split("@")[0] ?? "";
  }, [user, name]);

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const navItems = useMemo(() => {
    const baseItems = user ? NAV_ITEMS_PRIVATE : NAV_ITEMS_PUBLIC;
    return baseItems.map((item) => {
      if (item.label === "Exam Hub" || item.label === "Dashboard") {
        return {
          ...item,
          path: activeTrack === "DET" ? "/duolingo" :
                activeTrack === "TOEFL" ? "/toefl" :
                activeTrack === "PTE" ? "/pte" :
                activeTrack === "GRE" ? "/gre" :
                activeTrack === "CAT" ? "/cat" :
                activeTrack === "ACT" ? "/act" :
                activeTrack === "SAT" ? "/sat" :
                activeTrack === "GMAT" ? "/gmat" :
                activeTrack === "GATE" ? "/gate" :
                activeTrack === "JEE" ? "/jee" :
                activeTrack === "NEET" ? "/neet" :
                activeTrack === "CLAT" ? "/clat" : "/dashboard"
        };
      }
      return item;
    });
  }, [user, activeTrack]);

  const pageTitle = useMemo(() => {
    const page = navItems.find(
      (item) => item.path === location.pathname
    );

    return page?.label ?? "";
  }, [location.pathname, navItems]);

  const navLinkClass = useCallback(
    ({ isActive }) =>
      isActive
        ? "kn-nav-link active"
        : "kn-nav-link",
    []
  );

  /* ==========================================================
     SCROLL EFFECT
  ========================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* ==========================================================
     ESC KEY
  ========================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      setMobileOpen(false);
      setProfileOpen(false);
      setNotifOpen(false);
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, []);

  /* ==========================================================
     BODY SCROLL LOCK
  ========================================================== */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* ==========================================================
     CLICK OUTSIDE PROFILE
  ========================================================== */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  /* ==========================================================
     CLICK OUTSIDE NOTIF
  ========================================================== */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notifRef.current &&
        !notifRef.current.contains(
          event.target
        )
      ) {
        setNotifOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  /* ==========================================================
     ACTIONS
  ========================================================== */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setNotifOpen(false);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const toggleProfile = useCallback(() => {
    setProfileOpen((prev) => !prev);
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);

      toast.success("Logged out successfully");

      closeMenus();
    } catch {
      toast.error("Logout failed");
    }
  }, [closeMenus]);
  return (
    <motion.nav
      {...NAVBAR_ANIMATION}
      className={`kn-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="kn-navbar-container">
        {/* ==========================================================
            LOGO
        ========================================================== */}
        <NavLink
          to="/"
          className="kn-logo"
          onClick={closeMenus}
          aria-label="Knarrow Home"
        >
          <motion.div
            whileHover={{ rotate: -6, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="kn-logo-icon"
          >
            <img src="/logo.png" alt="Knarrow" />
          </motion.div>

          <div className="kn-logo-text">
            <span className="kn-logo-title">Knarrow</span>
            <div className="kn-logo-sub">
              <span className="kn-live-dot" />
              <span>Learn Smarter</span>
            </div>
          </div>
        </NavLink>

        {/* ==========================================================
            DESKTOP NAVIGATION
        ========================================================== */}
        <nav className="kn-desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isPricingLink = item.path === "/pricing";

            return (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    {Icon && <Icon size={16} strokeWidth={2.2} />}

                    <span>{item.label}</span>

                    {isPricingLink && !premium && (
                      <span className="kn-upgrade-pill">Upgrade</span>
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        className="kn-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ==========================================================
            RIGHT SECTION
        ========================================================== */}
        <div className="kn-right">
          {/* EXAM TRACK SWITCHER PILL */}
          <div
            ref={trackRef}
            style={{ position: "relative" }}
            onMouseEnter={() => setTrackMenuOpen(true)}
            onMouseLeave={() => setTrackMenuOpen(false)}
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setTrackMenuOpen((prev) => !prev)}
              className="kn-track-btn"
              type="button"
            >
              <Sparkles size={14} />
              {activeTrack === "DET" && "🦉 DET"}
              {activeTrack === "IELTS" && "🎓 IELTS"}
              {activeTrack === "TOEFL" && "📚 TOEFL"}
              {activeTrack === "PTE" && "⚡ PTE"}
              {activeTrack === "GRE" && "🧠 GRE"}
              {activeTrack === "CAT" && "📈 CAT"}
              {activeTrack === "ACT" && "🏆 ACT"}
              {activeTrack === "SAT" && "✨ SAT"}
              {activeTrack === "GMAT" && "📊 GMAT"}
              {activeTrack === "GATE" && "⚙️ GATE"}
              {activeTrack === "JEE" && "🚀 JEE Main"}
              {activeTrack === "NEET" && "🩺 NEET UG"}
              {activeTrack === "CLAT" && "⚖️ CLAT"}
              <ChevronDown size={14} className={`kn-chevron ${trackMenuOpen ? "rotate" : ""}`} />
            </motion.button>

            <AnimatePresence>
              {trackMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="kn-track-menu"
                >
                  {/* Column 1: Global & Study Abroad */}
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        color: "var(--text-secondary, #94a3b8)",
                        padding: "4px 8px 8px 8px",
                        marginBottom: "6px",
                        borderBottom: "1px solid var(--border, rgba(255,255,255,0.1))",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Globe size={13} color="#38bdf8" /> Global & Study Abroad
                    </div>
                    {[
                      { id: "IELTS", label: "🎓 IELTS" },
                      { id: "DET", label: "🦉 Duolingo English Test" },
                      { id: "TOEFL", label: "📚 TOEFL iBT Test" },
                      { id: "PTE", label: "⚡ PTE Academic Test" },
                      { id: "GRE", label: "🧠 GRE General Test" },
                      { id: "SAT", label: "✨ Digital SAT 2026" },
                      { id: "ACT", label: "🏆 ACT 2026 Exam" },
                      { id: "GMAT", label: "📊 GMAT Exam 2026" },
                    ].map((t) => {
                      const isSelected = activeTrack === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            selectTrack(t.id, navigate);
                            setTrackMenuOpen(false);
                          }}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 10px",
                            borderRadius: "10px",
                            border: "none",
                            background: isSelected ? "rgba(37, 99, 235, 0.18)" : "transparent",
                            color: isSelected ? "#38bdf8" : "var(--text, #f8fafc)",
                            fontWeight: "700",
                            fontSize: "12.5px",
                            cursor: "pointer",
                            marginBottom: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <span>{t.label}</span>
                          {isSelected && (
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#38bdf8",
                                boxShadow: "0 0 8px #38bdf8",
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Column 2: National Entrance Exams */}
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        color: "var(--text-secondary, #94a3b8)",
                        padding: "4px 8px 8px 8px",
                        marginBottom: "6px",
                        borderBottom: "1px solid var(--border, rgba(255,255,255,0.1))",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <GraduationCap size={13} color="#a855f7" /> National Entrance Exams
                    </div>
                    {[
                      { id: "CAT", label: "📈 CAT MBA Entrance" },
                      { id: "GATE", label: "⚙️ GATE Exam 2026" },
                      { id: "JEE", label: "🚀 JEE Main 2026" },
                      { id: "NEET", label: "🩺 NEET UG 2026" },
                      { id: "CLAT", label: "⚖️ CLAT 2026 Exam" },
                    ].map((t) => {
                      const isSelected = activeTrack === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            selectTrack(t.id, navigate);
                            setTrackMenuOpen(false);
                          }}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 10px",
                            borderRadius: "10px",
                            border: "none",
                            background: isSelected ? "rgba(37, 99, 235, 0.18)" : "transparent",
                            color: isSelected ? "#38bdf8" : "var(--text, #f8fafc)",
                            fontWeight: "700",
                            fontSize: "12.5px",
                            cursor: "pointer",
                            marginBottom: "2px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <span>{t.label}</span>
                          {isSelected && (
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: "#38bdf8",
                                boxShadow: "0 0 8px #38bdf8",
                                flexShrink: 0,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NOTIFICATIONS */}
          {user && (
            <div
              ref={notifRef}
              style={{ position: "relative" }}
              onMouseEnter={() => {
                setNotifOpen(true);
                if (!notifOpen) markAllRead();
              }}
              onMouseLeave={() => setNotifOpen(false)}
            >
              <motion.button
                whileTap={{ scale: 0.92 }}
                className="kn-icon-btn"
                type="button"
                aria-label="Notifications"
                title="Notifications"
                onClick={() => {
                  setNotifOpen((prev) => !prev);
                  if (!notifOpen) markAllRead();
                }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-3px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid var(--surface, #ffffff)",
                      boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)",
                      lineHeight: 1,
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      width: "350px",
                      maxHeight: "440px",
                      overflowY: "auto",
                      background: "var(--card, #ffffff)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid var(--border, rgba(226,232,240,1))",
                      borderRadius: "22px",
                      boxShadow: "0 25px 70px rgba(15,23,42,.2), 0 0 30px rgba(37,99,235,.1)",
                      zIndex: 999,
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        padding: "16px 20px",
                        borderBottom: "1px solid var(--border, rgba(226,232,240,1))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ fontWeight: 800, fontSize: "15px", color: "var(--text, #0f172a)" }}>
                        Notifications
                      </div>
                      {notifications.length > 0 && (
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 750,
                            color: "#2563eb",
                            padding: "4px 10px",
                            borderRadius: "999px",
                            background: "rgba(37,99,235,.1)",
                            cursor: "pointer",
                          }}
                          onClick={markAllRead}
                        >
                          Mark all read
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div style={{ padding: "6px 0" }}>
                      {notifications.length === 0 ? (
                        <div
                          style={{
                            padding: "32px 20px",
                            textAlign: "center",
                            color: "var(--text-secondary, #64748b)",
                            fontSize: "14px",
                          }}
                        >
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            style={{
                              padding: "14px 20px",
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              background: n.read ? "transparent" : "rgba(37,99,235,.04)",
                              borderLeft: `3px solid ${n.color}`,
                              marginBottom: "2px",
                              cursor: "default",
                              transition: "background .2s",
                            }}
                          >
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "12px",
                                flexShrink: 0,
                                background: `${n.color}18`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                              }}
                            >
                              {n.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--text, #0f172a)", marginBottom: "3px" }}>
                                {n.title}
                              </div>
                              <div style={{ fontSize: "12px", color: "var(--text-secondary, #64748b)", lineHeight: 1.5 }}>
                                {n.message}
                              </div>
                              {n.time && (
                                <div style={{ fontSize: "11px", color: "var(--text-secondary, #94a3b8)", marginTop: "4px" }}>
                                  {n.time}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        padding: "12px 20px",
                        borderTop: "1px solid var(--border, rgba(226,232,240,1))",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#2563eb",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setNotifOpen(false);
                          navigate("/notifications");
                        }}
                      >
                        View all notifications →
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* THEME TOGGLE */}
          <motion.button
            whileTap={{ rotate: 180, scale: 0.92 }}
            className="kn-icon-btn"
            type="button"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? "sun" : "moon"}
                initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.22 }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* AUTH BUTTONS (unauthenticated) */}
          {!user && !loading && (
            <div className="kn-auth-group">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/login")}
                className="kn-btn-login"
              >
                Log in
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate("/register")}
                className="kn-btn-get-started"
              >
                Get Started
              </motion.button>
            </div>
          )}

          {/* PROFILE */}
          {user && (
            <div
              ref={profileRef}
              className="kn-profile-wrapper"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="kn-profile-btn"
                type="button"
                onClick={toggleProfile}
                aria-expanded={profileOpen}
                aria-haspopup="menu"
                aria-label="User menu"
              >
                <div className="kn-avatar">
                  {username.charAt(0).toUpperCase()}
                </div>

                <div className="kn-user-info">
                  <span className="kn-user-name">{username}</span>
                  <span className="kn-user-plan">
                    <Crown size={12} className="kn-crown" />
                    {premium ? "Premium Plan" : "Free Plan"}
                  </span>
                </div>

                <ChevronDown
                  size={16}
                  className={`kn-chevron ${profileOpen ? "rotate" : ""}`}
                />
              </motion.button>

              <AnimatePresence mode="wait">
                {profileOpen && (
                  <motion.div
                    {...DROPDOWN_ANIMATION}
                    className="kn-profile-menu"
                    role="menu"
                  >
                    <div className="kn-profile-header">
                      <div className="kn-profile-avatar">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{name || username}</h4>
                        <p>{user.email}</p>
                      </div>
                    </div>

                    <div className="kn-divider" />

                    <NavLink
                      to="/dashboard"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <LayoutDashboard size={17} />
                      <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <User size={17} />
                      <span>Profile</span>
                    </NavLink>

                    <NavLink
                      to="/planner"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <CalendarDays size={17} />
                      <span>Study Planner</span>
                    </NavLink>

                    <NavLink
                      to="/certificates"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <Award size={17} />
                      <span>Certificates</span>
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <Settings size={17} />
                      <span>Settings</span>
                    </NavLink>

                    <NavLink
                      to="/help"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <HelpCircle size={17} />
                      <span>Help Center</span>
                    </NavLink>

                    <NavLink
                      to="/contact"
                      className="kn-dropdown-link"
                      onClick={closeMenus}
                      role="menuitem"
                    >
                      <Mail size={17} />
                      <span>Contact Us</span>
                    </NavLink>

                    <div className="kn-divider" />

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="kn-logout-btn"
                      type="button"
                      onClick={logout}
                    >
                      <LogOut size={17} />
                      <span>Logout</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="kn-mobile-toggle"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={toggleMobile}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="kn-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeMenus}
              />

              <motion.div
                className="kn-mobile-menu"
                {...MOBILE_MENU_ANIMATION}
              >
                <div className="kn-mobile-scroll">
                  {user && (
                    <div className="kn-mobile-user">
                      <div className="kn-mobile-avatar">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3>{name || username}</h3>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="kn-mobile-links">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={navLinkClass}
                          onClick={closeMenus}
                        >
                          {Icon && <Icon size={18} />}
                          <span>{item.label}</span>
                        </NavLink>
                      );
                    })}

                    {user && (
                      <>
                        <NavLink
                          to="/profile"
                          className="kn-nav-link"
                          onClick={closeMenus}
                        >
                          <User size={18} />
                          <span>Profile</span>
                        </NavLink>

                        <NavLink
                          to="/settings"
                          className="kn-nav-link"
                          onClick={closeMenus}
                        >
                          <Settings size={18} />
                          <span>Settings</span>
                        </NavLink>

                        <NavLink
                          to="/certificates"
                          className="kn-nav-link"
                          onClick={closeMenus}
                        >
                          <Award size={18} />
                          <span>Certificates</span>
                        </NavLink>

                        <NavLink
                          to="/help"
                          className="kn-nav-link"
                          onClick={closeMenus}
                        >
                          <HelpCircle size={18} />
                          <span>Help Center</span>
                        </NavLink>

                        <NavLink
                          to="/contact"
                          className="kn-nav-link"
                          onClick={closeMenus}
                        >
                          <Mail size={18} />
                          <span>Contact Us</span>
                        </NavLink>

                        <button
                          className="kn-mobile-logout"
                          type="button"
                          onClick={logout}
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="kn-mobile-footer">
                    <Sparkles size={16} />
                    <span>{pageTitle || "Welcome to Knarrow"}</span>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}