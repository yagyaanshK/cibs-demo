"use client";

import { useState } from "react";
import { IconArrow } from "@/components/icons";

/**
 * Enquiry form. In the live site this will post to a Payload `enquiries`
 * collection so the office sees submissions in the admin panel; for now it
 * confirms locally so the flow can be demonstrated.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="mt-8 rounded-xl border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="font-display text-xl text-maroon">Thank you!</p>
        <p className="mt-2 text-sm text-ink-soft">
          Your message has been received. The CIBS office will get back to you shortly.
        </p>
        <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-maroon hover:underline">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="mt-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" required />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-maroon-100 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-maroon-700"
      >
        Send message <IconArrow className="h-4 w-4" />
      </button>
      <p className="text-xs text-ink-soft">
        This is a prototype form — in the live site, submissions are delivered to the CIBS office and logged in the admin panel.
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-maroon-100 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}
