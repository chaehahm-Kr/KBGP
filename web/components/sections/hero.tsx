"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { heroLead } from "@/lib/content";
import { HeroNetworkMap } from "@/components/site/hero/hero-network-map";
import { OnlineLaunchCard } from "@/components/site/hero/online-launch-card";
import { StoreInAStoreCard } from "@/components/site/hero/store-in-a-store-card";
import { pillInk } from "../ui";

const EASE = [0.22, 0.8, 0.24, 1] as [number, number, number, number];

export function Hero() {
  const reduce = useReducedMotion();

  const reveal = (index: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.8, ease: EASE, delay: 0.1 * index },
  });

  return (
    <section className="relative overflow-hidden bg-[#f7f5f0]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <svg
          className="absolute top-0 right-[-5%] h-full w-[70%] stroke-slate opacity-[0.04]"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="hero-curve-fade"
              x1="1"
              y1="0.5"
              x2="0.2"
              y2="0.5"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="60%" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#hero-curve-fade)" strokeWidth="0.6" fill="none">
            <path d="M 0 40 C 200 60, 600 25, 800 55" />
            <path d="M 0 100 C 250 130, 550 80, 800 115" />
            <path d="M 0 170 C 200 200, 600 145, 800 185" />
            <path d="M 0 245 C 300 290, 500 215, 800 260" />
            <path d="M 0 325 C 200 355, 600 295, 800 340" />
            <path d="M 0 410 C 250 450, 550 380, 800 425" />
            <path d="M 0 500 C 200 535, 600 475, 800 515" />
            <path d="M 80 0 C 95 200, 65 400, 85 600" />
            <path d="M 190 0 C 215 250, 165 380, 195 600" />
            <path d="M 310 0 C 285 200, 345 400, 320 600" />
            <path d="M 430 0 C 465 250, 395 380, 440 600" />
            <path d="M 550 0 C 520 200, 585 400, 560 600" />
            <path d="M 670 0 C 705 250, 635 380, 680 600" />
          </g>
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-[clamp(20px,4vw,56px)] pt-[clamp(36px,4vw,56px)] pb-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[46%_1fr] lg:gap-[clamp(48px,5vw,88px)]">
          <div className="flex flex-col pb-8">
            <motion.p
              className="micro-label flex items-center gap-2 text-slate select-none"
              {...reveal(0)}
            >
              <span
                aria-hidden
                className="inline-block size-[5px] rounded-full bg-graphite"
              />
              K-Beauty Growth Program — Operated by Letusto Inc.
            </motion.p>

            <motion.h1
              className="display-kr mt-10 mb-0 text-[clamp(40px,5.2vw,72px)] leading-[1.18] font-semibold tracking-[-0.04em] text-graphite"
              {...reveal(1)}
            >
              낯설고 두려운
              <br />
              미국 진출이 아니라,
              <br />
              검증된 파트너와
              <br />
              함께 시작하는
              <br />
              <span className="font-serif-latin text-[0.95em] font-normal tracking-[-0.01em] text-slate/80 italic">
                Growth
              </span>
              입니다.
            </motion.h1>

            <motion.p
              className="body-kr mt-10 max-w-[520px] text-[17px] leading-[1.82] tracking-tight text-slate/85"
              {...reveal(2)}
            >
              {heroLead}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              {...reveal(3)}
            >
              <Link
                href="/apply/check"
                className={`${pillInk} primaryCtaSheen group relative overflow-hidden`}
              >
                파트너십 신청하기
              </Link>
              <a
                href="#program-two-phases"
                className="secondaryCtaHover group/sec px-1 py-[16px] text-[15px] font-semibold text-graphite"
              >
                프로그램 살펴보기{" "}
                <span className="inline-block transition-transform duration-250 group-hover/sec:-translate-y-[1px] group-hover/sec:translate-x-[1px]">
                  ↗
                </span>
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 pb-8 lg:gap-5">
            <HeroNetworkMap delay={0.5} />
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <StoreInAStoreCard delay={0.6} />
              <OnlineLaunchCard delay={0.7} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
