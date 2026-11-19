import { Link } from "@tanstack/react-router";
import type { QA } from "./blocks";
import { LINKS } from "@/lib/site";

export const STEPS = [
  {
    title: "Free check",
    short: "We confirm if you're covered and what's missing (24 hours).",
    long: "Send us your address or list of buildings. Within one business day we look up each building, confirm whether it is covered by the Detroit benchmarking ordinance, check whether last year's report was filed, and list exactly what is still needed — with a flat price.",
    need: "Building address(es) and a way to reach you.",
  },
  {
    title: "Sign & authorize",
    short: "One agreement, one authorization letter.",
    long: "You sign one simple agreement for all of your buildings and an owner authorization letter that lets us request utility data and act on your behalf with the City. The 50% deposit is due at signing.",
    need: "Signed agreement, 50% deposit and owner authorization letter.",
  },
  {
    title: "We gather the data",
    short: "Utilities, water, tenant consents.",
    long: "We request 12 months of electricity, gas, steam and water data from DTE Energy, Constellation, Detroit Thermal and the Detroit Water and Sewerage Department. If tenants pay their own utilities, we prepare the DTE consent forms and follow up until they're signed.",
    need: "Utility account and meter numbers, bills or online access, and a tenant list if tenants pay their own utilities.",
  },
  {
    title: "We build and check",
    short: "Portfolio Manager setup, Detroit Building ID, data quality check.",
    long: "We set up — or clean up — your building in ENERGY STAR Portfolio Manager, enter your Detroit Building ID, record how the space is used and run data quality checks so the report holds up.",
    need: "Building basics (year built, gross floor area excluding parking, occupancy) and any existing Portfolio Manager login.",
  },
  {
    title: "Filed & confirmed",
    short: "Submitted to the City, confirmation saved, summary sent to you.",
    long: "We submit the report to the City, save the confirmation for your records and send you a one-page compliance and performance summary showing how the building compares and where you might save.",
    need: "The final 50% payment once your filing is submitted.",
  },
];

export const FAQS: QA[] = [
  { q: "What is energy benchmarking?", a: "Measuring a building's yearly energy and water use in ENERGY STAR Portfolio Manager so it can be compared with similar buildings and reported to the City." },
  {
    q: "Is my building covered?",
    a: (
      <>
        Privately owned commercial and multifamily buildings 25,000 sq ft and up, and city-owned buildings 10,000 sq ft and up. Use our{" "}
        <Link to="/am-i-covered" className="text-link">Am I covered? tool</Link> or the City's{" "}
        <a href={LINKS.dbidLookup} className="text-link" target="_blank" rel="noopener noreferrer">DBID lookup</a>.
      </>
    ),
  },
  { q: "When is the deadline?", a: "June 1 every year, for the previous calendar year's data." },
  { q: "What happens if I don't file?", a: "Right now the City is in an amnesty period and isn't issuing fines. But every covered building's compliance status is on the City's public map, updated weekly, and lenders, buyers and tenants check it. Fines are expected once the amnesty ends." },
  { q: "What's a Detroit Building ID?", a: "The City's unique ID for your building, entered in Portfolio Manager so the City can match your report." },
  { q: "Do my tenants need to do anything?", a: "If tenants pay their own utilities and there are fewer than five, each signs a DTE consent form so DTE can release whole-building data. We prepare the forms and follow up." },
  { q: "Does someone have to sign off on my data?", a: "No. The City has confirmed no outside professional sign-off is required. Portfolio Manager's automatic data verification checks the data, and we run its data quality checks on every building before filing." },
  { q: "Where can I see my building's compliance status?", a: "Compliance status, building size and building age are published on the City's public transparency map." },
  { q: "Can my building be exempt?", a: "Buildings that are vacant, slated for demolition or under 25,000 sq ft may qualify for a whole-building exemption. Buildings with water or energy shutoffs in the past year may qualify for a data exemption. Owners request exemptions through the City's form, and we can help." },
  { q: "Can't I do it myself?", a: "Yes; Portfolio Manager is free. Most managers hire help because collecting utility data and tenant forms takes time and mistakes can mean refiling." },
  { q: "How long does it take?", a: "Usually two to six weeks, depending mostly on how fast utilities and tenants respond. Get your information to us by April 1." },
  {
    q: "What do you need from me?",
    a: (
      <>
        See the full checklist on our <Link to="/how-it-works" hash="checklist" className="text-link">How It Works page</Link>.
      </>
    ),
  },
  { q: "Do you work outside Detroit?", a: "Yes, we serve other Midwest cities with benchmarking laws. Ask us." },
  { q: "Will this lower my energy bills?", a: "The filing itself doesn't, but your summary highlights savings opportunities, and we offer energy audits." },
];

/** Plain-text answers for FAQPage schema. */
export const FAQ_TEXT: Record<string, string> = {
  "Is my building covered?": "Privately owned commercial and multifamily buildings 25,000 sq ft and up, and city-owned buildings 10,000 sq ft and up. Use our Am I covered? tool or the City's DBID lookup.",
  "What do you need from me?": "See the full checklist on our How It Works page.",
};

export const INCLUDED = [
  "Portfolio Manager setup or cleanup",
  "Detroit Building ID entry",
  "DTE whole-building data connection",
  "Tenant consent forms",
  "Water and gas data",
  "Data quality check",
  "Submission to the City",
  "Confirmation saved for your records",
  "One-page compliance and performance summary",
];
