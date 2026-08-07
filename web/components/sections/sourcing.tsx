import { CategoryMixDonut } from "@/components/site/sections/category-mix-donut";
import { Section, SectionHeading } from "../ui";

export function Sourcing() {
  return (
    <Section>
      <SectionHeading label="Sourcing — Category Mix">
        KBGP 소싱 포트폴리오
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        <p className="body-kr text-[17px] text-slate">
          2025년 미국 K-Beauty 시장 $27.6B, 대미 수출 $2.2B, 글로벌 점유율
          23.4%. 스킨케어가 시장의 68.7%를 차지합니다. CAGR 9.5% (2026–2033).
        </p>
        <CategoryMixDonut />
      </div>
    </Section>
  );
}
