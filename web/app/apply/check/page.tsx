import type { Metadata } from "next";
import Link from "next/link";
import { EligibilityFocus } from "@/components/eligibility-check";
import { Wordmark } from "@/components/ui";

export const metadata: Metadata = {
  title: "프로그램 참여를 위한 준비 조건 확인 — K Select Network",
  description:
    "K-Beauty Growth Program 참여를 위한 준비 조건을 확인하고 신청서 접수로 이어집니다.",
};

export default function ApplyCheckPage() {
  return (
    <>
      <header className="border-b border-hairline">
        <div className="shell flex h-[var(--nav-height)] items-center justify-between gap-4">
          <Link href="/">
            <Wordmark />
          </Link>
          <Link
            href="/"
            className="micro-label text-slate transition-colors hover:text-accent"
          >
            나가기 ✕
          </Link>
        </div>
      </header>

      <main className="shell pt-[clamp(48px,7vw,96px)] pb-16">
        <div className="mx-auto w-full max-w-[880px]">
          <p className="micro-label text-slate">Eligibility — Self Check</p>
          <h1 className="display-kr mt-8 mb-0 text-[clamp(30px,3.4vw,44px)]">
            프로그램 참여를 위한 준비 조건을 확인하세요.
          </h1>
          <p className="body-kr mt-6 mb-12 text-[17px] leading-relaxed text-slate">
            6가지 항목은 미국 시장 진출과 원활한 프로그램 운영을 위해 필요한 기본 준비 사항입니다. 모든 조건을 충족하지 않더라도, 준비 상황에 따라 별도 미팅을 통해 참여 가능성을 함께 검토할 수 있습니다.
          </p>
          <EligibilityFocus />
        </div>
      </main>
    </>
  );
}
