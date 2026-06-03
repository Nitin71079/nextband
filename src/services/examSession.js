const STORAGE_KEY =
  "nextband_exam";

export function saveExamSession(
  data
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}

export function getExamSession() {
  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw) {
    return null;
  }

  return JSON.parse(raw);
}

export function clearExamSession() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}