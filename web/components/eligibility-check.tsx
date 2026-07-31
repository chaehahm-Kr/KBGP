"use client";

import { useState } from "react";
import { eligibilityConditions, meetingHref } from "@/lib/content";
import { ApplyModal } from "./site/apply/apply-modal";
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
  const [applyOpen, setApplyOpen] = useState(false);
  const allMet = count === TOTAL;

  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
      <div>
        <p className="body-kr text-[17px] text-slate leading-relaxed">
          6가지 항목은 미국 시장 진출과 원활한 프로그램 운영을 위해 필요한 기본 준비 사항입니다. 모든 조건을 충족하지 않더라도, 준비 상황에 따라 별도 미팅을 통해 참여 가능성을 함께 검토할 수 있습니다.
        </p>
        <div className="mt-7 border-t border-hairline pt-6">
          <StatValue className="block text-[40px] leading-none">
            {count} / {TOTAL}
          </StatValue>
          <p className="micro-label mt-3 text-slate">Conditions Met</p>
        </div>
        <div className="mt-7 flex flex-col gap-3 items-start">
          <div className="relative group inline-block">
            <button
              type="button"
              onClick={() => {
                if (allMet) setApplyOpen(true);
              }}
              disabled={!allMet}
              className={`${
                allMet
                  ? `${pillAccent} cursor-pointer`
                  : "inline-flex items-center justify-center rounded-full border border-hairline bg-slate/10 px-[34px] py-[18px] text-[15px] font-semibold text-slate/50 cursor-not-allowed"
              } border-0`}
            >
              파트너십 신청하기
            </button>
            {!allMet && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded bg-graphite px-3 py-2 text-center text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-md">
                오른쪽 6가지 준비 조건을 모두 체크해 주시면 신청이 가능합니다.
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-graphite"></div>
              </div>
            )}
          </div>
          {!allMet && (
            <p className="body-kr m-0 text-[13px] text-warn leading-relaxed">
              오른쪽 6가지 준비 조건을 모두 체크하시면
              <br />
              &apos;파트너십 신청하기&apos; 버튼이 활성화됩니다.
            </p>
          )}
        </div>
      </div>
      <ConditionCards checked={checked} onToggle={toggle} />

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

export function EligibilityFocus() {
  const { checked, count, toggle } = useConditions();
  const [applyOpen, setApplyOpen] = useState(false);
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
              ? "모든 조건을 충족했습니다. 파트너십 신청서를 작성해 주십시오."
              : "미확인 항목은 거절 사유가 아닙니다. 미팅에서 준비 방법을 함께 정리합니다."}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="relative group inline-block">
            <button
              type="button"
              onClick={() => {
                if (allMet) setApplyOpen(true);
              }}
              disabled={!allMet}
              className={`${
                allMet
                  ? `${pillAccent} cursor-pointer`
                  : "inline-flex items-center justify-center rounded-full border border-hairline bg-slate/10 px-[34px] py-[18px] text-[15px] font-semibold text-slate/50 cursor-not-allowed"
              } border-0`}
            >
              파트너십 신청하기
            </button>
            {!allMet && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded bg-graphite px-3 py-2 text-center text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-md">
                오른쪽 6가지 준비 조건을 모두 체크해 주시면 신청이 가능합니다.
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-graphite"></div>
              </div>
            )}
          </div>
          {!allMet && (
            <p className="body-kr m-0 text-right text-[12px] text-warn leading-normal">
              오른쪽 6가지 준비 조건을 모두 체크하시면
              <br />
              &apos;파트너십 신청하기&apos; 버튼이 활성화됩니다.
            </p>
          )}
        </div>
      </div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
