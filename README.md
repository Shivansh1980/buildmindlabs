# CurvatureTech

The public website for CurvatureTech. It presents the startup's website, web-application, AI-integration, and machine-learning services through a responsive React and TypeScript experience with five accessible color themes.

## Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS
- Motion and Lucide icons

## Requirements

Use Node.js 20.19+ or 22.12+ and pnpm 11 (recommended). npm also works.

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

Create the production build in `dist/`:

```bash
pnpm build
```

or:

```bash
npm run build
```

The build generates the browser bundle, `robots.txt`, `sitemap.xml`, and a fully prerendered `index.html`, then validates the result. React hydrates that HTML in the browser, so the existing themes, motion, carousel, and parallax remain interactive while visitors and crawlers receive useful content immediately.

Rerun the generated search and deployment checks at any time with:

```bash
pnpm check:seo
```

or:

```bash
npm run check:seo
```

## Editing website content

All public website content is sourced from [`src/data/siteData.json`](src/data/siteData.json); components contain presentation and interaction logic only. Update that file to change the brand details, navigation, calls to action, section content, form options, FAQs, page title, description, canonical URL, favicon, social image, robots directive, or optional Google verification token.

The React components consume this JSON at runtime. During development and production builds, `vite.config.ts` also reads the same file to populate document metadata and generate linked `WebSite`, `WebPage`, `Organization`, `Person`, and service-offer structured data. This keeps visible content, social previews, and search metadata aligned. A keywords meta tag is intentionally omitted because search engines do not use it for ranking.

Static brand artwork is stored in `public/`. If the social-card filename changes, update `seo.ogImage` in `src/data/siteData.json`.

## Deployment checklist

This is a portable static build: upload the contents of `dist/` to any HTTPS static host. Before the first public deployment:

1. Confirm that `seo.canonicalUrl` is the final public domain and that you control it.
2. Run `pnpm build` and `pnpm check:seo`.
3. Ensure `/`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, and `/og.png` return HTTP 200, while nonexistent URLs return a real 404. Redirect HTTP and alternate hostnames to the canonical HTTPS URL.
4. Verify the domain in Google Search Console. For URL-prefix verification, place Google's token in `seo.googleSiteVerification`; domain-property verification normally uses DNS.
5. Submit `https://your-domain.example/sitemap.xml`, inspect the homepage URL, and request indexing after the production page is live.

Search eligibility is not a ranking guarantee. Keep claims accurate, add only real public profiles or references, and expand into dedicated service or case-study URLs only when each page has distinct, genuinely useful content.
