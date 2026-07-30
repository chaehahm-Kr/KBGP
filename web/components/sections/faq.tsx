import { faqs } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading label="FAQ">자주 묻는 질문</SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-2 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
        <div aria-hidden />
        <div>
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              className={
                index < faqs.length - 1 ? "border-b border-hairline" : ""
              }
            >
              <summary className="flex items-center justify-between gap-6 py-7">
                <span className="display-kr text-[22px]">{faq.q}</span>
                <span aria-hidden className="plus text-xl text-slate">
                  +
                </span>
              </summary>
              <p className="body-kr mt-0 mb-7 max-w-[720px] text-[17px] text-slate">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
