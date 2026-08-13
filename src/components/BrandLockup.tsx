type BrandLockupProps = {
  name: string;
  variant?: "header" | "footer";
  className?: string;
};

export default function BrandLockup({
  name,
  variant = "header",
  className = "",
}: BrandLockupProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={`inline-flex items-center ${isFooter ? "gap-3.5" : "gap-2.5"} ${className}`}
      role="img"
      aria-label={name}
    >
      <span
        className={`brand-mark-shell relative flex shrink-0 overflow-hidden bg-[#020817] ${
          isFooter ? "size-14 rounded-[1.15rem]" : "size-10 rounded-[0.85rem]"
        }`}
        aria-hidden="true"
      >
        <img
          src="/buildmind-labs-icon.png"
          alt=""
          width={isFooter ? 56 : 40}
          height={isFooter ? 56 : 40}
          className="size-full object-cover"
          decoding="async"
        />
      </span>

      <span className="flex min-w-0 flex-col" aria-hidden="true">
        <span
          className={`whitespace-nowrap font-display font-semibold leading-none tracking-[-0.055em] ${
            isFooter ? "text-[1.35rem]" : "text-[1.05rem]"
          }`}
        >
          <span className="text-[var(--color-text-main)]">Build</span>
          <span className="brand-word-gradient">Mind</span>
        </span>

        <span
          className={`mt-1 flex items-center uppercase text-[var(--color-text-subtle)] ${
            isFooter
              ? "gap-2 text-[0.61rem] font-bold tracking-[0.48em]"
              : "gap-1.5 text-[0.48rem] font-bold tracking-[0.42em]"
          }`}
        >
          <span className="brand-lockup-line" />
          <span>Labs</span>
          <span className="brand-lockup-line" />
        </span>

        {isFooter && (
          <span className="mt-2 flex items-center gap-2.5 whitespace-nowrap text-[0.61rem] font-semibold tracking-[0.08em] text-[var(--color-text-muted)]">
            <span>Web</span>
            <span className="brand-lockup-dot bg-[#0875f5]" />
            <span>AI</span>
            <span className="brand-lockup-dot bg-[#8b2cf7]" />
            <span>Automation</span>
          </span>
        )}
      </span>
    </span>
  );
}
