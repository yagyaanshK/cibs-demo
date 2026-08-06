import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/**
 * Two build modes:
 *
 *  - Default (`pnpm dev` / `pnpm build`): a normal server app. Required for the
 *    Payload admin panel at /admin, which needs a server + database.
 *
 *  - GITHUB_PAGES=true: a fully static export of the public site, used for the
 *    demo at cibs.thirdpolesolutions.in. The admin panel is not part of that
 *    build — a static host cannot run it. Content is baked in at build time.
 */
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default withPayload(nextConfig);
