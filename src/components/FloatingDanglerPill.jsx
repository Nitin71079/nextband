import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Star, Award, ShieldCheck, Zap, Sparkles, Flame, CheckCircle2 } from "lucide-react";

export default function FloatingDanglerPill({
  icon: Icon = TrendingUp,
  value = "+15 Pts",
  label = "Predicted Growth",
  variant = "light", // 'light' (like screenshot) or 'dark'
  iconBg = "rgba(124, 58, 237, 0.12)",
  iconColor = "#7c3aed",
  floatDelay = 0,
  style = {}
}) {
  const isLight = variant === "light";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
      }}
      style={{
        background: isLight
          ? "rgba(255, 255, 255, 0.92)"
          : "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.9) 100%)",
        color: isLight ? "#0f172a" : "#ffffff",
        borderRadius: 22,
        padding: "12px 18px",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        boxShadow: isLight
          ? "0 20px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)"
          : "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: isLight
          ? "1px solid rgba(255, 255, 255, 0.7)"
          : "1px solid rgba(255, 255, 255, 0.15)",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
        ...style
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <Icon size={19} color={iconColor} />
      </div>

      <div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: "-0.4px",
            color: isLight ? "#0f172a" : "#ffffff",
            lineHeight: 1.15
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: isLight ? "#64748b" : "#94a3b8",
            marginTop: 2,
            whiteSpace: "nowrap"
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
}
