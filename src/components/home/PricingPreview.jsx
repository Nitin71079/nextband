import "./PricingPreview.css";
import { Check, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function PricingPreview() {

  const plans = [

    {
      title: "Free",
      price: "₹0",
      popular: false,
      features: [
        "Reading Test",
        "Listening Test",
        "Basic Dashboard",
        "Limited AI"
      ]
    },

    {
      title: "Premium Monthly",
      price: "₹299",
      popular: false,
      features: [
        "Unlimited Mock Tests",
        "AI Writing",
        "AI Speaking",
        "AI Coach",
        "Analytics"
      ]
    },

    {
      title: "Premium 3 Months",
      price: "₹799",
      popular: true,
      features: [
        "Everything Included",
        "Best Value",
        "Priority Updates",
        "Unlimited AI",
        "Premium Support"
      ]
    }

  ];

  return (

    <section className="pricing-preview">

      <div className="pricing-header">

        <span>PREMIUM</span>

        <h2>

          Choose Your Plan

        </h2>

        <p>

          Unlock AI-powered IELTS preparation and
          maximize your band score.

        </p>

      </div>

      <div className="pricing-grid">

        {plans.map(plan=>(

          <div
            key={plan.title}
            className={
              plan.popular
                ? "pricing-card popular"
                : "pricing-card"
            }
          >

            {plan.popular && (

              <div className="popular-badge">

                <Crown size={18}/>

                Most Popular

              </div>

            )}

            <h3>{plan.title}</h3>

            <h1>{plan.price}</h1>

            <div className="pricing-features">

              {plan.features.map(feature=>(

                <div
                  className="pricing-item"
                  key={feature}
                >

                  <Check size={18}/>

                  {feature}

                </div>

              ))}

            </div>

            <Link to="/pricing">

              <button className="pricing-btn">

                View Plan

              </button>

            </Link>

          </div>

        ))}

      </div>

    </section>

  );

}