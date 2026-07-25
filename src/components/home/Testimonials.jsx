import "./Testimonials.css";
import { motion } from "framer-motion";

import {
  Star,
  Sparkles,
  Quote,
} from "lucide-react";

export default function Testimonials() {

  const reviews = [

    {
      name:"Sarah Johnson",
      country:"United Kingdom",
      band:"Band 8.0",
      review:
        "The AI writing feedback was incredibly accurate. It helped me improve my essays within a few weeks.",
    },

    {
      name:"Rahul Sharma",
      country:"India",
      band:"Band 7.5",
      review:
        "The mock tests felt almost identical to the real IELTS CBT exam. The dashboard kept me motivated every single day.",
    },

    {
      name:"Emily Carter",
      country:"Australia",
      band:"Band 8.5",
      review:
        "The AI Speaking feedback completely changed my confidence. I finally knew exactly what to improve.",
    },

  ];

  return (
        <motion.section
      className="testimonials"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
    >

      <div className="testimonials-header">

        <span>

          <Sparkles size={15} />

          STUDENT SUCCESS STORIES

        </span>

        <h2>

          Trusted by Future
          IELTS Achievers

        </h2>

        <p>

          Discover how students improve their IELTS
          preparation with AI-powered feedback,
          realistic CBT practice, and personalized
          study guidance on Knarrow.

        </p>

      </div>

      <div className="testimonial-grid">

        {reviews.map((review, index) => (

          <motion.div
            key={review.name}
            className="testimonial-card"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
          >

            <div className="stars">

              {[...Array(5)].map((_, star) => (

                <Star
                  key={star}
                  size={18}
                  fill="#fbbf24"
                  color="#fbbf24"
                />

              ))}

            </div>

            <Quote
              size={28}
              color="#2563eb"
              style={{
                marginBottom: "18px",
                opacity: 0.7,
              }}
            />

            <p className="review">

              "{review.review}"

            </p>
                        <div className="review-footer">

              <div className="review-user">

                <div className="avatar">

                  {review.name.charAt(0)}

                </div>

                <div>

                  <h4>

                    {review.name}

                  </h4>

                  <span>

                    {review.country}

                  </span>

                </div>

              </div>

              <div className="band-chip">

                {review.band}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>

  );

}