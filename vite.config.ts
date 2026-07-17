import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

type SiteContent = {
  brand: {
    name: string;
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
    ogImage: string;
    themeColor: string;
    keywords: string[];
  };
  services: {
    items: Array<{ title: string }>;
  };
  faqs: {
    items: Array<{ question: string; answer: string }>;
  };
};

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const siteDataPath = path.resolve(projectRoot, "src/data/siteData.json");

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
  const people = siteData.founder.people;
  const primaryFounder =
    people.find(
      ({ id, organizationRole }) =>
        id === siteData.founder.primaryFounderId && organizationRole === "founder",
    ) ?? people.find(({ organizationRole }) => organizationRole === "founder");
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
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: siteData.brand.name,
        description: siteData.brand.description,
        url: canonicalUrl,
        email: siteData.brand.email,
        image: socialImageUrl,
        logo: new URL("/favicon.svg", canonicalUrl).toString(),
        serviceType: siteData.services.items.map(({ title }) => title),
        ...(primaryFounder
          ? { founder: { "@id": personId(primaryFounder.id) } }
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
      {
        "@type": "FAQPage",
        "@id": new URL("#faq", canonicalUrl).toString(),
        about: { "@id": organizationId },
        mainEntity: siteData.faqs.items.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
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

        const replacements: Record<string, string> = {
          "%SEO_TITLE%": escapeHtml(siteData.seo.title),
          "%SEO_DESCRIPTION%": escapeHtml(siteData.seo.description),
          "%SEO_CANONICAL%": escapeHtml(canonicalUrl),
          "%SEO_KEYWORDS%": escapeHtml(siteData.seo.keywords.join(", ")),
          "%SEO_THEME_COLOR%": escapeHtml(siteData.seo.themeColor),
          "%SEO_OG_IMAGE%": escapeHtml(socialImageUrl),
          "%SEO_BRAND_NAME%": escapeHtml(siteData.brand.name),
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
  };
}

export default defineConfig({
  plugins: [siteIdentityPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  server: {
    allowedHosts: ["876c-103-133-65-214.ngrok-free.app"],
    hmr: process.env.DISABLE_HMR !== "true",
    watch: process.env.DISABLE_HMR === "true" ? null : {},
  },
});
