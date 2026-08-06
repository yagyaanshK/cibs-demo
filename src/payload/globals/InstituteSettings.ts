import type { GlobalConfig } from "payload";

/**
 * Site-wide details shown in the header, footer and contact page.
 * A single editable record — no risk of staff creating duplicates.
 */
export const InstituteSettings: GlobalConfig = {
  slug: "institute-settings",
  label: "Institute Settings",
  admin: {
    group: "Settings",
    description: "Name, contact details and social links used across the website.",
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: "collapsible",
      label: "Identity",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "shortName", type: "text", required: true },
        { name: "status", type: "text", required: true, admin: { description: 'e.g. "Deemed to be University"' } },
        { name: "ministry", type: "text", required: true },
        { name: "founded", type: "number", required: true },
        { name: "tagline", type: "textarea", required: true },
      ],
    },
    {
      type: "collapsible",
      label: "Contact",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "addressLine1", type: "text", required: true },
        { name: "addressLine2", type: "text", required: true },
      ],
    },
    {
      type: "collapsible",
      label: "Social",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "youtube", type: "text" },
      ],
    },
  ],
};
