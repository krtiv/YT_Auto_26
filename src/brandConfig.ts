// ================================================================
// এই ফাইলে ভিডিওর "ব্র্যান্ডিং" অংশ কন্ট্রোল হয় — লোগো, সোশ্যাল মিডিয়া
// হ্যান্ডেল, কন্টাক্ট ইনফো। এগুলো প্রতিটা স্লাইডের উপরে, কোনায়
// সবসময় দেখা যাবে (পুরো ভিডিও জুড়ে)।
//
// কোনো একটা বন্ধ করতে চাইলে শুধু show: false করে দাও।
// পজিশন পাল্টাতে চাইলে এই ৪টার যেকোনো একটা লেখো:
//   "top-left" | "top-right" | "bottom-left" | "bottom-right"
// ================================================================

export type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export const BRAND_CONFIG = {
  // লোগো (ছবি ফাইল public/ ফোল্ডারে রাখতে হবে, যেমন public/logo.png)
  logo: {
    show: false, // true করলে লোগো দেখাবে — আগে নিচের file-এ সঠিক ফাইলের নাম বসাও
    file: "logo.png", // public ফোল্ডারের ভিতরে ফাইলের পাথ (public/ লেখার দরকার নেই)
    position: "top-right" as Corner,
    height: 80, // পিক্সেলে লোগোর উচ্চতা
  },

  // সোশ্যাল মিডিয়া হ্যান্ডেল (ফেসবুক/ইউটিউব/ইনস্টাগ্রাম পেজের নাম)
  socialHandle: {
    show: true,
    text: "@tumar_page",
    position: "bottom-right" as Corner,
  },

  // ওয়েবসাইট/কন্টাক্ট তথ্য
  contactInfo: {
    show: true,
    text: "www.example.com",
    position: "bottom-left" as Corner,
  },
};
