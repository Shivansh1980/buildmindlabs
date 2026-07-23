import {
  motion,
  type MotionValue,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Database,
  FileText,
  Globe2,
  Search,
  ShieldCheck,
} from "lucide-react";
import { SiteData } from "../types";

type Project = SiteData["projects"]["items"][number];

type ConceptVisualProps = {
  project: Project;
  progress: MotionValue<number>;
  motionEnabled: boolean;
  disclosureLabel: string;
};

function VisualBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-divider) 1px, transparent 1px), linear-gradient(to bottom, var(--color-divider) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 88%)",
        }}
      />
      <div className="absolute -left-16 top-10 size-52 rounded-full bg-[var(--color-accent-secondary)] opacity-20 blur-3xl" />
      <div className="absolute -right-12 bottom-8 size-48 rounded-full bg-[var(--color-accent-tertiary)] opacity-20 blur-3xl" />
    </>
  );
}

function ConceptDisclosure({ label }: { label: string }) {
  return (
    <span className="absolute left-4 top-4 z-20 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)] shadow-[0_12px_32px_-28px_var(--color-shadow)] sm:left-6 sm:top-6">
      {label}
    </span>
  );
}

function WebsiteConceptVisual({
  project,
  progress,
  motionEnabled,
  disclosureLabel,
}: ConceptVisualProps) {
  const sourceX = useTransform(progress, [0.08, 0.27], [-18, 0]);
  const sourceOpacity = useTransform(progress, [0.05, 0.2], [0.72, 1]);
  const pageY = useTransform(progress, [0.14, 0.38], [10, 0]);
  const journeyScale = useTransform(progress, [0.28, 0.62], [0, 1]);
  const resultX = useTransform(progress, [0.52, 0.76], [18, 0]);
  const resultOpacity = useTransform(progress, [0.48, 0.7], [0.74, 1]);
  const visual = project.visual;

  return (
    <div className="relative flex h-full min-h-[26rem] items-center justify-center p-4 pt-16 sm:p-7 sm:pt-16 lg:min-h-[36rem]">
      <VisualBackdrop />
      <ConceptDisclosure label={disclosureLabel} />

      <div className="relative w-full max-w-xl">
        <motion.div
          style={
            motionEnabled
              ? { x: sourceX, opacity: sourceOpacity }
              : undefined
          }
          className="mb-3 flex flex-wrap items-center gap-2"
        >
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.13em] text-[var(--color-text-subtle)]">
            Intent arrives from
          </span>
          {visual.inputs.map((input) => (
            <span
              key={input}
              className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-2.5 py-1.5 text-[0.65rem] font-semibold text-[var(--color-text-muted)]"
            >
              {input}
            </span>
          ))}
          <ArrowRight className="size-3.5 text-[var(--color-accent)]" />
        </motion.div>

        <motion.div
          style={motionEnabled ? { y: pageY } : undefined}
          className="overflow-hidden rounded-[1.55rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] shadow-[0_32px_80px_-50px_var(--color-shadow)]"
        >
          <div className="flex items-center gap-2 border-b border-[var(--color-card-border)] px-4 py-3">
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="size-2 rounded-full bg-[var(--color-divider)]"
              />
            ))}
            <span className="ml-auto flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
              <Globe2 className="size-3.5 text-[var(--color-accent)]" />
              {visual.status}
            </span>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-[1.08fr_0.92fr] sm:p-5">
            <div className="rounded-2xl bg-[var(--color-bg-card)] p-4">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {visual.eyebrow}
              </p>
              <p className="mt-3 max-w-xs text-xl font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-text-main)] sm:text-2xl">
                {visual.title}
              </p>
              <p className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]">
                A focused offer, relevant proof, and a scoped route to the next conversation.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3 py-2 text-[0.65rem] font-bold text-[var(--color-on-accent)]">
                Start a scoped brief
                <ArrowRight className="size-3" />
              </span>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Clear offer", "Relevant proof", "Focused CTA"].map((proof) => (
                  <span
                    key={proof}
                    className="rounded-full bg-[var(--color-bg-soft)] px-2 py-1 text-[0.58rem] font-semibold text-[var(--color-text-subtle)]"
                  >
                    {proof}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-3">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
                Buyer journey
              </p>
              <div className="relative mt-3">
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-[0.82rem] top-3 w-px bg-[var(--color-card-border)]"
                />
                <motion.span
                  aria-hidden="true"
                  style={
                    motionEnabled
                      ? {
                          scaleY: journeyScale,
                          transformOrigin: "top center",
                        }
                      : undefined
                  }
                  className="absolute bottom-3 left-[0.82rem] top-3 w-px bg-[var(--color-accent)]"
                />
                <ol className="relative grid gap-2.5">
                  {visual.stages.map((stage, index) => (
                    <li
                      key={stage}
                      className="relative flex items-center gap-3 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-3 py-2.5"
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] font-display text-[0.62rem] font-bold text-[var(--color-accent)]">
                        {index + 1}
                      </span>
                      <span className="text-[0.68rem] font-semibold text-[var(--color-text-main)]">
                        {stage}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={
            motionEnabled
              ? { x: resultX, opacity: resultOpacity }
              : undefined
          }
          className="relative -mt-3 ml-auto mr-3 flex w-[min(18rem,88%)] items-center gap-3 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-bg-card)] p-3 shadow-[0_20px_50px_-34px_var(--color-shadow)]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Check className="size-4" />
          </span>
          <span>
            <span className="block text-xs font-bold text-[var(--color-text-main)]">
              {visual.resultTitle}
            </span>
            <span className="mt-0.5 block text-[0.65rem] leading-4 text-[var(--color-text-muted)]">
              {visual.result}
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function CopilotConceptVisual({
  project,
  progress,
  motionEnabled,
  disclosureLabel,
}: ConceptVisualProps) {
  const sourcesY = useTransform(progress, [0.06, 0.27], [12, 0]);
  const sourcesOpacity = useTransform(progress, [0.04, 0.2], [0.72, 1]);
  const pipelineScale = useTransform(progress, [0.24, 0.56], [0, 1]);
  const answerY = useTransform(progress, [0.36, 0.64], [12, 0]);
  const answerOpacity = useTransform(progress, [0.32, 0.54], [0.74, 1]);
  const reviewX = useTransform(progress, [0.58, 0.8], [16, 0]);
  const reviewOpacity = useTransform(progress, [0.54, 0.74], [0.74, 1]);
  const visual = project.visual;

  return (
    <div className="relative flex h-full min-h-[26rem] items-center justify-center p-4 pt-16 sm:p-7 sm:pt-16 lg:min-h-[36rem]">
      <VisualBackdrop />
      <ConceptDisclosure label={disclosureLabel} />

      <div className="relative w-full max-w-xl rounded-[1.55rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_32px_80px_-50px_var(--color-shadow)] sm:p-5">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--color-divider)] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent)] text-[var(--color-on-accent)]">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {visual.eyebrow}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-text-main)]">
                {visual.title}
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)] sm:flex">
            <ShieldCheck className="size-3.5" />
            Guardrails on
          </span>
        </div>

        <motion.div
          style={
            motionEnabled
              ? { y: sourcesY, opacity: sourcesOpacity }
              : undefined
          }
          className="mt-4"
        >
          <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
            Approved sources
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {visual.inputs.map((input, index) => (
              <div
                key={input}
                className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-2.5"
              >
                {index === 0 ? (
                  <ShieldCheck className="size-3.5 text-[var(--color-accent)]" />
                ) : (
                  <FileText className="size-3.5 text-[var(--color-accent)]" />
                )}
                <p className="mt-2 truncate text-[0.62rem] font-semibold text-[var(--color-text-main)]">
                  {input}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative my-4">
          <span className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-[var(--color-card-border)]" />
          <motion.span
            style={
              motionEnabled
                ? {
                    scaleX: pipelineScale,
                    transformOrigin: "left center",
                  }
                : undefined
            }
            className="absolute left-3 right-3 top-1/2 h-px -translate-y-1/2 bg-[var(--color-accent)]"
          />
          <div className="relative grid grid-cols-3 gap-2">
            {visual.stages.map((stage, index) => (
              <span
                key={stage}
                className="mx-auto flex items-center gap-1.5 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] px-2.5 py-1.5 text-[0.58rem] font-bold text-[var(--color-text-main)]"
              >
                {index === 0 ? (
                  <Search className="size-3 text-[var(--color-accent)]" />
                ) : (
                  <Check className="size-3 text-[var(--color-accent)]" />
                )}
                {stage}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          style={
            motionEnabled
              ? { y: answerY, opacity: answerOpacity }
              : undefined
          }
          className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-[var(--color-text-main)]">
              Draft answer
            </p>
            <span className="rounded-full bg-[var(--color-accent-soft)] px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[var(--color-accent)]">
              Sources attached
            </span>
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--color-text-muted)]">
            A useful response assembled from the approved context, with its evidence visible and uncertainty preserved.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {visual.inputs.slice(0, 2).map((source, index) => (
              <span
                key={source}
                className="rounded-lg bg-[var(--color-bg-soft)] px-2 py-1.5 text-[0.58rem] font-semibold text-[var(--color-text-subtle)]"
              >
                [{index + 1}] {source}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={
            motionEnabled
              ? { x: reviewX, opacity: reviewOpacity }
              : undefined
          }
          className="relative -mb-7 -mr-2 ml-auto mt-3 flex w-[min(19rem,92%)] items-center gap-3 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-bg-card)] p-3 shadow-[0_20px_50px_-34px_var(--color-shadow)]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <ShieldCheck className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-[var(--color-text-main)]">
              {visual.resultTitle}
            </span>
            <span className="mt-0.5 block text-[0.64rem] leading-4 text-[var(--color-text-muted)]">
              {visual.result}
            </span>
          </span>
          <span className="rounded-full bg-[var(--color-bg-soft)] px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
            {visual.status}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function AnalyticsConceptVisual({
  project,
  progress,
  motionEnabled,
  disclosureLabel,
}: ConceptVisualProps) {
  const sourcesX = useTransform(progress, [0.06, 0.26], [-16, 0]);
  const sourcesOpacity = useTransform(progress, [0.04, 0.2], [0.72, 1]);
  const chartPath = useTransform(progress, [0.22, 0.58], [0, 1]);
  const insightY = useTransform(progress, [0.48, 0.7], [12, 0]);
  const insightOpacity = useTransform(progress, [0.44, 0.64], [0.74, 1]);
  const decisionX = useTransform(progress, [0.62, 0.82], [16, 0]);
  const decisionOpacity = useTransform(progress, [0.58, 0.78], [0.74, 1]);
  const visual = project.visual;

  return (
    <div className="relative flex h-full min-h-[26rem] items-center justify-center p-4 pt-16 sm:p-7 sm:pt-16 lg:min-h-[36rem]">
      <VisualBackdrop />
      <ConceptDisclosure label={disclosureLabel} />

      <div className="relative w-full max-w-xl rounded-[1.55rem] border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-4 shadow-[0_32px_80px_-50px_var(--color-shadow)] sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
              <BarChart3 className="size-5" />
            </span>
            <div>
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {visual.eyebrow}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-text-main)]">
                {visual.title}
              </p>
            </div>
          </div>
          <span className="hidden items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-2.5 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[var(--color-text-subtle)] sm:flex">
            <Database className="size-3.5 text-[var(--color-accent)]" />
            {visual.status}
          </span>
        </div>

        <motion.div
          style={
            motionEnabled
              ? { x: sourcesX, opacity: sourcesOpacity }
              : undefined
          }
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
            Joined signals
          </span>
          {visual.inputs.map((input) => (
            <span
              key={input}
              className="rounded-full bg-[var(--color-bg-soft)] px-2.5 py-1.5 text-[0.62rem] font-semibold text-[var(--color-text-muted)]"
            >
              {input}
            </span>
          ))}
        </motion.div>

        <div className="mt-3 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-card)] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
              Actual + forecast context
            </p>
            <span className="hidden items-center gap-1.5 text-[0.56rem] font-semibold text-[var(--color-text-subtle)] sm:flex">
              <span className="h-px w-4 bg-[var(--color-text-main)]" />
              actual
              <span className="ml-1 h-px w-4 border-t border-dashed border-[var(--color-accent)]" />
              forecast
            </span>
          </div>
          <svg
            viewBox="0 0 420 150"
            className="mt-2 h-36 w-full overflow-visible"
            role="presentation"
          >
            {[30, 72, 114].map((y) => (
              <line
                key={y}
                x1="8"
                x2="412"
                y1={y}
                y2={y}
                stroke="var(--color-divider)"
                strokeWidth="1"
              />
            ))}
            <path
              d="M230 62 C275 47 322 57 405 29 L405 64 C332 87 278 75 230 91 Z"
              fill="var(--color-accent-soft)"
            />
            <rect
              x="307"
              y="17"
              width="52"
              height="112"
              rx="10"
              fill="var(--color-accent-tertiary)"
              opacity="0.15"
            />
            <motion.path
              d="M12 116 C52 111 76 96 110 101 C151 107 169 75 209 81 C219 82 225 80 236 74"
              fill="none"
              stroke="var(--color-text-main)"
              strokeLinecap="round"
              strokeWidth="3"
              style={motionEnabled ? { pathLength: chartPath } : undefined}
            />
            <motion.path
              d="M236 74 C276 55 306 72 333 47 C360 25 382 39 406 29"
              fill="none"
              stroke="var(--color-accent)"
              strokeDasharray="7 7"
              strokeLinecap="round"
              strokeWidth="3"
              style={motionEnabled ? { pathLength: chartPath } : undefined}
            />
            <circle cx="333" cy="47" r="5" fill="var(--color-accent)" />
          </svg>
        </div>

        <motion.div
          style={
            motionEnabled
              ? { y: insightY, opacity: insightOpacity }
              : undefined
          }
          className="mt-3 grid grid-cols-2 gap-2"
        >
          {visual.stages.slice(1).map((stage, index) => (
            <div
              key={stage}
              className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-3"
            >
              <p className="text-[0.56rem] font-bold uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">
                {index === 0 ? "Forecast context" : "Driver"}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-[var(--color-text-main)]">
                {stage}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          style={
            motionEnabled
              ? { x: decisionX, opacity: decisionOpacity }
              : undefined
          }
          className="relative -mb-7 -mr-2 ml-auto mt-3 flex w-[min(19rem,92%)] items-center gap-3 rounded-2xl border border-[var(--color-accent)] bg-[var(--color-bg-card)] p-3 shadow-[0_20px_50px_-34px_var(--color-shadow)]"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-on-accent)]">
            <ArrowRight className="size-4" />
          </span>
          <span>
            <span className="block text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              {visual.resultTitle}
            </span>
            <span className="mt-0.5 block text-xs font-bold text-[var(--color-text-main)]">
              {visual.result}
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectConceptVisual(props: ConceptVisualProps) {
  if (props.project.variant === "copilot") {
    return <CopilotConceptVisual {...props} />;
  }

  if (props.project.variant === "analytics") {
    return <AnalyticsConceptVisual {...props} />;
  }

  return <WebsiteConceptVisual {...props} />;
}
