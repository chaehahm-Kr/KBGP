import { categories } from "./content";

/**
 * 파트너 신청 폼 스키마. 클라이언트와 라우트 핸들러가 같은 검증을 쓴다.
 * 브라우저 검증은 우회 가능하므로 서버에서 반드시 다시 검증한다.
 */

export const MAX_PRODUCTS = 3;
export const MAX_FILES_PER_PRODUCT = 3;
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB

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
  monthlyCapacity: string;
  note: string;
};

export type ApplicationInput = {
  companyName: string;
  businessNumber: string;
  brandName: string;
  homepage: string;
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  products: ProductInput[];
  agreePrivacy: boolean;
};

export const emptyProduct = (): ProductInput => ({
  name: "",
  category: "",
  priceKrw: "",
  monthlyCapacity: "",
  note: "",
});

export const emptyApplication = (): ApplicationInput => ({
  companyName: "",
  businessNumber: "",
  brandName: "",
  homepage: "",
  contactName: "",
  contactTitle: "",
  email: "",
  phone: "",
  products: [emptyProduct()],
  agreePrivacy: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 사람이 읽을 수 있는 오류 메시지 배열을 돌려준다. 비어 있으면 통과. */
export function validateApplication(input: ApplicationInput): string[] {
  const errors: string[] = [];

  if (!input.companyName.trim()) errors.push("회사명을 입력해 주십시오.");
  if (!input.businessNumber.trim())
    errors.push("사업자등록번호를 입력해 주십시오.");
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

  return errors;
}

export function validateFile(file: { size: number; type: string; name: string }) {
  if (file.size > MAX_FILE_BYTES) {
    return `${file.name}: 파일이 10MB를 넘습니다.`;
  }
  // 일부 브라우저가 pdf 를 빈 type 으로 넘기므로 확장자도 함께 본다.
  const extOk = /\.(jpe?g|png|webp|pdf)$/i.test(file.name);
  const typeOk = (ACCEPTED_MIME as readonly string[]).includes(file.type);
  if (!extOk && !typeOk) {
    return `${file.name}: jpg · png · webp · pdf 만 첨부할 수 있습니다.`;
  }
  return null;
}
