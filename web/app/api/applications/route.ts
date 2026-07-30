import { NextResponse } from "next/server";
import {
  MAX_FILES_PER_PRODUCT,
  MAX_PRODUCTS,
  validateApplication,
  validateFile,
  type ApplicationInput,
} from "@/lib/application-form";
import { newApplicationId, persist } from "@/lib/application-store";


/** 파일을 다루므로 Node 런타임에서 실행한다. */
export const runtime = "nodejs";

const MAX_TOTAL_BYTES = 40 * 1024 * 1024;

function asString(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v : "";
}

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

  // 브라우저 검증은 우회할 수 있으므로 서버에서 다시 본다.
  const errors = validateApplication(input);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // 파일은 file_<상품index>_<n> 키로 들어온다.
  const files: { productIndex: number; file: File }[] = [];
  const perProduct = new Map<number, number>();
  let total = 0;

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
    if (total > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { ok: false, errors: ["첨부파일 총 용량이 40MB를 넘습니다."] },
        { status: 413 },
      );
    }

    files.push({ productIndex, file: value });
  }

  const id = newApplicationId();

  try {
    const record = await persist(
      { id, receivedAt: new Date().toISOString(), input },
      files,
    );
    // 서버 로그에 접수 사실을 남긴다. 회사명·이메일·연락처 등 개인정보 본문은
    // 남기지 않고 접수번호·상품 개수·파일 개수 같은 메타데이터만 남긴다.
    console.info(
      `[applications] received ${record.id} · products=${input.products.length} · files=${record.files.length}`,
    );

    if (record.ephemeral) {
      // 서버리스 임시 저장소(/tmp)에 쓴 경우. 접수 자체는 성공했지만 파일은
      // 재배포·콜드스타트 시 사라지므로 배포 로그에서 눈에 띄어야 한다.
      console.warn(
        `[applications] WARNING: 임시 저장소에 기록됨 — 재배포 시 유실됨. 영구 보존을 위해 외부 저장소/메일 발송을 연결하라. (id=${record.id})`,
      );
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      ephemeral: record.ephemeral,
    });
  } catch (error) {
    // 실패 원인(EROFS 등)만 남긴다. 신청 내용은 로그에 싣지 않는다.
    console.error("[applications] persist failed", error);
    return NextResponse.json(
      {
        ok: false,
        errors: [
          `접수 저장에 실패했습니다. 잠시 후 다시 시도하시거나 ${contact.email} 으로 보내 주십시오.`,
        ],
      },
      { status: 500 },
    );
  }
}
