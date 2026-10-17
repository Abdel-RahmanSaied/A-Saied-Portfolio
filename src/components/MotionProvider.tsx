"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" makes every framer-motion animation honour the
// visitor's prefers-reduced-motion setting (transforms are skipped).
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
