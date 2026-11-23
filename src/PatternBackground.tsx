import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./theme";

// ভিডিওর সেই আবছা সার্কেল-প্যাটার্ন ব্যাকগ্রাউন্ড।
// প্যাটার্ন ঘন/পাতলা করতে চাইলে নিচের `size` আর `opacity` পাল্টাও।
export const PatternBackground: React.FC = () => {
  const size = 90;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <svg width="100%" height="100%" style={{ opacity: 0.5 }}>
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size * 0.32}
              fill="none"
              stroke={COLORS.patternStroke}
              strokeWidth={2}
            />
            <circle cx={size / 2} cy={size / 2} r={2} fill={COLORS.patternStroke} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </AbsoluteFill>
  );
};
