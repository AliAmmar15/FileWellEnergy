export const GRID_TOTAL = 2902;
export const GRID_FILED = 601;

/** Seeded shuffle so the pattern is identical on every load (and on server and client). */
function buildPattern(): boolean[] {
  let seed = 20250901;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const arr = Array.from({ length: GRID_TOTAL }, (_, i) => i < GRID_FILED);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

const PATTERN = buildPattern();

export function BuildingGrid() {
  return (
    <figure>
      <div
        role="img"
        aria-label={`Grid of ${GRID_TOTAL.toLocaleString("en-US")} squares, one per building on Detroit's covered list. ${GRID_FILED} are highlighted as marked compliant; ${(GRID_TOTAL - GRID_FILED).toLocaleString("en-US")} are not.`}
        className="building-grid"
      >
        {PATTERN.map((f, i) => <span key={i} className={f ? "f" : undefined} />)}
      </div>
      <figcaption className="mt-4 text-[15px] text-primary-foreground/85">
        <span className="flex flex-wrap gap-x-6 gap-y-1">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-filed" aria-hidden="true" /><span className="tnum">601</span> marked compliant</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 bg-unfiled ring-1 ring-primary-foreground/40" aria-hidden="true" /><span className="tnum">2,301</span> not marked compliant</span>
        </span>
        <span className="mt-2 block">Each square is one of the 2,902 buildings on Detroit's covered list. Source: City of Detroit open data, September 2025.</span>
      </figcaption>
    </figure>
  );
}
