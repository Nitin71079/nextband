import { Link } from "react-router-dom";

export default function ExpertCard({
expert,
}) {
return (
<div
style={{
background: "#fff",
padding: "25px",
borderRadius: "20px",
marginBottom: "20px",
boxShadow:
"0 10px 30px rgba(0,0,0,0.08)",
}}
>
{expert.photo && (
<img
src={expert.photo}
alt={expert.name}
style={{
width: "90px",
height: "90px",
borderRadius: "50%",
objectFit: "cover",
marginBottom: "15px",
}}
/>
)}

  <h2>
    {expert.name}
  </h2>

  <p
    style={{
      color: "#64748b",
      marginBottom: "15px",
    }}
  >
    {expert.bio}
  </p>

  <p>
    <strong>
      Experience:
    </strong>{" "}
    {expert.experience}
  </p>

  <p>
    <strong>
      Rating:
    </strong>{" "}
    {expert.rating}/5
  </p>

  <p>
    <strong>
      Reviews:
    </strong>{" "}
    {expert.reviews}
  </p>

  <p>
    <strong>
      Rate:
    </strong>{" "}
    ${expert.hourlyRate}/hr
  </p>

  {expert.specialties && (
    <>
      <h4
        style={{
          marginTop: "15px",
        }}
      >
        Specialties
      </h4>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {expert.specialties.map(
          (
            specialty,
            index
          ) => (
            <span
              key={index}
              style={{
                background:
                  "#f1f5f9",
                padding:
                  "6px 12px",
                borderRadius:
                  "999px",
                fontSize:
                  "14px",
              }}
            >
              {specialty}
            </span>
          )
        )}
      </div>
    </>
  )}

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
    <Link
      to={`/experts/${expert.id}`}
    >
      <button
        className="primary-btn"
      >
        View Profile
      </button>
    </Link>

    <Link
      to={`/experts/${expert.id}`}
    >
      <button
        className="secondary-btn"
      >
        Book Session
      </button>
    </Link>
  </div>
</div>

);
}
