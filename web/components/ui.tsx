import type { ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif-kr text-[18px] tracking-[-0.04em] whitespace-nowrap sm:text-[20px] ${className}`}
    >
      <span className="font-bold">K Select</span>{" "}
      <span className="font-normal">Network</span>
    </span>
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
