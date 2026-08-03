"use client";

import { useState } from "react";
import { categories, categoryNote } from "@/lib/content";
import { StatValue } from "@/components/ui";
import { cn } from "@/lib/utils";

const R = 70;
const CIRC = 2 * Math.PI * R;
const GAP = 3; // 조각 사이 간격 (path 길이 단위)
const W_BASE = 22;
const W_ACTIVE = 28;

/** 비활성 조각은 slate 계조로 물러난다. 활성 조각만 액센트를 갖는다. */
const DIM = [0.85, 0.62, 0.46, 0.34, 0.24];

/**
 * 카테고리 비중 도넛.
 * K Select 팔레트에는 액센트가 하나뿐이라 5색 팔레트를 만들 수 없다.
 * 대신 액센트가 활성 조각을 따라 이동하게 해서 한 화면 2회 규칙을 지키고,
 * 인터랙션 자체가 "지금 보고 있는 카테고리"를 뜻하게 만든다.
 */
export function CategoryMixDonut() {
  const [active, setActive] = useState(0);
  const current = categories[active];

  // 각 조각의 시작 오프셋. 렌더 중 변수를 재할당하지 않도록 앞선 조각들의
  // 길이를 그때그때 합산한다 (n=5 이므로 비용은 무의미하다).
  const segments = categories.map((cat, i) => ({
    len: (cat.share / 100) * CIRC,
    offset: categories
      .slice(0, i)
      .reduce((sum, prev) => sum + (prev.share / 100) * CIRC, 0),
  }));

  return (
    <div>
      {/* 데스크톱 전용 뷰 (768px 이상) */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:gap-[clamp(32px,5vw,64px)]">
          <div className="relative mx-auto w-full max-w-[260px] md:mx-0">
            <svg
              viewBox="0 0 200 200"
              role="img"
              aria-label={`소싱 카테고리 비중 도넛 차트. ${categories
                .map((c) => `${c.label} ${c.share}%`)
                .join(", ")}.`}
              className="block h-auto w-full overflow-visible"
            >
              {segments.map((seg, i) => {
                const on = i === active;
                const dash = Math.max(seg.len - GAP, 1);
                return (
                  <circle
                    key={categories[i].label}
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke={on ? "var(--accent)" : "var(--slate)"}
                    strokeOpacity={on ? 1 : DIM[i]}
                    strokeWidth={on ? W_ACTIVE : W_BASE}
                    strokeDasharray={`${dash} ${CIRC - dash}`}
                    strokeDashoffset={-seg.offset}
                    transform="rotate(-90 100 100)"
                    onPointerEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="cursor-pointer transition-[stroke,stroke-opacity,stroke-width] duration-200"
                  />
                );
              })}
            </svg>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-[18%] text-center"
            >
              <StatValue className="text-[34px] leading-none">
                {current.share}%
              </StatValue>
              <span className="body-kr text-xs text-slate">{current.label}</span>
            </div>
          </div>

          <ul className="m-0 list-none p-0">
            {categories.map((cat, i) => {
              const on = i === active;
              return (
                <li
                  key={cat.label}
                  className={i > 0 ? "border-t border-hairline" : ""}
                >
                  <button
                    type="button"
                    aria-pressed={on}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="flex w-full cursor-pointer items-center gap-3.5 border-0 bg-transparent px-1 py-3.5 text-left transition-colors duration-200 hover:bg-paper-raised"
                  >
                    <span
                      aria-hidden
                      className="size-2.5 shrink-0 rounded-sm transition-[background-color,opacity] duration-200"
                      style={{
                        background: on ? "var(--accent)" : "var(--slate)",
                        opacity: on ? 1 : DIM[i],
                      }}
                    />
                    <span
                      className={cn(
                        "body-kr flex-1 text-[16px]",
                        on && "font-semibold",
                      )}
                    >
                      {cat.label}
                    </span>
                    <span
                      className={cn(
                        "tnum text-[16px]",
                        on ? "font-semibold text-graphite" : "text-slate",
                      )}
                    >
                      {cat.share}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 높이를 고정해 카테고리를 바꿀 때 레이아웃이 흔들리지 않게 한다. */}
        <div
          aria-live="polite"
          className="mt-8 min-h-[108px] border-t border-hairline pt-6"
        >
          <p className="micro-label text-slate">대표 품목 — {current.label}</p>
          <p className="body-kr mt-3 max-w-[640px] text-[16px]">{current.items}</p>
        </div>

        <p className="body-kr mt-5 text-[13px] text-slate">{categoryNote}</p>
      </div>

      {/* 모바일 전용 뷰 (767px 이하) */}
      <div className="block md:hidden">
        {/* 가로 스크롤 카테고리 탭 */}
        <div className="flex gap-2 overflow-x-auto pb-3.5 scrollbar-none whitespace-nowrap border-b border-hairline">
          {categories.map((cat, i) => {
            const on = i === active;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "px-4 py-2 rounded-full border text-[13px] font-bold transition-all duration-150 outline-none select-none cursor-pointer",
                  on
                    ? "bg-accent text-white border-accent shadow-sm"
                    : "bg-paper text-slate border-hairline hover:bg-paper-raised"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 선택된 카테고리 차트 */}
        <div className="flex flex-col items-center pt-6">
          <div className="relative w-full max-w-[200px]">
            <svg
              viewBox="0 0 200 200"
              role="img"
              aria-label={`소싱 카테고리 비중 도넛 차트. ${categories
                .map((c) => `${c.label} ${c.share}%`)
                .join(", ")}.`}
              className="block h-auto w-full overflow-visible"
            >
              {segments.map((seg, i) => {
                const on = i === active;
                const dash = Math.max(seg.len - GAP, 1);
                return (
                  <circle
                    key={categories[i].label}
                    cx="100"
                    cy="100"
                    r={R}
                    fill="none"
                    stroke={on ? "var(--accent)" : "var(--slate)"}
                    strokeOpacity={on ? 1 : DIM[i]}
                    strokeWidth={on ? W_ACTIVE : W_BASE}
                    strokeDasharray={`${dash} ${CIRC - dash}`}
                    strokeDashoffset={-seg.offset}
                    transform="rotate(-90 100 100)"
                    onClick={() => setActive(i)}
                    className="cursor-pointer transition-[stroke,stroke-opacity,stroke-width] duration-200"
                  />
                );
              })}
            </svg>

            {/* 비율/범례 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 px-[15%] text-center"
            >
              <StatValue className="text-[28px] font-bold leading-none text-graphite">
                {current.share}%
              </StatValue>
              <span className="body-kr text-[10px] text-slate font-bold">{current.label}</span>
            </div>
          </div>
        </div>

        {/* 대표 품목 */}
        <div className="mt-6 border-t border-hairline pt-5">
          <p className="micro-label text-slate text-[11px]">대표 품목 — {current.label}</p>
          <p className="body-kr mt-2 text-[15px] font-semibold text-graphite leading-relaxed">
            {current.items}
          </p>
        </div>

        {/* 설명 문구 */}
        <p className="body-kr mt-4 text-[12px] text-slate leading-relaxed border-t border-hairline/50 pt-3">
          {categoryNote}
        </p>
    </div>
  );
}
