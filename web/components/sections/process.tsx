import { processSteps } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading label={`Process — 0${processSteps.length}`}>
        신청부터 본 파트너십까지
      </SectionHeading>

      <ol className="m-0 list-none p-0">
        {processSteps.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-1 items-baseline gap-[clamp(20px,3.4vw,64px)] border-b border-hairline py-7 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1.2fr)]"
          >
            <span className="font-serif-latin text-[28px] text-slate">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="display-kr m-0 text-[22px]">{step.title}</h3>
            <p className="body-kr text-[17px] text-slate">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
