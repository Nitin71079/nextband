import { useAuth } from "../context/AuthContext";

export default function PremiumGate({
  children,
}) {
  const {
    premium,
    loading,
  } = useAuth();

  if (loading) {
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

  if (!premium) {
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