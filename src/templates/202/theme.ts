// এই টেমপ্লেটের কালার আর সাইজ — চেঞ্জ করলে পুরো টেমপ্লেটের রঙ বদলে যাবে।
export const COLORS = {
  background: "#0a0a0a",
  accent: "#e8382a", // লাল অ্যাকসেন্ট
  text: "#ffffff",
  mutedText: "#b5b5b5",
  badgeBg: "#1a1a1a",
};

export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;

// ভিডিও ছোট হয়ে পাশে সরার সময় কতক্ষণ ধরে (ফ্রেমে) সেটা স্মুথলি হবে —
// সংখ্যাটা বাড়ালে আরও ধীর/স্মুথ, কমালে আরও দ্রুত/চটজলদি লাগবে।
export const SHIFT_TRANSITION_FRAMES = 36;
