import type { CollectionConfig } from "payload";

/**
 * Featured photographs for the homepage carousel — functions, ceremonies,
 * dignitary visits and events. This is where CIBS staff add a new photo the
 * next time a Minister or dignitary visits, and it appears on the landing page.
 */
export const Highlights: CollectionConfig = {
  slug: "highlights",
  labels: { singular: "Highlight", plural: "Highlights" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "caption", "order"],
    group: "Content",
    description: "Photographs shown in the homepage highlights carousel.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    { name: "caption", type: "text", required: true, admin: { description: "One line describing the occasion." } },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
    { name: "image", type: "upload", relationTo: "media", required: true },
  ],
};
