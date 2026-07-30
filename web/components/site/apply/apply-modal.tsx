"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ACCEPT_ATTR,
  MAX_FILES_PER_PRODUCT,
  MAX_PRODUCTS,
  emptyApplication,
  emptyProduct,
  productCategoryOptions,
  validateApplication,
  validateFile,
  type ApplicationInput,
  type ProductInput,
} from "@/lib/application-form";
import { contact } from "@/lib/content";

const field =
  "mt-2 w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-[15px] text-graphite";
const labelCls = "block text-sm font-semibold text-graphite";
const legendCls = "micro-label text-slate";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; id: string }
  | { kind: "error"; errors: string[] };

export function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<ApplicationInput>(emptyApplication);
  const [files, setFiles] = useState<File[][]>([[]]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  // 네이티브 dialog 를 쓰면 포커스 트랩과 Esc, 백드롭을 브라우저가 처리한다.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const set = <K extends keyof ApplicationInput>(
    key: K,
    value: ApplicationInput[K],
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const setProduct = (index: number, patch: Partial<ProductInput>) =>
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    }));

  const addProduct = () => {
    if (data.products.length >= MAX_PRODUCTS) return;
    setData((prev) => ({ ...prev, products: [...prev.products, emptyProduct()] }));
    setFiles((prev) => [...prev, []]);
  };

  const removeProduct = (index: number) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onPickFiles = (index: number, picked: FileList | null) => {
    if (!picked) return;
    const incoming = [...picked];
    const problems = incoming.map(validateFile).filter(Boolean) as string[];
    if (problems.length > 0) {
      setStatus({ kind: "error", errors: problems });
      return;
    }
    setFiles((prev) =>
      prev.map((list, i) =>
        i === index ? [...list, ...incoming].slice(0, MAX_FILES_PER_PRODUCT) : list,
      ),
    );
    setStatus({ kind: "idle" });
  };

  const removeFile = (productIndex: number, fileIndex: number) =>
    setFiles((prev) =>
      prev.map((list, i) =>
        i === productIndex ? list.filter((_, j) => j !== fileIndex) : list,
      ),
    );

  /**
   * 폼에 noValidate 를 둔 이유: 브라우저 기본 검증이 submit 을 먼저 막으면
   * 한국어 오류 요약이 뜨지 않고, 기본 메시지는 브라우저 언어를 따라간다.
   * 검증 경로를 서버와 같은 하나로 통일한다. required 속성은 스크린리더
   * 안내용으로 유지한다.
   *
   * 오류 요약이 뜬 뒤 첫 문제 필드로 포커스를 옮긴다.
   */
  const focusFirstInvalid = () => {
    const order: [boolean, string][] = [
      [!data.companyName.trim(), "companyName"],
      [!data.businessNumber.trim(), "businessNumber"],
      [!data.contactName.trim(), "contactName"],
      [!data.email.trim(), "email"],
      [!data.phone.trim(), "phone"],
      ...data.products.flatMap((p, i): [boolean, string][] => [
        [!p.name.trim(), `p-name-${i}`],
        [!p.category.trim(), `p-cat-${i}`],
      ]),
      [!data.agreePrivacy, "agreePrivacy"],
    ];
    const target = order.find(([bad]) => bad)?.[1];
    if (target) document.getElementById(target)?.focus();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = validateApplication(data);
    if (errors.length > 0) {
      setStatus({ kind: "error", errors });
      focusFirstInvalid();
      return;
    }

    setStatus({ kind: "sending" });

    const body = new FormData();
    body.append("payload", JSON.stringify(data));
    files.forEach((list, productIndex) => {
      list.forEach((file, n) => body.append(`file_${productIndex}_${n}`, file));
    });

    try {
      const res = await fetch("/api/applications", { method: "POST", body });
      const json = (await res.json()) as
        | { ok: true; id: string }
        | { ok: false; errors: string[] };

      if (json.ok) setStatus({ kind: "done", id: json.id });
      else setStatus({ kind: "error", errors: json.errors });
    } catch {
      setStatus({
        kind: "error",
        errors: [
          `전송에 실패했습니다. 네트워크를 확인하시거나 ${contact.email} 으로 보내 주십시오.`,
        ],
      });
    }
  };

  const reset = () => {
    setData(emptyApplication());
    setFiles([[]]);
    setStatus({ kind: "idle" });
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="apply-modal-title"
      className="m-auto w-[min(92vw,760px)] max-h-[90dvh] overflow-y-auto rounded-xl border border-hairline bg-paper p-0 text-graphite backdrop:bg-ink/45"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-hairline bg-paper/95 px-7 py-6 backdrop-blur-[8px]">
        <div>
          <p className={legendCls}>Apply — K-Beauty Growth Program</p>
          <h2
            id="apply-modal-title"
            className="display-kr mt-3 mb-0 text-[26px]"
          >
            파트너 신청서
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="-mr-2 -mt-2 cursor-pointer rounded-full border-0 bg-transparent p-2 text-slate transition-colors hover:text-graphite"
        >
          <X aria-hidden strokeWidth={1.75} className="size-5" />
        </button>
      </div>

      {status.kind === "done" ? (
        <div className="px-7 py-12">
          <p className={legendCls}>Received</p>
          <h3 className="display-kr mt-4 mb-0 text-[24px]">
            접수되었습니다.
          </h3>
          <p className="body-kr mt-5 text-[16px] text-slate">
            접수번호{" "}
            <span className="tnum font-semibold text-graphite">{status.id}</span>{" "}
            로 등록했습니다. 상품 검토를 거쳐 담당자가 직접 연락드립니다. 영업일
            1일 내 회신합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="cursor-pointer rounded-full bg-ink px-8 py-4 text-[15px] font-semibold text-ivory"
            >
              확인
            </button>
            <button
              type="button"
              onClick={reset}
              className="cursor-pointer rounded-full border border-hairline bg-transparent px-8 py-4 text-[15px] font-semibold text-graphite"
            >
              다른 브랜드로 추가 신청
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="px-7 py-7">
          {/* 회사 정보 */}
          <fieldset className="m-0 border-0 p-0">
            <legend className={legendCls}>01 — 회사 정보</legend>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="companyName">
                  회사명 <span className="text-warn">*</span>
                </label>
                <input
                  id="companyName"
                  required
                  className={field}
                  value={data.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="businessNumber">
                  사업자등록번호 <span className="text-warn">*</span>
                </label>
                <input
                  id="businessNumber"
                  required
                  inputMode="numeric"
                  className={field}
                  value={data.businessNumber}
                  onChange={(e) => set("businessNumber", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="brandName">
                  브랜드명
                </label>
                <input
                  id="brandName"
                  className={field}
                  value={data.brandName}
                  onChange={(e) => set("brandName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="homepage">
                  홈페이지 · 판매채널 URL
                </label>
                <input
                  id="homepage"
                  type="url"
                  placeholder="https://"
                  className={field}
                  value={data.homepage}
                  onChange={(e) => set("homepage", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* 담당자 정보 */}
          <fieldset className="m-0 mt-10 border-0 border-t border-hairline p-0 pt-8">
            <legend className={legendCls}>02 — 담당자 정보</legend>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="contactName">
                  담당자명 <span className="text-warn">*</span>
                </label>
                <input
                  id="contactName"
                  required
                  className={field}
                  value={data.contactName}
                  onChange={(e) => set("contactName", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="contactTitle">
                  직함
                </label>
                <input
                  id="contactTitle"
                  className={field}
                  value={data.contactTitle}
                  onChange={(e) => set("contactTitle", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="email">
                  이메일 <span className="text-warn">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className={field}
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="phone">
                  연락처 <span className="text-warn">*</span>
                </label>
                <input
                  id="phone"
                  required
                  className={field}
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          {/* 상품 정보 */}
          <fieldset className="m-0 mt-10 border-0 border-t border-hairline p-0 pt-8">
            <legend className={legendCls}>
              03 — 상품 정보 (최대 {MAX_PRODUCTS}개)
            </legend>

            <div className="mt-5 flex flex-col gap-4">
              {data.products.map((product, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-hairline bg-paper-raised p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-serif-latin text-[22px] text-slate">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {data.products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-[13px] text-slate transition-colors hover:text-graphite"
                      >
                        <Trash2 aria-hidden strokeWidth={1.75} className="size-4" />
                        삭제
                      </button>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor={`p-name-${index}`}>
                        상품명 <span className="text-warn">*</span>
                      </label>
                      <input
                        id={`p-name-${index}`}
                        required
                        className={field}
                        value={product.name}
                        onChange={(e) => setProduct(index, { name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor={`p-cat-${index}`}>
                        카테고리 <span className="text-warn">*</span>
                      </label>
                      <select
                        id={`p-cat-${index}`}
                        required
                        className={`${field} appearance-none`}
                        value={product.category}
                        onChange={(e) =>
                          setProduct(index, { category: e.target.value })
                        }
                      >
                        <option value="">선택해 주십시오</option>
                        {productCategoryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor={`p-price-${index}`}>
                        국내 판매가 (원)
                      </label>
                      <input
                        id={`p-price-${index}`}
                        inputMode="numeric"
                        className={field}
                        value={product.priceKrw}
                        onChange={(e) =>
                          setProduct(index, { priceKrw: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor={`p-cap-${index}`}>
                        월 생산 가능 수량
                      </label>
                      <input
                        id={`p-cap-${index}`}
                        inputMode="numeric"
                        className={field}
                        value={product.monthlyCapacity}
                        onChange={(e) =>
                          setProduct(index, { monthlyCapacity: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className={labelCls} htmlFor={`p-note-${index}`}>
                      간단 설명
                    </label>
                    <textarea
                      id={`p-note-${index}`}
                      rows={2}
                      className={field}
                      value={product.note}
                      onChange={(e) => setProduct(index, { note: e.target.value })}
                    />
                  </div>

                  <div className="mt-5 border-t border-hairline pt-5">
                    <label className={labelCls} htmlFor={`p-file-${index}`}>
                      첨부파일
                    </label>
                    <p className="body-kr mt-1 text-[13px] text-slate">
                      제품 이미지 · 성분표 · 소개자료 · 최대{" "}
                      {MAX_FILES_PER_PRODUCT}개 · jpg · png · webp · pdf · 개당 10MB
                    </p>
                    <input
                      id={`p-file-${index}`}
                      type="file"
                      multiple
                      accept={ACCEPT_ATTR}
                      onChange={(e) => {
                        onPickFiles(index, e.target.files);
                        e.target.value = "";
                      }}
                      disabled={files[index]?.length >= MAX_FILES_PER_PRODUCT}
                      className="mt-3 block w-full text-[14px] text-slate file:mr-4 file:cursor-pointer file:rounded-full file:border file:border-hairline file:bg-paper file:px-5 file:py-2.5 file:text-[13px] file:font-semibold file:text-graphite"
                    />

                    {files[index]?.length > 0 && (
                      <ul className="m-0 mt-4 list-none border-t border-hairline p-0">
                        {files[index].map((file, fileIndex) => (
                          <li
                            key={`${file.name}-${fileIndex}`}
                            className="flex items-center justify-between gap-4 border-b border-hairline py-2.5"
                          >
                            <span className="body-kr min-w-0 flex-1 truncate text-[14px]">
                              {file.name}
                            </span>
                            <span className="tnum text-[13px] text-slate">
                              {(file.size / 1024 / 1024).toFixed(1)}MB
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index, fileIndex)}
                              aria-label={`${file.name} 제거`}
                              className="cursor-pointer border-0 bg-transparent p-1 text-slate transition-colors hover:text-graphite"
                            >
                              <X aria-hidden strokeWidth={1.75} className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {data.products.length < MAX_PRODUCTS && (
              <button
                type="button"
                onClick={addProduct}
                className="mt-4 flex cursor-pointer items-center gap-2 rounded-full border border-hairline bg-transparent px-6 py-3.5 text-[14px] font-semibold text-graphite transition-colors hover:bg-paper-raised"
              >
                <Plus aria-hidden strokeWidth={1.75} className="size-4" />
                상품 추가 ({data.products.length}/{MAX_PRODUCTS})
              </button>
            )}
          </fieldset>

          {/* 동의 + 전송 */}
          <div className="mt-10 border-t border-hairline pt-8">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreePrivacy"
                required
                checked={data.agreePrivacy}
                onChange={(e) => set("agreePrivacy", e.target.checked)}
                className="mt-1 size-4 shrink-0 accent-accent"
              />
              <label htmlFor="agreePrivacy" className="body-kr text-[15px]">
                개인정보 수집 · 이용에 동의합니다. 수집한 정보는 파트너십 검토와
                연락 목적으로만 사용합니다. <span className="text-warn">*</span>
              </label>
            </div>

            {status.kind === "error" && (
              <div
                role="alert"
                className="mt-6 border-l-4 border-warn bg-paper-raised px-6 py-5"
              >
                <p className={legendCls}>확인이 필요합니다</p>
                <ul className="m-0 mt-3 list-none p-0">
                  {status.errors.map((message) => (
                    <li
                      key={message}
                      className="body-kr text-[15px] text-graphite"
                    >
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status.kind === "sending"}
                className="cursor-pointer rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-accent-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.kind === "sending" ? "전송 중…" : "신청서 접수"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer border-0 bg-transparent p-0 text-[15px] font-semibold text-slate transition-colors hover:text-graphite"
              >
                취소
              </button>
            </div>

            <p className="body-kr mt-6 text-[13px] text-slate">
              전송이 어려우시면 {contact.email} 으로 직접 보내 주셔도 됩니다.
            </p>
          </div>
        </form>
      )}
    </dialog>
  );
}
