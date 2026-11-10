// Business rules: pricing (Section 6), deadline, and coverage logic.

export const PRICING = {
  tiers: [
    { min: 1, max: 4, rate: 750, label: "1–4 buildings" },
    { min: 5, max: 19, rate: 675, label: "5–19 buildings" },
    { min: 20, max: Infinity, rate: 600, label: "20+ buildings" },
  ],
  verification: 600,
  auditLevel1From: 3000,
  auditLevel2From: 15000,
  depositShare: 0.5,
};

export function perBuildingRate(buildings: number): number {
  if (buildings >= 20) return 600;
  if (buildings >= 5) return 675;
  return 750;
}

export function estimatePortfolio(buildings: number, verifications: number) {
  const b = Math.max(0, Math.floor(buildings || 0));
  const v = Math.min(b, Math.max(0, Math.floor(verifications || 0)));
  const rate = b > 0 ? perBuildingRate(b) : 0;
  const benchmarking = rate * b;
  const verification = PRICING.verification * v;
  const total = benchmarking + verification;
  return { buildings: b, verifications: v, rate, benchmarking, verification, total, deposit: total * PRICING.depositShare };
}

/** Next June 1 deadline. On or before June 1 counts to this year's; after June 1, next year's. */
export function nextDeadline(today: Date): Date {
  const y = today.getFullYear();
  const thisYear = new Date(y, 5, 1);
  const startOfToday = new Date(y, today.getMonth(), today.getDate());
  return startOfToday.getTime() <= thisYear.getTime() ? thisYear : new Date(y + 1, 5, 1);
}

export function daysUntilDeadline(today: Date): number {
  const d = nextDeadline(today);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((d.getTime() - start.getTime()) / 86_400_000);
}

export type Ownership = "private" | "city";
export type BuildingType = "commercial" | "multifamily" | "other";
export type InDetroit = "yes" | "no" | "unsure";
export type CoverageResult = "not-detroit" | "covered-city" | "covered-private" | "not-covered";

export function checkCoverage(input: {
  ownership: Ownership;
  type: BuildingType;
  sqft: number;
  inDetroit: InDetroit;
}): CoverageResult {
  if (input.inDetroit === "no") return "not-detroit";
  if (input.ownership === "city" && input.sqft >= 10000) return "covered-city";
  if (
    input.ownership === "private" &&
    (input.type === "commercial" || input.type === "multifamily") &&
    input.sqft >= 25000
  )
    return "covered-private";
  return "not-covered";
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
