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
    src: null, // '/images/hero/store-exterior.jpg' 로 교체
    alt: "미국 현지 Beauty Supply 매장 외관",
    caption: "Beauty Supply 매장 외관",
    ratio: "4:3",
  },
  storeInStore: {
    src: null, // '/images/hero/store-in-store.jpg' 로 교체
    alt: "K-Beauty 전용 Store-in-a-Store 진열대",
    caption: "Store-in-a-Store 진열",
    ratio: "1:1",
  },
};
