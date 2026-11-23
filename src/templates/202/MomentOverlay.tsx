import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";
import { getActiveMoment } from "./helpers";
import { TagsGraphic, MeterGraphic, DiagramGraphic } from "./graphics";

// active moment থাকলে হেডিং + সাবহেডিং + গ্রাফিক ভিডিওর ফাঁকা পাশে দেখায়।
export const MomentOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const active = getActiveMoment(seconds);

  if (!active) return null;

  const localFrame = frame - active.startSeconds * fps;
  const progress = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 160 } });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ভিডিও যে পাশে সরে গেছে, হেডিং তার উল্টো পাশে বসবে
  const headingSide = active.side === "left" ? "right" : "left";

  return (
    <AbsoluteFill
      style={{
        flexDirection: "row",
        justifyContent: headingSide === "left" ? "flex-start" : "flex-end",
        alignItems: "center",
        padding: "0 72px",
      }}
    >
      <div style={{ opacity, transform: `translateY(${translateY}px)`, maxWidth: 420 }}>
        {active.eyebrow && (
          <div style={{ fontSize: 15, letterSpacing: 2, color: COLORS.accent, fontWeight: 700, marginBottom: 8 }}>
            {active.eyebrow}
          </div>
        )}
        <div style={{ fontSize: 40, fontWeight: 800, color: COLORS.text, lineHeight: 1.25 }}>
          {active.heading}
        </div>
        {active.subheading && (
          <div style={{ fontSize: 20, color: COLORS.mutedText, marginTop: 10 }}>{active.subheading}</div>
        )}
        {active.graphic && active.graphic !== "none" && (
          <div style={{ marginTop: 24 }}>
            {active.graphic === "tags" && <TagsGraphic tags={active.tags ?? []} localFrame={localFrame} />}
            {active.graphic === "meter" && (
              <MeterGraphic value={active.meterValue ?? 50} localFrame={localFrame} />
            )}
            {active.graphic === "diagram" && <DiagramGraphic localFrame={localFrame} />}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
