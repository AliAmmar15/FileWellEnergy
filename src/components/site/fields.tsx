import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full min-h-11 rounded-md border border-input bg-background px-3.5 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-highlight";

export function Field({
  id, label, required, hint, error, children, className,
}: { id: string; label: string; required?: boolean; hint?: string | undefined; error?: string | undefined; children: ReactNode; className?: string | undefined }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label} {required ? <span className="text-destructive" aria-hidden="true">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {hint && <p id={`${id}-hint`} className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p id={`${id}-err`} className="text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}

export function Select({ id, options, value, onChange, required }: { id: string; options: string[]; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <select id={id} name={id} className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} required={required}>
      <option value="">Select…</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
