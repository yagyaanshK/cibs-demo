/**
 * Builds the static public-site demo published to GitHub Pages
 * (https://cibs.thirdpolesolutions.in).
 *
 * Why this script exists: the Payload admin panel and its REST/GraphQL routes
 * are inherently dynamic and cannot be statically exported. For the demo build
 * only, we move `src/app/(payload)` aside so Next sees a purely static app,
 * then always put it back — including on failure.
 *
 * The database must be running: page content is read from the CMS and baked in.
 *
 *   pnpm build:demo
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const root = process.cwd();
const payloadDir = path.join(root, "src", "app", "(payload)");
const stashDir = path.join(root, ".payload-routes-stash");

function restore() {
  if (fs.existsSync(stashDir)) {
    if (fs.existsSync(payloadDir)) fs.rmSync(payloadDir, { recursive: true, force: true });
    fs.renameSync(stashDir, payloadDir);
    console.log("→ restored src/app/(payload)");
  }
}

// Make sure we never leave the repo in a broken state.
process.on("SIGINT", () => { restore(); process.exit(1); });
process.on("SIGTERM", () => { restore(); process.exit(1); });

try {
  if (fs.existsSync(stashDir)) {
    throw new Error(`Stash dir ${stashDir} already exists — restore it before building.`);
  }
  if (!fs.existsSync(payloadDir)) {
    throw new Error("src/app/(payload) not found — is the working tree intact?");
  }

  console.log("→ stashing src/app/(payload) for the static export");
  fs.renameSync(payloadDir, stashDir);

  fs.rmSync(path.join(root, "out"), { recursive: true, force: true });
  // Next's generated route types still point at the stashed admin routes, which
  // fails the type check. Start from a clean slate.
  fs.rmSync(path.join(root, ".next"), { recursive: true, force: true });

  console.log("→ building static export…\n");
  execSync("next build", {
    stdio: "inherit",
    env: { ...process.env, GITHUB_PAGES: "true" },
  });

  // GitHub Pages assets
  fs.writeFileSync(path.join(root, "out", "CNAME"), "cibs.thirdpolesolutions.in\n");
  fs.writeFileSync(path.join(root, "out", ".nojekyll"), "");
  console.log("\n→ wrote CNAME + .nojekyll");
} finally {
  restore();
}

console.log("\n✅ Static demo built to ./out");
