import type { CollectionConfig } from "payload";

export const Faculties: CollectionConfig = {
  slug: "faculties",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "icon", "order"],
    group: "Content",
    description: "The faculties shown on the homepage and Academics page.",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: "order",
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "lotus",
      options: [
        { label: "Lotus", value: "lotus" },
        { label: "Scripture", value: "script" },
        { label: "Herb (medicine)", value: "herb" },
        { label: "Compass", value: "compass" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "blurb", type: "textarea", required: true },
    {
      name: "points",
      type: "array",
      label: "Highlights",
      maxRows: 4,
      fields: [{ name: "text", type: "text", required: true }],
    },
  ],
};
