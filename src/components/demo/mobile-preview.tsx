"use client";

import { useState } from "react";
import { Compass, DharmaWheel, IconArrow, IconMail, Lotus, Script } from "@/components/icons";

type TabId = "home" | "academics" | "notices" | "profile";
type Language = "EN" | "HI" | "BO";

const greetings: Record<Language, { salutation: string; next: string }> = {
  EN: { salutation: "Good afternoon, Tashi", next: "Your next class begins at 11:15 in the Language Lab." },
  HI: { salutation: "नमस्कार, ताशी", next: "आपकी अगली कक्षा 11:15 बजे भाषा प्रयोगशाला में है।" },
  BO: { salutation: "བཀྲ་ཤིས་བདེ་ལེགས།", next: "ཐུན་རྗེས་མ་ཆུ་ཚོད་ 11:15 ལ་ཡིན།" },
};

const tabs: Array<{ id: TabId; label: string; icon: typeof Compass }> = [
  { id: "home", label: "Home", icon: Compass },
  { id: "academics", label: "Academics", icon: Script },
  { id: "notices", label: "Notices", icon: IconMail },
  { id: "profile", label: "Profile", icon: Lotus },
];

export function MobilePreview() {
  const [tab, setTab] = useState<TabId>("home");
  const [feePaid, setFeePaid] = useState(false);
  const [noticeRead, setNoticeRead] = useState(false);
  const [language, setLanguage] = useState<Language>("EN");
  const [toast, setToast] = useState("Interactive student account · fictional demonstration data");

  const openTab = (next: TabId) => {
    setTab(next);
    setToast(`${tabs.find((item) => item.id === next)?.label} opened.`);
  };

  return (
    <section className="bg-[#ece7df] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase text-gold-800">Student mobile app preview</p>
          <h1 className="mt-2 text-2xl text-maroon sm:text-3xl">CIBS in every student&apos;s pocket</h1>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">Use the navigation and actions below exactly as a student would on Android or iOS.</p>
        </div>

        <div className="mx-auto w-full max-w-[410px] overflow-hidden rounded-[28px] border-[7px] border-[#2b2421] bg-cream shadow-[0_24px_70px_-28px_rgba(36,28,25,0.55)]">
          <div className="flex h-7 items-center justify-between bg-maroon-900 px-5 text-[10px] font-semibold text-cream/80">
            <span>9:41</span>
            <span>● ●● 87%</span>
          </div>

          <header className="bg-maroon text-cream">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded border border-gold/40 bg-maroon-700 text-gold-soft">
                  <DharmaWheel className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-gold-soft">CIBS Student</p>
                  <p className="text-sm font-semibold">Tashi Demo</p>
                </div>
              </div>
              <button onClick={() => openTab("notices")} className="relative grid h-9 w-9 place-items-center rounded border border-cream/20" aria-label="Open notices">
                <IconMail className="h-4 w-4" />
                {!noticeRead && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gold" />}
              </button>
            </div>
            <div className="flex gap-1 border-t border-cream/10 px-4 py-2">
              {(["EN", "HI", "BO"] as const).map((item) => (
                <button key={item} onClick={() => setLanguage(item)} className={`rounded px-2 py-1 text-[10px] font-bold ${language === item ? "bg-gold text-maroon-900" : "text-cream/60"}`}>{item}</button>
              ))}
              <span className="ml-auto self-center text-[10px] text-cream/60">Student ID CIBS-26-0247</span>
            </div>
          </header>

          <div className="min-h-[610px] bg-[#f7f3ec] pb-20">
            <div className="border-b border-gold/25 bg-[#fff9e9] px-4 py-2.5 text-[11px] text-ink-soft">{toast}</div>
            {tab === "home" && <MobileHome feePaid={feePaid} language={language} onPay={() => { setFeePaid(true); setToast("Fee payment simulated. Receipt CIBS-R-10842 is ready."); }} onNavigate={openTab} />}
            {tab === "academics" && <MobileAcademics />}
            {tab === "notices" && <MobileNotices read={noticeRead} onRead={() => { setNoticeRead(true); setToast("Notice marked as read."); }} />}
            {tab === "profile" && <MobileProfile feePaid={feePaid} />}
          </div>

          <nav aria-label="Student portal" className="relative -mt-[68px] grid h-[68px] grid-cols-4 border-t border-maroon-100 bg-cream">
            {tabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button key={item.id} onClick={() => openTab(item.id)} className={`flex min-w-0 flex-col items-center justify-center gap-1 text-[10px] font-semibold ${active ? "text-maroon" : "text-ink-soft"}`}>
                  <Icon className={`h-5 w-5 ${active ? "text-maroon" : "text-ink-soft/70"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

function MobileHome({ feePaid, language, onPay, onNavigate }: { feePaid: boolean; language: Language; onPay: () => void; onNavigate: (tab: TabId) => void }) {
  return (
    <div className="space-y-4 p-4">
      <section className="rounded-lg bg-maroon p-4 text-cream">
        <p className="text-[10px] font-bold uppercase text-gold-soft">Thursday, 06 August</p>
        <h2 className="mt-2 font-sans text-lg font-semibold">{greetings[language].salutation}</h2>
        <p className="mt-1 text-xs text-cream/70">{greetings[language].next}</p>
        <div className="mt-4 flex items-center justify-between rounded bg-cream/10 px-3 py-3">
          <div><p className="text-xs font-semibold">Classical Bhoti</p><p className="mt-1 text-[10px] text-cream/60">Dr. Demo Faculty · Language Lab</p></div>
          <span className="font-mono text-xs font-bold text-gold-soft">11:15</span>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-2">
        {[["86%", "Attendance"], ["8.2", "CGPA"], [feePaid ? "₹0" : "₹12.5K", "Fee due"]].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-maroon-100 bg-cream p-3 text-center">
            <p className="font-display text-lg font-semibold text-maroon">{value}</p><p className="mt-1 text-[10px] text-ink-soft">{label}</p>
          </div>
        ))}
      </div>

      {!feePaid && (
        <section className="rounded-lg border border-gold/50 bg-[#fff9e9] p-4">
          <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-maroon">Semester fee due</p><p className="mt-1 text-[11px] text-ink-soft">₹12,500 · Due 15 August 2026</p></div><span className="rounded bg-gold-soft px-2 py-1 text-[10px] font-bold text-maroon">Action</span></div>
          <button onClick={onPay} className="mt-3 flex w-full items-center justify-center gap-2 rounded bg-maroon px-3 py-2.5 text-xs font-bold text-cream">Pay securely <IconArrow className="h-3.5 w-3.5" /></button>
        </section>
      )}

      {feePaid && (
        <section className="rounded-lg border border-teal/30 bg-cream p-4">
          <p className="text-xs font-bold text-teal">Payment recorded</p><p className="mt-1 text-[11px] text-ink-soft">Receipt CIBS-R-10842 · ₹12,500</p>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between"><h3 className="font-sans text-sm font-bold text-ink">Quick access</h3><button onClick={() => onNavigate("academics")} className="text-[11px] font-semibold text-maroon">View academics</button></div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {["Admit card", "Semester result", "Fee receipt", "Certificates"].map((item, index) => (
            <button key={item} onClick={() => index < 2 ? onNavigate("academics") : onNavigate("profile")} className="flex items-center justify-between rounded-lg border border-maroon-100 bg-cream p-3 text-left text-xs font-semibold text-ink">
              {item}<IconArrow className="h-3.5 w-3.5 text-maroon" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function MobileAcademics() {
  return (
    <div className="space-y-4 p-4">
      <div><p className="text-[10px] font-bold uppercase text-gold-800">Academics</p><h2 className="mt-1 font-sans text-lg font-bold text-maroon">Semester III</h2></div>
      <section className="rounded-lg border border-maroon-100 bg-cream p-4">
        <div className="flex items-center justify-between"><p className="text-xs font-bold text-ink">Attendance by course</p><span className="text-[10px] text-ink-soft">Updated today</span></div>
        <div className="mt-4 space-y-4">
          {[["Madhyamaka Philosophy", 92], ["Classical Bhoti", 88], ["Indian Logic", 81], ["History of Buddhism", 84]].map(([course, value]) => (
            <div key={String(course)}><div className="flex justify-between text-[11px]"><span className="font-semibold text-ink">{course}</span><span className="font-bold text-maroon">{value}%</span></div><div className="mt-1.5 h-1.5 overflow-hidden rounded bg-maroon-50"><div className="h-full bg-teal" style={{ width: `${value}%` }} /></div></div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-maroon-100 bg-cream p-4">
        <p className="text-xs font-bold text-ink">Internal assessment</p>
        <div className="mt-3 divide-y divide-maroon-50">
          {[["Madhyamaka Philosophy", "42/50"], ["Classical Bhoti", "39/50"], ["Indian Logic", "44/50"]].map(([course, mark]) => <div key={course} className="flex justify-between py-3 text-xs"><span>{course}</span><strong className="text-maroon">{mark}</strong></div>)}
        </div>
      </section>
      <button className="flex w-full items-center justify-between rounded-lg bg-maroon px-4 py-3 text-xs font-bold text-cream">Download semester result <IconArrow className="h-4 w-4" /></button>
    </div>
  );
}

function MobileNotices({ read, onRead }: { read: boolean; onRead: () => void }) {
  return (
    <div className="space-y-3 p-4">
      <div><p className="text-[10px] font-bold uppercase text-gold-800">Digital noticeboard</p><h2 className="mt-1 font-sans text-lg font-bold text-maroon">Notices</h2></div>
      {[
        ["Examination", "Semester III datesheet published", "06 Aug 2026", !read],
        ["Academic", "Classical Bhoti guest lecture", "05 Aug 2026", false],
        ["Student Welfare", "Hostel committee meeting", "03 Aug 2026", false],
        ["Library", "New manuscript catalogue available", "01 Aug 2026", false],
      ].map(([category, title, date, unread]) => (
        <button key={String(title)} onClick={onRead} className={`w-full rounded-lg border p-4 text-left ${unread ? "border-gold bg-[#fff9e9]" : "border-maroon-100 bg-cream"}`}>
          <div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase text-maroon">{category as string}</span><span className="text-[10px] text-ink-soft">{date as string}</span></div>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-ink">{title as string}</p>
          {unread && <span className="mt-2 inline-block rounded bg-gold px-2 py-1 text-[9px] font-bold text-maroon-900">New</span>}
        </button>
      ))}
    </div>
  );
}

function MobileProfile({ feePaid }: { feePaid: boolean }) {
  return (
    <div className="space-y-4 p-4">
      <section className="rounded-lg bg-maroon p-4 text-center text-cream">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold bg-cream text-lg font-bold text-maroon">TD</div>
        <h2 className="mt-3 font-sans text-lg font-bold">Tashi Demo</h2><p className="mt-1 text-[11px] text-cream/70">CIBS-26-0247 · B.A. Buddhist Philosophy</p>
      </section>
      <section className="rounded-lg border border-maroon-100 bg-cream">
        {["Personal details", "Uploaded documents", "Digital student ID", "Certificates", feePaid ? "Fee receipt CIBS-R-10842" : "Fee statement", "Support requests"].map((item) => (
          <button key={item} className="flex w-full items-center justify-between border-b border-maroon-50 px-4 py-3.5 text-left text-xs font-semibold text-ink last:border-0">{item}<IconArrow className="h-3.5 w-3.5 text-maroon" /></button>
        ))}
      </section>
      <button className="w-full rounded-lg border border-maroon-300 bg-cream px-4 py-3 text-xs font-bold text-maroon">Sign out of demo account</button>
    </div>
  );
}
