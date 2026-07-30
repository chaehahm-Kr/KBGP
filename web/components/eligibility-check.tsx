"use client";

import Link from "next/link";
import { useState } from "react";
import { eligibilityConditions, meetingHref } from "@/lib/content";
import { StatValue, pillAccent } from "./ui";

const TOTAL = eligibilityConditions.length;

function ConditionCards({
  checked,
  onToggle,
}: {
  checked: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {eligibilityConditions.map((label, index) => {
        const isChecked = checked[index];
        return (
          <li key={label}>
            <button
              type="button"
              aria-pressed={isChecked}
              onClick={() => onToggle(index)}
              className={`flex w-full items-center justify-between gap-6 rounded-lg border border-hairline border-l-4 bg-paper-raised px-6.5 py-5.5 text-left transition-colors duration-200 hover:bg-[#efede6] ${
                isChecked ? "border-l-accent" : "border-l-hairline"
              }`}
            >
              <span className="flex items-baseline gap-5">
                <span className="font-serif-latin text-[22px] text-slate">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="body-kr text-lg font-semibold tracking-[-0.02em]">
                  {label}
                </span>
              </span>
              <span
                className={`text-sm font-semibold whitespace-nowrap ${
                  isChecked ? "text-graphite" : "text-warn"
                }`}
              >
                {isChecked ? "충족" : "미확인"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function useConditions() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    Array(TOTAL).fill(false),
  );
  const count = checked.filter(Boolean).length;
  const toggle = (index: number) =>
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  return { checked, count, toggle };
}

export function EligibilitySection() {
  const { checked, count, toggle } = useConditions();
  const allMet = count === TOTAL;

  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
      <div>
        <p className="body-kr text-[17px] text-slate">
          {TOTAL}개 조건을 모두 충족하면 신청서로 이어집니다. 일부만 충족하는
          경우에도 미팅으로 협의할 수 있습니다.
        </p>
        <div className="mt-7 border-t border-hairline pt-6">
          <StatValue className="block text-[40px] leading-none">
            {count} / {TOTAL}
          </StatValue>
          <p className="micro-label mt-3 text-slate">Conditions Met</p>
        </div>
        <div className="mt-7">
          {allMet ? (
            <Link href="/apply/check" className={pillAccent}>
              신청 절차 시작
            </Link>
          ) : (
            <a
              href={meetingHref}
              className="body-kr text-[15px] font-semibold underline decoration-hairline decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              일부만 충족합니다 — 미팅으로 협의하기 ↗
            </a>
          )}
        </div>
      </div>
      <ConditionCards checked={checked} onToggle={toggle} />
    </div>
  );
}

export function EligibilityFocus() {
  const { checked, count, toggle } = useConditions();
  const allMet = count === TOTAL;

  return (
    <>
      <ConditionCards checked={checked} onToggle={toggle} />

      <div className="sticky bottom-0 mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-hairline bg-paper/95 py-7 backdrop-blur-[8px]">
        <div>
          <p className="flex items-baseline gap-2.5">
            <StatValue className="text-[32px] leading-none">
              {count} / {TOTAL}
            </StatValue>
            <span className="micro-label text-slate">Conditions Met</span>
          </p>
          <p className="body-kr mt-2 text-sm text-warn">
            {allMet
              ? "모든 조건을 충족했습니다. 담당자 검토 단계로 이어집니다."
              : "미확인 항목은 거절 사유가 아닙니다. 미팅에서 준비 방법을 함께 정리합니다."}
          </p>
        </div>
        {allMet ? (
          <a href={meetingHref} className={pillAccent}>
            담당자에게 신청 접수
          </a>
        ) : (
          <span
            aria-disabled
            className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-hairline px-[34px] py-[18px] text-[15px] font-semibold text-slate"
          >
            {TOTAL - count}개 항목 남음
          </span>
        )}
      </div>
    </>
  );
}
