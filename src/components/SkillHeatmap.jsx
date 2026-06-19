export default function SkillHeatmap({
  reading,
  listening,
  writing,
  speaking,
}) {
  const skills = [
    {
      name:
        "Reading",
      value:
        reading,
    },
    {
      name:
        "Listening",
      value:
        listening,
    },
    {
      name:
        "Writing",
      value:
        writing,
    },
    {
      name:
        "Speaking",
      value:
        speaking,
    },
  ];

  return (
    <div
      style={{
        background:
          "#fff",
        padding:
          "30px",
        borderRadius:
          "20px",
        marginTop:
          "30px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <h2>
        Skill Heatmap
      </h2>

      {skills.map(
        (
          skill
        ) => (
          <div
            key={
              skill.name
            }
            style={{
              marginBottom:
                "15px",
            }}
          >
            <p>
              {
                skill.name
              }
            </p>

            <div
              style={{
                width:
                  "100%",
                height:
                  "16px",
                background:
                  "#e2e8f0",
                borderRadius:
                  "999px",
              }}
            >
              <div
                style={{
                  width: `${
                    Number(
                      skill.value
                    ) * 10
                  }%`,
                  height:
                    "100%",
                  background:
                    "#3b82f6",
                  borderRadius:
                    "999px",
                }}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}