import React from "react";

const NoteCompletion = ({
  question,
  answers,
  onAnswerChange,
  reviewMode = false,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{question.question}</h3>

      <input
        type="text"
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your answer..."
        value={answers?.[question.id] || ""}
        onChange={(e) => onAnswerChange(question.id, e.target.value)}
        disabled={reviewMode}
      />

      {reviewMode && (
        <div className="mt-3 p-3 rounded bg-green-50 border border-green-200">
          <p>
            <strong>Correct Answer:</strong> {question.answer}
          </p>

          {question.explanation && (
            <p className="mt-2 text-sm text-gray-700">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteCompletion;