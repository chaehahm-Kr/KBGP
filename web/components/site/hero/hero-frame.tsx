"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroRatio } from "@/lib/hero-media";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ratioClass: Record<HeroRatio, string> = {
  "4:3": "aspect-4/3",
  "1:1": "aspect-square",
};

export type HeroFrameProps = {
  src: string | null;
  alt: string;
  ratio: HeroRatio;
  caption: string;
  /** 스태거용 진입 지연 (ms) */
  delay?: number;
  /** LCP 후보에만 부여한다. priority 프레임은 opacity 페이드를 생략한다. */
  priority?: boolean;
  /** src 가 없을 때 렌더할 SVG 폴백 */
  fallback: ReactNode;
  sizes?: string;
  /**
   * placeholder="blur" 는 런타임 문자열 src 일 때 blurDataURL 이 없으면
   * Next 가 예외를 던진다. 값이 있을 때만 blur 를 켠다.
   */
  blurDataURL?: string;
};

export function HeroFrame({
  src,
  alt,
  ratio,
  caption,
  delay = 0,
  priority = false,
  fallback,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  blurDataURL,
}: HeroFrameProps) {
  const reduce = useReducedMotion();
  const seconds = delay / 1000;

  /**
   * LCP 요소는 조상의 opacity 가 0이면 "그려지지 않은 것"으로 집계된다.
   * 따라서 priority 프레임은 페이드를 걸지 않고 translateY 만 쓴다.
   * translate 는 이미 페인트된 것으로 집계되므로 LCP 를 늦추지 않는다.
   */
  const frameAnim = reduce
    ? {}
    : {
        initial: priority ? { y: 20 } : { opacity: 0, y: 20 },
        animate: priority ? { y: 0 } : { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: EASE, delay: seconds },
      };

  // 프레임 바운딩 박스는 고정이고, 내부 콘텐츠만 정착한다.
  const innerAnim = reduce
    ? {}
    : {
        initial: { scale: 1.06 },
        animate: { scale: 1 },
        transition: { duration: 0.9, ease: EASE, delay: seconds },
      };

  const hover = reduce ? undefined : { scale: 1.015 };

  return (
    <motion.figure
      data-reveal
      {...frameAnim}
      whileHover={hover}
      className={`relative m-0 overflow-hidden rounded-xl border border-hairline bg-paper-raised ${ratioClass[ratio]}`}
    >
      <motion.div {...innerAnim} className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            {...(blurDataURL
              ? ({ placeholder: "blur", blurDataURL } as const)
              : {})}
            className="object-cover"
          />
        ) : (
          fallback
        )}
      </motion.div>

      {/* 캡션은 오버레이가 아니라 프레임 하단 안쪽에 둔다. 사진이 어두워도
          대비가 유지되도록 paper 배경 위에 올린다. */}
      <figcaption className="micro-label absolute inset-x-0 bottom-0 bg-paper/92 px-5 py-3 text-slate backdrop-blur-[2px]">
        {caption}
      </figcaption>
    </motion.figure>
  );
}
