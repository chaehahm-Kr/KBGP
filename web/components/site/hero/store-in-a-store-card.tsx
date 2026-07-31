"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { storeInAStoreCard } from "@/lib/content";

const EASE = [0.22, 0.8, 0.24, 1] as [number, number, number, number];

export function StoreInAStoreCard({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className="displayShelfHover relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-[#f6f4ef] p-5 lg:p-7"
      style={{ minHeight: 306 }}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE, delay }}
    >
      <div className="pointer-events-none relative z-10 select-none">
        <p className="text-[12px] font-medium tracking-[0.12em] text-slate">
          {storeInAStoreCard.label}
        </p>
      </div>

      <div className="relative z-0 -mx-3 my-4 flex flex-1 items-center justify-center">
        <Image
          src="/images/hero/store-in-store-transparent.png"
          alt="화장품이 진열된 매대 중앙에 파란색 브랜드 전용 공간이 배정된 모습"
          width={254}
          height={190}
          sizes="(min-width: 1024px) 22vw, 50vw"
          className="h-auto w-full max-w-[240px] object-contain"
        />
      </div>

      <div className="pointer-events-none relative z-10 mt-auto select-none">
        <p className="body-kr whitespace-nowrap text-[13px] font-normal text-graphite lg:text-[14px]">
          {storeInAStoreCard.caption}
        </p>
      </div>
    </motion.div>
  );
}
