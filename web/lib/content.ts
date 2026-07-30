export const contact = {
  name: "Chae Hahm (함채환)",
  email: "chae@letusto.com",
  phone: "856-383-8288",
  meetingSubject: "K-Beauty Growth Program 미팅 예약 문의",
};

export const meetingHref = `mailto:${contact.email}?subject=${encodeURIComponent(
  contact.meetingSubject,
)}`;

export const cohortStatus = "2026 코호트 접수중";

export const navItems = [
  { label: "Program", href: "#program" },
  { label: "Letusto", href: "#letusto" },
  { label: "Policy", href: "#policy" },
  { label: "Process", href: "#process" },
  { label: "Eligibility", href: "#eligibility" },
  { label: "FAQ", href: "#faq" },
];

export const heroStats = [
  { value: "10", label: "US Retail Stores" },
  { value: "300", label: "Test Placements" },
  { value: "$250M+", label: "Cumulative Sales" },
];

export const companyFacts = [
  { label: "설립", value: "2004" },
  { label: "누적 판매", value: "US$250M+" },
  { label: "운영 브랜드", value: "10+" },
  { label: "거점", value: "미국 · 한국 · 중국" },
  { label: "데이터 리포트", value: "주간 · 월간" },
];

export const whyLetusto = {
  headlineLines: [
    "우리는 시장을 조사하는 회사가 아니라,",
    "미국 시장에서 직접 판매하고 운영하는 사업자입니다.",
  ],
  paragraphs: [
    "20년 이상의 리테일·이커머스 경험을 바탕으로 제품 발굴, 시장 검증, 브랜딩, Amazon 판매와 오프라인 유통까지 직접 실행합니다.",
    "자체 개발한 시장 분석 프로그램 LENS를 활용해 데이터를 실제 런칭과 운영 의사결정에 연결합니다.",
  ],
};

export const letustoNumbers = [
  { value: "2004", label: "Business Founded" },
  { value: "20+ Years", label: "Retail & E-commerce Experience" },
  { value: "US$250M+", label: "Cumulative Sales" },
  { value: "30+", label: "Products Launched" },
  { value: "200+", label: "SKUs Managed" },
  { value: "10+", label: "Brands Operated" },
  { value: "85%", label: "Launch Success Rate" },
  { value: "3", label: "Global Operating Locations" },
  { value: "LENS", label: "Proprietary Market Intelligence System" },
];

export const phases = [
  {
    phase: "Phase 01",
    latin: "Test",
    title: "테스트 입점",
    body: "오프라인 10개 매장에 240개, Amazon에 60개. 대량 발주 없이 실제 수요를 확인합니다.",
    rows: [
      { label: "오프라인", value: "240", numeric: true },
      { label: "온라인 (Amazon)", value: "60", numeric: true },
      { label: "진열 방식", value: "Store-in-a-Store", numeric: false },
    ],
  },
  {
    phase: "Phase 02",
    latin: "Partnership",
    title: "본 파트너십",
    body: "테스트 실판매 데이터를 근거로 진열 규모와 채널을 확대합니다. 상권 보호 정책 아래 유통을 정리합니다.",
    rows: [
      { label: "판단 근거", value: "실판매 데이터", numeric: false },
      { label: "가격 보호", value: "상권 보호 정책", numeric: false },
      { label: "첫 거래", value: "First Order Protection", numeric: false },
    ],
  },
];

export const policies = [
  {
    fear: "선금을 보낸 뒤 연락이 끊긴다",
    policy: "First Order Protection",
    body: "첫 거래의 위험을 브랜드가 혼자 부담하지 않습니다. 조건은 계약서에 명문화됩니다.",
  },
  {
    fear: "병행수입으로 가격이 무너진다",
    policy: "상권 보호 정책",
    body: "채널 간 가격 경쟁을 차단해 가격 구조와 브랜드 이미지를 유지합니다.",
  },
  {
    fear: "현지 매장과 연결될 방법이 없다",
    policy: "Store-in-a-Store 진열",
    body: "Letusto가 직접 운영하는 매장 안에 브랜드 전용 구획을 배정합니다.",
  },
  {
    fear: "실제 판매량을 알 수 없다",
    policy: "주간 · 월간 실판매 데이터 검증",
    body: "추정이 아닌 실제 판매 수치를 정기적으로 공유합니다.",
  },
];

export const processSteps = [
  { title: "신청 접수", body: "참여 자격 자가진단 후 신청서 제출" },
  { title: "상품 · 규격 검토", body: "카테고리 적합성, 현지 표기 및 인증 요건 확인" },
  {
    title: "담당자 미팅",
    body: "공급 조건 · 일정 · First Order Protection 범위 협의",
  },
  { title: "테스트 입점", body: "오프라인 240 + Amazon 60, Store-in-a-Store 진열" },
  { title: "실판매 데이터 리뷰", body: "주간 · 월간 판매 데이터 공유 및 검증" },
  { title: "본 파트너십", body: "상권 보호 정책 아래 정식 유통 확대" },
];

/**
 * 소싱 카테고리 비중. `items` 는 도넛 차트에서 해당 조각에 마우스를 올리거나
 * 포커스했을 때 노출되는 대표 품목이다.
 */
export const categories = [
  {
    label: "K-스킨케어",
    share: 75,
    items:
      "시트마스크, 여드름 패치, 토너 패드, 세럼, 보습크림, 클렌저 등 기본 스킨케어",
  },
  {
    label: "K-헤어 & 스칼프",
    share: 10,
    items: "두피 에센스, 기능성 샴푸/트리트먼트, 헤어 미스트, 보호 관리 제품군",
  },
  {
    label: "K-뷰티 소품 · 툴",
    share: 5,
    items:
      "화장용 퍼프, 메이크업 브러시, 셀프 네일 툴, 속눈썹 툴, 데일리 뷰티 소품",
  },
  {
    label: "K-데일리 케어",
    share: 5,
    items: "물티슈, 핸드/풋 전용 크림, 바디 케어, 기능성 오랄 케어 상품",
  },
  {
    label: "K-웰니스 · 기능성 패치",
    share: 5,
    items: "수소수 겔 파스, 쿨링 패치, 간편 영양 비타민류 등 미국 통관 적합 제품",
  },
];

export const categoryNote =
  "위 카테고리에 명시적으로 해당하지 않더라도, 반복 구매를 이끌어낼 수 있는 상품이라면 별도로 검토 가능합니다.";

export const eligibilityConditions = [
  "리오더에도 안정적으로 재생산 · 공급이 가능한 생산 캐파를 갖추고 있습니다",
  "미국 상표권을 등록했거나 진행할 의지가 있고, 성분 · 라벨링 인증에 대응할 수 있습니다",
  "초도 테스트 물량 300개(오프라인 240 + 온라인 60)를 공급할 수 있습니다",
  "타 총판 · 이커머스와 중복 없이 공급 우선권을 제공할 수 있습니다",
  "목표 달성 시 마케팅 비용의 일부를 분담할 의지가 있습니다",
  "제품 이미지 · 사용법 · 루틴 등 판매용 콘텐츠를 제공할 수 있습니다",
];

export const faqs = [
  {
    q: "테스트 300개는 무상 공급입니까?",
    a: "공급 조건은 미팅 단계에서 확정합니다. First Order Protection 범위에 따라 첫 거래의 위험 분담 방식이 결정됩니다.",
  },
  {
    q: "미국 인증(FDA 등)이 없으면 신청할 수 없습니까?",
    a: "신청은 가능합니다. 현지 표기 및 요건은 상품 검토 단계에서 Letusto가 안내합니다.",
  },
  {
    q: "이미 미국에 병행수입 유통이 있는 브랜드도 가능합니까?",
    a: "가능하지만 상권 보호 정책 적용 범위를 먼저 정리해야 합니다. 현황을 신청서에 기재해 주십시오.",
  },
  {
    q: "판매 데이터는 어떤 형태로 받습니까?",
    a: "주간 · 월간 실판매 리포트를 브랜드 담당자에게 공유합니다. 매장별 · SKU별 수치를 포함합니다.",
  },
  {
    q: "심사 결과는 언제 통보됩니까?",
    a: "신청 접수 후 상품 검토를 거쳐 담당자가 직접 연락합니다. 구체적 일정은 코호트 공고에 따릅니다.",
  },
];
