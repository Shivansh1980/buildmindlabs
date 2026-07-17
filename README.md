# AI Forge Studio

The public website for AI Forge Studio. It presents the studio's website, web-application, AI-integration, and machine-learning services through a responsive React and TypeScript experience with five accessible color themes.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Motion and Lucide icons

## Requirements

Install Node.js and use either pnpm or npm as the package manager.

## Local development

Install dependencies:

```bash
pnpm install
```

or:

```bash
npm install
```

Start the development server at `http://localhost:3000`:

```bash
pnpm dev
```

or:

```bash
npm run dev
```

## Checks and production build

Run the TypeScript check:

```bash
pnpm lint
```

or:

```bash
npm run lint
```

Create a production build in `dist/`:

```bash
pnpm build
```

or:

```bash
npm run build
```

## Editing website content

All public website content is sourced from [`src/data/siteData.json`](src/data/siteData.json); components contain presentation and interaction logic only. Update that file to change the brand details, navigation, calls to action, section content, form options, FAQs, page title, description, canonical URL, social image, or keywords.

The React components consume this JSON at runtime. During development and production builds, `vite.config.ts` also reads the same file to populate the document metadata and generate the `ProfessionalService` and `FAQPage` structured data. This keeps visible content, social previews, and search metadata aligned.

Static brand artwork is stored in `public/`. If the social-card filename changes, update `seo.ogImage` in `src/data/siteData.json`.
