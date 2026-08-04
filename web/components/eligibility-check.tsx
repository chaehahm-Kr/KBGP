"use client";

import { useState, useEffect } from "react";
import { eligibilityConditions } from "@/lib/content";
import { ApplyModal } from "./site/apply/apply-modal";
import { StatValue, pillAccent } from "./ui";

const TOTAL = eligibilityConditions.length;
type Selection = "available" | "discussion_required" | null;

interface ResponseItem {
  itemKey: string;
  itemNumber: number;
  title: string;
  response: Selection;
}

interface EligibilityData {
  eligibilityResponses: ResponseItem[];
  eligibilityCompleted: boolean;
  availableCount: number;
  discussionRequiredCount: number;
}

function ConditionCards({
  selections,
  onChange,
}: {
  selections: Selection[];
  onChange: (index: number, val: Selection) => void;
}) {
  return (
    <ul className="m-0 flex list-none flex-col gap-4 p-0">
      {eligibilityConditions.map((item, index) => {
        const currentSelection = selections[index];
        return (
          <li key={item.key} className="block">
            <div className="flex w-full flex-col justify-between gap-4 rounded-lg border border-hairline bg-paper-raised p-5 md:flex-row md:items-center md:gap-8 transition-colors duration-200">
              {/* 좌측 설명 */}
              <div className="flex items-start gap-4">
                <span className="font-serif-latin text-[22px] font-semibold text-slate/70 leading-none mt-0.5">
                  {String(item.number).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h4 className="body-kr text-base font-bold text-graphite leading-snug">
                    {item.title}
                  </h4>
                  <p className="body-kr text-[14px] text-slate leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* 우측 라디오 버튼 그룹 */}
              <div
                role="radiogroup"
                aria-label={item.title}
                className="flex items-center gap-2.5 shrink-0 self-start md:self-auto mt-2 md:mt-0"
              >
                {/* 진행 가능 버튼 */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={currentSelection === "available"}
                  onClick={() => onChange(index, "available")}
                  className={`flex h-11 items-center justify-center rounded-full border px-5 text-[14px] font-bold transition-all duration-200 cursor-pointer select-none outline-none ${
                    currentSelection === "available"
                      ? "bg-accent text-white border-accent shadow-sm"
                      : "border-hairline bg-paper text-slate hover:bg-[#efede6] hover:text-graphite"
                  }`}
                >
                  진행 가능
                </button>
                
                {/* 협의 필요 버튼 */}
                <button
                  type="button"
                  role="radio"
                  aria-checked={currentSelection === "discussion_required"}
                  onClick={() => onChange(index, "discussion_required")}
                  className={`flex h-11 items-center justify-center rounded-full border px-5 text-[14px] font-bold transition-all duration-200 cursor-pointer select-none outline-none ${
                    currentSelection === "discussion_required"
                      ? "bg-[#8a93a6] text-white border-[#8a93a6] shadow-sm"
                      : "border-hairline bg-paper text-slate hover:bg-[#efede6] hover:text-graphite"
                  }`}
                >
                  협의 필요
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function useConditions() {
  const [selections, setSelections] = useState<Selection[]>(() => Array(TOTAL).fill(null));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = sessionStorage.getItem("kbeauty_eligibility_responses");
      if (saved) {
        const parsed = JSON.parse(saved) as EligibilityData;
        if (parsed.eligibilityResponses) {
          setSelections(parsed.eligibilityResponses.map((r) => r.response));
        }
      }
    } catch (e) {
      console.error("Failed to load eligibility state", e);
    }

    const handleReset = () => {
      setSelections(Array(TOTAL).fill(null));
    };

    window.addEventListener("kbeauty_eligibility_reset", handleReset);
    return () => {
      window.removeEventListener("kbeauty_eligibility_reset", handleReset);
    };
  }, []);

  const checkedCount = selections.filter((v) => v !== null).length;
  const availableCount = selections.filter((v) => v === "available").length;
  const discussionRequiredCount = selections.filter((v) => v === "discussion_required").length;
  const allSelected = checkedCount === TOTAL;

  const updateSelection = (index: number, val: Selection) => {
    setSelections((prev) => {
      const nextVal = prev[index] === val ? null : val;
      const next = prev.map((v, i) => (i === index ? nextVal : v));
      
      const eligibilityResponses = eligibilityConditions.map((item, i) => ({
        itemKey: item.key,
        itemNumber: item.number,
        title: item.title,
        response: next[i],
      }));

      const payload: EligibilityData = {
        eligibilityResponses,
        eligibilityCompleted: next.filter((v) => v !== null).length === TOTAL,
        availableCount: next.filter((v) => v === "available").length,
        discussionRequiredCount: next.filter((v) => v === "discussion_required").length,
      };

      try {
        sessionStorage.setItem("kbeauty_eligibility_responses", JSON.stringify(payload));
      } catch (e) {
        console.error("Failed to save eligibility state", e);
      }

      return next;
    });
  };

  return {
    selections,
    checkedCount,
    availableCount,
    discussionRequiredCount,
    allSelected,
    updateSelection,
    isMounted,
  };
}

export function EligibilitySection() {
  const {
    selections,
    checkedCount,
    availableCount,
    discussionRequiredCount,
    allSelected,
    updateSelection,
    isMounted,
  } = useConditions();
  
  const [applyOpen, setApplyOpen] = useState(false);

  // Next.js hydration을 방지하기 위해 마운트되기 전에는 초기값(0/6) 렌더링
  const displayCount = isMounted ? checkedCount : 0;
  const displayAvailable = isMounted ? availableCount : 0;
  const displayDiscussion = isMounted ? discussionRequiredCount : 0;
  const displayAllSelected = isMounted ? allSelected : false;

  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
      <div>
        <p className="body-kr text-[17px] text-slate leading-relaxed">
          아래 항목은 K-Beauty Growth Program을 원활하게 진행하기 위한 기본 준비 사항입니다. 현재 모든 준비가 완료되지 않았더라도, 향후 보완 및 협력이 가능한 경우 프로그램 참여를 함께 검토할 수 있습니다.
        </p>
        <div className="mt-7 border-t border-hairline pt-6">
          <StatValue className="block text-[40px] leading-none">
            {displayCount} / {TOTAL}
          </StatValue>
          <p className="body-kr text-sm font-bold text-slate mt-2">
            {displayCount === TOTAL ? "모든 항목 확인 완료" : "항목 확인 완료"}
          </p>
          {(displayAvailable > 0 || displayDiscussion > 0) && (
            <p className="body-kr text-xs text-slate/75 mt-1.5">
              진행 가능 {displayAvailable}개 · 협의 필요 {displayDiscussion}개
            </p>
          )}
        </div>
        <div className="mt-7 flex flex-col gap-3 items-start">
          <div className="relative group inline-block">
            <button
              type="button"
              onClick={() => {
                if (displayAllSelected) setApplyOpen(true);
              }}
              disabled={!displayAllSelected}
              className={`${
                displayAllSelected
                  ? `${pillAccent} cursor-pointer`
                  : "inline-flex items-center justify-center rounded-full border border-hairline bg-slate/10 px-[34px] py-[18px] text-[15px] font-semibold text-slate/50 cursor-not-allowed"
              } border-0`}
            >
              파트너십 신청하기
            </button>
          </div>
          <p className="body-kr m-0 text-[13px] leading-relaxed transition-colors duration-200 text-warn">
            {displayAllSelected
              ? "준비 사항 확인이 완료되었습니다. 신청을 계속해 주세요."
              : "6개 준비 사항을 모두 확인하시면 파트너십 신청이 가능합니다."}
          </p>
        </div>
      </div>
      
      <ConditionCards selections={selections} onChange={updateSelection} />

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

export function EligibilityFocus() {
  const {
    selections,
    checkedCount,
    availableCount,
    discussionRequiredCount,
    allSelected,
    updateSelection,
    isMounted,
  } = useConditions();

  const [applyOpen, setApplyOpen] = useState(false);

  const displayCount = isMounted ? checkedCount : 0;
  const displayAvailable = isMounted ? availableCount : 0;
  const displayDiscussion = isMounted ? discussionRequiredCount : 0;
  const displayAllSelected = isMounted ? allSelected : false;

  return (
    <>
      <ConditionCards selections={selections} onChange={updateSelection} />

      <div className="sticky bottom-0 mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-hairline bg-paper/95 py-7 backdrop-blur-[8px] z-20">
        <div>
          <p className="flex items-baseline gap-2.5">
            <StatValue className="text-[32px] leading-none">
              {displayCount} / {TOTAL}
            </StatValue>
            <span className="body-kr text-sm font-bold text-slate">
              {displayCount === TOTAL ? "모든 항목 확인 완료" : "항목 확인 완료"}
            </span>
          </p>
          {(displayAvailable > 0 || displayDiscussion > 0) && (
            <p className="body-kr text-[13px] text-slate/80 mt-1">
              진행 가능 {displayAvailable}개 · 협의 필요 {displayDiscussion}개
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="relative group inline-block">
            <button
              type="button"
              onClick={() => {
                if (displayAllSelected) setApplyOpen(true);
              }}
              disabled={!displayAllSelected}
              className={`${
                displayAllSelected
                  ? `${pillAccent} cursor-pointer`
                  : "inline-flex items-center justify-center rounded-full border border-hairline bg-slate/10 px-[34px] py-[18px] text-[15px] font-semibold text-slate/50 cursor-not-allowed"
              } border-0`}
            >
              파트너십 신청하기
            </button>
          </div>
          <p className="body-kr m-0 text-right text-[12px] leading-normal transition-colors duration-200 text-warn">
            {displayAllSelected
              ? "준비 사항 확인이 완료되었습니다. 신청을 계속해 주세요."
              : "6개 준비 사항을 모두 확인하시면 파트너십 신청이 가능합니다."}
          </p>
        </div>
      </div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  );
}
