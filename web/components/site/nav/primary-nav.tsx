"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  isGroup,
  observedSectionIds,
  primaryNav,
  type NavGroup,
} from "@/lib/nav-config";
import { cn } from "@/lib/utils";

/**
 * 현재 화면에 보이는 섹션을 추적해 드롭다운 항목에 활성 표시를 남긴다.
 * 여러 섹션이 동시에 걸릴 때는 뷰포트 상단에 가장 가까운 것을 택한다.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }
        if (visible.size === 0) return;
        const [topMost] = [...visible.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1]),
        );
        setActive(topMost[0]);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const leafClass =
  "micro-label text-slate transition-colors hover:text-accent focus-visible:text-graphite";

/**
 * 링크 + 디스클로저 조합.
 *
 * Radix NavigationMenu.Trigger 는 클릭을 토글로 소비하기 때문에 "클릭하면
 * 해당 섹션으로 점프" 요구와 양립하지 않는다(hover 로 열린 뒤 클릭하면
 * 닫히기만 한다). 그래서 트리거를 링크로 두고 열림 상태를 직접 관리한다.
 */
function GroupMenu({
  group,
  active,
}: {
  group: NavGroup;
  active: string | null;
}) {
  const [open, setOpen] = useState(false);
  /** ArrowDown 으로 열었을 때만 첫 항목으로 포커스를 옮긴다는 표시.
      렌더에 영향을 주지 않으므로 state 대신 ref 로 둔다. */
  const focusFirstRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openNow = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  // 대각선으로 움직일 때 즉시 닫히지 않도록 약간의 여유를 준다.
  const closeSoon = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const items = group.items;

  const focusItem = (index: number) => {
    const links = panelRef.current?.querySelectorAll("a");
    links?.[index]?.focus();
  };

  /* 패널이 마운트된 뒤에 포커스를 옮긴다. requestAnimationFrame 에 의존하면
     프레임이 생성되지 않는 환경(백그라운드 탭 등)에서 포커스가 유실된다. */
  useEffect(() => {
    if (open && focusFirstRef.current) {
      focusFirstRef.current = false;
      focusItem(0);
    }
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={openNow}
      onPointerLeave={closeSoon}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        ref={triggerRef}
        href={items[0].href}
        aria-expanded={open}
        aria-controls={group.id}
        onFocus={openNow}
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            openNow();
            focusFirstRef.current = true;
          }
        }}
        className="micro-label group flex items-center gap-1.5 text-slate transition-colors hover:text-accent aria-expanded:text-graphite"
      >
        {group.label}
        <ChevronDown
          aria-hidden
          strokeWidth={2}
          className={cn(
            "size-3 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </Link>

      {/* 조건부 언마운트가 아니라 hidden 토글이다. 언마운트하면 Esc 로 닫을 때
          포커스를 갖고 있던 링크가 사라져 브라우저가 포커스를 body 로 떨어뜨리고,
          트리거로 되돌릴 수 없다. */}
      <div
        ref={panelRef}
        id={group.id}
        hidden={!open}
        onKeyDown={(e) => {
          const links = [...(panelRef.current?.querySelectorAll("a") ?? [])];
          const i = links.indexOf(document.activeElement as HTMLAnchorElement);
          if (e.key === "ArrowDown") {
            e.preventDefault();
            focusItem(Math.min(i + 1, links.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (i <= 0) triggerRef.current?.focus();
            else focusItem(i - 1);
          } else if (e.key === "Escape") {
            setOpen(false);
            triggerRef.current?.focus();
          }
        }}
        /* before:* 는 트리거와 패널 사이 18px 간격을 투명하게 잇는 브리지다.
             없으면 마우스가 간격을 지날 때 래퍼를 벗어나 패널이 닫히고
             하위 메뉴에 도달할 수 없다. */
        className="absolute top-[calc(100%+18px)] left-0 z-50 w-[340px] border border-hairline bg-paper p-2 shadow-nav before:absolute before:inset-x-0 before:-top-[19px] before:h-[19px] before:content-['']"
      >
        <ul className="m-0 flex list-none flex-col p-0">
          {items.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = id === active;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-3.5 transition-colors hover:bg-paper-raised",
                    isActive && "bg-paper-raised",
                  )}
                >
                  {/* 활성 표시는 배경으로만 한다. 액센트는 한 화면에 최대
                        2회이고, 내비에는 이미 코호트 상태 점이 있다. */}
                  <span className="micro-label block text-graphite">
                    {item.label}
                  </span>
                  <span className="body-kr mt-1.5 block text-[13px] text-slate">
                    {item.subtext}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function PrimaryNav() {
  const active = useActiveSection(observedSectionIds);

  return (
    <nav
      aria-label="주요 메뉴"
      className="hidden min-w-0 flex-1 items-center gap-x-8 lg:flex"
    >
      {primaryNav.map((entry) =>
        isGroup(entry) ? (
          <GroupMenu key={entry.id} group={entry} active={active} />
        ) : (
          <Link key={entry.href} href={entry.href} className={leafClass}>
            {entry.label}
          </Link>
        ),
      )}
    </nav>
  );
}
