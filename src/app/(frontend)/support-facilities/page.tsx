import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/content";

export const metadata: Metadata = { title: "Support Facilities" };
export const revalidate = 60;

export default function Page() {
  return <InfoPage data={infoPages["support-facilities"]} />;
}
