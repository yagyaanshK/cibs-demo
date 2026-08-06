import type { CollectionConfig } from "payload";

/**
 * Applicant accounts — people applying to CIBS.
 *
 * Sign-in is passwordless: the applicant receives a one-time code by email
 * (see src/app/(frontend)/api/applicant-auth). Payload's local strategy is kept
 * underneath (it issues the JWT), but the password is machine-generated and
 * never shown to or chosen by the applicant.
 *
 * This is a separate collection from `users` (CIBS staff) so applicants can
 * never reach the admin panel.
 */
export const Applicants: CollectionConfig = {
  slug: "applicants",
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 hours
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "fullName", "phone", "createdAt"],
    group: "Admissions",
    description: "Accounts created by applicants. Staff can view but should not edit these.",
  },
  access: {
    // Staff read them in the panel; applicants may only read themselves.
    read: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") return true;
      return { id: { equals: user.id } };
    },
    create: () => true, // sign-up happens through the OTP endpoint
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (user.collection === "users") return true;
      return { id: { equals: user.id } };
    },
    delete: ({ req: { user } }) => user?.collection === "users",
    admin: () => false, // applicants must never access /admin
  },
  fields: [
    { name: "fullName", type: "text" },
    { name: "phone", type: "text" },
    {
      name: "otpHash",
      type: "text",
      hidden: true,
      access: { read: () => false, update: () => false, create: () => false },
    },
    {
      name: "otpExpiresAt",
      type: "date",
      hidden: true,
      access: { read: () => false, update: () => false, create: () => false },
    },
  ],
};
