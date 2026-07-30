import { phases } from "@/lib/content";
import { Section, SectionHeading } from "../ui";

export function Program() {
  return (
    <Section id="program">
      <SectionHeading label="Program — Two Phases">
        먼저 300개로 검증하고,
        <br />그 결과 위에서 확대합니다.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-4 pt-12 md:grid-cols-2">
        {phases.map((phase, index) => (
          <article
            key={phase.phase}
            className={`rounded-xl border border-hairline p-10 ${
              index === 0 ? "bg-paper-raised" : ""
            }`}
          >
            <div className="flex items-baseline justify-between">
              <p className="micro-label text-slate">{phase.phase}</p>
              <p className="font-serif-latin text-[28px] text-slate uppercase">
                {phase.latin}
              </p>
            </div>
            <h3 className="display-kr mt-6 mb-0 text-[28px] leading-[1.3]">
              {phase.title}
            </h3>
            <p className="body-kr mt-3 text-[17px] text-slate">{phase.body}</p>
            <dl className="mt-7 border-t border-hairline">
              {phase.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex justify-between gap-6 py-3.5 text-[15px] ${
                    i < phase.rows.length - 1 ? "border-b border-hairline" : ""
                  }`}
                >
                  <dt className="text-slate">{row.label}</dt>
                  <dd
                    className={`m-0 text-right font-semibold ${
                      row.numeric ? "tnum" : ""
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}
