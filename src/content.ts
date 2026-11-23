// ================================================================
// এই ফাইলটাই তোমার "স্ক্রিপ্ট"। ভিডিওর কনটেন্ট চেঞ্জ করতে হলে
// শুধু এই ফাইলটা এডিট করলেই হবে — অন্য কোনো কোড ছুঁতে হবে না।
//
// প্রতিটা "Slide" মানে ভিডিওর একটা অংশ/পয়েন্ট।
// ================================================================

// একটা শব্দ লেখার নিয়ম:
//   { text: "তোমার লেখা", highlight: true }  -> কমলা বক্সে হাইলাইট হয়ে দেখাবে
//   { text: "তোমার লেখা" }                   -> সাধারণ সাদা টেক্সট
export type Word = { text: string; highlight?: boolean };

// এখন পর্যন্ত এই আইকনগুলো বানানো আছে। নতুন আইকন চাইলে src/icons.tsx এ যোগ করতে হবে।
export type IconName = "clock" | "moon" | "bed" | "phone" | "stopwatch" | "rocket";

export type Slide = {
  id: string; // ইউনিক নাম, শুধু কোডের জন্য, স্ক্রিনে দেখা যাবে না
  number?: number; // স্লাইডের নাম্বার (১, ২, ৩...) — না দিলে নাম্বার-ব্যাজ/ট্রানজিশন দেখাবে না (ইনট্রো/আউটরোর জন্য)
  badge?: string; // উপরে ছোট পিলে যে লেখা দেখাবে
  lines: Word[][]; // একাধিক লাইন, প্রতিটা লাইন কয়েকটা শব্দ নিয়ে
  icon: IconName; // ডান পাশে কোন আইকনটা দেখাবে
  durationInSeconds: number; // এই স্লাইডটা স্ক্রিনে কতক্ষণ থাকবে (সেকেন্ডে)
};

export const SLIDES: Slide[] = [
  {
    id: "intro",
    lines: [
      [{ text: "তুমি যদি প্রতিদিন রাতে ঠিক করো," }],
      [
        { text: "কাল " },
        { text: "ফজরে উঠবে", highlight: true },
        { text: "," },
      ],
    ],
    icon: "clock",
    durationInSeconds: 3.5,
  },
  {
    id: "tip-1",
    number: 1,
    badge: "ফোন দূরে রাখো",
    lines: [
      [{ text: "ঘুমানোর আগে ফোনটা বিছানা থেকে" }],
      [{ text: "দূরে রাখো", highlight: true }, { text: "।" }],
    ],
    icon: "phone",
    durationInSeconds: 3.5,
  },
  {
    id: "tip-2",
    number: 2,
    badge: "অ্যালার্ম দূরে রাখো",
    lines: [
      [{ text: "অ্যালার্ম ঘড়িটা এমন জায়গায় রাখো," }],
      [
        { text: "যেখান থেকে " },
        { text: "উঠে গিয়ে বন্ধ করতে হয়", highlight: true },
        { text: "।" },
      ],
    ],
    icon: "bed",
    durationInSeconds: 3.5,
  },
  {
    id: "tip-3",
    number: 3,
    badge: "রাত জাগা বাদ দাও",
    lines: [
      [{ text: "রাত জাগার অভ্যাসটা" }],
      [{ text: "আজ থেকেই বাদ দাও", highlight: true }, { text: "।" }],
    ],
    icon: "moon",
    durationInSeconds: 3.5,
  },
  {
    id: "tip-4",
    number: 4,
    badge: "আজই শুরু করো",
    lines: [
      [{ text: "আগামীকাল নয়," }],
      [{ text: "আজ রাত থেকেই শুরু করো", highlight: true }, { text: "।" }],
    ],
    icon: "stopwatch",
    durationInSeconds: 3.5,
  },
  {
    id: "outro",
    lines: [
      [{ text: "ছোট্ট এই অভ্যাসগুলোই" }],
      [{ text: "তোমার ফজর বদলে দেবে", highlight: true }, { text: "।" }],
    ],
    icon: "rocket",
    durationInSeconds: 3.5,
  },
];
