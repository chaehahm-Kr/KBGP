# Claude Code 요청 프롬프트 — 내비게이션 정리 + BENEFITS 섹션 신규

> 아래 `---` 사이 전체를 Claude Code에 그대로 붙여넣으세요.

---

K Select Network 사이트에서 두 가지 작업을 한다. 저장소의 기존 코드와 디자인 토큰을 기준으로 하고, `DESIGN.md`가 있으면 그것을 우선한다.

## 작업 A — 상단 내비게이션 축소

현재 상단 메뉴가 `PROGRAM / LETUSTO / POLICY / PROCESS / ELIGIBILITY / FAQ` 6개로 늘어나 시각적으로 무겁다. 다음과 같이 2단으로 재편한다.

**최상단 메뉴 (3개 + CTA):**

```
K Select Network    KBG PROGRAM ▾    LETUSTO    FAQ        [KR/EN]  [파트너 신청]
```

- `PROGRAM` → **`KBG PROGRAM`** 으로 명칭 변경 (K-Beauty Growth Program의 약자)
- 기존 최상단에 있던 `POLICY`, `PROCESS`, `ELIGIBILITY`는 최상단에서 제거하고 `KBG PROGRAM` 드롭다운 안으로 이동

**`KBG PROGRAM` 드롭다운 항목 (이 순서를 지킬 것):**

| 순서 | 라벨 | 앵커 | 서브텍스트 (드롭다운에 함께 표시) |
|---|---|---|---|
| 1 | ABOUT | `#program-two-phases` | 먼저 300개로 검증하고, 그 결과 위에서 확대합니다. |
| 2 | POLICY | `#policy` | 상권 보호 · First Order Protection |
| 3 | BENEFITS | `#benefits` | 중소 브랜드가 실제로 얻는 것 |
| 4 | PROCESS | `#process` | 테스트 파트너십 → 본 파트너십 |
| 5 | ELIGIBILITY | `#eligibility` | 참여 조건 6가지 · 자가진단 |

- `ABOUT`은 기존 `Program — Two Phases` 섹션으로 스무스 스크롤 점프한다. 해당 섹션에 `id="program-two-phases"`와 `scroll-margin-top`(고정 내비 높이 + 24px)을 부여해 헤더에 가려지지 않게 한다.
- 드롭다운은 각 항목에 라벨 + 서브텍스트 2줄 구조. 라벨은 대문자 라틴 마이크로 라벨 스타일, 서브텍스트는 보조 텍스트 색.
- 데스크톱은 hover + focus 양쪽으로 열리게 하고, 모바일은 아코디언으로 펼친다.
- **접근성 필수:** 트리거는 `<button aria-expanded aria-controls>`, 메뉴는 `role="menu"`. 키보드 `Tab`/`Arrow`/`Esc` 동작, 포커스 트랩 없이 `Esc`로 닫힘, 포커스 링 유지. hover만으로 접근 가능한 메뉴는 만들지 않는다.
- 현재 보고 있는 섹션에 해당하는 드롭다운 항목은 IntersectionObserver로 활성 표시한다.

> 참고: 원 요청에 `PROGRESS`로 적혀 있었으나 실제 섹션명은 `PROCESS`다. `PROCESS`로 통일한다.

## 작업 B — BENEFITS 섹션 신규 생성

`POLICY` 섹션과 `PROCESS` 섹션 **사이**에 새 섹션을 삽입한다. `id="benefits"`.

### 섹션 제목

- 상단 마이크로 라벨: `BENEFITS`
- 제목: **중소 브랜드가 얻는 구체적 가치**
- 리드 1줄: 혜택을 약속으로 말하지 않고, 구조로 말합니다.

### 6개 항목 (문구 그대로 사용, 창작 금지)

1. 소량으로 시작해 시장 반응을 확인할 수 있는 낮은 진입장벽
2. 파트너십 확정 즉시 제공되는 시장·경쟁사·가격 분석 리포트
3. 주간/월간 실판매 데이터에 기반한 투명한 발주 확대 구조
4. Store-in-a-Store 진열을 통한 실질적인 매대 확보와 브랜드 노출
5. 상권 보호 정책을 통한 가격 통제력 및 브랜드 이미지 보호
6. 대형 브랜드 사이에 묻히지 않고 브랜드 고유의 정체성을 유지하는 큐레이션 방식

레이아웃은 2열 × 3행. 각 항목은 배경 카드 없이 **얇은 체크 마크 + 1px hairline 구분선**으로만 구획한다. 카드 그림자와 카드 배경을 쓰지 않는다. `Store-in-a-Store`는 고유 정책명이므로 표기를 그대로 유지한다.

### 그 아래 — 역방향 신뢰 블록 (이 섹션의 핵심)

6개 항목 아래에 전폭 강조 블록을 하나 더 놓는다. 이 사이트에서 가장 강한 신뢰 장치이므로, 위 6개와 **다른 시각적 층**으로 처리한다 — 다크 배경 밴드 또는 좌측 두꺼운 액센트 바를 가진 대형 인용 블록.

- 상단 마이크로 라벨: `THE HONEST PART`
- 제목: **"지금은 진출하지 마십시오"라는 결론도 드립니다**
- 본문:
  > 10개 매장과 온라인에서 300개를 실제로 판매하면, 가격 저항과 리뷰 반응, 재구매율이 데이터로 남습니다. 그 데이터가 "아직 아니다"라고 말할 때 우리는 그대로 전달합니다. 무엇을 고쳐야 하는지, 어느 시점에 다시 시작해야 하는지까지 함께 정리해 드립니다.
  >
  > 대량 생산과 마케팅 비용을 쏟은 뒤에 아는 것과, 300개로 미리 아는 것의 차이가 이 프로그램의 실질적인 가치입니다.
- 하단 한 줄 강조: **판매를 권하는 파트너는 많습니다. 판매를 미루라고 말할 수 있는 파트너는 드뭅니다.**

제목 대안 (톤을 보고 하나 선택, 나에게 3안을 보여줘도 좋다):
- `"지금은 진출하지 마십시오"라는 결론도 드립니다`
- `300개는 갈 때를 알려주고, 가지 말아야 할 때도 알려줍니다`
- `우리가 드리는 리포트에는 "아직 아니다"도 있습니다`

## 모션 요구사항

아래 패턴으로 구현한다. 참조 코드(`hero-section-9`)의 **모션 구조만 차용하고 비주얼은 차용하지 않는다.**

```
containerVariants: staggerChildren 0.08
itemVariants: { opacity: 0 → 1, y: 16 → 0 }, duration 0.5, ease [0.16, 1, 0.3, 1]
트리거: whileInView, viewport={{ once: true, amount: 0.3 }}
```

- 6개 항목은 좌→우, 위→아래 순서로 스태거 등장
- 역방향 신뢰 블록은 6개 항목이 모두 등장한 뒤 살짝 늦게(delay 0.2s) 진입
- `prefers-reduced-motion: reduce`에서는 애니메이션 없이 즉시 최종 상태로 렌더한다. 이건 옵션이 아니라 필수다.

## 참조 코드에서 반드시 제거할 것

내가 참조로 준 `hero-section-9` 컴포넌트에는 이 프로젝트 규칙과 충돌하는 요소가 있다. 다음은 **가져오지 않는다.**

- `floatingVariants`의 `repeat: Infinity` 무한 부유 애니메이션 → 이 사이트는 무한 루프 모션을 쓰지 않는다. 뷰포트 진입 시 1회만.
- 파란색·보라색·초록색 반투명 장식 블롭(`bg-blue-200/50`, `bg-purple-200/50`, `bg-green-200/50`) → 전부 삭제. 장식 도형을 쓰지 않는다.
- Unsplash 스톡 이미지 및 이미지 콜라주 → 스톡 사진을 쓰지 않는다. 이 섹션에는 이미지가 들어가지 않는다.
- `rounded-2xl`, `shadow-lg` → 라운드는 12px 이하, 라이트 섹션에 그림자를 쓰지 않는다.
- `scale` 기반 등장(`imageVariants`) → `opacity` + `translateY`만 사용한다.

가져올 것은 `framer-motion`의 `containerVariants` / `itemVariants` 스태거 구조와 `whileInView` 패턴, 그리고 props로 데이터를 받는 재사용 가능한 컴포넌트 구조뿐이다.

## 색상과 타이포에 대한 지시

**새로운 색을 도입하지 마라.** 저장소에 이미 정의된 디자인 토큰(CSS 변수 또는 Tailwind theme)만 사용한다. 하드코딩된 HEX를 새로 추가하지 않는다. 필요한 토큰이 없다면 새 값을 만들지 말고 나에게 물어봐라.

한글 조판은 기존 규칙을 그대로 따른다 — 대형 텍스트는 `letter-spacing: -0.035em`, `line-height: 1.16`, `word-break: keep-all`. 본문은 `line-height: 1.7`. 이미 유틸리티 클래스가 있으면 재사용한다.

액센트 색은 이 섹션 전체에서 **최대 2회**만 쓴다. 체크 마크 6개를 모두 액센트로 칠하지 마라 — 체크는 본문 색 또는 보조 색으로 하고, 액센트는 역방향 신뢰 블록의 강조 한 곳에만 쓴다.

## 기술 스택 확인 및 셋업

작업 전에 저장소 상태를 확인하고, 없는 것만 설치한다.

1. `package.json`, `tsconfig.json`, `tailwind.config.*`, `components.json`을 읽어 TypeScript / Tailwind / shadcn 셋업 여부를 확인한다.
2. shadcn이 없으면 `npx shadcn@latest init`으로 초기화하고, 컴포넌트 경로가 `@/components/ui`가 되도록 `components.json`의 alias를 맞춘다. shadcn 컴포넌트는 `@/components/ui` 규약을 따라야 CLI로 추가·업데이트가 정상 동작한다.
3. 없는 의존성만 설치: `framer-motion`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`. 드롭다운은 직접 구현하거나 `@radix-ui/react-navigation-menu`를 쓴다 — 접근성 요구사항을 직접 구현하기보다 Radix를 쓰는 편을 권한다.
4. `@/lib/utils`의 `cn` 헬퍼가 없으면 생성한다.
5. 아이콘은 `lucide-react`만 사용한다. 이모지를 아이콘으로 쓰지 않는다.

## 파일 구조

```
components/ui/               ← shadcn 프리미티브 (button, navigation-menu 등)
components/site/nav/         ← SiteHeader, KbgProgramDropdown
components/site/sections/    ← BenefitsSection, HonestAssessmentBlock
lib/nav-config.ts            ← 메뉴 구조를 데이터로 분리 (라벨·앵커·서브텍스트)
lib/benefits-data.ts         ← 6개 항목을 배열로 분리
```

내비게이션 구조와 BENEFITS 항목은 **JSX에 하드코딩하지 말고 데이터 배열로 분리**한다. 영문 토글을 나중에 붙일 때 문구만 교체하면 되도록.

## 완료 조건

작업을 마치면 다음을 확인하고 보고해라.

- [ ] 최상단 메뉴가 3개(+CTA)로 줄어들고 데스크톱 1280px에서 워드마크·메뉴·CTA가 한 줄에 여유롭게 들어간다
- [ ] `KBG PROGRAM` 드롭다운 5개 항목이 각각 올바른 섹션으로 스크롤되고, 고정 헤더에 제목이 가려지지 않는다
- [ ] 키보드만으로 드롭다운 열기·이동·닫기(`Esc`)가 가능하다
- [ ] `BENEFITS` 섹션이 `POLICY`와 `PROCESS` 사이에 위치한다
- [ ] `prefers-reduced-motion: reduce`에서 모든 등장 애니메이션이 즉시 최종 상태로 렌더된다
- [ ] 새로 추가한 코드에 하드코딩된 HEX 색상값이 없다
- [ ] 모바일 375px에서 드롭다운이 아코디언으로 동작하고 BENEFITS가 1열로 떨어진다
- [ ] `npm run build`와 타입 체크가 통과한다

작업 후 변경한 파일 목록과, 위 체크리스트 중 확인하지 못한 항목을 솔직하게 알려줘라.

---

## 참고 — 원본 컴포넌트 코드

Claude Code가 모션 패턴을 참조할 수 있도록 아래를 함께 전달해도 되지만, **위의 "참조 코드에서 반드시 제거할 것" 목록이 우선한다**는 점을 함께 붙여야 한다. 코드가 길어 프롬프트를 무겁게 만들 뿐이라면, 위 프롬프트의 "모션 요구사항" 블록만으로도 충분하다. 실제로 필요한 것은 variants 3줄이다.
