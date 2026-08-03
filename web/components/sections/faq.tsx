"use client";

import { useId, useState } from "react";
import { faqCategories, faqDisclaimer } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = faqCategories[activeIndex];
  const panelId = useId();

  return (
    <Section id="faq">
      <SectionHeading label="FAQ">자주 묻는 질문</SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        {/* 데스크톱 전용 카테고리 내비게이션 (768px 이상) */}
        <div className="hidden md:flex flex-col gap-6">
          <p className="micro-label text-slate">Category</p>
          <nav aria-label="FAQ 카테고리" className="flex flex-col gap-1">
            {faqCategories.map((category, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={category.label}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-3 border-l-2 py-3 pl-4 pr-2 text-left transition-colors duration-150 ${
                    isActive
                      ? "border-accent bg-paper-raised"
                      : "border-transparent hover:bg-paper-raised/60"
                  }`}
                >
                  <span
                    className={`tnum text-[13px] ${isActive ? "text-accent" : "text-slate"}`}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`flex-1 text-[15px] ${
                      isActive ? "font-semibold text-graphite" : "text-slate"
                    }`}
                  >
                    {category.label}
                  </span>
                  <span className="tnum text-[12px] text-slate">
                    {category.items.length}
                  </span>
                </button>
              );
            })}
          </nav>
          <p className="body-kr m-0 max-w-[280px] text-[14px] text-slate">
            답변에서 다루지 않은 사항은{" "}
            <a
              href="mailto:contact@letusto.com"
              className="text-graphite underline decoration-hairline underline-offset-2 hover:text-accent"
            >
              contact@letusto.com
            </a>
            으로 문의해 주십시오.
          </p>
        </div>

        {/* 모바일 전용 카테고리 드롭다운 (767px 이하) */}
        <div className="block md:hidden">
          <p className="micro-label text-slate mb-2.5">Category</p>
          <div className="relative">
            <select
              value={activeIndex}
              onChange={(e) => setActiveIndex(Number(e.target.value))}
              className="body-kr w-full rounded-lg border border-hairline bg-paper-raised px-4.5 py-4 text-[15px] font-bold text-graphite appearance-none outline-none focus:border-accent select-none cursor-pointer"
            >
              {faqCategories.map((category, index) => (
                <option key={category.label} value={index}>
                  {pad(index + 1)} {category.label} ({category.items.length})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-4.5 flex items-center text-slate">
              <span className="text-[10px] select-none">▼</span>
            </div>
          </div>
          <p className="body-kr m-0 mt-4.5 text-[13px] text-slate">
            답변에서 다루지 않은 사항은{" "}
            <a
              href="mailto:contact@letusto.com"
              className="text-graphite underline decoration-hairline underline-offset-2 hover:text-accent font-semibold"
            >
              contact@letusto.com
            </a>
            으로 문의해 주십시오.
          </p>
          <div className="mt-8 border-b border-hairline" />
        </div>

        <div id={panelId}>
          <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-5">
            <h3 className="display-kr m-0 text-[20px] sm:text-[22px]">
              {active.label}
            </h3>
            <span className="micro-label whitespace-nowrap text-slate">
              {active.items.length}개 질문
            </span>
          </div>

          <div>
            {active.items.map((item, index) => (
              <details
                key={item.q}
                className={
                  index < active.items.length - 1
                    ? "faq-item border-b border-hairline"
                    : "faq-item"
                }
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                  <span className="flex items-start gap-4">
                    <span className="tnum pt-[1px] text-[13px] text-slate">
                      {pad(index + 1)}
                    </span>
                    <span className="text-[16px] font-medium text-graphite sm:text-[17px]">
                      {item.q}
                    </span>
                  </span>
                  <span aria-hidden className="shrink-0 pt-[1px] text-lg text-slate">
                    <span className="faq-icon-plus">+</span>
                    <span className="faq-icon-minus">−</span>
                  </span>
                </summary>
                <p className="body-kr m-0 max-w-[720px] py-[1px] pb-6 pl-[36px] text-[15px] text-slate">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <p className="body-kr m-0 max-w-[720px] pt-8 text-[13px] text-slate">
            * {faqDisclaimer}
          </p>
        </div>
      </div>
    </Section>
  );
}
