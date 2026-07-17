import { createRoot, hydrateRoot } from "react-dom/client";
import AppRoot from "./AppRoot.tsx";
import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource-variable/manrope/wght.css';
import './index.css';

const container = document.getElementById("root");

if (!container) throw new Error("Application root was not found.");

if (container.hasChildNodes()) {
  hydrateRoot(container, <AppRoot />);
} else {
  createRoot(container).render(<AppRoot />);
}
