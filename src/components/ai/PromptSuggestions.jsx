import {
  PenSquare,
  Calendar,
  Mic,
  BookOpen,
  Languages,
  FileText,
} from "lucide-react";

const PROMPTS = [
  {
    title: "Evaluate Essay",
    description: "Get IELTS band score and corrections.",
    icon: PenSquare,
    prompt:
      "Evaluate my IELTS Task 2 essay.",
    color: "bg-cyan-500",
  },

  {
    title: "Study Plan",
    description: "Generate today's study roadmap.",
    icon: Calendar,
    prompt:
      "Create a personalized IELTS study plan.",
    color: "bg-violet-500",
  },

  {
    title: "Speaking Feedback",
    description: "Practice IELTS Speaking.",
    icon: Mic,
    prompt:
      "Help me practice IELTS Speaking.",
    color: "bg-pink-500",
  },

  {
    title: "Reading Help",
    description: "Explain IELTS Reading questions.",
    icon: BookOpen,
    prompt:
      "Explain True False Not Given.",
    color: "bg-emerald-500",
  },

  {
    title: "Vocabulary",
    description: "Improve IELTS vocabulary.",
    icon: Languages,
    prompt:
      "Teach me advanced IELTS vocabulary.",
    color: "bg-orange-500",
  },

  {
    title: "Grammar Fix",
    description: "Correct grammar mistakes.",
    icon: FileText,
    prompt:
      "Fix my grammar mistakes.",
    color: "bg-blue-500",
  },
];

export default function PromptSuggestions({
  onSelect,
}) {
  return (
    <div>

      <h3 className="font-semibold text-lg mb-4">

        Quick Actions

      </h3>

      <div className="space-y-3">

        {PROMPTS.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() =>
                onSelect(item.prompt)
              }
              className="
                w-full
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                p-4
                hover:border-cyan-500
                hover:scale-[1.02]
                transition-all
                duration-300
                text-left
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className={`
                    h-12
                    w-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-white
                    ${item.color}
                  `}
                >
                  <Icon size={22} />
                </div>

                <div>

                  <h4 className="font-semibold">

                    {item.title}

                  </h4>

                  <p className="text-sm text-slate-400 mt-1">

                    {item.description}

                  </p>

                </div>

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}