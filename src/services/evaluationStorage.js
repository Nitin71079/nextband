const KEY =
  "nextband_evaluations";

export function saveEvaluation(
  evaluation
) {
  const existing =
    JSON.parse(
      localStorage.getItem(
        KEY
      ) || "[]"
    );

  existing.unshift({
    ...evaluation,
    createdAt:
      new Date().toISOString(),
  });

  localStorage.setItem(
    KEY,
    JSON.stringify(
      existing
    )
  );
}

export function getEvaluations() {
  return JSON.parse(
    localStorage.getItem(
      KEY
    ) || "[]"
  );
}

export function clearEvaluations() {
  localStorage.removeItem(
    KEY
  );
}