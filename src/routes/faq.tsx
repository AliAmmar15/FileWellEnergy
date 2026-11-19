import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, FaqAccordion, PageIntro } from "@/components/site/blocks";
import { FAQ_TEXT, FAQS } from "@/components/site/content";
import { seo } from "@/lib/seo";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: FAQ_TEXT[f.q] ?? String(f.a) },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...seo({
      title: "Detroit Benchmarking Ordinance FAQ | Lakeline Energy",
      description:
        "Answers about the Detroit benchmarking ordinance: who's covered, the June 1 deadline, Detroit Building IDs, tenant consent forms, verification and costs.",
      path: "/faq",
    }),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageIntro photo="penobscot" eyebrow="FAQ" title="Detroit energy benchmarking questions, answered">
        Plain answers about the ordinance and how we help.
      </PageIntro>
      <section className="container-page max-w-3xl py-16">
        <FaqAccordion items={FAQS} />
      </section>
      <CtaBand />
    </>
  );
}
