import { categories } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

export function Sourcing() {
  return (
    <Section>
      <SectionHeading label="Sourcing — Category Mix">
        지금 찾고 있는 카테고리
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        <p className="body-kr text-[17px] text-slate">
          2025년 미국 K-Beauty 시장 $27.6B, 대미 수출 $2.2B, 글로벌 점유율
          23.4%. 스킨케어가 시장의 68.7%를 차지합니다. CAGR 9.5% (2026–2033).
        </p>
        <dl className="m-0">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-wrap items-center gap-x-[clamp(16px,2.4vw,32px)] gap-y-3.5 border-b border-hairline py-5"
            >
              <dt
                className={`body-kr order-1 text-[17px] sm:w-[clamp(120px,18vw,240px)] ${
                  category.active ? "font-semibold" : ""
                }`}
              >
                {category.label}
              </dt>
              <dd
                className={`tnum order-2 ml-auto w-14 text-right text-[17px] sm:order-3 sm:ml-0 ${
                  category.active ? "font-semibold" : "text-slate"
                }`}
              >
                {category.share}%
              </dd>
              <div
                aria-hidden
                className="order-3 h-2.5 w-full bg-hairline sm:order-2 sm:w-auto sm:flex-1"
              >
                <div
                  className={`h-2.5 ${
                    category.active ? "bg-accent" : "bg-slate/40"
                  }`}
                  style={{ width: `${category.share}%` }}
                />
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
