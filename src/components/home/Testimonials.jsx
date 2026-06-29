import "./Testimonials.css";
import { Star } from "lucide-react";

export default function Testimonials() {

  const reviews = [

    {
      name: "Sarah Johnson",
      country: "United Kingdom",
      band: "Overall Band 8.0",
      review:
        "The AI writing feedback was incredibly accurate. It helped me improve my essays in just a few weeks.",
    },

    {
      name: "Rahul Sharma",
      country: "India",
      band: "Overall Band 7.5",
      review:
        "The mock tests felt exactly like the real IELTS CBT exam. The dashboard kept me motivated every day.",
    },

    {
      name: "Emily Carter",
      country: "Australia",
      band: "Overall Band 8.5",
      review:
        "Speaking AI was my favorite feature. The instant feedback improved my confidence dramatically.",
    },

  ];

  return (

    <section className="testimonials">

      <div className="testimonials-header">

        <span>SUCCESS STORIES</span>

        <h2>
          Loved by IELTS Students
        </h2>

        <p>
          Thousands of learners trust NextBand to
          prepare for their IELTS journey.
        </p>

      </div>

      <div className="testimonial-grid">

        {reviews.map((review) => (

          <div
            className="testimonial-card"
            key={review.name}
          >

            <div className="stars">

              {[1,2,3,4,5].map((star)=>(

                <Star
                  key={star}
                  size={18}
                  fill="#f59e0b"
                  color="#f59e0b"
                />

              ))}

            </div>

            <p className="review">

              "{review.review}"

            </p>

            <div className="review-footer">

              <div className="avatar">

                {review.name.charAt(0)}

              </div>

              <div>

                <h4>{review.name}</h4>

                <span>

                  {review.country}

                </span>

              </div>

              <div className="band-chip">

                {review.band}

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}