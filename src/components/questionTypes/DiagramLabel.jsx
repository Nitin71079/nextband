import React from "react";

const DiagramLabel = ({
  question,
  answers,
  onAnswerChange,
  reviewMode = false,
}) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold">{question.question}</h3>

      {/* Diagram (optional) */}
      {question.image && (
        <div className="border rounded-lg p-4 bg-white">
          <img
            src={question.image}
            alt="Diagram"
            className="mx-auto max-h-96 object-contain"
          />
        </div>
      )}

      {/* Label Inputs */}
      <div className="space-y-3">
        {(question.labels || [{ id: question.id, label: "Answer" }]).map(
          (label) => (
            <div key={label.id} className="flex items-center gap-3">
              <span className="font-medium w-32">
                {label.label || `Label ${label.id}`}
              </span>

              <input
                type="text"
                value={answers?.[label.id] || ""}
                onChange={(e) =>
                  onAnswerChange(label.id, e.target.value)
                }
                disabled={reviewMode}
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type answer..."
              />
            </div>
          )
        )}
      </div>

      {reviewMode && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4">
          <h4 className="font-semibold mb-2">Correct Answer</h4>

          {Array.isArray(question.answer) ? (
            question.answer.map((ans, index) => (
              <div key={index}>
                <strong>{index + 1}.</strong> {ans}
              </div>
            ))
          ) : (
            <p>{question.answer}</p>
          )}

          {question.explanation && (
            <p className="mt-3 text-sm text-gray-700">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagramLabel;