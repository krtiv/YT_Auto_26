import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, IS_PORTRAIT, WORD_STAGGER_FRAMES } from "./theme";
import { PatternBackground } from "./PatternBackground";
import { Icon } from "./icons";
import { toBengaliDigits } from "../../shared/utils";
import type { Slide as SlideType, Word as WordType } from "./content";

// শুধু দাঁড়ি/কমা জাতীয় চিহ্ন হলে আগের শব্দের গায়ে লেগে বসবে (মাঝে ফাঁকা থাকবে না)
const isPunctuation = (text: string) => /^[।,:;!?.]+$/.test(text.trim());

// সাধারণ (হাইলাইট ছাড়া) লেখাকে আলাদা আলাদা শব্দে ভাগ করা হচ্ছে, যাতে
// শব্দগুলো একটা একটা করে আসে আর লম্বা লাইন দরকার হলে নিজে থেকে ভেঙে যায়।
// হাইলাইট করা অংশ একসাথে এক বক্সেই থাকে।
export const splitLine = (line: WordType[]): WordType[] =>
  line.flatMap((word) =>
    word.highlight
      ? [word]
      : word.text
          .split(/\s+/)
          .filter((t) => t.length > 0)
          .map((t) => ({ text: t }))
  );

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
        // হাইলাইট বক্সের দুই পাশে একটু বেশি ফাঁকা, যাতে পাশের শব্দ বক্সে না লাগে
        marginRight: highlight ? 26 : 14,
        marginLeft: highlight ? 12 : isPunctuation(text) ? -14 : 0,
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
        style={
          IS_PORTRAIT
            ? {
                // শর্টস: আইকন উপরে, নিচে টেক্সট — সব মাঝখানে, নিচের দিকে
                // শর্টসের বাটন/ক্যাপশনের জায়গা ফাঁকা রাখা হয়েছে
                flexDirection: "column-reverse",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 80px 260px 80px",
                gap: 70,
              }
            : { flexDirection: "row", alignItems: "center", padding: "0 140px" }
        }
      >
        {/* টেক্সট (ল্যান্ডস্কেপে বাম পাশে, শর্টসে আইকনের নিচে) */}
        <div
          style={
            IS_PORTRAIT
              ? { width: "100%", textAlign: "center" }
              : { flex: 1.4, paddingRight: 60 }
          }
        >
          {slide.badge && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: COLORS.badgeBg,
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 999,
                padding: IS_PORTRAIT ? "12px 30px" : "10px 26px",
                marginBottom: IS_PORTRAIT ? 48 : 36,
                opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(badgeProgress, [0, 1], [-30, 0])}px)`,
              }}
            >
              {slide.number !== undefined && (
                <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: IS_PORTRAIT ? 34 : 28 }}>
                  {toBengaliDigits(slide.number)} ·
                </span>
              )}
              <span style={{ color: COLORS.text, fontSize: IS_PORTRAIT ? 34 : 28, fontWeight: 600 }}>
                {slide.badge}
              </span>
            </div>
          )}

          <div style={{ fontSize: IS_PORTRAIT ? 66 : 56, fontWeight: 700, lineHeight: 1.6 }}>
            {slide.lines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                style={
                  IS_PORTRAIT
                    ? { display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: 6 }
                    : { whiteSpace: "nowrap" }
                }
              >
                {splitLine(line).map((word, wordIndex) => {
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

        {/* আইকন (ল্যান্ডস্কেপে ডান পাশে, শর্টসে উপরে) */}
        <div
          style={{
            flex: IS_PORTRAIT ? undefined : 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: IS_PORTRAIT ? 300 : 260,
              height: IS_PORTRAIT ? 300 : 260,
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
