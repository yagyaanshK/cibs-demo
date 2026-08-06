import Link from "next/link";

const DEMOS = [
  { id: "website", label: "Public Website", href: "/" },
  { id: "admin", label: "Website CMS", href: "/admin-preview" },
  { id: "ums", label: "University System", href: "/ums-preview" },
  { id: "mobile", label: "Mobile Portal", href: "/mobile-preview" },
] as const;

export type DemoId = (typeof DEMOS)[number]["id"];

export function DemoSwitcher({ active }: { active: DemoId }) {
  return (
    <div className="border-b border-maroon-100 bg-cream">
      <div className="shell flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <span className="rounded bg-maroon px-2 py-1 font-bold uppercase text-cream">Demo</span>
          <span>Evaluation environment · fictional records only</span>
        </div>
        <nav aria-label="CIBS demonstration links" className="flex gap-1 overflow-x-auto pb-1 lg:pb-0">
          {DEMOS.map((demo, index) => (
            <Link
              key={demo.id}
              href={demo.href}
              aria-current={active === demo.id ? "page" : undefined}
              className={`shrink-0 rounded px-3 py-2 text-xs font-semibold transition-colors ${
                active === demo.id
                  ? "bg-maroon text-cream"
                  : "text-ink-soft hover:bg-maroon-50 hover:text-maroon"
              }`}
            >
              <span className="mr-1.5 opacity-60">0{index + 1}</span>
              {demo.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
