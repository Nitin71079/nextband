import PricingCard from "../components/PricingCard";

export default function Pricing() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        NextBand Premium
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "30px",
        }}
      >
        <PricingCard
          title="Free"
          price="0"
          features={[
            "1 Reading Test",
            "1 Listening Test",
            "Basic Results",
          ]}
        />

        <PricingCard
          title="Premium Monthly"
          price="299"
          features={[
            "Unlimited Tests",
            "AI Evaluation",
            "AI Coach",
            "Band Prediction",
            "Analytics",
          ]}
        />

        <PricingCard
          title="Premium 3 Months"
          price="799"
          features={[
            "Everything Included",
            "Best Value",
            "3 Month Access",
          ]}
        />
      </div>
    </div>
  );
}