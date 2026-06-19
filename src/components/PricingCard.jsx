import {
  startCheckout,
} from "../services/billingService";

export default function PricingCard({
  title,
  price,
  features,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      {title ===
  "Premium 3 Months" && (
  <div
    style={{
      background:
        "#22d3ee",
      color: "white",
      padding:
        "8px 14px",
      borderRadius:
        "999px",
      display:
        "inline-block",
      marginBottom:
        "15px",
      fontWeight:
        "bold",
    }}
  >
    MOST POPULAR
  </div>
)}
      <h2>{title}</h2>
<h1
  style={{
    fontSize: "48px",
    margin: "20px 0",
  }}
>
  ₹{price}
</h1>

      <ul>
        {features.map(
          (
            feature,
            index
          ) => (
            <li
              key={index}
            >
              {feature}
            </li>
          )
        )}
      </ul>

     <button
  className="primary-btn"
  onClick={() =>
    startCheckout(title)
  }
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  {title === "Free"
    ? "Current Plan"
    : "Upgrade Now"}
</button>
    </div>
  );
}