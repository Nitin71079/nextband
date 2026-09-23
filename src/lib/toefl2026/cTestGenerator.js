/**
 * ETS 2026 TOEFL iBT C-Test Generator for "Complete the Words"
 * 
 * Rules:
 * 1. Passage ~70-100 words.
 * 2. First sentence remains 100% intact.
 * 3. Starting after sentence 1, every SECOND word has its second half deleted.
 * 4. Exactly 10 words per passage have missing letter fragments.
 * 5. First half of word (ceil(len / 2)) is visible, second half is missing.
 * 6. Punctuation, capitalization, and surrounding sentences are strictly preserved.
 */

export function generateCompleteTheWords(passageText) {
  if (!passageText || typeof passageText !== "string") {
    return { passageText: "", missingParts: [], missingEntries: [] };
  }

  // Split into sentences preserving punctuation
  const sentences = passageText.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [passageText];
  if (sentences.length < 2) {
    return fallbackCTest(passageText);
  }

  const firstSentence = sentences[0];
  const remainingSentencesText = sentences.slice(1).join("");

  // Tokenize remaining text into words and non-word characters
  const tokens = remainingSentencesText.split(/(\b[a-zA-Z]+\b)/g);

  let wordCount = 0;
  let missingCount = 0;
  const missingParts = [];
  const missingEntries = [];

  const processedTokens = tokens.map((token, index) => {
    // Check if token is a word (contains letters only and length >= 2)
    if (/^[a-zA-Z]+$/.test(token) && token.length >= 2) {
      wordCount++;

      // Select every SECOND word until exactly 10 missing entries are created
      if (wordCount % 2 === 0 && missingCount < 10) {
        missingCount++;
        const len = token.length;
        const prefixLen = Math.ceil(len / 2);
        const prefix = token.slice(0, prefixLen);
        const missing = token.slice(prefixLen);

        missingParts.push(missing);
        missingEntries.push({
          originalWord: token,
          visiblePrefix: prefix,
          missingLetters: missing,
          tokenIndex: index,
        });

        return `${prefix}___`;
      }
    }
    return token;
  });

  const fullFormattedPassage = firstSentence + processedTokens.join("");

  return {
    passageText: fullFormattedPassage,
    missingParts,
    missingEntries,
  };
}

function fallbackCTest(passageText) {
  const words = passageText.match(/\b[a-zA-Z]+\b/g) || [];
  const missingParts = [];
  const missingEntries = [];

  let count = 0;
  words.forEach((w, idx) => {
    if (idx > 3 && idx % 2 === 0 && count < 10 && w.length >= 3) {
      count++;
      const prefixLen = Math.ceil(w.length / 2);
      const prefix = w.slice(0, prefixLen);
      const missing = w.slice(prefixLen);
      missingParts.push(missing);
      missingEntries.push({
        originalWord: w,
        visiblePrefix: prefix,
        missingLetters: missing,
        wordIndex: idx,
      });
    }
  });

  return { passageText, missingParts, missingEntries };
}
