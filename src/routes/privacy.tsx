import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo({ title: "Privacy Policy | Lakeline Energy", description: "How Lakeline Energy collects, uses and protects information submitted through this website.", path: "/privacy", crumb: "Privacy Policy" }),
  component: () => (
    <>
      <PageIntro photo={null} title="Privacy Policy">[Have an attorney review]</PageIntro>
      <section className="container-page prose-guide max-w-3xl py-16">
        <p>{SITE.legalName} ("we") collects the information you submit through our forms — such as your name, contact details and building information — to respond to your request and provide benchmarking services.</p>
        <h2>How we use information</h2>
        <p>We use your information only for benchmarking, your reports and communicating with you about your request. We do not sell your information.</p>
        <h2>Cookies and analytics</h2>
        <p>This site does not use tracking cookies. If enabled, we use privacy-friendly, cookie-free analytics.</p>
        <h2>Storage and security</h2>
        <p>Submissions are stored securely with access limited to our team.</p>
        <h2>Contact</h2>
        <p>Questions? Email {SITE.email}.</p>
      </section>
      <CtaBand />
    </>
  ),
});
