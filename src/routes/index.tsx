import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/site/blocks";
import { Photo } from "@/components/site/Photo";
import { QuickCheckForm } from "@/components/site/QuickCheckForm";
import { FAQS } from "@/components/site/content";
import { useDeadline } from "@/components/site/Deadline";
import { PRICING, usd } from "@/lib/rules";
import { LINKS, SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Detroit Energy Benchmarking Compliance | Lakeline Energy",
      description:
        "We file Detroit's energy and water benchmarking report for commercial and multifamily buildings of 25,000 square feet and up. Free compliance check.",
      path: "/",
    }),
  component: Home,
});

function DaysLeft() {
  const { days, label } = useDeadline();
  return (
    <span suppressHydrationWarning>
      <strong className="tnum">{days} days</strong> until the {label} deadline
    </span>
  );
}

const QUICK = [
  { to: "/free-check", label: "Free compliance check" },
  { to: "/am-i-covered", label: "Am I covered?" },
  { to: "/pricing", label: "See pricing" },
  { to: "/detroit-benchmarking-guide", label: "Read the Detroit guide" },
] as const;

const HOME_FAQ_QUESTIONS = ["Can't I do it myself?", "What do you need from me?", "Do my tenants need to do anything?", "How long does it take?"];

function Home() {
  const [t1, t2, t3] = PRICING.tiers;
  return (
    <>
      {/* Hero */}
      <section className="bg-background">
        <div className="container-page grid gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h1>
              Detroit energy benchmarking filings, <span className="text-primary">handled for you.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg">
              The Detroit benchmarking ordinance requires buildings of 25,000 square feet and up to report energy and water use every year. Lakeline collects the data, deals with the utilities and tenants, runs the data checks and files it with the City. One flat fee per building.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="xl"><Link to="/free-check">Get a free compliance check</Link></Button>
              <Button asChild variant="outlineBrand" size="xl" className="rounded-md"><Link to="/am-i-covered">Am I covered?</Link></Button>
            </div>
            <p className="mt-6 text-[15px] text-muted-foreground"><DaysLeft /></p>
            <p className="mt-3 text-[16px]">New to the ordinance? Read our <Link to="/detroit-benchmarking-guide" className="text-link">Detroit benchmarking guide</Link> or see <Link to="/how-it-works" className="text-link">how the filing process works</Link>.</p>
          </div>
          <Photo name="guardian" priority imgClassName="aspect-[4/3] rounded-xl" note="Guardian Building, downtown Detroit" />
        </div>
      </section>

      {/* Get started band */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-10">
          <h2>Get started here</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map((q) => (
              <Button key={q.to} asChild variant="onDark" size="xl"><Link to={q.to}>{q.label}</Link></Button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-y">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-[14px] font-bold uppercase tracking-wider text-primary">Detroit Energy and Water Benchmarking Ordinance</p>
            <h2 className="mt-3">What Detroit building owners need to know</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The City's list from September 2025 has about 2,900 covered buildings, and about 1 in 5 is marked compliant. Source: City of Detroit open data.
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div className="border-t-4 border-primary pt-5">
              <h3>Who has to report</h3>
              <p className="mt-2">Privately owned commercial and multifamily buildings of 25,000 sq ft or more, and city-owned buildings of 10,000 sq ft or more.</p>
              <a href={LINKS.dbidLookup} target="_blank" rel="noopener noreferrer" className="text-link mt-3 inline-block">Look up your Detroit Building ID</a>
            </div>
            <div className="border-t-4 border-primary pt-5">
              <h3>When it's due</h3>
              <p className="mt-2">The June 1 deadline repeats every year. Each report covers the previous calendar year, January through December, of electricity, gas, steam and water use.</p>
            </div>
            <div className="border-t-4 border-primary pt-5">
              <h3>What happens if you don't file</h3>
              <p className="mt-2">Right now the City is in an amnesty period and isn't issuing fines. But every covered building's compliance status is on the City's public map, updated weekly, and lenders, buyers and tenants check it. Fines are expected once the amnesty ends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we handle */}
      <section className="section-y bg-card">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo name="freePress" imgClassName="aspect-[4/3] rounded-xl" note="Free Press Building, now apartments" />
          <div>
            <h2>End-to-end benchmarking compliance</h2>
            <p className="mt-4">You send us a few documents. We handle everything else, from the first utility request to the City's confirmation.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Utility data from DTE Energy, Constellation, Detroit Thermal and DWSD",
                "Tenant consent forms prepared and followed up",
                "ENERGY STAR Portfolio Manager setup or cleanup, with your Detroit Building ID",
                "Data quality checks before anything is submitted",
                "Submission to the City, confirmation saved, one-page summary sent to you",
              ].map((t) => (
                <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />{t}</li>
              ))}
            </ul>
            <Button asChild variant="cta" size="xl" className="mt-8"><Link to="/how-it-works">How it works</Link></Button>
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="lg:order-2">
            <Photo name="midtown" imgClassName="aspect-[4/3] rounded-xl" note="Mixed-use building, Woodward at Charlotte" />
          </div>
          <div>
            <h2>Built for property managers and owners</h2>
            <p className="mt-4">
              Office buildings, apartment buildings, retail, warehouses, medical offices, churches, schools and nonprofits. One point of contact for your whole portfolio, and a flat price for each building before you sign.
            </p>
            <p className="mt-4">Get your information to us by April 1 and we'll file before June 1.</p>
            <Button asChild variant="cta" size="xl" className="mt-8"><Link to="/free-check">Request a free check</Link></Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-y bg-card">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Flat-fee pricing</h2>
            <p className="mt-4 text-lg text-muted-foreground">Billing is 50% at signing and 50% when your filing is submitted.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["1 to 4 buildings", t1!.rate],
              ["5 to 19 buildings", t2!.rate],
              ["20 or more buildings", t3!.rate],
            ].map(([l, r]) => (
              <div key={l as string} className="rounded-xl bg-background p-8 text-center">
                <p className="font-display font-bold">{l}</p>
                <p className="tnum mt-3 font-display text-5xl font-extrabold text-primary">{usd(r as number)}</p>
                <p className="mt-2 text-muted-foreground">per building, per year</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center">
            Energy audits from {usd(PRICING.auditLevel1From)} ·{" "}
            <Link to="/pricing" className="text-link">Full pricing and estimate</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="container-page max-w-[860px]">
          <h2 className="mb-8 text-center">Frequently asked questions</h2>
          <FaqAccordion items={HOME_FAQ_QUESTIONS.flatMap((q) => FAQS.find((f) => f.q === q) ?? [])} />
          <p className="mt-6 text-center"><Link to="/faq" className="text-link">All questions</Link></p>
        </div>
      </section>

      {/* Form */}
      <section id="check" className="bg-primary text-primary-foreground">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
          <div>
            <h2>Request a free compliance check</h2>
            <p className="mt-4 text-primary-foreground/90">Send us the building address. We reply within one business day with whether it's covered, what's missing and a flat price.</p>
            <p className="mt-6 font-semibold">Call {SITE.phone}<br />{SITE.email}</p>
          </div>
          <QuickCheckForm />
        </div>
      </section>
    </>
  );
}
