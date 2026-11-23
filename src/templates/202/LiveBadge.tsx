import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";
import { formatTimer } from "../../shared/utils";

// উপরে-বামে সবসময় থাকা "● LIVE 0:12 / 4:38" ব্যাজ। এটা অটো-ক্যালকুলেট হয়,
// এডিট করার কিছু নেই — শুধু ভিডিওর দৈর্ঘ্য বদলালে টোটাল টাইম নিজে থেকেই বদলে যাবে।
export const LiveBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const elapsed = formatTimer(frame / fps);
  const total = formatTimer(durationInFrames / fps);

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "6px 14px",
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 600,
        color: COLORS.text,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent }} />
      LIVE
      <span style={{ color: COLORS.mutedText, fontWeight: 400 }}>
        {elapsed} / {total}
      </span>
    </div>
  );
};
