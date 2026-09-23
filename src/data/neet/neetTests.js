// NEET-UG Practice Tests Registry (100 Full-Length Mocks)
import { ALL_NEET_MOCKS } from './neetMockDatabase.js';

export const neetTests = ALL_NEET_MOCKS;

export function getNEETMockById(testId) {
  if (!testId) return ALL_NEET_MOCKS[0];
  const found = ALL_NEET_MOCKS.find(m => m.id === testId || m.id === `neet-mock-${String(testId).padStart(3, '0')}`);
  return found || ALL_NEET_MOCKS[0];
}

export function searchNEETMocks(query = "", filterDifficulty = "all") {
  return ALL_NEET_MOCKS.filter(mock => {
    const matchesQuery = mock.title.toLowerCase().includes(query.toLowerCase()) ||
                         `mock ${mock.mockNumber}`.includes(query.toLowerCase());
    const matchesDiff = filterDifficulty === "all" || mock.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase());
    return matchesQuery && matchesDiff;
  });
}
