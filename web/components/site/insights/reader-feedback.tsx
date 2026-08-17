"use client";

import React, { useState } from "react";

interface ReaderFeedbackProps {
  articleId: string;
  portalUrl: string;
  channel?: "NETWORK" | "HUB";
}

export function ReaderFeedback({ articleId, portalUrl, channel = "NETWORK" }: ReaderFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const [feedbackChoice, setFeedbackChoice] = useState<"HELPFUL" | "NOT_HELPFUL" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendFeedback = async (choice: "HELPFUL" | "NOT_HELPFUL") => {
    if (submitted || isSubmitting) return;
    setIsSubmitting(true);
    setFeedbackChoice(choice);

    try {
      const cleanPortalUrl = portalUrl.replace(/\/$/, "");
      const res = await fetch(`${cleanPortalUrl}/api/insights/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article_id: articleId,
          channel,
          feedback: choice,
        }),
      });

      // API returns 200 (for duplicates) or 201 (for new insertions)
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to send reader feedback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-12 p-6 rounded-lg border border-hairline bg-paper-raised/40 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      <div className="text-center sm:text-left">
        <h4 className="body-kr text-[14px] font-bold text-graphite">이 인사이트가 도움이 되었나요?</h4>
        <p className="body-kr text-[12px] text-slate mt-1">
          독자 피드백은 K SELECT Insights 연구 데스크의 콘텐츠 품질 향상에 직접 활용됩니다.
        </p>
      </div>

      {submitted ? (
        <div className="body-kr text-[12px] font-bold text-accent bg-accent/5 border border-accent/20 px-4 py-2 rounded-full shrink-0">
          ✓ 피드백을 전달해주셔서 감사합니다! ({feedbackChoice === "HELPFUL" ? "도움됨" : "아쉬움"})
        </div>
      ) : (
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleSendFeedback("HELPFUL")}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-full border border-hairline bg-white hover:bg-zinc-50 active:scale-95 text-[12px] font-semibold text-graphite shadow-sm transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            👍 도움이 됨
          </button>
          <button
            onClick={() => handleSendFeedback("NOT_HELPFUL")}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-full border border-hairline bg-white hover:bg-zinc-50 active:scale-95 text-[12px] font-semibold text-slate shadow-sm transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            👎 아쉬움
          </button>
        </div>
      )}
    </div>
  );
}
