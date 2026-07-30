import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ApplicationInput } from "./application-form";

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

export function newApplicationId(now = new Date()) {
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `KSN-${stamp}-${rand}`;
}

export function safeFileName(name: string) {
  const base = name.split(/[\/]/).pop() ?? "file";
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
