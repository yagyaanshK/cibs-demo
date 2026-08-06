import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { AdminPreview } from "@/components/admin-preview";
import { DemoSwitcher } from "@/components/demo/demo-switcher";

export const metadata: Metadata = {
  title: "Admin Panel Preview",
  description:
    "A visual walkthrough of the CIBS website admin panel — how Institute staff publish notices and manage content.",
  // A sales/demo asset, not part of the Institute's public site.
  robots: { index: false, follow: false },
};

export default function AdminPreviewPage() {
  return (
    <>
      <DemoSwitcher active="admin" />
      <PageHeader
        eyebrow="For the Institute"
        title="The CIBS Admin Panel"
        intro="A walkthrough of the panel your team uses to run the website — publish a notice, upload a document, update contact details. No technical knowledge required."
        crumbs={[{ label: "Admin Panel Preview" }]}
      />

      <div className="shell mt-8">
        <p className="rounded-xl border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm text-ink">
          <strong className="font-semibold text-maroon">Screens captured from the working system.</strong>{" "}
          This page is a visual walkthrough. The live panel runs on the Institute&rsquo;s own secure server, where
          staff sign in to publish content.
        </p>
      </div>

      <AdminPreview />
    </>
  );
}
