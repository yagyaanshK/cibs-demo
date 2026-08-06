import { Hero } from "@/components/sections/hero";
import { NoticeTicker } from "@/components/sections/notice-ticker";
import { NoticeBoard } from "@/components/sections/notice-board";
import { HighlightsCarousel } from "@/components/sections/highlights-carousel";
import { ChancellorFeature } from "@/components/sections/chancellor";
import { Faculties } from "@/components/sections/faculties";
import { About } from "@/components/sections/about";
import { Programmes } from "@/components/sections/programmes";
import { Gallery } from "@/components/sections/gallery";
import { CTA } from "@/components/sections/cta";
import { getNotices, getFaculties, getProgrammes, getGallery, getHighlights, getSettings } from "@/lib/data";

/**
 * Re-render at most once a minute so notices published in the admin panel
 * appear on the live site without a rebuild, while still serving a cached
 * static page to the public (important on result/admission days).
 */
export const revalidate = 60;

export default async function Home() {
  const [notices, faculties, programmes, gallery, highlights, institute] = await Promise.all([
    getNotices(),
    getFaculties(),
    getProgrammes(),
    getGallery(),
    getHighlights(),
    getSettings(),
  ]);

  return (
    <>
      <Hero institute={institute} />
      <NoticeTicker notices={notices} />
      <HighlightsCarousel items={highlights} />
      <ChancellorFeature />
      <NoticeBoard notices={notices} />
      <Faculties faculties={faculties} />
      <About institute={institute} />
      <Programmes programmes={programmes} />
      <Gallery gallery={gallery} />
      <CTA institute={institute} />
    </>
  );
}
