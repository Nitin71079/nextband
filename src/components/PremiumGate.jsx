import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PremiumGate({
  children,
}) {
  const {
    user,
    premium,
    premiumExpires,
    loading,
  } = useAuth();

  // ============================
  // DEVELOPMENT ONLY
  // MUST BE FALSE BEFORE DEPLOY
  // ============================
  const DEV_BYPASS = false;

  if (DEV_BYPASS) {
    return children;
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        Checking Subscription...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  let activePremium = premium;

  if (
    premium &&
    premiumExpires
  ) {
    const expiry =
      premiumExpires.toDate
        ? premiumExpires.toDate()
        : new Date(
            premiumExpires
          );

    if (expiry < new Date()) {
      activePremium = false;
    }
  }

  if (!activePremium) {
    return (
      <Navigate
        to="/pricing"
        replace
      />
    );
  }

  return children;
}