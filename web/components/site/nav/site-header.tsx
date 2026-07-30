"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cohortStatus } from "@/lib/content";
import {
  isLeaf,
  kbgProgramGroup,
  primaryCta,
  primaryNav,
} from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { Wordmark, pillInkCompact } from "@/components/ui";
import { PrimaryNav } from "./primary-nav";

function CohortStatus() {
  return (
    <p className="micro-label flex items-center gap-2 whitespace-nowrap text-slate">
      <span aria-hidden className="inline-block size-1.5 rounded-full bg-accent" />
      {cohortStatus}
    </p>
  );
}

/** 모바일 전용 아코디언. 데스크톱 드롭다운과 같은 데이터를 쓴다. */
function MobileNav() {
  const [openGroup, setOpenGroup] = useState(false);

  return (
    <details className="relative lg:hidden">
      <summary
        aria-label="메뉴"
        className="micro-label flex cursor-pointer items-center gap-2 rounded-full border border-hairline px-3.5 py-3 text-slate sm:px-4"
      >
        <span aria-hidden className="text-base leading-none sm:hidden">
          ≡
        </span>
        <span aria-hidden className="hidden sm:inline">
          Menu
        </span>
      </summary>

      <div className="absolute right-0 top-[calc(100%+20px)] flex w-[280px] flex-col gap-1 rounded-xl border border-hairline bg-paper p-4 shadow-nav">
        <button
          type="button"
          aria-expanded={openGroup}
          aria-controls="kbg-program-accordion"
          onClick={() => setOpenGroup((v) => !v)}
          className="micro-label flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-2 py-3 text-graphite"
        >
          {kbgProgramGroup.label}
          <ChevronDown
            aria-hidden
            strokeWidth={2}
            className={cn(
              "size-3.5 transition-transform duration-200",
              openGroup && "rotate-180",
            )}
          />
        </button>

        <ul
          id="kbg-program-accordion"
          hidden={!openGroup}
          className="m-0 flex list-none flex-col gap-0 border-l border-hairline p-0 pl-3"
        >
          {kbgProgramGroup.items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-2 py-2.5">
                <span className="micro-label block text-graphite">
                  {item.label}
                </span>
                <span className="body-kr mt-1 block text-[13px] text-slate">
                  {item.subtext}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {primaryNav.filter(isLeaf).map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="micro-label px-2 py-3 text-slate"
          >
            {entry.label}
          </Link>
        ))}

        <div className="mt-2 border-t border-hairline px-2 pt-4">
          <CohortStatus />
        </div>
      </div>
    </details>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/92 backdrop-blur-[8px]">
      <div className="shell flex h-[var(--nav-height)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        <PrimaryNav />

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

          <Link href={primaryCta.href} className={pillInkCompact}>
            {primaryCta.label}
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
