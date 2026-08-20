import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import App from "./App.tsx";

export default function AppRoot() {
  return (
    <StrictMode>
      <MotionConfig
        reducedMotion="never"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <App />
      </MotionConfig>
    </StrictMode>
  );
}
