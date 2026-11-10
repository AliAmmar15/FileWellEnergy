import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaBand, FaqAccordion, PageIntro } from "@/components/site/blocks";
import { Photo } from "@/components/site/Photo";
import { INCLUDED } from "@/components/site/content";
import { estimatePortfolio, PRICING, usd } from "@/lib/rules";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "Detroit Benchmarking Pricing — From $600 per Building | Filewell",
      description:
        "Flat, per-building pricing for Detroit energy benchmarking: $750, $675 or $600 per building by portfolio size. Licensed verification $600. Free compliance check.",
      path: "/pricing",
    }),
  component: Pricing,
});

function Estimator() {
  const [b, setB] = useState("5");
  const [v, setV] = useState("1");
  const e = estimatePortfolio(Number(b), Number(v));
  const rows: [string, string][] = [
    ["Per-building rate", e.rate ? usd(e.rate) : "—"],
    [`Benchmarking subtotal (${e.buildings})`, usd(e.benchmarking)],
    [`Verification subtotal (${e.verifications})`, usd(e.verification)],
  ];
  return (
    <section aria-labelledby="est-h" className="rounded-xl bg-background p-7 md:p-10">
      <h2 id="est-h">Portfolio estimate</h2>
      <p className="mb-8 mt-3 text-muted-foreground">Enter your building count to see the total and the deposit.</p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="est-b">Number of buildings</Label>
            <Input id="est-b" type="number" inputMode="numeric" min={1} value={b} onChange={(x) => setB(x.target.value)} className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="est-v">Number needing verification this year</Label>
            <Input id="est-v" type="number" inputMode="numeric" min={0} value={v} onChange={(x) => setV(x.target.value)} className="h-11" />
            <p className="text-xs text-muted-foreground">Required when the City calls for it. We'll confirm whether your building needs it.</p>
          </div>
        </div>
        <div aria-live="polite">
          <dl className="divide-y overflow-hidden rounded-lg border bg-card">
            {rows.map(([k, val]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{val}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold text-primary">{usd(e.total)}</dd>
            </div>
            <div className="flex justify-between gap-4 bg-primary px-4 py-3 text-sm text-primary-foreground">
              <dt className="font-medium">50% deposit at signing</dt>
              <dd className="font-semibold">{usd(e.deposit)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Estimates only. Your free check confirms exactly what each building needs.</p>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const VERIF_AUDIT = [
    { t: "Licensed verification", p: usd(PRICING.verification), u: "per building, when due", d: "Required when the City calls for it. We'll confirm whether your building needs it. Completed by a Michigan-licensed engineering partner, arranged and coordinated by us." },
    { t: "Level 1 energy audit", p: `from ${usd(PRICING.auditLevel1From)}`, u: "optional", d: "A walk-through of the building with a list of low-cost ways to cut energy use." },
    { t: "Level 2 energy audit", p: `from ${usd(PRICING.auditLevel2From)}`, u: "optional", d: "A detailed savings study, delivered with a partner engineering firm." },
  ];
  return (
    <>
      <PageIntro photo="market" title="Simple, per-building pricing">
        Flat fees for Detroit energy and water reporting. Billing is 50% at signing and 50% when your filing is submitted. The compliance check is free.
      </PageIntro>

      {/* Tiers */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[14px] font-bold uppercase tracking-wider text-primary">Annual benchmarking and filing</p>
            <h2 className="mt-3">The more buildings, the lower the rate</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRICING.tiers.map((t, i) => (
              <div key={t.label} className={`rounded-xl p-8 text-center ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                <p className="font-display text-lg font-bold">{t.label}</p>
                <p className={`tnum mt-3 font-display text-6xl font-extrabold ${i === 0 ? "" : "text-primary"}`}>{usd(t.rate)}</p>
                <p className={i === 0 ? "mt-2 text-primary-foreground/90" : "mt-2 text-muted-foreground"}>per building, per year</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="section-y bg-card">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2>Every filing includes</h2>
            <ul className="mt-6 space-y-3">
              {INCLUDED.map((i) => (
                <li key={i} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />{i}</li>
              ))}
            </ul>
            <Button asChild variant="cta" size="xl" className="mt-8"><Link to="/free-check">Get a free compliance check</Link></Button>
          </div>
          <Photo name="penobscot" imgClassName="aspect-[4/5] rounded-xl object-[50%_20%]" note="Penobscot Building, downtown Detroit" />
        </div>
      </section>

      {/* Verification and audits */}
      <section className="section-y">
        <div className="container-page">
          <h2 className="text-center">Verification and audits</h2>
          <div className="mt-10 divide-y divide-hairline border-y border-hairline">
            {VERIF_AUDIT.map((r) => (
              <div key={r.t} className="grid gap-3 py-7 md:grid-cols-[15rem_minmax(0,1fr)_13rem] md:items-center md:gap-10">
                <h3 className="text-[22px]">{r.t}</h3>
                <p>{r.d}</p>
                <p className="md:text-right"><span className="tnum font-display text-3xl font-extrabold text-primary">{r.p}</span><span className="block text-[15px] text-muted-foreground">{r.u}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator + FAQ */}
      <section className="section-y bg-card">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Estimator />
          <div>
            <h2>Pricing questions</h2>
            <div className="mt-6">
              <FaqAccordion
                items={[
                  { q: "Why is verification separate?", a: "Verification is required when the City calls for it. We'll confirm whether your building needs it. A licensed engineer performs it, which is a separate professional service, so you only pay for it in the years it's due." },
                  { q: "Do you discount for multi-year agreements?", a: "Yes. Ask us." },
                  { q: "When do I pay?", a: "50% at signing and 50% when your filing is submitted." },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
