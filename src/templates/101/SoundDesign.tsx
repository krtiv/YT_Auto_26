import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { SLIDES } from "./content";
import { SOUND } from "./soundConfig";
import { NUMBER_TRANSITION_FRAMES, WORD_STAGGER_FRAMES } from "./theme";
import { getSlideDurationInFrames } from "./Video";
import { splitLine } from "./Slide";

// প্রতিটা সাউন্ড ঠিক কোন ফ্রেমে বাজবে, সেটা content.ts থেকে অটোমেটিক হিসাব হয় —
// স্ক্রিপ্ট বদলালেও সাউন্ড নিজে থেকেই অ্যানিমেশনের সাথে মিলে যাবে।

type Cue = { key: string; from: number; file: string; volume: number };

const buildCues = (fps: number): Cue[] => {
  const cues: Cue[] = [];
  let slideStart = 0;

  SLIDES.forEach((slide, index) => {
    const hasNumber = slide.number !== undefined;
    const contentStart = slideStart + (hasNumber ? NUMBER_TRANSITION_FRAMES : 0);
    const isLast = index === SLIDES.length - 1;

    if (hasNumber) {
      cues.push({ key: `${slide.id}-whoosh`, from: Math.max(0, slideStart - 4), ...SOUND.numberWhoosh });
      cues.push({ key: `${slide.id}-chime`, from: slideStart + 5, ...SOUND.numberChime });
    } else if (isLast) {
      cues.push({ key: `${slide.id}-bell`, from: contentStart + 2, ...SOUND.endBell });
    } else {
      cues.push({ key: `${slide.id}-sweep`, from: Math.max(0, contentStart - 3), ...SOUND.slideSweep });
    }

    // হাইলাইট বক্স খোলার মুহূর্ত (Slide.tsx-এর অ্যানিমেশনের হিসাবের সাথে একই)
    let wordIndex = 0;
    slide.lines.forEach((line) => {
      splitLine(line).forEach((word) => {
        if (word.highlight && !isLast) {
          cues.push({
            key: `${slide.id}-pop-${wordIndex}`,
            from: contentStart + wordIndex * WORD_STAGGER_FRAMES + 4,
            ...SOUND.highlightPop,
          });
        }
        wordIndex += 1;
      });
    });

    slideStart += getSlideDurationInFrames(slide, fps);
  });

  return cues.filter((c) => c.volume > 0);
};

export const SoundDesign: React.FC = () => {
  const { fps } = useVideoConfig();
  const cues = buildCues(fps);

  return (
    <>
      {SOUND.vocalPad.volume > 0 && (
        <Audio src={staticFile(SOUND.vocalPad.file)} volume={SOUND.vocalPad.volume} />
      )}
      {cues.map((cue) => (
        <Sequence key={cue.key} from={cue.from} layout="none">
          <Audio src={staticFile(cue.file)} volume={cue.volume} />
        </Sequence>
      ))}
    </>
  );
};
