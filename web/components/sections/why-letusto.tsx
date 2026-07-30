import { companyFacts } from "@/lib/content";
import { Section, SectionHeading, StatValue } from "../ui";

function NetworkMap() {
  return (
    <svg
      viewBox="0 0 420 210"
      role="img"
      aria-label="미국 동부 NJ · NY · PA 운영 거점 3곳과 확장 예정 상권 3곳을 표시한 네트워크 도식"
      className="block h-auto w-full"
    >
      <g stroke="var(--hairline)" strokeWidth="1">
        <line x1="0" y1="45" x2="420" y2="45" />
        <line x1="0" y1="95" x2="420" y2="95" />
        <line x1="0" y1="145" x2="420" y2="145" />
        <line x1="90" y1="0" x2="90" y2="210" />
        <line x1="190" y1="0" x2="190" y2="210" />
        <line x1="290" y1="0" x2="290" y2="210" />
        <line x1="380" y1="0" x2="380" y2="210" />
      </g>
      <circle cx="352" cy="70" r="5" fill="var(--accent)" />
      <circle cx="338" cy="92" r="5" fill="var(--accent)" />
      <circle cx="362" cy="112" r="5" fill="var(--accent)" />
      <g fill="none" stroke="var(--slate)" strokeWidth="1.5">
        <circle cx="126" cy="92" r="6" />
        <circle cx="232" cy="134" r="6" />
        <circle cx="296" cy="158" r="6" />
      </g>
      <text
        x="318"
        y="50"
        fill="var(--graphite)"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        NJ · NY · PA
      </text>
      <text
        x="100"
        y="78"
        fill="var(--slate)"
        fontSize="11"
        fontFamily="var(--font-sans)"
      >
        PLANNED
      </text>
    </svg>
  );
}

export function WhyLetusto() {
  return (
    <Section id="letusto">
      <SectionHeading label="Why Letusto" headingClassName="max-w-[780px]">
        리서치·컨설팅 회사가 아니라,
        <br />
        미국에서 매장을 운영하는 사업자입니다.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-[clamp(20px,3.4vw,64px)] pt-12 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1fr)]">
        <p className="micro-label text-slate">Network</p>
        <div>
          <NetworkMap />
          <p className="body-kr mt-5 text-[15px] text-slate">
            동부 3개 주에서 오프라인 매장을 직접 운영하며, 확장 예정 상권은 링으로
            표기했습니다. 온라인은 Amazon 채널을 병행합니다.
          </p>
        </div>
        <dl className="border-t border-hairline">
          {companyFacts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex items-baseline justify-between py-5 ${
                i < companyFacts.length - 1 ? "border-b border-hairline" : ""
              }`}
            >
              <dt className="text-[15px] text-slate">{fact.label}</dt>
              <dd className="m-0">
                <StatValue className="text-[22px]">{fact.value}</StatValue>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
