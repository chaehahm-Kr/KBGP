import { EligibilitySection } from "@/components/eligibility-check";
import { ApplyCta } from "@/components/sections/apply-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Policy } from "@/components/sections/policy";
import { Process } from "@/components/sections/process";
import { Program } from "@/components/sections/program";
import { Sourcing } from "@/components/sections/sourcing";
import { WhyLetusto } from "@/components/sections/why-letusto";
import { BenefitsSection } from "@/components/site/sections/benefits-section";
import { SiteHeader } from "@/components/site/nav/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section, SectionHeading } from "@/components/ui";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WhyLetusto />
        <Program />
        <Policy />
        <BenefitsSection />
        <Process />
        <Sourcing />
        <Section id="eligibility">
          <SectionHeading label="Eligibility — Self Check">
            프로그램 참여를 위한 준비 사항을 확인해 주세요.
          </SectionHeading>
          <EligibilitySection />
        </Section>
        <Faq />
        <ApplyCta />
      </main>
      <SiteFooter />
    </>
  );
}
