import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { VIDEO_SOURCE } from "./content";
import { WIDTH } from "./theme";
import { getActiveMoment } from "./helpers";

// পেছনে তোমার আসল টক-হেড ভিডিওটা প্লে হয়, আর কোনো "moment" active থাকলে
// সেটা ছোট হয়ে পাশে সরে যায় (যাতে হেডিং-এর জন্য জায়গা ফাঁকা হয়)।
export const VideoLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const active = getActiveMoment(seconds);

  let shiftProgress = 0;
  let direction = 0;

  if (active) {
    const localFrame = frame - active.startSeconds * fps;
    const totalLocalFrames = active.durationSeconds * fps;
    const inP = interpolate(localFrame, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const outP = interpolate(localFrame, [totalLocalFrames - 15, totalLocalFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    shiftProgress = Math.min(inP, outP);
    direction = active.side === "left" ? -1 : 1;
  }

  const scale = interpolate(shiftProgress, [0, 1], [1, 0.55]);
  const translateX = interpolate(shiftProgress, [0, 1], [0, direction * WIDTH * 0.23]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `translateX(${translateX}px) scale(${scale})` }}>
        <OffthreadVideo src={staticFile(VIDEO_SOURCE)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
