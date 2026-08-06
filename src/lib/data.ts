/**
 * Server-side data access for the public site.
 *
 * Reads through Payload's Local API (no HTTP hop) so server components render
 * straight from the database. `cache()` de-duplicates within a single render.
 *
 * Every reader falls back to the static content in `content.ts` if the CMS is
 * unreachable — the public website must never hard-fail because the database
 * is down, and it keeps the static demo export building without a database.
 *
 * All readers return the plain shapes the UI components expect, so components
 * stay presentational and never depend on Payload types.
 */
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  institute as staticInstitute,
  notices as staticNotices,
  faculties as staticFaculties,
  programmes as staticProgrammes,
  gallery as staticGallery,
  highlights as staticHighlights,
  type Notice,
  type NoticeCategory,
  type Faculty,
  type Programme,
  type GalleryItem,
  type Highlight,
} from "./content";

const payloadClient = cache(async () => getPayload({ config }));

/**
 * Resolve an uploaded file to a static, servable URL.
 *
 * Payload's own `url` points at its dynamic `/api/media/file/...` route, which
 * does not exist in the static export. The files themselves live in
 * `public/uploads`, served at `/uploads/<filename>` by Next in every mode — so
 * we build that path from the filename and it works in dev, on the server, and
 * in the static demo alike.
 */
type UploadLike = { filename?: string | null; url?: string | null } | null | undefined;
function uploadUrl(file: UploadLike): string | null {
  if (!file) return null;
  if (file.filename) return `/uploads/${file.filename}`;
  return file.url ?? null;
}

export type Settings = {
  name: string;
  shortName: string;
  status: string;
  ministry: string;
  founded: number;
  tagline: string;
  phone: string;
  email: string;
  address: { line1: string; line2: string };
  socials: { facebook: string; instagram: string; youtube: string };
};

const staticSettings: Settings = {
  name: staticInstitute.name,
  shortName: staticInstitute.shortName,
  status: staticInstitute.status,
  ministry: staticInstitute.ministry,
  founded: staticInstitute.founded,
  tagline: staticInstitute.tagline,
  phone: staticInstitute.phone,
  email: staticInstitute.email,
  address: { line1: staticInstitute.address.line1, line2: staticInstitute.address.line2 },
  socials: { ...staticInstitute.socials },
};

/** Notices, newest first — the CIBS notice board. */
export const getNotices = cache(async (): Promise<Notice[]> => {
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({
      collection: "notices",
      where: { _status: { equals: "published" } },
      sort: "-date",
      limit: 100,
      depth: 1,
    });

    const mapped = docs.map((d) => {
      const attachment = typeof d.attachment === "object" ? uploadUrl(d.attachment) : null;
      return {
        category: d.category as NoticeCategory,
        date: d.date,
        title: d.title,
        href: attachment || d.externalUrl || "#",
        isNew: Boolean(d.isNew),
      };
    });
    // Never show an empty board — fall back to the last-known real notices.
    return mapped.length > 0 ? mapped : staticNotices;
  } catch (err) {
    console.error("[data] getNotices failed, using static content:", err);
    return staticNotices;
  }
});

export const getFaculties = cache(async (): Promise<Faculty[]> => {
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({ collection: "faculties", sort: "order", limit: 50, depth: 0 });
    if (docs.length === 0) return staticFaculties;
    return docs.map((d) => ({
      name: d.name,
      blurb: d.blurb,
      icon: d.icon as Faculty["icon"],
      points: (d.points ?? []).map((p) => p.text),
    }));
  } catch (err) {
    console.error("[data] getFaculties failed, using static content:", err);
    return staticFaculties;
  }
});

export const getProgrammes = cache(async (): Promise<Programme[]> => {
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({ collection: "programmes", sort: "order", limit: 50, depth: 0 });
    if (docs.length === 0) return staticProgrammes;
    return docs.map((d) => ({
      level: d.level,
      title: d.title,
      note: d.note,
      duration: d.duration ?? undefined,
    }));
  } catch (err) {
    console.error("[data] getProgrammes failed, using static content:", err);
    return staticProgrammes;
  }
});

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({ collection: "gallery-items", sort: "order", limit: 50, depth: 1 });
    const mapped = docs
      .map((d) => {
        const src = typeof d.image === "object" ? uploadUrl(d.image) : null;
        return src ? { src, title: d.title, tag: d.tag } : null;
      })
      .filter((x): x is GalleryItem => x !== null);
    return mapped.length > 0 ? mapped : staticGallery;
  } catch (err) {
    console.error("[data] getGallery failed, using static content:", err);
    return staticGallery;
  }
});

export const getHighlights = cache(async (): Promise<Highlight[]> => {
  try {
    const payload = await payloadClient();
    const { docs } = await payload.find({ collection: "highlights", sort: "order", limit: 20, depth: 1 });
    const mapped = docs
      .map((d) => {
        const src = typeof d.image === "object" ? uploadUrl(d.image) : null;
        return src ? { src, title: d.title, caption: d.caption } : null;
      })
      .filter((x): x is Highlight => x !== null);
    return mapped.length > 0 ? mapped : staticHighlights;
  } catch (err) {
    console.error("[data] getHighlights failed, using static content:", err);
    return staticHighlights;
  }
});

export const getSettings = cache(async (): Promise<Settings> => {
  try {
    const payload = await payloadClient();
    const s = await payload.findGlobal({ slug: "institute-settings", depth: 0 });
    if (!s?.name) return staticSettings;
    return {
      name: s.name,
      shortName: s.shortName,
      status: s.status,
      ministry: s.ministry,
      founded: s.founded,
      tagline: s.tagline,
      phone: s.phone,
      email: s.email,
      address: { line1: s.addressLine1, line2: s.addressLine2 },
      socials: {
        facebook: s.facebook || staticSettings.socials.facebook,
        instagram: s.instagram || staticSettings.socials.instagram,
        youtube: s.youtube || staticSettings.socials.youtube,
      },
    };
  } catch (err) {
    console.error("[data] getSettings failed, using static content:", err);
    return staticSettings;
  }
});
