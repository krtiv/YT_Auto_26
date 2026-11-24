import React from "react";
import { AbsoluteFill } from "remotion";
import { VideoLayer } from "./VideoLayer";
import { Card } from "./Card";
import { LiveBadge } from "./LiveBadge";
import { LogoBadge } from "./LogoBadge";
import { Outro } from "./Outro";
import { IntroSequence } from "./IntroSequence";
import { COLORS } from "./theme";

// এই ফাইল সাধারণত ছোঁয়ার দরকার নেই — কনটেন্ট/ব্র্যান্ডিং পাল্টাতে content.ts দেখো।
export const Template202Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <VideoLayer />
      <Card />
      <LiveBadge />
      <LogoBadge />
      <Outro />
      <IntroSequence />
    </AbsoluteFill>
  );
};
