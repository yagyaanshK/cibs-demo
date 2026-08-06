"use client";

import { useMemo, useState } from "react";
import {
  DharmaWheel,
  IconArrow,
} from "@/components/icons";

type RoleId = "applicant" | "student" | "faculty" | "admissions" | "exams" | "accounts" | "management";
type ApplicationStatus = "Draft" | "Submitted" | "Under review" | "Enrolled";

const roles: Array<{ id: RoleId; label: string; short: string }> = [
  { id: "applicant", label: "Applicant", short: "AP" },
  { id: "student", label: "Student", short: "ST" },
  { id: "faculty", label: "Faculty", short: "FA" },
  { id: "admissions", label: "Admissions Office", short: "AD" },
  { id: "exams", label: "Examination Office", short: "EX" },
  { id: "accounts", label: "Accounts Office", short: "AC" },
  { id: "management", label: "Management", short: "MG" },
];

const workflowSteps: ApplicationStatus[] = ["Draft", "Submitted", "Under review", "Enrolled"];

export function UmsPreview() {
  const [role, setRole] = useState<RoleId>("applicant");
  const [status, setStatus] = useState<ApplicationStatus>("Submitted");
  const [verifiedDocuments, setVerifiedDocuments] = useState(2);
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [admitCardsIssued, setAdmitCardsIssued] = useState(false);
  const [feesReconciled, setFeesReconciled] = useState(false);
  const [message, setMessage] = useState("Application CIBS-ADM-2026-0142 is ready for demonstration.");

  const stage = workflowSteps.indexOf(status);
  const studentId = status === "Enrolled" ? "CIBS-26-0247" : "Pending enrolment";
  const activeRole = roles.find((item) => item.id === role) ?? roles[0];

  const switchRole = (next: RoleId, note?: string) => {
    setRole(next);
    setMessage(note ?? `${roles.find((item) => item.id === next)?.label} workspace opened.`);
  };

  const resetJourney = () => {
    setStatus("Draft");
    setVerifiedDocuments(0);
    setRole("applicant");
    setMessage("Applicant journey reset. Complete the application to continue.");
  };

  return (
    <div className="bg-[#f4f1eb] pb-14">
      <section className="border-b border-maroon-900 bg-maroon-900 text-cream">
        <div className="shell py-6 sm:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded border border-gold/40 bg-maroon-700 text-gold-soft">
                <DharmaWheel className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gold-soft">Central Institute of Buddhist Studies</p>
                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">University Management System</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream/70">
                  Connected preview of admissions, academics, examinations, finance and institutional reporting.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded border border-cream/20 px-3 py-2 text-cream/75">Academic session 2026-27</span>
              <button onClick={resetJourney} className="rounded bg-gold px-3 py-2 font-bold text-maroon-900 hover:bg-gold-soft">
                Reset journey
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-maroon-100 bg-cream">
        <div className="shell py-3">
          <p className="mb-2 text-[11px] font-bold uppercase text-ink-soft">View system as</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {roles.map((item) => (
              <button
                key={item.id}
                onClick={() => switchRole(item.id)}
                aria-pressed={role === item.id}
                className={`flex shrink-0 items-center gap-2 rounded border px-3 py-2 text-sm font-semibold transition-colors ${
                  role === item.id
                    ? "border-maroon bg-maroon text-cream"
                    : "border-maroon-100 bg-ivory text-ink-soft hover:border-maroon-300 hover:text-maroon"
                }`}
              >
                <span className={`grid h-6 w-6 place-items-center rounded text-[10px] ${role === item.id ? "bg-cream/15" : "bg-maroon-50"}`}>
                  {item.short}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="shell py-6 sm:py-8">
        <div className="mb-5 flex flex-col gap-3 rounded border border-gold/40 bg-[#fff9e9] px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-ink">
            <span className="h-2 w-2 rounded-full bg-gold" />
            {message}
          </p>
          <p className="shrink-0 text-xs font-semibold text-maroon">Active role: {activeRole.label}</p>
        </div>

        {role === "applicant" && (
          <ApplicantWorkspace
            status={status}
            stage={stage}
            verifiedDocuments={verifiedDocuments}
            onSubmit={() => {
              setStatus("Submitted");
              setMessage("Application submitted. A confirmation has been added to the applicant inbox.");
            }}
            onOpenAdmissions={() => switchRole("admissions", "Admissions Office opened with the submitted application selected.")}
          />
        )}
        {role === "student" && <StudentWorkspace status={status} studentId={studentId} onOpenAdmissions={() => switchRole("admissions")} />}
        {role === "faculty" && (
          <FacultyWorkspace
            saved={attendanceSaved}
            onSave={() => {
              setAttendanceSaved(true);
              setMessage("Attendance saved for B.A. Buddhist Philosophy, Semester III.");
            }}
          />
        )}
        {role === "admissions" && (
          <AdmissionsWorkspace
            status={status}
            verifiedDocuments={verifiedDocuments}
            onReview={() => {
              setStatus("Under review");
              setMessage("Application moved to Under review. The applicant timeline is updated.");
            }}
            onVerify={() => {
              setVerifiedDocuments(4);
              setMessage("All four uploaded documents have been marked verified.");
            }}
            onEnrol={() => {
              setStatus("Enrolled");
              setVerifiedDocuments(4);
              setMessage("Applicant enrolled. Student ID CIBS-26-0247 has been generated.");
            }}
            onOpenStudent={() => switchRole("student", "Generated student record opened in the Student workspace.")}
          />
        )}
        {role === "exams" && (
          <ExamWorkspace
            issued={admitCardsIssued}
            onIssue={() => {
              setAdmitCardsIssued(true);
              setMessage("428 admit cards issued and added to student portals.");
            }}
          />
        )}
        {role === "accounts" && (
          <AccountsWorkspace
            reconciled={feesReconciled}
            onReconcile={() => {
              setFeesReconciled(true);
              setMessage("Today's online collections have been reconciled with the student ledger.");
            }}
          />
        )}
        {role === "management" && <ManagementWorkspace />}
      </main>
    </div>
  );
}

function WorkspaceHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-maroon-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase text-gold-800">{eyebrow}</p>
        <h2 className="mt-1 text-2xl text-maroon">{title}</h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{intro}</p>
    </div>
  );
}

function ApplicantWorkspace({
  status,
  stage,
  verifiedDocuments,
  onSubmit,
  onOpenAdmissions,
}: {
  status: ApplicationStatus;
  stage: number;
  verifiedDocuments: number;
  onSubmit: () => void;
  onOpenAdmissions: () => void;
}) {
  return (
    <section>
      <WorkspaceHeader eyebrow="Applicant portal" title="Welcome, Tashi Demo" intro="Track one application from draft through admission without visiting the Institute office." />
      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-5">
          <div className="rounded border border-maroon-100 bg-cream p-5 shadow-[var(--shadow-soft)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-ink-soft">Application CIBS-ADM-2026-0142</p>
                <h3 className="mt-1 text-xl text-maroon">B.A. Buddhist Philosophy</h3>
              </div>
              <StatusPill value={status} />
            </div>
            <ol className="mt-8 grid grid-cols-4 gap-2">
              {workflowSteps.map((step, index) => (
                <li key={step} className="relative">
                  <div className={`h-1 rounded ${index <= stage ? "bg-maroon" : "bg-maroon-100"}`} />
                  <p className={`mt-2 text-[11px] font-semibold ${index <= stage ? "text-maroon" : "text-ink-soft/60"}`}>{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Detail label="Programme" value="B.A. Buddhist Philosophy" />
              <Detail label="Submitted" value={status === "Draft" ? "Not submitted" : "04 August 2026"} />
              <Detail label="Document check" value={`${verifiedDocuments} of 4 verified`} />
            </div>
          </div>

          <div className="rounded border border-maroon-100 bg-cream">
            <div className="border-b border-maroon-100 px-5 py-4">
              <h3 className="text-lg text-maroon">Application sections</h3>
            </div>
            <div className="divide-y divide-maroon-50">
              {[
                ["Personal details", "Complete", "Name, address, category and contact"],
                ["Academic record", "Complete", "Class X and XII qualifications"],
                ["Documents", `${verifiedDocuments}/4 verified`, "Photograph, marksheets and identity proof"],
                ["Declaration", status === "Draft" ? "Action needed" : "Accepted", "Applicant declaration and final submission"],
              ].map(([title, value, text]) => (
                <div key={title} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-xs text-ink-soft">{text}</p>
                  </div>
                  <span className="shrink-0 rounded bg-maroon-50 px-2.5 py-1 text-xs font-semibold text-maroon">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded bg-maroon p-5 text-cream">
            <p className="text-xs font-bold uppercase text-gold-soft">Next action</p>
            <h3 className="mt-2 text-xl">{status === "Draft" ? "Submit your application" : status === "Enrolled" ? "Admission confirmed" : "Track office review"}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">
              {status === "Draft"
                ? "All required sections are complete. Submit to lock the application and begin verification."
                : status === "Enrolled"
                  ? "Your student account has been created with ID CIBS-26-0247."
                  : "The Admissions Office receives this record in its review queue immediately."}
            </p>
            {status === "Draft" ? (
              <ActionButton onClick={onSubmit} tone="gold">Submit application</ActionButton>
            ) : (
              <ActionButton onClick={onOpenAdmissions} tone="gold">Open Admissions view</ActionButton>
            )}
          </div>
          <InfoList title="Applicant inbox" items={["Application acknowledgement", "Document verification update", "Counselling instructions"]} />
        </aside>
      </div>
    </section>
  );
}

function AdmissionsWorkspace({
  status,
  verifiedDocuments,
  onReview,
  onVerify,
  onEnrol,
  onOpenStudent,
}: {
  status: ApplicationStatus;
  verifiedDocuments: number;
  onReview: () => void;
  onVerify: () => void;
  onEnrol: () => void;
  onOpenStudent: () => void;
}) {
  return (
    <section>
      <WorkspaceHeader eyebrow="Admissions office" title="Application review queue" intro="Review documents, record decisions and create student records from one controlled workflow." />
      <MetricRow metrics={[["Applications", "286", "+34 this week"], ["Under review", "71", "12 need documents"], ["Shortlisted", "118", "Counselling list"], ["Enrolled", status === "Enrolled" ? "64" : "63", "Student IDs issued"]]} />
      <div className="mt-5 grid gap-5 xl:grid-cols-[0.8fr_1.4fr]">
        <div className="rounded border border-maroon-100 bg-cream">
          <div className="border-b border-maroon-100 p-4">
            <p className="text-xs font-bold uppercase text-ink-soft">Priority queue</p>
          </div>
          {["Tashi Demo", "Pema Chodon", "Sonam Angmo", "Dorjay Namgyal"].map((name, index) => (
            <button key={name} className={`flex w-full items-center justify-between border-b border-maroon-50 px-4 py-4 text-left last:border-0 ${index === 0 ? "bg-maroon-50" : "hover:bg-ivory"}`}>
              <span>
                <span className="block text-sm font-semibold text-ink">{name}</span>
                <span className="mt-1 block text-xs text-ink-soft">CIBS-ADM-2026-0{142 + index}</span>
              </span>
              <span className="rounded bg-cream px-2 py-1 text-[11px] font-semibold text-maroon">{index === 0 ? status : "Submitted"}</span>
            </button>
          ))}
        </div>

        <div className="rounded border border-maroon-100 bg-cream p-5 shadow-[var(--shadow-soft)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-maroon-100 pb-4">
            <div>
              <p className="text-xs text-ink-soft">CIBS-ADM-2026-0142</p>
              <h3 className="mt-1 text-xl text-maroon">Tashi Demo</h3>
              <p className="mt-1 text-sm text-ink-soft">B.A. Buddhist Philosophy · Undergraduate</p>
            </div>
            <StatusPill value={status} />
          </div>
          <div className="grid gap-4 border-b border-maroon-100 py-5 sm:grid-cols-3">
            <Detail label="Category" value="ST" />
            <Detail label="Class XII" value="82.4%" />
            <Detail label="Submitted" value="04 Aug 2026" />
          </div>
          <div className="py-5">
            <div className="flex items-center justify-between">
              <h4 className="font-sans text-sm font-bold text-ink">Document verification</h4>
              <span className="text-xs font-semibold text-maroon">{verifiedDocuments}/4 verified</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {["Photograph", "Class X marksheet", "Class XII marksheet", "Identity proof"].map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded border border-maroon-100 bg-ivory px-3 py-2.5 text-sm">
                  <span>{item}</span>
                  <span className={`text-xs font-bold ${index < verifiedDocuments ? "text-teal" : "text-gold-800"}`}>{index < verifiedDocuments ? "Verified" : "Pending"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-maroon-100 pt-4">
            {status === "Submitted" && <ActionButton onClick={onReview}>Begin review</ActionButton>}
            {verifiedDocuments < 4 && <ActionButton onClick={onVerify} tone="outline">Verify all documents</ActionButton>}
            {status !== "Enrolled" && <ActionButton onClick={onEnrol} disabled={verifiedDocuments < 4}>Approve and enrol</ActionButton>}
            {status === "Enrolled" && <ActionButton onClick={onOpenStudent} tone="gold">Open generated student record</ActionButton>}
          </div>
          {verifiedDocuments < 4 && status !== "Enrolled" && <p className="mt-3 text-xs text-ink-soft">Verify all documents before enrolment is enabled.</p>}
        </div>
      </div>
    </section>
  );
}

function StudentWorkspace({ status, studentId, onOpenAdmissions }: { status: ApplicationStatus; studentId: string; onOpenAdmissions: () => void }) {
  return (
    <section>
      <WorkspaceHeader eyebrow="Student portal" title="Academic overview" intro="One secure account for classes, attendance, examinations, fees, notices and official documents." />
      <div className="mb-5 rounded border border-maroon-100 bg-cream p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded bg-maroon text-lg font-bold text-cream">TD</div>
            <div>
              <h3 className="text-xl text-maroon">Tashi Demo</h3>
              <p className="mt-1 text-sm text-ink-soft">B.A. Buddhist Philosophy · Semester III</p>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold uppercase text-ink-soft">Student ID</p>
            <p className="mt-1 font-mono text-sm font-bold text-maroon">{studentId}</p>
          </div>
        </div>
        {status !== "Enrolled" && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded border border-gold/40 bg-[#fff9e9] px-4 py-3 text-sm">
            <span>This preview record becomes active after the Admissions Office completes enrolment.</span>
            <button onClick={onOpenAdmissions} className="font-semibold text-maroon hover:underline">Complete enrolment</button>
          </div>
        )}
      </div>
      <MetricRow metrics={[["Attendance", "86%", "Above requirement"], ["Current CGPA", "8.2", "Semester II"], ["Fee balance", "₹0", "Paid in full"], ["Library books", "2", "Next due 14 Aug"]]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded border border-maroon-100 bg-cream p-5 lg:col-span-2">
          <PanelTitle title="Today's timetable" action="View full timetable" />
          <div className="mt-4 divide-y divide-maroon-50">
            {[["09:30", "Madhyamaka Philosophy", "Room 204"], ["11:15", "Classical Bhoti", "Language Lab"], ["14:00", "Indian Logic", "Room 108"]].map(([time, title, room], index) => (
              <div key={title} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 py-3 text-sm">
                <span className="font-mono text-xs font-bold text-maroon">{time}</span>
                <span><strong className="block text-ink">{title}</strong><span className="text-xs text-ink-soft">{room}</span></span>
                <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${index === 0 ? "bg-teal text-cream" : "bg-maroon-50 text-maroon"}`}>{index === 0 ? "Next" : "Scheduled"}</span>
              </div>
            ))}
          </div>
        </div>
        <InfoList title="Quick access" items={["Download admit card", "View semester result", "Download fee receipt", "Request certificate", "Apply for revaluation"]} />
      </div>
    </section>
  );
}

function FacultyWorkspace({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  const students = ["Tashi Demo", "Pema Chodon", "Sonam Angmo", "Stanzin Dorjay", "Rigzin Dolma"];
  return (
    <section>
      <WorkspaceHeader eyebrow="Faculty portal" title="Classes and academic tasks" intro="Faculty record attendance, submit marks, manage teaching schedules and reach students through notices." />
      <MetricRow metrics={[["Classes today", "3", "Next at 09:30"], ["Students", "84", "Across 3 courses"], ["Marks pending", "1", "Due 12 Aug"], ["Attendance", saved ? "Saved" : "Draft", "Semester III"]]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded border border-maroon-100 bg-cream p-5">
          <PanelTitle title="Take attendance" action="B.A. Buddhist Philosophy · Semester III" />
          <div className="mt-4 divide-y divide-maroon-50">
            {students.map((student, index) => (
              <label key={student} className="flex cursor-pointer items-center justify-between py-3 text-sm">
                <span><strong className="block text-ink">{student}</strong><span className="text-xs text-ink-soft">CIBS-26-{String(247 + index).padStart(4, "0")}</span></span>
                <input type="checkbox" defaultChecked={index !== 3} className="h-4 w-4 accent-[#75182a]" />
              </label>
            ))}
          </div>
          <ActionButton onClick={onSave}>{saved ? "Attendance saved" : "Save attendance"}</ActionButton>
        </div>
        <div className="space-y-5">
          <InfoList title="Academic tasks" items={["Upload internal assessment marks", "Review course attendance", "Publish class notice", "Download student list"]} />
          <InfoList title="Upcoming" items={["Department meeting · 12 Aug", "Semester assessment · 18 Aug", "IQAC submission · 25 Aug"]} />
        </div>
      </div>
    </section>
  );
}

function ExamWorkspace({ issued, onIssue }: { issued: boolean; onIssue: () => void }) {
  return (
    <section>
      <WorkspaceHeader eyebrow="Examination office" title="August 2026 examination cycle" intro="Coordinate schedules, admit cards, evaluation, results and revaluation from a traceable workflow." />
      <MetricRow metrics={[["Candidates", "428", "12 programmes"], ["Papers", "36", "32 approved"], ["Admit cards", issued ? "428 issued" : "Ready", "4 held for review"], ["Revaluation", "9", "3 pending action"]]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded border border-maroon-100 bg-cream p-5">
          <PanelTitle title="Examination workflow" action="Semester examination · August 2026" />
          <div className="mt-5 space-y-4">
            {[["Datesheet approved", "Complete", 100], ["Candidate eligibility", "Complete", 100], ["Admit cards", issued ? "Issued" : "Ready to issue", issued ? 100 : 82], ["Seating and invigilation", "In progress", 68], ["Result processing", "Not started", 0]].map(([title, value, progress]) => (
              <div key={String(title)}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-ink">{title}</span><span className="text-xs font-semibold text-maroon">{value}</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded bg-maroon-50"><div className="h-full bg-maroon" style={{ width: `${progress}%` }} /></div>
              </div>
            ))}
          </div>
          <ActionButton onClick={onIssue}>{issued ? "Admit cards issued" : "Issue eligible admit cards"}</ActionButton>
        </div>
        <InfoList title="Controlled actions" items={["Generate seating plan", "Assign invigilators", "Track question papers", "Record answer-script movement", "Publish approved results", "Process revaluation"]} />
      </div>
    </section>
  );
}

function AccountsWorkspace({ reconciled, onReconcile }: { reconciled: boolean; onReconcile: () => void }) {
  return (
    <section>
      <WorkspaceHeader eyebrow="Accounts office" title="Fees and student ledger" intro="Monitor collections, dues, concessions and receipts with a complete transaction trail." />
      <MetricRow metrics={[["Collected", "₹18.42L", "Academic session"], ["Outstanding", "₹2.16L", "47 students"], ["Today online", "₹86,500", "23 payments"], ["Reconciliation", reconciled ? "Complete" : "Pending", "06 Aug 2026"]]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded border border-maroon-100 bg-cream p-5">
          <PanelTitle title="Recent transactions" action="All amounts in INR" />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="border-y border-maroon-100 bg-ivory text-xs uppercase text-ink-soft"><tr><th className="px-3 py-3">Receipt</th><th className="px-3 py-3">Student</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Amount</th><th className="px-3 py-3">Status</th></tr></thead>
              <tbody className="divide-y divide-maroon-50">
                {[["CIBS-R-10842", "Tashi Demo", "Semester fee", "₹12,500", "Paid"], ["CIBS-R-10841", "Pema Chodon", "Hostel fee", "₹8,000", "Paid"], ["CIBS-R-10840", "Sonam Angmo", "Examination fee", "₹1,250", "Paid"]].map((row) => (
                  <tr key={row[0]}>{row.map((cell, index) => <td key={cell} className={`px-3 py-3 ${index === 0 ? "font-mono text-xs text-maroon" : "text-ink"}`}>{cell}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <ActionButton onClick={onReconcile}>{reconciled ? "Collections reconciled" : "Reconcile today's collections"}</ActionButton>
        </div>
        <InfoList title="Finance controls" items={["Configure fee structures", "Record concessions", "Track outstanding dues", "Apply late fee rules", "Export collection register", "Issue digital receipts"]} />
      </div>
    </section>
  );
}

function ManagementWorkspace() {
  const bars = useMemo(() => [["Admissions", 82], ["Attendance", 86], ["Results", 74], ["Fee collection", 91]], []);
  return (
    <section>
      <WorkspaceHeader eyebrow="Management dashboard" title="Institutional overview" intro="Decision-ready indicators with drill-down reports and audit-friendly exports for NAAC and IQAC." />
      <MetricRow metrics={[["Active students", "1,248", "+6.4% year-on-year"], ["Programmes", "18", "4 faculties"], ["Average attendance", "86%", "+2.1 percentage points"], ["Result pass rate", "91.3%", "Last semester"]]} />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded border border-maroon-100 bg-cream p-5">
          <PanelTitle title="Operational health" action="Live institutional indicators" />
          <div className="mt-6 space-y-5">
            {bars.map(([label, value]) => (
              <div key={String(label)}>
                <div className="flex justify-between text-sm"><span className="font-semibold text-ink">{label}</span><span className="font-mono text-xs font-bold text-maroon">{value}%</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded bg-maroon-50"><div className="h-full bg-teal" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded border border-maroon-100 bg-cream p-5">
          <PanelTitle title="Compliance report centre" action="Export-ready" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["NAAC student profile", "IQAC annual summary", "Programme outcomes", "Category-wise enrolment", "Examination performance", "Fee collection audit"].map((item) => (
              <button key={item} className="flex items-center justify-between rounded border border-maroon-100 bg-ivory px-3 py-3 text-left text-sm font-semibold text-ink hover:border-maroon-300 hover:text-maroon">
                {item}<IconArrow className="h-4 w-4 shrink-0" />
              </button>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 divide-x divide-maroon-100 rounded border border-maroon-100 bg-maroon-50 py-3 text-center">
            <Detail label="Daily backup" value="Healthy" />
            <Detail label="Audit events" value="1,842" />
            <Detail label="Open alerts" value="0" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricRow({ metrics }: { metrics: string[][] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value, note]) => (
        <div key={label} className="rounded border border-maroon-100 bg-cream p-4 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-semibold uppercase text-ink-soft">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold text-maroon">{value}</p>
          <p className="mt-1 text-xs text-ink-soft">{note}</p>
        </div>
      ))}
    </div>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded border border-maroon-100 bg-cream p-5">
      <PanelTitle title={title} />
      <ul className="mt-3 divide-y divide-maroon-50">
        {items.map((item, index) => (
          <li key={item} className="flex items-center gap-3 py-3 text-sm text-ink">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded bg-maroon-50 text-[10px] font-bold text-maroon">{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PanelTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h3 className="text-lg text-maroon">{title}</h3>
      {action && <span className="text-xs font-semibold text-ink-soft">{action}</span>}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[10px] font-bold uppercase text-ink-soft">{label}</p><p className="mt-1 text-sm font-semibold text-ink">{value}</p></div>;
}

function StatusPill({ value }: { value: ApplicationStatus }) {
  return <span className={`rounded px-3 py-1.5 text-xs font-bold ${value === "Enrolled" ? "bg-teal text-cream" : "bg-gold-soft text-maroon-900"}`}>{value}</span>;
}

function ActionButton({ children, onClick, tone = "maroon", disabled = false }: { children: React.ReactNode; onClick: () => void; tone?: "maroon" | "gold" | "outline"; disabled?: boolean }) {
  const classes = tone === "gold" ? "bg-gold text-maroon-900 hover:bg-gold-soft" : tone === "outline" ? "border border-maroon-300 bg-cream text-maroon hover:bg-maroon-50" : "bg-maroon text-cream hover:bg-maroon-700";
  return (
    <button onClick={onClick} disabled={disabled} className={`mt-5 inline-flex min-h-10 items-center gap-2 rounded px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${classes}`}>
      {children}<IconArrow className="h-4 w-4" />
    </button>
  );
}
