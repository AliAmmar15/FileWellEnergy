import { describe, expect, it } from "vitest";
import { articleSchema, breadcrumbSchema, faqSchema, organizationSchema, seo } from "@/lib/seo";

const meta = (m: ReturnType<typeof seo>["meta"], key: string) =>
  m.find((x) => ("name" in x && x.name === key) || ("property" in x && x.property === key));

describe("seo()", () => {
  const h = seo({ title: "T | Lakeline Energy", description: "D", path: "/pricing", crumb: "Pricing" });
  it("builds an absolute canonical and Open Graph URL", () => {
    expect(h.links[0]).toEqual({ rel: "canonical", href: "https://lakelineenergy.com/pricing" });
    expect(meta(h.meta, "og:url")).toMatchObject({ content: "https://lakelineenergy.com/pricing" });
  });
  it("includes Open Graph and Twitter tags", () => {
    for (const k of ["og:title", "og:description", "og:image", "twitter:card", "twitter:title", "twitter:image"]) expect(meta(h.meta, k)).toBeTruthy();
  });
  it("adds a BreadcrumbList for inner pages only", () => {
    expect(h.scripts).toHaveLength(1);
    expect(JSON.parse(h.scripts[0]!.children)["@type"]).toBe("BreadcrumbList");
    expect(seo({ title: "x", description: "y", path: "/" }).scripts).toHaveLength(0);
  });
  it("supports noindex", () => {
    expect(meta(seo({ title: "x", description: "y", path: "/x", noindex: true }).meta, "robots")).toMatchObject({ content: "noindex, follow" });
    expect(meta(h.meta, "robots")).toBeUndefined();
  });
});

describe("schemas", () => {
  it("organization has name, url, contact and area served but no street address", () => {
    const o = organizationSchema() as any;
    expect(o.url).toBe("https://lakelineenergy.com");
    expect(o.email).toBeTruthy();
    expect(o.areaServed.name).toBe("Detroit");
    expect(o.address).toBeUndefined();
  });
  it("breadcrumb positions are sequential", () => {
    const b = breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]) as any;
    expect(b.itemListElement.map((i: any) => i.position)).toEqual([1, 2]);
  });
  it("FAQ and Article schemas carry the given text", () => {
    const f = faqSchema([{ q: "Q?", a: "A." }]) as any;
    expect(f.mainEntity[0].acceptedAnswer.text).toBe("A.");
    const a = articleSchema({ headline: "H", path: "/g", dateModified: "2026-11-19", description: "d" }) as any;
    expect(a.dateModified).toBe("2026-11-19");
    expect(a.author.name).toBe("Lakeline Energy");
  });
});
