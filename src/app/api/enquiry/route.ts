import { NextResponse } from "next/server";
import { fieldLabels, validateEnquiry, type EnquiryField, type EnquiryInput } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 *
 * Delivery is NOT configured by default. To connect it, set ENQUIRY_WEBHOOK_URL (server-side env var)
 * to any HTTPS endpoint that accepts a JSON POST — e.g. a Zapier/Make/n8n webhook, a Google Apps Script
 * that appends to a Sheet, or your own mail service. Optional: ENQUIRY_WEBHOOK_SECRET is sent as the
 * `X-Webhook-Secret` header. See README.md → "Connecting the enquiry form".
 *
 * Without it, the route answers 503 { error: "not_configured" } and the form offers WhatsApp / email instead.
 */

const MAX_BODY_BYTES = 10_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill the "website" field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input = Object.fromEntries(
    (Object.keys(fieldLabels) as EnquiryField[]).map((f) => [f, typeof body[f] === "string" ? (body[f] as string).trim() : ""]),
  ) as EnquiryInput;

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.ENQUIRY_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ ...input, source: "geetexyarn.com", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[enquiry] delivery failed:", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
