export default function ExamProgressHeader({
  currentSection,
}) {
  const sections = [
    "reading",
    "listening",
    "writing",
    "speaking",
  ];

  function getStatus(
    section
  ) {
    const currentIndex =
      sections.indexOf(
        currentSection
      );

    const sectionIndex =
      sections.indexOf(
        section
      );

    if (
      sectionIndex <
      currentIndex
    ) {
      return "completed";
    }

    if (
      sectionIndex ===
      currentIndex
    ) {
      return "active";
    }

    return "upcoming";
  }

  function getIcon(
    status
  ) {
    if (
      status ===
      "completed"
    ) {
      return "✓";
    }

    if (
      status ===
      "active"
    ) {
      return "●";
    }

    return "○";
  }

  return (
    <div
      style={{
        background:
          "#ffffff",
        padding:
          "20px",
        borderRadius:
          "16px",
        marginBottom:
          "25px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display:
            "flex",
          justifyContent:
            "space-between",
          flexWrap:
            "wrap",
          gap: "15px",
        }}
      >
        {sections.map(
          (section) => {
            const status =
              getStatus(
                section
              );

            return (
              <div
                key={
                  section
                }
                style={{
                  flex: 1,
                  minWidth:
                    "120px",
                  textAlign:
                    "center",
                  padding:
                    "12px",
                  borderRadius:
                    "12px",
                  background:
                    status ===
                    "active"
                      ? "#dbeafe"
                      : status ===
                        "completed"
                      ? "#dcfce7"
                      : "#f1f5f9",
                }}
              >
                <div
                  style={{
                    fontSize:
                      "22px",
                    fontWeight:
                      "bold",
                  }}
                >
                  {getIcon(
                    status
                  )}
                </div>

                <div
                  style={{
                    marginTop:
                      "5px",
                    textTransform:
                      "capitalize",
                    fontWeight:
                      "600",
                  }}
                >
                  {
                    section
                  }
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}