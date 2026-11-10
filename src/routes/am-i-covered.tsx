import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CircleHelp, MapPinOff, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CtaBand, PageIntro } from "@/components/site/blocks";
import { Field, inputClass } from "@/components/site/fields";
import { checkCoverage, type BuildingType, type CoverageResult, type InDetroit, type Ownership } from "@/lib/rules";
import { LINKS } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/am-i-covered")({
  head: () =>
    seo({
      title: "Am I Covered by Detroit's Benchmarking Ordinance? | Filewell",
      description:
        "Check in seconds whether your Detroit building must report energy and water use under the benchmarking ordinance. Free, no sign-up, nothing stored.",
      path: "/am-i-covered",
    }),
  component: AmICovered,
});

const RESULTS: Record<CoverageResult, { icon: typeof CheckCircle2; title: string; tone: string }> = {
  "covered-private": { icon: CheckCircle2, title: "Likely covered — your next report is due June 1.", tone: "border-highlight bg-card" },
  "covered-city": { icon: CheckCircle2, title: "Likely covered.", tone: "border-highlight bg-card" },
  "not-covered": { icon: XCircle, title: "Likely not covered, based on what you entered.", tone: "border-border bg-card" },
  "not-detroit": { icon: MapPinOff, title: "Detroit's ordinance doesn't apply — but your city may have its own. Ask us.", tone: "border-teal bg-teal-soft" },
};

function Radios<T extends string>({ name, legend, options, value, onChange }: { name: string; legend: string; options: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map(([v, l]) => (
          <label key={v} className={`cursor-pointer rounded-lg border px-4 py-2.5 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal ${value === v ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} className="sr-only" />
            {l}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AmICovered() {
  const [ownership, setOwnership] = useState<Ownership>("private");
  const [type, setType] = useState<BuildingType>("commercial");
  const [sqft, setSqft] = useState("");
  const [inDetroit, setInDetroit] = useState<InDetroit>("yes");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(sqft.replace(/,/g, ""));
    if (!sqft || !Number.isFinite(n) || n <= 0) { setErr("Enter the gross floor area in square feet."); setResult(null); return; }
    setErr("");
    setResult(checkCoverage({ ownership, type, sqft: n, inDetroit }));
  };

  const R = result ? RESULTS[result] : null;
  const sqftClean = sqft.replace(/[^0-9]/g, "");

  return (
    <>
      <PageIntro photo="hibbard" eyebrow="Am I covered?" title="Is your Detroit building required to report?">
        Answer four questions for a quick estimate. Nothing you enter here is stored.
      </PageIntro>
      <section className="container-page grid gap-8 py-16 lg:grid-cols-2">
        <form onSubmit={submit} className="space-y-6 rounded-xl bg-card p-6 md:p-8" noValidate>
          <Radios name="ownership" legend="Ownership" value={ownership} onChange={setOwnership} options={[["private", "Privately owned"], ["city", "City-owned"]]} />
          <Radios name="type" legend="Building type" value={type} onChange={setType} options={[["commercial", "Commercial"], ["multifamily", "Multifamily"], ["other", "Other"]]} />
          <Field id="sqft" label="Gross floor area (sq ft)" required hint="Exclude parking areas." error={err}>
            <input id="sqft" inputMode="numeric" className={inputClass} value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="e.g. 42,000" aria-invalid={!!err} aria-describedby="sqft-hint" />
          </Field>
          <Radios name="detroit" legend="Is it in the City of Detroit?" value={inDetroit} onChange={setInDetroit} options={[["yes", "Yes"], ["no", "No"], ["unsure", "Not sure"]]} />
          <Button type="submit" variant="cta" size="xl" className="w-full sm:w-auto">Check my building</Button>
        </form>

        <div aria-live="polite">
          {R ? (
            <div className={`rounded-lg border-2 p-6 md:p-8 ${R.tone}`}>
              <R.icon className="h-8 w-8 text-teal" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold">{R.title}</h2>
              <p className="mt-4 text-sm">
                This is an estimate. Confirm with the City's{" "}
                <a href={LINKS.dbidLookup} target="_blank" rel="noopener noreferrer" className="text-link">Detroit Building ID lookup</a>.
              </p>
              <Button asChild variant="cta" size="xl" className="mt-6 w-full whitespace-normal sm:w-auto">
                <Link to="/free-check" search={sqftClean ? { sqft: sqftClean } : {}}>Get a free compliance check to be sure</Link>
              </Button>
            </div>
          ) : (
            <div className="flex h-full min-h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center text-muted-foreground">
              <CircleHelp className="h-8 w-8" aria-hidden="true" />
              <p className="mt-3">Your result will appear here.</p>
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
