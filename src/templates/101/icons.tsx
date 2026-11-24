import React from "react";
import { COLORS } from "./theme";
import type { IconName } from "./content";

// প্রতিটা আইকন একটা সাধারণ SVG শেপ। নতুন আইকন বানাতে চাইলে
// নিচের মতো একটা ফাংশন লিখে IconMap-এ যোগ করে দাও, আর
// content.ts-এর IconName টাইপেও নাম যোগ করো।

const strokeProps = {
  fill: "none",
  stroke: COLORS.text,
  strokeWidth: 10,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Clock: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="90" r="70" {...strokeProps} />
    <path d="M100 50 V95 L130 115" {...strokeProps} />
    <circle cx="60" cy="25" r="10" fill={COLORS.accent} />
    <circle cx="140" cy="25" r="10" fill={COLORS.accent} />
  </svg>
);

const Moon: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path
      d="M140 40 A70 70 0 1 0 150 160 A55 55 0 0 1 140 40 Z"
      fill={COLORS.accent}
    />
  </svg>
);

const Bed: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M20 170 V90 H180 V170" {...strokeProps} />
    <path d="M20 130 H180" {...strokeProps} />
    <rect x="35" y="95" width="45" height="28" rx="8" fill={COLORS.accent} />
    <path d="M20 170 V190 M180 170 V190" {...strokeProps} />
  </svg>
);

const Phone: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <rect x="60" y="15" width="80" height="170" rx="14" {...strokeProps} />
    <circle cx="100" cy="160" r="7" fill={COLORS.accent} />
  </svg>
);

const Stopwatch: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="110" r="65" {...strokeProps} />
    <path d="M100 70 V110 L125 125" {...strokeProps} />
    <path d="M85 25 H115" {...strokeProps} />
    <path d="M100 25 V45" {...strokeProps} />
    <circle cx="150" cy="60" r="8" fill={COLORS.accent} />
  </svg>
);

const Rocket: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path
      d="M100 20 C130 50 140 100 120 140 L80 140 C60 100 70 50 100 20 Z"
      {...strokeProps}
    />
    <circle cx="100" cy="80" r="14" fill={COLORS.accent} />
    <path d="M80 140 L60 170 M120 140 L140 170" {...strokeProps} />
  </svg>
);

const Book: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path
      d="M100 60 C80 45 45 42 20 48 V165 C45 158 80 160 100 175 C120 160 155 158 180 165 V48 C155 42 120 45 100 60 Z"
      {...strokeProps}
    />
    <path d="M100 60 V175" {...strokeProps} />
    <path d="M132 44 V92 L144 80 L156 92 V44 Z" fill={COLORS.accent} />
  </svg>
);

const Garden: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M100 185 V105" {...strokeProps} />
    <path d="M100 140 L75 118 M100 128 L126 108" {...strokeProps} />
    <circle cx="100" cy="72" r="50" {...strokeProps} />
    <path d="M45 185 H155" {...strokeProps} />
    <circle cx="82" cy="62" r="9" fill={COLORS.accent} />
    <circle cx="118" cy="80" r="9" fill={COLORS.accent} />
    <circle cx="98" cy="96" r="7" fill={COLORS.accent} />
  </svg>
);

const SunHalf: React.FC<{ arrow: "up" | "down" }> = ({ arrow }) => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M45 140 A55 55 0 0 1 155 140 Z" fill={COLORS.accent} />
    <path d="M15 140 H185" {...strokeProps} />
    <path d="M100 60 V72 M45 85 L54 93 M155 85 L146 93 M22 118 H34 M178 118 H166" {...strokeProps} />
    {arrow === "up" ? (
      <path d="M100 185 V160 M88 172 L100 160 L112 172" {...strokeProps} />
    ) : (
      <path d="M100 158 V183 M88 171 L100 183 L112 171" {...strokeProps} />
    )}
  </svg>
);

const Sunrise: React.FC = () => <SunHalf arrow="up" />;
const Sunset: React.FC = () => <SunHalf arrow="down" />;

const IconMap: Record<IconName, React.FC> = {
  clock: Clock,
  moon: Moon,
  bed: Bed,
  phone: Phone,
  stopwatch: Stopwatch,
  rocket: Rocket,
  book: Book,
  garden: Garden,
  sunrise: Sunrise,
  sunset: Sunset,
};

export const Icon: React.FC<{ name: IconName }> = ({ name }) => {
  const Component = IconMap[name];
  return <Component />;
};
