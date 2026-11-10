import { Link } from "@tanstack/react-router";
import logo from "@/assets/filewell-logo.webp";
import { cn } from "@/lib/utils";

/** Wordmark: a single "filed" square beside the name, like one cell from the building grid. */
export function LogoMark({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block h-3.5 w-3.5 bg-primary", className)} />;
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  if (!inverted) {
    return (
      <Link to="/" className="flex min-h-11 items-center" aria-label="Filewell Energy home">
        {/* multiply drops the logo's off-white background onto the page background */}
        <img src={logo} width={480} height={210} alt="Filewell Energy" className="h-14 w-auto mix-blend-multiply" />
      </Link>
    );
  }
  return (
    <Link to="/" className="flex min-h-11 items-center gap-2.5" aria-label="Filewell Energy home">
      <LogoMark />
      <span className="whitespace-nowrap font-display text-[22px] font-extrabold leading-none tracking-tight text-primary-foreground">
        Filewell <span className="font-semibold text-primary">Energy</span>
      </span>
    </Link>
  );
}
