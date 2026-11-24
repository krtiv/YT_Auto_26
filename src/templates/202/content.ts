// ================================================================
// টেমপ্লেট ২০২ — টক-হেড ভিডিওর উপর হেডিং/গ্রাফিক ওভারলে স্টাইল।
// এই ফাইলটাই এডিট করবে: তোমার ভিডিও ফাইলের নাম, ব্র্যান্ড/লোগো তথ্য,
// আর কোন সেকেন্ডে কোন হেডিং/গ্রাফিক দেখাবে সেটা।
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

// ৩) প্রতিটা "মোমেন্ট" মানে ভিডিওর একটা নির্দিষ্ট সময়ে হেডিং/গ্রাফিক ভেসে ওঠা।
//    startSeconds = ভিডিওর কত সেকেন্ডে এটা শুরু হবে (তোমার ভিডিওর অডিও/স্ক্রিপ্ট শুনে বসাও)
//    side = ভিডিওটা কোন পাশে ছোট হয়ে সরে যাবে — হেডিং এমনিতেই উল্টো পাশে বসবে
//    graphic = "none" | "tags" | "meter" | "diagram" (তিন রকম ছোট গ্রাফিক রেডি আছে)
export type GraphicType = "none" | "tags" | "meter" | "diagram";

export type Moment = {
  id: string;
  startSeconds: number;
  durationSeconds: number;
  eyebrow?: string; // হেডিং-এর উপরে ছোট লাল লেবেল (ঐচ্ছিক)
  heading: string;
  subheading?: string; // হেডিং-এর নিচে ছোট ধূসর লাইন (ঐচ্ছিক)
  side: "left" | "right";
  graphic?: GraphicType;
  tags?: string[]; // graphic: "tags" হলে এগুলো একটার পর একটা দেখাবে
  meterValue?: number; // graphic: "meter" হলে ০-১০০ এর মধ্যে মান
};

// ================================================================
// ⚠️ খসড়া (DRAFT) — অটো-ট্রান্সক্রিপশন অনির্ভরযোগ্য হওয়ায় এই হেডিংগুলো
// নিশ্চিত না, শুধু আন্দাজ। heading-এর জায়গায় সঠিক লেখা বসাও, subheading-এ
// যা অডিওতে ধরা পড়েছে তার (ভাঙা) ইঙ্গিত রাখা আছে রেফারেন্সের জন্য —
// ভিডিওটা একবার দেখে/শুনে এগুলো ঠিক করে দাও। যেটুকু একদমই বোঝা যায়নি
// (৪৭ সেকেন্ডের পর থেকে প্রায় পুরোটাই) সেখানে কোনো মোমেন্ট রাখিনি।
// ================================================================
export const MOMENTS: Moment[] = [
  {
    id: "m1",
    startSeconds: 0.5,
    durationSeconds: 7,
    eyebrow: "খসড়া",
    heading: "অভিযাত্রিক",
    subheading: "(আসসালামু আলাইকুম, আলহামদুলিল্লাহ... অভিযাত্রিক)",
    side: "left",
    graphic: "none",
  },
  {
    id: "m2",
    startSeconds: 8,
    durationSeconds: 8,
    eyebrow: "খসড়া",
    heading: "একটি প্রজেক্ট",
    subheading: "(FSP Project... P209 — নাম/সংখ্যাটা নিশ্চিত না)",
    side: "right",
    graphic: "none",
  },
  {
    id: "m3",
    startSeconds: 17,
    durationSeconds: 7,
    eyebrow: "খসড়া",
    heading: "অপারেশন প্রসঙ্গে",
    subheading: "(...Operation, Bangladesh... Kora Shambohut Shilana)",
    side: "left",
    graphic: "none",
  },
  {
    id: "m4",
    startSeconds: 39,
    durationSeconds: 8,
    eyebrow: "খসড়া",
    heading: "অপারেশনের প্রয়োজন",
    subheading: "(...operation... আলহামদুলিল্লাহ)",
    side: "right",
    graphic: "none",
  },
];

// ৪) ভিডিওর একদম শেষে যে ক্লোজিং লাইনটা দেখাবে (এটাও খসড়া, কনফার্ম করো)
export const OUTRO_TEXT = "ধন্যবাদ।";
