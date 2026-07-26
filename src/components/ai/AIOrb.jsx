import { useMemo } from "react";
import { Brain, Sparkles, AlertCircle } from "lucide-react";
import { useAIContext } from "../../context/AIContext";

export default function AIOrb() {
  const {
    loading,
    streaming,
    error,
  } = useAIContext();

  const state = useMemo(() => {
    if (error)
      return {
        color: "bg-red-500",
        ring: "ring-red-400/50",
        icon: <AlertCircle size={38} />,
        label: "Error",
        animation: "",
      };

    if (streaming)
      return {
        color: "bg-violet-500",
        ring: "ring-violet-400/40",
        icon: <Sparkles size={38} />,
        label: "Streaming...",
        animation: "animate-spin",
      };

    if (loading)
      return {
        color: "bg-blue-500",
        ring: "ring-blue-400/40",
        icon: <Brain size={38} />,
        label: "Thinking...",
        animation: "animate-pulse",
      };

    return {
      color: "bg-cyan-500",
      ring: "ring-cyan-400/40",
      icon: <Brain size={38} />,
      label: "Ready",
      animation: "",
    };
  }, [loading, streaming, error]);

  return (
    <div className="flex flex-col items-center">

      {/* Orb */}

      <div
        className={`
          relative
          h-40
          w-40
          rounded-full
          flex
          items-center
          justify-center
          ${state.color}
          ${state.animation}
          ring-8
          ${state.ring}
          shadow-2xl
          transition-all
          duration-500
        `}
      >
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-white" />

        <div className="relative z-10 text-white">
          {state.icon}
        </div>
      </div>

      {/* Status */}

      <h2 className="mt-6 text-lg font-semibold">
        Knarrow AI
      </h2>

      <p className="text-slate-400 text-sm mt-2">
        {state.label}
      </p>

    </div>
  );
}