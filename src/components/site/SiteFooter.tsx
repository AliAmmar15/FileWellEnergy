import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-footer text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Logo white lazy className="h-9 lg:h-10" />
          <p className="mt-4 max-w-sm text-primary-foreground/80">
            Detroit energy and water benchmarking, filed for you. Serving Detroit and Midwest cities with benchmarking laws.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-1 text-[15px]">
            {[...NAV, { to: "/about", label: "About" } as const, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}><Link to={n.to} className="inline-flex min-h-10 items-center hover:underline">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <dl className="space-y-3 text-[15px]">
          <div><dt className="label-mono text-primary-foreground/70">Phone</dt><dd>{SITE.phone}</dd></div>
          <div><dt className="label-mono text-primary-foreground/70">Email</dt><dd>{SITE.email}</dd></div>
        </dl>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-3 py-6 text-[13px] text-primary-foreground/75 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} · <Link to="/privacy" className="underline">Privacy</Link> · <Link to="/terms" className="underline">Terms</Link>
          </p>
          <p className="max-w-xl">
            Lakeline Energy is not affiliated with the City of Detroit or the U.S. EPA. ENERGY STAR® is a registered mark of the U.S. EPA. Photographs from Wikimedia Commons, credited where shown.
          </p>
        </div>
      </div>
    </footer>
  );
}
