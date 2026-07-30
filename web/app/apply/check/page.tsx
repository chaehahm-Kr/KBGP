import type { Metadata } from "next";
import Link from "next/link";
import { EligibilityFocus } from "@/components/eligibility-check";
import { Wordmark } from "@/components/ui";

export const metadata: Metadata = {
  title: "참여 자격 자가진단 — K Select Network",
  description:
    "K-Beauty Growth Program 참여 자격 6개 조건을 확인하고 신청 절차로 이어집니다.",
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
            6개 조건을 확인하십시오.
          </h1>
          <p className="body-kr mt-6 mb-12 text-[17px] text-slate">
            해당하는 항목을 눌러 표시하십시오. 모두 충족하면 담당자 검토 단계로
            이어지고, 일부만 충족하는 경우에도 미팅에서 준비 방법을 함께
            정리합니다.
          </p>
          <EligibilityFocus />
        </div>
      </main>
    </>
  );
}
