// Template 101 — সহীহ বুখারী ৬৪১৫ (সাহল রাঃ)
// হাদিসের শব্দ হুবহু রাখা হয়েছে, শুধু লাইনে ভাগ করা হয়েছে।
// নতুন আইকন লাগবে: "book", "garden", "sunrise", "sunset" (icons.tsx-এ যোগ করতে হবে)

export type Word = { text: string; highlight?: boolean };

export type IconName =
  | "clock" | "moon" | "bed" | "phone" | "stopwatch" | "rocket"
  | "book" | "garden" | "sunrise" | "sunset";

export type Slide = {
  id: string;
  number?: number;
  badge?: string;
  lines: Word[][];
  icon: IconName;
  durationInSeconds: number;
};

export const SLIDES: Slide[] = [
  {
    id: "intro",
    lines: [
      [{ text: "সাহল (রাঃ) থেকে বর্ণিত:" }],
      [{ text: "আমি " }, { text: "নবী (ﷺ)-কে বলতে শুনেছি", highlight: true }, { text: "," }],
    ],
    icon: "book",
    durationInSeconds: 4,
  },
  {
    id: "jannah-1",
    number: 1,
    badge: "জান্নাতের এক চাবুক পরিমিত জায়গা",
    lines: [
      [{ text: "জান্নাতের মাঝে" }],
      [{ text: "এক চাবুক পরিমিত জায়গা", highlight: true }],
    ],
    icon: "garden",
    durationInSeconds: 3.5,
  },
  {
    id: "jannah-2",
    badge: "জান্নাতের এক চাবুক পরিমিত জায়গা",
    lines: [
      [{ text: "দুনিয়া এবং তার মাঝে যা কিছু আছে" }],
      [{ text: "তার চেয়ে উত্তম", highlight: true }, { text: "।" }],
    ],
    icon: "garden",
    durationInSeconds: 4,
  },
  {
    id: "morning",
    number: 2,
    badge: "আল্লাহ্‌র পথে এক মুহূর্ত",
    lines: [
      [{ text: "আর আল্লাহ্‌র পথে" }],
      [{ text: "সকালের এক মুহূর্ত", highlight: true }],
    ],
    icon: "sunrise",
    durationInSeconds: 3.5,
  },
  {
    id: "evening",
    badge: "আল্লাহ্‌র পথে এক মুহূর্ত",
    lines: [
      [{ text: "কিংবা" }],
      [{ text: "বিকালের (সন্ধ্যা) এক মুহূর্ত", highlight: true }],
    ],
    icon: "sunset",
    durationInSeconds: 3.5,
  },
  {
    id: "better-than-dunya",
    badge: "আল্লাহ্‌র পথে এক মুহূর্ত",
    lines: [
      [{ text: "দুনিয়া ও তার মাঝে যা কিছু আছে" }],
      [{ text: "তার চেয়ে উত্তম", highlight: true }, { text: "।" }],
    ],
    icon: "clock",
    durationInSeconds: 4,
  },
  {
    id: "reference",
    lines: [
      [{ text: "সহীহ বুখারী, হাদিস নং ৬৪১৫", highlight: true }],
      [{ text: "হাদিসের মান: সহিহ হাদিস" }],
      [{ text: "সোর্স: আল হাদিস অ্যাপ, irdfoundation.com" }],
    ],
    icon: "book",
    durationInSeconds: 5,
  },
];
