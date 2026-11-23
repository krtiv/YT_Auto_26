import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, WORD_STAGGER_FRAMES } from "./theme";
import { PatternBackground } from "./PatternBackground";
import { Icon } from "./icons";
import { toBengaliDigits } from "./utils";
import type { Slide as SlideType } from "./content";

// একটা শব্দ কীভাবে স্ক্রিনে ভেসে উঠবে (ফেড-ইন + একটু নিচ থেকে উঠে আসা)
const Word: React.FC<{
  text: string;
  highlight?: boolean;
  appearAtFrame: number;
}> = ({ text, highlight, appearAtFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - appearAtFrame;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // হাইলাইট বক্সটা শব্দ আসার একটু পরে বাম থেকে ডানে স্কেল হয়ে খুলবে
  const highlightScale = highlight
    ? spring({
        frame: localFrame - 4,
        fps,
        config: { damping: 16, stiffness: 180 },
      })
    : 0;

  return (
    <span
      style={{
        display: "inline-block",
        opacity,
        transform: `translateY(${translateY}px)`,
        marginRight: 14,
        position: "relative",
      }}
    >
      {highlight && (
        <span
          style={{
            position: "absolute",
            inset: "-4px -10px",
            backgroundColor: COLORS.accent,
            borderRadius: 8,
            transform: `scaleX(${highlightScale})`,
            transformOrigin: "left center",
            zIndex: 0,
          }}
        />
      )}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          color: highlight ? COLORS.background : COLORS.text,
        }}
      >
        {text}
      </span>
    </span>
  );
};

export const Slide: React.FC<{ slide: SlideType }> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // প্রতিটা শব্দকে একটা করে "সিরিয়াল নাম্বার" দেওয়া হচ্ছে, যাতে একটার পর
  // একটা শব্দ ধাপে ধাপে স্ক্রিনে আসে (stagger অ্যানিমেশন)
  let wordCounter = 0;

  const badgeProgress = spring({ frame, fps, config: { damping: 15, stiffness: 170 } });
  const iconProgress = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <AbsoluteFill>
      <PatternBackground />
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: "0 140px",
        }}
      >
        {/* বাম পাশ: টেক্সট */}
        <div style={{ flex: 1.4, paddingRight: 60 }}>
          {slide.badge && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: COLORS.badgeBg,
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 999,
                padding: "10px 26px",
                marginBottom: 36,
                opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(badgeProgress, [0, 1], [-30, 0])}px)`,
              }}
            >
              {slide.number !== undefined && (
                <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 28 }}>
                  {toBengaliDigits(slide.number)} ·
                </span>
              )}
              <span style={{ color: COLORS.text, fontSize: 28, fontWeight: 600 }}>
                {slide.badge}
              </span>
            </div>
          )}

          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.5 }}>
            {slide.lines.map((line, lineIndex) => (
              <div key={lineIndex} style={{ whiteSpace: "nowrap" }}>
                {line.map((word, wordIndex) => {
                  const appearAtFrame = wordCounter * WORD_STAGGER_FRAMES;
                  wordCounter += 1;
                  return (
                    <Word
                      key={`${lineIndex}-${wordIndex}`}
                      text={word.text}
                      highlight={word.highlight}
                      appearAtFrame={appearAtFrame}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ডান পাশ: আইকন */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 260,
              height: 260,
              opacity: interpolate(iconProgress, [0, 1], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${iconProgress})`,
            }}
          >
            <Icon name={slide.icon} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
