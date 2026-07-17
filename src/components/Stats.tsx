import type { ElementType } from "react";
import { motion } from "motion/react";
import { GitBranch, LifeBuoy, Map, PlayCircle } from "lucide-react";
import { SiteData } from "../types";

const iconMap: Record<string, ElementType> = {
  Map,
  PlayCircle,
  GitBranch,
  LifeBuoy,
};

export default function Stats({ data }: { data: SiteData }) {
  return (
    <section
      aria-label={data.whyChooseUs.eyebrow}
      className="border-y border-[var(--color-card-border)] bg-[var(--color-bg-card)]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {data.stats.map((stat, index) => {
          const Icon = iconMap[stat.icon] ?? Map;

          return (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="flex min-h-32 items-start gap-3 border-[var(--color-card-border)] py-7 pr-3 even:border-l even:pl-4 lg:min-h-36 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-bg-soft)] text-[var(--color-accent)]">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-[-0.02em] text-[var(--color-text-main)] sm:text-base">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs leading-5 text-[var(--color-text-muted)] sm:text-sm">
                  {stat.label}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
