import type { CollectionConfig } from "payload";

/**
 * The Notice Board — the headline feature for CIBS staff.
 *
 * A member of staff can publish a notice, attach the PDF, pick a category and
 * it appears on the website immediately. Drafts let them prepare in advance.
 */
export const Notices: CollectionConfig = {
  slug: "notices",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "_status"],
    group: "Content",
    description: "Notices, advertisements, events and tenders shown on the website.",
    listSearchableFields: ["title"],
  },
  versions: {
    drafts: true, // prepare a notice, publish when ready
  },
  access: {
    // Only published notices are public; signed-in staff see drafts too.
    read: ({ req: { user } }) => {
      if (user) return true;
      return { _status: { equals: "published" } };
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  defaultSort: "-date",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "The headline shown on the notice board." },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "Notice",
      options: [
        { label: "Notice", value: "Notice" },
        { label: "Advertisement", value: "Advertisement" },
        { label: "Event", value: "Event" },
        { label: "Tender", value: "Tender" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "date",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" },
        description: "Date shown against the notice.",
      },
    },
    {
      name: "isNew",
      type: "checkbox",
      label: 'Show "NEW" badge',
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "attachment",
      type: "upload",
      relationTo: "media",
      admin: { description: "Optional PDF or image for this notice." },
    },
    {
      name: "externalUrl",
      type: "text",
      admin: {
        description: "Optional link, used only if no file is attached (e.g. an external portal).",
      },
    },
    {
      name: "body",
      type: "textarea",
      admin: { description: "Optional longer description." },
    },
  ],
};
