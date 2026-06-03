
const STORAGE_KEY =
  "nextband_results";

export function getResults() {
  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw) {
    return [];
  }

  return JSON.parse(raw);
}

export function saveResult(
  result
) {
  const existing =
    getResults();

  const updated = [
    result,
    ...existing,
  ];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      updated
    )
  );
}

export function clearResults() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}
