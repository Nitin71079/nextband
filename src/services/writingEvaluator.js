import {
  generateImprovedEssay,
} from "./rewriteEngine";
import {
explainWritingBands,
} from "./rubricExplainer";

import {
compareToBenchmark,
} from "./benchmarkComparison";

import {
calculateConfidence,
getBandRange,
} from "./calibrationEngine";

import {
getBenchmarkFeedback,
} from "./benchmarkMatcher";

export function evaluateWriting(
essay
) {
const words =
essay
.trim()
.split(/\s+/)
.filter(Boolean)
.length;

if (words < 30) {
  return {
    success: true,

    overallBand: 1,

    taskResponse: 1,

    coherenceCohesion: 1,

    lexicalResource: 1,

    grammarRangeAccuracy: 1,

    confidence: 99,

    estimatedRange:
      "1.0 - 1.5",

    benchmark:
      "Response far below IELTS minimum requirements.",

    strengths: [],

    weaknesses: [
      "Essay is far too short.",
      "Task not addressed.",
      "Insufficient language produced.",
    ],

    recommendations: [
      "Write at least 250 words.",
      "Develop ideas fully.",
      "Use proper essay structure.",
    ],

    wordCount: words,
  };
}

let taskResponse = 3;
let coherenceCohesion = 3;
let lexicalResource = 3;
let grammarRangeAccuracy = 3;

// Task Response

if (words >= 250) {
taskResponse += 0.5;
}
if (words < 250) {
  taskResponse -= 1;
}

if (
essay
.toLowerCase()
.includes("agree") ||
essay
.toLowerCase()
.includes("disagree")
) {
taskResponse += 0.5;
}

// Coherence & Cohesion

const paragraphs =
essay
.split("\n")
.filter(
(p) => p.trim()
).length;

if (paragraphs >= 4) {
coherenceCohesion += 0.5;
}

if (
essay
.toLowerCase()
.includes("however")
) {
coherenceCohesion += 0.5;
}

if (
essay
.toLowerCase()
.includes("therefore")
) {
coherenceCohesion += 0.5;
}

// Lexical Resource

if (words >= 350) {
lexicalResource += 0.5;
}

if (
essay
.toLowerCase()
.includes("significant")
) {
lexicalResource += 0.5;
}

if (
essay
.toLowerCase()
.includes("consequently")
) {
lexicalResource += 0.5;
}

// Grammar

const punctuationCount =
(
essay.match(
/[.,;:!?]/g
) || []
).length;

if (
punctuationCount > 8
) {
grammarRangeAccuracy +=
0.5;
}

if (
punctuationCount > 15
) {
grammarRangeAccuracy +=
0.5;
}

// IELTS limits

taskResponse =
Math.min(
9,
taskResponse
);

coherenceCohesion =
Math.min(
9,
coherenceCohesion
);

lexicalResource =
Math.min(
9,
lexicalResource
);

grammarRangeAccuracy =
Math.min(
9,
grammarRangeAccuracy
);

// Overall Band

const overallBand =
Number(
(
(
taskResponse +
coherenceCohesion +
lexicalResource +
grammarRangeAccuracy
) / 4
).toFixed(1)
);

// Calibration

const confidence =
calculateConfidence({
taskResponse,
coherenceCohesion,
lexicalResource,
grammarRangeAccuracy,
});

const range =
getBandRange(
overallBand
);

const benchmark =
getBenchmarkFeedback(
overallBand
);

const comparison =
compareToBenchmark(
overallBand
);

const explanation =
explainWritingBands({
taskResponse,
coherenceCohesion,
lexicalResource,
grammarRangeAccuracy,
});

// Feedback

const strengths = [];
const weaknesses = [];
const recommendations =
[];

if (
taskResponse >= 6.5
) {
strengths.push(
"Clear response to the essay question."
);
} else {
weaknesses.push(
"Ideas could be developed further."
);


recommendations.push(
  "Provide more detailed explanations and examples."
);

}

if (
coherenceCohesion >=
6.5
) {
strengths.push(
"Good organization and logical flow."
);
} else {
weaknesses.push(
"Paragraph structure needs improvement."
);

recommendations.push(
  "Use clearer topic sentences and linking devices."
);

}

if (
lexicalResource >=
6.5
) {
strengths.push(
"Good vocabulary range."
);
} else {
weaknesses.push(
"Vocabulary variety is limited."
);

recommendations.push(
  "Use more advanced vocabulary and collocations."
);


}

if (
grammarRangeAccuracy >=
6.5
) {
strengths.push(
"Reasonably accurate grammar."
);
} else {
weaknesses.push(
"Sentence structures are too simple."
);

recommendations.push(
  "Practice complex and compound sentence forms."
);

}
const improvedEssay =
  generateImprovedEssay(
    essay,
    overallBand
  );

return {
success: true,

overallBand,

confidence,

estimatedRange:
  `${range.lower} - ${range.upper}`,

benchmark,

matchedBand:
  comparison.matchedBand,

similarity:
  comparison.similarity,

explanation,

taskResponse,

coherenceCohesion,

lexicalResource,

grammarRangeAccuracy,

wordCount: words,

strengths,

weaknesses,

recommendations,


};
}
