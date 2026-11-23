import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "./content";
import { COLORS } from "./theme";

// ভিডিওর একদম শুরুতে ৪ সেকেন্ড ধরে লোগো/নাম রিভিল হয়ে তারপর আসল ভিডিও দেখায়।
// সময়কাল কমাতে/বাড়াতে চাইলে INTRO_FRAMES পাল্টাও (৩০fps-এ ১২০ ফ্রেম = ৪ সেকেন্ড)।
const INTRO_FRAMES = 120;

export const IntroSequence: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame > INTRO_FRAMES) return null;

  const contentOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // শেষের ২০ ফ্রেমে পুরো কভারটা লাল ফ্ল্যাশ হয়ে তারপর মিলিয়ে গিয়ে ভিডিও দেখায়
  const flashOpacity = interpolate(
    frame,
    [INTRO_FRAMES - 20, INTRO_FRAMES - 12, INTRO_FRAMES],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const coverOpacity = interpolate(frame, [INTRO_FRAMES - 10, INTRO_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        opacity: coverOpacity,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ opacity: contentOpacity, display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            backgroundColor: COLORS.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            color: "#fff",
            fontWeight: 800,
          }}
        >
          {">_"}
        </div>
        <div>
          <div style={{ fontSize: 13, letterSpacing: 2, color: COLORS.accent, fontWeight: 700 }}>
            {BRAND.intro}
          </div>
          <div style={{ fontSize: 34, color: COLORS.text, fontWeight: 800 }}>{BRAND.name}</div>
          <div style={{ fontSize: 15, color: COLORS.mutedText }}>{BRAND.tagline}</div>
        </div>
      </div>
      <AbsoluteFill style={{ backgroundColor: COLORS.accent, opacity: flashOpacity }} />
    </AbsoluteFill>
  );
};
