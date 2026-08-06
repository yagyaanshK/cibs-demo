import type { Metadata } from "next";
import { DemoSwitcher } from "@/components/demo/demo-switcher";
import { UmsPreview } from "@/components/demo/ums-preview";

export const metadata: Metadata = {
  title: "University Management System Preview",
  description: "Interactive demonstration of the proposed CIBS University Management System.",
  robots: { index: false, follow: false },
};

export default function UmsPreviewPage() {
  return (
    <>
      <DemoSwitcher active="ums" />
      <UmsPreview />
    </>
  );
}
