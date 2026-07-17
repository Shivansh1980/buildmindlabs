import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const prerenderRoot = resolve(projectRoot, ".prerender");
const serverEntry = resolve(prerenderRoot, "entry-server.mjs");
const rootPlaceholder = '<div id="root"></div>';

try {
  await build({ root: projectRoot });
  await build({
    root: projectRoot,
    build: {
      ssr: resolve(projectRoot, "src/entry-server.tsx"),
      outDir: prerenderRoot,
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: {
        output: {
          entryFileNames: "entry-server.mjs",
        },
      },
    },
  });

  const { render } = await import(
    `${pathToFileURL(serverEntry).href}?build=${Date.now()}`
  );
  const appHtml = render();
  const indexPath = resolve(distRoot, "index.html");
  const documentHtml = await readFile(indexPath, "utf8");

  if (!documentHtml.includes(rootPlaceholder)) {
    throw new Error("Could not find the empty application root in dist/index.html.");
  }
  if (!appHtml.includes("<main") || !appHtml.includes("<h1")) {
    throw new Error("The prerendered page is missing its main content or heading.");
  }

  await writeFile(
    indexPath,
    documentHtml.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`),
    "utf8",
  );
  console.log(`Prerendered ${appHtml.length.toLocaleString()} characters into dist/index.html.`);
} finally {
  await rm(prerenderRoot, { recursive: true, force: true });
}

await import("./check-seo.mjs");
