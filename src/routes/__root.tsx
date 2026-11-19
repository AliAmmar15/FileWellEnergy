import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import montserratUrl from "@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2?url";
import sourceSansUrl from "@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { SITE, UTM_KEY } from "@/lib/site";
import { organizationSchema } from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <meta name="robots" content="noindex, follow" />
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold">We couldn't find that page</h1>
      <p className="mt-3 max-w-md text-muted-foreground">The page may have moved. You can head home or get your free Detroit benchmarking compliance check.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="cta" size="xl"><Link to="/free-check">Get a free compliance check</Link></Button>
        <Button asChild variant="outlineBrand" size="xl"><Link to="/">Go home</Link></Button>
      </div>
      <p className="mt-8 text-[16px] text-muted-foreground">
        Or try the <Link to="/detroit-benchmarking-guide" className="text-link">Detroit benchmarking guide</Link>,{" "}
        <Link to="/pricing" className="text-link">pricing</Link> or the <Link to="/faq" className="text-link">FAQ</Link>.
      </p>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="text-2xl font-bold">This page didn't load</h1>
      <p className="mt-2 text-muted-foreground">Something went wrong on our end. Try again or head back home.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button variant="cta" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
        <Button asChild variant="outlineBrand"><a href="/">Go home</a></Button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Detroit Energy Benchmarking Compliance | Lakeline Energy" },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#133F4F" },
    ],
    links: [
      { rel: "preload", href: sourceSansUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: montserratUrl, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(organizationSchema()) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/*
          Cookie-free analytics placeholder (Plausible). Uncomment and set your domain to enable:
          <script defer data-domain="lakelineenergy.com" src="https://plausible.io/js/script.js"></script>
        */}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function useCaptureUtm() {
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const utm = { utm_source: p.get("utm_source"), utm_medium: p.get("utm_medium"), utm_campaign: p.get("utm_campaign") };
    if (utm.utm_source || utm.utm_medium || utm.utm_campaign) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
    }
  }, []);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useCaptureUtm();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
