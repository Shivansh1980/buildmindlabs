import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export const sceneSpring = {
  stiffness: 120,
  damping: 30,
  mass: 0.45,
};

export function useDesktopMotion(minWidth = 1024) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${minWidth}px)`).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return {
    isDesktop,
    prefersReducedMotion: Boolean(prefersReducedMotion),
    motionEnabled: isDesktop && !prefersReducedMotion,
  };
}
