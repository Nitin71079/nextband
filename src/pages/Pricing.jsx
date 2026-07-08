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
  Knarrow Premium
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
  "Limited Reading Practice",
  "Limited Listening Practice",
  "Basic Score Reports",
  "Community Access",
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