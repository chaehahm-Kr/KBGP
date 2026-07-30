import Link from "next/link";
import { heroStats } from "@/lib/content";
import { StatValue, pillInk } from "../ui";

function ImageSlot({
  ratio,
  caption,
  padding,
}: {
  ratio: string;
  caption: string;
  padding: string;
}) {
  return (
    <div
      className={`image-slot flex items-end rounded-xl border border-hairline ${ratio} ${padding}`}
    >
      <p className="font-mono text-xs whitespace-pre-line text-slate">
        {caption}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section className="shell grid grid-cols-1 items-start gap-[clamp(28px,4vw,64px)] pt-[clamp(64px,8vw,112px)] lg:grid-cols-2">
      <div>
        <p className="micro-label flex items-center gap-2.5 text-slate">
          <span
            aria-hidden
            className="inline-block size-[5px] rounded-full bg-graphite"
          />
          K-Beauty Growth Program — Operated by Letusto Inc.
        </p>

        <h1 className="display-kr mt-10 mb-0 text-[clamp(40px,4.6vw,66px)] tracking-[-0.045em]">
          낯설고 두려운
          <br />
          미국 진출이 아니라,
          <br />
          검증된 파트너와
          <br />
          함께 시작하는
          <br />
          <span className="font-serif-latin font-normal tracking-[-0.01em] text-slate italic">
            Growth
          </span>
          입니다.
        </h1>

        <p className="body-kr mt-11 max-w-[520px] text-xl text-slate">
          브랜드는 상품에, Letusto는 미국 현지 운영에 — 역할을 나누어 함께
          성장합니다. 2004년부터 미국에서 매장과 온라인 채널을 직접 운영해 온
          사업자가 입점을 집행합니다.
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-3">
          <Link href="/apply/check" className={pillInk}>
            파트너 신청하기
          </Link>
          <a
            href="#program"
            className="px-2 py-[18px] text-[15px] font-semibold transition-colors hover:text-accent"
          >
            프로그램 살펴보기 ↗
          </a>
        </div>

        <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-hairline pt-6">
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dd className="m-0">
                <StatValue className="block text-[32px] leading-none">
                  {stat.value}
                </StatValue>
              </dd>
              <dt className="micro-label mt-2.5 text-slate">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-4">
        <ImageSlot
          ratio="aspect-4/3"
          padding="p-6"
          caption="[ IMAGE ] Beauty Supply 매장 외관"
        />
        <div className="grid grid-cols-2 gap-4">
          <ImageSlot
            ratio="aspect-square"
            padding="p-5"
            caption={"[ IMAGE ]\nStore-in-a-Store"}
          />
          <div className="flex aspect-square flex-col justify-between rounded-xl border border-hairline bg-paper-raised p-6">
            <p className="micro-label text-slate">Since 2004</p>
            <div>
              <StatValue className="block text-[40px] leading-none">
                $250M+
              </StatValue>
              <p className="body-kr mt-3 text-sm text-slate">
                누적 판매 · 운영 브랜드 10+ · 거점 3개국
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
