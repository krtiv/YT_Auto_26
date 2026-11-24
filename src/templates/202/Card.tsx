import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";
import { getActiveMoment } from "./helpers";
import { TagsGraphic, MeterGraphic, DiagramGraphic } from "./graphics";
import type { CardLine } from "./content";

// একটা একক লাইন কার্ডের ভেতরে কীভাবে ভেসে উঠবে
const Line: React.FC<{ line: CardLine; localFrame: number; fps: number }> = ({
  line,
  localFrame,
  fps,
}) => {
  const appearFrame = line.delaySeconds * fps;
  const progress = spring({
    frame: localFrame - appearFrame,
    fps,
    config: { damping: 16, stiffness: 170 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const baseStyle: React.CSSProperties = { opacity, transform: `translateY(${translateY}px)` };

  if (line.style === "eyebrow") {
    return (
      <div style={{ ...baseStyle, fontSize: 13, letterSpacing: 2, color: COLORS.accent, fontWeight: 700 }}>
        {line.text}
      </div>
    );
  }
  if (line.style === "muted") {
    return (
      <div style={{ ...baseStyle, fontSize: 15, color: COLORS.mutedText, marginTop: 6 }}>{line.text}</div>
    );
  }
  if (line.style === "highlight") {
    return (
      <div style={{ ...baseStyle, fontSize: 18, color: COLORS.accent, fontWeight: 700, marginTop: 6 }}>
        {line.text}
      </div>
    );
  }
  // heading (ডিফল্ট)
  return (
    <div style={{ ...baseStyle, fontSize: 24, color: COLORS.text, fontWeight: 800, lineHeight: 1.3 }}>
      {line.text}
    </div>
  );
};

// active moment থাকলে কোনায় একটা কার্ড দেখায়, ভেতরে লাইনগুলো একটার পর একটা জমতে থাকে।
export const Card: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const active = getActiveMoment(seconds);

  if (!active) return null;

  const localFrame = frame - active.startSeconds * fps;
  const totalLocalFrames = active.durationSeconds * fps;

  const cardIn = spring({ frame: localFrame, fps, config: { damping: 16, stiffness: 170 } });
  const cardOutOpacity = interpolate(
    localFrame,
    [totalLocalFrames - 15, totalLocalFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cardOpacity =
    interpolate(cardIn, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) *
    cardOutOpacity;
  const cardTranslateY = interpolate(cardIn, [0, 1], [-12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cornerStyle: React.CSSProperties =
    active.position === "top-left" ? { top: 76, left: 24 } : { top: 76, right: 24 };

  const graphicLocalFrame = localFrame - (active.graphicDelaySeconds ?? 1.5) * fps;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          ...cornerStyle,
          opacity: cardOpacity,
          transform: `translateY(${cardTranslateY}px)`,
          backgroundColor: "rgba(10, 10, 10, 0.88)",
          borderRadius: 12,
          padding: "20px 24px",
          minWidth: 260,
          maxWidth: 360,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {active.lines.map((line, i) => (
          <Line key={i} line={line} localFrame={localFrame} fps={fps} />
        ))}

        {active.graphic && active.graphic !== "none" && graphicLocalFrame > -20 && (
          <div style={{ marginTop: 14 }}>
            {active.graphic === "tags" && (
              <TagsGraphic tags={active.tags ?? []} localFrame={graphicLocalFrame} />
            )}
            {active.graphic === "meter" && (
              <MeterGraphic value={active.meterValue ?? 50} localFrame={graphicLocalFrame} />
            )}
            {active.graphic === "diagram" && <DiagramGraphic localFrame={graphicLocalFrame} />}
          </div>
        )}
      </div>

      {active.stampText &&
        (() => {
          const stampFrame = localFrame - (active.stampDelaySeconds ?? 3) * fps;
          if (stampFrame < 0) return null;
          const stampProgress = spring({
            frame: stampFrame,
            fps,
            config: { damping: 10, stiffness: 200 },
          });
          const stampOpacity = interpolate(stampProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const stampScale = interpolate(stampProgress, [0, 1], [1.6, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              style={{
                position: "absolute",
                ...cornerStyle,
                marginTop: 70,
                opacity: stampOpacity,
                transform: `rotate(-10deg) scale(${stampScale})`,
                border: `3px solid ${COLORS.accent}`,
                color: COLORS.accent,
                fontSize: 22,
                fontWeight: 800,
                padding: "4px 14px",
                borderRadius: 6,
                letterSpacing: 1,
              }}
            >
              {active.stampText}
            </div>
          );
        })()}
    </AbsoluteFill>
  );
};
