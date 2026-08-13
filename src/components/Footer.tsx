import {
  Clock3,
  Dribbble,
  ExternalLink,
  Facebook,
  Github,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { SiteData } from "../types";
import BrandLockup from "./BrandLockup";

const socialIconMap: Record<string, LucideIcon> = {
  dribbble: Dribbble,
  facebook: Facebook,
  github: Github,
  globe: Globe2,
  instagram: Instagram,
  linkedin: Linkedin,
  message: MessageCircle,
  threads: MessageCircle,
  twitter: Twitter,
  website: Globe2,
  x: Twitter,
  youtube: Youtube,
};

const isRealLink = (href: string) => href.trim().length > 0 && href.trim() !== "#";

export default function Footer({ data }: { data: SiteData }) {
  const navigationLinks = data.nav.filter(
    (item) => item.label.trim().length > 0 && isRealLink(item.href),
  );
  const socialLinks = data.brand.socialLinks.filter(
    (item) => item.label.trim().length > 0 && isRealLink(item.href),
  );
  const legalLinks = data.footer.legalLinks.filter(
    (item) => item.label.trim().length > 0 && isRealLink(item.href),
  );
  const emailHref = data.actions.email.href.trim();

  return (
    <footer className="border-t border-[var(--color-card-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <BrandLockup name={data.brand.name} variant="footer" />
            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
              {data.brand.footerText || data.brand.description}
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon.trim().toLowerCase()] ?? ExternalLink;
                  const opensNewWindow = /^https?:\/\//i.test(social.href);

                  return (
                    <a
                      key={`${social.label}-${social.href}`}
                      href={social.href}
                      aria-label={social.label}
                      target={opensNewWindow ? "_blank" : undefined}
                      rel={opensNewWindow ? "noreferrer" : undefined}
                      className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--color-card-border)] bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--color-divider)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-glow)]"
                    >
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {navigationLinks.length > 0 && (
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
                {data.footer.navigationHeading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {navigationLinks.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <a
                      href={item.href}
                      className="text-sm transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.services.items.length > 0 && (
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
                {data.footer.servicesHeading}
              </h3>
              <ul className="mt-5 space-y-3.5">
                {data.services.items.slice(0, 5).map((service) => (
                  <li key={service.id}>
                    <a
                      href={`#service-${service.id}`}
                      className="text-sm transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-[var(--color-text-main)]">
              {data.footer.contactHeading}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {isRealLink(emailHref) && (
                <li>
                  <a
                    href={emailHref}
                    className="group inline-flex items-start gap-3 transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    <Mail className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="break-all">{data.brand.email}</span>
                  </a>
                </li>
              )}
              {data.brand.location && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <span>{data.brand.location}</span>
                </li>
              )}
              {data.brand.responseTime && (
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                  <span>{data.brand.responseTime}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-[var(--color-card-border)] pt-7 text-xs sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {data.brand.name}. {data.footer.copyrightSuffix}
          </p>
          {legalLinks.length > 0 && (
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="transition-colors hover:text-[var(--color-accent)] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-[var(--color-card-border)] bg-[var(--color-contrast-bg)] px-2 py-5 sm:px-4 sm:py-7"
      >
        <motion.p
          initial={{ y: "35%" }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center whitespace-nowrap font-display text-[clamp(3.5rem,13.6vw,13rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-[var(--color-on-contrast)]"
        >
          {Array.from(data.brand.name.toUpperCase()).map((character, index) => (
            <motion.span
              key={`${character}-${index}`}
              whileHover={{ y: -10, scaleY: 0.86 }}
              transition={{ type: "spring", stiffness: 420, damping: 18 }}
              className={character === " " ? "w-[0.22em]" : "inline-block origin-bottom"}
            >
              {character === " " ? "\u00a0" : character}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </footer>
  );
}
