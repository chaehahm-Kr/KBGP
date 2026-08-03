import type { ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 새로운 로고 심볼 (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="size-[30px] shrink-0 sm:size-[34px]"
      >
        <path
          d="M 112 170 H 30 V 30 H 170 V 112"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
          className="text-graphite"
        />
        <path
          d="M 70 55 H 88 V 95 L 123 55 H 142 L 103 98 L 143 145 H 124 L 88 103 V 145 H 70 Z"
          fill="currentColor"
          className="text-graphite"
        />
        <path
          d="M 120 148 L 142 170 L 170 120"
          stroke="#8a93a6"
          strokeWidth="16"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
      </svg>

      {/* 텍스트 블록 */}
      <div className="flex flex-col justify-center leading-none">
        {/* K SELECT NETWORK 타이틀 */}
        <span className="font-sans text-[13px] font-black tracking-normal text-graphite sm:text-[15px] uppercase">
          K SELECT NETWORK
        </span>
        {/* 구분선 */}
        <div className="my-[3px] h-[1px] w-full bg-hairline" />
        {/* 서브텍스트 */}
        <span className="font-sans text-[6.5px] font-bold tracking-widest text-slate sm:text-[7.5px] uppercase">
          Curated. Connected. Growing Together.
        </span>
      </div>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`shell pt-[var(--section-top)] ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  label,
  children,
  headingClassName = "",
}: {
  label: string;
  children: ReactNode;
  headingClassName?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] border-b border-hairline pb-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
      <p className="micro-label text-slate">{label}</p>
      <h2
        className={`display-kr m-0 text-[clamp(30px,3.1vw,44px)] ${headingClassName}`}
      >
        {children}
      </h2>
    </div>
  );
}

const pillBase =
  "inline-flex items-center justify-center rounded-full text-[15px] font-semibold transition-[transform,background-color,border-color] duration-200 hover:-translate-y-px";

export const pillInk = `${pillBase} bg-ink px-[34px] py-[18px] text-ivory`;
export const pillAccent = `${pillBase} bg-accent px-[34px] py-[18px] text-white hover:bg-accent-ink`;
export const pillOutlineDark = `${pillBase} border border-hairline-dark px-[34px] py-[18px] text-ivory hover:border-ivory`;
export const pillInkCompact =
  "inline-flex items-center justify-center rounded-full bg-ink px-[18px] py-[14px] micro-label text-ivory whitespace-nowrap transition-transform duration-200 hover:-translate-y-px sm:px-[26px]";

export function StatValue({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-serif-kr tnum font-semibold tracking-[-0.04em] ${className}`}
    >
      {children}
    </span>
  );
}
