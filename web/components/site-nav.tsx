import Link from "next/link";
import { cohortStatus, navItems } from "@/lib/content";
import { Wordmark, pillInkCompact } from "./ui";

function CohortStatus() {
  return (
    <p className="micro-label flex items-center gap-2 whitespace-nowrap text-slate">
      <span
        aria-hidden
        className="inline-block size-1.5 rounded-full bg-accent"
      />
      {cohortStatus}
    </p>
  );
}

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/92 backdrop-blur-[8px]">
      <div className="shell flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <nav
          aria-label="섹션"
          className="hidden min-w-0 flex-1 flex-wrap gap-x-7 gap-y-2 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="micro-label text-slate transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden xl:block">
            <CohortStatus />
          </div>

          <p className="micro-label hidden items-center gap-2.5 text-slate sm:flex">
            <span className="text-graphite">KR</span>
            <span aria-hidden className="opacity-40">
              /
            </span>
            <span>EN</span>
          </p>

          <Link href="/apply/check" className={pillInkCompact}>
            파트너 신청
          </Link>

          <details className="relative lg:hidden">
            <summary
              className="micro-label flex items-center rounded-full border border-hairline px-3.5 py-3 text-slate sm:px-4"
              aria-label="섹션 메뉴"
            >
              <span aria-hidden className="text-base leading-none sm:hidden">
                ≡
              </span>
              <span aria-hidden className="hidden sm:inline">
                Menu
              </span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+20px)] flex w-[260px] flex-col gap-4 rounded-xl border border-hairline bg-paper p-6 shadow-[0_8px_24px_rgba(14,14,16,.06)]">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="micro-label text-slate"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-hairline pt-4">
                <CohortStatus />
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
