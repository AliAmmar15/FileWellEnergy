import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand, FaqAccordion, PageIntro } from "@/components/site/blocks";
import { FAQ_TEXT, FAQS } from "@/components/site/content";
import { faqSchema, seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: "Detroit Benchmarking Ordinance FAQ | Lakeline Energy",
      description:
        "Answers about the Detroit benchmarking ordinance: who's covered, the June 1 deadline, Detroit Building ID, tenant consent forms and costs.",
      path: "/faq",
      crumb: "FAQ",
      jsonLd: [faqSchema(FAQS.map((f) => ({ q: f.q, a: FAQ_TEXT[f.q] ?? String(f.a) })))],
    }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageIntro photo="penobscot" eyebrow="FAQ" title="Detroit energy benchmarking questions, answered">
        Plain answers about the Detroit benchmarking ordinance and how we help. For the full background, read our <Link to="/detroit-benchmarking-guide" className="text-link">Detroit benchmarking guide</Link> or see <Link to="/pricing" className="text-link">pricing</Link>.
      </PageIntro>
      <section className="container-page max-w-3xl py-16">
        <FaqAccordion items={FAQS} />
      </section>
      <CtaBand />
    </>
  );
}
