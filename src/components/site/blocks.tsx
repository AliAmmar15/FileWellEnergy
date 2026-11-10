import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Photo, type PhotoKey } from "./Photo";

export function CtaBand({
  title = "Find out where your building stands.",
  button = "Get my free check",
}: {
  title?: string;
  button?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-page py-14">
        <h2>{title}</h2>
        <p className="mt-3 max-w-2xl text-primary-foreground/90">The compliance check is free. We reply within one business day.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Button asChild variant="onDark" size="xl"><Link to="/free-check">{button}</Link></Button>
          <Button asChild variant="onDark" size="xl"><Link to="/am-i-covered">Am I covered?</Link></Button>
          <Button asChild variant="onDark" size="xl"><Link to="/pricing">See pricing</Link></Button>
          <Button asChild variant="onDark" size="xl"><Link to="/contact">Talk to us</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({ title, children, photo = "freePress" }: { eyebrow?: string; title: string; children?: ReactNode; photo?: PhotoKey | null }) {
  return (
    <section className="bg-card">
      <div className={cn("container-page grid gap-10 py-12 md:py-16", photo && "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center")}>
        <div>
          <h1>{title}</h1>
          {children && <div className="mt-5 max-w-2xl text-lg">{children}</div>}
        </div>
        {photo && <Photo name={photo} priority imgClassName="aspect-[16/10] rounded-xl" className="hidden lg:flex" />}
      </div>
    </section>
  );
}

export function SectionHeading({ title, intro, className }: { eyebrow?: string; title: string; intro?: string; className?: string }) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <h2 className="text-3xl">{title}</h2>
      {intro && <p className="mt-3 text-muted-foreground">{intro}</p>}
    </div>
  );
}

/** Narrow left column (heading + intro), wide right column (content). Stacks on mobile. */
export function Split({ num, title, intro, children, id, className }: { num?: string; title: string; intro?: ReactNode; children: ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={cn("section-y", className)}>
      <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <div>
          {num && <p className="label-mono mb-4 border-t border-foreground pt-3">{num}</p>}
          <h2 className="">{title}</h2>
          {intro && <div className="mt-4 text-muted-foreground">{intro}</div>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export type QA = { q: string; a: ReactNode };

export function FaqAccordion({ items }: { items: QA[] }) {
  return (
    <div className="border-t border-hairline">
      {items.map((it) => (
        <details key={it.q} className="group border-b border-hairline">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="text-2xl leading-none text-primary group-open:rotate-45">+</span>
          </summary>
          <div className="pb-5 text-muted-foreground">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("border-t-2 border-foreground bg-card p-6", className)}>{children}</div>;
}
