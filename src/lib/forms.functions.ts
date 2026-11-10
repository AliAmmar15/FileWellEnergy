import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { SITE } from "@/lib/site";

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const complianceCheckSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  company: opt(200),
  role: opt(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: opt(50),
  building_count: z.coerce.number().int().min(1, "Enter at least 1 building").max(10000),
  addresses: z.string().trim().min(1, "Please list at least one address").max(5000),
  square_footage: opt(500),
  tenants_pay_utilities: opt(20),
  filed_before: opt(20),
  dbids: opt(1000),
  notes: opt(5000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can contact you" }) }),
  source_page: opt(200),
  utm_source: opt(200),
  utm_medium: opt(200),
  utm_campaign: opt(200),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(200),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: opt(50),
  message: z.string().trim().min(1, "Please enter a message").max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});

// Basic per-IP rate limiting (per server instance).
const hits = new Map<string, number[]>();
function rateLimited(): boolean {
  const req = getRequest();
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v?: string) => (v && v.length ? v : null);

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Emails the owner via Resend. Never throws: the DB save has already succeeded,
 * so a failed notification is only logged.
 * Env: RESEND_API_KEY (required), NOTIFY_FROM_EMAIL (optional, defaults to Resend's test sender),
 *      NOTIFY_TO_EMAIL (optional, defaults to SITE.email).
 */
async function notifyOwner(
  subject: string,
  summary: string,
  replyTo: string,
  fields: Record<string, string | number | null | undefined>,
) {
  try {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set; skipping owner notification");
      return;
    }
    const rows = Object.entries(fields).filter(([, v]) => v !== undefined && v !== null && v !== "");
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html =
      `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">` +
      rows
        .map(
          ([k, v]) =>
            `<tr><td style="vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`,
        )
        .join("") +
      `</table>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env["NOTIFY_FROM_EMAIL"] || `${SITE.name} <onboarding@resend.dev>`,
        to: [process.env["NOTIFY_TO_EMAIL"] || SITE.email],
        reply_to: replyTo,
        subject: `${subject}: ${summary}`.replace(/[\r\n]+/g, " ").slice(0, 200),
        text,
        html,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("Resend notification failed", res.status, await res.text().catch(() => ""));
  } catch (e) {
    console.error("Owner notification error", e instanceof Error ? e.message : e);
  }
}

export const submitComplianceCheck = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => complianceCheckSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // bot: pretend success
    if (rateLimited()) return { ok: false as const, error: "Too many requests. Please try again in a few minutes." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("compliance_checks").insert({
      name: data.name,
      company: clean(data.company),
      role: clean(data.role),
      email: data.email,
      phone: clean(data.phone),
      building_count: data.building_count,
      addresses: data.addresses,
      square_footage: clean(data.square_footage),
      tenants_pay_utilities: clean(data.tenants_pay_utilities),
      filed_before: clean(data.filed_before),
      dbids: clean(data.dbids),
      notes: clean(data.notes),
      consent: true,
      source_page: clean(data.source_page),
      utm_source: clean(data.utm_source),
      utm_medium: clean(data.utm_medium),
      utm_campaign: clean(data.utm_campaign),
    });
    if (error) {
      console.error("compliance_checks insert failed", error.message);
      return { ok: false as const, error: "We couldn't save your request. Please try again or email us." };
    }
    await notifyOwner("New compliance check request", `${data.name}${data.company ? ` (${data.company})` : ""}`, data.email, {
      Name: data.name,
      Company: data.company,
      Role: data.role,
      Email: data.email,
      Phone: data.phone,
      "Number of buildings": data.building_count,
      Addresses: data.addresses,
      "Square footage": data.square_footage,
      "Tenants pay utilities": data.tenants_pay_utilities,
      "Filed before": data.filed_before,
      DBIDs: data.dbids,
      Notes: data.notes,
      "Source page": data.source_page,
      "UTM source": data.utm_source,
      "UTM medium": data.utm_medium,
      "UTM campaign": data.utm_campaign,
    });
    return { ok: true as const };
  });

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    if (rateLimited()) return { ok: false as const, error: "Too many requests. Please try again in a few minutes." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: clean(data.phone),
      message: data.message,
    });
    if (error) {
      console.error("contact_messages insert failed", error.message);
      return { ok: false as const, error: "We couldn't send your message. Please try again or email us." };
    }
    await notifyOwner("New contact message", data.name, data.email, {
      Name: data.name,
      Email: data.email,
      Phone: data.phone,
      Message: data.message,
    });
    return { ok: true as const };
  });
