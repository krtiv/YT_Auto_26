import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { VIDEO_SOURCE } from "./content";

// পেছনে তোমার আসল টক-হেড ভিডিওটা পুরো স্ক্রিন জুড়ে, পুরোটা সময় ধরে প্লে হয় —
// রেফারেন্স ভিডিওর মতোই ভিডিওটা কখনো ছোট/সরে যায় না, উপরে শুধু কার্ড ভেসে ওঠে
// (দেখো Card.tsx)।
export const VideoLayer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile(VIDEO_SOURCE)} />
    </AbsoluteFill>
  );
};
