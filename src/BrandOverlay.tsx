import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { BRAND_CONFIG, Corner } from "./brandConfig";
import { COLORS } from "./theme";
import { BENGALI_FONT_FAMILY } from "./loadFont";

// brandConfig.ts-এ যা কিছু show: true করা থাকবে, সেগুলোকে
// ঠিক কোনায় বসানোর কাজটা এই ফাইল করে। সাধারণত এটা ছোঁয়ার দরকার নেই —
// শুধু brandConfig.ts এডিট করলেই যথেষ্ট।

const CORNER_STYLE: Record<Corner, React.CSSProperties> = {
  "top-left": { top: 48, left: 48, alignItems: "flex-start" },
  "top-right": { top: 48, right: 48, alignItems: "flex-end" },
  "bottom-left": { bottom: 48, left: 48, alignItems: "flex-start" },
  "bottom-right": { bottom: 48, right: 48, alignItems: "flex-end" },
};

const Pill: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      fontFamily: BENGALI_FONT_FAMILY,
      fontSize: 26,
      fontWeight: 600,
      color: COLORS.text,
      backgroundColor: COLORS.badgeBg,
      border: `2px solid ${COLORS.accent}`,
      borderRadius: 999,
      padding: "8px 22px",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </div>
);

type Item = { key: string; corner: Corner; node: React.ReactNode };

export const BrandOverlay: React.FC = () => {
  const items: Item[] = [];

  if (BRAND_CONFIG.logo.show) {
    items.push({
      key: "logo",
      corner: BRAND_CONFIG.logo.position,
      node: (
        <Img
          src={staticFile(BRAND_CONFIG.logo.file)}
          style={{ height: BRAND_CONFIG.logo.height, display: "block" }}
        />
      ),
    });
  }

  if (BRAND_CONFIG.socialHandle.show) {
    items.push({
      key: "social",
      corner: BRAND_CONFIG.socialHandle.position,
      node: <Pill text={BRAND_CONFIG.socialHandle.text} />,
    });
  }

  if (BRAND_CONFIG.contactInfo.show) {
    items.push({
      key: "contact",
      corner: BRAND_CONFIG.contactInfo.position,
      node: <Pill text={BRAND_CONFIG.contactInfo.text} />,
    });
  }

  // যেসব আইটেম একই কোনায় যাবে, তাদের একটার নিচে একটা সাজানো হচ্ছে
  const byCorner: Record<Corner, Item[]> = {
    "top-left": [],
    "top-right": [],
    "bottom-left": [],
    "bottom-right": [],
  };
  items.forEach((item) => byCorner[item.corner].push(item));

  return (
    <AbsoluteFill>
      {(Object.keys(byCorner) as Corner[]).map((corner) => {
        const cornerItems = byCorner[corner];
        if (cornerItems.length === 0) return null;
        return (
          <div
            key={corner}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              ...CORNER_STYLE[corner],
            }}
          >
            {cornerItems.map((item) => (
              <React.Fragment key={item.key}>{item.node}</React.Fragment>
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
