import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/lib/site";
import { useDeadline } from "./Deadline";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-background shadow-[0_6px_16px_-12px_rgb(0_0_0/0.25)]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-card focus:px-3 focus:py-2">
        Skip to content
      </a>
      <TopBar />
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="inline-flex min-h-11 items-center font-display text-[13px] font-bold uppercase tracking-wide text-foreground underline-offset-[6px] hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="cta" size="sm" className="hidden h-10 px-4 text-[13px] sm:inline-flex">
            <Link to="/free-check">Free check</Link>
          </Button>
          <Button asChild variant="outlineBrand" size="sm" className="hidden h-10 rounded-md px-4 text-[13px] xl:inline-flex">
            <Link to="/contact">Contact</Link>
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-hairline lg:hidden">
          <ul className="container-page py-2">
            {[...NAV, { to: "/contact", label: "Contact" } as const, { to: "/free-check", label: "Free compliance check" } as const].map((n) => (
              <li key={n.to} className="border-b border-hairline last:border-0">
                <Link to={n.to} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-lg font-semibold">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function TopBar() {
  const { label } = useDeadline();
  return (
    <div className="border-b border-hairline bg-card">
      <div className="container-page flex min-h-10 flex-wrap items-center justify-end gap-x-6 gap-y-1 py-1 text-[13px] font-semibold">
        <Link to="/free-check" className="text-teal hover:underline" suppressHydrationWarning>Next Detroit deadline: {label}</Link>
        <span className="hidden sm:inline">Call {SITE.phone}</span>
        <span className="hidden sm:inline">{SITE.email}</span>
      </div>
    </div>
  );
}
