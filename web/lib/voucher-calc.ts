/**
 * 수출바우처 지원금 계산. 2026년 중소벤처기업부 소관 공고 기준.
 * 18개 조합(6등급 × 3매출구간)은 lib/voucher-calc.test.mjs 로 검증한다.
 */

export type ExportTier =
  | "domestic"
  | "beginner"
  | "promising"
  | "growth"
  | "strong";

export type RevenueTier = "under100" | "mid" | "over300";

const RATES: Record<RevenueTier, number> = {
  under100: 0.7,
  mid: 0.6,
  over300: 0.5,
};

export function gradeAndCap(tier: ExportTier, innovative: boolean) {
  if (tier === "domestic") {
    return innovative
      ? { grade: "튼튼한 내수기업", cap: 45_000_000 }
      : { grade: "내수기업", cap: 30_000_000 };
  }
  if (tier === "beginner") return { grade: "수출초보", cap: 30_000_000 };
  if (tier === "promising") return { grade: "수출유망", cap: 45_000_000 };
  if (tier === "growth") return { grade: "수출성장", cap: 70_000_000 };
  return { grade: "수출강소", cap: 100_000_000 };
}

const comma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 원 단위 금액을 만원 단위로 반올림해 표기한다.
 * 만원 자리가 0인 억 단위는 "2억원"처럼 만원 표기를 생략한다.
 */
export function formatKRW(won: number, approx: boolean) {
  const man = Math.round(won / 10_000);
  let out: string;

  if (man < 10_000) {
    out = `${comma(man)}만원`;
  } else {
    const eok = Math.floor(man / 10_000);
    const rem = man % 10_000;
    out = rem === 0 ? `${eok}억원` : `${eok}억 ${comma(rem)}만원`;
  }

  return approx ? `약 ${out}` : out;
}

export function calculate(
  tier: ExportTier,
  revenue: RevenueTier,
  innovative: boolean,
) {
  // 혁신형 우대는 내수기업 등급에만 적용된다.
  const { grade, cap } = gradeAndCap(tier, tier === "domestic" && innovative);
  const rate = RATES[revenue];
  const total = Math.round(cap / rate);
  return { grade, cap, rate, total, own: total - cap };
}

export const exportTierOptions: { value: ExportTier; label: string }[] = [
  { value: "domestic", label: "1,000불 미만" },
  { value: "beginner", label: "1,000불 ~ 10만불 미만" },
  { value: "promising", label: "10만불 ~ 100만불 미만" },
  { value: "growth", label: "100만불 ~ 500만불 미만" },
  { value: "strong", label: "500만불 이상" },
];

export const revenueOptions: { value: RevenueTier; label: string }[] = [
  { value: "under100", label: "100억원 미만" },
  { value: "mid", label: "100억원 ~ 300억원 미만" },
  { value: "over300", label: "300억원 이상" },
];
