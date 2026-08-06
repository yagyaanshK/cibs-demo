import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Notices } from "./payload/collections/Notices";
import { Faculties } from "./payload/collections/Faculties";
import { Programmes } from "./payload/collections/Programmes";
import { GalleryItems } from "./payload/collections/GalleryItems";
import { Highlights } from "./payload/collections/Highlights";
import { Applicants } from "./payload/collections/Applicants";
import { Applications } from "./payload/collections/Applications";
import { InstituteSettings } from "./payload/globals/InstituteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · CIBS Admin",
      title: "CIBS Website Admin",
      description: "Manage notices, academics and content for the CIBS website.",
    },
    components: {
      graphics: {
        Logo: "@/components/admin/Logo#Logo",
        Icon: "@/components/admin/Icon#Icon",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Notices, Highlights, Faculties, Programmes, GalleryItems, Media, Applications, Applicants, Users],
  globals: [InstituteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
  // The site is read-only to the public; the admin panel is the write surface.
  cors: [],
  csrf: [],
});
