// ================================================================
// টেমপ্লেট ২০২ — টক-হেড ভিডিওর উপর একটা কার্ড ভেসে ওঠার স্টাইল।
// ভিডিওটা পুরো সময় ফুল-স্ক্রিন থাকে (কখনো ছোট/সরে যায় না); একটা ছোট
// কার্ড কোনায় ভেসে ওঠে, আর তার ভেতরে লাইন একটার পর একটা জমতে থাকে —
// ঠিক রেফারেন্স ভিডিওর মতো।
// এই ফাইলটাই এডিট করবে।
// ================================================================

// ১) তোমার আসল টক-হেড ভিডিওটা public/ ফোল্ডারে রেখে এখানে নাম বসাও
export const VIDEO_SOURCE = "template-202-source.mp4";

// ২) ইন্ট্রোতে আর কোনায় যে লোগো/নাম দেখাবে
export const BRAND = {
  intro: "উপস্থাপনায়", // লোগোর উপরে ছোট লাল লেখা (ইন্ট্রোতে)
  name: "অভিযাত্রিক",
  tagline: "", // লোগো ছবিতে ট্যাগলাইন বিল্ট-ইন থাকলে এটা খালি রাখো
  // লোগো ছবি public/ ফোল্ডারে রেখে এখানে নাম বসাও (Figma থেকে এক্সপোর্ট করা)
  logoImage: "abhijatrik-logo.png",
  logoLabel: "AT", // logoImage খালি স্ট্রিং ("") করলে এই অক্ষর দিয়ে সাধারণ ব্যাজ দেখাবে
};

// একটা কার্ডের ভেতরে একটার পর একটা যে লাইনগুলো জমতে থাকে
export type CardLine = {
  text: string;
  delaySeconds: number; // কার্ড/মোমেন্ট শুরুর কত সেকেন্ড পর এই লাইনটা ভেসে উঠবে
  style?: "eyebrow" | "heading" | "muted" | "highlight";
  // eyebrow = ছোট লাল ক্যাপশন লেবেল, heading = বড় বোল্ড সাদা লেখা,
  // muted = ছোট ধূসর সাব-টেক্সট/কোট, highlight = লাল জোর দেওয়া লাইন
};

export type GraphicType = "none" | "tags" | "meter" | "diagram";

export type Moment = {
  id: string;
  startSeconds: number; // ভিডিওর কত সেকেন্ডে কার্ডটা আসা শুরু হবে
  durationSeconds: number; // কার্ডটা মোট কতক্ষণ স্ক্রিনে থাকবে
  position: "top-left" | "top-right"; // কার্ডটা কোন কোনায় বসবে
  lines: CardLine[];
  graphic?: GraphicType; // "none" | "tags" | "meter" | "diagram"
  graphicDelaySeconds?: number; // গ্রাফিকটা কার্ড শুরুর কত সেকেন্ড পর আসবে
  tags?: string[]; // graphic: "tags" হলে এগুলো একটার পর একটা দেখাবে
  meterValue?: number; // graphic: "meter" হলে ০-১০০ এর মধ্যে মান
  stampText?: string; // যেমন "IMPOSSIBLE" — কার্ডের উপর তেরছা স্ট্যাম্প
  stampDelaySeconds?: number;
};

// ================================================================
// ⚠️ খসড়া (DRAFT) — অটো-ট্রান্সক্রিপশন অনির্ভরযোগ্য হওয়ায় এই হেডিংগুলো
// নিশ্চিত না, শুধু আন্দাজ। প্রতিটা লাইনের text বদলে আসল কথাটা বসাও,
// delaySeconds/startSeconds গুলো ভিডিও দেখে মিলিয়ে ঠিক করো।
// ================================================================
export const MOMENTS: Moment[] = [
  {
    id: "m1",
    startSeconds: 0.5,
    durationSeconds: 7,
    position: "top-left",
    lines: [
      { text: "শুরুতে", delaySeconds: 0, style: "eyebrow" },
      { text: "আসসালামু আলাইকুম", delaySeconds: 0.3, style: "heading" },
      { text: "(আলহামদুলিল্লাহ... অভিযাত্রিক)", delaySeconds: 2, style: "muted" },
    ],
    graphic: "none",
  },
  {
    id: "m2",
    startSeconds: 8,
    durationSeconds: 8,
    position: "top-right",
    lines: [
      { text: "প্রজেক্ট", delaySeconds: 0, style: "eyebrow" },
      { text: "একটি প্রজেক্ট", delaySeconds: 0.3, style: "heading" },
      { text: "(FSP Project... P209 — নাম/সংখ্যা নিশ্চিত না)", delaySeconds: 2.5, style: "muted" },
    ],
    graphic: "none",
  },
  {
    id: "m3",
    startSeconds: 17,
    durationSeconds: 7,
    position: "top-left",
    lines: [
      { text: "প্রসঙ্গ", delaySeconds: 0, style: "eyebrow" },
      { text: "অপারেশন প্রসঙ্গে", delaySeconds: 0.3, style: "heading" },
      { text: "(...Operation, Bangladesh... Kora Shambohut Shilana)", delaySeconds: 2.5, style: "muted" },
    ],
    graphic: "none",
  },
  {
    id: "m4",
    startSeconds: 39,
    durationSeconds: 8,
    position: "top-right",
    lines: [
      { text: "প্রয়োজন", delaySeconds: 0, style: "eyebrow" },
      { text: "অপারেশনের প্রয়োজন", delaySeconds: 0.3, style: "heading" },
      { text: "(...operation... আলহামদুলিল্লাহ)", delaySeconds: 2.5, style: "muted" },
    ],
    graphic: "none",
  },
];

// ৪) ভিডিওর একদম শেষে যে ক্লোজিং লাইনটা দেখাবে (এটাও খসড়া, কনফার্ম করো)
export const OUTRO_TEXT = "ধন্যবাদ।";
