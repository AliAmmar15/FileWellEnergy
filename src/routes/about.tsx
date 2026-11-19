import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { Photo } from "@/components/site/Photo";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Lakeline Energy — Detroit Benchmarking Specialists",
      description:
        "Lakeline Energy is a Detroit company that makes the City's energy and water benchmarking requirement painless for property managers and building owners.",
      path: "/about",
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro photo="skyline" eyebrow="About" title="About Lakeline Energy" />
      <section className="container-page max-w-3xl space-y-5 py-16 text-lg leading-relaxed">
        {/* TODO: add a founder photo here (use a two-column layout: photo + text) */}
        <p>{SITE.founder} started Lakeline Energy in Detroit to make the City's benchmarking requirement painless for the people who manage our buildings.</p>
        <p>On paper the rule is simple. In practice it's one more deadline buried in portals, utility data and unfamiliar terms. Lakeline exists to take that off your plate: you send us what we need, we handle the filing, and you know the price before we start. We'd rather give you a straight answer than leave you guessing whether you're covered.</p>
        <p>We're based in Detroit and also serve other Midwest cities with benchmarking laws, including Ann Arbor, Indianapolis, Columbus, Chicago, Kansas City, St. Louis, Milwaukee and Minneapolis.</p>
      </section>

      <section className="section-y bg-card">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo name="midtown" imgClassName="aspect-[4/3] rounded-xl" note="Midtown Detroit" />
          <div>
            <h2>How we work</h2>
            <dl className="mt-6 space-y-5">
              {[
                ["Clear pricing", "Flat, per-building fees you know up front."],
                ["On-time filings", "Get your data to us by April 1 and we file before June 1."],
                ["Plain answers", "No jargon without an explanation."],
                ["Your data handled carefully", "Used only for what you hired us to do."],
              ].map(([t, d]) => (
                <div key={t} className="border-l-4 border-primary pl-5">
                  <dt className="font-display text-lg font-bold">{t}</dt>
                  <dd className="mt-1">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-page max-w-3xl py-16">
        <h2>How we handle your data</h2>
        <ul className="mt-5 space-y-3 text-lg">
          <li>Used only for benchmarking and your reports.</li>
          <li>Stored securely.</li>
          <li>Never sold.</li>
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
