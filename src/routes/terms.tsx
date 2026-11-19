import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms of Use | Lakeline Energy", description: "Terms for using the Lakeline Energy website and its Detroit benchmarking information.", path: "/terms", crumb: "Terms of Use" }),
  component: () => (
    <>
      <PageIntro photo={null} title="Terms of Use">[Have an attorney review]</PageIntro>
      <section className="container-page prose-guide max-w-3xl py-16">
        <p>By using this website you agree to these terms. Content on this site, including the Detroit Benchmarking Guide and the Am I Covered? tool, is general information and not legal advice. Confirm current requirements with the City of Detroit.</p>
        <h2>Services</h2>
        <p>Services are provided under a separate written agreement with {SITE.legalName}.</p>
        <h2>No affiliation</h2>
        <p>Lakeline Energy is not affiliated with the City of Detroit or the U.S. EPA. ENERGY STAR® is a registered mark of the U.S. EPA.</p>
        <h2>Contact</h2>
        <p>Questions? Email {SITE.email}.</p>
      </section>
      <CtaBand />
    </>
  ),
});
