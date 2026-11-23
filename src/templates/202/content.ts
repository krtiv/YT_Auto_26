// ================================================================
// টেমপ্লেট ২০২ — টক-হেড ভিডিওর উপর হেডিং/গ্রাফিক ওভারলে স্টাইল।
// এই ফাইলটাই এডিট করবে: তোমার ভিডিও ফাইলের নাম, ব্র্যান্ড/লোগো তথ্য,
// আর কোন সেকেন্ডে কোন হেডিং/গ্রাফিক দেখাবে সেটা।
// ================================================================

// ১) তোমার আসল টক-হেড ভিডিওটা public/ ফোল্ডারে রেখে এখানে নাম বসাও
//    (এখন একটা placeholder/স্যাম্পল ফুটেজ বসানো আছে টেস্ট করার জন্য)
export const VIDEO_SOURCE = "sample-footage.mp4";

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

export const MOMENTS: Moment[] = [
  {
    id: "m1",
    startSeconds: 2,
    durationSeconds: 4,
    eyebrow: "THE TOPIC",
    heading: "Video editing with AI",
    side: "left",
    graphic: "none",
  },
  {
    id: "m2",
    startSeconds: 9,
    durationSeconds: 5,
    eyebrow: "THE REAL QUESTION",
    heading: "Afraid AI will take your job?",
    side: "right",
    graphic: "diagram",
  },
  {
    id: "m3",
    startSeconds: 17,
    durationSeconds: 7,
    eyebrow: "THE NEXT FEW MONTHS",
    heading: "A one-person team",
    subheading: "Learn · Build · Record · Edit · Ship",
    side: "left",
    graphic: "tags",
    tags: ["Learn", "Build", "Record", "Edit", "Ship"],
  },
  {
    id: "m4",
    startSeconds: 25,
    durationSeconds: 4,
    eyebrow: "PROGRESS",
    heading: "Halfway through the course",
    side: "right",
    graphic: "meter",
    meterValue: 52,
  },
];

// ৪) ভিডিওর একদম শেষে যে ক্লোজিং লাইনটা দেখাবে
export const OUTRO_TEXT = "Stay well. Take care.";
