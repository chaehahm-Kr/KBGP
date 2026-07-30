"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { benefits, benefitsHeading } from "@/lib/benefits-data";
import { Section, SectionHeading } from "@/components/ui";
import { HonestAssessmentBlock } from "./honest-assessment-block";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BenefitsSection({ items = benefits }: { items?: string[] }) {
  const reduce = useReducedMotion();

  // prefers-reduced-motion 에서는 애니메이션 없이 최종 상태로 바로 렌더한다.
  const listAnim = reduce
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.3 } as const,
      };

  const itemAnim = reduce ? {} : { variants: itemVariants };

  return (
    <Section id="benefits">
      <SectionHeading label={benefitsHeading.label}>
        {benefitsHeading.title}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        <p className="body-kr text-[17px] text-slate">{benefitsHeading.lead}</p>

        {/* 카드 형식이되 라이트 섹션이므로 그림자는 쓰지 않는다 (DESIGN.md §5).
            1px 헤어라인 + 12px 라운드 + paper-raised 로만 구획한다. */}
        <motion.ul
          {...listAnim}
          className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2"
        >
          {items.map((item) => (
            <motion.li
              key={item}
              data-reveal
              {...itemAnim}
              className="flex gap-4 rounded-xl border border-hairline bg-paper-raised px-6 py-6"
            >
              <Check
                aria-hidden
                strokeWidth={1.5}
                className="mt-0.5 size-[18px] shrink-0 text-slate"
              />
              <p className="body-kr m-0 text-[16px]">{item}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <HonestAssessmentBlock />
    </Section>
  );
}
