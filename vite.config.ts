import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

type SiteContent = {
  brand: {
    name: string;
    alternateName: string;
    description: string;
    email: string;
    socialLinks: Array<{ href: string }>;
  };
  founder: {
    primaryFounderId: string;
    people: Array<{
      id: string;
      organizationRole: "founder" | "employee" | "collaborator";
      name: string;
      role: string;
      bio: string;
    }>;
  };
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    favicon: string;
    ogImage: string;
    ogImageAlt: string;
    locale: string;
    themeColor: string;
    robots: string;
    googleSiteVerification: string;
  };
  services: {
    items: Array<{ id: string; title: string; description: string }>;
  };
};

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const siteDataPath = path.resolve(projectRoot, "src/data/siteData.json");
const contactApiTarget = "https://ryzenshivansh.pythonanywhere.com";

const contactApiProxy = {
  "/api/v1/contact": {
    target: contactApiTarget,
    changeOrigin: true,
    secure: true,
  },
};

function readSiteContent(): SiteContent {
  const siteData = JSON.parse(
    readFileSync(siteDataPath, "utf8"),
  ) as SiteContent;
  const validOrganizationRoles = new Set([
    "founder",
    "employee",
    "collaborator",
  ]);
  const people = siteData.founder.people;
  const uniqueIds = new Set(people.map(({ id }) => id));
  const primaryFounder = people.find(
    ({ id }) => id === siteData.founder.primaryFounderId,
  );

  if (
    people.length === 0 ||
    uniqueIds.size !== people.length ||
    !primaryFounder ||
    primaryFounder.organizationRole !== "founder" ||
    people.some(({ organizationRole }) =>
      !validOrganizationRoles.has(organizationRole),
    )
  ) {
    throw new Error(
      "Founder people must have unique IDs, a valid organizationRole, and a matching primary founder.",
    );
  }

  return siteData;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

function createStructuredData(
  siteData: SiteContent,
  canonicalUrl: string,
  socialImageUrl: string,
): string {
  const organizationId = new URL("#organization", canonicalUrl).toString();
  const websiteId = new URL("#website", canonicalUrl).toString();
  const webpageId = new URL("#webpage", canonicalUrl).toString();
  const logoUrl = new URL(siteData.seo.favicon, canonicalUrl).toString();
  const people = siteData.founder.people;
  const founders = people.filter(
    ({ organizationRole }) => organizationRole === "founder",
  );
  const employees = people.filter(
    ({ organizationRole }) => organizationRole === "employee",
  );
  const personId = (id: string) =>
    new URL(`#person-${id}`, canonicalUrl).toString();
  const socialLinks = siteData.brand.socialLinks.flatMap(({ href }) => {
    try {
      const url = new URL(href);
      return url.protocol === "https:" || url.protocol === "http:"
        ? [url.toString()]
        : [];
    } catch {
      return [];
    }
  });

  return serializeJsonLd({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: canonicalUrl,
        name: siteData.brand.name,
        alternateName: siteData.brand.alternateName,
        description: siteData.seo.description,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: canonicalUrl,
        name: siteData.seo.title,
        description: siteData.seo.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: socialImageUrl,
          width: 1200,
          height: 630,
          caption: siteData.seo.ogImageAlt,
        },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteData.brand.name,
        alternateName: siteData.brand.alternateName,
        description: siteData.brand.description,
        url: canonicalUrl,
        email: siteData.brand.email,
        image: {
          "@type": "ImageObject",
          url: socialImageUrl,
          width: 1200,
          height: 630,
        },
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          contentUrl: logoUrl,
          width: 512,
          height: 512,
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteData.brand.email,
          availableLanguage: ["English"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web development and AI integration services",
          itemListElement: siteData.services.items.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
              url: new URL(`#service-${service.id}`, canonicalUrl).toString(),
              provider: { "@id": organizationId },
            },
          })),
        },
        ...(founders.length > 0
          ? { founder: founders.map(({ id }) => ({ "@id": personId(id) })) }
          : {}),
        ...(employees.length > 0
          ? { employee: employees.map(({ id }) => ({ "@id": personId(id) })) }
          : {}),
        ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
      },
      ...people.map((person) => ({
        "@type": "Person",
        "@id": personId(person.id),
        name: person.name,
        jobTitle: person.role,
        description: person.bio,
        ...(person.organizationRole === "founder" ||
        person.organizationRole === "employee"
          ? { worksFor: { "@id": organizationId } }
          : {}),
      })),
    ],
  });
}

function siteIdentityPlugin(): Plugin {
  return {
    name: "site-identity-from-json",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        const siteData = readSiteContent();
        const canonicalUrl = new URL(siteData.seo.canonicalUrl).toString();
        const socialImageUrl = new URL(
          siteData.seo.ogImage,
          canonicalUrl,
        ).toString();
        const faviconUrl = new URL(
          siteData.seo.favicon,
          canonicalUrl,
        ).toString();
        const verificationToken = siteData.seo.googleSiteVerification.trim();

        const replacements: Record<string, string> = {
          "%SEO_TITLE%": escapeHtml(siteData.seo.title),
          "%SEO_DESCRIPTION%": escapeHtml(siteData.seo.description),
          "%SEO_CANONICAL%": escapeHtml(canonicalUrl),
          "%SEO_ROBOTS%": escapeHtml(siteData.seo.robots),
          "%SEO_THEME_COLOR%": escapeHtml(siteData.seo.themeColor),
          "%SEO_OG_IMAGE%": escapeHtml(socialImageUrl),
          "%SEO_OG_IMAGE_ALT%": escapeHtml(siteData.seo.ogImageAlt),
          "%SEO_FAVICON_PATH%": escapeHtml(siteData.seo.favicon),
          "%SEO_LOCALE%": escapeHtml(siteData.seo.locale),
          "%SEO_BRAND_NAME%": escapeHtml(siteData.brand.name),
          "%SEO_GOOGLE_SITE_VERIFICATION%": verificationToken
            ? `<meta name="google-site-verification" content="${escapeHtml(verificationToken)}" />`
            : "",
          "%SEO_JSON_LD%": createStructuredData(
            siteData,
            canonicalUrl,
            socialImageUrl,
          ),
        };

        return Object.entries(replacements).reduce(
          (output, [placeholder, value]) =>
            output.replaceAll(placeholder, value),
          html,
        );
      },
    },
    generateBundle() {
      const siteData = readSiteContent();
      const canonicalUrl = new URL(siteData.seo.canonicalUrl).toString();
      const sitemapUrl = new URL("/sitemap.xml", canonicalUrl).toString();

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: [
          "User-agent: *",
          "Allow: /",
          "",
          `Sitemap: ${sitemapUrl}`,
          "",
        ].join("\n"),
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          "  <url>",
          `    <loc>${escapeXml(canonicalUrl)}</loc>`,
          "  </url>",
          "</urlset>",
          "",
        ].join("\n"),
      });
    },
  };
}

export default defineConfig({
  appType: "mpa",
  plugins: [siteIdentityPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  server: {
    allowedHosts: true,
    hmr: process.env.DISABLE_HMR !== "true",
    proxy: contactApiProxy,
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },
  preview: {
    allowedHosts: true,
    proxy: contactApiProxy,
  },
});
