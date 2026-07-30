import Link from "next/link";
import { contact, meetingHref } from "@/lib/content";
import { footerNav } from "@/lib/nav-config";
import { Wordmark } from "@/components/ui";

const columns = [
  {
    label: footerNav.program.label,
    links: footerNav.program.items.map((i) => ({ text: i.label, href: i.href })),
  },
  {
    label: footerNav.apply.label,
    links: [
      ...footerNav.apply.items.map((i) => ({ text: i.label, href: i.href })),
      { text: "미팅 예약", href: meetingHref },
    ],
  },
  {
    label: footerNav.gov.label,
    links: footerNav.gov.items.map((i) => ({ text: i.label, href: i.href })),
  },
];

/**
 * 홈과 수출바우처 페이지가 공유하는 푸터. 각 페이지의 CTA 다크 블록 바로
 * 아래에 이어 붙어 하나의 다크 구간으로 읽힌다.
 */
export function SiteFooter() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="shell pb-[clamp(48px,6vw,80px)]">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 border-t border-hairline-dark pt-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Wordmark />
            <p className="mt-3 text-sm text-dark-body">
              Operated by Letusto Inc.
            </p>
          </div>

          {columns.map((column) => (
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
        </div>

        <div className="mt-16 flex flex-wrap justify-between gap-6 border-t border-hairline-dark pt-6 text-sm text-dark-label">
          <p>K-Beauty Growth Program · K Select Network · Letusto Inc.</p>
          <p>© Letusto Inc. · 개인정보처리방침</p>
        </div>
      </div>
    </footer>
  );
}
