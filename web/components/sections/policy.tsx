import { policies } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

export function Policy() {
  return (
    <Section id="policy">
      <SectionHeading label={`Policy — 0${policies.length}`}>
        두려움에는 정책으로 답합니다.
      </SectionHeading>

      <dl className="m-0">
        {policies.map((item, index) => (
          <div
            key={item.policy}
            className="grid grid-cols-1 items-baseline gap-[clamp(20px,3.4vw,64px)] border-b border-hairline py-9 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1fr)]"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-serif-latin text-[32px] text-slate">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="body-kr text-[15px] text-slate">{item.fear}</p>
            </div>
            <dt className="display-kr text-[26px] leading-[1.3]">
              {item.policy}
            </dt>
            <dd className="body-kr m-0 text-[17px] text-slate">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
