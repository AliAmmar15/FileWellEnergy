import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { Photo } from "@/components/site/Photo";
import { STEPS } from "@/components/site/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seo({
      title: "How Our Detroit Benchmarking Service Works | Lakeline Energy",
      description:
        "Six steps from free check to filed: utility data, tenant consents, ENERGY STAR Portfolio Manager setup, licensed verification and submission before the June 1 Detroit deadline.",
      path: "/how-it-works",
    }),
  component: HowItWorks,
});

const CHECKLIST = [
  "Signed agreement and 50% deposit",
  "Owner authorization letter",
  "Building basics: address, year built, gross floor area excluding parking, occupancy",
  "How the space is used",
  "Utility account and meter numbers",
  "January to December utility bills, or online account access",
  "Tenant list, if tenants pay their own utilities",
  "Any existing Portfolio Manager login",
];

const YEAR = [
  ["Nov to Feb", "Sign up"],
  ["By April 1", "Your data in"],
  ["April to May", "We file"],
  ["June 1", "Deadline"],
  ["Summer", "Optional audits"],
];

function HowItWorks() {
  return (
    <>
      <PageIntro photo="fisher" title="How Lakeline handles your benchmarking">
        One agreement, one point of contact, and a filing submitted to the City before the June 1 benchmarking deadline in Detroit.
      </PageIntro>

      {/* Steps */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[14px] font-bold uppercase tracking-wider text-primary">Six steps</p>
            <h2 className="mt-3">From first email to the City's confirmation</h2>
          </div>
          <ol className="mt-12 divide-y divide-hairline border-y border-hairline">
            {STEPS.map((s, i) => (
              <li key={s.title} className="grid gap-4 py-8 md:grid-cols-[5rem_minmax(0,1.4fr)_minmax(0,1fr)] md:gap-8">
                <span className="font-display text-5xl font-extrabold leading-none text-primary tnum">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[22px]">{s.title}</h3>
                  <p className="mt-2">{s.long}</p>
                </div>
                <div className="border-l-4 border-primary pl-5">
                  <p className="font-display text-[13px] font-bold uppercase tracking-wide text-primary">What we need from you</p>
                  <p className="mt-1">{s.need}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Checklist with photo */}
      <section id="checklist" className="section-y bg-card">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo name="warehouse" imgClassName="aspect-[4/3] rounded-xl" note="Warehouses over 25,000 sq ft report too" />
          <div>
            <h2>What we need from you</h2>
            <p className="mt-4">You can usually send all of this in one email. If something is missing, we tell you exactly what and where to find it.</p>
            <ul className="mt-6 space-y-3">
              {CHECKLIST.map((c) => (
                <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Year */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2>The Detroit benchmarking year</h2>
            <p className="mt-4 text-lg text-muted-foreground">Get your information to us by April 1 and we'll handle the rest before June 1.</p>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-hairline sm:grid-cols-5">
            {YEAR.map(([when, what]) => {
              const due = when === "June 1";
              return (
                <li key={when} className={due ? "bg-primary p-6 text-primary-foreground" : "bg-background p-6"}>
                  <p className={`font-display text-xl font-extrabold ${due ? "" : "text-primary"}`}>{when}</p>
                  <p className="mt-1">{what}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 text-center">
            <Button asChild variant="cta" size="xl"><Link to="/free-check">Start with a free check</Link></Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
