import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

// All public, indexable pages. The guide carries a real last-modified date.
const PATHS = ["/", "/how-it-works", "/pricing", "/detroit-benchmarking-guide", "/am-i-covered", "/faq", "/about", "/free-check", "/contact", "/privacy", "/terms"];
const LASTMOD: Record<string, string> = { "/detroit-benchmarking-guide": SITE.guideUpdatedISO };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const origin = SITE.url;
        const urls = PATHS.map((p) => `  <url><loc>${origin}${p}</loc>${LASTMOD[p] ? `<lastmod>${LASTMOD[p]}</lastmod>` : ""}</url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
