import { cn } from "@/lib/utils";

// All photo files (originals plus -480/-800/-1200 resized variants), resolved to hashed URLs.
const FILES = import.meta.glob("/src/assets/photos/*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const url = (file: string) => FILES[`/src/assets/photos/${file}.webp`];
const VARIANT_WIDTHS = [480, 800, 1200];

/** Builds a srcset from the resized variants that exist and are smaller than the original. */
function srcSetFor(file: string, width: number) {
  const parts = VARIANT_WIDTHS.filter((w) => w < width && url(`${file}-${w}`)).map((w) => `${url(`${file}-${w}`)} ${w}w`);
  parts.push(`${url(file)} ${width}w`);
  return parts.join(", ");
}

/** Real, freely licensed photographs from Wikimedia Commons. Credits are shown wherever a photo appears. */
export const PHOTOS = {
  guardian: {
    file: "guardian-building", w: 900, h: 1793,
    alt: "The Guardian Building, an orange-brick Art Deco office tower in downtown Detroit, seen from street level",
    title: "Guardian Building, Griswold Street", author: "WMrapids", license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Guardian_Building_2025.jpg",
  },
  skyline: {
    file: "detroit-skyline", w: 1920, h: 981,
    alt: "Downtown Detroit's skyline of office towers seen across the Detroit River",
    title: "Downtown Detroit from the river", author: "TheWxResearcher", license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_Skyline_August_2024.jpg",
  },
  freePress: {
    file: "free-press-building", w: 1400, h: 933,
    alt: "The limestone Detroit Free Press Building on Lafayette Boulevard, a 1920s office building now converted to apartments",
    title: "Free Press Building, Lafayette Blvd", author: "Albert duce", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_Free_Press_Building_2011_05_08.jpg",
  },
  hibbard: {
    file: "hibbard-apartments", w: 800, h: 1645,
    alt: "The Hibbard, a brick multifamily apartment building in Detroit with bay windows",
    title: "The Hibbard Apartments, East Jefferson", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Hibbard_Apartment_Building_Detroit.jpg",
  },
  fisher: {
    file: "fisher", w: 1400, h: 2100,
    alt: "The Fisher Building in Detroit's New Center, a tall Art Deco office tower with a golden roof",
    title: "Fisher Building, New Center", author: "Michael Barera", license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_December_2021_09_(Fisher_Building).jpg",
  },
  penobscot: {
    file: "penobscot", w: 1400, h: 2100,
    alt: "The Penobscot Building, a stepped Art Deco office skyscraper in downtown Detroit",
    title: "Penobscot Building, Griswold Street", author: "WMrapids", license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Penobscot_Building_2025.jpg",
  },
  market: {
    file: "market", w: 1400, h: 944,
    alt: "The brick facade of Shed 2 at Detroit's Eastern Market",
    title: "Eastern Market, Shed 2", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Eastern_Market_Detroit_MI_Shed_2_facade.jpg",
  },
  warehouse: {
    file: "warehouse", w: 1400, h: 888,
    alt: "The large brick Michigan Bell and Western Electric warehouse building in Detroit",
    title: "Michigan Bell warehouse, Oakman Blvd", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Michigan_Bell_and_Western_Electric_Warehouse_Detroit_MI.jpg",
  },
  midtown: {
    file: "midtown", w: 1400, h: 1050,
    alt: "A six-story red brick mixed-use building with a ground-floor restaurant in Detroit's Midtown",
    title: "Mixed-use building, Woodward at Charlotte", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Midtown_Woodward_Historic_District_-_14_Charlotte.jpg",
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

const DEFAULT_SIZES = "(min-width: 1024px) 540px, calc(100vw - 48px)";

export function Photo({
  name, className, imgClassName, priority = false, note, inverted = false, sizes = DEFAULT_SIZES,
}: {
  name: PhotoKey; className?: string; imgClassName?: string; priority?: boolean; note?: string; inverted?: boolean; sizes?: string;
}) {
  const p = PHOTOS[name];
  return (
    <figure className={cn("flex flex-col", className)}>
      <img
        src={url(p.file)}
        srcSet={srcSetFor(p.file, p.w)}
        sizes={sizes}
        width={p.w}
        height={p.h}
        alt={p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        className={cn("block w-full object-cover", imgClassName)}
      />
      <figcaption className={cn("photo-caption mt-2 flex flex-wrap justify-between gap-x-4", inverted && "text-primary-foreground/75")}>
        <span>{note ?? p.title}</span>
        <span>
          Photo: <a href={p.url} target="_blank" rel="noopener noreferrer">{p.author}, {p.license}</a>
        </span>
      </figcaption>
    </figure>
  );
}
