import React from "react";
import { Composition } from "remotion";
import { MainVideo as Template101Video, getTotalDurationInFrames as getTemplate101Duration } from "./templates/101/Video";
import { FPS as T101_FPS, WIDTH as T101_WIDTH, HEIGHT as T101_HEIGHT } from "./templates/101/theme";

// নতুন টেমপ্লেট যোগ করতে হলে:
// 1. src/templates/<নাম্বার>/ ফোল্ডারে ওই টেমপ্লেটের সব ফাইল রাখো (101-এর গঠন কপি করে শুরু করা যায়)
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
    </>
  );
};
