import { useCallback, useEffect, useRef, useState } from "react";
import type { Attributes, ReactNode, RefObject } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FileText,
  Home,
  MessageCircle,
  MoreHorizontal,
  PackageOpen,
  PanelsTopLeft,
  Search,
  Settings,
  Share2,
  Star,
  X,
} from "lucide-react";
import { SiteData } from "../types";
import { sceneSpring, useDesktopMotion } from "./motion/useDesktopMotion";

type WorkItem = SiteData["work"]["items"][number];
type WorkLink = WorkItem["links"][number];
type NotesMedia = Extract<WorkItem["media"], { kind: "notes" }>;
type ProductSlide = { src: string; alt: string; label: string };
type WorkLinkButtonProps = Readonly<{ link: WorkLink }> & Attributes;
type WorkStoryProps = Readonly<{
  project: WorkItem;
  index: number;
  featured: boolean;
  data: SiteData;
  onOpenDetails: (projectId: string, trigger: HTMLButtonElement) => void;
}> & Attributes;

const linkIcons = {
  live: ExternalLink,
  npm: PackageOpen,
  source: Code2,
};

const notesNavigationIcons = [Home, Search, MessageCircle, Settings];

function WorkLinkButton({ link }: WorkLinkButtonProps) {
  const Icon = linkIcons[link.kind];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-base)] px-4 py-2.5 text-sm font-bold text-[var(--color-text-main)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      <Icon className="size-4" aria-hidden="true" />
      {link.label}
    </a>
  );
}

function NotesProductView({ media }: Readonly<{ media: NotesMedia }>) {
  return (
    <div className="absolute inset-0 bg-[#191919] text-[#e7e5e4]">
      <div className="grid size-full grid-cols-[minmax(7rem,27%)_1fr] text-[0.48rem] sm:grid-cols-[minmax(10rem,27%)_1fr] sm:text-[0.62rem]">
        <aside className="flex min-w-0 flex-col border-r border-white/8 bg-[#202020] p-2 sm:p-3">
          <div className="flex items-center gap-2 rounded-md px-1.5 py-2">
            <span className="flex size-5 shrink-0 items-center justify-center rounded bg-[#d8b4fe] font-bold text-[#2a1836] sm:size-7">
              B
            </span>
            <div className="min-w-0">
              <p className="font-bold leading-3 text-white">{media.workspaceName}</p>
              <p className="hidden text-white/45 sm:block">{media.workspaceType}</p>
            </div>
          </div>
          <nav className="mt-2 space-y-0.5" aria-label={media.navigationLabel}>
            {media.navigationItems.map((item, itemIndex) => {
              const Icon = notesNavigationIcons[itemIndex] ?? FileText;
              return (
                <span key={item} className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/64 first:bg-white/6 first:text-white">
                  <Icon className="size-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item}</span>
                </span>
              );
            })}
          </nav>
          <p className="mt-4 px-2 text-[0.42rem] font-bold uppercase tracking-[0.14em] text-white/35 sm:text-[0.52rem]">
            {media.pagesLabel}
          </p>
          <div className="mt-1 flex items-center gap-2 rounded-md bg-white/6 px-2 py-1.5 text-white">
            <FileText className="size-3 shrink-0 text-[#d8b4fe]" aria-hidden="true" />
            <span className="min-w-0 leading-3">{media.pageTitle}</span>
          </div>
        </aside>

        <div className="min-w-0 bg-[#191919]">
          <header className="flex h-9 min-w-0 items-center gap-2 border-b border-white/8 px-3 sm:h-12 sm:px-4">
            <span className="min-w-0 flex-1 truncate text-white/72">{media.pageTitle}</span>
            <span className="hidden text-white/35 sm:block">{media.editedLabel}</span>
            <span className="flex shrink-0 items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-white/75">
              <Share2 className="size-2.5" aria-hidden="true" />
              <span className="hidden sm:inline">{media.shareLabel}</span>
            </span>
            <Star className="hidden size-3 text-white/45 sm:block" aria-hidden="true" />
            <MoreHorizontal className="size-3 text-white/45" aria-hidden="true" />
          </header>

          <div className="mx-auto w-full max-w-xl px-5 pb-8 pt-[12%] sm:px-10">
            <div className="flex items-end gap-2">
              <FileText className="size-5 shrink-0 text-[#d8b4fe] sm:size-7" aria-hidden="true" />
              <h4 className="min-w-0 truncate font-display text-sm font-semibold text-white sm:text-2xl">
                {media.pageTitle}
              </h4>
            </div>
            <p className="mt-4 max-w-md text-[0.5rem] leading-4 text-white/62 sm:text-xs sm:leading-5">
              {media.intro}
            </p>
            <h5 className="mt-5 font-display text-[0.65rem] font-semibold text-white sm:text-base">
              {media.heading}
            </h5>
            <div className="mt-3 flex items-start gap-2 text-[0.5rem] leading-4 text-white/70 sm:text-xs sm:leading-5">
              <span className="mt-0.5 size-2.5 shrink-0 rounded-[0.18rem] border border-white/35 sm:size-3.5" aria-hidden="true" />
              <span>{media.task}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSlidePresentation(offset: number, motionEnabled: boolean) {
  if (offset === 0) {
    return {
      x: "0%",
      z: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      filter: "brightness(1)",
      zIndex: 30,
      pointerEvents: "auto" as const,
      tabIndex: 0,
    };
  }

  if (motionEnabled && Math.abs(offset) <= 1) {
    return {
      x: `${offset * 48}%`,
      z: -190,
      rotateY: offset < 0 ? 16 : -16,
      scale: 0.86,
      opacity: 0.68,
      filter: "brightness(0.82)",
      zIndex: 9,
      pointerEvents: "auto" as const,
      tabIndex: 0,
    };
  }

  return {
    x: "0%",
    z: 0,
    rotateY: 0,
    scale: 1,
    opacity: 0,
    filter: "brightness(0.6)",
    zIndex: 0,
    pointerEvents: "none" as const,
    tabIndex: -1,
  };
}

function GallerySlide({
  slide,
  offset,
  galleryLabel,
  motionEnabled,
  prefersReducedMotion,
  onSelect,
  onNavigate,
  children,
}: Readonly<{
  slide: ProductSlide;
  offset: number;
  galleryLabel: string;
  motionEnabled: boolean;
  prefersReducedMotion: boolean;
  onSelect: () => void;
  onNavigate: (direction: -1 | 1) => void;
  children: ReactNode;
}> & Attributes) {
  const isActive = offset === 0;
  const presentation = getSlidePresentation(offset, motionEnabled);

  return (
    <motion.button
      type="button"
      initial={false}
      animate={{
        x: presentation.x,
        z: presentation.z,
        rotateY: presentation.rotateY,
        scale: presentation.scale,
        opacity: presentation.opacity,
        filter: presentation.filter,
      }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 145, damping: 24, mass: 0.65 }}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onNavigate(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(1);
        }
      }}
      aria-label={`${galleryLabel}: ${slide.label}`}
      aria-current={isActive ? "true" : undefined}
      tabIndex={presentation.tabIndex}
      className="absolute inset-x-[14%] inset-y-[15%] overflow-hidden rounded-xl border border-white/20 bg-[#11151a] shadow-[0_28px_70px_-28px_rgba(0,0,0,0.9)] [backface-visibility:hidden] [transform-style:preserve-3d] sm:rounded-2xl"
      style={{ zIndex: presentation.zIndex, pointerEvents: presentation.pointerEvents }}
    >
      {children}
      <span
        className={`absolute bottom-3 z-10 max-w-[70%] truncate rounded-full border border-white/12 bg-black/70 px-3 py-1.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white/82 backdrop-blur-md sm:bottom-4 sm:text-[0.65rem] ${offset > 0 ? "right-3 sm:right-4" : "left-3 sm:left-4"}`}
      >
        {slide.label}
      </span>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
      {!isActive && <span aria-hidden="true" className="absolute inset-0 bg-black/25" />}
    </motion.button>
  );
}

function WorkMedia({
  project,
  galleryLabel,
  prefersReducedMotion,
}: Readonly<{
  project: WorkItem;
  galleryLabel: string;
  prefersReducedMotion: boolean;
}>) {
  const [activeImage, setActiveImage] = useState(0);
  const { motionEnabled: galleryMotionEnabled } = useDesktopMotion(768);
  const media = project.media;
  const slides = media.kind === "gallery"
    ? media.images
    : [{ src: "notes-product-view", alt: project.summary, label: media.label }];
  const activeSlide = slides[activeImage] ?? slides[0];
  const hasMultipleSlides = slides.length > 1;

  const selectRelativeSlide = (direction: -1 | 1) => {
    setActiveImage((current) => (current + direction + slides.length) % slides.length);
  };

  const relativeOffset = (index: number) => {
    let offset = index - activeImage;
    if (offset > slides.length / 2) offset -= slides.length;
    if (offset < -slides.length / 2) offset += slides.length;
    return offset;
  };

  return (
    <figure
      className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#101317] text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.85)] sm:rounded-[2rem]"
      aria-label={`${galleryLabel}: ${project.title}`}
      aria-roledescription="carousel"
    >
      <div className="flex min-h-12 items-center gap-3 border-b border-white/10 bg-[#181c21] px-4 sm:px-5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ff6b5f]" />
          <span className="size-2 rounded-full bg-[#f5be4f]" />
          <span className="size-2 rounded-full bg-[#55c875]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md border border-white/10 bg-black/20 px-3 py-1 text-[0.62rem] text-white/55 sm:text-xs">
          {project.frameLabel}
        </span>
        <span className="hidden rounded-full border border-white/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white/60 sm:block">
          {project.status}
        </span>
      </div>

      <div
        className="relative aspect-[16/10] overflow-hidden bg-[#090b0e] [perspective:1500px]"
        aria-live="polite"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(70,106,168,0.22),transparent_58%)]" />
        {slides.map((slide, index) => {
          const offset = relativeOffset(index);
          const isActive = offset === 0;

          return (
            <GallerySlide
              key={slide.src}
              slide={slide}
              offset={offset}
              galleryLabel={galleryLabel}
              motionEnabled={galleryMotionEnabled}
              prefersReducedMotion={prefersReducedMotion}
              onSelect={() => setActiveImage(index)}
              onNavigate={selectRelativeSlide}
            >
              {media.kind === "gallery" ? (
                <img
                  src={slide.src}
                  alt={isActive ? slide.alt : ""}
                  aria-hidden={!isActive}
                  className="size-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <NotesProductView media={media} />
              )}
            </GallerySlide>
          );
        })}
      </div>

      <figcaption className="flex min-h-14 items-center gap-3 border-t border-white/10 bg-[#181c21] px-4 py-2.5 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white/88">{activeSlide.label}</p>
          <p className="mt-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/38">
            {String(activeImage + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        </div>

        {hasMultipleSlides && (
          <>
            <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
              {slides.map((slide, index) => (
                <span
                  key={slide.src}
                  className={`h-1.5 rounded-full transition-all ${index === activeImage ? "w-7 bg-[var(--color-accent)]" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => selectRelativeSlide(-1)}
              aria-label={`Show previous ${galleryLabel.toLowerCase()}`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/78 transition hover:border-white/30 hover:bg-white/10"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => selectRelativeSlide(1)}
              aria-label={`Show next ${galleryLabel.toLowerCase()}`}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/78 transition hover:border-white/30 hover:bg-white/10"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </>
        )}
      </figcaption>
    </figure>
  );
}

function WorkStory({
  project,
  index,
  featured,
  data,
  onOpenDetails,
}: WorkStoryProps) {
  const headingId = `work-${project.id}-title`;
  const ProductIcon = project.kind === "package" ? PackageOpen : PanelsTopLeft;
  const previewLink = project.links[0];
  const visibleStack = project.stack.slice(0, 3);
  const remainingStackCount = project.stack.length - visibleStack.length;

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`group h-full list-none ${featured ? "lg:col-span-2" : ""}`}
    >
      <article
        aria-labelledby={headingId}
        style={{ backgroundColor: "var(--color-bg-card)" }}
        className={`relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[var(--color-card-border)] shadow-[0_28px_80px_-52px_var(--color-shadow)] transition-[border-color,box-shadow] duration-300 group-hover:border-[var(--color-accent)] group-hover:shadow-[0_34px_90px_-48px_var(--color-shadow)] sm:rounded-[2rem] ${featured ? "lg:grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:grid-rows-[auto_1fr]" : ""}`}
      >
        <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-70" />

        <header className={`p-5 pb-4 sm:p-7 sm:pb-5 ${featured ? "lg:col-start-1 lg:row-start-1 lg:p-8 lg:pb-5" : ""}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-accent-soft)] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--color-accent)]">
              <ProductIcon className="size-3.5 text-[var(--color-accent)]" aria-hidden="true" />
              {project.category}
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">
              {data.work.caseStudyLabel} 0{index + 1}
            </span>
          </div>

          <h3
            id={headingId}
            className="mt-5 font-display text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[var(--color-text-main)] sm:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[var(--color-text-muted)] sm:text-base sm:leading-7">
            {project.summary}
          </p>

          <dl className="mt-5 grid grid-cols-3 divide-x divide-[var(--color-divider)] border-y border-[var(--color-divider)] py-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="min-w-0 px-2 first:pl-0 last:pr-0 sm:px-4">
                <dt className="break-words text-[0.55rem] font-bold uppercase leading-4 tracking-[0.07em] text-[var(--color-text-subtle)] sm:text-[0.62rem] sm:tracking-[0.1em]">
                  {metric.label}
                </dt>
                <dd className="mt-1.5 break-words font-display text-lg font-semibold leading-6 text-[var(--color-text-main)] sm:text-xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className={`min-w-0 px-3 sm:px-4 ${featured ? "lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid lg:items-center lg:py-4 lg:pl-0 lg:pr-4" : ""}`}>
          <WorkMedia
            project={project}
            galleryLabel={data.work.galleryLabel}
            prefersReducedMotion={false}
          />
        </div>

        <footer className={`mt-auto p-5 sm:p-7 ${featured ? "lg:col-start-1 lg:row-start-2 lg:p-8 lg:pt-3" : ""}`}>
          <div className="flex flex-wrap gap-2">
            {visibleStack.map((technology) => (
              <span key={technology} className="rounded-full bg-[var(--color-bg-soft)] px-3 py-1.5 text-[0.68rem] font-semibold text-[var(--color-text-muted)]">
                {technology}
              </span>
            ))}
            {remainingStackCount > 0 && (
              <span className="rounded-full border border-[var(--color-card-border)] px-3 py-1.5 text-[0.68rem] font-semibold text-[var(--color-text-subtle)]">
                +{remainingStackCount}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {previewLink && (
              <WorkLinkButton link={previewLink} />
            )}
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => onOpenDetails(project.id, event.currentTarget)}
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-bold text-[var(--color-on-accent)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
            >
              {data.work.detailsLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </article>
    </motion.li>
  );
}

function WorkDetailDialog({
  project,
  data,
  onClose,
  returnFocusRef,
}: Readonly<{
  project: WorkItem | null;
  data: SiteData;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}>) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [onClose, project, returnFocusRef]);

  if (!project) return null;

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-2 backdrop-blur-md sm:items-center sm:p-6"
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`work-detail-${project.id}-title`}
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.28 }}
        style={{ backgroundColor: "var(--color-bg-elevated)" }}
        className="max-h-[calc(100dvh-1rem)] w-full max-w-5xl overflow-y-auto rounded-[1.5rem] border border-[var(--color-card-border)] shadow-[0_36px_120px_-32px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]"
      >
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-divider)] bg-[var(--color-bg-elevated)]/95 p-5 backdrop-blur-xl sm:p-7">
              <div>
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {project.category}
                </p>
                <h3 id={`work-detail-${project.id}-title`} className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-main)] sm:text-4xl">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={data.work.closeDetailsLabel}
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-base)] text-[var(--color-text-main)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </header>

            <div className="p-5 sm:p-8">
              <p className="max-w-3xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
                {project.summary}
              </p>

              <dl className="mt-7 grid grid-cols-3 divide-x divide-[var(--color-divider)] border-y border-[var(--color-divider)] py-5">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 px-2 first:pl-0 last:pr-0 sm:px-6">
                    <dt className="text-[0.58rem] font-bold uppercase leading-4 tracking-[0.08em] text-[var(--color-text-subtle)] sm:text-[0.66rem] sm:tracking-[0.12em]">{metric.label}</dt>
                    <dd className="mt-2 break-words font-display text-xl font-semibold text-[var(--color-text-main)] sm:text-3xl">{metric.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {[
                  [data.work.challengeLabel, project.challenge],
                  [data.work.solutionLabel, project.solution],
                  [data.work.outcomeLabel, project.outcome],
                ].map(([label, value], detailIndex) => (
                  <div key={label} className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] p-5">
                    <p className={`text-[0.66rem] font-bold uppercase tracking-[0.14em] ${detailIndex === 2 ? "text-[var(--color-accent)]" : "text-[var(--color-text-subtle)]"}`}>{label}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-main)]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">Built with</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((technology) => (
                      <span key={technology} className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-base)] px-3 py-1.5 text-xs font-semibold text-[var(--color-text-muted)]">{technology}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[var(--color-text-subtle)]">{data.work.capabilitiesLabel}</p>
                  <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {project.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2.5 text-sm leading-5 text-[var(--color-text-main)]">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]"><Check className="size-2.5" strokeWidth={2.8} aria-hidden="true" /></span>
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-[var(--color-divider)] pt-6">
                {project.links.map((link) => <WorkLinkButton key={link.href} link={link} />)}
              </div>
              <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-[var(--color-text-subtle)]">
                <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                {project.verification}
              </p>
            </div>
      </motion.section>
    </motion.div>
  );
}

export default function Work({ data }: Readonly<{ data: SiteData }>) {
  const sectionRef = useRef<HTMLElement>(null);
  const detailTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const { motionEnabled, prefersReducedMotion } = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sectionProgress = useSpring(scrollYProgress, sceneSpring);
  const kineticX = useTransform(
    sectionProgress,
    [0, 1],
    motionEnabled ? ["8%", "-34%"] : ["0%", "0%"],
  );
  const activeProject = data.work.items.find((project) => project.id === activeProjectId) ?? null;
  const closeDetails = useCallback(() => setActiveProjectId(null), []);
  const openDetails = useCallback((projectId: string, trigger: HTMLButtonElement) => {
    detailTriggerRef.current = trigger;
    setActiveProjectId(projectId);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        aria-labelledby="work-title"
        style={{ backgroundColor: "var(--color-bg-base)" }}
        className="relative overflow-clip border-y border-[var(--color-card-border)] py-16 sm:py-20 lg:py-24"
      >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_50%_0%,var(--color-glow),transparent_70%)] opacity-80"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-14 overflow-hidden">
        <motion.p
          style={{ x: kineticX }}
          className="whitespace-nowrap font-display text-[clamp(7rem,22vw,20rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--color-text-main)] opacity-[0.035]"
        >
          BUILT / SHIPPED / USED
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {data.work.eyebrow}
            </p>
            <h2
              id="work-title"
              className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[var(--color-text-main)] sm:text-5xl lg:text-6xl"
            >
              {data.work.title}
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
              {data.work.subtitle}
            </p>
            <a
              href={data.actions.startProject.href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg-card)] px-5 py-3 text-sm font-bold text-[var(--color-text-main)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-hover)]"
            >
              {data.work.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <div className="mt-10 grid divide-y divide-[var(--color-divider)] border-y border-[var(--color-divider)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {data.work.proofPoints.map((point) => (
            <div key={point.label} className="flex items-start gap-3 py-5 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-[var(--color-card-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <Code2 className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-main)]">{point.label}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">{point.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <ol className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          {data.work.items.map((project, index) => (
            <WorkStory
              key={project.id}
              project={project}
              index={index}
              featured={data.work.items.length % 2 === 1 && index === 0}
              data={data}
              onOpenDetails={openDetails}
            />
          ))}
        </ol>
      </div>
      </section>
      <WorkDetailDialog project={activeProject} data={data} onClose={closeDetails} returnFocusRef={detailTriggerRef} />
    </>
  );
}