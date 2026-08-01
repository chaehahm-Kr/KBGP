import { NextResponse } from "next/server";
import {
  MAX_FILES_PER_PRODUCT,
  MAX_PRODUCTS,
  validateApplication,
  validateFile,
  validateTotalSize,
  type ApplicationInput,
} from "@/lib/application-form";
import { contact } from "@/lib/content";

/** 파일을 다루므로 Node 런타임에서 실행한다. */
export const runtime = "nodejs";

function asString(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v : "";
}

/**
 * 이 라우트는 더 이상 로컬 파일시스템에 접수를 저장하지 않는다(예전 구현은
 * lib/application-store.ts 참고 — Vercel 같은 서버리스 환경에서 /tmp에 쓰면
 * 재배포·콜드스타트 시 데이터가 사라지는 문제가 있었다).
 *
 * 대신 K Select Network 파트너 포털(KSelectNetwork-Portal)의 /api/inquiries로
 * 서버 간 전달(proxy)한다. 브라우저는 여전히 이 same-origin 라우트만 호출하므로
 * CORS 설정이 필요 없고, 포털 쪽 URL·인증 시크릿은 서버 환경변수로만 존재해
 * 브라우저에 노출되지 않는다. 이 프록시 덕분에 이 파일을 호출하는 프론트엔드
 * (components/site/apply/apply-modal.tsx)는 응답 형식이 그대로({ok, id} 또는
 * {ok:false, errors})라서 전혀 수정할 필요가 없었다.
 *
 * 포털이 받은 접수는 관리자 화면(/admin/inquiries)에만 보이고, Letusto가 실제
 * 거래를 결정해 "전환"하기 전까지는 어떤 포털 로그인 권한도 생기지 않는다.
 */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["요청을 읽을 수 없습니다."] },
      { status: 400 },
    );
  }

  let input: ApplicationInput;
  try {
    input = JSON.parse(asString(form.get("payload"))) as ApplicationInput;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["신청 내용을 해석할 수 없습니다."] },
      { status: 400 },
    );
  }

  // 브라우저 검증은 우회할 수 있으므로 서버에서 다시 본다(포털로 넘기기 전
  // 여기서 먼저 걸러야, 잘못된 요청이 굳이 서버 간 호출까지 가지 않는다).
  const errors = validateApplication(input);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  let total = 0;
  const perProduct = new Map<number, number>();
  for (const [key, value] of form.entries()) {
    if (!key.startsWith("file_") || !(value instanceof File)) continue;
    if (value.size === 0) continue;

    const productIndex = Number(key.split("_")[1]);
    if (
      !Number.isInteger(productIndex) ||
      productIndex < 0 ||
      productIndex >= Math.min(input.products.length, MAX_PRODUCTS)
    ) {
      return NextResponse.json(
        { ok: false, errors: ["첨부파일이 잘못된 상품에 연결되어 있습니다."] },
        { status: 400 },
      );
    }

    const fileError = validateFile(value);
    if (fileError) {
      return NextResponse.json({ ok: false, errors: [fileError] }, { status: 422 });
    }

    const count = (perProduct.get(productIndex) ?? 0) + 1;
    if (count > MAX_FILES_PER_PRODUCT) {
      return NextResponse.json(
        {
          ok: false,
          errors: [
            `상품 ${productIndex + 1}: 첨부파일은 최대 ${MAX_FILES_PER_PRODUCT}개까지 가능합니다.`,
          ],
        },
        { status: 422 },
      );
    }
    perProduct.set(productIndex, count);

    total += value.size;
    const totalError = validateTotalSize(total);
    if (totalError) {
      return NextResponse.json({ ok: false, errors: [totalError] }, { status: 413 });
    }
  }

  const portalApiUrl = process.env.PORTAL_API_URL;
  const secret = process.env.INQUIRY_INTAKE_SECRET;

  if (!portalApiUrl) {
    console.error("[applications] PORTAL_API_URL이 설정되지 않았습니다.");
    return NextResponse.json(
      {
        ok: false,
        errors: [
          `접수 시스템 연결에 실패했습니다. ${contact.email} 으로 직접 보내 주십시오.`,
        ],
      },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(`${portalApiUrl}/api/inquiries`, {
      method: "POST",
      headers: secret ? { Authorization: `Bearer ${secret}` } : undefined,
      body: form,
    });

    const json = (await res.json()) as
      | { ok: true; id: string }
      | { ok: false; errors: string[] };

    if (!res.ok || !json.ok) {
      console.error("[applications] 포털 전달 실패", res.status, json);
      return NextResponse.json(
        {
          ok: false,
          errors:
            "errors" in json && json.errors.length > 0
              ? json.errors
              : [`접수 저장에 실패했습니다. ${contact.email} 으로 직접 보내 주십시오.`],
        },
        { status: res.status === 422 || res.status === 413 ? res.status : 502 },
      );
    }

    console.info(`[applications] forwarded to portal: ${json.id}`);
    return NextResponse.json({ ok: true, id: json.id });
  } catch (error) {
    console.error("[applications] 포털 호출 실패", error);
    return NextResponse.json(
      {
        ok: false,
        errors: [
          `접수 저장에 실패했습니다. 잠시 후 다시 시도하시거나 ${contact.email} 으로 보내 주십시오.`,
        ],
      },
      { status: 502 },
    );
  }
}
