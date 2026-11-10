import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/blocks";
import { Field, Honeypot, inputClass, Select } from "@/components/site/fields";
import { SampleCheckCard } from "@/components/site/SampleCheckCard";
import { complianceCheckSchema, submitComplianceCheck } from "@/lib/forms.functions";
import { LINKS, UTM_KEY } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/free-check")({
  validateSearch: (s: Record<string, unknown>): { sqft?: string } =>
    typeof s["sqft"] === "string" || typeof s["sqft"] === "number" ? { sqft: String(s["sqft"]).replace(/[^0-9]/g, "").slice(0, 9) } : {},
  head: () =>
    seo({
      title: "Free Detroit Benchmarking Compliance Check | Filewell Energy",
      description:
        "Find out in one business day whether your Detroit building is covered, whether it's filed, what's needed and a flat price. Free, no obligation.",
      path: "/free-check",
    }),
  component: FreeCheck,
});

type Form = {
  name: string; company: string; role: string; email: string; phone: string; building_count: string;
  addresses: string; square_footage: string; tenants_pay_utilities: string; filed_before: string;
  dbids: string; notes: string; consent: boolean; website: string;
};

function FreeCheck() {
  const { sqft } = Route.useSearch();
  const [f, setF] = useState<Form>({
    name: "", company: "", role: "", email: "", phone: "", building_count: "", addresses: "",
    square_footage: sqft ? `${Number(sqft).toLocaleString("en-US")} sq ft` : "", tenants_pay_utilities: "",
    filed_before: "", dbids: "", notes: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const set = <K extends keyof Form>(k: K) => (v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let utm: Record<string, string> = {};
    try { utm = JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}") ?? {}; } catch { /* ignore */ }
    const payload = { ...f, source_page: "/free-check", utm_source: utm["utm_source"] ?? "", utm_medium: utm["utm_medium"] ?? "", utm_campaign: utm["utm_campaign"] ?? "" };
    const parsed = complianceCheckSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0] ?? "")?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await submitComplianceCheck({ data: payload });
      if (res.ok) { setStatus("done"); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else { setStatus("error"); setServerError(res.error); }
    } catch {
      setStatus("error");
      setServerError("Something went wrong. Please try again or email us.");
    }
  };

  const err = (k: string) => errors[k];
  const aria = (k: string) => ({ "aria-invalid": !!err(k), "aria-describedby": err(k) ? `${k}-err` : undefined });

  return (
    <>
      <PageIntro photo="guardian" eyebrow="Free compliance check" title="Get your free compliance check">
        Tell us about your building(s). Within one business day, we'll send a one-page check showing whether you're covered, whether you've filed, what's needed and a flat price.
      </PageIntro>
      <section className="container-page grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr]">
        {status === "done" ? (
          <div className="rounded-lg border-2 border-success bg-card p-8" role="status">
            <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Request received</h2>
            <p className="mt-3 text-lg">
              Thanks — we'll send your check within one business day. Want to speed it up? Look up your Detroit Building ID{" "}
              <a href={LINKS.dbidLookup} target="_blank" rel="noopener noreferrer" className="text-link">here</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="relative grid gap-5 rounded-xl bg-card p-6 md:grid-cols-2 md:p-8">
            <Honeypot value={f.website} onChange={set("website")} />
            <Field id="name" label="Your name" required error={err("name")}>
              <input id="name" autoComplete="name" className={inputClass} value={f.name} onChange={(e) => set("name")(e.target.value)} {...aria("name")} />
            </Field>
            <Field id="company" label="Company / management company">
              <input id="company" autoComplete="organization" className={inputClass} value={f.company} onChange={(e) => set("company")(e.target.value)} />
            </Field>
            <Field id="role" label="Role">
              <Select id="role" value={f.role} onChange={set("role")} options={["Owner", "Property manager", "Asset manager", "Attorney", "Broker", "Other"]} />
            </Field>
            <Field id="email" label="Email" required error={err("email")}>
              <input id="email" type="email" autoComplete="email" className={inputClass} value={f.email} onChange={(e) => set("email")(e.target.value)} {...aria("email")} />
            </Field>
            <Field id="phone" label="Phone">
              <input id="phone" type="tel" autoComplete="tel" className={inputClass} value={f.phone} onChange={(e) => set("phone")(e.target.value)} />
            </Field>
            <Field id="building_count" label="Number of buildings" required error={err("building_count")}>
              <input id="building_count" type="number" min={1} inputMode="numeric" className={inputClass} value={f.building_count} onChange={(e) => set("building_count")(e.target.value)} {...aria("building_count")} />
            </Field>
            <Field id="addresses" label="Building address(es)" required hint="One per line." error={err("addresses")} className="md:col-span-2">
              <textarea id="addresses" rows={4} className={inputClass} value={f.addresses} onChange={(e) => set("addresses")(e.target.value)} {...aria("addresses")} />
            </Field>
            <Field id="square_footage" label="Approx. square footage per building" className="md:col-span-2">
              <input id="square_footage" className={inputClass} value={f.square_footage} onChange={(e) => set("square_footage")(e.target.value)} />
            </Field>
            <Field id="tenants_pay_utilities" label="Do tenants pay their own utilities?">
              <Select id="tenants_pay_utilities" value={f.tenants_pay_utilities} onChange={set("tenants_pay_utilities")} options={["Yes", "No", "Mixed", "Not sure"]} />
            </Field>
            <Field id="filed_before" label="Have you filed before?">
              <Select id="filed_before" value={f.filed_before} onChange={set("filed_before")} options={["Yes", "No", "Not sure"]} />
            </Field>
            <Field id="dbids" label="Detroit Building ID(s), if known" className="md:col-span-2">
              <input id="dbids" className={inputClass} value={f.dbids} onChange={(e) => set("dbids")(e.target.value)} />
            </Field>
            <Field id="notes" label="Anything else we should know?" className="md:col-span-2">
              <textarea id="notes" rows={3} className={inputClass} value={f.notes} onChange={(e) => set("notes")(e.target.value)} />
            </Field>
            <div className="md:col-span-2">
              <label className="flex items-start gap-3 text-sm">
                <input id="consent" type="checkbox" className="mt-0.5 h-5 w-5 accent-primary" checked={f.consent} onChange={(e) => set("consent")(e.target.checked)} {...aria("consent")} />
                <span>I agree Filewell Energy may contact me about this request. <span className="text-destructive" aria-hidden="true">*</span></span>
              </label>
              {err("consent") && <p id="consent-err" className="mt-1 text-sm text-destructive" role="alert">{err("consent")}</p>}
            </div>
            {status === "error" && <p className="text-sm text-destructive md:col-span-2" role="alert">{serverError}</p>}
            <div className="md:col-span-2">
              <Button type="submit" variant="cta" size="xl" className="w-full sm:w-auto" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Get my free check"}
              </Button>
            </div>
          </form>
        )}
        <aside className="space-y-5">
          <h2 className="text-xl font-bold">What you'll get</h2>
          <SampleCheckCard />
          <p className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-5 w-5 text-teal" aria-hidden="true" />No obligation. No spam.</p>
        </aside>
      </section>
    </>
  );
}
