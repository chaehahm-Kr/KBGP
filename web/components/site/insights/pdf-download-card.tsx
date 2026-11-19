import React from "react";
import { FileText, Download, AlertCircle } from "lucide-react";

export interface PublicPdfAttachmentInfo {
  available: boolean;
  file_name: string;
  mime_type: string;
  file_size: number;
  page_count: number;
  sha256?: string;
  card_title_ko: string;
  card_title_en?: string;
  card_description_ko: string;
  card_description_en?: string;
  button_label_ko: string;
  button_label_en?: string;
  download_path: string;
}

interface PdfDownloadCardProps {
  attachment: PublicPdfAttachmentInfo;
  previewToken?: string;
}

function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "";
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

export function PdfDownloadCard({ attachment, previewToken }: PdfDownloadCardProps) {
  const title = attachment.card_title_ko || "실무 가이드 PDF";
  const description = attachment.card_description_ko || `${attachment.page_count}페이지`;
  const buttonLabel = attachment.button_label_ko || "무료 PDF 다운로드";
  const sizeText = formatFileSize(attachment.file_size);

  const downloadHref = previewToken
    ? `${attachment.download_path}?preview=${encodeURIComponent(previewToken)}`
    : attachment.download_path;

  if (!attachment.available) {
    return (
      <section
        aria-label={title}
        className="my-12 rounded-lg border border-hairline bg-paper-raised p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded bg-paper border border-hairline text-slate">
              <AlertCircle className="size-5" aria-hidden="true" />
            </div>
            <div>
              <span className="micro-label text-slate font-bold">PDF GUIDE • UNAVAILABLE</span>
              <h3 className="display-kr mt-1.5 text-[20px] sm:text-[22px] font-bold text-graphite">
                {title}
              </h3>
              <p className="body-kr mt-1.5 text-[14px] text-slate leading-relaxed">
                현재 PDF 가이드 파일이 업데이트 중이거나 일시적으로 다운로드할 수 없습니다. 잠시 후 다시 시도해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={title}
      className="my-12 rounded-lg bg-ink text-ivory p-6 sm:p-9 border border-hairline-dark"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded bg-ink-raised border border-hairline-dark text-ivory">
            <FileText className="size-5 text-[#7aa6ff]" aria-hidden="true" />
          </div>
          <div>
            <span className="micro-label text-[#7aa6ff] font-extrabold tracking-widest">
              PRACTICAL PDF GUIDE • NO LOGIN REQUIRED
            </span>
            <h3 className="display-kr mt-2 text-[21px] sm:text-[24px] font-bold text-ivory leading-snug">
              {title}
            </h3>
            <p className="body-kr mt-2 text-[14.5px] text-dark-body font-medium">
              {description}
              {sizeText ? ` · PDF (${sizeText})` : ""}
            </p>
            <p className="body-kr mt-2 text-[13px] text-dark-label leading-relaxed">
              회원가입이나 이메일 입력 없이 원본 실무 가이드 PDF를 바로 내려받아 사내 실무 자료로 활용하실 수 있습니다.
            </p>
          </div>
        </div>

        <div className="shrink-0 md:pl-4">
          <a
            href={downloadHref}
            download={attachment.file_name}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Download className="size-4 shrink-0" aria-hidden="true" />
            <span>{buttonLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
