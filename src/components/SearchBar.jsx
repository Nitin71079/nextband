import {
  useState
} from "react";

export default function SearchBar({
  data = []
}) {
  const [query,
    setQuery] =
    useState("");

  const filtered =
    data.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
    );

  return (
    <div
      style={{
        marginBottom:
          "40px"
      }}
    >
      <input
        type="text"
        placeholder="Search tests, prompts, topics..."
        value={query}
        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "18px",
          borderRadius:
            "18px",
          border:
            "1px solid #cbd5e1",
          fontSize:
            "17px",
          marginBottom:
            "25px"
        }}
      />

      {query && (
        <div
          style={{
            background:
              "white",

            borderRadius:
              "20px",

            padding:
              "24px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h2
            style={{
              marginBottom:
                "20px"
            }}
          >
            Search Results
          </h2>

          {filtered.length ===
          0 ? (
            <p>
              No results
              found.
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",

                gap: "16px"
              }}
            >
              {filtered.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "#f8fafc",

                      padding:
                        "18px",

                      borderRadius:
                        "14px"
                    }}
                  >
                    {item.title ||
                      item.task ||
                      item.cueCard ||
                      "Result"}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}