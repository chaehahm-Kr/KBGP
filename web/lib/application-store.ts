import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ApplicationInput } from "./application-form";

/**
 * 접수 저장소.
 *
 * 기본 구현은 로컬 파일시스템에 쓴다. 직접 띄운 서버(`next start`)나 사내
 * 서버에서는 그대로 동작하지만, **Vercel 같은 서버리스 환경에서는 파일시스템이
 * 임시(ephemeral)이므로 재배포·콜드스타트 시 사라진다.** 운영에 올릴 때는
 * `persist` 를 외부 저장소(Blob/S3 + DB 또는 메일 발송)로 교체해야 한다.
 * 교체 지점을 이 파일 하나로 좁혀 두었다.
 */

export type StoredFile = {
  productIndex: number;
  originalName: string;
  storedName: string;
  size: number;
  type: string;
};

export type ApplicationRecord = {
  id: string;
  receivedAt: string;
  input: ApplicationInput;
  files: StoredFile[];
};

const ROOT =
  process.env.APPLICATIONS_DIR ?? path.join(process.cwd(), ".data", "applications");

/** 접수번호. 담당자가 메일·통화에서 참조할 수 있도록 날짜를 앞에 둔다. */
export function newApplicationId(now = new Date()) {
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KSN-${stamp}-${rand}`;
}

/** 경로 조작을 막기 위해 파일명에서 디렉토리 성분과 위험 문자를 제거한다. */
export function safeFileName(name: string) {
  const base = name.split(/[\\/]/).pop() ?? "file";
  return base.replace(/[^\w.\-가-힣ㄱ-ㅎ ]/g, "_").slice(0, 120) || "file";
}

export async function persist(
  record: Omit<ApplicationRecord, "files">,
  files: { productIndex: number; file: File }[],
): Promise<ApplicationRecord> {
  const dir = path.join(ROOT, record.id);
  await mkdir(dir, { recursive: true });

  const stored: StoredFile[] = [];

  for (const [i, entry] of files.entries()) {
    const clean = safeFileName(entry.file.name);
    const storedName = `p${entry.productIndex + 1}-${i + 1}-${clean}`;
    const bytes = Buffer.from(await entry.file.arrayBuffer());
    await writeFile(path.join(dir, storedName), bytes);
    stored.push({
      productIndex: entry.productIndex,
      originalName: entry.file.name,
      storedName,
      size: entry.file.size,
      type: entry.file.type,
    });
  }

  const full: ApplicationRecord = { ...record, files: stored };

  await writeFile(
    path.join(dir, "application.json"),
    JSON.stringify(full, null, 2),
    "utf8",
  );

  return full;
}

export { ROOT as applicationsRoot };
