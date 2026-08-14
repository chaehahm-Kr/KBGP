"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { InsightsImage } from "./insights-image";

interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  content_type: string;
  hero_image: string;
  excerpt: string;
  author: string;
  publish_date: string;
  featured: boolean;
  trending: boolean;
}

interface InsightsListClientProps {
  articles: Article[];
}

const CATEGORIES = [
  { id: "ALL", label: "전체보기", desc: "모든 트렌드 및 마케팅 인사이트" },
  { id: "U.S. K-BEAUTY MARKET", label: "U.S. K-Beauty Market", desc: "미국 K-Beauty 시장 · 소비자 · 트렌드" },
  { id: "PRODUCT & CATEGORY", label: "Product & Category", desc: "제품 · 카테고리 · 가격 · 포지셔닝" },
  { id: "U.S. MARKET ENTRY", label: "U.S. Market Entry", desc: "규정 · Compliance · Import · Labeling" },
  { id: "BRAND GROWTH PLAYBOOK", label: "Brand Growth Playbook", desc: "Test Launch · Amazon · Offline · Growth" },
  { id: "K SELECT SIGNAL", label: "K Select Signal", desc: "매장 데이터 및 유통 실시간 리테일 시그널" }
];

export function InsightsListClient({ articles }: InsightsListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredArticles = selectedCategory === "ALL"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const activeCategoryDesc = CATEGORIES.find(c => c.id === selectedCategory)?.desc || "";

  return (
    <div className="mt-16">
      {/* 토픽 선택 (Explore by Topic) */}
      <div className="border-b border-hairline pb-4">
        <div className="flex items-center justify-between">
          <p className="micro-label text-slate">Explore by Topic</p>
          <span className="hidden text-xs text-slate sm:inline-block">좌우로 스크롤하여 더 많은 주제를 확인하세요.</span>
        </div>
        
        {/* 카테고리 탭 - 모바일 가로 스크롤 대응 */}
        <div className="scrollbar-hide -mx-gutter mt-6 flex overflow-x-auto px-gutter pb-2 md:mx-0 md:flex-wrap md:px-0">
          <div className="flex gap-2.5 md:flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? "bg-ink text-ivory animate-fade-in" 
                      : "bg-paper-raised text-slate hover:bg-hairline hover:text-graphite"
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  {cat.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 -z-10 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 카테고리 설명 */}
        <div className="mt-4 min-h-[20px]">
          <p className="text-[13px] text-slate italic transition-all duration-200">
            {activeCategoryDesc}
          </p>
        </div>
      </div>

      {/* 아티클 그리드 */}
      <motion.div 
        layout
        className="mt-12 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center"
            >
              <p className="text-slate italic">선택한 주제에 매칭되는 인사이트 아티클이 아직 없습니다.</p>
            </motion.div>
          ) : (
            filteredArticles.map(article => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={article.id}
                className="group flex flex-col items-start"
              >
                {/* 썸네일 이미지 */}
                <Link href={`/insights/${article.slug}`} className="relative w-full overflow-hidden rounded bg-paper-raised aspect-video">
                  <InsightsImage
                    src={article.hero_image}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* 트렌딩 뱃지 */}
                  {article.trending && (
                    <span className="absolute top-3 left-3 bg-accent text-[9.5px] font-black uppercase text-white tracking-widest px-2.5 py-1 rounded">
                      TRENDING
                    </span>
                  )}
                </Link>

                {/* 메타데이터 */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="micro-label text-accent font-bold">
                    {article.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-hairline" />
                  <span className="text-[12px] text-slate tnum">
                    {new Date(article.publish_date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </span>
                </div>

                {/* 제목 */}
                <Link href={`/insights/${article.slug}`} className="mt-4 block">
                  <h3 className="body-kr text-[19px] font-bold text-graphite group-hover:text-accent transition-colors duration-200 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                {/* 요약본 */}
                <p className="body-kr mt-3 text-[14.5px] text-slate line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* 하단 화살표 링크 */}
                <Link href={`/insights/${article.slug}`} className="mt-6 flex items-center gap-1.5 text-[13px] font-bold tracking-wider text-graphite group-hover:text-accent transition-colors duration-200">
                  READ INSIGHT
                  <span className="text-[12px] transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
