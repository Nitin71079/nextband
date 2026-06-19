import { useState } from "react";

import {
  getBookings,
  cancelBooking,
} from "../services/bookingService";

export default function MySessions() {
  const [bookings, setBookings] =
    useState(getBookings());

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
      }}
    >
      <h1>
        My Sessions
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom:
            "30px",
        }}
      >
        Manage your expert
        coaching sessions.
      </p>

      {bookings.length ===
      0 ? (
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
          <h2>
            No Sessions Yet
          </h2>

          <p>
            Book an IELTS
            expert session
            to start getting
            personalized
            coaching.
          </p>
        </div>
      ) : (
        bookings.map(
          (
            booking,
            index
          ) => (
            <div
              key={index}
              style={{
                background:
                  "#fff",
                padding:
                  "25px",
                borderRadius:
                  "20px",
                marginBottom:
                  "20px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <h2>
                {
                  booking.expertName
                }
              </h2>

              <p>
                <strong>
                  Date:
                </strong>{" "}
                {
                  booking.date
                }
              </p>

              <p>
                <strong>
                  Duration:
                </strong>{" "}
                {
                  booking.duration
                }{" "}
                mins
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {
                  booking.status ||
                  "Scheduled"
                }
              </p>

              <button
                className="primary-btn"
                style={{
                  marginTop:
                    "15px",
                }}
                onClick={() => {
                  const confirmed =
                    window.confirm(
                      "Cancel this session?"
                    );

                  if (
                    !confirmed
                  )
                    return;

                  cancelBooking(
                    index
                  );

                  setBookings(
                    getBookings()
                  );
                }}
              >
                Cancel Session
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}