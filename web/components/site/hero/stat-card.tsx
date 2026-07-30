"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StatValue } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** 히어로 우하단 지표 카드. 이미지 슬롯과 같은 스태거 리듬으로 진입한다. */
export function StatCard({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: EASE, delay: delay / 1000 },
      };

  return (
    <motion.div
      data-reveal
      {...anim}
      className="flex aspect-square flex-col justify-between rounded-xl border border-hairline bg-paper-raised p-6"
    >
      <p className="micro-label text-slate">Since 2004</p>
      <div>
        <StatValue className="block text-[40px] leading-none">$250M+</StatValue>
        <p className="body-kr mt-3 text-sm text-slate">
          누적 판매 · 운영 브랜드 10+ · 거점 3개국
        </p>
      </div>
    </motion.div>
  );
}
