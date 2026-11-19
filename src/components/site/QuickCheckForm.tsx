import { useState } from "react";
import { Button } from "@/components/ui/button";
import { complianceCheckSchema, submitComplianceCheck } from "@/lib/forms.functions";
import { UTM_KEY } from "@/lib/site";
import { Honeypot } from "./fields";

const input = "min-h-11 w-full rounded-md border border-hairline bg-background px-3 py-2 text-base text-foreground focus-visible:outline-3 focus-visible:outline-highlight";

type F = { name: string; email: string; company: string; building_count: string; addresses: string; consent: boolean; website: string };

/** Short free-check form for the homepage band (white inputs on deep teal). */
export function QuickCheckForm() {
  const [f, setF] = useState<F>({ name: "", email: "", company: "", building_count: "", addresses: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: k === "consent" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    let utm: Record<string, string> = {};
    try { utm = JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}") ?? {}; } catch { /* ignore */ }
    const payload = {
      ...f, role: "", phone: "", square_footage: "", tenants_pay_utilities: "", filed_before: "", dbids: "", notes: "",
      source_page: "/", utm_source: utm["utm_source"] ?? "", utm_medium: utm["utm_medium"] ?? "", utm_campaign: utm["utm_campaign"] ?? "",
    };
    const parsed = complianceCheckSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      document.getElementById(`q-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await submitComplianceCheck({ data: payload });
      if (res.ok) setStatus("done");
      else { setStatus("error"); setMsg(res.error); }
    } catch { setStatus("error"); setMsg("Something went wrong. Please try again or email us."); }
  };

  if (status === "done")
    return (
      <div role="status" className="rounded-lg bg-card p-6 text-foreground">
        <p className="font-display text-xl font-bold">Request received</p>
        <p className="mt-2">Thanks. We'll send your compliance check within one business day.</p>
      </div>
    );

  const lab = "mb-1.5 block text-[15px] font-medium text-primary-foreground";
  const er = (k: string) => errors[k] && <p id={`q-${k}-err`} role="alert" className="mt-1 text-[15px] font-semibold text-highlight">{errors[k]}</p>;
  const a = (k: string) => ({ id: `q-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `q-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot value={f.website} onChange={(v) => setF((p) => ({ ...p, website: v }))} />
      <div><label htmlFor="q-name" className={lab}>Your name</label><input {...a("name")} autoComplete="name" className={input} value={f.name} onChange={set("name")} />{er("name")}</div>
      <div><label htmlFor="q-email" className={lab}>Email</label><input {...a("email")} type="email" autoComplete="email" className={input} value={f.email} onChange={set("email")} />{er("email")}</div>
      <div><label htmlFor="q-company" className={lab}>Management company <span className="font-normal">(optional)</span></label><input {...a("company")} autoComplete="organization" className={input} value={f.company} onChange={set("company")} /></div>
      <div><label htmlFor="q-building_count" className={lab}>Number of buildings</label><input {...a("building_count")} type="number" min={1} inputMode="numeric" className={input} value={f.building_count} onChange={set("building_count")} />{er("building_count")}</div>
      <div className="sm:col-span-2"><label htmlFor="q-addresses" className={lab}>Building addresses, one per line</label><textarea {...a("addresses")} rows={4} className={input} value={f.addresses} onChange={set("addresses")} />{er("addresses")}</div>
      <div className="sm:col-span-2">
        <label className="flex min-h-11 items-start gap-3 text-[15px] text-primary-foreground">
          <input {...a("consent")} type="checkbox" className="mt-1 h-5 w-5 accent-highlight" checked={f.consent} onChange={set("consent")} />
          I agree Lakeline Energy may contact me about my compliance check.
        </label>
        {er("consent")}
      </div>
      {status === "error" && <p role="alert" className="sm:col-span-2 rounded-lg bg-card p-3 text-[15px] text-rust">{msg}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" variant="cta" size="xl" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Request my free check"}
        </Button>
      </div>
    </form>
  );
}
