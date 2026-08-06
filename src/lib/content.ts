/**
 * CIBS website content model — single source of truth.
 *
 * Content and assets here are drawn from the Institute's own public material
 * (cibs.ac.in) so the prototype is authentic. It is deliberately structured as
 * typed records so that each collection maps 1:1 to a future Payload CMS
 * collection editable from the university admin panel.
 */

export const institute = {
  name: "Central Institute of Buddhist Studies",
  shortName: "CIBS",
  status: "Deemed to be University",
  ministry: "Ministry of Culture, Government of India",
  founded: 1959,
  foundedLong: "23rd October 1959",
  founder: "Ven. Kushok Bakula Rinpoche (1917–2003)",
  tagline: "A living continuation of the Nalanda tradition in the heart of the Himalayas.",
  address: {
    line1: "Choglamsar, Leh",
    line2: "Ladakh (UT) — 194104",
  },
  phone: "+91-1982-264287",
  email: "cibsladakh@gmail.com",
  socials: {
    facebook: "https://facebook.com/cibsladakh",
    instagram: "https://instagram.com/cibs.leh",
    youtube: "https://youtube.com/@cibsladakh",
  },
} as const;

export const languages = [
  { code: "en", label: "English", short: "EN", active: true },
  { code: "hi", label: "हिन्दी", short: "HI", active: false },
  { code: "bo", label: "བོད་ཡིག", short: "བོ", active: false },
] as const;

export type NavLeaf = { label: string; href: string; external?: boolean };
export type NavChild = { label: string; href: string; external?: boolean; children?: NavLeaf[] };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/**
 * Full navigation, mirroring the structure of the official CIBS website
 * (13 top-level sections). Links point to built pages/anchors where they exist,
 * to the Institute's real external resources (YouTube, PDFs) where the original
 * does, and otherwise to the parent section page — so there are no dead links.
 * Sub-pages fill in during the content phase.
 */
export const nav: NavItem[] = [
  {
    label: "About HEI",
    href: "/about",
    children: [
      { label: "Historical Background", href: "/about#history" },
      { label: "Vision & Mission", href: "/about#vision" },
      { label: "The Institute at a Glance", href: "/about#glance" },
      {
        label: "AISHE / IQAC / NIRF",
        href: "/about#accreditation",
        children: [
          { label: "AISHE", href: "/about#accreditation" },
          { label: "NAAC", href: "/about#accreditation" },
          { label: "NIRF", href: "/about#accreditation" },
          { label: "IQAC", href: "/about#accreditation" },
        ],
      },
      { label: "Institutional Development Plan", href: "/about" },
      { label: "Acts & Statutes", href: "/about" },
      { label: "Registration of Societies", href: "/about" },
      { label: "Kulgeet / University Anthem", href: "/about" },
      { label: "RTI", href: "/about" },
      { label: "How to Reach", href: "/contact" },
      { label: "Campus / Virtual Tour", href: "/gallery" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Administration",
    href: "/administration",
    children: [
      { label: "Organization Chart", href: "/administration" },
      {
        label: "Administrators",
        href: "/administration#officers",
        children: [
          { label: "Chancellor", href: "/administration#chancellor" },
          { label: "Vice Chancellor", href: "/administration#chancellor" },
          { label: "Registrar", href: "/administration#officers" },
          { label: "Controller of Examinations", href: "/administration#officers" },
          { label: "Deans of the University", href: "/administration#officers" },
          { label: "Finance Division", href: "/administration#officers" },
          { label: "Ombudsperson", href: "/administration#officers" },
          { label: "Staff", href: "/administration#officers" },
        ],
      },
      { label: "Board of Studies", href: "/administration#bodies" },
      {
        label: "Statutory Bodies",
        href: "/administration#bodies",
        children: [
          { label: "Society", href: "/administration#bodies" },
          { label: "Board of Management", href: "/administration#bodies" },
          { label: "Finance Committee", href: "/administration#bodies" },
          { label: "Academic Council", href: "/administration#bodies" },
          { label: "Cells & Committees", href: "/administration#bodies" },
        ],
      },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Programmes & Courses", href: "/academics#programmes" },
      { label: "Syllabi", href: "/academics#programmes" },
      {
        label: "Faculties / Departments",
        href: "/academics#faculties",
        children: [
          { label: "Philosophy & Logic (Adhyatma & Nyaya Vidya)", href: "/academics#faculties" },
          { label: "Language (Sabdha Vidya)", href: "/academics#faculties" },
          { label: "Sowa Rigpa & Shilpa Vidya", href: "/academics#faculties" },
          { label: "Modern Studies (Adhunik Vidya)", href: "/academics#faculties" },
        ],
      },
      { label: "University Chairs", href: "/academics" },
      { label: "Value Added Courses", href: "/academics" },
      { label: "International Relations", href: "/academics" },
      { label: "Seminars / Workshops / Conferences", href: "/academics" },
      { label: "Special Lecture Series", href: "/academics" },
    ],
  },
  { label: "Admission & Fee", href: "/admissions" },
  {
    label: "Examination",
    href: "/examination",
    children: [
      { label: "Examination Ordinance", href: "/examination" },
      { label: "Question Bank & Sample Papers", href: "/examination" },
      { label: "Ph.D. Awardees", href: "/examination" },
      { label: "University Medalists", href: "/examination" },
      { label: "Examination Contact", href: "/examination" },
    ],
  },
  {
    label: "Research",
    href: "/research",
    children: [
      { label: "Research Guidelines", href: "/research" },
      { label: "Research Infrastructure", href: "/research" },
      { label: "Departmental Research Committees", href: "/research" },
      { label: "Research Scholars", href: "/research" },
      { label: "Ongoing Research Projects", href: "/research" },
      { label: "Publications", href: "/research" },
    ],
  },
  { label: "Library", href: "/library" },
  {
    label: "Students",
    href: "/students",
    children: [
      { label: "Student Welfare", href: "/students" },
      { label: "Sports Facilities", href: "/students" },
      { label: "National Cadet Corps (NCC)", href: "/students" },
      { label: "Monthly Magazine (Lobmay Gatsal)", href: "/students" },
      { label: "Career Counseling", href: "/students" },
      { label: "Internship", href: "/students" },
      { label: "Extension Activities", href: "/students" },
      { label: "Alumni", href: "/students" },
      { label: "Health Facilities", href: "/students" },
      { label: "Equal Opportunity Cell", href: "/students" },
      { label: "SC / ST Cell", href: "/students" },
    ],
  },
  {
    label: "Support Facilities",
    href: "/support-facilities",
    children: [
      { label: "Facilities", href: "/support-facilities" },
      { label: "Stipend", href: "/support-facilities" },
      { label: "Free Text Books", href: "/support-facilities" },
      { label: "Educational Tour", href: "/support-facilities" },
      { label: "Mental Health & Well-Being", href: "/support-facilities" },
      { label: "CIBS Online Classes", href: "https://www.youtube.com/channel/UCKWrTHSwpHZEILbG3bK1gsA/playlists", external: true },
      { label: "Sowa Rigpa Garden", href: "/support-facilities" },
    ],
  },
  {
    label: "School Section",
    href: "/school-section",
    children: [
      { label: "School Programs", href: "/school-section" },
      { label: "Affiliation (CBSE / COBSE)", href: "/school-section" },
      { label: "Syllabus", href: "/school-section" },
      { label: "School Examination", href: "/school-section" },
      {
        label: "Branch Schools",
        href: "/school-section",
        children: [
          { label: "Senior Secondary School", href: "/school-section" },
          { label: "Bauddha Darshan Sanskrit Vidyalaya, Mandogalu", href: "/school-section" },
          { label: "Duzin Photong School, Zanskar", href: "/school-section" },
          { label: "Feeder Schools", href: "/school-section" },
        ],
      },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Photo Gallery", href: "/gallery" },
      { label: "Video Gallery", href: "https://www.youtube.com/channel/UCpswBmC-s3AgNXZnUOO1zhw/videos", external: true },
    ],
  },
  { label: "Information Corner", href: "/information-corner" },
  { label: "Public Self-Disclosure", href: "/public-self-disclosure" },
];

export type NoticeCategory = "Notice" | "Advertisement" | "Event" | "Tender";

export type Notice = {
  category: NoticeCategory;
  date: string; // ISO
  title: string;
  href: string;
  isNew?: boolean;
};

/** Real announcements from the CIBS notice board. */
export const notices: Notice[] = [
  { category: "Tender", date: "2026-07-08", title: "Tender Notice: Supply of Library Stationery Items (CIBS, Leh), 2026", href: "#", isNew: true },
  { category: "Tender", date: "2026-07-08", title: "Tender Notice: Supply of Sowa-Rigpa Medicines (CIBS, Leh), 2026", href: "#", isNew: true },
  { category: "Notice", date: "2026-05-30", title: "Official Ph.D. Admission Notification — Academic Year 2026–27", href: "#", isNew: true },
  { category: "Notice", date: "2026-05-27", title: "CIBS B.S.R.M.S. Admission Notifications & Announcements 2026–27", href: "#", isNew: true },
  { category: "Advertisement", date: "2026-05-05", title: "Vacancy Circular: Post of Director, Central Institute of Himalayan Culture Studies (CIHCS), Dahung", href: "#" },
  { category: "Advertisement", date: "2026-04-03", title: "CIBS Recruitment 2026 — Centre Coordinator & Vertical Experts", href: "#" },
  { category: "Tender", date: "2026-03-18", title: "Tender Notice for Running Departmental Canteen (2026)", href: "#" },
  { category: "Notice", date: "2026-03-09", title: "Ph.D. Course Work Examination Result 2025–26", href: "#" },
  { category: "Notice", date: "2026-02-27", title: "Extension of Last Date for Admission Form — Academic Session 2026–27", href: "#" },
  { category: "Notice", date: "2026-01-30", title: "CIBS Invites Applications for Admission to First Year Courses — 2026", href: "#" },
];

export type Faculty = {
  name: string;
  blurb: string;
  points: string[];
  icon: "lotus" | "script" | "herb" | "compass";
};

export const faculties: Faculty[] = [
  {
    name: "Philosophy & Logic",
    blurb: "Classical Buddhist philosophy, epistemology and logic studied through Bhoti and Sanskrit sources in the Nalanda tradition.",
    points: ["Madhyamaka & Pramāṇa", "Bhoti / Sanskrit texts", "Comparative Philosophy"],
    icon: "lotus",
  },
  {
    name: "Language",
    blurb: "Classical and modern languages and literature, preserving the textual heritage of the Himalayan Buddhist world.",
    points: ["Bhoti, Sanskrit, Pali", "Hindi & English", "Literature & Translation"],
    icon: "script",
  },
  {
    name: "Sowa Rigpa (Medical Science)",
    blurb: "The B.S.R.M.S. programme in the traditional Himalayan science of healing, from materia medica to clinical practice.",
    points: ["B.S.R.M.S. degree", "Traditional pharmacology", "Clinical training"],
    icon: "herb",
  },
  {
    name: "Modern Studies",
    blurb: "Sciences and social sciences aligned to NEP-2020, connecting classical scholarship with contemporary disciplines.",
    points: ["NEP-2020 aligned", "Sciences & Social Sciences", "Skill & Vocational"],
    icon: "compass",
  },
];

export const stats = [
  { value: "1959", label: "Established" },
  { value: "04", label: "Faculties of study" },
  { value: "Deemed", label: "University status" },
  { value: "NEP-2020", label: "Aligned curriculum" },
];

export type Programme = { level: string; title: string; note: string; duration?: string };

export const programmes: Programme[] = [
  { level: "Undergraduate", title: "Bachelor Programmes (NEP-2020)", note: "Four-year multidisciplinary degrees across the faculties.", duration: "4 Years" },
  { level: "Postgraduate", title: "Master Programmes", note: "Advanced study in philosophy, language and Buddhist studies.", duration: "2 Years" },
  { level: "Doctoral", title: "Ph.D. Programmes (2024 Regulations)", note: "Research in Buddhist philosophy, literature and comparative studies.", duration: "3–5 Years" },
  { level: "Professional", title: "B.S.R.M.S. — Sowa Rigpa", note: "Degree in the traditional medical science of the Himalaya.", duration: "5.5 Years" },
];

export const quickLinks = [
  { label: "Admissions", href: "/admissions" },
  { label: "Examination", href: "/examination" },
  { label: "Downloads", href: "/notices" },
  { label: "IQAC / NAAC", href: "/about#accreditation" },
  { label: "Anti-Ragging Cell", href: "/students" },
  { label: "RTI", href: "/about" },
  { label: "Careers", href: "/notices" },
  { label: "How to Reach", href: "/contact" },
];

export type GalleryItem = { src: string; title: string; tag: string };

/** Real CIBS photographs from the Institute's media library. */
export const gallery: GalleryItem[] = [
  { src: "/images/campus-1.jpg", title: "The Great Buddha Statues, Main Campus", tag: "Choglamsar" },
  { src: "/images/hostel-monks.jpg", title: "Bakula Rinpoche Memorial Monks' Hostel", tag: "Residence" },
  { src: "/images/dispensary.jpg", title: "Sowa Rigpa Dispensary", tag: "Medicine" },
  { src: "/images/hostel-green-tara.jpg", title: "Green Tara Girls' Hostel", tag: "Residence" },
  { src: "/images/sports.jpg", title: "Sports & Athletics", tag: "Campus Life" },
  { src: "/images/campus-2.jpg", title: "CIBS, Ladakh", tag: "Heritage" },
  { src: "/images/hostel-boys.jpg", title: "Acharya Shantidev Boys' Hostel", tag: "Residence" },
];

export type Highlight = { src: string; title: string; caption: string };

/**
 * Featured photographs for the homepage carousel — functions, ceremonies and
 * dignitary events. Captions describe the occasion without attributing
 * unverified identities.
 */
export const highlights: Highlight[] = [
  { src: "/images/hl-function.jpg", title: "Ceremonial Function", caption: "A formal function in the Institute's assembly hall." },
  { src: "/images/hl-assembly.jpg", title: "Assembly & Prayer Hall", caption: "Students and faculty gather in the main assembly hall." },
  { src: "/images/hl-address.jpg", title: "Academic Address", caption: "An address delivered during a CIBS academic gathering." },
  { src: "/images/hl-seminar.jpg", title: "Seminar & Guest Lecture", caption: "Scholarly exchange at a seminar hosted by the Institute." },
  { src: "/images/hl-ncc.jpg", title: "NCC Felicitation", caption: "Felicitation ceremony for the Institute's NCC cadets." },
];

/* ---------------- Interior page content ---------------- */

export const history = {
  intro:
    "In the early thirteenth century, King Morup of Ladakh made it mandatory for young monks and novices to travel to Tibet for higher studies. For centuries thereafter, scholars from Ladakh pursued advanced monastic learning in the great Mahāvihāras of Drepung, Sera, Gaden, Tashi Lhunpo, Sakya and others.",
  paras: [
    "When that tradition of study in Tibet came to an abrupt end in 1959 due to political instability, the saint Venerable Kushok Bakula Rinpoche (1917–2003) took up the leadership of upholding the glory of Buddhism in Ladakh — above all by establishing Buddhist higher education within Ladakh itself. Leh was chosen as the centre for the dissemination of Buddhist culture and philosophy in view of its geophysical suitability and traditional matrix.",
    "Accordingly, ten major monasteries of Ladakh joined hands and, on 23rd October 1959, founded the School of Buddhist Philosophy (SBP) with their financial support. Ven. Ling Rinpoche, senior tutor of H.H. the XIV Dalai Lama, performed the consecration rituals. The School began with two teachers and ten students — one drawn from each of the ten major monasteries of Ladakh.",
    "From those beginnings the institution grew into the Central Institute of Buddhist Studies, and in due course was declared a Deemed to be University under the Ministry of Culture, Government of India — today advancing philosophy, language, the traditional medical science of Sowa Rigpa, and modern disciplines under NEP-2020.",
  ],
};

export const visionMission = {
  vision:
    "To be a pre-eminent seat of Buddhist learning that preserves, transmits and revitalises the philosophical, literary and medical heritage of the trans-Himalaya, in the living tradition of Nalanda.",
  mission: [
    "Preserve and promote the study of Buddhist philosophy, logic and the classical languages of the Himalaya.",
    "Advance the traditional medical science of Sowa Rigpa through rigorous academic and clinical training.",
    "Integrate classical scholarship with modern disciplines in line with NEP-2020.",
    "Foster research, translation and publication that serve scholarship and society alike.",
    "Nurture ethical, compassionate and skilled citizens rooted in cultural heritage.",
  ],
};

export const leadership = {
  chancellor: {
    name: "Shri Gajendra Singh Shekhawat",
    role: "Chancellor",
    detail: "Hon'ble Minister of Culture & Tourism, Government of India",
    photo: "/images/chancellor.jpg",
  },
  viceChancellor: {
    name: "Prof. Rajesh Ranjan",
    role: "Vice Chancellor",
    detail: "First Vice Chancellor, Central Institute of Buddhist Studies",
    photo: "/images/vc.jpg",
  },
  offices: [
    { role: "Vice Chancellor", holder: "Office of the Vice Chancellor" },
    { role: "Registrar", holder: "Office of the Registrar" },
    { role: "Controller of Examinations", holder: "Examination Division" },
    { role: "Finance Officer", holder: "Finance Division" },
    { role: "Deans of Faculties", holder: "Four Faculty Deans" },
    { role: "Ombudsperson", holder: "Grievance Redressal" },
  ],
  bodies: [
    "Board of Management",
    "Academic Council",
    "Board of Studies",
    "Finance Committee",
    "Internal Quality Assurance Cell (IQAC)",
    "Equal Opportunity Cell",
  ],
};

export const admissionSteps = [
  { step: "01", title: "Choose a Programme", text: "Review eligibility for UG, PG, Ph.D. or B.S.R.M.S. (Sowa Rigpa) programmes across the four faculties." },
  { step: "02", title: "Apply Online", text: "Complete the admission form for the relevant session and upload the required documents." },
  { step: "03", title: "Entrance / Merit", text: "Selection is through entrance test and/or merit as prescribed for each programme (e.g. Ph.D. RET)." },
  { step: "04", title: "Counselling & Fee", text: "Attend counselling, confirm your seat and pay the fee as per the Institute's fee structure." },
  { step: "05", title: "Enrolment", text: "Complete registration and receive your student ID to begin the academic session." },
];

/** Lightweight content for the simpler interior pages, one template renders them. */
export type InfoPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  cards: { title: string; text: string }[];
  links?: { label: string; href: string }[];
};

export const infoPages: Record<string, InfoPage> = {
  examination: {
    slug: "examination",
    title: "Examination",
    eyebrow: "Examination Division",
    intro:
      "The Examination Division conducts the Institute's assessments end to end — from date-sheets and admit cards to results, re-checking and the maintenance of academic records — in accordance with the University's Examination Ordinance.",
    cards: [
      { title: "Examination Ordinance", text: "Rules governing conduct of examinations, evaluation and grievance." },
      { title: "Date Sheets & Admit Cards", text: "Schedules and hall tickets for semester and annual examinations." },
      { title: "Results & Re-checking", text: "Declaration of results, revaluation and re-checking procedures." },
      { title: "Question Bank & Samples", text: "Sample papers and question banks for students' preparation." },
    ],
    links: [
      { label: "Examination Ordinance", href: "#" },
      { label: "Latest Results", href: "/notices" },
      { label: "Controller of Examinations", href: "/administration" },
    ],
  },
  research: {
    slug: "research",
    title: "Research",
    eyebrow: "Research & Publications",
    intro:
      "CIBS advances original scholarship in Buddhist philosophy, language and Sowa Rigpa, supported by a Departmental Research Committee, research guidelines and dedicated infrastructure for doctoral and post-doctoral work.",
    cards: [
      { title: "Ph.D. Programmes", text: "Doctoral research under the 2024 regulations across disciplines." },
      { title: "Research Guidelines", text: "Framework for supervision, ethics and submission of theses." },
      { title: "Research Infrastructure", text: "Manuscript resources, libraries and study facilities." },
      { title: "Publications", text: "Journals, translations and the Institute's scholarly output." },
    ],
    links: [{ label: "Ph.D. Notifications", href: "/notices" }, { label: "Research Guidelines", href: "#" }],
  },
  library: {
    slug: "library",
    title: "Library",
    eyebrow: "Knowledge Resources",
    intro:
      "The Institute's library is a custodian of rare Buddhist texts, manuscripts and modern scholarship — a vital resource for students, researchers and the wider community of Himalayan studies.",
    cards: [
      { title: "Collections", text: "Bhoti, Sanskrit and modern collections across the disciplines." },
      { title: "Manuscripts", text: "Rare manuscripts and the textual heritage of the Himalaya." },
      { title: "Reading & Reference", text: "Reading halls and reference services for scholars." },
      { title: "Digital Resources", text: "Access to digital catalogues and e-resources." },
    ],
  },
  students: {
    slug: "students",
    title: "Students",
    eyebrow: "Student Life & Welfare",
    intro:
      "Beyond the classroom, CIBS supports the whole student — through welfare, sports, NCC, health facilities, scholarships and a residential campus set against the Himalaya.",
    cards: [
      { title: "Hostels & Residence", text: "Separate hostels for monks, boys and girls on campus." },
      { title: "Scholarships & Stipend", text: "Financial support, free text-books and stationery." },
      { title: "Sports & NCC", text: "Athletics, sports facilities and National Cadet Corps." },
      { title: "Health & Wellness", text: "Health facilities and student support cells." },
    ],
    links: [{ label: "Anti-Ragging Cell", href: "#" }, { label: "Scholarships", href: "#" }, { label: "Alumni", href: "#" }],
  },
  "support-facilities": {
    slug: "support-facilities",
    title: "Support Facilities",
    eyebrow: "For Our Students",
    intro:
      "CIBS supports every student with financial assistance, learning resources and wellbeing services — so that scholarship in the Himalaya is accessible to all.",
    cards: [
      { title: "Stipend & Free Text Books", text: "Financial support and free text-books and stationery for eligible students." },
      { title: "Educational Tours", text: "Study tours that connect classroom learning with the living heritage of the region." },
      { title: "Mental Health & Well-Being", text: "Counselling and wellness support for a healthy campus life." },
      { title: "Sowa Rigpa Garden", text: "A living garden of medicinal plants central to the study of Sowa Rigpa." },
    ],
    links: [
      { label: "CIBS Online Classes (YouTube)", href: "https://www.youtube.com/channel/UCKWrTHSwpHZEILbG3bK1gsA/playlists" },
    ],
  },
  "school-section": {
    slug: "school-section",
    title: "School Section",
    eyebrow: "Foundations of Learning",
    intro:
      "Alongside its university programmes, CIBS runs a school section and a network of branch and feeder schools carrying Buddhist and modern education across Ladakh.",
    cards: [
      { title: "School Programmes", text: "Structured schooling affiliated to CBSE and COBSE." },
      { title: "Syllabus & Examination", text: "Prescribed syllabi, question banks and sample papers for school students." },
      { title: "Branch Schools", text: "Senior Secondary School and affiliated vidyalayas across the region." },
      { title: "Feeder Schools", text: "Gompa and feeder schools nurturing young learners toward the Institute." },
    ],
  },
  "information-corner": {
    slug: "information-corner",
    title: "Information Corner",
    eyebrow: "Notices & Resources",
    intro:
      "A single window to the Institute's notices, downloads, tenders and public information.",
    cards: [
      { title: "Notices & Announcements", text: "The latest notices, advertisements, events and tenders." },
      { title: "Downloads & Forms", text: "Admission forms, circulars and official documents." },
      { title: "Tenders", text: "Procurement notices and expressions of interest." },
      { title: "Contact Directory", text: "Reach the right office for your enquiry." },
    ],
    links: [
      { label: "Go to Notices", href: "/notices" },
      { label: "Contact", href: "/contact" },
    ],
  },
  "public-self-disclosure": {
    slug: "public-self-disclosure",
    title: "Public Self-Disclosure",
    eyebrow: "Transparency & Compliance",
    intro:
      "As a Deemed to be University, CIBS publishes mandatory disclosures on its governance, academics and administration in the public interest.",
    cards: [
      { title: "Institutional Information", text: "Status, statutes and governing bodies of the Institute." },
      { title: "Academic Disclosure", text: "Programmes, faculty and academic regulations." },
      { title: "Administrative Disclosure", text: "Organisation, committees and statutory information." },
      { title: "Accreditation & Compliance", text: "NAAC, NIRF, AISHE and related compliance records." },
    ],
    links: [{ label: "About the Institute", href: "/about" }, { label: "Administration", href: "/administration" }],
  },
};
