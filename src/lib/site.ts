// ============================================================
// Single source of truth for contact details and the site URL. Every page reads from here.
// ============================================================
export const SITE = {
  name: "Lakeline Energy",
  legalName: "Lakeline Energy",
  founder: "Ali Ammar",
  phone: "586-668-5858",
  email: "info@lakelineenergy.com",
  url: "https://lakelineenergy.com",
  guideUpdatedISO: "2026-11-19",
  tagline: "We file it. You're covered.",
  description:
    "Lakeline Energy handles Detroit energy and water benchmarking filings for commercial and multifamily buildings — flat fee, done for you, local.",
};

export const LINKS = {
  cityBenchmarking: "https://detroitmi.gov/benchmarking",
  dbidLookup: "https://detroitmi.gov/dbidlookup",
  portfolioManager: "https://www.energystar.gov/buildings/benchmark",
};

export const NAV = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/detroit-benchmarking-guide", label: "Detroit Guide" },
  { to: "/am-i-covered", label: "Am I Covered?" },
  { to: "/faq", label: "FAQ" },
] as const;

export const UTM_KEY = "lakeline_utm";

/** Human-readable date for the guide's "last updated" line, derived from the ISO date. */
export const guideUpdatedLabel = new Date(`${SITE.guideUpdatedISO}T12:00:00Z`).toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
});
