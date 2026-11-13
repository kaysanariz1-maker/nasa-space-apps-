"use client";

import { useEffect, useRef, type ReactNode } from "react";

const STAGGER = [0.28, 0.14, 0, 0.14, 0.28];

export default function PillarTransition({
  children,
  from,
  to,
}: {
  children: ReactNode;
  from: string;
  to: string;
}) {
  const outgoing = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pillars = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = outgoing.current;
    const range = track.current;
    const surface = pillars.current;
    if (!section || !range || !surface) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = range.offsetHeight;
      if (!travel) return;
      const viewport = document.documentElement.clientHeight;
      const progress = Math.max(0, Math.min(1, (viewport - range.getBoundingClientRect().top) / travel));
      STAGGER.forEach((delay, index) => {
        const phase = Math.max(0, (progress - delay) / (1 - delay));
        const eased = phase * phase * (3 - 2 * phase);
        const height = Math.max((progress * travel - (travel - viewport * 0.5)) / viewport, eased);
        surface.style.setProperty(`--pillar-${index}`, `${height * 100}%`);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      section.style.top = `min(0px, calc(100dvh - ${section.offsetHeight}px))`;
      schedule();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="relative -mb-[50dvh] motion-reduce:mb-0">
      <div ref={outgoing} className="sticky min-h-[100dvh] motion-reduce:static motion-reduce:min-h-0" style={{ backgroundColor: from }}>
        {children}
      </div>
      <div ref={track} className="relative h-[90dvh] motion-reduce:hidden" aria-hidden="true">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[190dvh]">
          <div ref={pillars} className="sticky top-0 flex h-[100dvh] items-end">
            {STAGGER.map((_, index) => (
              <div key={index} className="min-w-0 flex-1" style={{ height: `var(--pillar-${index}, 0%)`, backgroundColor: to }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
