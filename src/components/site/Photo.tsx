import guardian from "@/assets/photos/guardian-building.webp";
import skyline from "@/assets/photos/detroit-skyline.webp";
import freePress from "@/assets/photos/free-press-building.webp";
import hibbard from "@/assets/photos/hibbard-apartments.webp";
import fisher from "@/assets/photos/fisher.webp";
import penobscot from "@/assets/photos/penobscot.webp";
import market from "@/assets/photos/market.webp";
import warehouse from "@/assets/photos/warehouse.webp";
import midtown from "@/assets/photos/midtown.webp";
import { cn } from "@/lib/utils";

/** Real, freely licensed photographs from Wikimedia Commons. Credits are shown wherever a photo appears. */
export const PHOTOS = {
  guardian: {
    src: guardian, w: 900, h: 1793,
    alt: "The Guardian Building, an orange-brick Art Deco office tower in downtown Detroit, seen from street level",
    title: "Guardian Building, Griswold Street", author: "WMrapids", license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Guardian_Building_2025.jpg",
  },
  skyline: {
    src: skyline, w: 1920, h: 981,
    alt: "Downtown Detroit's skyline of office towers seen across the Detroit River",
    title: "Downtown Detroit from the river", author: "TheWxResearcher", license: "CC BY 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_Skyline_August_2024.jpg",
  },
  freePress: {
    src: freePress, w: 1400, h: 933,
    alt: "The limestone Detroit Free Press Building on Lafayette Boulevard, a 1920s office building now converted to apartments",
    title: "Free Press Building, Lafayette Blvd", author: "Albert duce", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_Free_Press_Building_2011_05_08.jpg",
  },
  hibbard: {
    src: hibbard, w: 800, h: 1645,
    alt: "The Hibbard, a brick multifamily apartment building in Detroit with bay windows",
    title: "The Hibbard Apartments, East Jefferson", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Hibbard_Apartment_Building_Detroit.jpg",
  },
  fisher: {
    src: fisher, w: 1400, h: 2100,
    alt: "The Fisher Building in Detroit's New Center, a tall Art Deco office tower with a golden roof",
    title: "Fisher Building, New Center", author: "Michael Barera", license: "CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Detroit_December_2021_09_(Fisher_Building).jpg",
  },
  penobscot: {
    src: penobscot, w: 1400, h: 2100,
    alt: "The Penobscot Building, a stepped Art Deco office skyscraper in downtown Detroit",
    title: "Penobscot Building, Griswold Street", author: "WMrapids", license: "CC0",
    url: "https://commons.wikimedia.org/wiki/File:Penobscot_Building_2025.jpg",
  },
  market: {
    src: market, w: 1400, h: 944,
    alt: "The brick facade of Shed 2 at Detroit's Eastern Market",
    title: "Eastern Market, Shed 2", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Eastern_Market_Detroit_MI_Shed_2_facade.jpg",
  },
  warehouse: {
    src: warehouse, w: 1400, h: 888,
    alt: "The large brick Michigan Bell and Western Electric warehouse building in Detroit",
    title: "Michigan Bell warehouse, Oakman Blvd", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Michigan_Bell_and_Western_Electric_Warehouse_Detroit_MI.jpg",
  },
  midtown: {
    src: midtown, w: 1400, h: 1050,
    alt: "A six-story red brick mixed-use building with a ground-floor restaurant in Detroit's Midtown",
    title: "Mixed-use building, Woodward at Charlotte", author: "Andrew Jameson", license: "CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Midtown_Woodward_Historic_District_-_14_Charlotte.jpg",
  },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

export function Photo({
  name, className, imgClassName, priority = false, note, inverted = false,
}: {
  name: PhotoKey; className?: string; imgClassName?: string; priority?: boolean; note?: string; inverted?: boolean;
}) {
  const p = PHOTOS[name];
  return (
    <figure className={cn("flex flex-col", className)}>
      <img
        src={p.src}
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
