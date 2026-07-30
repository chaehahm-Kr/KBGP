"use client";

import { motion, useReducedMotion } from "framer-motion";
import { honestAssessment } from "@/lib/benefits-data";

/**
 * 이 사이트에서 가장 강한 신뢰 장치. 위 6개 항목과 다른 시각 층으로 읽혀야
 * 하므로 좌측 두꺼운 액센트 바를 가진 대형 인용 블록으로 처리한다.
 * 액센트는 이 바 한 곳에만 쓴다 (BENEFITS 섹션 전체 기준).
 */
export function HonestAssessmentBlock() {
  const reduce = useReducedMotion();

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 } as const,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          // 6개 항목이 모두 등장한 뒤 살짝 늦게 진입한다.
          delay: 0.2,
        },
      };

  return (
    <motion.aside
      data-reveal
      {...anim}
      className="mt-16 border-l-4 border-accent bg-paper-raised px-7 py-10 sm:px-12 sm:py-14"
    >
      <p className="micro-label text-slate">{honestAssessment.label}</p>

      <blockquote className="m-0">
        <h3 className="display-kr mt-6 mb-0 text-[clamp(24px,2.6vw,34px)]">
          {honestAssessment.title}
        </h3>

        {honestAssessment.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="body-kr mt-6 max-w-[820px] text-[17px] text-slate"
          >
            {paragraph}
          </p>
        ))}
      </blockquote>

      <p className="body-kr mt-9 border-t border-hairline pt-7 text-[17px] font-semibold text-graphite">
        {honestAssessment.kicker}
      </p>
    </motion.aside>
  );
}
