import type { CollectionConfig } from "payload";

/**
 * Admin panel users — the CIBS staff who manage the website.
 *
 * Roles keep the panel safe for non-technical staff: an `editor` can publish
 * notices and edit content, only an `admin` can manage other users.
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Administration",
  },
  access: {
    // Staff only — applicants (a separate auth collection) must never see these.
    // Only administrators may create or delete accounts.
    read: ({ req: { user } }) => user?.collection === "users",
    create: ({ req: { user } }) => user?.collection === "users" && user.role === "admin",
    delete: ({ req: { user } }) => user?.collection === "users" && user.role === "admin",
    update: ({ req: { user } }) => user?.collection === "users",
    admin: ({ req: { user } }) => user?.collection === "users",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Full name of the staff member." },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Editor (can publish notices & edit content)", value: "editor" },
      ],
      admin: { description: "Administrators can additionally manage user accounts." },
    },
  ],
};
