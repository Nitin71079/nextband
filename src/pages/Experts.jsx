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
        <h1>
          Expert Not Found
        </h1>
      </div>
    );
  }

  function handleBooking() {
    createBooking({
      expertId:
        expert.id,

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
          "1100px",
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
            "35px",
          borderRadius:
            "24px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {expert.photo && (
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
              marginBottom:
                "20px",
            }}
          />
        )}

        <div
          style={{
            display:
              "inline-block",
            background:
              "#fef3c7",
            color:
              "#92400e",
            padding:
              "6px 12px",
            borderRadius:
              "999px",
            fontWeight:
              "bold",
            marginBottom:
              "15px",
          }}
        >
          Premium Expert
        </div>

        <h1>
          {
            expert.name
          }
        </h1>

        <p
          style={{
            color:
              "#64748b",
            lineHeight:
              "1.8",
            marginTop:
              "10px",
          }}
        >
          {
            expert.bio
          }
        </p>

        <hr
          style={{
            margin:
              "25px 0",
          }}
        />

        <p>
          <strong>
            Experience:
          </strong>{" "}
          {
            expert.experience
          }
        </p>

        <p>
          <strong>
            Rating:
          </strong>{" "}
          ⭐
          {
            expert.rating
          }
          /5
        </p>

        <p>
          <strong>
            Reviews:
          </strong>{" "}
          {
            expert.reviews
          }
        </p>

        <p>
          <strong>
            Hourly Rate:
          </strong>{" "}
          $
          {
            expert.hourlyRate
          }
          /hr
        </p>

        <h3
          style={{
            marginTop:
              "25px",
          }}
        >
          Specialties
        </h3>

        <div
          style={{
            display:
              "flex",
            gap: "10px",
            flexWrap:
              "wrap",
            marginBottom:
              "20px",
          }}
        >
          {expert.specialties?.map(
            (
              item,
              index
            ) => (
              <span
                key={index}
                style={{
                  background:
                    "#f1f5f9",
                  padding:
                    "8px 14px",
                  borderRadius:
                    "999px",
                }}
              >
                {item}
              </span>
            )
          )}
        </div>

        <h3>
          Session Types
        </h3>

        <ul>
          {expert.sessionTypes?.map(
            (
              item,
              index
            ) => (
              <li
                key={index}
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
          style={{
            marginTop:
              "25px",
          }}
        >
          Book 60 Minute
          Session
        </button>
      </div>
    </div>
  );
}