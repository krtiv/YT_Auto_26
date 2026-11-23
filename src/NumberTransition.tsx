import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";
import { toBengaliDigits } from "./utils";

// প্রতিটা নাম্বার-পয়েন্টের শুরুতে বড় করে "১", "২"... দেখানোর অ্যানিমেশন।
// এটা স্ক্রিনে কতক্ষণ থাকবে সেটা theme.ts-এর NUMBER_TRANSITION_FRAMES থেকে আসে।
export const NumberTransition: React.FC<{ number: number }> = ({ number }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ঢোকার সময় স্প্রিং অ্যানিমেশন দিয়ে স্কেল-ইন
  const scaleIn = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });

  // শেষের দিকে আস্তে আস্তে ফেড-আউট হয়ে পরের স্লাইডে চলে যাবে
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut,
      }}
    >
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: 32,
          backgroundColor: COLORS.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scaleIn})`,
        }}
      >
        <span style={{ fontSize: 120, fontWeight: 700, color: COLORS.background }}>
          {toBengaliDigits(number)}
        </span>
      </div>
    </AbsoluteFill>
  );
};
