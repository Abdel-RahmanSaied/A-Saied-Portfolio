"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorFollower() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Inner dot — snappy
  const dotX = useSpring(mx, { stiffness: 700, damping: 38 });
  const dotY = useSpring(my, { stiffness: 700, damping: 38 });

  // Outer ring — lags behind
  const ringX = useSpring(mx, { stiffness: 110, damping: 16 });
  const ringY = useSpring(my, { stiffness: 110, damping: 16 });

  useEffect(() => {
    const fn = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-white pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", opacity: 0.75 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-white/20 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
