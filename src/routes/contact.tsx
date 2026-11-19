import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { Field, Honeypot, inputClass } from "@/components/site/fields";
import { contactSchema, submitContactMessage } from "@/lib/forms.functions";
import { SITE } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Lakeline Energy — Detroit Benchmarking Help",
      description: "Questions about Detroit energy benchmarking? Call, email or send a message. We reply within one business day.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(f);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      document.getElementById(`c-${Object.keys(errs)[0] ?? ""}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await submitContactMessage({ data: f });
      if (res.ok) setStatus("done");
      else { setStatus("error"); setServerError(res.error); }
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again or email us.");
    }
  };
  const a = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `c-${k}-err` : undefined });

  return (
    <>
      <PageIntro photo="midtown" eyebrow="Contact" title="Talk to Lakeline">We reply within one business day.</PageIntro>
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-5">
          <ul className="space-y-4 rounded-xl bg-card p-6">
            <li className="flex gap-3"><Phone className="h-5 w-5 text-teal" aria-hidden="true" />{SITE.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-teal" aria-hidden="true" />{SITE.email}</li>
            <li className="flex gap-3"><Clock className="h-5 w-5 text-teal" aria-hidden="true" />We reply within one business day</li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-teal" aria-hidden="true" />City of Detroit first; also Ann Arbor, Indianapolis, Columbus, Chicago, Kansas City, St. Louis, Milwaukee and Minneapolis.</li>
          </ul>
          <div className="rounded-lg bg-card p-6">
            <h2 className="text-lg font-semibold">Want to know where your building stands?</h2>
            <p className="mt-1 text-sm">Our free compliance check answers it within one business day.</p>
            <Button asChild variant="cta" className="mt-4 h-11 px-5"><Link to="/free-check">Get a free check</Link></Button>
          </div>
        </div>
        {status === "done" ? (
          <div className="rounded-lg border-2 border-success bg-card p-8" role="status">
            <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Message sent</h2>
            <p className="mt-2">Thanks — we'll reply within one business day.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="relative grid gap-5 rounded-xl bg-card p-6 md:grid-cols-2 md:p-8">
            <Honeypot value={f.website} onChange={set("website")} />
            <Field id="c-name" label="Name" required error={errors["name"]}>
              <input id="c-name" autoComplete="name" className={inputClass} value={f.name} onChange={(e) => set("name")(e.target.value)} {...a("name")} />
            </Field>
            <Field id="c-email" label="Email" required error={errors["email"]}>
              <input id="c-email" type="email" autoComplete="email" className={inputClass} value={f.email} onChange={(e) => set("email")(e.target.value)} {...a("email")} />
            </Field>
            <Field id="c-phone" label="Phone" className="md:col-span-2">
              <input id="c-phone" type="tel" autoComplete="tel" className={inputClass} value={f.phone} onChange={(e) => set("phone")(e.target.value)} />
            </Field>
            <Field id="c-message" label="Message" required error={errors["message"]} className="md:col-span-2">
              <textarea id="c-message" rows={5} className={inputClass} value={f.message} onChange={(e) => set("message")(e.target.value)} {...a("message")} />
            </Field>
            {status === "error" && <p className="text-sm text-destructive md:col-span-2" role="alert">{serverError}</p>}
            <div className="md:col-span-2">
              <Button type="submit" variant="cta" size="xl" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</Button>
            </div>
          </form>
        )}
      </section>
      <CtaBand />
    </>
  );
}
