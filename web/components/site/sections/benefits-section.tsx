"use client";

import { motion, useReducedMotion } from "framer-motion";
import { benefits, benefitsHeading } from "@/lib/benefits-data";
import { Section, SectionHeading } from "@/components/ui";
import { HonestAssessmentBlock } from "./honest-assessment-block";

export function BenefitsSection({ items = benefits }: { items?: string[] }) {
  const reduce = useReducedMotion();

  return (
    <Section id="benefits">
      <SectionHeading label={benefitsHeading.label}>
        {benefitsHeading.title}
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        <p className="body-kr text-[17px] text-slate leading-relaxed">{benefitsHeading.lead}</p>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {items.map((item, index) => {
            const rowIndex = Math.floor(index / 2);
            return (
              <motion.li
                key={item}
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduce ? 0 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduce ? 0 : rowIndex * 0.1,
                }}
                className="flex items-center justify-between gap-4 rounded-xl border border-hairline border-l-4 border-l-accent bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:border-accent/30 hover:shadow-md motion-reduce:hover:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-center gap-6">
                  {/* 왼쪽 번호 */}
                  <span className="font-serif-latin text-[22px] font-bold text-accent shrink-0 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* 텍스트 */}
                  <p className="body-kr m-0 text-[16px] text-graphite font-medium leading-normal">
                    {item}
                  </p>
                </div>
                {/* 8번 카드(Index 7)에만 노출되는 30+ 마크 */}
                {index === 7 && (
                  <span className="font-serif-latin text-[28px] font-black text-accent/90 tracking-tighter shrink-0 pr-1 select-none">
                    30+
                  </span>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>

      <HonestAssessmentBlock />
    </Section>
  );
}
