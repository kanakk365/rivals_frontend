"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
      const x = e.clientX - left;
      const y = e.clientY - top;
      mouseX.current = x / width;
      mouseY.current = y / height;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const particles = Array.from({ length: 20 }).map((_, i) => {
    const angle = (i * 36) % 360;
    const distance = 30 + (i % 5) * 10;
    return {
      x: 50 + Math.cos((angle * Math.PI) / 180) * distance,
      y: 50 + Math.sin((angle * Math.PI) / 180) * distance,
      opacity: 0.3 + (i % 10) * 0.05,
      scale: 0.5 + (i % 3) * 0.2,
      duration: 5 + (i % 4),
    };
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-[40rem] flex-col items-center justify-center overflow-hidden bg-black w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.1) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.1) 0%, transparent 60%)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
          }}
          style={{
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-50"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.3) 0%, transparent 40%)",
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.4) 0%, transparent 40%)",
              "radial-gradient(circle at 50% 50%, rgba(148, 76, 255, 0.3) 0%, transparent 40%)",
            ],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "120% 120%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="absolute inset-auto h-[40rem] w-[40rem] rounded-full bg-purple-500 opacity-20 blur-[100px]" />
        <div className="absolute inset-auto h-[30rem] w-[30rem] rounded-full bg-blue-500 opacity-20 blur-[100px] animate-pulse" />

          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: `${particle.x}%`,
                  y: `${particle.y}%`,
                  opacity: particle.opacity,
                  scale: particle.scale,
                }}
                animate={{
                  y: `${particle.y - 10}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>
      </div>
      <div className="relative z-10 flex flex-col items-center px-4 pb-20">{children}</div>
    </div>
  );
}