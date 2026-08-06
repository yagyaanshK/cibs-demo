/**
 * Logs into the real CIBS admin panel and captures screenshots of each screen,
 * which are then used to build the static admin preview.
 */
import puppeteer from "puppeteer-core";
import path from "path";
import fs from "fs";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const BASE = "http://localhost:3000";
const OUT = "k:/StartUp/SaaS/cibs-website/public/admin-preview";
const EMAIL = "admin@cibs.ac.in";
const PASSWORD = "ChangeMe!2026";

fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "dashboard", url: "/admin", label: "Dashboard" },
  { name: "notices-list", url: "/admin/collections/notices", label: "Notices list" },
  { name: "media", url: "/admin/collections/media", label: "Media library" },
  { name: "faculties", url: "/admin/collections/faculties", label: "Faculties" },
  { name: "programmes", url: "/admin/collections/programmes", label: "Programmes" },
  { name: "gallery", url: "/admin/collections/gallery-items", label: "Gallery" },
  { name: "users", url: "/admin/collections/users", label: "Users" },
  { name: "settings", url: "/admin/globals/institute-settings", label: "Institute settings" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: EDGE,
  headless: "new",
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  args: ["--disable-gpu", "--hide-scrollbars"],
});

const page = await browser.newPage();

// Force the light theme so the preview matches the CIBS site palette.
await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);

console.log("→ logging in…");
await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle2", timeout: 120000 });
await page.waitForSelector('input#field-email', { timeout: 60000 });
await page.type("input#field-email", EMAIL);
await page.type("input#field-password", PASSWORD);
await Promise.all([
  page.click('button[type="submit"], form button'),
  page.waitForNavigation({ waitUntil: "networkidle2", timeout: 120000 }).catch(() => {}),
]);
await sleep(3000);
console.log("   logged in, url:", page.url());

// Capture the login screen separately (logged out look), in a fresh context.
for (const s of shots) {
  console.log(`→ ${s.label}`);
  await page.goto(`${BASE}${s.url}`, { waitUntil: "networkidle2", timeout: 120000 });
  await sleep(3500);
  await page.screenshot({ path: path.join(OUT, `${s.name}.png`), fullPage: false });
}

// Open the first notice to show the edit form
console.log("→ notice edit form");
await page.goto(`${BASE}/admin/collections/notices`, { waitUntil: "networkidle2", timeout: 120000 });
await sleep(2500);
const link = await page.$('table a[href*="/admin/collections/notices/"]');
if (link) {
  await link.click();
  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 120000 }).catch(() => {});
  await sleep(3500);
  await page.screenshot({ path: path.join(OUT, "notice-edit.png"), fullPage: false });
} else {
  console.log("   (!) could not find a notice row link");
}

// Logged-out login screen. Captured in the SAME page context so it inherits the
// light-theme emulation — a fresh context renders dark and looks inconsistent
// next to the other screens.
console.log("→ login screen");
await page.goto(`${BASE}/admin/logout`, { waitUntil: "networkidle2", timeout: 120000 }).catch(() => {});
await sleep(2000);
await page.goto(`${BASE}/admin/login`, { waitUntil: "networkidle2", timeout: 120000 });
await sleep(3500);
await page.screenshot({ path: path.join(OUT, "login.png"), fullPage: false });

await browser.close();
console.log("\n✅ captured:", fs.readdirSync(OUT).join(", "));
