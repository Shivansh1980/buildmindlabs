import { renderToString } from "react-dom/server";
import AppRoot from "./AppRoot.tsx";

export function render() {
  return renderToString(<AppRoot />);
}
