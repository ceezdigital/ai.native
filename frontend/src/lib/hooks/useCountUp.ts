"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, isActive: boolean, durationMs = 1400): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isActive, target, durationMs]);

  return value;
}
