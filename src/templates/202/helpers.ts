import { MOMENTS, type Moment } from "./content";

// এই মুহূর্তে (সেকেন্ডে) কোন moment active আছে সেটা খুঁজে বের করে।
// VideoLayer আর MomentOverlay — দুটোই এটা ব্যবহার করে, যাতে দুই জায়গায় টাইমিং আলাদা না হয়ে যায়।
export const getActiveMoment = (seconds: number): Moment | undefined =>
  MOMENTS.find((m) => seconds >= m.startSeconds && seconds < m.startSeconds + m.durationSeconds);
