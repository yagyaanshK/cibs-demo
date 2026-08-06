import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { NoticeBoard } from "@/components/sections/notice-board";
import { getNotices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notices & Announcements",
  description: "Latest notices, advertisements, events and tenders from CIBS, Leh.",
};

/** Refresh within a minute of staff publishing, without a rebuild. */
export const revalidate = 60;

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <>
      <PageHeader
        eyebrow="Information Corner"
        title="Notices & Announcements"
        intro="Notices, recruitment advertisements, events and tenders published by the Institute. Filter by category below."
        crumbs={[{ label: "Notices" }]}
      />
      <NoticeBoard notices={notices} hideHeading />
    </>
  );
}
