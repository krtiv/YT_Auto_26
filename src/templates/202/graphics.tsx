import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "./theme";

// তিনটা ছোট সাপোর্টিং গ্রাফিক — moment-এ graphic: "tags" | "meter" | "diagram" বসালে
// এর যেকোনো একটা হেডিং-এর নিচে দেখাবে। localFrame = ওই moment শুরুর পর থেকে কত ফ্রেম গেছে।

export const TagsGraphic: React.FC<{ tags: string[]; localFrame: number }> = ({ tags, localFrame }) => (
  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 380 }}>
    {tags.map((tag, i) => {
      const appearAt = i * 12;
      const local = localFrame - appearAt;
      const opacity = interpolate(local, [0, 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const isRecent = local >= 0 && local < 45;
      return (
        <div
          key={tag}
          style={{
            opacity,
            padding: "8px 16px",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: isRecent ? COLORS.accent : COLORS.badgeBg,
            color: isRecent ? "#fff" : COLORS.mutedText,
            border: `1px solid ${isRecent ? COLORS.accent : "#2a2a2a"}`,
          }}
        >
          {tag}
        </div>
      );
    })}
  </div>
);

export const MeterGraphic: React.FC<{ value: number; localFrame: number }> = ({ value, localFrame }) => {
  const progress = interpolate(localFrame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const current = Math.round(value * progress);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (current / 100);

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={radius} stroke="#2a2a2a" strokeWidth="10" fill="none" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={COLORS.accent}
        strokeWidth="10"
        fill="none"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="66" textAnchor="middle" fontSize="22" fontWeight="700" fill={COLORS.text}>
        {current}%
      </text>
    </svg>
  );
};

export const DiagramGraphic: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const progress = interpolate(localFrame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg width="220" height="100" viewBox="0 0 220 100">
      <line x1="10" y1="80" x2="210" y2="20" stroke="#2a2a2a" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="10" cy="80" r="6" fill={COLORS.mutedText} />
      <circle cx={10 + 200 * progress} cy={80 - 60 * progress} r="8" fill={COLORS.accent} />
    </svg>
  );
};
