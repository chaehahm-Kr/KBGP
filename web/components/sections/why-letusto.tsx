"use client";

import { Fragment, useRef } from "react";
import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
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

// 숫자가 혼합된 문자열(예: US$250M+, 20+ Years, 85%)을 접두사, 숫자, 접미사로 분리
function parseValue(valStr: string) {
  const match = valStr.match(/^([^0-9,]*)([0-9,]+)(.*)$/);
  if (!match) {
    return { prefix: "", numStr: valStr, suffix: "" };
  }
  return {
    prefix: match[1],
    numStr: match[2],
    suffix: match[3],
  };
}

interface AnimateStatProps {
  valueStr: string;
}

function AnimateStat({ valueStr }: AnimateStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // 뷰포트에 30% 이상 노출되었을 때 1회 작동
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const { prefix, numStr, suffix } = parseValue(valueStr);
  const targetNum = parseInt(numStr.replace(/,/g, ""), 10);

  // prefers-reduced-motion 설정이거나 숫자가 아닌 경우 즉시 원본 문자열 노출
  if (reduce || isNaN(targetNum)) {
    return <span>{valueStr}</span>;
  }

  return (
    <span ref={ref} className="inline-flex items-baseline font-variant-numeric: tabular-nums">
      {prefix && <span className="select-none">{prefix}</span>}
      {numStr.split("").map((digit, idx) => {
        const isNum = !isNaN(Number(digit));
        if (!isNum) return <span key={idx}>{digit}</span>;

        return (
          <span
            key={idx}
            className="relative inline-block h-[1em] w-[0.6em] overflow-hidden leading-none"
          >
            <span
              className="absolute left-0 top-0 flex flex-col transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: isInView
                  ? `translateY(-${Number(digit) * 10}%)`
                  : "translateY(0%)",
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <span key={n} className="flex h-[1em] items-center justify-center">
                  {n}
                </span>
              ))}
            </span>
            {/* 레이아웃 크기를 유지하기 위한 투명한 텍스트 */}
            <span className="invisible select-none opacity-0">{digit}</span>
          </span>
        );
      })}
      {suffix && <span className="select-none">{suffix}</span>}
    </span>
  );
}

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
                  <AnimateStat valueStr={item.value} />
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
