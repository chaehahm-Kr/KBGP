import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/nav/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Section, pillAccent } from "@/components/ui";
import { InsightsImage } from "@/components/site/insights/insights-image";
import { ReaderFeedback } from "@/components/site/insights/reader-feedback";

const fallbackIdMap: Record<string, string> = {
  "why-good-products-fail-us-market-entry": "f4c49bfb-ecf1-4766-b09a-c56e9a8d1660",
  "scalp-care-k-beauty-hair-opportunity": "ab8bbe2a-cdb7-42d2-ae48-b64e6fc6e1ef",
  "what-to-verify-with-300-unit-test-launch": "d3ec8ae4-c1c6-405e-a374-0b8c2c69cda6",
  "scalp-care-us-market-trend-deep-dive": "3d8e4d1c-7be4-4200-b497-3bb3adeeb6ee",
};

// 폴백용 상세 데이터
const FALLBACK_DETAILS: Record<string, any> = {
  "scalp-care-k-beauty-hair-opportunity": {
    title: "Scalp Care: 미국 Hair 시장에서 주목해야 할 K-Beauty 기회",
    subtitle: "두피케어와 트리트먼트 트렌드 분석 및 한국 브랜드 진출 로드맵",
    category: "U.S. K-BEAUTY MARKET",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "/images/insights/scalp_care_opportunity.jpg",
    excerpt: "미국 헤어케어 시장의 새로운 블루오션으로 떠오르는 두피 케어 세그먼트를 심층 분석하고, 한국 브랜드의 성공적인 진출 전략과 포지셔닝 맵을 제시합니다.",
    author: "K SELECT Market Intelligence Team",
    publish_date: new Date().toISOString(),
    brand_takeaway: "미국 헤어케어 시장에서 스킨케어형 제품군(스칼프 세럼, 에센스, 두피 각질 제거제)의 수요가 급증하고 있습니다. K-Beauty 브랜드는 기존 스킨케어의 강점을 두피로 확장하는 포지셔닝으로 진출해야 합니다.",
    brand_actions: [
      "미국 판매 가격을 먼저 검토",
      "Compliance 준비 상태 확인",
      "경쟁 제품과 Positioning 비교",
      "300-unit Test Launch 기준 설계"
    ],
    sources: [
      "Letusto U.S. Beauty Supply Foot Traffic Report 2024",
      "Mintel Haircare Category U.S. Report 2025"
    ],
    body_blocks: [
      {
        type: "HEADING",
        value: "미국 헤어케어의 패러다임 변화: '두피도 피부다' (Skinification of Hair)"
      },
      {
        type: "TEXT",
        value: "미국 헤어케어 시장에서 가장 눈에 띄는 변화는 단순 세정이나 헤어 스타일링을 넘어 '두피 건강(Scalp Health)'을 핵심 가치로 삼는 제품군의 성장입니다. 스킨케어에서 널리 쓰이는 히알루론산, 살리실산, 세라마이드 등의 효능 성분이 헤어 제품에 적용되기 시작하면서, 소비자들은 헤어 케어를 '두피라는 피부에 영양을 공급하는 과정'으로 인식하고 있습니다."
      },
      {
        type: "QUOTE",
        value: "미국 소비자들은 이제 헤어케어를 스킨케어의 연장선상으로 보고 있습니다. 특히 스칼프 세럼과 엑스폴리에이터 카테고리는 연평균 15% 이상의 고성장을 기록하고 있습니다.",
        author: "K SELECT U.S. Beauty Lead Coordinator"
      },
      {
        type: "HEADING",
        value: "미국 두피 케어 세그먼트 시장 데이터"
      },
      {
        type: "MARKET_DATA",
        headers: ["제품 카테고리 (Category)", "2024 매출 규모", "2026 예상 규모", "연평균 성장률(CAGR)"],
        rows: [
          ["두피 세럼/에센스 (Scalp Serums)", "$48.5M", "$72.1M", "21.8%"],
          ["두피 스크럽/각질제거 (Exfoliators)", "$32.0M", "$45.5M", "19.3%"],
          ["프리미엄 탈모 샴푸 (Loss Treatment)", "$145.0M", "$180.0M", "11.4%"]
        ]
      },
      {
        type: "TEXT",
        value: "위 데이터에서 알 수 있듯 두피 세럼과 각질제거 세그먼트의 성장세는 기존 샴푸 카테고리의 2배 이상입니다. 이는 미국 소비자들이 문제 해결형(Problem-solving) 고기능성 스칼프 제품군에 더 많은 프리미엄을 지불할 용의가 있음을 시사합니다."
      },
      {
        type: "KEY_TAKEAWAY",
        value: "한국 브랜드의 핵심 기회는 기존 K-Skincare의 우수한 성분 이야기와 제조 기술력을 헤어/두피 영역에 결합하는 것에 있습니다. 자극을 줄인 천연 오일, 한방 추출물, 유산균 성분은 천연·유기농을 선호하는 미국 클린 뷰티 소비층에게 강력한 구매 명분을 선사합니다."
      }
    ]
  },
  "why-good-products-fail-us-market-entry": {
    title: "좋은 제품만으로 미국 진출이 되지 않는 이유",
    subtitle: "MoCRA 법안 시행과 현지 수입 유통 Compliance 가이드라인",
    category: "U.S. MARKET ENTRY",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "/images/insights/why_products_fail.jpg",
    excerpt: "미국 화장품 시장 진출 시 제품력 외에 반드시 갖춰야 할 MoCRA 규제 대응, 수입 유통 라벨링 가이드라인 및 서류 준비 프로세스를 설명합니다.",
    author: "Compliance Operations Team",
    publish_date: new Date().toISOString(),
    brand_takeaway: "FDA MoCRA 시설 등록 및 제품 리스팅 의무화를 통과하지 못하면 현지 통관 자체가 불가능합니다. 성분 검토와 OTC 허가 여부를 선제적으로 확인하십시오.",
    brand_actions: [
      "FDA MoCRA 준수 여부 사전 검토",
      "라벨링 영문 명세 및 알레르기 유발 물질 표기 확인",
      "현지 법인 대리인(U.S. Agent) 지정 및 계약",
      "안전성 보고서(Safety Substantiation) 문서화"
    ],
    sources: [
      "FDA Modernization of Cosmetics Regulation Act (MoCRA) 2022 Guidelines",
      "US Customs and Border Protection Importation Manual 2024"
    ],
    body_blocks: [
      {
        type: "HEADING",
        value: "미국 화장품 규제 현대화법 (MoCRA)의 의무 요건"
      },
      {
        type: "TEXT",
        value: "2022년 말 미국 의회를 통과한 MoCRA(Modernization of Cosmetics Regulation Act)는 지난 수십 년 동안 가장 큰 미국 화장품 규제 개혁입니다. 이제 더 이상 자율 등록에 의존하지 않으며, 미국으로 수출되는 모든 화장품 시설(Facility)과 품목(Product)은 FDA에 반드시 사전 등록 및 승인을 받아야 유통할 수 있습니다."
      },
      {
        type: "CHECKLIST",
        title: "화장품 제조사가 반드시 준비해야 할 4대 규제 서류",
        items: [
          "FDA 시설 등록 번호 (Facility Registration)",
          "FDA 제품 리스팅 번호 (Product Listing)",
          "제품 성분 안전성 검증 문서 (Safety Substantiation Dossier)",
          "영문 전성분 라벨 및 미국 내 부작용 보고를 위한 연락처 (U.S. Contact Address)"
        ]
      },
      {
        type: "TEXT",
        value: "많은 한국 브랜드가 제품 효능 테스트와 디자인에 수천만 원을 지출하면서도, 성분 가이드라인이나 OTC 분류(예: 자외선 차단제, 아크네 케어 등)에 대처하지 않아 통관 과정에서 전량 폐기되거나 억류되는 경우가 빈번합니다. 제품을 현지에 보내기 전에 완벽한 Compliance 검증을 거치는 것이 생존의 전제조건입니다."
      }
    ]
  },
  "what-to-verify-with-300-unit-test-launch": {
    title: "300개 테스트로 무엇을 확인해야 하나?",
    subtitle: "소량 검증을 통한 재구매율 예측과 가격 포지셔닝 최적화 방법론",
    category: "BRAND GROWTH PLAYBOOK",
    content_type: "PLAYBOOK",
    hero_image: "/images/insights/test_launch_verification.jpg",
    excerpt: "초기 300개 소량 테스트 판매를 통해 미국 현지 상권에서의 소매 판매 반응과 실제 피드백을 수집하여 메인 오더로 유도하는 검증 방법론을 제시합니다.",
    author: "Retail Growth Optimization Team",
    publish_date: new Date().toISOString(),
    brand_takeaway: "대규모 마케팅 예산을 쏟기 전에 300개 테스트 런칭을 통해 유통 마진 구조가 무너지지 않는 소비자 희망가격을 찾고 오프라인 반응을 분석하십시오.",
    brand_actions: [
      "초기 테스트 제품의 도매(WS) 공급가 및 물류비 수립",
      "유형별 소비자가(MSRP)에 따른 소매상 테스트 반응 분석",
      "매대 사진과 영문 POP물 배치 준비",
      "소량 테스트를 위한 현지 창고/물류 거점 확보"
    ],
    sources: [
      "Letusto Independent Beauty Retailer Network Survey 2024",
      "K SELECT Growth Simulator Optimization Database"
    ],
    body_blocks: [
      {
        type: "HEADING",
        value: "대량 수출의 무덤이 된 미국 오프라인 창고"
      },
      {
        type: "TEXT",
        value: "많은 화장품 브랜드들이 컨테이너 단위(FCL)로 물건을 보내 미국 대형 총판이나 물류 창고에 쌓아두면 오프라인 매장에 알아서 풀릴 것으로 착각합니다. 하지만 실제로는 현지 소비자의 판매 속도(Sell-through velocity)가 검증되지 않으면, 초기 오더 이후 창고 보관료만 쌓이다 덤핑 처리되는 경우가 대다수입니다."
      },
      {
        type: "QUOTE",
        value: "바이어들이 가장 무서워하는 것은 제품이 안 팔려서 매대를 차지하고 있는 상태입니다. 300개 테스트는 소매 반응을 증명해 메인 오더를 당겨오는 강력한 도구입니다.",
        author: "K SELECT Business Director"
      },
      {
        type: "TEXT",
        value: "300개 소량 테스트는 리스크를 통제하면서 실제 현지 뷰티 서플라이나 멀티 브랜드숍 매대에서 다음 3가지 핵심 지표를 확인하는 기회입니다:"
      },
      {
        type: "CHECKLIST",
        title: "300개 테스트 기간 동안 반드시 측정해야 할 3대 지표",
        items: [
          "주당 판매 수량 (Sell-through velocity) — 매장당 일주일에 몇 개가 팔리는가",
          "가격 민감도 측정 — $15, $20, $25 가격 저항선 중 어디가 가장 회전율이 높은가",
          "바이어 만족도 피드백 — 점주가 제품 마진과 패키지에 만족해 재발주 의사를 밝히는가"
        ]
      }
    ]
  },
  "scalp-care-us-market-trend-deep-dive": {
    title: "Scalp Care가 미국 Beauty 시장에서 기회가 되는 이유",
    subtitle: "헤어와 스킨케어의 융합 트렌드 및 소비자 데이터 분석",
    category: "PRODUCT & CATEGORY",
    content_type: "MARKET_INTELLIGENCE",
    hero_image: "/images/insights/scalp_care_trend.jpg",
    excerpt: "미국 소비자의 두피 건강에 대한 관심 고조와 스킨케어화(Skinification of Hair) 트렌드의 교차점에서 한국 스칼프 케어 제품군이 가질 수 있는 가격 및 포지셔닝 경쟁력을 탐색합니다.",
    author: "Market Insights Group",
    publish_date: new Date().toISOString(),
    brand_takeaway: "미국 로컬 시장의 헤어 케어 단가는 스킨케어 대비 상대적으로 유연합니다. 프리미엄 스칼프 라인업으로 높은 마크업 배수를 실현할 수 있습니다.",
    brand_actions: [
      "기존 스킨케어의 효능 입증 데이터를 두피용 임상 마케팅으로 전환",
      "두피 스크럽, 살리실산 토닉 등 고마진 틈새 세그먼트에 타겟팅",
      "글루텐프리, 유기농 등 현지 헤어용 성분 안전 기준 충족 확인"
    ],
    sources: [
      "NPD Group US Beauty Retail Sales Tracker 2024",
      "K SELECT Retailer Feedback Panel"
    ],
    body_blocks: [
      {
        type: "HEADING",
        value: "두피 케어의 부상: 왜 지금인가?"
      },
      {
        type: "TEXT",
        value: "최근 미국 뷰티 트렌드를 대표하는 단어 중 하나는 바로 'Skinification of Hair'입니다. 소비자들이 두피를 모발이 자라는 모체이자 특별한 관리가 필요한 '피부 영역'으로 대우하기 시작하면서, 두피 전용 샴푸와 에센스를 넘어 스크럽, 세럼, 전용 괄사 도구까지 시장이 세분화되고 있습니다."
      },
      {
        type: "KEY_TAKEAWAY",
        value: "이 시장은 기존 글로벌 대기업 브랜드들이 미처 촘촘한 제품 라인업을 짜지 못한 틈새 영역입니다. 스킨케어 부문에서 이미 세계적인 기획력을 입증한 한국 브랜드들이 특유의 성분 배합력과 세련된 패키징으로 가장 빠르게 치고 들어갈 수 있는 기회입니다."
      }
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const portalApiUrl = process.env.PORTAL_API_URL || "http://localhost:3010";

  let article = null;
  let prevArticle = null;
  let nextArticle = null;

  try {
    const res = await fetch(`${portalApiUrl}/api/insights?slug=${slug}&channel=K_SELECT_NETWORK`, {
      cache: "no-store"
    });

    if (res.ok) {
      const data = await res.json();
      article = data.article;
      prevArticle = data.prevArticle;
      nextArticle = data.nextArticle;
    } else {
      console.warn(`Article not found via API for slug: ${slug}. Falling back to static data.`);
      article = FALLBACK_DETAILS[slug];
    }
  } catch (err) {
    console.error("Error fetching article detail, falling back to static data.", err);
    article = FALLBACK_DETAILS[slug];
  }

  if (!article) {
    notFound();
  }

  const articleId = article.id || fallbackIdMap[slug] || "f4c49bfb-ecf1-4766-b09a-c56e9a8d1660";

  // 폴백 모드에서 이전/다음 링크 채우기
  if (!prevArticle || !nextArticle) {
    const keys = Object.keys(FALLBACK_DETAILS);
    const currentIndex = keys.indexOf(slug);
    if (currentIndex !== -1) {
      if (currentIndex > 0 && !prevArticle) {
        prevArticle = {
          slug: keys[currentIndex - 1],
          title: FALLBACK_DETAILS[keys[currentIndex - 1]].title
        };
      }
      if (currentIndex < keys.length - 1 && !nextArticle) {
        nextArticle = {
          slug: keys[currentIndex + 1],
          title: FALLBACK_DETAILS[keys[currentIndex + 1]].title
        };
      }
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-paper min-h-screen text-graphite pt-[clamp(56px,8vw,110px)] pb-24">
        <article className="shell max-w-[800px]">
          {/* 머리말 메타정보 */}
          <div className="text-center">
            <span className="micro-label text-accent font-bold tracking-widest">{article.category}</span>
            <h1 className="display-kr mt-6 mb-0 text-[32px] sm:text-[42px] font-bold leading-tight tracking-[-0.035em]">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="body-kr mt-4 text-[17px] sm:text-[19px] text-slate font-medium">
                {article.subtitle}
              </p>
            )}
            
            <div className="mt-8 flex items-center justify-center gap-4 text-[13px] text-slate font-medium border-b border-hairline pb-8">
              <span>{article.author}</span>
              <span className="h-2.5 w-[1px] bg-hairline" />
              <span className="tnum">
                {new Date(article.publish_date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* 대표 히어로 이미지 */}
          <div className="mt-12 overflow-hidden rounded bg-paper-raised aspect-[16/9] w-full">
            <InsightsImage
              src={article.hero_image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* 본문 콘텐츠 블록 렌더러 (Content Block System) */}
          <div className="mt-12 pr-0 sm:pr-4">
            {article.body_blocks && Array.isArray(article.body_blocks) && (
              article.body_blocks.map((block: any, idx: number) => {
                switch (block.type) {
                  case "HEADING":
                    return (
                      <h2 key={idx} className="display-kr text-[22px] sm:text-[26px] font-bold text-graphite mt-14 mb-6 leading-tight border-b border-hairline pb-3">
                        {block.value}
                      </h2>
                    );
                  
                  case "TEXT":
                    return (
                      <p key={idx} className="body-kr text-[16px] sm:text-[17px] text-slate mb-6 leading-[1.85] text-justify">
                        {block.value}
                      </p>
                    );
                  
                  case "QUOTE":
                    return (
                      <blockquote key={idx} className="relative border-l-[3px] border-accent pl-6 py-1 my-10 italic text-[17px] sm:text-[18px] text-slate bg-paper-raised/30 rounded-r-lg pr-4">
                        <p className="body-kr font-medium m-0 leading-relaxed">
                          “{block.value}”
                        </p>
                        {block.author && (
                          <cite className="block not-italic text-[13px] text-slate font-bold mt-3 tracking-wide">
                            — {block.author}
                          </cite>
                        )}
                      </blockquote>
                    );

                  case "KEY_TAKEAWAY":
                    return (
                      <div key={idx} className="bg-paper-raised/60 p-6 sm:p-8 rounded-lg my-10 border-l-[4px] border-accent">
                        <span className="micro-label text-accent font-bold">KEY TAKEAWAY</span>
                        <p className="body-kr mt-3 mb-0 text-[15.5px] sm:text-[16.5px] font-medium text-graphite leading-relaxed">
                          {block.value}
                        </p>
                      </div>
                    );

                  case "MARKET_DATA":
                    return (
                      <div key={idx} className="overflow-x-auto my-10">
                        <table className="w-full text-left border-collapse border-b border-hairline text-[14px]">
                          <thead>
                            <tr className="border-b border-slate/20">
                              {block.headers && block.headers.map((h: string, hIdx: number) => (
                                <th key={hIdx} className="py-3 px-4 font-bold text-slate micro-label whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {block.rows && block.rows.map((row: string[], rIdx: number) => (
                              <tr key={rIdx} className="border-b border-hairline hover:bg-paper-raised/20">
                                {row.map((cell: string, cIdx: number) => (
                                  <td key={cIdx} className="py-4 px-4 text-graphite font-medium tnum whitespace-nowrap">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );

                  case "CHECKLIST":
                    return (
                      <div key={idx} className="my-8">
                        {block.title && <p className="body-kr font-bold text-[16px] mb-4 text-graphite">{block.title}</p>}
                        <ul className="space-y-3.5 pl-0">
                          {block.items && block.items.map((item: string, iIdx: number) => (
                            <li key={iIdx} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-slate leading-relaxed">
                              <span className="text-accent text-[18px] leading-none select-none">✓</span>
                              <span className="body-kr">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  default:
                    return null;
                }
              })
            )}
          </div>

          {/* 🌟 SHARED CONTENT OVERRIDES: BRAND EXPERIENCE STYLING */}
          
          {/* A. Brand Takeaway (What This Means for Brands) */}
          {article.brand_takeaway && (
            <div className="bg-paper-raised p-6 sm:p-8 rounded-lg mt-16 border border-hairline">
              <h3 className="micro-label text-graphite font-extrabold flex items-center gap-2">
                <span className="inline-block size-1.5 rounded-full bg-accent" />
                WHAT THIS MEANS FOR BRANDS
              </h3>
              <p className="body-kr mt-4 mb-0 text-[15.5px] sm:text-[16.5px] leading-relaxed text-slate font-medium">
                {article.brand_takeaway}
              </p>
            </div>
          )}

          {/* B. Brand Actions */}
          {article.brand_actions && Array.isArray(article.brand_actions) && article.brand_actions.length > 0 && (
            <div className="mt-12 bg-ink text-ivory p-6 sm:p-10 rounded-lg">
              <h3 className="micro-label text-accent font-extrabold tracking-widest">
                BRAND ACTION CHECKLIST
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {article.brand_actions.map((act: string, aIdx: number) => (
                  <div key={aIdx} className="flex items-start gap-4">
                    <span className="font-serif-latin text-[24px] text-accent leading-none font-bold tnum">
                      {String(aIdx + 1).padStart(2, "0")}
                    </span>
                    <p className="body-kr m-0 text-[14.5px] text-dark-body font-medium leading-normal pt-1.5">
                      {act}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. Sources Footnote */}
          {article.sources && Array.isArray(article.sources) && article.sources.length > 0 && (
            <div className="mt-16 border-t border-hairline pt-6 text-[12px] text-slate leading-relaxed">
              <p className="font-semibold mb-2 micro-label uppercase tracking-widest text-[9.5px]">Sources & References</p>
              <ul className="list-decimal pl-4 space-y-1">
                {article.sources.map((src: string, sIdx: number) => (
                  <li key={sIdx} className="font-sans italic">{src}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 독자 피드백 UI (👍 도움이 됨 / 👎 아쉬움) */}
          <ReaderFeedback articleId={articleId} portalUrl={portalApiUrl} channel="NETWORK" />

          {/* D. Partnership CTA Banner */}
          <div className="mt-16 bg-paper-raised/50 border border-hairline p-8 rounded-lg text-center flex flex-col items-center">
            <h3 className="display-kr text-[20px] font-bold mb-3 text-graphite">미국 진출 자격조건이 충족되는지 확인하세요</h3>
            <p className="body-kr text-[14.5px] text-slate max-w-[550px] mb-6 leading-relaxed">
              K-Beauty 브랜드의 실질적인 미국 유통 진출과 300개 테스트 파트너십 매칭을 원하시는 경우,
              K SELECT NETWORK의 6가지 자격조건 자가진단을 바로 시작하실 수 있습니다.
            </p>
            <Link href="/#eligibility" className={pillAccent}>
              프로그램 자가진단 신청하기 →
            </Link>
          </div>

          {/* 8. PREVIOUS / NEXT ARTICLE NAVIGATION */}
          <div className="mt-20 border-t border-hairline pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[14px]">
            {prevArticle ? (
              <div className="flex flex-col items-start">
                <span className="micro-label text-slate mb-2">← PREVIOUS INSIGHT</span>
                <Link href={`/insights/${prevArticle.slug}`} className="body-kr font-bold text-graphite hover:text-accent transition-colors duration-200 line-clamp-2">
                  {prevArticle.title}
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextArticle ? (
              <div className="flex flex-col items-end text-right">
                <span className="micro-label text-slate mb-2">NEXT INSIGHT →</span>
                <Link href={`/insights/${nextArticle.slug}`} className="body-kr font-bold text-graphite hover:text-accent transition-colors duration-200 line-clamp-2">
                  {nextArticle.title}
                </Link>
              </div>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

// metadata 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const portalApiUrl = process.env.PORTAL_API_URL || "http://localhost:3010";
  let article = null;

  try {
    const res = await fetch(`${portalApiUrl}/api/insights?slug=${slug}&channel=K_SELECT_NETWORK`);
    if (res.ok) {
      const data = await res.json();
      article = data.article;
    } else {
      article = FALLBACK_DETAILS[slug];
    }
  } catch {
    article = FALLBACK_DETAILS[slug];
  }

  if (!article) {
    return {
      title: "아티클을 찾을 수 없음 — K Select Network"
    };
  }

  return {
    title: `${article.seo_title || article.title} — K Select Network`,
    description: article.meta_description || article.excerpt,
  };
}
