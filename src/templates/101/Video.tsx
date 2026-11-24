import React from "react";
import { AbsoluteFill, Sequence, Series, useVideoConfig } from "remotion";
import { SLIDES } from "./content";
import { Slide } from "./Slide";
import { NumberTransition } from "./NumberTransition";
import { ProgressBar } from "./ProgressBar";
import { BrandOverlay } from "./BrandOverlay";
import { COLORS, NUMBER_TRANSITION_FRAMES } from "./theme";
import { TEXT_FONT_STACK, fontCss } from "../../shared/loadFont";

// এই ফাইলটা "অ্যাসেম্বলার" — এটা content.ts-এর প্রতিটা স্লাইড
// একটার পর একটা সময়মতো সাজিয়ে পুরো ভিডিওটা বানায়।
// সাধারণত এই ফাইল চেঞ্জ করার দরকার পড়বে না, যদি না তুমি
// ট্রানজিশনের ধরন পাল্টাতে চাও।

// একটা slide কতগুলো ফ্রেম জুড়ে থাকবে (নাম্বার-ট্রানজিশনসহ), সেটা হিসাব করে
export const getSlideDurationInFrames = (
  slide: (typeof SLIDES)[number],
  fps: number
) => {
  const transitionFrames = slide.number !== undefined ? NUMBER_TRANSITION_FRAMES : 0;
  const contentFrames = Math.round(slide.durationInSeconds * fps);
  return transitionFrames + contentFrames;
};

// পুরো ভিডিওটা মোট কত ফ্রেম লম্বা হবে, Root.tsx এটা ব্যবহার করে
export const getTotalDurationInFrames = (fps: number) =>
  SLIDES.reduce((total, slide) => total + getSlideDurationInFrames(slide, fps), 0);

export const MainVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{ backgroundColor: COLORS.background, fontFamily: TEXT_FONT_STACK }}
    >
      <style>{fontCss}</style>
      <Series>
        {SLIDES.map((slide) => {
          const transitionFrames =
            slide.number !== undefined ? NUMBER_TRANSITION_FRAMES : 0;
          const contentFrames = Math.round(slide.durationInSeconds * fps);

          return (
            <Series.Sequence
              key={slide.id}
              durationInFrames={transitionFrames + contentFrames}
            >
              {transitionFrames > 0 && (
                <Sequence durationInFrames={transitionFrames}>
                  <NumberTransition number={slide.number as number} />
                </Sequence>
              )}
              <Sequence from={transitionFrames} durationInFrames={contentFrames}>
                <Slide slide={slide} />
              </Sequence>
            </Series.Sequence>
          );
        })}
      </Series>
      <ProgressBar />
      <BrandOverlay />
    </AbsoluteFill>
  );
};
