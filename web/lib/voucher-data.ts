/**
 * 수출바우처 페이지 데이터. 2026년 중소벤처기업부 소관 수출바우처 공고 기준.
 * 문구와 수치는 확정본이므로 창작하지 않는다.
 */

export const voucherHero = {
  eyebrow:
    "정부지원사업 — 수출바우처 · 중소벤처기업진흥공단 지정 해외민간네트워크 수행기관",
  lead: "Letusto는 미국 뉴저지에 법인과 창고를 둔 현역 아마존 셀러입니다. 컨설팅 회사가 아니라, 지금도 자사 계정으로 재고를 사서 파는 회사가 한국 제품을 미국 시장의 브랜드로 키웁니다.",
  stats: [
    { value: "230만 달러", label: "Cumulative Export" },
    { value: "12개 기업", label: "Companies Supported" },
    { value: "10개 이상", label: "Brands Operated" },
  ],
  credentials: [
    { label: "수출바우처 등록분야", value: "조사/일반 컨설팅 · 홍보/광고" },
    { label: "중진공 지정", value: "해외민간네트워크 수행기관 A등급" },
    { label: "현지 인프라", value: "미국 현지법인 · 45,000 sq ft 창고 직영" },
  ],
};

export const voucherAbout = {
  lead: "정부가 중소·중견 수출기업에 해외마케팅 비용을 바우처(가상 쿠폰) 형태로 지원하는 사업입니다. 기업이 자기부담금만 납부하면 정부지원금이 더해진 총액이 바우처로 발급되고, 기업은 15개 분야 약 7,500개 서비스 중에서 필요한 것을 골라 수행기관과 직접 계약합니다.",
  rows: [
    {
      label: "신청 방법",
      value: "exportvoucher.com 에서 참여기업 모집공고 확인 후 신청",
    },
    {
      label: "운영 방식",
      value:
        "자기부담금 납부 → 바우처 발급 → 수행기관(Letusto) 선택 → 서비스 이용 → 수행기관이 정부에 정산 청구",
    },
    {
      label: "관리 · 운영",
      value: "산업통상자원부(KOTRA) + 중소벤처기업부(중소벤처기업진흥공단)",
    },
    { label: "복수 사용", value: "15개 분야에서 여러 수행기관을 조합해 사용 가능" },
    {
      label: "신청 자격",
      value: "중소기업 또는 중견기업 (수출실적 없는 내수기업도 신청 가능)",
    },
    {
      label: "Letusto 등록분야",
      value: "조사/일반 컨설팅, 홍보/광고 — 두 분야 동시 등록",
    },
  ],
  note: "연중 한 번 수출바우처사업에 선정되면 다른 사업유형으로는 중복 신청할 수 없습니다.",
};

export const gradeLimits = [
  { grade: "내수기업", record: "1,000불 미만", cap: "3,000만원" },
  { grade: "튼튼한 내수기업", record: "내수단계 혁신형 중소기업", cap: "4,500만원" },
  { grade: "수출초보", record: "1,000불 ~ 10만불 미만", cap: "3,000만원" },
  { grade: "수출유망", record: "10만불 ~ 100만불 미만", cap: "4,500만원" },
  { grade: "수출성장", record: "100만불 ~ 500만불 미만", cap: "7,000만원" },
  { grade: "수출강소", record: "500만불 이상", cap: "1억원" },
];

export const subsidyRates = [
  { revenue: "100억원 미만", rate: "70%", own: "30%" },
  { revenue: "100억원 ~ 300억원 미만", rate: "60%", own: "40%" },
  { revenue: "300억원 이상", rate: "50%", own: "50%" },
];

export const qualified = [
  "중소기업기본법상 중소기업",
  "중견기업 성장촉진법상 중견기업 (산업부 트랙)",
  "수출실적이 전혀 없는 내수기업 (내수기업 등급으로 신청)",
  "국세 · 지방세 체납이 없는 기업",
  "휴 · 폐업 상태가 아닌 기업",
];

export const excluded = [
  "휴업 · 폐업 상태",
  "국세 · 지방세 체납 중",
  "보조금 관리법 위반 이력",
  "최근 정부 지원금 부정수급 이력",
  "채무불이행 또는 신용회복 진행 중",
  "같은 연도에 이미 다른 수출바우처 사업유형에 선정",
];

export type ScheduleState = "done" | "closed" | "now" | "open";

export const schedule: {
  phase: string;
  when: string;
  state: ScheduleState;
  stateLabel: string;
}[] = [
  { phase: "사업 공고", when: "2025년 12월", state: "done", stateLabel: "완료" },
  {
    phase: "1차 신청",
    when: "2025.12.17 ~ 2026.01.09 17:00",
    state: "closed",
    stateLabel: "마감",
  },
  {
    phase: "2차 신청 (중기부)",
    when: "2026.04.17 ~ 2026.05.06 17:00",
    state: "closed",
    stateLabel: "마감",
  },
  {
    phase: "바우처 사용기간",
    when: "2026.02.01 ~ 2026.11.30",
    state: "now",
    stateLabel: "진행 중",
  },
  {
    phase: "2027년 1차 모집",
    when: "2026년 12월 예정",
    state: "open",
    stateLabel: "사전 상담 접수 중",
  },
];

export const scheduleNotice =
  "2026년 정규 모집은 마감되었습니다. 이미 바우처를 보유한 기업은 2026년 11월 30일까지 Letusto 서비스를 집행할 수 있고, 2027년 신청을 준비하는 기업은 지금 사전 상담으로 미국 진출 로드맵부터 설계하는 것이 유리합니다.";

/** 메뉴코드와 포털 링크가 확정되면 이 배열만 수정한다. */
export const services = [
  {
    name: "맞춤형 미국 시장조사",
    field: "조사/일반 컨설팅",
    desc: "미국 시장 규모와 경쟁 제품, 가격대, 규제 · 인증 요건을 조사해 진출 시사점까지 담은 조사 보고서 제공",
    menuCode: "",
    portalUrl: "",
  },
  {
    name: "미국 진출전략 컨설팅 (Amazon 입점 전략)",
    field: "조사/일반 컨설팅",
    desc: "Amazon 입점 로드맵, 가격 · 물류 · 재고 설계, 6개월 실행 계획서 수립",
    menuCode: "",
    portalUrl: "",
  },
  {
    name: "아마존 입점 및 운영 마케팅",
    field: "홍보/광고",
    desc: "셀러 계정 개설 · 브랜드 등록 · 상품 등록과 최대 6개월 운영, 월간 실적 보고",
    menuCode: "",
    portalUrl: "",
  },
  {
    name: "아마존 스폰서 광고 운영 (SP/SB/SD)",
    field: "홍보/광고",
    desc: "키워드 조사, 캠페인 설계 · 집행, 주간 최적화와 월간 성과 보고",
    menuCode: "",
    portalUrl: "",
  },
  {
    name: "아마존 리스팅 콘텐츠 · 영상 제작",
    field: "홍보/광고",
    desc: "검색어 조사 기반 리스팅 카피, 갤러리 이미지, A+ 콘텐츠, 제품 영상 제작",
    menuCode: "",
    portalUrl: "",
  },
];

export const strengths = [
  {
    title: "대행이 아니라 판매입니다.",
    body: "남의 계정을 관리하는 것이 아니라 재고를 사서 저희 계정에서 팝니다. 2025년 자사 브랜드 판매액 421만 달러.",
  },
  {
    title: "판단 근거가 남의 데이터가 아닙니다.",
    body: "시장성을 외부 자료로만 보지 않고, 같은 카테고리에서 저희가 실제로 판 가격과 전환율로 검증합니다.",
  },
  {
    title: "한국어로 진행합니다.",
    body: "경기 · 인천 제조사와 중국 이우까지 거점을 두어 제조사 협의, 샘플 확인, 생산 · 선적 일정 조율을 한국어로 처리합니다. 주요 인력은 대표 함채환(경력 22년), 이사 박제하(14년), 이사 함재연(23년), 부장 임재훈(10년)입니다.",
  },
  {
    title: "조사부터 광고까지 한 팀이 이어서 합니다.",
    body: "조사 · 입점 · 콘텐츠 · 광고를 미국 현지 인력이 수행해 단계마다 담당 회사가 바뀌지 않습니다.",
  },
  {
    title: "재고 리스크를 직접 겪어 봤습니다.",
    body: "선매입, 40ft 컨테이너 수입, 뉴저지 45,000 sq ft 창고 운영, 재고 소진까지 자사 자본으로 수행합니다.",
  },
];

export const cumulativeBanner = {
  value: "230만 달러",
  body: "2024년 이후 자사 계정에서 판매한 한국 제품의 미국 수출 누적액입니다. 같은 기간 12개 한국 기업의 미국 진출을 지원했고, 현재 10개 이상의 브랜드를 미국에서 직접 운영하고 있습니다.",
  note: "기준: 2026년 7월 26일 조회 · 아마존 주문 총액 기준",
};

export const cases = [
  {
    name: "Hihip 좌식의자",
    meta: "제조사 나인테크놀로지(인산) · 2021년 미국 출시",
    lead: "시장조사로 아시아 유학생 · 좌식 수요층을 먼저 확인한 뒤 제조사에 직접 접촉해 미국 독점 유통을 맡았습니다.",
    metrics: [
      { value: "13대", label: "40ft 컨테이너 수입 (2021.11 ~ 2025.10)" },
      { value: "11,101개", label: "누적 수입 수량 (총 16회 선적)" },
      { value: "5년", label: "연속 판매 중 재고 무중단" },
    ],
    close:
      "5년째 재고가 한 번도 끊기지 않고 팔리고 있습니다. 한국 제조사의 제품 하나가 미국에서 스테디셀러로 자리 잡을 수 있다는 사례입니다.",
    chart: null,
  },
  {
    name: "KB Roach 해충 방제 젤",
    meta: "2024년 11월 미국 출시",
    lead: "미국 소비자가 이름조차 모르던 한국 제품을 검색어 기준으로 다시 쓰고 구성을 나눠 가격대를 넓혔습니다.",
    metrics: [
      { value: "75.6만 달러", label: "누적 판매액 (출시 이후)" },
      { value: "25,327개", label: "누적 판매 수량" },
      { value: "+27%", label: "7개월 만에 전년 전체 초과" },
    ],
    close:
      "2년 차 7개월 만에 작년 한 해 판매액을 27% 넘어섰습니다. 인지도가 0이던 한국 제품이 2년 안에 매달 팔리는 상품이 됐습니다.",
    chart: {
      caption: "Annual Sales",
      // 막대 높이는 최대값 기준 비율로 계산한다.
      bars: [
        { label: "2025년\n(12개월)", value: 332, display: "$332K", active: false },
        { label: "2026년\n(1~7월)", value: 423, display: "$423K", active: true },
      ],
    },
  },
];

export const voucherProcess = [
  {
    title: "자격 확인",
    body: "exportvoucher.com 로그인 후 기업 등급 · 한도를 확인합니다. 위 계산기로 먼저 가늠해 볼 수 있습니다.",
  },
  {
    title: "신청서 제출 · 선정 대기",
    body: "모집공고 기간에 신청서를 작성하면 운영기관 평가를 거쳐 선정 결과가 발표됩니다.",
  },
  {
    title: "협약 체결 · 자기부담금 납부",
    body: "협약을 체결하고 자기부담금을 현금으로 납부하면 바우처가 발급됩니다.",
  },
  {
    title: "메뉴판에서 Letusto 선택",
    body: "수행기관 검색창에 렛어스투 또는 Letusto 를 입력해 필요한 서비스를 선택하고, 견적 · 일정을 협의한 뒤 착수합니다.",
    keyword: "렛어스투 / Letusto",
  },
  {
    title: "서비스 완료 · 정산",
    body: "서비스가 끝나면 Letusto가 정부에 정산을 청구합니다. 기업은 증빙 자료만 제공하면 됩니다.",
  },
];

export const overseasBranch = {
  lead: "Letusto는 중소벤처기업진흥공단이 지정한 해외민간네트워크 수행기관으로, 해외지사화사업의 미국 현지 지사 역할도 수행합니다. 총 267억원 규모로 KOTRA · 중진공 · OKTA가 함께 운영하며, 기업은 지사를 세우지 않고도 미국 현지 거점을 갖게 됩니다.",
  stages: [
    {
      stage: "진입",
      period: "6개월",
      support:
        "기초 시장조사, 잠재바이어 탐색, 네트워크 구축, 현지어 홍보자료 번역",
      cost: "100만원",
    },
    {
      stage: "발전",
      period: "6~12개월",
      support:
        "수출성약 지원, 전시회 참가, 물류 · 통관 자문, 인허가 취득, 법인 설립 지원",
      cost: "150~600만원",
    },
    {
      stage: "확장",
      period: "9개월",
      support: "기술수출 제휴, 글로벌 밸류체인 진출, 데이터 컨설팅, 조달 진출",
      cost: "600만원",
    },
  ],
  footnotes: [
    "참여 한도: 진입단계 최대 4회 / 발전 · 확장 최대 7년",
    "해외지사화사업의 기업부담금은 수출바우처로 결제할 수 없습니다. 두 사업은 별도로 신청 · 납부합니다.",
  ],
};

export const voucherContacts = [
  {
    name: "함채환 대표",
    email: "chae@letusto.com",
    phone: "+1-856-383-8288",
  },
  { name: "박제하 이사", email: "john@letusto.com", phone: null },
];
