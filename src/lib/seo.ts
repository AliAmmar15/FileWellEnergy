import { SITE } from "@/lib/site";

const abs = (path: string) => `${SITE.url}${path}`;
export const OG_IMAGE = abs("/og-image.png");
export const LOGO_URL = abs("/brand/lakeline-logo-horizontal.png");

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: LOGO_URL,
    image: OG_IMAGE,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: { "@type": "City", name: "Detroit", containedInPlace: { "@type": "State", name: "Michigan" } },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(a: { headline: string; path: string; dateModified: string; description: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    dateModified: a.dateModified,
    mainEntityOfPage: abs(a.path),
    image: OG_IMAGE,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: LOGO_URL } },
  };
}

/**
 * Per-route head: title, description, canonical, Open Graph, Twitter, optional noindex and JSON-LD.
 * `crumb` adds a BreadcrumbList (Home > crumb) for inner pages.
 */
export function seo({
  title,
  description,
  path,
  crumb,
  noindex = false,
  jsonLd = [],
}: {
  title: string;
  description: string;
  path: string;
  crumb?: string;
  noindex?: boolean;
  jsonLd?: JsonLd[];
}) {
  const url = abs(path);
  const schemas = [...jsonLd];
  if (crumb) schemas.push(breadcrumbSchema([{ name: "Home", path: "/" }, { name: crumb, path }]));
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Lakeline Energy logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "Lakeline Energy logo" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schemas.map((s) => ({ type: "application/ld+json", children: JSON.stringify(s) })),
  };
}
