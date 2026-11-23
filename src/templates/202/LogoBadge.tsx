import React from "react";
import { BRAND } from "./content";
import { COLORS } from "./theme";

// নিচে-ডানে সবসময় থাকা ছোট লোগো ব্যাজ। content.ts-এর BRAND.logoLabel বদলালেই
// এখানের অক্ষর বদলে যাবে।
export const LogoBadge: React.FC = () => (
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
