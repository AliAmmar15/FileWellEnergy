// ============================================================
// Site-wide contact details. email is temporary — swap for a branded address once the domain is set up.
// ============================================================
export const SITE = {
  name: "Lakeline Energy",
  legalName: "Lakeline Energy",
  founder: "Ali Ammar",
  phone: "586-668-5858",
  email: "aammar0712@gmail.com",
  guideUpdated: "November 10, 2026",
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
