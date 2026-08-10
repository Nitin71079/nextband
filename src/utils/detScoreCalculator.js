/**
 * Duolingo English Test (DET) Score Calculator & Subscore Mapping
 * DET Overall Scale: 10 - 160 (in 5 point increments)
 */

export function calculateDETScore({
  readCompleteScore = 0, // max 100%
  readSelectScore = 0,   // max 100%
  listenSelectScore = 0, // max 100%
  listenTypeScore = 0,   // max 100%
  interactiveReadingScore = 0, // max 100%
  readAloudScore = 80,   // default estimate if not AI evaluated
  writeImageScore = 80,
  speakImageScore = 80,
  writingSampleScore = 85,
  speakingSampleScore = 85,
}) {
  // Subscore weights
  // Literacy: Read and Complete, Read and Select, Interactive Reading, Write About Image, Writing Sample
  const literacyRaw = Math.round(
    readCompleteScore * 0.25 +
    readSelectScore * 0.20 +
    interactiveReadingScore * 0.25 +
    writeImageScore * 0.15 +
    writingSampleScore * 0.15
  );

  // Comprehension: Read and Complete, Read and Select, Listen and Select, Listen and Type, Interactive Reading
  const comprehensionRaw = Math.round(
    readCompleteScore * 0.20 +
    readSelectScore * 0.20 +
    listenSelectScore * 0.20 +
    listenTypeScore * 0.20 +
    interactiveReadingScore * 0.20
  );

  // Conversation: Listen and Select, Listen and Type, Read Aloud, Speak About Image, Speaking Sample
  const conversationRaw = Math.round(
    listenSelectScore * 0.20 +
    listenTypeScore * 0.20 +
    readAloudScore * 0.20 +
    speakImageScore * 0.20 +
    speakingSampleScore * 0.20
  );

  // Production: Write About Image, Speak About Image, Writing Sample, Speaking Sample
  const productionRaw = Math.round(
    writeImageScore * 0.25 +
    speakImageScore * 0.25 +
    writingSampleScore * 0.25 +
    speakingSampleScore * 0.25
  );

  // Map 0-100 percentage to DET 10-160 scale
  const toDETScale = (pct) => {
    const raw = 10 + (pct / 100) * 150;
    // Round to nearest 5 points (DET official format)
    return Math.min(160, Math.max(10, Math.round(raw / 5) * 5));
  };

  const literacy = toDETScale(literacyRaw);
  const comprehension = toDETScale(comprehensionRaw);
  const conversation = toDETScale(conversationRaw);
  const production = toDETScale(productionRaw);

  // Overall DET score is average of subscores rounded to nearest 5
  const avgSub = (literacy + comprehension + conversation + production) / 4;
  const overall = Math.min(160, Math.max(10, Math.round(avgSub / 5) * 5));

  // Convert DET to IELTS Band equivalent
  const ieltsEquivalent = detToIelts(overall);
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
    cefrLevel,
  };
}

/**
 * DET to IELTS Band Score conversion table (Official Duolingo concordance)
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
