// এই ফাইলে ভিডিওর কালার আর সাইজ সেট করা থাকে।
// কালার কোড পাল্টালে পুরো ভিডিওর রঙ বদলে যাবে।

// রঙের সেট — নিচের ACTIVE_PALETTE-এ যেটার নাম লিখবে, পুরো ভিডিও সেই রঙে হবে
export const PALETTES = {
  // আগের ডিফল্ট: গাঢ় কফি-ব্ল্যাক + কমলা
  coffeeOrange: {
    background: "#17110e",
    patternStroke: "#2b211b",
    accent: "#f07a2e",
    text: "#f5ece3",
    badgeBg: "#231b17",
  },
  // সবুজ-সোনালি (ইসলামিক/হাদিস কনটেন্টের জন্য)
  greenGold: {
    background: "#0a2620", // গাঢ় পান্না-সবুজ
    patternStroke: "#15423a",
    accent: "#d9ae4f", // সোনালি হাইলাইট
    text: "#f5efdf",
    badgeBg: "#103a31",
  },
};

export const ACTIVE_PALETTE: keyof typeof PALETTES = "greenGold";
export const COLORS = PALETTES[ACTIVE_PALETTE];

export const FPS = 30;
// ভিডিওর সাইজ: "portrait" = শর্টস/রিলস (9:16, 1080x1920), "landscape" = ইউটিউব (16:9, 1920x1080)
export const FORMAT: "portrait" | "landscape" = "portrait";
export const IS_PORTRAIT = FORMAT === "portrait";
export const WIDTH = IS_PORTRAIT ? 1080 : 1920;
export const HEIGHT = IS_PORTRAIT ? 1920 : 1080;

// প্রতিটা শব্দ স্ক্রিনে আসার মাঝে কত ফ্রেম গ্যাপ থাকবে (বেশি করলে স্লো হয়ে শব্দ আসবে)
export const WORD_STAGGER_FRAMES = 4;

// নাম্বার-ট্রানজিশন (১, ২, ৩... বড় করে দেখানো) কতক্ষণ থাকবে, ফ্রেমে
export const NUMBER_TRANSITION_FRAMES = 20;
