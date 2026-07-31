"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroNetwork } from "@/lib/content";

const EASE = [0.22, 0.8, 0.24, 1] as [number, number, number, number];

const stateLabels = [
  { y: 72, text: "NEW YORK", fromX: 183, fromY: 69 },
  { y: 139, text: "PENNSYLVANIA", fromX: 171, fromY: 135 },
  { y: 183, text: "NEW JERSEY", fromX: 191, fromY: 181, accent: true },
  { y: 221, text: "DELAWARE", fromX: 180, fromY: 219 },
  { y: 254, text: "MARYLAND", fromX: 174, fromY: 251 },
  { y: 302, text: "VIRGINIA", fromX: 151, fromY: 299 },
  { y: 383, text: "NORTH CAROLINA", fromX: 118, fromY: 378 },
];

/** 파트너 스토어 10곳. 위에서 아래로(북→남) 정렬 — 배열 순서가 곧 등장 순서다. */
const partnerDots = [
  { cx: 171, cy: 70, key: "ny1" },
  { cx: 125, cy: 134, key: "pa1" },
  { cx: 160, cy: 134, key: "pa2" },
  { cx: 143, cy: 154, key: "pa3" },
  { cx: 142, cy: 196, key: "nj1" },
  { cx: 117, cy: 215, key: "md1" },
  { cx: 94, cy: 244, key: "md2" },
  { cx: 113, cy: 286, key: "va1" },
  { cx: 69, cy: 348, key: "nc1" },
  { cx: 97, cy: 348, key: "nc2" },
  { cx: 87, cy: 368, key: "nc3" },
];

const HQ = { cx: 166, cy: 199 };

export function HeroNetworkMap({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-hairline bg-[#f6f4ef] p-6 lg:p-9"
      style={{ minHeight: 456 }}
      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.8, ease: EASE, delay }}
    >
      <div className="flex flex-1">
        <div className="pointer-events-none flex w-[43%] shrink-0 select-none flex-col pt-2 2xl:w-[39%]">
          <div>
            <p className="text-[12px] font-medium tracking-[0.12em] text-slate">
              {heroNetwork.label}
            </p>
            <h3
              className="mt-6 text-[24px] font-bold tracking-[-0.045em] text-graphite lg:text-[26px]"
              style={{ fontFamily: "var(--font-sans)", lineHeight: 1.42 }}
            >
              {heroNetwork.statesLine1}
              <br />
              {heroNetwork.statesLine2}
            </h3>
            <div className="mt-3 h-px w-full bg-hairline" />
            <p className="body-kr mt-6 text-[16px] font-normal text-graphite lg:text-[18px]">
              {heroNetwork.summary}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <div className="flex items-center gap-3">
              <span className="size-3 rounded-full bg-[#7f8588]" />
              <span className="text-[13px] font-normal text-slate">
                {heroNetwork.legendPartner}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="size-4 rounded-full border-2 border-accent bg-white" />
              <span className="text-[13px] font-normal text-slate">
                {heroNetwork.legendHq}
              </span>
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 330 440"
          className="-my-4 min-w-0 flex-1 origin-center translate-x-3 scale-x-[1.20] scale-y-[1.08]"
          preserveAspectRatio="xMinYMid meet"
          fill="none"
          role="img"
          aria-label="미국 동부 7개 주에 걸친 파트너 스토어 네트워크 지도"
        >
          <g
            fill="#fbfaf7"
            stroke="var(--slate)"
            strokeWidth="0.8"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.25"
          >
            <path d="M54 92 L56 73 L70 66 L69 53 L88 50 L89 37 L102 31 L112 31 L122 22 L132 23 L140 16 L150 19 L159 15 L178 17 L181 42 L187 66 L181 92 L166 105 L151 103 L142 112 L124 107 L105 104 L83 101 L66 100 Z" />
            <path d="M54 92 L66 100 L83 101 L105 104 L124 107 L142 112 L158 107 L171 115 L169 165 L149 166 L126 163 L104 165 L78 165 L55 162 L51 146 Z" />
            <path d="M171 115 L183 121 L180 132 L188 141 L184 155 L188 170 L181 187 L175 205 L164 214 L158 204 L162 185 L169 165 Z" />
            <path d="M159 204 L164 214 L174 219 L171 242 L158 242 L154 226 Z" />
            <path d="M55 162 L78 165 L104 165 L126 163 L149 166 L169 165 L162 185 L159 204 L154 226 L171 242 L159 247 L149 238 L138 241 L129 233 L119 241 L102 239 L92 247 L73 242 L61 249 L45 245 L47 222 L39 214 L48 199 Z" />
            <path d="M45 245 L61 249 L73 242 L92 247 L102 239 L119 241 L129 233 L138 241 L149 238 L159 247 L151 258 L154 272 L147 286 L151 299 L135 311 L116 320 L94 321 L73 316 L53 315 L34 307 L24 294 L31 278 Z" />
            <path d="M24 294 L34 307 L53 315 L73 316 L94 321 L116 320 L135 311 L151 299 L145 318 L135 328 L137 343 L126 354 L111 360 L103 376 L91 389 L77 397 L63 412 L49 421 L35 410 L22 396 L8 383 L2 365 L7 344 L15 326 Z" />
          </g>

          <path
            d="M144 236 C141 246 143 257 136 267 C132 273 138 280 132 286 M149 247 C145 254 151 261 146 270 M137 343 C145 347 150 345 154 339"
            stroke="var(--slate)"
            strokeWidth="0.65"
            strokeLinecap="round"
            opacity="0.20"
          />

          <g fill="none" stroke="var(--slate)" strokeWidth="0.55" opacity="0.22">
            {stateLabels.map((label) => (
              <path
                key={`${label.text}-line`}
                d={`M ${label.fromX} ${label.fromY} L 207 ${label.y - 3} L 220 ${label.y - 3}`}
                stroke={label.accent ? "var(--accent)" : undefined}
              />
            ))}
          </g>
          <g
            fill="var(--slate)"
            fontSize="10"
            fontWeight="500"
            fontFamily="var(--font-sans)"
            letterSpacing="0.4"
          >
            {stateLabels.map((label) => (
              <text
                key={label.text}
                x="224"
                y={label.y}
                fill={label.accent ? "var(--accent)" : undefined}
                fontWeight={label.accent ? 600 : undefined}
              >
                {label.text}
              </text>
            ))}
          </g>
          <g fill="#94a3b8">
            {partnerDots.map((dot, index) => (
              <motion.circle
                key={dot.key}
                cx={dot.cx}
                cy={dot.cy}
                r="6"
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduce ? 0.1 : 0.4,
                  delay: (reduce ? 0 : delay + 0.3) + 0.11 * index,
                }}
                style={{
                  transformOrigin: `${dot.cx}px ${dot.cy}px`,
                  transformBox: "fill-box",
                }}
              />
            ))}
          </g>
          <circle
            cx={HQ.cx}
            cy={HQ.cy}
            r="10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="headquartersPulse"
          />
          <circle
            cx={HQ.cx}
            cy={HQ.cy}
            r="10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            className="headquartersPulse"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx={HQ.cx}
            cy={HQ.cy}
            r="10"
            fill="#fff"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>
      </div>
    </motion.div>
  );
}
