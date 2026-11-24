// ================================================================
// সাউন্ড ডিজাইনের সেটিংস। ভলিউম 0 থেকে 1 — যত কম, তত হালকা।
// কোনো সাউন্ড বন্ধ করতে চাইলে ভলিউম 0 করে দাও।
// সাউন্ড ফাইলগুলো public/sfx/ ফোল্ডারে, বানানো হয়
// tools/sound/make_sounds.py দিয়ে (নিজেরা বানানো, কপিরাইট-ফ্রি)।
// ================================================================

export const SOUND = {
  // ব্যাকগ্রাউন্ডের হালকা নাশিদ-স্টাইল হামিং (বাদ্যযন্ত্র ছাড়া)
  vocalPad: { file: "sfx/vocal_pad.wav", volume: 0.3 },
  // নাম্বার (১, ২...) আসার সময়
  numberWhoosh: { file: "sfx/whoosh.wav", volume: 0.6 },
  numberChime: { file: "sfx/chime.wav", volume: 0.4 },
  // নাম্বার ছাড়া নতুন স্লাইড আসার সময়
  slideSweep: { file: "sfx/sweep.wav", volume: 0.4 },
  // হাইলাইট বক্স খোলার সময়
  highlightPop: { file: "sfx/pop.wav", volume: 0.45 },
  // শেষ স্লাইডে (রেফারেন্স)
  endBell: { file: "sfx/bell.wav", volume: 0.6 },
};
