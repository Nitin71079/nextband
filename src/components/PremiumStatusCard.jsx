

export default function PremiumStatusCard() {
  const plan =
    getPlan();

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "20px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Subscription
      </h2>

      <h1>
        {plan}
      </h1>
    </div>
  );
}