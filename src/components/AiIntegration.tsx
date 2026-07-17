import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { CheckCircle2, Workflow } from "lucide-react";
import { SiteData } from "../types";
import {
  sceneSpring,
  useDesktopMotion,
} from "./motion/useDesktopMotion";

export default function AiIntegration({ data }: { data: SiteData }) {
  const { aiIntegrations } = data;
  const { motionEnabled } = useDesktopMotion();
  const diagramSceneRef = useRef<HTMLDivElement>(null);
  const splitAt = Math.ceil(aiIntegrations.platforms.length / 2);
  const leftPlatforms = aiIntegrations.platforms.slice(0, splitAt);
  const rightPlatforms = aiIntegrations.platforms.slice(splitAt);

  const { scrollYProgress } = useScroll({
    target: diagramSceneRef,
    offset: ["start 78%", "end 28%"],
  });
  const sceneProgress = useSpring(scrollYProgress, sceneSpring);
  const leftGroupX = useTransform(sceneProgress, [0.08, 0.48, 0.9], [-22, 8, 2]);
  const rightGroupX = useTransform(sceneProgress, [0.08, 0.48, 0.9], [22, -8, -2]);
  const groupOpacity = useTransform(sceneProgress, [0.04, 0.24, 0.9], [0.58, 1, 1]);
  const connectorReveal = useTransform(sceneProgress, [0.18, 0.5], [0, 1]);
  const connectorOpacity = useTransform(sceneProgress, [0.14, 0.32], [0.15, 1]);
  const hubScale = useTransform(
    sceneProgress,
    [0.08, 0.42, 0.7, 0.94],
    [0.94, 1.025, 0.995, 1],
  );
  const ringRotate = useTransform(sceneProgress, [0.12, 0.88], [-3, 4]);
  const glowScale = useTransform(sceneProgress, [0.04, 0.5, 0.94], [0.78, 1.18, 1]);
  const glowOpacity = useTransform(sceneProgress, [0.04, 0.42, 0.9], [0.18, 0.58, 0.42]);
  const panelScale = useTransform(sceneProgress, [0, 0.24, 0.88, 1], [0.985, 1, 1, 0.99]);

  const platformGroup = (platforms: string[], side: "left" | "right") => (
    <motion.ul
      style={
        motionEnabled
          ? {
              x: side === "left" ? leftGroupX : rightGroupX,
              opacity: groupOpacity,
            }
          : undefined
      }
      className="grid gap-3 sm:grid-cols-3 md:grid-cols-1 md:gap-4"
    >
      {platforms.map((platform) => (
        <li
          key={platform}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-2.5 text-center text-sm font-semibold text-[var(--color-text-main)] shadow-[0_12px_30px_-24px_var(--color-shadow)]"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_var(--color-bg-soft)]"
          />
          {platform}
        </li>
      ))}
    </motion.ul>
  );

  return (
    <section
      aria-labelledby="ai-integration-title"
      className="bg-[var(--color-bg-base)] py-20 transition-colors duration-300 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 16 }}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {aiIntegrations.eyebrow}
          </p>
          <h2
            id="ai-integration-title"
            className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl md:text-5xl"
          >
            {aiIntegrations.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[var(--color-text-muted)] md:text-lg">
            {aiIntegrations.subtitle}
          </p>
        </motion.div>

        <div
          ref={diagramSceneRef}
          className="ai-motion-scene relative"
        >
          <motion.div
            style={motionEnabled ? { scale: panelScale } : undefined}
            className="ai-motion-panel relative overflow-hidden rounded-[2rem] border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] px-4 py-8 shadow-[0_24px_70px_-48px_var(--color-shadow)] sm:px-6 md:px-8 md:py-10"
          >
            <motion.div
              aria-hidden="true"
              style={
                motionEnabled
                  ? { scale: glowScale, opacity: glowOpacity }
                  : undefined
              }
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-glow)] opacity-50 blur-[80px]"
            />

            <div className="relative grid w-full gap-0 md:grid-cols-[minmax(0,1fr)_4.5rem_auto_4.5rem_minmax(0,1fr)] md:items-center">
              {platformGroup(leftPlatforms, "left")}

              <div aria-hidden="true" className="relative mx-auto h-8 w-8 md:h-48 md:w-full">
                <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-divider)] md:hidden" />
                <motion.span
                  style={
                    motionEnabled
                      ? {
                          scaleY: connectorReveal,
                          opacity: connectorOpacity,
                          transformOrigin: "center center",
                        }
                      : undefined
                  }
                  className="absolute left-0 top-[13%] hidden h-[74%] w-px bg-[var(--color-divider)] md:block"
                />
                <motion.span
                  style={
                    motionEnabled
                      ? {
                          scaleX: connectorReveal,
                          opacity: connectorOpacity,
                          transformOrigin: "right center",
                        }
                      : undefined
                  }
                  className="absolute left-0 top-1/2 hidden h-px w-full bg-[var(--color-divider)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute right-0 top-1/2 hidden h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-[var(--color-accent)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -left-1 top-[13%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -left-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -left-1 top-[87%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
              </div>

              <motion.div
                style={motionEnabled ? { scale: hubScale } : undefined}
                className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_22px_50px_-32px_var(--color-shadow)] sm:h-40 sm:w-40"
              >
                <motion.span
                  aria-hidden="true"
                  style={motionEnabled ? { rotate: ringRotate } : undefined}
                  className="absolute inset-3 rounded-full border border-[var(--color-divider)]"
                />
                <span className="relative flex flex-col items-center gap-2.5 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_12px_28px_-16px_var(--color-shadow)]">
                    <Workflow aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="max-w-24 text-sm font-semibold leading-5 text-[var(--color-text-main)]">
                    {aiIntegrations.hubLabel}
                  </span>
                </span>
              </motion.div>

              <div aria-hidden="true" className="relative mx-auto h-8 w-8 md:h-48 md:w-full">
                <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-divider)] md:hidden" />
                <motion.span
                  style={
                    motionEnabled
                      ? {
                          scaleY: connectorReveal,
                          opacity: connectorOpacity,
                          transformOrigin: "center center",
                        }
                      : undefined
                  }
                  className="absolute right-0 top-[13%] hidden h-[74%] w-px bg-[var(--color-divider)] md:block"
                />
                <motion.span
                  style={
                    motionEnabled
                      ? {
                          scaleX: connectorReveal,
                          opacity: connectorOpacity,
                          transformOrigin: "left center",
                        }
                      : undefined
                  }
                  className="absolute left-0 top-1/2 hidden h-px w-full bg-[var(--color-divider)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute left-0 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -right-1 top-[13%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -right-1 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
                <motion.span
                  style={motionEnabled ? { opacity: connectorOpacity } : undefined}
                  className="absolute -right-1 top-[87%] hidden h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--color-accent)] bg-[var(--color-bg-soft)] md:block"
                />
              </div>

              {platformGroup(rightPlatforms, "right")}
            </div>
          </motion.div>
        </div>

        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
          {aiIntegrations.benefits.map((benefit, index) => (
            <motion.li
              key={benefit.title}
              initial={{ y: 12 }}
              whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-5 shadow-[0_16px_40px_-34px_var(--color-shadow)]"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mb-4 h-5 w-5 text-[var(--color-accent)]"
                strokeWidth={2}
              />
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--color-text-main)]">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {benefit.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
