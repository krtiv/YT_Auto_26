import React from "react";
import { Composition } from "remotion";
import { MainVideo, getTotalDurationInFrames } from "./Video";
import { FPS, WIDTH, HEIGHT } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={getTotalDurationInFrames(FPS)}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
