// বাংলা টেক্সটের জন্য ফন্ট — public/fonts ফোল্ডারে রাখা আছে (ইন্টারনেট ছাড়াই রেন্ডার হবে)।
// অন্য ফন্ট ব্যবহার করতে চাইলে: নতুন .ttf ফাইল public/fonts এ রেখে নিচের @font-face-এ src পাল্টাও।
import { staticFile } from "remotion";

export const BENGALI_FONT_FAMILY = "Hind Siliguri";
// আরবি চিহ্ন (যেমন ﷺ) বাংলা ফন্টে নেই — তাই এগুলো Amiri ফন্ট থেকে আসবে
export const ARABIC_FONT_FAMILY = "Amiri";
// fontFamily-তে এটা ব্যবহার করো: আগে বাংলা ফন্ট, না পেলে আরবি ফন্ট
export const TEXT_FONT_STACK = `"${BENGALI_FONT_FAMILY}", "${ARABIC_FONT_FAMILY}"`;

export const fontCss = `
@font-face {
  font-family: "${BENGALI_FONT_FAMILY}";
  src: url(${staticFile("fonts/HindSiliguri-Regular.ttf")}) format("truetype");
  font-weight: 400;
}
@font-face {
  font-family: "${BENGALI_FONT_FAMILY}";
  src: url(${staticFile("fonts/HindSiliguri-SemiBold.ttf")}) format("truetype");
  font-weight: 600;
}
@font-face {
  font-family: "${BENGALI_FONT_FAMILY}";
  src: url(${staticFile("fonts/HindSiliguri-Bold.ttf")}) format("truetype");
  font-weight: 700;
}
@font-face {
  font-family: "${ARABIC_FONT_FAMILY}";
  src: url(${staticFile("fonts/Amiri-Arabic-Bold.woff2")}) format("woff2");
  font-weight: 400 700;
}
`;
