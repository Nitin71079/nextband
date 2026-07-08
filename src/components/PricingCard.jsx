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
      {title === "Premium 3 Months" && (
  <p
    style={{
      color: "#16a34a",
      fontWeight: "bold",
      marginTop: "-10px",
      marginBottom: "20px",
    }}
  >
    Save ₹98
  </p>
)}
<h1
  style={{
    fontSize: "48px",
    margin: "20px 0",
  }}
>
  ₹{price}

  <span
    style={{
      fontSize: "18px",
      fontWeight: 400,
      color: "#64748b",
    }}
  >
    {title === "Premium Monthly"
      ? "/month"
      : title === "Premium 3 Months"
      ? "/3 months"
      : ""}
  </span>
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
  onClick={() => {
  if (title === "Free") return;

  startCheckout(title);
}}
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
  }}
>
  {title === "Free"
  ? "Get Started"
  : "Upgrade Now"}
</button>
    </div>
  );
}