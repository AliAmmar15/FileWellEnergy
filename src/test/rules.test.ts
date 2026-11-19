import { describe, expect, it } from "vitest";
import { checkCoverage, daysUntilDeadline, estimatePortfolio, nextDeadline, perBuildingRate } from "@/lib/rules";

describe("pricing", () => {
  it("charges $750 per building for 1–4 buildings", () => {
    expect(perBuildingRate(1)).toBe(750);
    expect(perBuildingRate(4)).toBe(750);
  });
  it("charges $675 per building for 5–19 buildings", () => {
    expect(perBuildingRate(5)).toBe(675);
    expect(perBuildingRate(19)).toBe(675);
  });
  it("charges $600 per building for 20+ buildings", () => {
    expect(perBuildingRate(20)).toBe(600);
  });
  it("totals the per-building rate and takes a 50% deposit", () => {
    const e = estimatePortfolio(5);
    expect(e.rate).toBe(675);
    expect(e.total).toBe(3375);
    expect(e.deposit).toBe(1687.5);
  });
  it("estimates zero for no buildings", () => {
    expect(estimatePortfolio(0).total).toBe(0);
  });
});

describe("deadline", () => {
  it("counts to June 1 of next year after June 1", () => {
    expect(nextDeadline(new Date(2026, 10, 9))).toEqual(new Date(2027, 5, 1));
    expect(nextDeadline(new Date(2027, 5, 2))).toEqual(new Date(2028, 5, 1));
  });
  it("counts to this year's June 1 on or before it", () => {
    expect(daysUntilDeadline(new Date(2027, 5, 1))).toBe(0);
    expect(daysUntilDeadline(new Date(2027, 4, 31))).toBe(1);
  });
});

describe("coverage", () => {
  it("covers private commercial/multifamily at 25,000 sq ft", () => {
    expect(checkCoverage({ ownership: "private", type: "multifamily", sqft: 25000, inDetroit: "yes" })).toBe("covered-private");
    expect(checkCoverage({ ownership: "private", type: "commercial", sqft: 24999, inDetroit: "yes" })).toBe("not-covered");
  });
  it("covers city-owned at 10,000 sq ft", () => {
    expect(checkCoverage({ ownership: "city", type: "other", sqft: 10000, inDetroit: "unsure" })).toBe("covered-city");
  });
  it("says the ordinance doesn't apply outside Detroit", () => {
    expect(checkCoverage({ ownership: "private", type: "commercial", sqft: 90000, inDetroit: "no" })).toBe("not-detroit");
  });
});
