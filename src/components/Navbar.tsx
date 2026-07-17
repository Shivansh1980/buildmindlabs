import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteData } from "../types";
import ThemeSwitcher from "./ThemeSwitcher";

const MOBILE_MENU_ID = "site-navigation-menu";

export default function Navbar({ data }: { data: SiteData }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuTriggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMenu(true);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeMenu, isOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-divider)] bg-[var(--color-bg-base)]/90 text-[var(--color-text-main)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <a
            href="#home"
            onClick={() => closeMenu()}
            className="inline-flex min-h-11 shrink-0 items-center rounded-lg font-display text-[18px] font-semibold tracking-[-0.45px] text-[var(--color-text-main)] transition-colors hover:text-[var(--color-accent)]"
            aria-label={data.brand.name}
          >
            {data.brand.shortName}
          </a>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex">
            {data.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-[13px] font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-main)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:ml-2">
            <ThemeSwitcher copy={data.themeSwitcher} />

            <a
              href={data.actions.startProject.href}
              className="hidden min-h-11 items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-[13px] font-semibold text-[var(--color-on-accent)] shadow-sm transition-colors hover:bg-[var(--color-accent-strong)] lg:inline-flex"
            >
              {data.actions.startProject.label}
            </a>

            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="flex size-11 items-center justify-center rounded-full border border-transparent text-[var(--color-text-main)] transition-colors hover:border-[var(--color-card-border)] hover:bg-[var(--color-bg-hover)] lg:hidden"
              aria-label={
                isOpen
                  ? data.navigation.closeMenuLabel
                  : data.navigation.openMenuLabel
              }
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              {isOpen ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[var(--color-divider)] bg-[var(--color-bg-elevated)] px-4 pb-5 pt-2 lg:hidden"
            style={{ boxShadow: "0 18px 40px var(--color-shadow)" }}
          >
            <div className="mx-auto max-w-7xl space-y-1">
              {data.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => closeMenu()}
                  className="flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-main)]"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href={data.actions.startProject.href}
                  onClick={() => closeMenu()}
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 text-[15px] font-semibold text-[var(--color-on-accent)] shadow-sm transition-colors hover:bg-[var(--color-accent-strong)]"
                >
                  {data.actions.startProject.label}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
