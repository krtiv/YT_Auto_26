import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { OUTRO_TEXT } from "./content";
import { COLORS } from "./theme";

// ভিডিওর একদম শেষ ৩ সেকেন্ডে (৯০ ফ্রেম) OUTRO_TEXT ভেসে ওঠে।
const OUTRO_WINDOW_FRAMES = 90;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const startAt = durationInFrames - OUTRO_WINDOW_FRAMES;
  if (frame < startAt) return null;

  const local = frame - startAt;
  const opacity = interpolate(local, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 80 }}>
      <div
        style={{
          opacity,
          fontSize: 30,
          fontWeight: 700,
          color: COLORS.text,
          backgroundColor: "rgba(0,0,0,0.55)",
          padding: "14px 28px",
          borderRadius: 10,
        }}
      >
        {OUTRO_TEXT}
      </div>
    </AbsoluteFill>
  );
};
