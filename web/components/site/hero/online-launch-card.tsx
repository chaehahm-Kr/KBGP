"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { onlineLaunchCard } from "@/lib/content";

const EASE = [0.22, 0.8, 0.24, 1] as [number, number, number, number];

export function OnlineLaunchCard({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className="onlineLaunchHover relative flex w-full flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-[#f6f4ef] p-5 lg:p-7"
      style={{ minHeight: 306 }}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE, delay }}
    >
      <div className="pointer-events-none relative z-10 select-none">
        <p className="text-[12px] font-medium tracking-[0.12em] text-slate">
          {onlineLaunchCard.label}
        </p>
      </div>

      <div className="relative z-0 -mx-2 my-4 flex h-[170px] flex-none items-center justify-center">
        <Image
          src="/images/hero/online-launch-transparent.png"
          alt="Amazon 온라인 창과 쇼핑백, 배송 상자, 상승 화살표가 함께 있는 론칭 이미지"
          width={247}
          height={177}
          sizes="(min-width: 1024px) 22vw, 50vw"
          className="h-auto w-full max-w-[247px] object-contain"
        />
      </div>

      <div className="pointer-events-none relative z-10 mt-auto select-none">
        <p className="body-kr text-[13px] leading-[1.7] font-normal text-graphite lg:text-[14px]">
          {onlineLaunchCard.captionLine1}
          <br />
          {onlineLaunchCard.captionLine2}
        </p>
      </div>
    </motion.div>
  );
}
