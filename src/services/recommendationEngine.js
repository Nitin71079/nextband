export function generateRecommendations(
  weakestSkill,
  currentBand
) {
  const plans = {
    Reading: {
      recommendations: [
        "Practice skimming passages daily",
        "Complete 2 reading passages per day",
        "Focus on matching headings questions",
        "Build academic vocabulary",
      ],
      expectedGain:
        "+0.5 Band in 4-6 weeks",
    },

    Listening: {
      recommendations: [
        "Practice Section 3 and 4 recordings",
        "Improve note-taking skills",
        "Listen to English podcasts daily",
        "Review incorrect answers carefully",
      ],
      expectedGain:
        "+0.5 Band in 4-6 weeks",
    },

    Writing: {
      recommendations: [
        "Write 1 Task 2 essay daily",
        "Improve essay structure",
        "Use more complex sentences",
        "Expand supporting examples",
      ],
      expectedGain:
        "+0.5 Band in 6-8 weeks",
    },

    Speaking: {
      recommendations: [
        "Record speaking responses daily",
        "Practice IELTS cue cards",
        "Improve pronunciation through shadowing",
        "Speak for 2 minutes without pauses",
      ],
      expectedGain:
        "+0.5 Band in 4-6 weeks",
    },
  };

  return (
    plans[
      weakestSkill
    ] || {
      recommendations: [],
      expectedGain:
        "Unknown",
    }
  );
}