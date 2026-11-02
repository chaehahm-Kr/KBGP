"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  KOREAN_PRIVACY_POLICY,
  ENGLISH_PRIVACY_POLICY,
  PrivacyLanguage,
  PrivacyPolicyData,
} from "@/lib/privacy-policy-data";

interface PrivacyPolicyViewProps {
  initialLang?: PrivacyLanguage;
}

export function PrivacyPolicyView({ initialLang = "ko" }: PrivacyPolicyViewProps) {
  const [lang, setLang] = useState<PrivacyLanguage>(initialLang);

  // Sync with URL query parameter on client mount if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "ko") {
        setLang(urlLang);
      }
    }
  }, []);

  const handleLanguageChange = (newLang: PrivacyLanguage) => {
    setLang(newLang);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (newLang === "ko") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", newLang);
      }
      window.history.replaceState({}, "", url.toString());
      document.title =
        newLang === "ko"
          ? "K SELECT NETWORK | 개인정보처리방침"
          : "K SELECT NETWORK | Privacy Policy";
    }
  };

  const data: PrivacyPolicyData =
    lang === "en" ? ENGLISH_PRIVACY_POLICY : KOREAN_PRIVACY_POLICY;

  return (
    <article className="min-h-screen bg-paper text-graphite py-10 sm:py-16">
      <div className="shell max-w-[960px] mx-auto">
        {/* Top Navigation & Language Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-hairline mb-10">
          <div className="flex items-center gap-2 text-xs text-slate">
            <Link
              href="/"
              className="hover:text-graphite transition-colors inline-flex items-center gap-1"
            >
              <span>←</span>
              <span>{lang === "ko" ? "홈으로 돌아가기" : "Back to Home"}</span>
            </Link>
            <span className="text-hairline">/</span>
            <span className="text-graphite font-medium">
              {lang === "ko" ? "개인정보처리방침" : "Privacy Policy"}
            </span>
          </div>

          {/* Language Toggle Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-hairline bg-paper-raised self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleLanguageChange("ko")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                lang === "ko"
                  ? "bg-graphite text-ivory shadow-xs"
                  : "text-slate hover:text-graphite hover:bg-paper"
              }`}
              aria-pressed={lang === "ko"}
            >
              한국어 (KR)
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-graphite text-ivory shadow-xs"
                  : "text-slate hover:text-graphite hover:bg-paper"
              }`}
              aria-pressed={lang === "en"}
            >
              English (EN)
            </button>
          </div>
        </div>

        {/* Header Block */}
        <header className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="micro-label inline-block px-2.5 py-1 rounded bg-paper-raised border border-hairline text-slate">
              {lang === "ko" ? "공식 규정 및 고지" : "Official Policy Notice"}
            </span>
            <span className="micro-label inline-block px-2.5 py-1 rounded bg-paper-raised border border-hairline text-slate">
              {data.operator}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-graphite">
            {data.title}
          </h1>

          <p className="text-sm sm:text-base text-slate font-medium">
            {data.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate border-t border-hairline">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-graphite">
                {lang === "ko" ? "시행일자:" : "Effective Date:"}
              </span>
              <time dateTime={data.effectiveDate} className="font-mono">
                {data.effectiveDateDisplay}
              </time>
            </div>
            <span className="text-hairline hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-graphite">
                {lang === "ko" ? "문의처:" : "Inquiry:"}
              </span>
              <a
                href={`mailto:${data.contact.email}`}
                className="text-accent hover:underline underline-offset-2"
              >
                {data.contact.email}
              </a>
            </div>
          </div>
        </header>

        {/* Main Document Content */}
        <main className="space-y-10">
          {data.sections.map((section) => (
            <section
              key={section.number}
              id={`section-${section.number}`}
              className="rounded-xl border border-hairline bg-paper-raised/40 p-6 sm:p-8 space-y-4 transition-colors hover:border-hairline-dark/40"
            >
              <h2 className="text-lg sm:text-xl font-bold text-graphite flex items-baseline gap-2 border-b border-hairline pb-3">
                <span>{section.title}</span>
              </h2>

              <div className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-graphite/90">
                {section.paragraphs.map((p, pIdx) => {
                  if (typeof p === "string") {
                    return (
                      <p key={pIdx} className="leading-relaxed">
                        {p}
                      </p>
                    );
                  }

                  // Structured subtitle / body / items block
                  return (
                    <div
                      key={pIdx}
                      className="p-4 rounded-lg border border-hairline bg-paper space-y-2.5 my-3"
                    >
                      {p.subtitle && (
                        <h3 className="font-bold text-graphite text-xs sm:text-sm tracking-wide">
                          {p.subtitle}
                        </h3>
                      )}
                      {p.items ? (
                        <ul className="space-y-1.5 pl-1">
                          {p.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="text-xs sm:text-sm text-graphite/90 flex items-start gap-2"
                            >
                              <span className="text-accent font-bold shrink-0">
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-sm leading-relaxed text-graphite/90 whitespace-pre-line">
                          {p.body}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Bullets if present */}
                {section.bullets && (
                  <ul className="space-y-2 pl-2 pt-1">
                    {section.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-xs sm:text-sm text-graphite/90 flex items-start gap-2.5"
                      >
                        <span className="text-accent font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Section 13 Contact card */}
                {section.number === 13 && (
                  <div className="mt-4 p-5 rounded-lg border border-hairline bg-paper space-y-2.5 text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate">
                      <div>
                        <span className="font-semibold text-graphite">
                          {lang === "ko" ? "운영사:" : "Operator:"}
                        </span>{" "}
                        {data.contact.operator}
                      </div>
                      <div>
                        <span className="font-semibold text-graphite">
                          {lang === "ko" ? "서비스:" : "Service:"}
                        </span>{" "}
                        {data.contact.service}
                      </div>
                      <div>
                        <span className="font-semibold text-graphite">
                          {lang === "ko" ? "국가:" : "Country:"}
                        </span>{" "}
                        {data.contact.country}
                      </div>
                      <div>
                        <span className="font-semibold text-graphite">
                          {lang === "ko" ? "이메일:" : "Email:"}
                        </span>{" "}
                        <a
                          href={`mailto:${data.contact.email}`}
                          className="text-accent hover:underline font-mono"
                        >
                          {data.contact.email}
                        </a>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-semibold text-graphite">
                          {lang === "ko" ? "웹사이트:" : "Website:"}
                        </span>{" "}
                        <a
                          href={data.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          {data.contact.website}
                        </a>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-hairline text-xs text-slate font-medium">
                      {data.contact.copyright}
                    </div>
                  </div>
                )}
              </div>
            </section>
          ))}
        </main>

        {/* Bottom Switcher & Back to Top */}
        <div className="mt-14 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate">
          <p>{data.contact.copyright}</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="hover:text-graphite transition-colors cursor-pointer"
            >
              ↑ {lang === "ko" ? "맨 위로 이동" : "Back to top"}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleLanguageChange(lang === "ko" ? "en" : "ko")}
              className="text-accent hover:underline cursor-pointer"
            >
              {lang === "ko" ? "Switch to English" : "한국어로 보기"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
