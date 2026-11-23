import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";

// ভিডিওর একদম নিচে প্রোগ্রেস বার — ভিডিও যত এগোয়, তত ভরে যায়।
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame(); // এখানে top-level এ থাকায় এটাই পুরো ভিডিওর real frame
  const { durationInFrames } = useVideoConfig();
  const progress = Math.min(frame / durationInFrames, 1);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end" }}>
      <div
        style={{
          margin: "0 140px 48px 140px",
          height: 6,
          borderRadius: 3,
          backgroundColor: COLORS.badgeBg,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: COLORS.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
