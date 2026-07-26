import {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";

import { NavLink, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { signOut } from "firebase/auth";

import toast from "react-hot-toast";

import { auth } from "../firebase";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

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

  const { darkMode, toggleTheme } = useTheme();
  const { user, name, premium } = useAuth();

  const profileRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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
    return user ? NAV_ITEMS_PRIVATE : NAV_ITEMS_PUBLIC;
  }, [user]);

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
     ACTIONS
  ========================================================== */

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setProfileOpen(false);
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
    NOTIFICATIONS
========================================================== */}

{user && (
  <motion.button
    whileTap={{ scale: 0.92 }}
    className="kn-icon-btn"
    type="button"
    aria-label="Notifications"
    title="Notifications"
  >
    <Bell size={18} />
  </motion.button>
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