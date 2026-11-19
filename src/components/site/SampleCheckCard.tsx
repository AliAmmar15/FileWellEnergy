const rows: [string, string, boolean?][] = [
  ["Building", "1234 Example Ave, Detroit 48201"],
  ["Square footage", "41,000 sq ft, office"],
  ["Covered", "Yes"],
  ["City status", "Not marked compliant", true],
  ["Needed", "12 months of DTE and water data, 3 tenant consent forms"],
  ["Flat fee", "$750 filing"],
  ["We'd file by", "April 30"],
];

export function SampleCheckCard() {
  return (
    <figure className="relative rounded-lg border border-hairline bg-card p-6 shadow-lift md:p-8" aria-label="Sample compliance check">
      <span className="absolute right-6 top-6 rotate-[-8deg] rounded-[3px] border-2 border-rust px-2 py-0.5 font-display text-sm font-bold uppercase tracking-wide text-rust">
        Sample
      </span>
      <p className="font-display text-xl font-bold">Compliance check</p>
      <p className="mt-1 text-[15px] text-muted-foreground">Prepared by Lakeline Energy</p>
      <dl className="mt-5 border-t-2 border-foreground text-[15px]">
        {rows.map(([k, v, rust]) => (
          <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-border py-2.5">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className={rust ? "font-semibold text-rust" : "tnum"}>{v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
