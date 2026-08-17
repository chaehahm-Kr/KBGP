"use client";

import { useState } from "react";

interface InsightsImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: string;
}

export function InsightsImage({ src, alt, className = "", category = "" }: InsightsImageProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    const lowerCategory = category.toLowerCase();
    
    // 1. U.S. MARKET ENTRY / COMPLIANCE -> 문서/체크리스트 스타일 (Cool Slate 톤)
    if (lowerCategory.includes("entry") || lowerCategory.includes("playbook")) {
      return (
        <div 
          className={`flex flex-col items-center justify-center bg-[#f8fafc] border border-slate-100 select-none p-6 text-center ${className}`}
          style={{ minHeight: '120px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[24px] text-slate-400 opacity-80 mb-3"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
          <span className="micro-label text-[10px] text-slate-500 tracking-widest font-bold">
            K SELECT COMPLIANCE & PLAYBOOK
          </span>
        </div>
      );
    }
    
    // 2. U.S. K-BEAUTY MARKET / SIGNAL -> 데이터/바차트 스타일 (Warm Stone 톤)
    if (lowerCategory.includes("market") || lowerCategory.includes("signal")) {
      return (
        <div 
          className={`flex flex-col items-center justify-center bg-[#fafaf9] border border-stone-200/60 select-none p-6 text-center ${className}`}
          style={{ minHeight: '120px' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[24px] text-stone-400 opacity-80 mb-3"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span className="micro-label text-[10px] text-stone-500 tracking-widest font-bold">
            K SELECT MARKET INTELLIGENCE
          </span>
        </div>
      );
    }

    // 3. Default -> 시그니처 K-Check 마크 로고 스타일 (기본 Neutral 톤)
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-paper-raised border border-hairline select-none p-6 text-center ${className}`}
        style={{ minHeight: '120px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="size-[24px] text-slate/40 opacity-70 mb-3"
        >
          <path
            d="M 112 170 H 30 V 30 H 170 V 112"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
          />
          <path
            d="M 70 55 H 88 V 95 L 123 55 H 142 L 103 98 L 143 145 H 124 L 88 103 V 145 H 70 Z"
            fill="currentColor"
          />
          <path
            d="M 120 148 L 142 170 L 170 120"
            stroke="#8a93a6"
            strokeWidth="12"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
        <span className="micro-label text-[10px] text-slate tracking-widest font-bold">
          K SELECT INTELLIGENCE
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      ref={(el) => {
        if (el && el.complete && el.naturalWidth === 0) {
          setHasError(true);
        }
      }}
    />
  );
}
