import { useAuth } from "../context/AuthContext";

export default function PremiumGate({
  children,
}) {

  const {
    premium,
    loading,
  } = useAuth();

  // ===================================
  // DEVELOPMENT ONLY
  // Change to false before production
  // ===================================
  const DEV_BYPASS = true;

  if (loading && !DEV_BYPASS) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!premium && !DEV_BYPASS) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>
          🔒 Premium Feature
        </h2>

        <p>
          Upgrade to
          NextBand Premium
          to continue.
        </p>

        <a href="/pricing">
          Upgrade Now
        </a>
      </div>
    );
  }

  return children;
}