// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে, যেমন 1 -> "১", 25 -> "২৫"
export const toBengaliDigits = (n: number): string => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((d) => (/\d/.test(d) ? bengaliDigits[Number(d)] : d))
    .join("");
};

// সেকেন্ডকে "m:ss" ফরম্যাটে দেখায়, যেমন 75 -> "1:15"
export const formatTimer = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};
