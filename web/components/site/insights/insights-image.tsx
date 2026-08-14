"use client";

import { useState } from "react";

interface InsightsImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function InsightsImage({ src, alt, className = "" }: InsightsImageProps) {
  const [hasError, setHasError] = useState(!src);

  if (hasError || !src) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-paper-raised border border-hairline select-none p-6 text-center ${className}`}
        style={{ minHeight: '120px' }}
      >
        {/* Subtle decorative symbol */}
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
