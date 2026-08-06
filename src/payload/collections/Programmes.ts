import type { CollectionConfig } from "payload";

export const Programmes: CollectionConfig = {
  slug: "programmes",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "level", "duration", "order"],
    group: "Content",
    description: "Degrees offered, shown on the homepage, Academics and Admissions pages.",
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
    {
      name: "level",
      type: "select",
      required: true,
      options: [
        { label: "Undergraduate", value: "Undergraduate" },
        { label: "Postgraduate", value: "Postgraduate" },
        { label: "Doctoral", value: "Doctoral" },
        { label: "Professional", value: "Professional" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "duration",
      type: "text",
      admin: { position: "sidebar", description: "e.g. 4 Years" },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar" },
    },
    { name: "note", type: "textarea", required: true },
  ],
};
