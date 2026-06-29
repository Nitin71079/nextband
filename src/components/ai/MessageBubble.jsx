import React from "react";
import { User, Bot } from "lucide-react";

/**
 * Detect if this looks like an essay evaluation
 */
function isEssayEvaluation(content) {
  return (
    content &&
    typeof content === "object" &&
    content.overallBand !== undefined &&
    content.criteria
  );
}

/**
 * Essay Evaluation Card
 */
function EssayResult({ result }) {
  const criteria = result.criteria || {};

  return (
    <div className="space-y-6">

      {/* Overall */}

      <div className="rounded-xl bg-slate-800 p-5">

        <div className="text-sm text-slate-400">
          Overall Band
        </div>

        <div className="mt-2 text-5xl font-bold text-cyan-400">
          {result.overallBand}
        </div>

      </div>

      {/* Criteria */}

      <div className="grid gap-4 md:grid-cols-2">

        <Score
          title="Task Response"
          value={criteria.taskResponse}
        />

        <Score
          title="Coherence"
          value={criteria.coherence}
        />

        <Score
          title="Vocabulary"
          value={criteria.lexical}
        />

        <Score
          title="Grammar"
          value={criteria.grammar}
        />

      </div>

      {/* Summary */}

      <Section
        title="Summary"
        items={[result.summary]}
      />

      {/* Strengths */}

      <Section
        title="Strengths"
        items={result.strengths}
      />

      {/* Weaknesses */}

      <Section
        title="Weaknesses"
        items={result.weaknesses}
      />

    </div>
  );
}

function Score({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-800 p-4">

      <div className="text-slate-400 text-sm">
        {title}
      </div>

      <div className="text-3xl font-bold mt-2">
        {value}
      </div>

      <div className="mt-3 h-2 rounded bg-slate-700 overflow-hidden">

        <div
          className="h-full rounded bg-cyan-400 transition-all duration-500"
          style={{
            width: `${(value / 9) * 100}%`,
          }}
        />

      </div>

    </div>
  );
}

function Section({
  title,
  items = [],
}) {
  if (!items || items.length === 0)
    return null;

  return (
    <div className="rounded-xl bg-slate-800 p-5">

      <h3 className="font-semibold mb-3">
        {title}
      </h3>

      <ul className="space-y-2">

        {items.map((item, index) => (
          <li
            key={index}
            className="text-slate-300"
          >
            • {item}
          </li>
        ))}

      </ul>

    </div>
  );
}

export default function MessageBubble({
  message,
}) {
  const isUser =
    message.role === "user";

  return (
    <div
      className={`flex gap-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      {!isUser && (
        <div className="mt-1">

          <Bot
            className="text-cyan-400"
            size={24}
          />

        </div>
      )}

      <div
        className={`
          max-w-4xl
          rounded-2xl
          p-5
          ${
            isUser
              ? "bg-cyan-600 text-white"
              : "bg-slate-900 border border-slate-800"
          }
        `}
      >

        {typeof message.content ===
        "string" ? (
          <p className="whitespace-pre-wrap">
            {message.content}
          </p>
        ) : isEssayEvaluation(
            message.content
          ) ? (
          <EssayResult
            result={message.content}
          />
        ) : (
          <pre className="overflow-auto text-sm">
            {JSON.stringify(
              message.content,
              null,
              2
            )}
          </pre>
        )}

      </div>

      {isUser && (
        <div className="mt-1">

          <User
            className="text-cyan-400"
            size={24}
          />

        </div>
      )}

    </div>
  );
}