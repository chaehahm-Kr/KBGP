# K Select Network — K-Beauty Growth Program

Letusto Inc.가 운영하는 K-Beauty 유통 플랫폼 **K Select Network**의 파트너 모집 웹사이트.
한국 중소·인디 뷰티 브랜드를 대상으로 프로그램을 소개하고, 참여 자격 자가진단을 거쳐 신청·미팅으로 연결한다.

## 구조

| 경로 | 내용 |
|---|---|
| `web/` | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 구현 |
| `DESIGN.md` | 디자인 시스템 기준 문서. 컬러·타이포·한글 조판 규칙의 최상위 기준 |
| `CLAUDE_DESIGN_PROMPTS.md` | Claude Design 운영 가이드 및 프롬프트 세트 |

`DESIGN.md`가 상위 기준 문서다. 다른 문서와 충돌하면 `DESIGN.md`를 따른다.

## 실행

```bash
npm --prefix web install
npm --prefix web run dev
```

http://localhost:3000 에서 확인한다.

```bash
npm --prefix web run build
```

## 라우트

| 경로 | 화면 |
|---|---|
| `/` | 홈 — 히어로 · Why Letusto · 프로그램 2단계 · 정책 · 절차 · 카테고리 · 자가진단 · FAQ · 신청 CTA |
| `/apply/check` | 참여 자격 자가진단 (집중 모드). 6개 조건 충족 시 접수 CTA 활성화 |

## 구현 규칙

- **디자인 토큰은 CSS 변수로만.** `web/app/globals.css`의 `:root`에 선언하고 `@theme inline`으로 Tailwind에 매핑한다. 컴포넌트에 색상 하드코딩 금지.
- **문구와 숫자는 `web/lib/content.ts`에 모은다.** 컴포넌트에 카피를 직접 쓰지 않는다. 섹션 라벨(`Policy — 04` 등)도 데이터 길이에서 파생시켜 문서와 화면이 어긋나지 않게 한다.
- **한글 대형 조판은 `display-kr` 유틸리티로.** `word-break: keep-all`, 자간 `-0.04em`, 행간 `1.28`. 헤드라인 줄바꿈은 의미 단위로 `<br>` 수동 삽입.
- **액센트(`--accent`)는 한 화면에 최대 2회.** 배경 그라디언트나 큰 컬러 블록에 쓰지 않는다.
- `prefers-reduced-motion: reduce`를 반드시 처리한다.

## 남은 작업

- 매장 실사진 3컷 (Beauty Supply 매장 외관 · Store-in-a-Store 진열 · 제품 진열대). 확보 전까지 히어로 2개 슬롯이 플레이스홀더다
- 신뢰 근거 보강 — 매장 목록, 사업자 정보, 한국 지사 연락처
- 스크롤 진입 애니메이션 및 지표 count-up (`DESIGN.md` §8)
- EN 토글이 아직 표시만 되고 동작하지 않는다
- 신청폼(`/apply/form`)과 미팅 예약(Microsoft Bookings 임베드) — 현재 미팅 예약은 mailto로 연결
- 소개서 PDF와 사이트 간 플랫폼 명칭 통일 (PDF: "K-Beauty Retail Network" / 사이트: "K Select Network")

## 참고

`DESIGN.md` §3은 `slate`를 `#6b6e76`으로 지정하지만, `paper-raised` 배경에서 4.48:1로 WCAG AA(4.5:1)에 미달한다.
구현에서는 `#666970`으로 한 단계 어둡게 조정했다 (`web/app/globals.css` 주석 참고).
