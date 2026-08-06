import type { Access, CollectionConfig, Where } from "payload";

/**
 * An admission application.
 *
 * The form the applicant sees is tailored to the programme they pick: the
 * `level` field is mirrored from the chosen programme, and the level-specific
 * groups below appear conditionally (both in the admin panel and on the public
 * form, which reads the same rules).
 *
 * Lifecycle: draft → submitted → under-review → shortlisted → admitted →
 * enrolled (or rejected). Reaching `enrolled` creates a Student record with an
 * auto-allocated student ID — see hooks/enrolOnAdmit.ts.
 */
const LEVELS = ["Undergraduate", "Postgraduate", "Doctoral", "Professional"] as const;

/** Staff see every application; an applicant only ever sees their own. */
const readOwnOrStaff: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.collection === "users") return true;
  const where: Where = { applicant: { equals: user.id } };
  return where;
};

/** Applicants may only edit their own application, and only while it is a draft. */
const updateOwnDraftOrStaff: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.collection === "users") return true;
  const where: Where = {
    and: [{ applicant: { equals: user.id } }, { status: { equals: "draft" } }],
  };
  return where;
};

export const Applications: CollectionConfig = {
  slug: "applications",
  admin: {
    useAsTitle: "applicationNumber",
    defaultColumns: ["applicationNumber", "fullName", "programme", "status", "submittedAt"],
    group: "Admissions",
    description: "Admission applications submitted by applicants.",
    listSearchableFields: ["applicationNumber", "fullName", "email"],
  },
  access: {
    read: readOwnOrStaff,
    create: ({ req: { user } }) => Boolean(user),
    update: updateOwnDraftOrStaff,
    delete: ({ req: { user } }) => user?.collection === "users",
  },
  defaultSort: "-createdAt",
  fields: [
    {
      name: "applicationNumber",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Allocated automatically when the application is submitted.",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      index: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Submitted", value: "submitted" },
        { label: "Under review", value: "under-review" },
        { label: "Shortlisted", value: "shortlisted" },
        { label: "Admitted", value: "admitted" },
        { label: "Enrolled", value: "enrolled" },
        { label: "Rejected", value: "rejected" },
      ],
      admin: {
        position: "sidebar",
        description: "Setting this to 'Enrolled' creates the student record and allocates a student ID.",
      },
      access: {
        // Applicants must never move their own application through the workflow.
        update: ({ req: { user } }) => user?.collection === "users",
      },
    },
    {
      name: "applicant",
      type: "relationship",
      relationTo: "applicants",
      required: true,
      index: true,
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "programme",
      type: "relationship",
      relationTo: "programmes",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "level",
      type: "select",
      options: LEVELS.map((l) => ({ label: l, value: l })),
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Mirrored from the chosen programme; drives which sections apply.",
      },
    },
    { name: "submittedAt", type: "date", admin: { position: "sidebar", readOnly: true } },

    // ---------------- Personal ----------------
    {
      type: "tabs",
      tabs: [
        {
          label: "Personal",
          fields: [
            { name: "fullName", type: "text", required: true },
            { name: "email", type: "email", required: true },
            { name: "phone", type: "text", required: true },
            { name: "dateOfBirth", type: "date" },
            {
              name: "gender",
              type: "select",
              options: [
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Other", value: "other" },
                { label: "Prefer not to say", value: "undisclosed" },
              ],
            },
            { name: "fatherName", type: "text", label: "Father's / Guardian's name" },
            { name: "nationality", type: "text", defaultValue: "Indian" },
            {
              name: "category",
              type: "select",
              options: ["General", "OBC", "SC", "ST", "EWS"].map((v) => ({ label: v, value: v })),
            },
            { name: "address", type: "textarea" },
            { name: "district", type: "text" },
            { name: "state", type: "text" },
            { name: "pincode", type: "text" },
          ],
        },
        {
          label: "Academic",
          fields: [
            // Common
            {
              name: "schooling",
              type: "group",
              label: "Schooling",
              admin: {
                condition: (data) => data?.level === "Undergraduate" || data?.level === "Professional",
              },
              fields: [
                { name: "class10Board", type: "text", label: "Class X board" },
                { name: "class10Year", type: "number", label: "Class X year" },
                { name: "class10Percentage", type: "number", label: "Class X %" },
                { name: "class12Board", type: "text", label: "Class XII board" },
                { name: "class12Year", type: "number", label: "Class XII year" },
                { name: "class12Percentage", type: "number", label: "Class XII %" },
                { name: "class12Stream", type: "text", label: "Class XII stream" },
              ],
            },
            {
              name: "graduation",
              type: "group",
              label: "Graduation",
              admin: {
                condition: (data) => data?.level === "Postgraduate" || data?.level === "Doctoral",
              },
              fields: [
                { name: "degree", type: "text", label: "Bachelor's degree" },
                { name: "university", type: "text" },
                { name: "year", type: "number" },
                { name: "percentage", type: "number", label: "Percentage / CGPA" },
              ],
            },
            {
              name: "postGraduation",
              type: "group",
              label: "Post-graduation",
              admin: { condition: (data) => data?.level === "Doctoral" },
              fields: [
                { name: "degree", type: "text", label: "Master's degree" },
                { name: "university", type: "text" },
                { name: "year", type: "number" },
                { name: "percentage", type: "number", label: "Percentage / CGPA" },
              ],
            },
            {
              name: "research",
              type: "group",
              label: "Research (Ph.D.)",
              admin: { condition: (data) => data?.level === "Doctoral" },
              fields: [
                {
                  name: "area",
                  type: "select",
                  label: "Proposed area of research",
                  options: [
                    "Buddhist Philosophy (Bhoti)",
                    "Buddhist Philosophy (Sanskrit)",
                    "Literature",
                    "Comparative Philosophy",
                    "History",
                  ].map((v) => ({ label: v, value: v })),
                },
                { name: "synopsis", type: "textarea", label: "Brief synopsis of proposed research" },
                { name: "netQualified", type: "checkbox", label: "UGC-NET / JRF qualified" },
              ],
            },
            {
              name: "sowaRigpa",
              type: "group",
              label: "Sowa Rigpa (B.S.R.M.S.)",
              admin: { condition: (data) => data?.level === "Professional" },
              fields: [
                { name: "biologyStudied", type: "checkbox", label: "Studied Biology at Class XII" },
                { name: "bhotiKnowledge", type: "select", label: "Knowledge of Bhoti", options: ["None", "Basic", "Proficient"].map((v) => ({ label: v, value: v })) },
              ],
            },
            { name: "otherQualifications", type: "textarea" },
          ],
        },
        {
          label: "Documents",
          fields: [
            {
              name: "documents",
              type: "array",
              label: "Uploaded documents",
              admin: { description: "Marksheets, certificates, ID proof, photograph." },
              fields: [
                {
                  name: "type",
                  type: "select",
                  required: true,
                  options: [
                    "Photograph",
                    "Class X Marksheet",
                    "Class XII Marksheet",
                    "Degree Certificate",
                    "Master's Marksheet",
                    "ID Proof (Aadhaar/Passport)",
                    "Category Certificate",
                    "Migration / Transfer Certificate",
                    "Other",
                  ].map((v) => ({ label: v, value: v })),
                },
                { name: "file", type: "upload", relationTo: "media", required: true },
                {
                  name: "verified",
                  type: "checkbox",
                  defaultValue: false,
                  admin: { description: "Ticked by CIBS staff once checked." },
                  access: { update: ({ req: { user } }) => user?.collection === "users" },
                },
              ],
            },
            {
              name: "transfer",
              type: "group",
              label: "Transfer / Migration",
              fields: [
                { name: "isTransfer", type: "checkbox", label: "This is a transfer / migration case" },
                {
                  name: "previousInstitution",
                  type: "text",
                  admin: { condition: (_, sibling) => Boolean(sibling?.isTransfer) },
                },
                {
                  name: "reason",
                  type: "textarea",
                  admin: { condition: (_, sibling) => Boolean(sibling?.isTransfer) },
                },
              ],
            },
          ],
        },
        {
          label: "Review",
          description: "Internal — not visible to the applicant.",
          fields: [
            {
              name: "reviewNotes",
              type: "textarea",
              access: {
                read: ({ req: { user } }) => user?.collection === "users",
                update: ({ req: { user } }) => user?.collection === "users",
              },
            },
            {
              name: "reviewedBy",
              type: "relationship",
              relationTo: "users",
              access: {
                read: ({ req: { user } }) => user?.collection === "users",
                update: ({ req: { user } }) => user?.collection === "users",
              },
            },
          ],
        },
      ],
    },
  ],
};
