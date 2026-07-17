import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const distRoot = resolve(projectRoot, "dist");
const siteData = JSON.parse(
  readFileSync(resolve(projectRoot, "src/data/siteData.json"), "utf8"),
);
const requiredFiles = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  siteData.seo.favicon.replace(/^\//, ""),
  siteData.seo.ogImage.replace(/^\//, ""),
];

const fail = (message) => {
  throw new Error(`SEO check failed: ${message}`);
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

for (const file of requiredFiles) {
  if (!existsSync(resolve(distRoot, file))) fail(`dist/${file} is missing`);
}

const html = readFileSync(resolve(distRoot, "index.html"), "utf8");
const robots = readFileSync(resolve(distRoot, "robots.txt"), "utf8");
const sitemap = readFileSync(resolve(distRoot, "sitemap.xml"), "utf8");
const favicon = readFileSync(
  resolve(distRoot, siteData.seo.favicon.replace(/^\//, "")),
  "utf8",
);
const socialImage = readFileSync(
  resolve(distRoot, siteData.seo.ogImage.replace(/^\//, "")),
);
const canonicalUrl = new URL(siteData.seo.canonicalUrl).toString();
const sitemapUrl = new URL("/sitemap.xml", canonicalUrl).toString();
const socialImageUrl = new URL(siteData.seo.ogImage, canonicalUrl).toString();
const faviconUrl = new URL(siteData.seo.favicon, canonicalUrl).toString();

if (new URL(canonicalUrl).protocol !== "https:") fail("canonical URL must use HTTPS");
if (/%SEO_[A-Z_]+%/.test(html)) fail("unresolved SEO placeholders remain");
if (!/<html\s+lang="en"/i.test(html)) fail("document language is not English");
if (!html.includes(`<title>${escapeHtml(siteData.seo.title)}</title>`)) {
  fail("page title does not match siteData.json");
}
if (
  !html.includes(
    `name="description" content="${escapeHtml(siteData.seo.description)}"`,
  )
) {
  fail("meta description does not match siteData.json");
}
if (!html.includes(`<link rel="canonical" href="${canonicalUrl}"`)) {
  fail("canonical link does not match siteData.json");
}
if (!html.includes(`content="${siteData.seo.robots}"`)) {
  fail("robots meta directive does not match siteData.json");
}
if (/noindex|nofollow/i.test(siteData.seo.robots)) {
  fail("production robots meta blocks indexing or following");
}
if (!html.includes(`property="og:image" content="${socialImageUrl}"`)) {
  fail("Open Graph image is not an absolute canonical URL");
}
if (!html.includes(`rel="icon" type="image/svg+xml" sizes="any" href="${siteData.seo.favicon}"`)) {
  fail("favicon URL does not match siteData.json");
}
if (
  siteData.seo.googleSiteVerification &&
  !html.includes(
    `name="google-site-verification" content="${siteData.seo.googleSiteVerification}"`,
  )
) {
  fail("Google site verification token was not emitted");
}
if (html.includes('<div id="root"></div>')) {
  fail("application root is empty; the page was not prerendered");
}
if (!/<main(?:\s|>)/.test(html) || !/<h1(?:\s|>)/.test(html)) {
  fail("prerendered main content or H1 is missing");
}
if (
  !html.includes(escapeHtml(siteData.brand.name)) ||
  !html.includes(escapeHtml(siteData.hero.headline))
) {
  fail("prerendered brand or hero content is missing");
}
if (!robots.includes("User-agent: *") || !robots.includes("Allow: /")) {
  fail("robots.txt does not allow public crawling");
}
if (/^\s*Disallow:\s*\/\s*$/im.test(robots)) {
  fail("robots.txt blocks the entire site");
}
if (!robots.includes(`Sitemap: ${sitemapUrl}`)) {
  fail("robots.txt does not reference the canonical sitemap");
}
if (!sitemap.includes(`<loc>${canonicalUrl}</loc>`)) {
  fail("sitemap does not contain the canonical homepage");
}

const jsonLdMatch = html.match(
  /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/,
);
if (!jsonLdMatch) fail("JSON-LD block is missing");
const jsonLd = JSON.parse(jsonLdMatch[1]);
const entityTypes = new Set(
  jsonLd["@graph"].flatMap((entity) => entity["@type"] ?? []),
);

for (const type of ["WebSite", "WebPage", "Organization", "Person"]) {
  if (!entityTypes.has(type)) fail(`${type} structured data is missing`);
}

const organization = jsonLd["@graph"].find(
  (entity) => entity["@type"] === "Organization",
);
if (
  organization?.logo?.url !== faviconUrl ||
  organization?.logo?.contentUrl !== faviconUrl
) {
  fail("Organization logo is not linked to the absolute canonical favicon URL");
}

for (const service of siteData.services.items) {
  if (!html.includes(`id="service-${service.id}"`)) {
    fail(`service anchor is missing for ${service.id}`);
  }
}

for (const faq of siteData.faqs.items) {
  if (
    !html.includes(escapeHtml(faq.question)) ||
    !html.includes(escapeHtml(faq.answer))
  ) {
    fail(`prerendered FAQ content is missing for: ${faq.question}`);
  }
}

if (!/width="512"\s+height="512"/.test(favicon)) {
  fail("favicon does not declare a search-friendly square size");
}
if (
  socialImage.length < 24 ||
  socialImage.toString("ascii", 1, 4) !== "PNG" ||
  socialImage.readUInt32BE(16) !== 1200 ||
  socialImage.readUInt32BE(20) !== 630
) {
  fail("social image must be a 1200 by 630 PNG");
}

console.log(
  `SEO checks passed for ${canonicalUrl} (${requiredFiles.length} deployment files and prerendered content verified).`,
);
