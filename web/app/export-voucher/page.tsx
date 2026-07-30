import type { Metadata } from "next";
import { VoucherCalculator } from "@/components/site/sections/voucher-calculator";
import { SiteHeader } from "@/components/site/nav/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section, SectionHeading, StatValue, pillInk } from "@/components/ui";
import { contact } from "@/lib/content";
import {
  cases,
  cumulativeBanner,
  excluded,
  gradeLimits,
  overseasBranch,
  qualified,
  schedule,
  scheduleNotice,
  services,
  strengths,
  subsidyRates,
  voucherAbout,
  voucherContacts,
  voucherHero,
  voucherProcess,
  type ScheduleState,
} from "@/lib/voucher-data";

export const metadata: Metadata = {
  title: "수출바우처 미국 아마존 진출 — K Select Network",
  description:
    "수출바우처 조사/일반컨설팅 · 홍보/광고 등록 수행기관. 미국 뉴저지 현역 아마존 셀러가 시장조사부터 아마존 입점 · 광고까지 수행합니다. 등급별 지원한도 계산기 제공.",
};

const pillClass: Record<ScheduleState, string> = {
  done: "border-hairline text-slate",
  closed: "border-hairline text-slate",
  now: "border-graphite text-graphite",
  open: "border-accent text-accent",
};

function StatePill({
  state,
  children,
}: {
  state: ScheduleState;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`micro-label inline-block rounded-full border px-3 py-1.5 whitespace-nowrap ${pillClass[state]}`}
    >
      {children}
    </span>
  );
}

function DefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 border-b border-hairline py-5 sm:grid-cols-[clamp(140px,22vw,240px)_minmax(0,1fr)] sm:gap-x-[clamp(20px,3vw,48px)]">
      <dt className="text-[15px] text-slate">{label}</dt>
      <dd className="body-kr m-0 text-[16px]">{value}</dd>
    </div>
  );
}

export default function ExportVoucherPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* 헤더 */}
        <section
          id="voucher"
          className="shell grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] pt-[clamp(56px,6vw,88px)] lg:grid-cols-2"
        >
          <div>
            <p className="micro-label flex items-center gap-2.5 text-slate">
              <span
                aria-hidden
                className="inline-block size-[5px] shrink-0 rounded-full bg-graphite"
              />
              {voucherHero.eyebrow}
            </p>

            <h1 className="display-kr mt-8 mb-0 text-[clamp(34px,3.9vw,54px)] tracking-[-0.045em]">
              미국 아마존 진출,
              <br />
              수출바우처로
              <br />
              시작하세요.
            </h1>

            <p className="body-kr mt-8 max-w-[620px] text-[19px] text-slate">
              {voucherHero.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#voucher-calculator" className={pillInk}>
                내 지원금 계산하기
              </a>
              <a
                href="#voucher-contact"
                className="px-2 py-[18px] text-[15px] font-semibold transition-colors hover:text-accent"
              >
                상담 문의하기 ↗
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-6">
              {voucherHero.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="m-0">
                    <StatValue className="block text-[30px] leading-none">
                      {stat.value}
                    </StatValue>
                  </dd>
                  <dt className="micro-label mt-2.5 text-slate">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-hairline bg-paper-raised p-[clamp(24px,3vw,36px)]">
            <p className="micro-label text-slate">Registered Credentials</p>
            <dl className="mt-5 border-t border-hairline">
              {voucherHero.credentials.map((c) => (
                <DefRow key={c.label} label={c.label} value={c.value} />
              ))}
            </dl>
          </div>
        </section>

        {/* 수출바우처란 */}
        <Section id="voucher-about">
          <SectionHeading label="About — Export Voucher">
            수출바우처 사업이란?
          </SectionHeading>
          <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
            <p className="body-kr text-[17px] text-slate">{voucherAbout.lead}</p>
            <div>
              <dl className="m-0 border-t border-hairline">
                {voucherAbout.rows.map((row) => (
                  <DefRow key={row.label} label={row.label} value={row.value} />
                ))}
              </dl>
              <p className="body-kr mt-5 text-sm text-slate">
                {voucherAbout.note}
              </p>
            </div>
          </div>
        </Section>

        {/* 계산기 */}
        <div className="mt-[var(--section-top)] border-y border-hairline bg-paper-raised">
          <section id="voucher-calculator" className="shell py-[var(--section-top)]">
            <SectionHeading label="Calculator — 2026">
              우리 회사는
              <br />
              얼마까지 받을 수 있나요?
            </SectionHeading>
            <VoucherCalculator />
          </section>
        </div>

        {/* 등급별 지원한도 */}
        <Section id="voucher-limits">
          <SectionHeading label="Limits — By Grade">
            등급별 국고 지원한도
          </SectionHeading>
          <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
            <p className="body-kr text-[17px] text-slate">
              국고 지원한도는 전년도 수출실적으로 정해지는 등급이 결정하고,
              국고보조율은 전년도 매출액이 결정합니다. 두 값이 만나 실제
              자기부담금이 나옵니다.
            </p>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <caption className="sr-only">
                    등급별 전년도 수출실적과 국고 지원한도
                  </caption>
                  <thead>
                    <tr>
                      <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                        등급
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                        전년도 수출실적
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-right text-slate">
                        국고 지원한도
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeLimits.map((row) => (
                      <tr key={row.grade}>
                        <th className="border-b border-hairline py-4 pr-5 text-left text-[15px] font-semibold">
                          {row.grade}
                        </th>
                        <td className="border-b border-hairline py-4 pr-5 text-[15px] text-slate">
                          {row.record}
                        </td>
                        <td className="border-b border-hairline py-4 text-right">
                          <StatValue className="text-lg">{row.cap}</StatValue>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <caption className="sr-only">
                    전년도 매출액별 국고보조율과 자기부담률
                  </caption>
                  <thead>
                    <tr>
                      <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                        전년도 매출액
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-right text-slate">
                        국고보조율
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-right text-slate">
                        자기부담률
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {subsidyRates.map((row) => (
                      <tr key={row.revenue}>
                        <th className="border-b border-hairline py-4 pr-5 text-left text-[15px] font-normal text-slate">
                          {row.revenue}
                        </th>
                        <td className="border-b border-hairline py-4 text-right">
                          <StatValue className="text-lg">{row.rate}</StatValue>
                        </td>
                        <td className="tnum border-b border-hairline py-4 text-right text-[15px] text-slate">
                          {row.own}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="body-kr mt-5 text-sm text-slate">
                벤처 · 이노비즈 · 메인비즈 등 혁신형 중소기업, 수출실적
                증가기업, 다수 국가 수출기업은 지원한도 우대로 기본 한도가
                상향될 수 있습니다.
              </p>
            </div>
          </div>
        </Section>

        {/* 신청 자격 / 제외 */}
        <Section id="voucher-eligibility">
          <SectionHeading label="Eligibility">
            신청 자격과 제외 대상
          </SectionHeading>
          <div className="grid grid-cols-1 gap-4 pt-12 md:grid-cols-2">
            <div className="rounded-xl border border-hairline bg-paper-raised p-10">
              <p className="micro-label text-slate">Qualified</p>
              <h3 className="display-kr mt-5 mb-0 text-2xl">
                신청할 수 있는 기업
              </h3>
              <ul className="m-0 mt-6 list-none border-t border-hairline p-0">
                {qualified.map((item) => (
                  <li
                    key={item}
                    className="body-kr border-b border-hairline py-5 text-[16px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-hairline p-10">
              <p className="micro-label text-slate">Excluded</p>
              <h3 className="display-kr mt-5 mb-0 text-2xl">
                신청할 수 없는 기업
              </h3>
              <ul className="m-0 mt-6 list-none border-t border-hairline p-0">
                {excluded.map((item) => (
                  <li
                    key={item}
                    className="body-kr border-b border-hairline py-5 text-[16px] text-slate"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* 일정 */}
        <Section id="voucher-schedule">
          <SectionHeading label="Schedule — 2026">
            2026 수출바우처 일정
          </SectionHeading>
          <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
            <p className="body-kr text-[17px] text-slate">
              2026년 정규 모집은 마감되었습니다. 지금은 이미 발급된 바우처를
              집행하는 기간이자, 2027년 신청을 준비할 시점입니다.
            </p>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left">
                  <caption className="sr-only">
                    2026년 수출바우처 사업 일정과 진행 상태
                  </caption>
                  <thead>
                    <tr>
                      <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                        구분
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                        일정
                      </th>
                      <th className="micro-label border-b border-hairline pb-3.5 text-right text-slate">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr key={row.phase}>
                        <th className="border-b border-hairline py-4 pr-5 text-left text-[15px] font-semibold">
                          {row.phase}
                        </th>
                        <td className="tnum border-b border-hairline py-4 pr-5 text-[15px] text-slate">
                          {row.when}
                        </td>
                        <td className="border-b border-hairline py-4 text-right">
                          <StatePill state={row.state}>
                            {row.stateLabel}
                          </StatePill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 border-l-4 border-warn bg-paper-raised px-7 py-6">
                <p className="body-kr m-0 text-[16px]">{scheduleNotice}</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 서비스 */}
        <Section id="voucher-services">
          <SectionHeading label="Services — 05">
            수출바우처로 제공하는
            <br />5개 서비스
          </SectionHeading>
          <div className="grid grid-cols-1 gap-[clamp(24px,4vw,64px)] pt-10 pb-2 md:grid-cols-[clamp(0px,22vw,320px)_minmax(0,1fr)]">
            <div aria-hidden />
            <p className="body-kr text-[17px] text-slate">
              조사에서 광고까지, 미국 아마존 진출의 전 단계를 한 팀이 이어서
              수행합니다.
            </p>
          </div>

          <dl className="m-0">
            {services.map((s, i) => (
              <div
                key={s.name}
                data-menu-code={s.menuCode}
                className="grid grid-cols-1 items-baseline gap-[clamp(20px,3.4vw,64px)] border-b border-hairline py-9 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-serif-latin text-[32px] text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="micro-label text-slate">{s.field}</span>
                </div>
                <dt className="display-kr text-[22px]">{s.name}</dt>
                <dd className="body-kr m-0 text-[17px] text-slate">
                  {s.desc}
                  <span className="mt-3 flex items-center gap-4">
                    {s.menuCode ? (
                      <span className="micro-label text-graphite">
                        #{s.menuCode}
                      </span>
                    ) : (
                      <span className="micro-label text-slate">
                        메뉴코드 준비중
                      </span>
                    )}
                    {s.portalUrl && (
                      <a
                        href={s.portalUrl}
                        className="text-[15px] font-semibold hover:text-accent"
                      >
                        포털에서 보기 ↗
                      </a>
                    )}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* 특장점 */}
        <Section id="voucher-why">
          <SectionHeading label="Why Letusto — 05">
            수행기관 특장점
          </SectionHeading>
          <ol className="m-0 list-none p-0">
            {strengths.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-1 items-baseline gap-[clamp(20px,3.4vw,64px)] border-b border-hairline py-7 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1.2fr)]"
              >
                <span className="font-serif-latin text-[28px] text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-kr m-0 text-[22px]">{s.title}</h3>
                <p className="body-kr text-[17px] text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 성과 */}
        <Section id="voucher-results">
          <SectionHeading label="Results">성과</SectionHeading>

          <div className="mt-12 rounded-xl bg-ink p-[clamp(32px,4vw,56px)] text-ivory">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12">
              <StatValue className="block text-[clamp(44px,5vw,60px)] leading-none text-ivory">
                {cumulativeBanner.value}
              </StatValue>
              <p className="body-kr m-0 text-[16px] text-dark-body">
                {cumulativeBanner.body}
              </p>
            </div>
            <p className="mt-8 border-t border-hairline-dark pt-5 text-xs text-dark-label">
              {cumulativeBanner.note}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4 lg:grid-cols-2">
            {cases.map((c) => (
              <article
                key={c.name}
                className="rounded-xl border border-hairline p-[clamp(28px,3vw,40px)]"
              >
                <h3 className="display-kr m-0 text-2xl">{c.name}</h3>
                <p className="tnum mt-2 text-sm text-slate">{c.meta}</p>
                <p className="body-kr mt-5 text-[16px] text-slate">{c.lead}</p>

                <dl className="mt-7 grid grid-cols-1 gap-5 border-t border-hairline pt-7 sm:grid-cols-3">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="m-0">
                        <StatValue className="block text-[28px] leading-none">
                          {m.value}
                        </StatValue>
                      </dd>
                      <dt className="body-kr mt-2.5 text-[13px] text-slate">
                        {m.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                {c.chart && (
                  <figure className="mx-0 mt-7 border-t border-hairline pt-7">
                    <figcaption className="micro-label text-slate">
                      {c.chart.caption}
                    </figcaption>
                    <div className="mt-5 flex h-[170px] items-end gap-8">
                      {c.chart.bars.map((bar) => {
                        const max = Math.max(
                          ...c.chart!.bars.map((b) => b.value),
                        );
                        return (
                          <div
                            key={bar.display}
                            className="flex h-full flex-1 flex-col justify-end"
                          >
                            <p
                              className={`tnum mb-2.5 text-[15px] font-semibold ${
                                bar.active ? "text-graphite" : "text-slate"
                              }`}
                            >
                              {bar.display}
                            </p>
                            <div
                              className={`w-full max-w-[88px] ${
                                bar.active ? "bg-accent" : "bg-hairline"
                              }`}
                              style={{
                                height: `${(bar.value / max) * 100}%`,
                              }}
                            />
                            <p className="tnum mt-3 text-[13px] whitespace-pre-line text-slate">
                              {bar.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </figure>
                )}

                <p className="body-kr mt-7 text-[16px] text-slate">{c.close}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* 절차 */}
        <Section id="voucher-process">
          <SectionHeading label="Process — 05">
            신청부터 서비스 착수까지
          </SectionHeading>
          <ol className="m-0 list-none p-0">
            {voucherProcess.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-1 items-baseline gap-[clamp(20px,3.4vw,64px)] border-b border-hairline py-7 lg:grid-cols-[clamp(0px,20vw,320px)_minmax(0,1fr)_minmax(0,1.2fr)]"
              >
                <span className="font-serif-latin text-[28px] text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display-kr m-0 text-[22px]">{step.title}</h3>
                <div className="body-kr text-[17px] text-slate">
                  <p className="m-0">{step.body}</p>
                  {step.keyword && (
                    <span className="mt-4 inline-block border border-hairline border-l-[3px] border-l-accent bg-paper-raised px-5 py-3.5">
                      <span className="micro-label block text-slate">
                        Search Keyword
                      </span>
                      <span className="mt-1.5 block font-mono text-[16px] font-semibold text-graphite select-all">
                        {step.keyword}
                      </span>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 해외지사화 */}
        <Section id="voucher-branch">
          <div className="rounded-xl border border-hairline bg-paper-raised p-[clamp(28px,3.4vw,48px)]">
            <p className="micro-label text-slate">
              Also Available — 해외지사화사업
            </p>
            <h2 className="display-kr mt-5 mb-0 text-[clamp(24px,2.6vw,34px)]">
              수출바우처만이 아닙니다 —
              <br />
              해외지사화도 Letusto와
            </h2>
            <p className="body-kr mt-5 max-w-[820px] text-[16px] text-slate">
              {overseasBranch.lead}
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <caption className="sr-only">
                  해외지사화사업 단계별 지원내용과 기업부담금
                </caption>
                <thead>
                  <tr>
                    <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                      단계
                    </th>
                    <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                      기간
                    </th>
                    <th className="micro-label border-b border-hairline pb-3.5 text-slate">
                      주요 지원
                    </th>
                    <th className="micro-label border-b border-hairline pb-3.5 text-right text-slate">
                      기업부담금
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {overseasBranch.stages.map((s) => (
                    <tr key={s.stage}>
                      <th className="border-b border-hairline py-4 pr-5 text-left text-[15px] font-semibold">
                        {s.stage}
                      </th>
                      <td className="tnum border-b border-hairline py-4 pr-5 text-[15px] whitespace-nowrap text-slate">
                        {s.period}
                      </td>
                      <td className="body-kr border-b border-hairline py-4 pr-5 text-[15px] text-slate">
                        {s.support}
                      </td>
                      <td className="border-b border-hairline py-4 text-right whitespace-nowrap">
                        <StatValue className="text-lg">{s.cost}</StatValue>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="m-0 mt-6 list-none p-0">
              {overseasBranch.footnotes.map((f) => (
                <li key={f} className="body-kr mt-1.5 text-[13px] text-slate">
                  {f}
                </li>
              ))}
            </ul>

            <a href="#voucher-contact" className={`${pillInk} mt-8`}>
              해외지사화 상담하기
            </a>
          </div>
        </Section>

        {/* CTA */}
        <section id="voucher-contact" className="mt-36 bg-ink text-ivory">
          <div className="shell py-[clamp(72px,9vw,128px)]">
            <div className="grid grid-cols-1 items-end gap-[clamp(28px,4vw,64px)] lg:grid-cols-2">
              <div>
                <p className="micro-label mb-8 text-dark-label">
                  Contact — 수출바우처 · 해외지사화
                </p>
                <h2 className="display-kr m-0 text-[clamp(34px,3.9vw,56px)] tracking-[-0.045em]">
                  어떤 메뉴를
                  <br />
                  어떻게 조합할지
                  <br />
                  모르시겠다면
                </h2>
              </div>
              <div>
                <p className="body-kr mt-0 mb-8 text-[17px] text-dark-body">
                  제품 하나만 알려주셔도 됩니다. 미국에서 같은 카테고리를 실제로
                  팔아 본 사람이 시장성부터 봐 드립니다. 영업일 1일 내
                  회신합니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`mailto:${contact.email}?subject=${encodeURIComponent("수출바우처 상담 요청")}`}
                    className="inline-flex items-center justify-center rounded-full bg-accent px-[34px] py-[18px] text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-accent-ink"
                  >
                    이메일로 상담 요청
                  </a>
                  <a
                    href="#voucher-calculator"
                    className="inline-flex items-center justify-center rounded-full border border-hairline-dark px-[34px] py-[18px] text-[15px] font-semibold text-ivory transition-[transform,border-color] duration-200 hover:-translate-y-px hover:border-ivory"
                  >
                    내 지원금 다시 계산하기
                  </a>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {voucherContacts.map((person) => (
                    <div
                      key={person.email}
                      className="rounded-xl border border-hairline-dark px-6 py-5"
                    >
                      <p className="m-0 font-semibold">{person.name}</p>
                      <p className="tnum m-0 mt-2.5 text-sm leading-loose text-dark-body">
                        <a
                          href={`mailto:${person.email}`}
                          className="hover:text-ivory"
                        >
                          {person.email}
                        </a>
                        {person.phone && (
                          <>
                            <br />
                            {person.phone}
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
