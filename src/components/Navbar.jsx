import { useEffect, useMemo, useState } from "react";
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
];

export default function Navbar() {
  const location = useLocation();

  const { darkMode, toggleTheme } = useTheme();

  const { user, name } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const username = useMemo(() => {
    if (!user) return "";

    if (name) return name;

    return user.email.split("@")[0];
  }, [user, name]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  async function logout() {
    try {
      await signOut(auth);

      toast.success("Logged out successfully");

      setProfileOpen(false);

      setMobileOpen(false);
    } catch {
      toast.error("Logout failed");
    }
  }

  const navItems = user
    ? NAV_ITEMS_PRIVATE
    : NAV_ITEMS_PUBLIC;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "kn-nav-link active"
      : "kn-nav-link";

  const pageTitle = useMemo(() => {
    const current = navItems.find(
      (item) => item.path === location.pathname
    );

    return current?.label || "";
  }, [location.pathname, navItems]);
    return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className={`kn-navbar ${
        darkMode ? "dark" : ""
      } ${scrolled ? "scrolled" : ""}`}
    >
      <div className="kn-navbar-container">

        {/* ---------- LOGO ---------- */}

        <NavLink
          to="/"
          className="kn-logo"
          onClick={() => setMobileOpen(false)}
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

        {/* ---------- DESKTOP NAV ---------- */}

        <div className="kn-desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

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
        </div>

        {/* ---------- RIGHT SECTION ---------- */}

        <div className="kn-right">

          {/* Notification */}

          {user && (
            <button
              className="kn-icon-btn"
            >
              <Bell size={18} />
            </button>
          )}

          {/* Theme */}

          <motion.button
            whileTap={{
              rotate: 180,
            }}
            className="kn-icon-btn"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </motion.button>
                    {/* ---------- USER DROPDOWN ---------- */}

          {user && (
            <div className="kn-profile-wrapper">

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="kn-profile-btn"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
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
                    Free Plan
                  </span>
                </div>

                <ChevronDown
                  size={18}
                  className={`kn-chevron ${
                    profileOpen ? "rotate" : ""
                  }`}
                />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="kn-profile-menu"
                  >

                    <div className="kn-profile-header">

                      <div className="kn-profile-avatar">
                        {username
                          .charAt(0)
                          .toUpperCase()}
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

                    <NavLink
                      to="/dashboard"
                      className="kn-dropdown-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <LayoutDashboard
                        size={18}
                      />
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="kn-dropdown-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <User size={18} />
                      Profile
                    </NavLink>

                    <NavLink
                      to="/planner"
                      className="kn-dropdown-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <CalendarDays
                        size={18}
                      />
                      Study Planner
                    </NavLink>

                    <NavLink
                      to="/certificates"
                      className="kn-dropdown-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <Award size={18} />
                      Certificates
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className="kn-dropdown-link"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                    >
                      <Settings
                        size={18}
                      />
                      Settings
                    </NavLink>

                    <div className="kn-divider" />

                    <button
                      className="kn-logout-btn"
                      onClick={logout}
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}
                  {/* ---------- MOBILE MENU BUTTON ---------- */}

        <motion.button
          whileTap={{ scale: 0.92 }}
          className="kn-mobile-toggle"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          <AnimatePresence mode="wait">
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
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
               </motion.button>
      </div> {/* closes kn-right */}

    </div> {/* closes kn-navbar-container */}

      {/* ---------- MOBILE DRAWER ---------- */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="kn-mobile-menu"
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -25,
            }}
            transition={{
              duration: 0.25,
            }}
          >
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
                    onClick={() =>
                      setMobileOpen(false)
                    }
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
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    <User size={19} />
                    <span>Profile</span>
                  </NavLink>

                  <NavLink
                    to="/settings"
                    className="kn-nav-link"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    <Settings
                      size={19}
                    />
                    <span>Settings</span>
                  </NavLink>

                  <NavLink
                    to="/certificates"
                    className="kn-nav-link"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                  >
                    <Award
                      size={19}
                    />
                    <span>
                      Certificates
                    </span>
                  </NavLink>

                  <button
                    className="kn-mobile-logout"
                    onClick={logout}
                  >
                    <LogOut
                      size={19}
                    />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            <div className="kn-mobile-footer">

              <Sparkles size={18} />

              <span>
                {pageTitle ||
                  "Welcome to Knarrow"}
              </span>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}