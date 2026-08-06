import type { Metadata } from "next";
import { InfoPage } from "@/components/info-page";
import { infoPages } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = { title: "Students" };

export default function Page() {
  return <InfoPage data={infoPages.students} />;
}
