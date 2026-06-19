import { useParams } from "react-router-dom";
import { experts } from "../data/experts";

import {
  createBooking,
} from "../services/bookingService";

export default function ExpertProfile() {
  const { id } =
    useParams();

  const expert =
    experts.find(
      (e) =>
        String(e.id) === id
    );

  if (!expert) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Expert not found.
      </div>
    );
  }

  function handleBooking() {
    createBooking({
      expertName:
        expert.name,

      date:
        new Date()
          .toISOString()
          .split("T")[0],

      duration: 60,

      status:
        "Upcoming",
    });

    alert(
      "Session booked successfully."
    );
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