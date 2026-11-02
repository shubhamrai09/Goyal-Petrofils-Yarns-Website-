/** Shared enquiry validation — used by the client form and the /api/enquiry route. */

export type EnquiryInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
};

export type EnquiryField = keyof EnquiryInput;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  message: "",
};

export const fieldLabels: Record<EnquiryField, string> = {
  name: "Full name",
  company: "Company",
  email: "Email",
  phone: "Phone / WhatsApp",
  product: "Product of interest",
  quantity: "Approximate quantity",
  message: "Your requirement",
};

const MAX: Record<EnquiryField, number> = {
  name: 100,
  company: 120,
  email: 160,
  phone: 30,
  product: 120,
  quantity: 80,
  message: 3000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: EnquiryField, raw: string): string | undefined {
  const v = raw.trim();
  if (v.length > MAX[field]) return `${fieldLabels[field]} must be ${MAX[field]} characters or fewer.`;
  switch (field) {
    case "name":
      if (!v) return "Enter your name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return;
    case "email":
      if (!v) return "Enter your email address.";
      if (!EMAIL_RE.test(v)) return "Enter an email address in the format name@company.com.";
      return;
    case "phone": {
      if (!v) return "Enter a phone or WhatsApp number.";
      const digits = v.replace(/\D/g, "");
      if (!/^[+\d\s()-]+$/.test(v) || digits.length < 8 || digits.length > 15)
        return "Enter a valid phone number, including the country code if outside India.";
      return;
    }
    case "product":
      if (!v) return "Choose the product you are interested in.";
      return;
    case "message":
      if (!v) return "Tell us what you need — count, blend, shade or application.";
      if (v.length < 10) return "Please add a little more detail (at least 10 characters).";
      return;
    default:
      return;
  }
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  (Object.keys(fieldLabels) as EnquiryField[]).forEach((f) => {
    const e = validateField(f, input[f] ?? "");
    if (e) errors[f] = e;
  });
  return errors;
}

/** Plain-text summary used for the WhatsApp / email fallback. */
export function enquiryAsText(e: EnquiryInput) {
  return [
    "New enquiry from geetexyarn.com",
    `Name: ${e.name}`,
    e.company.trim() ? `Company: ${e.company}` : null,
    `Email: ${e.email}`,
    `Phone: ${e.phone}`,
    `Product: ${e.product}`,
    e.quantity.trim() ? `Quantity: ${e.quantity}` : null,
    "",
    e.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}
