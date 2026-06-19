const KEY =
  "evaluation_history";

export function saveEvaluation(
  report
) {
  const history =
    JSON.parse(
      localStorage.getItem(
        KEY
      ) || "[]"
    );

  history.unshift(
    report
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(
      history
    )
  );
}

export function getEvaluationHistory() {
  return JSON.parse(
    localStorage.getItem(
      KEY
    ) || "[]"
  );
}