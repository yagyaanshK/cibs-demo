import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";
import { IconMail, IconPhone, IconPin } from "@/components/icons";
import { getSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Central Institute of Buddhist Studies, Choglamsar, Leh.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const institute = await getSettings();

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact CIBS"
        intro="Reach the Central Institute of Buddhist Studies at Choglamsar, Leh — for admissions, academics and general enquiries."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Details + map */}
          <div>
            <div className="space-y-4">
              <ContactRow icon={<IconPin className="h-5 w-5" />} label="Address">
                {institute.name}<br />
                {institute.address.line1}, {institute.address.line2}<br />
                {institute.ministry}
              </ContactRow>
              <ContactRow icon={<IconPhone className="h-5 w-5" />} label="Phone">
                <a href={`tel:${institute.phone}`} className="hover:text-maroon">{institute.phone}</a>
              </ContactRow>
              <ContactRow icon={<IconMail className="h-5 w-5" />} label="Email">
                <a href={`mailto:${institute.email}`} className="hover:text-maroon">{institute.email}</a>
              </ContactRow>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-maroon-100 shadow-[var(--shadow-soft)]">
              <iframe
                title="CIBS location map"
                src="https://www.google.com/maps?q=Central+Institute+of+Buddhist+Studies+Choglamsar+Leh&output=embed"
                className="h-72 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-maroon-100 bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h2 className="font-display text-2xl text-maroon">Send us a message</h2>
            <div className="mt-3 gold-rule" />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-maroon-100 bg-cream p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-maroon-50 text-maroon">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gold-600">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{children}</p>
      </div>
    </div>
  );
}
