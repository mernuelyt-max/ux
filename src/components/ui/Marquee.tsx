import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates its children so the loop is seamless,
 * and pauses on hover. Pure CSS animation (see tailwind `animate-marquee`).
 */
export function Marquee({
  children,
  className,
  slow = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none",
            slow ? "animate-marquee-slow" : "animate-marquee"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
