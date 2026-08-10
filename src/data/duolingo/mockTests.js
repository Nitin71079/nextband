/**
 * Knarrow DET Practice Test Definitions & Mock Templates
 * Includes all 14 official DET question types structured across 7 test sections.
 */

export const detMockTests = [
  {
    id: "det-full-mock-1",
    title: "Knarrow Adaptive DET Practice Test 1",
    durationMinutes: 60,
    difficulty: "Adaptive",
    itemIds: [
      "swrs-001",
      "swrs-002",
      "fitb-001",
      "rc-001",
      "lt-001",
      "ra-001",
      "di-001",
      "sai-001",
      "ir-001",
      "il-001",
      "iw-001",
      "is-001",
      "ws-001",
      "ss-001"
    ],
    description: "Full-length adaptive DET practice test covering all 14 question types with Knarrow subscore diagnostic reports."
  },
  {
    id: "det-full-mock-2",
    title: "Knarrow Advanced DET Adaptive Exam",
    durationMinutes: 60,
    difficulty: "Advanced",
    itemIds: [
      "swrs-002",
      "fitb-002",
      "rc-001",
      "lt-001",
      "ra-001",
      "di-001",
      "sai-001",
      "ir-001",
      "il-001",
      "iw-001",
      "is-001",
      "ws-001",
      "ss-001"
    ],
    description: "High-difficulty adaptive DET exam designed for candidate target scores of 120 to 160 (CEFR C1-C2 level)."
  }
];
