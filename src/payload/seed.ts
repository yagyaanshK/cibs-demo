/**
 * Seeds the CMS with the real CIBS content the site currently ships with, so
 * the admin panel opens onto a populated site rather than empty collections.
 *
 * Safe to re-run: it clears the seeded collections first.
 *
 *   pnpm seed
 */
import "dotenv/config";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../payload.config.js";
import {
  institute,
  notices,
  faculties,
  programmes,
  gallery,
  highlights,
} from "../lib/content.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../public");

/**
 * Admin credentials come from the environment. If no password is supplied we
 * generate a strong random one and print it once — so a weak default is never
 * baked into the repository or shipped to production.
 */
const ADMIN_EMAIL = process.env.PAYLOAD_ADMIN_EMAIL || "admin@cibs.ac.in";
const generatedPassword = crypto.randomBytes(12).toString("base64url");
const ADMIN_PASSWORD = process.env.PAYLOAD_ADMIN_PASSWORD || generatedPassword;

async function seed() {
  const payload = await getPayload({ config });

  console.log("→ clearing existing seeded data…");
  for (const slug of ["notices", "highlights", "faculties", "programmes", "gallery-items", "media"] as const) {
    await payload.delete({ collection: slug, where: { id: { exists: true } } });
  }

  // ---- admin user ----
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: ADMIN_EMAIL } },
    limit: 1,
  });
  if (existing.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        name: "CIBS Administrator",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      },
    });
    console.log(`→ created admin user: ${ADMIN_EMAIL}`);
    if (!process.env.PAYLOAD_ADMIN_PASSWORD) {
      console.log(`  ⚠  generated password (shown once, change after first login): ${ADMIN_PASSWORD}`);
    }
  } else {
    console.log("→ admin user already exists, password unchanged");
  }

  // ---- institute settings ----
  await payload.updateGlobal({
    slug: "institute-settings",
    data: {
      name: institute.name,
      shortName: institute.shortName,
      status: institute.status,
      ministry: institute.ministry,
      founded: institute.founded,
      tagline: institute.tagline,
      phone: institute.phone,
      email: institute.email,
      addressLine1: institute.address.line1,
      addressLine2: institute.address.line2,
      facebook: institute.socials.facebook,
      instagram: institute.socials.instagram,
      youtube: institute.socials.youtube,
    },
  });
  console.log("→ institute settings saved");

  // ---- notices ----
  for (const n of notices) {
    await payload.create({
      collection: "notices",
      data: {
        title: n.title,
        category: n.category,
        date: new Date(n.date).toISOString(),
        isNew: Boolean(n.isNew),
        _status: "published",
      },
    });
  }
  console.log(`→ ${notices.length} notices seeded`);

  // ---- faculties ----
  for (const [i, f] of faculties.entries()) {
    await payload.create({
      collection: "faculties",
      data: {
        name: f.name,
        blurb: f.blurb,
        icon: f.icon,
        order: i,
        points: f.points.map((text) => ({ text })),
      },
    });
  }
  console.log(`→ ${faculties.length} faculties seeded`);

  // ---- programmes ----
  for (const [i, p] of programmes.entries()) {
    await payload.create({
      collection: "programmes",
      data: {
        title: p.title,
        level: p.level as "Undergraduate" | "Postgraduate" | "Doctoral" | "Professional",
        note: p.note,
        duration: p.duration,
        order: i,
      },
    });
  }
  console.log(`→ ${programmes.length} programmes seeded`);

  // ---- gallery (uploads the real photographs) ----
  for (const [i, g] of gallery.entries()) {
    const filePath = path.join(publicDir, g.src.replace(/^\//, ""));
    const media = await payload.create({
      collection: "media",
      data: { alt: g.title, caption: g.title },
      filePath,
    });
    await payload.create({
      collection: "gallery-items",
      data: { title: g.title, tag: g.tag, order: i, image: media.id },
    });
  }
  console.log(`→ ${gallery.length} gallery items seeded`);

  // ---- highlights carousel ----
  for (const [i, h] of highlights.entries()) {
    const filePath = path.join(publicDir, h.src.replace(/^\//, ""));
    const media = await payload.create({
      collection: "media",
      data: { alt: h.title, caption: h.caption },
      filePath,
    });
    await payload.create({
      collection: "highlights",
      data: { title: h.title, caption: h.caption, order: i, image: media.id },
    });
  }
  console.log(`→ ${highlights.length} highlights seeded`);

  console.log("\n✅ Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
