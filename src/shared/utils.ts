// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করে, যেমন 1 -> "১", 25 -> "২৫"
export const toBengaliDigits = (n: number): string => {
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(n)
    .split("")
    .map((d) => (/\d/.test(d) ? bengaliDigits[Number(d)] : d))
    .join("");
};
