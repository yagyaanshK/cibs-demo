import type { CollectionConfig } from "payload";

/**
 * Uploads — notice PDFs, campus photographs, documents.
 *
 * Files land in public/uploads so they are served directly. When the site moves
 * to the production server this can be swapped for S3 (Mumbai) via the
 * @payloadcms/storage-s3 plugin without touching any of the content.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true, // public site needs to read media
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 480, height: 360, position: "centre" },
      { name: "card", width: 900, height: 675, position: "centre" },
      { name: "hero", width: 1920, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      admin: { description: "Describe the image for screen readers (required for accessibility / GIGW)." },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
