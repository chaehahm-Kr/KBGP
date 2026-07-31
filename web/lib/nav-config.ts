/**
 * 내비게이션 구조를 데이터로 분리한다. 영문 토글을 붙일 때 이 파일의 문구만
 * 교체하면 되도록 JSX에 라벨을 하드코딩하지 않는다.
 */

export type NavLeaf = {
  /** 대문자 라틴 마이크로 라벨. 한글에 0.18em 자간을 주면 흩어지므로 라틴만 쓴다. */
  label: string;
  href: string;
  /** 드롭다운에 라벨과 함께 두 줄로 표시되는 보조 설명 */
  subtext?: string;
};

export type NavGroup = {
  label: string;
  /** 드롭다운 패널의 id — 트리거의 aria-controls가 이 값을 가리킨다. */
  id: string;
  items: NavLeaf[];
};

export type NavEntry = NavLeaf | NavGroup;

export const isGroup = (entry: NavEntry): entry is NavGroup =>
  "items" in entry;

export const isLeaf = (entry: NavEntry): entry is NavLeaf =>
  !("items" in entry);

export const kbgProgramGroup: NavGroup = {
  label: "KBG Program",
  id: "kbg-program-menu",
  items: [
    {
      label: "About",
      href: "/#program-two-phases",
      subtext: "먼저 300개로 검증하고, 그 결과 위에서 확대합니다.",
    },
    {
      label: "Policy",
      href: "/#policy",
      subtext: "상권 보호 · First Order Protection",
    },
    {
      label: "Benefits",
      href: "/#benefits",
      subtext: "중소 브랜드가 실제로 얻는 것",
    },
    {
      label: "Process",
      href: "/#process",
      subtext: "테스트 파트너십 → 본 파트너십",
    },
    {
      label: "Eligibility",
      href: "/#eligibility",
      subtext: "참여 조건 6가지 · 자가진단",
    },
  ],
};

/** 최상단 메뉴: 그룹 1개 + 단일 항목 3개. */
export const primaryNav: NavEntry[] = [
  kbgProgramGroup,
  { label: "Letusto", href: "/#letusto" },
  { label: "FAQ", href: "/#faq" },
  { label: "Export Voucher", href: "/export-voucher" },
];

export const primaryCta = { label: "파트너쉽 신청하기", href: "/#eligibility" };

/** 스크롤 위치에 따라 활성 표시할 섹션 id 목록 (드롭다운 항목 순서와 일치). */
export const observedSectionIds = kbgProgramGroup.items
  .map((item) => item.href.split("#")[1])
  .filter((id): id is string => Boolean(id));

export const footerNav = {
  program: {
    label: "Program",
    items: [
      { label: "프로그램 개요", href: "/#program-two-phases" },
      { label: "정책", href: "/#policy" },
      { label: "혜택", href: "/#benefits" },
      { label: "절차", href: "/#process" },
    ],
  },
  apply: {
    label: "Apply",
    items: [
      { label: "참여 자격", href: "/#eligibility" },
      { label: "자가진단 · 신청", href: "/#eligibility" },
    ],
  },
  gov: {
    label: "정부지원사업",
    items: [
      { label: "수출바우처", href: "/export-voucher" },
      { label: "지원금 계산기", href: "/export-voucher#voucher-calculator" },
      { label: "해외지사화", href: "/export-voucher#voucher-branch" },
    ],
  },
};
