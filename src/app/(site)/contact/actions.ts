"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { publicClient } from "@/lib/supabase/public";

export type LeadState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message?: string; fieldErrors?: Partial<Record<"name" | "email", string>>; values?: LeadValues };

export type LeadValues = Partial<Record<"name" | "email" | "company" | "website" | "phone" | "country" | "spend" | "message", string>> & { services?: string[] };

const Lead = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(200),
  email: z.email("Please enter a valid email address.").max(320),
  company: z.string().trim().max(200).optional(),
  website: z.string().trim().max(500).optional(),
  phone: z.string().trim().max(50).optional(),
  country: z.string().trim().max(100).optional(),
  spend: z.string().trim().max(100).optional(),
  services: z.array(z.string().trim().max(100)).max(20),
  message: z.string().trim().max(5000).optional(),
});

const opt = (v: FormDataEntryValue | null) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

export async function submitLead(_prev: LeadState, form: FormData): Promise<LeadState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (opt(form.get("company_url"))) return { status: "ok" };

  const parsed = Lead.safeParse({
    name: opt(form.get("name")) ?? "",
    email: opt(form.get("email")) ?? "",
    company: opt(form.get("company")),
    website: opt(form.get("website")),
    phone: opt(form.get("phone")),
    country: opt(form.get("country")),
    spend: opt(form.get("spend")),
    services: form.getAll("services").filter((v): v is string => typeof v === "string"),
    message: opt(form.get("message")),
  });

  const values: LeadValues = {
    name: opt(form.get("name")),
    email: opt(form.get("email")),
    company: opt(form.get("company")),
    website: opt(form.get("website")),
    phone: opt(form.get("phone")),
    country: opt(form.get("country")),
    spend: opt(form.get("spend")),
    message: opt(form.get("message")),
    services: form.getAll("services").filter((v): v is string => typeof v === "string"),
  };

  if (!parsed.success) {
    const fieldErrors: Partial<Record<"name" | "email", string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if ((key === "name" || key === "email") && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const supabase = publicClient();
  if (!supabase) {
    console.error("[lead] Supabase is not configured; lead not stored", { email: parsed.data.email });
    return { status: "error", message: "We couldn't send your request. Please email us instead.", values };
  }

  const h = await headers();
  const { error } = await supabase.from("site_leads").insert({
    ...parsed.data,
    source_page: (h.get("referer") ?? "").slice(0, 300) || null,
  });
  if (error) {
    console.error("[lead] insert failed", error.message);
    return { status: "error", message: "We couldn't send your request. Please try again, or email us.", values };
  }

  // Email delivery (to the lead inbox with CC) is added once the provider is chosen.
  // Leads are never lost meanwhile: every one is stored and visible in the editor.
  return { status: "ok" };
}
