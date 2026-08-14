# Work case studies

This document records the evidence behind the public Work section. Keep it aligned with `src/data/siteData.json` whenever a project, metric, link, or screenshot changes.

## Evidence standard

- Present only products that have a public package, live application, source repository, or other inspectable evidence.
- Date adoption metrics because values such as npm downloads change over time.
- Separate browser-verified behavior from capabilities found only in source or documentation.
- Do not present personal projects, previous employment, or concept studies as BuildMind Labs client engagements.
- Store durable media locally. Do not depend on GitHub, npm, or third-party screenshot hotlinks at runtime.

## AI Node Editor

### Public references

- Package: <https://www.npmjs.com/package/@ai-node-editor/core>
- Package version reviewed: `0.3.0`
- Review date: 14 August 2026
- Weekly downloads shown by npm on that date: `21`
- License: MIT
- Runtime dependencies shown by npm: `0`

### Product summary

`@ai-node-editor/core` is a reusable React and TypeScript toolkit for visual AI workflow products. It combines a node-editor interface with a pure TypeScript graph model so consuming applications can build, validate, serialize, and execute workflows without coupling graph data to one screen.

### Publicly documented capabilities reviewed

- Typed graph model, node/plugin registries, port compatibility, traversal, and serialization.
- Validation for required inputs, unknown node types, invalid ports, incompatible data, cycles, and configuration errors.
- Async graph execution with lifecycle events, logs, cancellation, retries, validation-only runs, and partial execution.
- AI-focused built-in nodes covering RAG, agents, training, media, automation, evaluation, and outputs.
- Ten provider-neutral workflow templates and a searchable template gallery.
- Resizable diagram shapes, multiple routed edge types, labels, markers, animations, reconnection, minimap, inspector, and keyboard interaction.
- Four bundled themes plus public render hooks, editor hooks, CSS variables, and graph utilities.

Built-in executors are documented as mock or stub implementations. Real providers are expected to be supplied through consumer-defined nodes or plugins; public copy must not imply that the package includes production provider credentials or hosted execution.

### Media provenance

The three images in `public/work/` were published with version `0.3.0` and downloaded from its version-pinned jsDelivr package path:

- `ai-node-editor.png` — workflow canvas
- `ai-node-editor-templates.png` — workflow template gallery
- `ai-node-editor-validation.png` — graph validation report

When the package version changes, review the release first. Replace the local images and update their alt text only if the visible interface changes.

## Notes

### Public references

- Live product: <https://notes-app-shivansh.vercel.app/>
- Source: <https://github.com/Shivansh1980/NotesApp>
- Review date: 14 August 2026

### Browser-verified flow

A disposable review account was used to:

1. Create an account and enter the private workspace.
2. Create a page and confirm its stable `?page=` route.
3. Rename the page and verify the breadcrumb updated.
4. Add independent text, heading, and to-do blocks.
5. Open block actions and inspect type conversion, block links, copy, duplication, reordering, deletion, and comments.
6. Reload the page and confirm the document title and blocks persisted.
7. Render the editor at `390 × 844` and confirm the document had no horizontal overflow.

The public Work section describes this tested flow directly. Features not exercised end to end are worded as available product surfaces rather than measured outcomes.

### Source-backed architecture

- React and TypeScript frontend built with Vite.
- TipTap editing extensions, drag-and-drop utilities, React Query, Zustand, DOMPurify, KaTeX, and Prism.
- Separate Python backend with API modules for authentication, workspaces, pages, blocks, comments, search, uploads, and calendar integration.
- A substantial API flow test module under `backend/tests/test_api_flows.py`.
- Application surfaces for nested pages, global search, comments, settings, trash, uploads, and Google Calendar connection.

### Product view provenance

The authenticated workspace has no public screenshot asset in its repository. The site therefore renders a lightweight, responsive product view in `src/components/Work.tsx`, using the exact page title, text, heading, task, navigation, and controls exercised during the browser review. It is intentionally labeled "Verified editor view" and must not be represented as a client screenshot.

## Adding another project

1. Verify ownership and whether the work can be shown publicly.
2. Record the public URLs, review date, actual role, constraints, and evidence here.
3. Add a concise case study to `work.items` in `src/data/siteData.json`.
4. Prefer outcomes that can be demonstrated. Do not invent revenue, conversion, performance, adoption, or client metrics.
5. Add optimized local media under `public/work/` with useful alt text, or build a clearly labeled product view when authenticated data cannot be published.
6. Test every external link, all five site themes, reduced motion, keyboard focus, and mobile widths before release.