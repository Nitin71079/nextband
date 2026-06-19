const STORAGE_KEY =
  "nextband_exam";

const HISTORY_KEY =
  "nextband_history";

export function saveExamSession(
  session
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(session)
  );

  const history =
    getExamHistory();

  history.push({
    ...session,
    id: Date.now(),
  });

  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history)
  );
}

export function getExamSession() {
  return JSON.parse(
    localStorage.getItem(
      STORAGE_KEY
    )
  );
}

export function getExamHistory() {
  return JSON.parse(
    localStorage.getItem(
      HISTORY_KEY
    ) || "[]"
  );
}