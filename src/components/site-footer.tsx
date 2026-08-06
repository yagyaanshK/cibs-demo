import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { EndlessKnot, IconMail, IconPhone, IconPin } from "./icons";
import { nav, quickLinks } from "@/lib/content";
import type { Settings } from "@/lib/data";

export function SiteFooter({ institute }: { institute: Settings }) {
  return (
    <footer className="mt-24 bg-maroon-900 text-cream/80">
      <div className="dharma-pattern">
        <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + address */}
          <div className="lg:col-span-1">
            <BrandMark tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {institute.status} under the {institute.ministry}. Established {institute.founded}.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{institute.address.line1}, {institute.address.line2}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${institute.phone}`} className="hover:text-gold-soft">{institute.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${institute.email}`} className="hover:text-gold-soft">{institute.email}</a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <FooterCol title="Explore">
            {nav.slice(0, 6).map((n) => (
              <FooterLink key={n.label} href={n.href}>{n.label}</FooterLink>
            ))}
          </FooterCol>

          {/* Quick links */}
          <FooterCol title="Quick Links">
            {quickLinks.map((q) => (
              <FooterLink key={q.label} href={q.href}>{q.label}</FooterLink>
            ))}
            <FooterLink href="/admin-preview">Website CMS Preview</FooterLink>
            <FooterLink href="/ums-preview">University System Preview</FooterLink>
            <FooterLink href="/mobile-preview">Mobile Portal Preview</FooterLink>
          </FooterCol>

          {/* Connect */}
          <div>
            <h3 className="font-display text-lg text-cream">Connect</h3>
            <div className="mt-4 gold-rule" />
            <div className="mt-5 flex gap-3">
              {Object.entries(institute.socials).map(([k, href]) => (
                <a
                  key={k}
                  href={href}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-gold hover:text-gold"
                  aria-label={k}
                >
                  <span className="text-xs font-semibold uppercase">{k.slice(0, 2)}</span>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-cream/50">
              Follow CIBS for admissions updates, seminars, and campus events across the academic year.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-cream/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {institute.name}, Choglamsar, Leh. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <EndlessKnot className="h-4 w-4 text-gold/70" />
            <span>Designed &amp; developed by Thirdpole Solutions, Leh</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg text-cream">{title}</h3>
      <div className="mt-4 gold-rule" />
      <ul className="mt-5 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-cream/70 transition-colors hover:text-gold-soft">
        {children}
      </Link>
    </li>
  );
}
