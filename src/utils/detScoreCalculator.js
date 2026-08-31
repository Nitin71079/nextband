/**
 * Knarrow DET Scoring Engine & Institutional Concordance Tables
 * DET Overall Scale: 10 - 160 (in 5 point increments)
 * Subscores: Literacy, Comprehension, Conversation, Production
 * Official Concordances: IELTS (4.0-9.0), TOEFL iBT (0-120), CEFR (A1-C2)
 */

export function calculateDETScore({
  readCompleteScore = 0, // max 100%
  readSelectScore = 0,   // max 100%
  listenSelectScore = 0, // max 100%
  listenTypeScore = 0,   // max 100%
  interactiveReadingScore = 0, // max 100%
  interactiveListeningScore = 0, // max 100%
  readAloudScore = 0,
  writeImageScore = 0,
  speakImageScore = 0,
  writingSampleScore = 0,
  speakingSampleScore = 0,
}) {
  // Normalize any 10-160 scale values to 0-100 percentage
  const normPct = (val) => {
    if (!val || val <= 10) return 0;
    if (val > 100) {
      return Math.min(100, Math.max(0, ((val - 10) / 150) * 100));
    }
    return Math.min(100, Math.max(0, val));
  };

  const rcPct = normPct(readCompleteScore);
  const rsPct = normPct(readSelectScore);
  const ltPct = normPct(listenTypeScore);
  const irPct = normPct(interactiveReadingScore);
  const ilPct = normPct(interactiveListeningScore);
  const raPct = normPct(readAloudScore);
  const wiPct = normPct(writeImageScore);
  const siPct = normPct(speakImageScore);
  const wsPct = normPct(writingSampleScore);
  const ssPct = normPct(speakingSampleScore);

  // Subscore weights
  // Literacy: Read and Complete (25%), Read and Select (20%), Interactive Reading (25%), Write About Image (15%), Writing Sample (15%)
  const literacyRaw = Math.round(
    rcPct * 0.25 +
    rsPct * 0.20 +
    irPct * 0.25 +
    wiPct * 0.15 +
    wsPct * 0.15
  );

  // Comprehension: Read and Complete (20%), Read and Select (20%), Listen and Type (20%), Interactive Reading (20%), Interactive Listening (20%)
  const comprehensionRaw = Math.round(
    rcPct * 0.20 +
    rsPct * 0.20 +
    ltPct * 0.20 +
    irPct * 0.20 +
    ilPct * 0.20
  );

  // Conversation: Listen and Type (20%), Read Aloud (20%), Speak About Image (20%), Interactive Listening (20%), Speaking Sample (20%)
  const conversationRaw = Math.round(
    ltPct * 0.20 +
    raPct * 0.20 +
    siPct * 0.20 +
    ilPct * 0.20 +
    ssPct * 0.20
  );

  // Production: Write About Image (25%), Speak About Image (25%), Writing Sample (25%), Speaking Sample (25%)
  const productionRaw = Math.round(
    wiPct * 0.25 +
    siPct * 0.25 +
    wsPct * 0.25 +
    ssPct * 0.25
  );

  // Map 0-100 percentage to DET 10-160 scale (in 5-point steps)
  const toDETScale = (pct) => {
    const raw = 10 + (pct / 100) * 150;
    return Math.min(160, Math.max(10, Math.round(raw / 5) * 5));
  };

  const literacy = toDETScale(literacyRaw);
  const comprehension = toDETScale(comprehensionRaw);
  const conversation = toDETScale(conversationRaw);
  const production = toDETScale(productionRaw);

  // Overall DET score is average of subscores rounded to nearest 5
  const avgSub = (literacy + comprehension + conversation + production) / 4;
  const overall = Math.min(160, Math.max(10, Math.round(avgSub / 5) * 5));

  // Concordances
  const ieltsEquivalent = detToIelts(overall);
  const toeflEquivalent = detToToefl(overall);
  const cefrLevel = detToCEFR(overall);

  return {
    overall,
    subscores: {
      literacy,
      comprehension,
      conversation,
      production,
    },
    ieltsEquivalent,
    toeflEquivalent,
    cefrLevel,
  };
}

/**
 * DET to IELTS Band Score conversion table
 */
export function detToIelts(detScore) {
  if (detScore >= 155) return "9.0";
  if (detScore >= 145) return "8.5";
  if (detScore >= 135) return "8.0";
  if (detScore >= 125) return "7.5";
  if (detScore >= 115) return "7.0";
  if (detScore >= 105) return "6.5";
  if (detScore >= 95) return "6.0";
  if (detScore >= 85) return "5.5";
  if (detScore >= 75) return "5.0";
  if (detScore >= 65) return "4.5";
  return "4.0";
}

/**
 * DET to TOEFL iBT score concordance
 */
export function detToToefl(detScore) {
  if (detScore >= 150) return "117 - 120";
  if (detScore >= 140) return "113 - 116";
  if (detScore >= 130) return "107 - 112";
  if (detScore >= 120) return "98 - 106";
  if (detScore >= 110) return "87 - 97";
  if (detScore >= 100) return "75 - 86";
  if (detScore >= 90) return "63 - 74";
  if (detScore >= 80) return "50 - 62";
  if (detScore >= 70) return "36 - 49";
  return "0 - 35";
}

/**
 * DET to CEFR Level conversion
 */
export function detToCEFR(detScore) {
  if (detScore >= 145) return "C2 Proficient";
  if (detScore >= 125) return "C1 Advanced";
  if (detScore >= 95) return "B2 Upper-Intermediate";
  if (detScore >= 65) return "B1 Intermediate";
  if (detScore >= 35) return "A2 Elementary";
  return "A1 Beginner";
}
