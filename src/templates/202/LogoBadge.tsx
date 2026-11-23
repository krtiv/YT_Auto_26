import React from "react";
import { Img, staticFile } from "remotion";
import { BRAND } from "./content";
import { COLORS } from "./theme";

// নিচে-ডানে সবসময় থাকা লোগো ব্যাজ।
// content.ts-এ BRAND.logoImage একটা ছবির নাম থাকলে সেটা দেখাবে,
// খালি স্ট্রিং থাকলে BRAND.logoLabel অক্ষর দিয়ে একটা সাধারণ ব্যাজ দেখাবে।
export const LogoBadge: React.FC = () => {
  if (BRAND.logoImage) {
    return (
      <Img
        src={staticFile(BRAND.logoImage)}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          height: 40,
          width: "auto",
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: COLORS.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        fontWeight: 800,
        color: "#fff",
        letterSpacing: 0.5,
      }}
    >
      {BRAND.logoLabel}
    </div>
  );
};
