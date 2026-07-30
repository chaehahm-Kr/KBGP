import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
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

/**
 * `persist` 결과. 디스크에 쓰이는 `ApplicationRecord` 에 이번 저장이
 * 영구 보존되는 위치였는지(`ephemeral`)를 덧붙인다. `ephemeral` 은
 * 응답·로그 판단에만 쓰이므로 저장 파일(application.json)에는 넣지 않는다.
 */
export type PersistResult = ApplicationRecord & { ephemeral: boolean };

type StoreTarget = { root: string; ephemeral: boolean };

/**
 * 저장 디렉토리를 실행 환경에 맞춰 고른다. 세 갈래로 갈리는 이유:
 *
 * 1) `APPLICATIONS_DIR` 이 있으면 무조건 그것을 쓴다. 운영자가 영구 볼륨·NAS
 *    마운트 경로를 명시적으로 지정한 경우이므로 영구 보존으로 간주한다
 *    (기존 동작 유지).
 * 2) `VERCEL` 이 설정되어 있으면 서버리스 함수다. 이 환경의 파일시스템은
 *    읽기 전용이라 `process.cwd()` 아래에 쓰면 `EROFS` 로 실패한다. 쓰기가
 *    허용되는 곳은 `os.tmpdir()`(Vercel 에서는 `/tmp`) 뿐이고, 그마저도
 *    인스턴스 수명 동안만 남고 재배포·콜드스타트 시 사라진다 → ephemeral.
 * 3) 그 외(로컬 개발, `next start` 로 직접 띄운 서버)는 프로젝트 아래
 *    `.data/applications` 에 그대로 쌓는다. 디스크가 유지되므로 영구 보존이다.
 */
function resolveStoreTarget(): StoreTarget {
  const explicit = process.env.APPLICATIONS_DIR?.trim();
  if (explicit) {
    return { root: explicit, ephemeral: false };
  }

  if (process.env.VERCEL) {
    return { root: path.join(tmpdir(), "ksn-applications"), ephemeral: true };
  }

  return {
    root: path.join(process.cwd(), ".data", "applications"),
    ephemeral: false,
  };
}

const TARGET = resolveStoreTarget();
const ROOT = TARGET.root;

/**
 * 이번 배포에서 접수 파일이 **영구 보존되지 않는** 위치에 쓰이는지.
 * 판단 기준: `APPLICATIONS_DIR` 미설정 + `VERCEL` 환경.
 * true 이면 외부 저장소나 메일 발송을 반드시 붙여야 한다.
 */
export const isEphemeralStore = TARGET.ephemeral;

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
): Promise<PersistResult> {
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

  return { ...full, ephemeral: isEphemeralStore };
}

export { ROOT as applicationsRoot };
