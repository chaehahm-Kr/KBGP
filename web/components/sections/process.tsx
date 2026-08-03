"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const panelId = useId();
  const step = processSteps[active];

  return (
    <Section id="process">
      <SectionHeading label={`Process — 0${processSteps.length}`}>
        신청부터 본 파트너십까지
      </SectionHeading>

      {/* 데스크톱 전용 레이아웃 (768px 이상) */}
      <div className="hidden md:block">
        <div className="flex gap-1.5 pt-8 pb-10">
          {processSteps.map((s, index) => (
            <button
              key={s.title}
              type="button"
              aria-label={`${pad(index + 1)} ${s.title}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className="flex-1 border-t-2 pt-3 text-left transition-colors duration-200"
              style={{
                borderTopColor: index <= active ? "var(--accent)" : "var(--hairline)",
              }}
            >
              <span
                className={`font-serif-latin tnum text-[18px] transition-colors duration-200 ${
                  index === active ? "text-graphite" : "text-slate"
                }`}
              >
                {pad(index + 1)}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)] gap-[clamp(24px,4vw,64px)]">
          <div className="border-t border-hairline">
            {processSteps.map((s, index) => {
              const isActive = index === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(index)}
                  className={`flex w-full items-baseline gap-4 border-b border-hairline border-l-[3px] px-[18px] py-[18px] text-left transition-colors duration-200 ${
                    isActive
                      ? "border-l-accent bg-paper-raised"
                      : "border-l-transparent hover:bg-paper-raised/60"
                  }`}
                >
                  <span className="font-serif-latin tnum text-[20px] text-slate">
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`text-[16px] tracking-[-0.02em] ${
                      isActive ? "font-bold text-graphite" : "font-medium text-slate"
                    }`}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div id={panelId}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.title}
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="flex items-baseline justify-between gap-6 border-b border-hairline pb-6">
                  <h3 className="display-kr m-0 text-[34px]">
                    {step.title}
                  </h3>
                  <span className="micro-label whitespace-nowrap text-slate">
                    {step.phase}
                  </span>
                </div>

                <p className="body-kr m-0 max-w-[620px] pt-7 text-[18px] text-graphite">
                  {step.body}
                </p>

                <div className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
                  <div className="bg-paper p-6">
                    <p className="micro-label m-0 text-slate">Brand</p>
                    <p className="body-kr m-0 mt-3 text-[16px]">{step.brand}</p>
                  </div>
                  <div className="bg-paper p-6">
                    <p className="micro-label m-0 text-slate">Letusto</p>
                    <p className="body-kr m-0 mt-3 text-[16px]">{step.letusto}</p>
                  </div>
                  <div className="bg-paper p-6">
                    <p className="micro-label m-0 text-slate">Duration</p>
                    <p className="body-kr m-0 mt-3 text-[16px]">{step.duration}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 모바일 전용 아코디언 레이아웃 (767px 이하) */}
      <div className="block md:hidden pt-6">
        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
          {processSteps.map((s, index) => {
            const isOpen = index === active;
            return (
              <li key={s.title} className="block border-b border-hairline pb-3.5">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActive(index)}
                  className={`flex w-full items-center justify-between py-2 text-left outline-none transition-colors duration-150 ${
                    isOpen ? "text-accent" : "text-graphite"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-serif-latin tnum text-[18px] text-slate">
                      {pad(index + 1)}
                    </span>
                    <span className="body-kr text-[17px] font-bold tracking-[-0.02em]">
                      {s.title}
                    </span>
                  </span>
                  <span className="text-[20px] leading-none text-slate select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* 아코디언 콘텐츠 */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2">
                        <div className="flex items-baseline justify-between gap-4 border-b border-hairline pb-3">
                          <span className="micro-label text-slate">
                            {s.phase}
                          </span>
                        </div>

                        <p className="body-kr m-0 pt-4 text-[15px] leading-relaxed text-slate">
                          {s.body}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 rounded-lg border border-hairline bg-paper p-4">
                          <div>
                            <p className="micro-label m-0 text-slate text-[10px]">Brand</p>
                            <p className="body-kr m-0 mt-1 text-[13px] text-graphite">{s.brand}</p>
                          </div>
                          <div className="border-t border-hairline/60 pt-2.5">
                            <p className="micro-label m-0 text-slate text-[10px]">Letusto</p>
                            <p className="body-kr m-0 mt-1 text-[13px] text-graphite">{s.letusto}</p>
                          </div>
                          <div className="border-t border-hairline/60 pt-2.5">
                            <p className="micro-label m-0 text-slate text-[10px]">Duration</p>
                            <p className="body-kr m-0 mt-1 text-[13px] text-graphite">{s.duration}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
