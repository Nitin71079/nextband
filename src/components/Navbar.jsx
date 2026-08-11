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
    label: "DET Prep",
    path: "/duolingo",
    icon: Sparkles,
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
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "DET Prep",
    path: "/duolingo",
    icon: Sparkles,
  },
  {
    label: "AI Studio",
    path: "/ai-center",
    icon: BrainCircuit,
  },
  {
    label: "Planner",
    path: "/planner",
    icon: CalendarDays,
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
    label: "Games",
    path: "/games",
    icon: Gamepad2,
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
      if (item.label === "Dashboard") {
        return {
          ...item,
          path: activeTrack === "DET" ? "/duolingo" : (activeTrack === "TOEFL" ? "/toefl" : (activeTrack === "GRE" ? "/gre" : (activeTrack === "CAT" ? "/cat" : "/dashboard")))
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
    className={`kn-navbar ${
      scrolled ? "scrolled" : ""
    }`}
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
          whileHover={{
            rotate: -8,
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          className="kn-logo-icon"
        >
          K
        </motion.div>

        <div className="kn-logo-text">
          <span>Knarrow</span>

          <small>
            Learn Smarter
          </small>
        </div>
      </NavLink>

      {/* ==========================================================
          DESKTOP NAVIGATION
      ========================================================== */}

      <nav
        className="kn-desktop-nav"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isPricingLink = item.path === "/pricing";

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={navLinkClass}
            >
              {({ isActive }) => (
                <>
                  {Icon && (
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  )}

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
                        stiffness: 350,
                        damping: 30,
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
        {/* ==========================================================
            EXAM TRACK SWITCHER PILL
        ========================================================== */}
        <div ref={trackRef} style={{ position: "relative" }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setTrackMenuOpen((prev) => !prev)}
            style={{
              background: activeTrack === "DET" ? "rgba(16, 185, 129, 0.12)" : "rgba(37, 99, 235, 0.12)",
              color: activeTrack === "DET" ? "#10b981" : "#2563eb",
              border: `1px solid ${activeTrack === "DET" ? "rgba(16, 185, 129, 0.3)" : "rgba(37, 99, 235, 0.3)"}`,
              padding: "6px 14px",
              borderRadius: "999px",
              fontWeight: "800",
              fontSize: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <Sparkles size={14} />
            {activeTrack === "DET" && "🦉 DET Prep"}
            {activeTrack === "IELTS" && "🎓 IELTS Prep"}
            {activeTrack === "TOEFL" && "📚 TOEFL Prep"}
            {activeTrack === "GRE" && "🧠 GRE Prep"}
            {activeTrack === "CAT" && "📈 CAT Prep"}
            <ChevronDown size={14} />
          </motion.button>

          {trackMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                background: "var(--card, #ffffff)",
                border: "1px solid var(--border, #e2e8f0)",
                borderRadius: "16px",
                padding: "8px",
                width: "210px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                zIndex: 99999,
              }}
            >
              {[
                { id: "IELTS", label: "🎓 IELTS Academic/General" },
                { id: "DET", label: "🦉 Duolingo English Test" },
                { id: "TOEFL", label: "📚 TOEFL iBT Test" },
                { id: "GRE", label: "🧠 GRE General Test" },
                { id: "CAT", label: "📈 CAT MBA Entrance" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    selectTrack(t.id, navigate);
                    setTrackMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: activeTrack === t.id ? "rgba(37, 99, 235, 0.1)" : "transparent",
                    color: activeTrack === t.id ? "#2563eb" : "var(--text, #1e293b)",
                    fontWeight: "800",
                    fontSize: "13px",
                    cursor: "pointer",
                    marginBottom: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{t.label}</span>
                  {activeTrack === t.id && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb" }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ==========================================================
            NOTIFICATIONS
        ========================================================== */}

{user && (
  <div ref={notifRef} style={{ position: "relative" }}>
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
      style={{ position: "relative" }}
    >
      <Bell size={18} />
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
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
            border: "2px solid var(--navbar-bg, #ffffff)",
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
            width: "340px",
            maxHeight: "440px",
            overflowY: "auto",
            background: "var(--surface, #ffffff)",
            border: "1px solid var(--border, rgba(226,232,240,1))",
            borderRadius: "20px",
            boxShadow:
              "0 20px 60px rgba(15,23,42,.16), 0 4px 16px rgba(15,23,42,.08)",
            zIndex: 999,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "18px 20px 14px",
              borderBottom: "1px solid var(--border, rgba(226,232,240,1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: "15px",
                color: "var(--text, #0f172a)",
              }}
            >
              Notifications
            </div>
            {notifications.length > 0 && (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#2563eb",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  background: "rgba(37,99,235,.08)",
                  cursor: "pointer",
                }}
                onClick={markAllRead}
              >
                Mark all read
              </span>
            )}
          </div>

          {/* Items */}
          <div style={{ padding: "8px 0" }}>
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
                    background: n.read
                      ? "transparent"
                      : "rgba(37,99,235,.04)",
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
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "13px",
                        color: "var(--text, #0f172a)",
                        marginBottom: "3px",
                      }}
                    >
                      {n.title}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary, #64748b)",
                        lineHeight: 1.6,
                      }}
                    >
                      {n.message}
                    </div>
                    {n.time && (
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text-secondary, #94a3b8)",
                          marginTop: "4px",
                        }}
                      >
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
                fontWeight: 600,
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

{/* ==========================================================
    THEME TOGGLE
========================================================== */}

<motion.button
  whileTap={{
    rotate: 180,
    scale: 0.92,
  }}
  className="kn-icon-btn"
  type="button"
  onClick={toggleTheme}
  aria-label={
    darkMode
      ? "Switch to light mode"
      : "Switch to dark mode"
  }
  title={
    darkMode
      ? "Light Mode"
      : "Dark Mode"
  }
>
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={darkMode ? "sun" : "moon"}
      initial={{
        rotate: -180,
        opacity: 0,
        scale: 0.6,
      }}
      animate={{
        rotate: 0,
        opacity: 1,
        scale: 1,
      }}
      exit={{
        rotate: 180,
        opacity: 0,
        scale: 0.6,
      }}
      transition={{
        duration: 0.22,
      }}
    >
      {darkMode ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </motion.div>
  </AnimatePresence>
</motion.button>

{/* ==========================================================
    AUTH BUTTONS (unauthenticated)
========================================================== */}

{!user && !loading && (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate("/login")}
      style={{
        padding: "9px 18px",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        background: "var(--card)",
        color: "var(--text-secondary)",
        fontWeight: 600,
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "var(--shadow)",
        transition: "all .25s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.borderColor = "rgba(37,99,235,.35)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      Log in
    </motion.button>
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate("/register")}
      style={{
        padding: "9px 20px",
        borderRadius: "12px",
        border: "none",
        background: "linear-gradient(135deg, var(--primary), #60a5fa)",
        color: "#fff",
        fontWeight: 700,
        fontSize: "14px",
        cursor: "pointer",
        boxShadow: "0 8px 20px rgba(37,99,235,.3)",
        transition: "opacity .25s ease",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      Get Started
    </motion.button>
  </div>
)}

{/* ==========================================================
    PROFILE
========================================================== */}

{user && (
  <div
    ref={profileRef}
    className="kn-profile-wrapper"
  >
    <motion.button
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
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

        <span className="kn-user-name">
          {username}
        </span>

        <span className="kn-user-plan">

          <Crown
            size={12}
            className="kn-crown"
          />

          {premium
            ? "Premium Plan"
            : "Free Plan"}

        </span>

      </div>

      <ChevronDown
        size={18}
        className={`kn-chevron ${
          profileOpen ? "rotate" : ""
        }`}
      />
    </motion.button>
    <AnimatePresence mode="wait">
  {profileOpen && (
    <motion.div
      {...DROPDOWN_ANIMATION}
      className="kn-profile-menu"
      role="menu"
    >
      {/* ======================================================
          PROFILE HEADER
      ====================================================== */}

      <div className="kn-profile-header">

        <div className="kn-profile-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div>

          <h4>
            {name || username}
          </h4>

          <p>
            {user.email}
          </p>

        </div>

      </div>

      <div className="kn-divider" />

      {/* ======================================================
          DASHBOARD
      ====================================================== */}

      <NavLink
        to="/dashboard"
        className="kn-dropdown-link"
        onClick={closeMenus}
        role="menuitem"
      >
        <LayoutDashboard size={18} />

        <span>Dashboard</span>
      </NavLink>

      {/* ======================================================
          PROFILE
      ====================================================== */}

      <NavLink
        to="/profile"
        className="kn-dropdown-link"
        onClick={closeMenus}
        role="menuitem"
      >
        <User size={18} />

        <span>Profile</span>
      </NavLink>

      {/* ======================================================
          STUDY PLANNER
      ====================================================== */}

      <NavLink
        to="/planner"
        className="kn-dropdown-link"
        onClick={closeMenus}
        role="menuitem"
      >
        <CalendarDays size={18} />

        <span>Study Planner</span>
      </NavLink>

      {/* ======================================================
          CERTIFICATES
      ====================================================== */}

      <NavLink
        to="/certificates"
        className="kn-dropdown-link"
        onClick={closeMenus}
        role="menuitem"
      >
        <Award size={18} />

        <span>Certificates</span>
      </NavLink>

      {/* ======================================================
          SETTINGS
      ====================================================== */}

      <NavLink
        to="/settings"
        className="kn-dropdown-link"
        onClick={closeMenus}
        role="menuitem"
      >
        <Settings size={18} />

        <span>Settings</span>
      </NavLink>

      <div className="kn-divider" />

      {/* ======================================================
          LOGOUT
      ====================================================== */}

      <motion.button
        whileTap={{
          scale: 0.98,
        }}
        className="kn-logout-btn"
        type="button"
        onClick={logout}
      >
        <LogOut size={18} />

        <span>Logout</span>
      </motion.button>

    </motion.div>
  )}
</AnimatePresence>

</div>
)}
{/* ==========================================================
    MOBILE MENU BUTTON
========================================================== */}

<motion.button
  whileTap={{
    scale: 0.92,
  }}
  className="kn-mobile-toggle"
  type="button"
  aria-label={
    mobileOpen
      ? "Close menu"
      : "Open menu"
  }
  aria-expanded={mobileOpen}
  onClick={toggleMobile}
>
  <AnimatePresence
    mode="wait"
    initial={false}
  >
    {mobileOpen ? (
      <motion.div
        key="close"
        initial={{
          rotate: -90,
          opacity: 0,
        }}
        animate={{
          rotate: 0,
          opacity: 1,
        }}
        exit={{
          rotate: 90,
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <X size={24} />
      </motion.div>
    ) : (
      <motion.div
        key="menu"
        initial={{
          rotate: 90,
          opacity: 0,
        }}
        animate={{
          rotate: 0,
          opacity: 1,
        }}
        exit={{
          rotate: -90,
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <Menu size={24} />
      </motion.div>
    )}
  </AnimatePresence>
</motion.button>

</div>

{/* ==========================================================
    MOBILE DRAWER
========================================================== */}

<AnimatePresence>

  {mobileOpen && (

    <>

      <motion.div
        className="kn-backdrop"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
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
                {username
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3>
                  {name || username}
                </h3>

                <p>
                  {user.email}
                </p>

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

                  {Icon && (
                    <Icon size={19} />
                  )}

                  <span>
                    {item.label}
                  </span>

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
                  <User size={19} />
                  <span>Profile</span>
                </NavLink>

                <NavLink
                  to="/settings"
                  className="kn-nav-link"
                  onClick={closeMenus}
                >
                  <Settings size={19} />
                  <span>Settings</span>
                </NavLink>

                <NavLink
                  to="/certificates"
                  className="kn-nav-link"
                  onClick={closeMenus}
                >
                  <Award size={19} />
                  <span>Certificates</span>
                </NavLink>

                <button
                  className="kn-mobile-logout"
                  type="button"
                  onClick={logout}
                >
                  <LogOut size={19} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          <div className="kn-mobile-footer">
            <Sparkles size={18} />

            <span>
              {pageTitle || "Welcome to Knarrow"}
            </span>
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