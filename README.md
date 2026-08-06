# CIBS Website & University Management System

The website for the **Central Institute of Buddhist Studies (CIBS)**, Choglamsar, Leh — a Deemed to be University under the Ministry of Culture, Government of India.

Built and maintained by **Thirdpole Solutions, Leh**.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 (theme tokens in `src/app/(frontend)/globals.css`) |
| CMS / Admin | Payload CMS 3 (mounted at `/admin`) |
| Database | PostgreSQL 16 |
| Fonts | Fraunces (display) + Inter (body) |

## Prerequisites

- Node 22+, pnpm
- Docker (for the local PostgreSQL)

## Getting started

```bash
# 1. Start the database (PostgreSQL on port 5434)
pnpm db:up          # first time: see "Database" below

# 2. Environment
cp .env.example .env   # then set PAYLOAD_SECRET

# 3. Install & run
pnpm install
pnpm dev
```

- Public site → http://localhost:3000
- Admin panel → http://localhost:3000/admin

### Database

First-time creation of the local Postgres container:

```bash
docker run -d --name cibs-postgres \
  -e POSTGRES_USER=cibs -e POSTGRES_PASSWORD=cibs_dev_pw -e POSTGRES_DB=cibs \
  -p 5434:5432 -v cibs_pgdata:/var/lib/postgresql/data postgres:16-alpine
```

Thereafter `pnpm db:up` / `pnpm db:down`. Port **5434** is used to avoid clashing with other local projects.

### Seed

```bash
pnpm seed
```

Populates the CMS with the real CIBS content (notices, faculties, programmes, photographs) and creates an admin user.

Credentials come from the environment; if `PAYLOAD_ADMIN_PASSWORD` is unset the seed generates a strong password and prints it **once**:

```bash
PAYLOAD_ADMIN_EMAIL=admin@cibs.ac.in PAYLOAD_ADMIN_PASSWORD='<strong-password>' pnpm seed
```

> Change the password from **Account** in the admin panel after first login. Never ship a shared or default password to CIBS.

## Project structure

```
src/
  app/
    (frontend)/        public website — its own layout, header/footer
    (payload)/         admin panel + REST/GraphQL API (generated structure)
  components/          UI components (presentational; take data as props)
  lib/
    content.ts         static content model + seed source of truth
    data.ts            server-side reads from Payload (Local API)
  payload/
    collections/       Notices, Faculties, Programmes, GalleryItems, Media, Users
    globals/           InstituteSettings
    seed.ts
  payload.config.ts
```

## Content flow

Staff publish in `/admin` → stored in Postgres → the public pages read via Payload's Local API. Notice pages use **ISR (`revalidate = 60`)**, so new notices appear within a minute while the public still gets a cached static page (important on result/admission days).

## Builds

```bash
pnpm build          # normal server build (required for /admin)
pnpm start
```

### Static demo export

The public demo at **https://cibs.thirdpolesolutions.in** is a static export published to GitHub Pages (repo `yagyaanshK/cibs-demo`, `gh-pages` branch).

```bash
GITHUB_PAGES=true pnpm build      # emits ./out (database must be running — content is baked in)
```

> The admin panel is **not** part of the static export — a static host cannot run it. The production site will need a real server (see below).

## Production notes

Per the CIBS proposal, the system **must be hosted within India** and the source code and data are handed over to CIBS (no vendor lock-in). Intended production shape:

- Indian-region VM on a MeitY-empanelled cloud, app in Docker
- Managed PostgreSQL with automated backups / PITR
- S3 (Mumbai) for uploads — swap `Media.upload.staticDir` for `@payloadcms/storage-s3`
- Cloudflare in front for CDN, WAF, DDoS and TLS

## Useful commands

```bash
pnpm generate:types      # regenerate src/payload-types.ts after schema changes
pnpm generate:importmap  # regenerate the admin import map
```
