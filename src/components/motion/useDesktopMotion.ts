import { useEffect, useLayoutEffect, useState } from "react";

const useHydrationSafeLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export const sceneSpring = {
  stiffness: 120,
  damping: 30,
  mass: 0.45,
};

export function useDesktopMotion(minWidth = 1024) {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useHydrationSafeLayoutEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);

    update();
    setIsMounted(true);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return {
    isDesktop: isMounted && isDesktop,
    prefersReducedMotion: false,
    motionEnabled: isMounted && isDesktop,
  };
}
