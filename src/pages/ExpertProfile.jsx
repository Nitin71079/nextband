import { useParams, useNavigate } from "react-router-dom";
import { experts } from "../data/experts";
import { createBooking } from "../services/bookingService";
import { startExpertCheckout } from "../services/billingService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ExpertProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const expert = experts.find((e) => String(e.id) === id);

  if (!expert) {
    return (
      <div style={{ padding: "40px", color: "var(--text, #0f172a)" }}>
        Expert not found.
      </div>
    );
  }

  const priceINR = expert.hourlyRate ? Math.round(Number(expert.hourlyRate) * 75) : 1499;

  function handleBooking() {
    startExpertCheckout({
      sessionTitle: `1-Hour Coaching with ${expert.name}`,
      amountINR: priceINR,
      user,
      onSuccess: (paymentId) => {
        createBooking({
          expertId: expert.id,
          expertName: expert.name,
          expertRole: expert.role || "IELTS Senior Specialist",
          date: new Date().toISOString().split("T")[0],
          timeSlot: "Tomorrow, 06:00 PM - 07:00 PM",
          duration: 60,
          skillFocus: expert.specialties?.[0] || "IELTS Coaching",
          status: "Upcoming",
          pricePaid: `₹${priceINR}`,
          paymentId: paymentId,
          paymentGateway: "Razorpay Verified",
          refundGuaranteePolicy: "50% Instant Refund via Razorpay on Expert Absence",
        });

        toast.success(`🎉 1-Hour Session Booked with ${expert.name} via Razorpay!`);
        navigate("/my-sessions");
      },
      onError: (err) => {
        toast.error("Razorpay payment cancelled or incomplete.");
      },
    });
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",
        maxWidth:
          "1000px",
        margin:
          "0 auto",
        padding:
          "40px",
      }}
    >
      <div
        style={{
          background:
            "#fff",
          padding:
            "30px",
          borderRadius:
            "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={
            expert.photo
          }
          alt={
            expert.name
          }
          style={{
            width:
              "120px",
            height:
              "120px",
            borderRadius:
              "50%",
            objectFit:
              "cover",
          }}
        />

        <h1>
          {
            expert.name
          }
        </h1>

        <p>
          {
            expert.bio
          }
        </p>

        <p>
          Experience:
          {" "}
          {
            expert.experience
          }
        </p>

        <p>
          Rating:
          {" "}
          {
            expert.rating
          }
          /5
        </p>

        <p>
          Reviews:
          {" "}
          {
            expert.reviews
          }
        </p>

        <p>
          Hourly Rate:
          {" "}
          $
          {
            expert.hourlyRate
          }
        </p>

        <h3>
          Specialties
        </h3>

        <ul>
          {expert.specialties?.map(
            (
              item,
              index
            ) => (
              <li
                key={
                  index
                }
              >
                {item}
              </li>
            )
          )}
        </ul>

        <button
          className="primary-btn"
          onClick={
            handleBooking
          }
        >
          Book Session
        </button>
      </div>
    </div>
  );
}