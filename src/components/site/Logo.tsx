import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Lakeline Energy logo. `white` is the all-white version for dark backgrounds. */
export function Logo({ white = false, className }: { white?: boolean; className?: string }) {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center" aria-label="Lakeline Energy home">
      <img
        src={white ? "/brand/lakeline-logo-horizontal-white.svg" : "/brand/lakeline-logo-horizontal.svg"}
        width={467}
        height={100}
        alt="Lakeline Energy"
        className={cn("h-7 w-auto sm:h-9 lg:h-10", className)}
      />
    </Link>
  );
}
