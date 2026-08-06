import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/content";

export const metadata: Metadata = { title: "Public Self-Disclosure" };
export const revalidate = 60;

export default function Page() {
  return <InfoPage data={infoPages["public-self-disclosure"]} />;
}
