import { useRef, type ElementType } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { GitBranch, LifeBuoy, Map, PlayCircle } from "lucide-react";
import { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

const iconMap: Record<string, ElementType> = {
  Map,
  PlayCircle,
  GitBranch,
  LifeBuoy,
};

function StatItem({
  stat,
  index,
  progress,
  motionEnabled,
}: {
  key?: string;
  stat: SiteData["stats"][number];
  index: number;
  progress: MotionValue<number>;
  motionEnabled: boolean;
}) {
  const Icon = iconMap[stat.icon] ?? Map;
  const start = 0.04 + index * 0.09;
  const end = start + 0.24;
  const opacity = useSpring(useTransform(progress, [start, end], [0, 1]), sceneSpring);
  const y = useSpring(useTransform(progress, [start, end], [24, 0]), sceneSpring);

  return (
    <motion.div
      style={{
        opacity: motionEnabled ? opacity : 1,
        y: motionEnabled ? y : 0,
      }}
      className="flex min-h-28 items-start gap-3 border-[var(--color-on-contrast)]/15 py-6 pr-3 even:border-l even:pl-4 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-on-contrast)]/15 bg-[var(--color-on-contrast)]/10 text-[var(--color-on-contrast)]">
        <Icon className="size-[18px]" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-semibold tracking-[-0.02em] text-[var(--color-on-contrast)] sm:text-base">
          {stat.value}
        </span>
        <span className="mt-1 block text-xs leading-5 text-[var(--color-on-contrast)]/65 sm:text-sm">
          {stat.label}
        </span>
      </span>
    </motion.div>
  );
}

export default function Stats({ data }: { data: SiteData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { motionEnabled } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "end 28%"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.35,
  });

  return (
    <section
      ref={sectionRef}
      aria-label={data.whyChooseUs.eyebrow}
      className="relative overflow-hidden bg-[var(--color-contrast-bg)] text-[var(--color-on-contrast)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--color-on-contrast)] opacity-15" aria-hidden="true">
        <motion.span
          style={{ scaleX: motionEnabled ? progressScale : 1, transformOrigin: "0% 50%" }}
          className="block h-full w-full bg-[var(--color-on-contrast)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-2/3 -translate-x-1/2 bg-[var(--color-accent)] opacity-[0.08] blur-[100px]"
      />
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {data.stats.map((stat, index) => (
          <StatItem
            key={stat.value}
            stat={stat}
            index={index}
            progress={scrollYProgress}
            motionEnabled={motionEnabled}
          />
        ))}
      </div>
    </section>
  );
}
