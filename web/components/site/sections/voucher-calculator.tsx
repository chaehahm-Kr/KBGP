"use client";

import { useState } from "react";
import {
  calculate,
  exportTierOptions,
  formatKRW,
  revenueOptions,
  type ExportTier,
  type RevenueTier,
} from "@/lib/voucher-calc";
import { StatValue, pillInk } from "@/components/ui";

const selectClass =
  "mt-2.5 w-full appearance-none rounded-lg border border-hairline bg-paper px-4 py-3.5 text-[16px] text-graphite";

export function VoucherCalculator() {
  const [tier, setTier] = useState<ExportTier>("domestic");
  const [revenue, setRevenue] = useState<RevenueTier>("under100");
  const [innovative, setInnovative] = useState(false);

  const isDomestic = tier === "domestic";
  const result = calculate(tier, revenue, isDomestic && innovative);
  const pct = Math.round(result.rate * 100);

  const rows = [
    { label: "적용 등급", value: result.grade },
    { label: "국고 지원한도", value: formatKRW(result.cap, false) },
    { label: "국고보조율", value: `${pct}% (자기부담 ${100 - pct}%)` },
    { label: "한도 소진 시 총 사업비", value: formatKRW(result.total, true) },
  ];

  return (
    <div className="grid grid-cols-1 gap-[clamp(28px,4vw,56px)] pt-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start">
      <div>
        <p className="body-kr mb-7 text-[16px] text-slate">
          전년도 수출실적과 매출액만 고르면 등급 · 국고한도 · 자기부담금이 바로
          계산됩니다. (2026년 중소벤처기업부 소관 수출바우처 기준)
        </p>

        <div>
          <label
            htmlFor="exportTier"
            className="block text-sm font-semibold text-graphite"
          >
            전년도 수출실적
          </label>
          <select
            id="exportTier"
            value={tier}
            onChange={(e) => setTier(e.target.value as ExportTier)}
            className={selectClass}
          >
            {exportTierOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label
            htmlFor="revenue"
            className="block text-sm font-semibold text-graphite"
          >
            전년도 매출액
          </label>
          <select
            id="revenue"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value as RevenueTier)}
            className={selectClass}
          >
            {revenueOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 border-t border-hairline pt-6">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="innovative"
              checked={isDomestic && innovative}
              disabled={!isDomestic}
              onChange={(e) => setInnovative(e.target.checked)}
              className="mt-1 size-4 shrink-0 accent-accent"
            />
            <label
              htmlFor="innovative"
              className={`body-kr text-[15px] ${
                isDomestic ? "text-graphite" : "cursor-not-allowed text-slate"
              }`}
            >
              혁신형 중소기업에 해당합니다 (벤처기업 · 이노비즈 · 메인비즈 등)
            </label>
          </div>
          {!isDomestic && (
            <p className="mt-2.5 pl-7 text-[13px] text-slate">
              내수기업(1,000불 미만)에만 적용됩니다
            </p>
          )}
        </div>
      </div>

      <div>
        <dl aria-live="polite" className="m-0 border-t border-hairline">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-5 border-b border-hairline py-5"
            >
              <dt className="text-[15px] text-slate">{row.label}</dt>
              <dd className="m-0">
                <StatValue className="text-[22px]">{row.value}</StatValue>
              </dd>
            </div>
          ))}

          <div className="mt-6 rounded-xl border border-hairline border-l-4 border-l-accent bg-paper-raised px-7 py-6">
            <dt className="micro-label text-slate">실제 내가 낼 돈</dt>
            <dd className="m-0 mt-3">
              <StatValue className="block text-[40px] leading-none text-accent">
                {formatKRW(result.own, true)}
              </StatValue>
            </dd>
          </div>
        </dl>

        <p className="body-kr mt-7 text-[16px] text-slate">
          위 금액 안에서 Letusto의 조사 · 컨설팅과 홍보 · 광고 서비스를 조합해
          사용할 수 있습니다. 예산 배분과 메뉴 조합은 상담 시 함께 설계해
          드립니다.
        </p>
        <p className="body-kr mt-3 text-xs text-slate">
          계산 결과는 2026년 공고 기준 참고값입니다. 최종 한도 · 보조율은 선정
          결과와 운영기관 심사에 따라 달라질 수 있습니다.
        </p>

        <a href="#voucher-contact" className={`${pillInk} mt-7`}>
          이 조건으로 상담 요청하기
        </a>
      </div>
    </div>
  );
}
