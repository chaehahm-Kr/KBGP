import { categories } from "./content";

/**
 * 파트너 신청 폼 스키마. 클라이언트와 라우트 핸들러가 같은 검증을 쓴다.
 * 브라우저 검증은 우회 가능하므로 서버에서 반드시 다시 검증한다.
 */

export const MAX_PRODUCTS = 3;
export const MAX_FILES_PER_PRODUCT = 3;

/**
 * 첨부 용량 한도는 Vercel 서버리스 함수의 요청 바디 한도(4.5MB) 아래로 잡는다.
 * 이 한도를 넘으면 요청이 함수 코드에 도달하기 전에 플랫폼이 413 으로 끊기
 * 때문에, 아래 검증이 실행될 기회조차 없다. 개수보다 총량으로 제어한다.
 */
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 개당 10MB
export const MAX_TOTAL_BYTES = 10 * 1024 * 1024; // 요청 전체 합계 10MB

export const ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export const ACCEPT_ATTR = ".jpg,.jpeg,.png,.webp,.pdf";

/** 카테고리 선택지는 소싱 섹션과 동일한 데이터에서 가져온다. */
export const productCategoryOptions = categories.map((c) => c.label);

export type ProductInput = {
  name: string;
  category: string;
  priceKrw: string;
  supplyPriceUsd: string;
  packageVolume: string;
  packageWeight: string;
  monthlyCapacity: string;
  note: string;
};

export type EligibilityResponseInput = {
  itemKey: string;
  response: "available" | "discussion_required";
};

export type ApplicationInput = {
  companyName: string;
  businessNumber: string;
  companyAddress: string;
  brandName: string;
  homepage: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  products: ProductInput[];
  agreePrivacy: boolean;
  eligibilityResponses?: EligibilityResponseInput[];
};

export const emptyProduct = (): ProductInput => ({
  name: "",
  category: "",
  priceKrw: "",
  supplyPriceUsd: "",
  packageVolume: "",
  packageWeight: "",
  monthlyCapacity: "",
  note: "",
});

export const emptyApplication = (): ApplicationInput => ({
  companyName: "",
  businessNumber: "",
  companyAddress: "",
  brandName: "",
  homepage: "",
  contactName: "",
  contactTitle: "",
  email: "",
  phone: "",
  products: [emptyProduct()],
  agreePrivacy: false,
  eligibilityResponses: [],
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 사람이 읽을 수 있는 오류 메시지 배열을 돌려준다. 비어 있으면 통과. */
export function validateApplication(input: ApplicationInput): string[] {
  const errors: string[] = [];

  if (!input.companyName.trim()) errors.push("회사명을 입력해 주십시오.");
  if (!input.businessNumber.trim())
    errors.push("사업자등록번호를 입력해 주십시오.");
  if (!input.companyAddress.trim())
    errors.push("회사주소를 입력해 주십시오.");
  if (!input.contactName.trim()) errors.push("담당자명을 입력해 주십시오.");

  if (!input.email.trim()) errors.push("이메일을 입력해 주십시오.");
  else if (!EMAIL_RE.test(input.email.trim()))
    errors.push("이메일 형식을 확인해 주십시오.");

  if (!input.phone.trim()) errors.push("연락처를 입력해 주십시오.");

  if (input.products.length === 0) errors.push("상품을 1개 이상 등록해 주십시오.");
  if (input.products.length > MAX_PRODUCTS)
    errors.push(`상품은 최대 ${MAX_PRODUCTS}개까지 등록할 수 있습니다.`);

  input.products.forEach((p, i) => {
    const label = `상품 ${i + 1}`;
    if (!p.name.trim()) errors.push(`${label}: 상품명을 입력해 주십시오.`);
    if (!p.category.trim()) errors.push(`${label}: 카테고리를 선택해 주십시오.`);
    else if (!productCategoryOptions.includes(p.category))
      errors.push(`${label}: 카테고리 값이 올바르지 않습니다.`);
  });

  if (!input.agreePrivacy)
    errors.push("개인정보 수집·이용에 동의해 주십시오.");

  const allowedKeys = [
    "stable_supply",
    "us_regulatory_compliance",
    "initial_test_quantity",
    "north_america_distribution",
    "joint_marketing",
    "sales_content_support",
  ];
  if (!input.eligibilityResponses || input.eligibilityResponses.length !== 6) {
    errors.push("6개 준비 사항 확인을 모두 완료해야 신청할 수 있습니다.");
  } else {
    input.eligibilityResponses.forEach((res) => {
      if (!allowedKeys.includes(res.itemKey)) {
        errors.push(`준비 사항 항목이 올바르지 않습니다: ${res.itemKey}`);
      }
      if (res.response !== "available" && res.response !== "discussion_required") {
        errors.push(`준비 사항 응답 값이 올바르지 않습니다: ${res.response}`);
      }
    });
  }

  return errors;
}

/**
 * 바이트를 MB 표기로 바꾼다. 한도 문구와 오류 메시지가 상수에서 파생되도록
 * 한 곳에 모아 둔다. 실제 용량은 "ceil" 로 올려서, 한도를 넘겼는데 반올림
 * 때문에 한도와 같은 숫자로 보이는 일이 없게 한다.
 */
export function formatMb(bytes: number, mode: "round" | "ceil" = "round"): string {
  const mb = bytes / (1024 * 1024);
  const scaled = mode === "ceil" ? Math.ceil(mb * 10) : Math.round(mb * 10);
  const value = scaled / 10;
  return `${Number.isInteger(value) ? value : value.toFixed(1)}MB`;
}

/** 첨부파일 전체 합계 검증. 통과하면 null. */
export function validateTotalSize(bytes: number): string | null {
  if (bytes <= MAX_TOTAL_BYTES) return null;
  return `첨부파일 총 용량이 ${formatMb(MAX_TOTAL_BYTES)} 한도를 넘습니다. 현재 ${formatMb(bytes, "ceil")}입니다. 파일을 줄이거나 나눠 보내 주십시오.`;
}

export function validateFile(file: { size: number; type: string; name: string }) {
  if (file.size > MAX_FILE_BYTES) {
    return `${file.name}: 파일이 ${formatMb(MAX_FILE_BYTES)}를 넘습니다. (현재 ${formatMb(file.size, "ceil")})`;
  }
  // 일부 브라우저가 pdf 를 빈 type 으로 넘기므로 확장자도 함께 본다.
  const extOk = /\.(jpe?g|png|webp|pdf)$/i.test(file.name);
  const typeOk = (ACCEPTED_MIME as readonly string[]).includes(file.type);
  if (!extOk && !typeOk) {
    return `${file.name}: jpg · png · webp · pdf 만 첨부할 수 있습니다.`;
  }
  return null;
}
