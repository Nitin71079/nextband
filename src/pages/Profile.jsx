import PricingCard from "../components/PricingCard";

export default function Pricing() {
  return (
    <div
      style={{
        maxWidth:
          "1200px",
        margin:
          "0 auto",
        padding:
          "40px",
      }}
    >
      <h1>
        NextBand Premium
      </h1>

      <PricingCard
        title="Premium"
        price={19}
        features={[
          "GPT Evaluation",
          "AI Coach",
          "Essay Rewrite",
          "Speaking Rewrite",
          "Advanced Analytics",
          "Forecast Engine",
        ]}
      />
    </div>
  );
}