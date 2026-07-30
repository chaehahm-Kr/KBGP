// 수출바우처 계산기 검증 — 6등급 × 3매출구간 = 18개 조합.
// 실행: node --experimental-strip-types lib/voucher-calc.test.mjs
//   (또는 npx tsx lib/voucher-calc.test.mjs)
import { calculate, formatKRW } from "./voucher-calc.ts";

const REVENUES = [
  ["under100", "100억 미만", "70% (자기부담 30%)"],
  ["mid", "100~300억", "60% (자기부담 40%)"],
  ["over300", "300억 이상", "50% (자기부담 50%)"],
];

const CASES = [
  {
    tier: "domestic",
    innovative: false,
    grade: "내수기업",
    cap: "3,000만원",
    expect: [
      ["약 4,286만원", "약 1,286만원"],
      ["약 5,000만원", "약 2,000만원"],
      ["약 6,000만원", "약 3,000만원"],
    ],
  },
  {
    tier: "domestic",
    innovative: true,
    grade: "튼튼한 내수기업",
    cap: "4,500만원",
    expect: [
      ["약 6,429만원", "약 1,929만원"],
      ["약 7,500만원", "약 3,000만원"],
      ["약 9,000만원", "약 4,500만원"],
    ],
  },
  {
    tier: "beginner",
    innovative: false,
    grade: "수출초보",
    cap: "3,000만원",
    expect: [
      ["약 4,286만원", "약 1,286만원"],
      ["약 5,000만원", "약 2,000만원"],
      ["약 6,000만원", "약 3,000만원"],
    ],
  },
  {
    tier: "promising",
    innovative: false,
    grade: "수출유망",
    cap: "4,500만원",
    expect: [
      ["약 6,429만원", "약 1,929만원"],
      ["약 7,500만원", "약 3,000만원"],
      ["약 9,000만원", "약 4,500만원"],
    ],
  },
  {
    tier: "growth",
    innovative: false,
    grade: "수출성장",
    cap: "7,000만원",
    expect: [
      ["약 1억원", "약 3,000만원"],
      ["약 1억 1,667만원", "약 4,667만원"],
      ["약 1억 4,000만원", "약 7,000만원"],
    ],
  },
  {
    tier: "strong",
    innovative: false,
    grade: "수출강소",
    cap: "1억원",
    expect: [
      ["약 1억 4,286만원", "약 4,286만원"],
      ["약 1억 6,667만원", "약 6,667만원"],
      ["약 2억원", "약 1억원"],
    ],
  },
];

let pass = 0;
const fails = [];

for (const c of CASES) {
  REVENUES.forEach(([revKey, revLabel, rateLabel], i) => {
    const r = calculate(c.tier, revKey, c.innovative);
    const pct = Math.round(r.rate * 100);
    const got = {
      grade: r.grade,
      cap: formatKRW(r.cap, false),
      rate: `${pct}% (자기부담 ${100 - pct}%)`,
      total: formatKRW(r.total, true),
      own: formatKRW(r.own, true),
    };
    const want = {
      grade: c.grade,
      cap: c.cap,
      rate: rateLabel,
      total: c.expect[i][0],
      own: c.expect[i][1],
    };
    const bad = Object.keys(want).filter((k) => got[k] !== want[k]);
    const tag = `${c.grade} / ${revLabel}`;

    if (bad.length === 0) {
      pass++;
      console.log(`PASS  ${tag.padEnd(24)} 한도 ${got.cap.padEnd(11)} 총 ${got.total.padEnd(13)} 자부담 ${got.own}`);
    } else {
      fails.push(tag);
      console.log(`FAIL  ${tag}`);
      for (const k of bad) {
        console.log(`        ${k}: 기대 "${want[k]}" / 실제 "${got[k]}"`);
      }
    }
  });
}

// 혁신형 우대가 내수기업에만 적용되는지 확인
const ignored = calculate("growth", "under100", true);
if (ignored.grade === "수출성장" && ignored.cap === 70_000_000) {
  console.log("\nSPOT PASS  수출성장 + 혁신형 체크 → 혁신형 무시");
} else {
  fails.push("혁신형 무시");
  console.log("\nSPOT FAIL  수출성장 + 혁신형이 반영되어 버림", ignored);
}

console.log(`\n${pass}/18 조합 통과, 실패 ${fails.length}건`);
process.exit(fails.length === 0 ? 0 : 1);
