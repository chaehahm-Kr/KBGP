import Link from "next/link";
import { contact, meetingHref } from "@/lib/content";
import { Wordmark, pillAccent, pillOutlineDark } from "../ui";

const footerColumns = [
  {
    label: "Program",
    links: [
      { text: "프로그램 개요", href: "#program" },
      { text: "정책", href: "#policy" },
      { text: "절차", href: "#process" },
    ],
  },
  {
    label: "Apply",
    links: [
      { text: "참여 자격", href: "#eligibility" },
      { text: "자가진단 · 신청", href: "/apply/check" },
      { text: "미팅 예약", href: meetingHref },
    ],
  },
];

export function ApplyCta() {
  return (
    <section id="apply" className="mt-36 bg-ink text-ivory">
      <div className="shell py-[clamp(72px,9vw,128px)]">
        <div className="grid grid-cols-1 items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
          <div>
            <p className="micro-label mb-8 text-dark-label">
              Apply — K-Beauty Growth Program
            </p>
            <h2 className="display-kr m-0 text-[clamp(34px,3.9vw,56px)] tracking-[-0.045em]">
              역할을 나누면
              <br />
              진출은 운영이 됩니다.
            </h2>
          </div>
          <div>
            <p className="body-kr mt-0 mb-8 text-[17px] text-dark-body">
              자가진단 6문항은 3분이면 끝납니다. 조건을 충족하면 바로 신청서로
              연결됩니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/apply/check" className={pillAccent}>
                자가진단 시작
              </Link>
              <a href={meetingHref} className={pillOutlineDark}>
                미팅 예약
              </a>
            </div>
            <p className="body-kr mt-7 text-sm text-dark-body">
              {contact.name} ·{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline decoration-hairline-dark decoration-2 underline-offset-4 hover:text-ivory"
              >
                {contact.email}
              </a>{" "}
              · {contact.phone}
            </p>
          </div>
        </div>

        <footer className="mt-28 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-hairline-dark pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark />
            <p className="mt-3 text-sm text-dark-body">
              Operated by Letusto Inc.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav
              key={column.label}
              aria-label={column.label}
              className="flex flex-col gap-3 text-sm"
            >
              <p className="micro-label text-dark-label">{column.label}</p>
              {column.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="text-dark-body hover:text-ivory"
                  >
                    {link.text}
                  </Link>
                ) : (
                  <a
                    key={link.text}
                    href={link.href}
                    className="text-dark-body hover:text-ivory"
                  >
                    {link.text}
                  </a>
                ),
              )}
            </nav>
          ))}

          <div className="flex flex-col gap-3 text-sm text-dark-body">
            <p className="micro-label text-dark-label">Contact</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-dark-body hover:text-ivory"
            >
              {contact.email}
            </a>
            <p>{contact.phone}</p>
          </div>
        </footer>

        <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-hairline-dark pt-6 text-sm text-dark-label">
          <p>K-Beauty Growth Program · K Select Network · Letusto Inc.</p>
          <p>© Letusto Inc. · 개인정보처리방침</p>
        </div>
      </div>
    </section>
  );
}
