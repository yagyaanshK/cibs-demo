import type { Metadata } from "next";
import { DemoSwitcher } from "@/components/demo/demo-switcher";
import { MobilePreview } from "@/components/demo/mobile-preview";

export const metadata: Metadata = {
  title: "Student Mobile Portal Preview",
  description: "Interactive mobile student portal demonstration for CIBS.",
  robots: { index: false, follow: false },
};

export default function MobilePreviewPage() {
  return (
    <>
      <DemoSwitcher active="mobile" />
      <MobilePreview />
    </>
  );
}
