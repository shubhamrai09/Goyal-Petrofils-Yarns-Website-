"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MessageCircle, Send } from "lucide-react";
import {
  emptyEnquiry,
  enquiryAsText,
  fieldLabels,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryInput,
} from "@/lib/enquiry";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

type Props = {
  productOptions: { value: string; label: string }[];
  email: string;
  whatsappNumber: string;
};

const inputCls =
  "mt-2 block w-full rounded-xs border bg-surface px-3.5 py-3 text-base text-ink placeholder:text-muted/80 transition-colors focus:outline-2 focus:outline-offset-1 focus:outline-brand aria-[invalid=true]:border-danger aria-[invalid=true]:bg-danger-tint/40";

export function EnquiryForm({ productOptions, email, whatsappNumber }: Props) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryInput>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Pre-select the product when arriving from a product page (?product=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("product");
    const match = productOptions.find((o) => o.value === slug);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads the URL once after hydration
    if (match) setValues((v) => ({ ...v, product: match.label }));
  }, [productOptions]);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary]);

  useEffect(() => {
    if (status === "success" || status === "not_configured" || status === "error") resultRef.current?.focus();
  }, [status]);

  const id = (f: EnquiryField) => `${uid}-${f}`;

  function update(field: EnquiryField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has been left, re-validate as the user corrects it.
    if (touched[field]) setErrors((e) => ({ ...e, [field]: validateField(field, value) }));
  }

  function blur(field: EnquiryField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: validateField(field, values[field]) }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(fieldLabels).map((k) => [k, true])));
    if (Object.keys(found).length > 0) {
      setShowSummary(false);
      // Re-trigger focus even if the summary was already showing.
      requestAnimationFrame(() => setShowSummary(true));
      return;
    }
    setShowSummary(false);
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypotRef.current?.value ?? "" }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: EnquiryErrors };
      if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => setShowSummary(true));
        return;
      }
      setStatus(data.error === "not_configured" ? "not_configured" : "error");
    } catch {
      setStatus("error");
    }
  }

  const text = enquiryAsText(values);
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${values.product || "GeeTex yarn"}`)}&body=${encodeURIComponent(text)}`;
  const errorList = (Object.keys(fieldLabels) as EnquiryField[]).filter((f) => errors[f]);

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border border-success bg-success-tint p-6 md:p-8">
        <CircleCheck aria-hidden="true" className="size-8 text-success" />
        <h3 className="mt-4 font-display text-2xl text-ink">Thank you — your enquiry has been sent.</h3>
        <p className="mt-2 text-ink-2">
          Our team will get in touch at {values.email} or {values.phone}. For anything urgent, call or WhatsApp us using the
          details on this page.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(emptyEnquiry);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
          className="mt-6 inline-flex min-h-11 items-center font-medium text-brand underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-req`} className="relative space-y-6">
      <p id={`${uid}-req`} className="text-sm text-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {showSummary && errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${uid}-summary`}
          className="border border-danger bg-danger-tint p-5"
        >
          <h3 id={`${uid}-summary`} className="flex items-center gap-2 font-semibold text-danger">
            <CircleAlert aria-hidden="true" className="size-5" />
            Please fix {errorList.length === 1 ? "1 problem" : `${errorList.length} problems`} before sending
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-[0.95rem]">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id(f)}`} className="text-danger underline underline-offset-2">
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field f="name" label={fieldLabels.name} required id={id("name")} error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id("name")}-err` : undefined}
            required
            className={`${inputCls} ${errors.name ? "border-danger" : "border-line-strong"}`}
          />
        </Field>
        <Field f="company" label={fieldLabels.company} id={id("company")} error={errors.company}>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => blur("company")}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${id("company")}-err` : undefined}
            className={`${inputCls} ${errors.company ? "border-danger" : "border-line-strong"}`}
          />
        </Field>
        <Field f="email" label={fieldLabels.email} required id={id("email")} error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id("email")}-err` : undefined}
            required
            className={`${inputCls} ${errors.email ? "border-danger" : "border-line-strong"}`}
          />
        </Field>
        <Field f="phone" label={fieldLabels.phone} required id={id("phone")} error={errors.phone} hint="Include the country code if you are outside India.">
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={`${id("phone")}-hint${errors.phone ? ` ${id("phone")}-err` : ""}`}
            required
            className={`${inputCls} ${errors.phone ? "border-danger" : "border-line-strong"}`}
          />
        </Field>
        <Field f="product" label={fieldLabels.product} required id={id("product")} error={errors.product}>
          <select
            id={id("product")}
            name="product"
            value={values.product}
            onChange={(e) => update("product", e.target.value)}
            onBlur={() => blur("product")}
            aria-invalid={!!errors.product}
            aria-describedby={errors.product ? `${id("product")}-err` : undefined}
            required
            className={`${inputCls} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2357534e%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[position:right_0.9rem_center] bg-no-repeat pr-10 ${
              errors.product ? "border-danger" : "border-line-strong"
            }`}
          >
            <option value="">Select a product</option>
            {productOptions.map((o) => (
              <option key={o.value} value={o.label}>
                {o.label}
              </option>
            ))}
            <option value="Custom / other requirement">Custom / other requirement</option>
          </select>
        </Field>
        <Field f="quantity" label={fieldLabels.quantity} id={id("quantity")} error={errors.quantity} hint="For example: 500 kg per month.">
          <input
            id={id("quantity")}
            name="quantity"
            value={values.quantity}
            onChange={(e) => update("quantity", e.target.value)}
            onBlur={() => blur("quantity")}
            aria-invalid={!!errors.quantity}
            aria-describedby={`${id("quantity")}-hint${errors.quantity ? ` ${id("quantity")}-err` : ""}`}
            className={`${inputCls} ${errors.quantity ? "border-danger" : "border-line-strong"}`}
          />
        </Field>
      </div>

      <Field f="message" label={fieldLabels.message} required id={id("message")} error={errors.message} hint="Count, blend, shade, ply, application or delivery location.">
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={`${id("message")}-hint${errors.message ? ` ${id("message")}-err` : ""}`}
          required
          className={`${inputCls} resize-y ${errors.message ? "border-danger" : "border-line-strong"}`}
        />
      </Field>

      {/* Honeypot for bots — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input ref={honeypotRef} id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xs bg-brand px-6 py-3 font-medium text-on-brand transition-colors duration-200 hover:bg-brand-strong disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" /> Send enquiry
            </>
          )}
        </button>
        <span aria-live="polite" className="sr-only">
          {status === "submitting" ? "Sending your enquiry" : ""}
        </span>
      </div>

      {status === "not_configured" || status === "error" ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border border-ink bg-sand p-5 md:p-6">
          <h3 className="font-semibold text-ink">
            {status === "not_configured"
              ? "Online sending isn’t switched on yet — your enquiry has not been sent."
              : "We couldn’t send your enquiry. Nothing was lost — please try again or use one of the options below."}
          </h3>
          <p className="mt-2 text-ink-2">Send the same details in one tap. Everything you typed is filled in for you.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xs bg-ink px-5 py-2.5 font-medium text-paper hover:bg-ink-2"
            >
              <MessageCircle aria-hidden="true" className="size-4" /> Send via WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={mailHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-xs border border-ink px-5 py-2.5 font-medium text-ink hover:bg-ink hover:text-paper"
            >
              <Mail aria-hidden="true" className="size-4" /> Send via email
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  f,
  label,
  id,
  required,
  error,
  hint,
  children,
}: {
  f: EnquiryField;
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div data-field={f}>
      <label htmlFor={id} className="block text-[0.95rem] font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-danger">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-sm font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
