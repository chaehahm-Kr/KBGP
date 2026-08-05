"use client";

import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  ACCEPT_ATTR,
  MAX_FILES_PER_PRODUCT,
  MAX_FILE_BYTES,
  MAX_PRODUCTS,
  MAX_TOTAL_BYTES,
  emptyApplication,
  emptyProduct,
  formatMb,
  productCategoryOptions,
  validateApplication,
  validateFile,
  validateTotalSize,
  type ApplicationInput,
  type ProductInput,
} from "@/lib/application-form";
import { contact } from "@/lib/content";

const field =
  "mt-2 w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-[15px] text-graphite";
const labelCls = "block text-sm font-semibold text-graphite";
const legendCls = "micro-label text-slate";

/** 상품별 파일 목록을 통틀어 전송될 총 바이트. */
const totalBytesOf = (lists: File[][]) =>
  lists.reduce(
    (sum, list) => sum + list.reduce((inner, file) => inner + file.size, 0),
    0,
  );

type ApplyResponse =
  | { ok: true; id: string }
  | { ok: false; errors: string[] };

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

  // 국가번호 및 연락처 상태
  const [countryCode, setCountryCode] = useState("+82");
  const [rawPhone, setRawPhone] = useState("");

  // 이메일 인증 상태
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationTimer, setVerificationTimer] = useState(300); // 5분
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccessMsg, setVerificationSuccessMsg] = useState("");

  // 연락처 결합 동기화
  useEffect(() => {
    if (rawPhone.trim() === "") {
      setData((prev) => ({ ...prev, phone: "" }));
    } else {
      setData((prev) => ({ ...prev, phone: `${countryCode} ${rawPhone.trim()}` }));
    }
  }, [countryCode, rawPhone]);

  // 이메일 인증 타이머 작동
  useEffect(() => {
    if (!verificationSent || emailVerified || verificationTimer <= 0) return;
    const interval = setInterval(() => {
      setVerificationTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [verificationSent, emailVerified, verificationTimer]);

  // 이메일 주소 수정 시 인증 초기화
  const handleEmailChange = (newEmail: string) => {
    setData((prev) => ({ ...prev, email: newEmail }));
    setEmailVerified(false);
    setVerificationSent(false);
    setVerificationCode("");
    setVerificationError("");
    setVerificationSuccessMsg("");
  };

  // 인증번호 발송 요청
  const sendVerificationCode = async () => {
    const emailToVerify = data.email.trim();
    if (!emailToVerify || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToVerify)) {
      setVerificationError("올바른 이메일 주소를 입력해 주십시오.");
      return;
    }
    setVerificationLoading(true);
    setVerificationError("");
    setVerificationSuccessMsg("");
    try {
      const res = await fetch("/api/applications/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setVerificationSent(true);
        setVerificationTimer(300);
        setVerificationSuccessMsg("인증번호가 이메일로 발송되었습니다. 확인해 주세요.");
      } else {
        setVerificationError(result.errors?.[0] || "인증번호 발송에 실패했습니다.");
      }
    } catch (err) {
      setVerificationError("인증 서버 통신에 실패했습니다.");
    } finally {
      setVerificationLoading(false);
    }
  };

  // 인증번호 확인 요청
  const confirmVerificationCode = async () => {
    if (verificationTimer <= 0) {
      setVerificationError("인증 시간이 만료되었습니다. 다시 전송해 주세요.");
      return;
    }
    const codeToVerify = verificationCode.trim();
    if (!codeToVerify) {
      setVerificationError("인증 번호를 입력해 주십시오.");
      return;
    }
    setVerificationLoading(true);
    setVerificationError("");
    setVerificationSuccessMsg("");
    try {
      const res = await fetch("/api/applications/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, code: codeToVerify }),
      });
      const result = await res.json();
      if (res.ok && result.ok) {
        setEmailVerified(true);
        setVerificationSuccessMsg("이메일 인증이 성공적으로 완료되었습니다.");
      } else {
        setVerificationError(result.errors?.[0] || "인증 번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setVerificationError("인증 서버 통신에 실패했습니다.");
    } finally {
      setVerificationLoading(false);
    }
  };

  // 네이티브 dialog 를 쓰면 포커스 트랩과 Esc, 백드롭을 브라우저가 처리한다.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // 선택된 첨부 총량. 사용자에게 항상 노출해 한도에 가까워지는 것을 알린다.
  const totalBytes = totalBytesOf(files);
  const overTotal = totalBytes > MAX_TOTAL_BYTES;

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
    // 실제로 반영될 목록을 먼저 만들고 그 총량을 본다. 한도를 넘으면 아예
    // 추가하지 않는다 — 넘긴 상태로 담아 두면 제출 때까지 문제가 미뤄진다.
    const next = files.map((list, i) =>
      i === index ? [...list, ...incoming].slice(0, MAX_FILES_PER_PRODUCT) : list,
    );
    const totalError = validateTotalSize(totalBytesOf(next));
    if (totalError) {
      setStatus({ kind: "error", errors: [totalError] });
      return;
    }
    setFiles(next);
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
      [!data.companyAddress.trim(), "companyAddress"],
      [!data.contactName.trim(), "contactName"],
      [!data.email.trim(), "email"],
      [!data.phone.trim(), "phone"],
      ...data.products.flatMap((p, i): [boolean, string][] => [
        [!p.name.trim(), `p-name-${i}`],
        [!p.category.trim(), `p-cat-${i}`],
        [!p.packageWidth.trim(), `p-width-${i}`],
        [!p.packageDepth.trim(), `p-depth-${i}`],
        [!p.packageHeight.trim(), `p-height-${i}`],
        [!p.packageWeight.trim(), `p-weight-${i}`],
      ]),
      [!data.agreePrivacy, "agreePrivacy"],
    ];
    const target = order.find(([bad]) => bad)?.[1];
    if (target) document.getElementById(target)?.focus();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    let eligibilityResponses: { itemKey: string; response: "available" | "discussion_required" }[] = [];
    try {
      const saved = sessionStorage.getItem("kbeauty_eligibility_responses");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.eligibilityResponses) {
          eligibilityResponses = parsed.eligibilityResponses.map((r: any) => ({
            itemKey: r.itemKey,
            response: r.response,
          }));
        }
      }
    } catch (e) {
      console.error("Failed to load eligibility responses from sessionStorage:", e);
    }

    const payloadData = {
      ...data,
      eligibilityResponses,
    };

    const errors: string[] = [];
    if (!emailVerified) {
      errors.push("이메일 인증을 완료해 주십시오.");
    }

    const formErrors = validateApplication(payloadData);
    errors.push(...formErrors);

    // 총량은 전송 전에 반드시 막는다. 한도를 넘긴 요청은 함수에 닿지 못하고
    // 플랫폼이 413 으로 끊어, 사용자에게 원인이 보이지 않는다.
    const totalError = validateTotalSize(totalBytes);
    if (totalError) errors.push(totalError);
    if (errors.length > 0) {
      setStatus({ kind: "error", errors });
      focusFirstInvalid();
      return;
    }

    setStatus({ kind: "sending" });

    const body = new FormData();
    body.append("payload", JSON.stringify(payloadData));
    files.forEach((list, productIndex) => {
      list.forEach((file, n) => body.append(`file_${productIndex}_${n}`, file));
    });

    try {
      const res = await fetch("/api/applications", { method: "POST", body });

      // 413 은 라우트가 돌려준 것일 수도, 요청이 함수에 닿기 전 플랫폼이
      // 끊은 것일 수도 있다. 후자는 본문이 JSON 이 아니므로 먼저 처리한다.
      if (res.status === 413) {
        setStatus({
          kind: "error",
          errors: [
            `첨부파일 총 용량이 한도(${formatMb(MAX_TOTAL_BYTES)})를 넘어 전송이 중단되었습니다. 현재 ${formatMb(totalBytes, "ceil")}입니다. 파일 용량을 줄여 다시 시도하시거나 ${contact.email} 으로 보내 주십시오.`,
          ],
        });
        return;
      }

      let json: ApplyResponse;
      try {
        json = (await res.json()) as ApplyResponse;
      } catch {
        // HTML 오류 페이지나 빈 본문이 올 수 있다. 원인 없는 "네트워크 확인"
        // 대신 상태 코드를 그대로 보여 준다.
        setStatus({
          kind: "error",
          errors: [
            `서버 응답을 해석할 수 없습니다. (HTTP ${res.status}) 잠시 후 다시 시도하시거나 ${contact.email} 으로 보내 주십시오.`,
          ],
        });
        return;
      }

      if (json.ok) {
        setStatus({ kind: "done", id: json.id });
        try {
          sessionStorage.removeItem("kbeauty_eligibility_responses");
          window.dispatchEvent(new Event("kbeauty_eligibility_reset"));
        } catch (e) {
          console.error("Failed to clear eligibility responses on success:", e);
        }
      }
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
            3일 내 회신합니다.
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
                  placeholder="대시(-) 없이 입력해 주세요"
                  className={field}
                  value={data.businessNumber}
                  onChange={(e) => set("businessNumber", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="companyAddress">
                  회사주소 <span className="text-warn">*</span>
                </label>
                <input
                  id="companyAddress"
                  required
                  className={field}
                  value={data.companyAddress}
                  onChange={(e) => set("companyAddress", e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls} htmlFor="brandName">
                  브랜드명 <span className="text-slate text-[12px] font-normal">(대소문자 구분 필수)</span>
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
              <div className="sm:col-span-2">
                <label className={labelCls} htmlFor="email">
                  이메일 <span className="text-warn">*</span>
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={emailVerified}
                    className="w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-[15px] text-graphite disabled:bg-paper-raised"
                    value={data.email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                  {!emailVerified ? (
                    <button
                      type="button"
                      disabled={verificationLoading}
                      onClick={sendVerificationCode}
                      className="cursor-pointer rounded-lg bg-ink px-5 py-3 text-[13px] font-semibold text-ivory hover:bg-graphite disabled:opacity-60 min-w-[100px]"
                    >
                      {verificationLoading ? "발송 중…" : verificationSent ? "재전송" : "이메일 인증"}
                    </button>
                  ) : (
                    <span className="flex items-center justify-center rounded-lg bg-green-50 px-4 text-[13px] font-bold text-green-700 border border-green-200 min-w-[100px]">
                      인증 완료
                    </span>
                  )}
                </div>

                {/* 인증 번호 입력 영역 */}
                {verificationSent && !emailVerified && (
                  <div className="mt-3 rounded-lg border border-hairline bg-paper-raised p-4">
                    <p className="body-kr m-0 mb-2 text-[13px] text-slate">
                      전송된 6자리 인증 번호를 입력해 주세요.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="인증 번호 6자리"
                        className="w-full rounded-lg border border-hairline bg-paper px-3 py-2 text-[14px] text-graphite"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <button
                        type="button"
                        disabled={verificationLoading}
                        onClick={confirmVerificationCode}
                        className="cursor-pointer rounded-lg bg-accent px-5 py-2 text-[13px] font-semibold text-white hover:bg-accent-ink disabled:opacity-60 min-w-[80px]"
                      >
                        {verificationLoading ? "확인 중…" : "확인"}
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[12px]">
                      <span className="tnum font-mono font-semibold text-warn">
                        남은 시간: {Math.floor(verificationTimer / 60)}:
                        {String(verificationTimer % 60).padStart(2, "0")}
                      </span>
                      {verificationTimer <= 0 && (
                        <span className="text-warn font-semibold">시간 초과. 다시 시도해 주세요.</span>
                      )}
                    </div>
                  </div>
                )}

                {/* 인증 상태 피드백 메시지 */}
                {verificationError && (
                  <p className="body-kr mt-1.5 mb-0 text-[13px] text-warn font-semibold">
                    {verificationError}
                  </p>
                )}
                {verificationSuccessMsg && !verificationError && (
                  <p className="body-kr mt-1.5 mb-0 text-[13px] text-green-600 font-semibold">
                    {verificationSuccessMsg}
                  </p>
                )}
              </div>
              <div>
                <label className={labelCls} htmlFor="phone">
                  연락처 <span className="text-warn">*</span>
                </label>
                <div className="mt-2 flex gap-2">
                  <select
                    className="rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite appearance-none min-w-[90px]"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    <option value="+82">Korea (+82)</option>
                    <option value="+1">USA (+1)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+65">Singapore (+65)</option>
                    <option value="+84">Vietnam (+84)</option>
                  </select>
                  <input
                    id="phone"
                    required
                    placeholder="연락처 번호 입력"
                    className="w-full rounded-lg border border-hairline bg-paper px-4 py-3 text-[15px] text-graphite"
                    value={rawPhone}
                    onChange={(e) => setRawPhone(e.target.value)}
                  />
                </div>
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
                      <label className={labelCls} htmlFor={`p-supply-${index}`}>
                        공급가 ($)
                      </label>
                      <input
                        id={`p-supply-${index}`}
                        className={field}
                        value={product.supplyPriceUsd}
                        onChange={(e) =>
                          setProduct(index, { supplyPriceUsd: e.target.value })
                        }
                      />
                    </div>
                    {/* 상품 포장 정보: 부피(규격) */}
                    <div className="sm:col-span-2">
                      <label className={labelCls}>
                        상품 포장 정보: 규격 <span className="text-warn">*</span>
                      </label>
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          id={`p-width-${index}`}
                          required
                          type="number"
                          placeholder="가로"
                          className="w-full rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={product.packageWidth}
                          onChange={(e) =>
                            setProduct(index, { packageWidth: e.target.value })
                          }
                        />
                        <span className="text-slate text-[13px] font-semibold">x</span>
                        <input
                          id={`p-depth-${index}`}
                          required
                          type="number"
                          placeholder="세로"
                          className="w-full rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={product.packageDepth}
                          onChange={(e) =>
                            setProduct(index, { packageDepth: e.target.value })
                          }
                        />
                        <span className="text-slate text-[13px] font-semibold">x</span>
                        <input
                          id={`p-height-${index}`}
                          required
                          type="number"
                          placeholder="높이"
                          className="w-full rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={product.packageHeight}
                          onChange={(e) =>
                            setProduct(index, { packageHeight: e.target.value })
                          }
                        />
                        <select
                          id={`p-dimunit-${index}`}
                          required
                          className="rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite appearance-none min-w-[90px]"
                          value={product.dimensionUnit}
                          onChange={(e) =>
                            setProduct(index, { dimensionUnit: e.target.value as any })
                          }
                        >
                          <option value="">단위 선택</option>
                          <option value="cm">cm</option>
                          <option value="inch">inch</option>
                        </select>
                      </div>
                    </div>

                    {/* 상품 포장 정보: 무게 */}
                    <div className="sm:col-span-2">
                      <label className={labelCls} htmlFor={`p-weight-${index}`}>
                        상품 포장 정보: 무게 <span className="text-warn">*</span>
                      </label>
                      <div className="mt-2 flex gap-2">
                        <input
                          id={`p-weight-${index}`}
                          required
                          type="number"
                          placeholder="무게"
                          className="w-full rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={product.packageWeight}
                          onChange={(e) =>
                            setProduct(index, { packageWeight: e.target.value })
                          }
                        />
                        <select
                          id={`p-weightunit-${index}`}
                          required
                          className="rounded-lg border border-hairline bg-paper px-3 py-3 text-[15px] text-graphite appearance-none min-w-[90px]"
                          value={product.weightUnit}
                          onChange={(e) =>
                            setProduct(index, { weightUnit: e.target.value as any })
                          }
                        >
                          <option value="">단위 선택</option>
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="lb">lb</option>
                        </select>
                      </div>
                    </div>

                    {/* 생산 및 리드타임 */}
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
                    <div>
                      <label className={labelCls} htmlFor={`p-leadtime-${index}`}>
                        대략적인 리드 타임 (Lead Time)
                      </label>
                      <input
                        id={`p-leadtime-${index}`}
                        placeholder="예: 30일"
                        className={field}
                        value={product.leadTime}
                        onChange={(e) =>
                          setProduct(index, { leadTime: e.target.value })
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
                      {MAX_FILES_PER_PRODUCT}개 · jpg · png · webp · pdf · 개당{" "}
                      {formatMb(MAX_FILE_BYTES)} · 전체 합계{" "}
                      {formatMb(MAX_TOTAL_BYTES)}
                    </p>
                    <p
                      className={`body-kr mt-1 text-[13px] ${overTotal ? "text-warn" : "text-slate"}`}
                    >
                      전체 첨부{" "}
                      <span className="tnum font-semibold">
                        {formatMb(totalBytes)}
                      </span>{" "}
                      / {formatMb(MAX_TOTAL_BYTES)}
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
              <p
                className={`body-kr m-0 text-[13px] ${overTotal ? "text-warn" : "text-slate"}`}
              >
                첨부{" "}
                <span className="tnum font-semibold">
                  {formatMb(totalBytes)}
                </span>{" "}
                / {formatMb(MAX_TOTAL_BYTES)}
              </p>
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
