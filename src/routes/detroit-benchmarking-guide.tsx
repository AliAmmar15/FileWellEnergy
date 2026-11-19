import { createFileRoute, Link } from "@tanstack/react-router";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CtaBand, FaqAccordion } from "@/components/site/blocks";
import { FAQS } from "@/components/site/content";
import { guideUpdatedLabel, LINKS, SITE } from "@/lib/site";
import { articleSchema, faqSchema, seo } from "@/lib/seo";

const TITLE = "Detroit Benchmarking Ordinance: A Plain-English Guide to Energy and Water Reporting";
const DESC = "Plain-English guide to the Detroit benchmarking ordinance: who's covered, the June 1 deadline, Detroit Building ID and ENERGY STAR Portfolio Manager.";

/** Visible FAQ on the guide; the same text feeds the FAQPage JSON-LD. */
const GUIDE_FAQ_QUESTIONS = [
  "What happens if I don't file?",
  "Do my tenants need to do anything?",
  "What's a Detroit Building ID?",
  "Does someone have to sign off on my data?",
  "Can my building be exempt?",
  "How long does it take?",
];
const GUIDE_FAQ = GUIDE_FAQ_QUESTIONS.map((q) => FAQS.find((f) => f.q === q)!).filter(Boolean);

export const Route = createFileRoute("/detroit-benchmarking-guide")({
  head: () =>
    seo({
      title: "Detroit Benchmarking Ordinance Guide | Lakeline Energy",
      description: DESC,
      path: "/detroit-benchmarking-guide",
      crumb: "Detroit Benchmarking Guide",
      jsonLd: [
        articleSchema({ headline: TITLE, path: "/detroit-benchmarking-guide", dateModified: SITE.guideUpdatedISO, description: DESC }),
        faqSchema(GUIDE_FAQ.map((f) => ({ q: f.q, a: String(f.a) }))),
      ],
    }),
  component: Guide,
});

const TOC = [
  ["requires", "What the ordinance requires"],
  ["covered", "Which buildings are covered"],
  ["exemptions", "Exemptions"],
  ["deadlines", "Deadlines"],
  ["data", "What data you need"],
  ["dbid", "How to find your Detroit Building ID"],
  ["portfolio-manager", "Using ENERGY STAR Portfolio Manager"],
  ["tenant-consent", "Tenant consent forms for DTE data"],
  ["noncompliance", "What happens if you don't comply"],
  ["diy", "Do it yourself vs. hire help"],
  ["faq", "Detroit benchmarking FAQ"],
  ["help", "How Lakeline can help"],
] as const;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function InlineCta() {
  return (
    <aside className="not-prose my-8 rounded-lg border-l-4 border-highlight bg-card p-5 lg:hidden">
      <p className="font-display font-semibold text-primary">Not sure where your building stands?</p>
      <p className="mt-1 text-sm text-muted-foreground">Get a free compliance check within one business day.</p>
      <Button asChild variant="cta" className="mt-3 h-11 px-5"><Link to="/free-check">Get a free check</Link></Button>
    </aside>
  );
}

/** Closing line for a guide section: descriptive internal links to pricing and the free check. */
function Next({ children }: { children: ReactNode }) {
  return <p className="rounded-lg bg-card p-4 text-[16px]">{children}</p>;
}

function S({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`}><span id={id} />{title}</h2>
      {children}
    </section>
  );
}

function Guide() {
  return (
    <>
      <header className="border-b bg-card">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow mb-3">Detroit Benchmarking Guide</p>
          <h1 className="max-w-4xl text-4xl font-bold md:text-5xl">{TITLE}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {guideUpdatedLabel}</p>
          <p className="mt-3 max-w-2xl rounded-lg bg-muted p-3 text-sm">This guide is general information, not legal advice. Confirm current requirements with the City of Detroit.</p>
        </div>
      </header>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_18rem]">
        <article className="prose-guide min-w-0 max-w-3xl text-foreground">
          <nav aria-label="Table of contents" className="not-prose mb-10 rounded-xl bg-card p-6">
            <h2 className="!mt-0 !mb-3 !text-lg">On this page</h2>
            <ol>
              {TOC.map(([id, t]) => (
                <li key={id}><a href={`#${id}`}>{t}</a></li>
              ))}
            </ol>
          </nav>

          <S id="requires" title="What the ordinance requires">
            <p>Detroit's Energy and Water Benchmarking Ordinance asks owners of larger buildings to measure and report how much energy and water their building uses each year. The idea is simple: what gets measured can be compared, and what can be compared can be improved.</p>
            <p>In practice, that means each covered building must gather a full year of utility data, enter it into the U.S. EPA's free ENERGY STAR Portfolio Manager tool, and submit the results to the City. No outside professional sign-off is required: Portfolio Manager's automatic data verification checks your data as you go.</p>
            <p>The City's public dataset (Sept 2025) lists about 2,900 covered buildings, with only about 1 in 5 marked compliant (Source: City of Detroit open data). If you haven't filed yet, you're far from alone — but it's worth getting ahead of. The City's own page is the best place to confirm details: <a href={LINKS.cityBenchmarking} {...ext}>detroitmi.gov/benchmarking</a>.</p>
            <p>Each building's compliance status, size and age are published on the City's public transparency map, so you can see how your building (and your neighbors) appear.</p>
            <Next>Want this handled for you? See our <Link to="/pricing">flat per-building Detroit benchmarking pricing</Link> or request a <Link to="/free-check">free benchmarking compliance check</Link>.</Next>
          </S>

          <S id="covered" title="Which buildings are covered">
            <p>The Detroit benchmarking ordinance applies to:</p>
            <ul>
              <li><strong>Privately owned commercial and multifamily buildings of 25,000 square feet or more.</strong> That includes offices, apartment buildings, retail, warehouses, medical office buildings, and larger churches and nonprofit buildings.</li>
              <li><strong>City-owned buildings of 10,000 square feet or more.</strong></li>
            </ul>
            <p>Square footage means gross floor area, not counting parking. If you're unsure, try our <Link to="/am-i-covered">Am I covered? tool</Link> for a quick estimate.</p>
            <Next>Check your building with the <Link to="/am-i-covered">Am I covered? tool</Link>, then <Link to="/free-check">get a free compliance check</Link> to confirm. Our <Link to="/pricing">pricing</Link> is the same flat fee for every covered building in a tier.</Next>
          </S>
          <InlineCta />

          <S id="exemptions" title="Exemptions">
            <p>Buildings that are vacant, slated for demolition or under 25,000 sq ft may qualify for a whole-building exemption. Buildings with water or energy shutoffs in the past year may qualify for a data exemption. Owners request exemptions through the City's form, and we can help.</p>
            <Next>Think your building qualifies? Send it through our <Link to="/free-check">free compliance check</Link> and we'll tell you what applies. See <Link to="/pricing">benchmarking pricing</Link> for filing costs.</Next>
          </S>

          <S id="deadlines" title="Deadlines">
            <p>Reports are due <strong>June 1 every year</strong> and cover the previous calendar year. For example, the June 1, 2027 filing covers January–December 2026 data.</p>
            <p>Because utilities and tenants can take weeks to respond, we recommend having your information gathered by April 1. That leaves room to fix any data issues before the June 1 deadline for Detroit energy benchmarking.</p>
            <Next>See <Link to="/how-it-works">how our Detroit benchmarking filing process works</Link> and what we need from you by April 1, or <Link to="/free-check">start with a free check</Link>.</Next>
          </S>

          <S id="data" title="What data you need">
            <p>You'll need 12 months (January through December) of whole-building data for each energy and water source the building uses:</p>
            <ul>
              <li><strong>Electricity</strong> — usually DTE Energy.</li>
              <li><strong>Natural gas</strong> — DTE Energy or Constellation.</li>
              <li><strong>Steam</strong> — Detroit Thermal, if the building uses district steam.</li>
              <li><strong>Water</strong> — the Detroit Water and Sewerage Department (DWSD). Water is usually billed in thousand gallons, so match the unit on your bill when you enter it.</li>
            </ul>
            <p>Automating DTE data through the Energy Data Hub starts with joining the Detroit 2030 District; you can also enter 12 months of bills manually.</p>
            <p>You'll also need building basics: address, year built, gross floor area excluding parking, occupancy and how the space is used.</p>
            <Next>We request this data from the utilities for you. Learn <Link to="/how-it-works">how the process works</Link> or see <Link to="/pricing">what it costs per building</Link>.</Next>
          </S>
          <InlineCta />

          <S id="dbid" title="How to find your Detroit Building ID">
            <p>The Detroit Building ID (DBID) is the City's unique ID for your building. It's entered in Portfolio Manager so the City can match your report to the right property. Without it, your submission may not count.</p>
            <p>You can look up your building's ID with the City's tool: <a href={LINKS.dbidLookup} {...ext}>Detroit Building ID lookup</a>. Search by address and note the ID for each building you own or manage.</p>
            <Next>We look up and enter the Detroit Building ID for every building. <Link to="/free-check">Request a free compliance check</Link> and we'll confirm yours.</Next>
          </S>

          <S id="portfolio-manager" title="Using ENERGY STAR Portfolio Manager">
            <p><a href={LINKS.portfolioManager} {...ext}>ENERGY STAR Portfolio Manager</a> is the EPA's free online tool for tracking building energy and water use. At a high level, benchmarking in Portfolio Manager looks like this:</p>
            <ol>
              <li>Create an account and add the property, with its floor area and use type.</li>
              <li>Enter the Detroit Building ID in the property's details.</li>
              <li>Add a meter for each utility and enter (or connect) 12 months of data.</li>
              <li>Run the built-in data quality checker and fix any gaps or outliers.</li>
              <li>Share the property with the City: search for the username "DetroitSustainability" (it appears as "Detroit Benchmarking Reporting"), then share with Bulk Sharing and Exchange Data Full Access.</li>
            </ol>
            <p>For many Detroit property managers, the trickiest part of using ENERGY STAR Portfolio Manager is not the tool itself — it's getting clean, complete data into it.</p>
            <Next>We set up or clean up your ENERGY STAR Portfolio Manager account as part of every filing — see <Link to="/pricing">what's included in each flat fee</Link>.</Next>
          </S>
          <InlineCta />

          <S id="tenant-consent" title="Tenant consent forms for DTE whole-building data">
            <p>DTE can provide whole-building, aggregated data so you don't need every tenant's individual bill. But if tenants pay their own utilities and the building has <strong>fewer than five tenants</strong>, DTE needs each tenant's signed consent before it releases the data.</p>
            <p>Collecting those forms — and following up on them — is often the slowest step. Plan for it early.</p>
            <Next>We prepare the DTE consent forms and follow up until they're signed. See the <Link to="/how-it-works">full filing process</Link> or <Link to="/free-check">get a free check</Link>.</Next>
          </S>

          <S id="noncompliance" title="What happens if you don't comply">
            <p>Right now the City is in an amnesty period and isn't issuing fines. But every covered building's compliance status is on the City's public map, updated weekly, and lenders, buyers and tenants check it. Fines are expected once the amnesty ends. Filing each year keeps your building in good standing on that map.</p>
            <Next>Stay in good standing with <Link to="/pricing">affordable annual benchmarking compliance</Link>, or <Link to="/free-check">find out where your building stands</Link> for free.</Next>
          </S>

          <S id="diy" title="Do it yourself vs. hire help">
            <p>To be fair: you can absolutely do this yourself. Portfolio Manager is free, and the City publishes guidance. If you manage one building with a single utility account and no tenant-paid utilities, a careful afternoon or two may be enough.</p>
            <p>Most managers hire help when they have several buildings, tenant-paid utilities, or steam service. Collecting utility data and tenant forms takes time, and mistakes can mean refiling. A service like ours trades a flat fee for that time and risk.</p>
            <Next>Compare the options: <Link to="/pricing">our flat per-building pricing</Link> against your own time, or ask for a <Link to="/free-check">free compliance check</Link> first.</Next>
          </S>

          <S id="faq" title="Detroit benchmarking FAQ">
            <FaqAccordion items={GUIDE_FAQ} />
            <Next>More questions? Read the full <Link to="/faq">Detroit benchmarking ordinance FAQ</Link> or <Link to="/contact">contact Lakeline Energy</Link>.</Next>
          </S>

          <S id="help" title="How Lakeline can help">
            <p>Lakeline handles benchmarking compliance in Detroit end to end: collecting 12 months of utility and water data, chasing tenant consent forms, setting up and cleaning up Portfolio Manager, running Portfolio Manager's data quality checks on every building, submitting to the City and sending you a one-page summary.</p>
            <p>Pricing is flat and per building — see <Link to="/pricing">our pricing</Link>. Start with a <Link to="/free-check">free compliance check</Link> and we'll tell you exactly where your building stands.</p>
            <h3>Official sources</h3>
            <ul>
              <li><a href={LINKS.cityBenchmarking} {...ext}>City of Detroit — Benchmarking</a></li>
              <li><a href={LINKS.dbidLookup} {...ext}>Detroit Building ID lookup</a></li>
              <li><a href={LINKS.portfolioManager} {...ext}>ENERGY STAR Portfolio Manager</a></li>
            </ul>
          </S>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-32 rounded-xl bg-card p-6">
            <p className="eyebrow mb-2">Free</p>
            <h2 className="text-xl font-bold">Free compliance check</h2>
            <p className="mt-2 text-sm text-muted-foreground">We'll confirm whether you're covered, whether you've filed, what's needed and a flat price — within one business day.</p>
            <Button asChild variant="cta" className="mt-5 h-11 w-full"><Link to="/free-check">Get my free check</Link></Button>
          </div>
        </aside>
      </div>
      <CtaBand />
    </>
  );
}
