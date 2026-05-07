"use client";

import { useRef } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
  glowOpacity?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowSize = 300,
  glowOpacity = 0.055,
}: GlowCardProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.opacity = "1";
    glowRef.current.style.background = `radial-gradient(${glowSize}px at ${x}px ${y}px, rgba(255,255,255,${glowOpacity}), transparent 80%)`;
  };

  const onLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  };

  return (
    <div className={`relative ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none"
        style={{ borderRadius: "inherit" }}
      />
      {children}
    </div>
  );
}
