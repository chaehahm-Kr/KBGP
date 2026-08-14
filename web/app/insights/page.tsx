import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/nav/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section, pillInkCompact } from "@/components/ui";
import { InsightsListClient } from "@/components/site/insights/insights-list-client";

export const metadata: Metadata = {
  title: "인사이트 (Insights) — K Select Network",
  description: "미국 K-Beauty 시장 트렌드, 소비자 변화, 미국 진출 규정 및 오프라인 성장 플레이북까지 실행 가능한 Market Intelligence를 한국 브랜드와 제조사에게 제공합니다.",
};

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

// 백엔드 API 장애 발생 시 폴백용 스태틱 데이터
const FALLBACK_ARTICLES: Article[] = [
  {
    id: "fallback-1",
    title: "Scalp Care: 미국 Hair 시장에서 주목해야 할 K-Beauty 기회",
    slug: "scalp-care-k-beauty-hair-opportunity",
    subtitle: "두피케어와 트리트먼트 트렌드 분석 및 한국 브랜드 진출 로드맵",
    category: "U.S. K-BEAUTY MARKET",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "https://images.unsplash.com/photo-1522337360788-8b13edd793be?q=80&w=1200&auto=format&fit=crop",
    excerpt: "미국 헤어케어 시장의 새로운 블루오션으로 떠오르는 두피 케어 세그먼트를 심층 분석하고, 한국 브랜드의 성공적인 진출 전략과 포지셔닝 맵을 제시합니다.",
    author: "K SELECT Market Intelligence Team",
    publish_date: new Date().toISOString(),
    featured: true,
    trending: true
  },
  {
    id: "fallback-2",
    title: "좋은 제품만으로 미국 진출이 되지 않는 이유",
    slug: "why-good-products-fail-us-market-entry",
    subtitle: "MoCRA 법안 시행과 현지 수입 유통 Compliance 가이드라인",
    category: "U.S. MARKET ENTRY",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    excerpt: "미국 화장품 시장 진출 시 제품력 외에 반드시 갖춰야 할 MoCRA 규제 대응, 수입 유통 라벨링 가이드라인 및 서류 준비 프로세스를 설명합니다.",
    author: "Compliance Operations Team",
    publish_date: new Date().toISOString(),
    featured: false,
    trending: true
  },
  {
    id: "fallback-3",
    title: "300개 테스트로 무엇을 확인해야 하나?",
    slug: "what-to-verify-with-300-unit-test-launch",
    subtitle: "소량 검증을 통한 재구매율 예측과 가격 포지셔닝 최적화 방법론",
    category: "BRAND GROWTH PLAYBOOK",
    content_type: "PLAYBOOK",
    hero_image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop",
    excerpt: "초기 300개 소량 테스트 판매를 통해 미국 현지 상권에서의 소매 판매 반응과 실제 피드백을 수집하여 메인 오더로 유도하는 검증 방법론을 제시합니다.",
    author: "Retail Growth Optimization Team",
    publish_date: new Date().toISOString(),
    featured: false,
    trending: true
  },
  {
    id: "fallback-4",
    title: "Scalp Care가 미국 Beauty 시장에서 기회가 되는 이유",
    slug: "scalp-care-us-market-trend-deep-dive",
    subtitle: "헤어와 스킨케어의 융합 트렌드 및 소비자 데이터 분석",
    category: "PRODUCT & CATEGORY",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop",
    excerpt: "미국 소비자의 두피 건강에 대한 관심 고조와 스킨케어화(Skinification of Hair) 트렌드의 교차점에서 한국 스칼프 케어 제품군이 가질 수 있는 가격 및 포지셔닝 경쟁력을 탐색합니다.",
    author: "Market Insights Group",
    publish_date: new Date().toISOString(),
    featured: false,
    trending: true
  }
];

export default async function InsightsPage() {
  const portalApiUrl = process.env.PORTAL_API_URL || "http://localhost:3010";
  let articles: Article[] = [];

  try {
    const res = await fetch(`${portalApiUrl}/api/insights?channel=K_SELECT_NETWORK`, {
      cache: "no-store" // 실시간 어드민 배포 반영을 위해 no-store
    });
    
    if (res.ok) {
      const data = await res.json();
      articles = data.articles || [];
    } else {
      console.warn("Portal API returned non-ok status. Falling back to static insights.");
      articles = FALLBACK_ARTICLES;
    }
  } catch (err) {
    console.error("Failed to fetch insights from portal API. Falling back to static insights.", err);
    articles = FALLBACK_ARTICLES;
  }

  // 1. Featured Article 분리
  const featuredArticle = articles.find((a: Article) => a.featured) || articles[0];
  const listArticles = articles.filter((a: Article) => a.id !== featuredArticle?.id);

  return (
    <>
      <SiteHeader />
      <main className="bg-paper min-h-screen text-graphite pb-24">
        {/* HERO SECTION */}
        <section className="shell pt-[clamp(56px,8vw,110px)] pb-12">
          <div className="max-w-[860px]">
            <p className="micro-label flex items-center gap-2 text-slate">
              <span className="inline-block size-[5px] rounded-full bg-accent" />
              INSIGHTS
            </p>
            <h1 className="display-kr mt-6 text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.045em] leading-snug">
              미국 시장의 변화를,
              <br />
              브랜드의 다음 결정으로 연결합니다.
            </h1>
            <p className="font-serif-latin text-[clamp(18px,2.2vw,28px)] italic text-slate mt-4 tracking-normal">
              From Market Signals to Better U.S. Market Decisions.
            </p>
            <p className="body-kr mt-8 text-[16px] sm:text-[18px] text-slate leading-relaxed max-w-[700px]">
              K-Beauty 시장, 소비자 변화, 제품·카테고리 트렌드, 미국 진출과 실제 판매 데이터를
              한국 브랜드와 제조사가 다음 전략을 결정할 수 있는 실행 가능한 Insight로 제공합니다.
            </p>
          </div>
        </section>

        {/* FEATURED INSIGHT */}
        {featuredArticle && (
          <Section className="shell pt-6 pb-12">
            <div className="border-t border-hairline pt-12">
              <p className="micro-label mb-6 text-accent font-bold">Featured Insight</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* 썸네일 이미지 (7컬럼) */}
                <div className="lg:col-span-7 overflow-hidden rounded bg-paper-raised aspect-[16/10]">
                  <Link href={`/insights/${featuredArticle.slug}`} className="block h-full w-full relative group">
                    {featuredArticle.hero_image ? (
                      <img
                        src={featuredArticle.hero_image}
                        alt={featuredArticle.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate">
                        No Image Available
                      </div>
                    )}
                  </Link>
                </div>

                {/* 메타데이터 및 텍스트 (5컬럼) */}
                <div className="lg:col-span-5 flex flex-col justify-center h-full">
                  <span className="micro-label text-slate">{featuredArticle.category}</span>
                  
                  <Link href={`/insights/${featuredArticle.slug}`} className="mt-4 block group">
                    <h2 className="body-kr text-[26px] sm:text-[32px] font-bold text-graphite leading-tight tracking-[-0.03em] group-hover:text-accent transition-colors duration-200">
                      {featuredArticle.title}
                    </h2>
                  </Link>
                  
                  <p className="body-kr mt-6 text-[15px] sm:text-[16px] text-slate leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-4 text-[13px] text-slate font-medium">
                    <span>{featuredArticle.author}</span>
                    <span className="h-2.5 w-[1px] bg-hairline" />
                    <span className="tnum">
                      {new Date(featuredArticle.publish_date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="mt-8">
                    <Link href={`/insights/${featuredArticle.slug}`} className={pillInkCompact}>
                      READ INSIGHT →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* LATEST & EXPLORE GRID SECTION */}
        <Section className="shell pt-12">
          <div className="border-t border-hairline pt-12">
            <InsightsListClient articles={listArticles} />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
