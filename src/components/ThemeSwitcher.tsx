import { Box, Coffee, Monitor, Moon, Sun } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type Theme = "light" | "dark" | "midnight" | "sepia" | "clay";

export interface ThemeSwitcherCopy {
  ariaLabel: string;
  menuLabel: string;
  themes: Record<Theme, string>;
}

interface ThemeSwitcherProps {
  copy: ThemeSwitcherCopy;
}

const THEME_STORAGE_KEY = "theme";
const THEME_MENU_ID = "theme-switcher-menu";
const THEME_OPTIONS = [
  { id: "light", icon: Sun },
  { id: "dark", icon: Moon },
  { id: "midnight", icon: Monitor },
  { id: "sepia", icon: Coffee },
  { id: "clay", icon: Box },
] as const;

function isTheme(value: unknown): value is Theme {
  return THEME_OPTIONS.some(({ id }) => id === value);
}

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(savedTheme)) return savedTheme;
    if (savedTheme !== null) window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Storage can be unavailable in privacy-restricted browser contexts.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeSwitcher({ copy }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const shouldReduceMotion = useReducedMotion();

  const closeAndFocusTrigger = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsidePointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeAndFocusTrigger();
    };

    document.addEventListener("pointerdown", handleOutsidePointer, true);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeAndFocusTrigger, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = THEME_OPTIONS.findIndex(({ id }) => id === theme);
    const frame = window.requestAnimationFrame(() => {
      itemRefs.current[selectedIndex]?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [isOpen, theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // The selected theme still applies for this session when storage is blocked.
    }
    closeAndFocusTrigger();
  };

  const handleItemKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % THEME_OPTIONS.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = THEME_OPTIONS.length - 1;
    }

    if (nextIndex === undefined) return;
    event.preventDefault();
    itemRefs.current[nextIndex]?.focus();
  };

  const CurrentIcon =
    THEME_OPTIONS.find(({ id }) => id === theme)?.icon ?? Sun;

  return (
    <div ref={rootRef} className="relative flex shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex size-11 items-center justify-center rounded-full border border-transparent text-[var(--color-text-main)] transition-colors hover:border-[var(--color-card-border)] hover:bg-[var(--color-bg-hover)]"
        aria-label={copy.ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={THEME_MENU_ID}
      >
        <CurrentIcon aria-hidden="true" className="size-[18px]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={THEME_MENU_ID}
            role="menu"
            aria-label={copy.menuLabel}
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.97 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.16 }}
            className="absolute right-0 top-full z-[60] mt-2 w-52 overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-bg-elevated)] p-2 text-[var(--color-text-main)]"
            style={{ boxShadow: "0 18px 50px var(--color-shadow)" }}
          >
            <p
              role="presentation"
              className="px-3 pb-1.5 pt-1 text-xs font-semibold text-[var(--color-text-subtle)]"
            >
              {copy.menuLabel}
            </p>
            {THEME_OPTIONS.map(({ id, icon: Icon }, index) => (
              <button
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                key={id}
                type="button"
                role="menuitemradio"
                aria-checked={theme === id}
                tabIndex={theme === id ? 0 : -1}
                onClick={() => handleThemeChange(id)}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
                className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                  theme === id
                    ? "bg-[var(--color-bg-soft)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-hover)]"
                }`}
              >
                <Icon aria-hidden="true" className="size-[18px] shrink-0" />
                <span>{copy.themes[id]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
