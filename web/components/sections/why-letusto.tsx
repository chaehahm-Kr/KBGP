"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { letustoNumbers, whyLetusto } from "@/lib/content";
import { Section, SectionHeading, StatValue } from "../ui";

// DESIGN.md §8: opacity 0→1 + translateY 16px→0, 500ms, 항목당 60ms 스태거.
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function WhyLetusto() {
  const reduce = useReducedMotion();

  // prefers-reduced-motion 에서는 애니메이션 없이 최종 상태로 바로 렌더한다.
  const listAnim = reduce
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.2 } as const,
      };

  const itemAnim = reduce ? {} : { variants: itemVariants };

  return (
    <Section id="letusto">
      <SectionHeading label="Why Letusto" headingClassName="max-w-[880px]">
        {whyLetusto.headlineLines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        {/* 라벨 컬럼은 비워 두고 본문을 오른쪽 컬럼에 정렬한다 (비대칭 배치). */}
        <div aria-hidden className="hidden md:block" />
        <div className="flex flex-col gap-6">
          {whyLetusto.paragraphs.map((paragraph) => (
            <p key={paragraph} className="body-kr m-0 text-[17px] text-slate">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="pt-[clamp(48px,6vw,88px)]">
        <p className="micro-label text-slate">By the Numbers</p>
        <h3 className="display-kr mt-4 mb-0 text-[24px]">숫자로 보는 Letusto</h3>

        {/* DESIGN.md §5 라이트 섹션 그림자 금지 · §6 지표 블록은 카드 배경 없이
            hairline 으로만 구획한다. */}
        <motion.dl
          {...listAnim}
          className="m-0 mt-10 grid grid-cols-1 gap-x-[clamp(20px,3.4vw,64px)] gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {letustoNumbers.map((item) => (
            <motion.div
              key={item.label}
              data-reveal
              {...itemAnim}
              className="border-t border-hairline pt-6"
            >
              <dd className="m-0">
                <StatValue className="block text-[32px] leading-none">
                  {item.value}
                </StatValue>
              </dd>
              <dt className="micro-label mt-3 text-slate">{item.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </Section>
  );
}
