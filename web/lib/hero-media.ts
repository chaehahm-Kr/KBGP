/**
 * 히어로 이미지 슬롯 데이터.
 * 실사진이 들어오면 public/images/hero/ 에 파일을 넣고 아래 `src` 만
 * 교체하면 된다. 그 외 코드는 손대지 않는다.
 */
export type HeroRatio = "4:3" | "1:1";

export type HeroSlot = {
  src: string | null;
  alt: string;
  caption: string;
  ratio: HeroRatio;
};

export const heroMedia: Record<"storeExterior" | "storeInStore", HeroSlot> = {
  storeExterior: {
    /* 실사진 확보 후 '/images/hero/store-exterior.jpg' 로 교체한다.
       파일이 없는 동안 경로를 넣어 두면 안 된다 — onError 폴백은 하이드레이션
       이후에만 동작하므로 SSR 단계에서 빈 프레임이 먼저 보이고, priority
       preload 가 실패해 LCP 지표까지 나빠진다. */
    src: null,
    alt: "미국 현지 K Select Beauty Supply 매장 외관",
    caption: "Beauty Supply 매장 외관",
    ratio: "4:3",
  },
  storeInStore: {
    // 실사진 확보 후 '/images/hero/store-in-store.jpg' 로 교체한다.
    src: null,
    alt: "K-Beauty 전용 Store-in-a-Store 진열대",
    caption: "Store-in-a-Store 진열",
    ratio: "1:1",
  },
};
