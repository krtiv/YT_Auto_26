import React from "react";
import { Composition, staticFile } from "remotion";
import { getVideoMetadata } from "@remotion/media-utils";
import { MainVideo as Template101Video, getTotalDurationInFrames as getTemplate101Duration } from "./templates/101/Video";
import { FPS as T101_FPS, WIDTH as T101_WIDTH, HEIGHT as T101_HEIGHT } from "./templates/101/theme";
import { Template202Video } from "./templates/202/Video";
import { FPS as T202_FPS, WIDTH as T202_WIDTH, HEIGHT as T202_HEIGHT } from "./templates/202/theme";
import { VIDEO_SOURCE as T202_VIDEO_SOURCE } from "./templates/202/content";

// নতুন টেমপ্লেট যোগ করতে হলে:
// 1. src/templates/<নাম্বার>/ ফোল্ডারে ওই টেমপ্লেটের সব ফাইল রাখো
// 2. এখানে সেটার Video আর theme ইম্পোর্ট করো
// 3. নিচে নতুন একটা <Composition id="Template<নাম্বার>" ... /> যোগ করো
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Template101"
        component={Template101Video}
        durationInFrames={getTemplate101Duration(T101_FPS)}
        fps={T101_FPS}
        width={T101_WIDTH}
        height={T101_HEIGHT}
      />
      <Composition
        id="Template202"
        component={Template202Video}
        fps={T202_FPS}
        width={T202_WIDTH}
        height={T202_HEIGHT}
        durationInFrames={1}
        calculateMetadata={async () => {
          // content.ts-এ VIDEO_SOURCE বদলালে, ভিডিওর দৈর্ঘ্য অনুযায়ী এটা অটোমেটিক
          // এডজাস্ট হয়ে যাবে — হাতে কোনো নাম্বার বসাতে হবে না।
          const { durationInSeconds } = await getVideoMetadata(staticFile(T202_VIDEO_SOURCE));
          return { durationInFrames: Math.round(durationInSeconds * T202_FPS) };
        }}
      />
    </>
  );
};
