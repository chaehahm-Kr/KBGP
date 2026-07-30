/**
 * 사진이 없는 동안 슬롯을 채우는 SVG 폴백.
 * 대각선 스트라이프 플레이스홀더는 "이미지 없음"으로 읽혀 신뢰를 깎으므로
 * 계산된 도형으로 대체한다 (DESIGN.md §7).
 * 색은 전부 토큰(CSS 변수)을 참조한다.
 */

export function StoreNetworkFallback() {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label="미국 내 운영 거점과 확장 예정 상권을 표시한 매장 네트워크 도식"
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* 배경 그리드 */}
      <g stroke="var(--hairline)" strokeWidth="1">
        <line x1="0" y1="75" x2="400" y2="75" />
        <line x1="0" y1="150" x2="400" y2="150" />
        <line x1="0" y1="225" x2="400" y2="225" />
        <line x1="100" y1="0" x2="100" y2="300" />
        <line x1="200" y1="0" x2="200" y2="300" />
        <line x1="300" y1="0" x2="300" y2="300" />
      </g>

      {/* 추상화한 미국 본토 윤곽 */}
      <path
        d="M58 108 L104 92 L150 86 L206 84 L262 90 L306 84 L342 96 L336 128 L344 158 L320 186 L286 208 L242 216 L196 212 L152 200 L112 178 L78 152 Z"
        fill="none"
        stroke="var(--slate)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* 확장 예정 상권 — 1px 링 */}
      <g fill="none" stroke="var(--slate)" strokeWidth="1.5">
        <circle cx="126" cy="150" r="7" />
        <circle cx="196" cy="176" r="7" />
        <circle cx="252" cy="126" r="7" />
      </g>

      {/* 현재 거점 — 채운 원 (동부 NJ · NY · PA) */}
      <g fill="var(--graphite)">
        <circle cx="308" cy="112" r="5.5" />
        <circle cx="298" cy="132" r="5.5" />
        <circle cx="316" cy="148" r="5.5" />
      </g>

      <text
        x="330"
        y="106"
        fill="var(--graphite)"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        NJ · NY · PA
      </text>

      <text
        x="376"
        y="282"
        textAnchor="end"
        fill="var(--slate)"
        fontSize="10"
        fontWeight="500"
        letterSpacing="1.8"
        fontFamily="var(--font-sans)"
      >
        10 STORES · 3 COUNTRIES
      </text>
    </svg>
  );
}

export function ShelfBayFallback() {
  // 선반 4단. 한 구획만 액센트로 채워 "이 자리가 당신의 섹션"을 표현한다.
  const tiers = [56, 112, 168, 224];

  return (
    <svg
      viewBox="0 0 300 300"
      role="img"
      aria-label="매대 선반 4단 중 한 구획이 브랜드 전용으로 배정된 Store-in-a-Store 진열 도식"
      className="size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* 진열장 외곽 */}
      <rect
        x="40"
        y="32"
        width="220"
        height="224"
        fill="none"
        stroke="var(--slate)"
        strokeWidth="1.25"
      />

      {/* 선반 단 */}
      <g stroke="var(--slate)" strokeWidth="1.25">
        {tiers.map((y) => (
          <line key={y} x1="40" y1={y} x2="260" y2={y} />
        ))}
      </g>

      {/* 세로 구획선 */}
      <g stroke="var(--hairline)" strokeWidth="1">
        <line x1="113" y1="32" x2="113" y2="256" />
        <line x1="186" y1="32" x2="186" y2="256" />
      </g>

      {/* 배정된 전용 구획 */}
      <rect x="114" y="113" width="71" height="54" fill="var(--accent)" />

      {/* 다른 구획의 제품 실루엣 */}
      <g fill="var(--hairline)">
        <rect x="52" y="36" width="10" height="18" />
        <rect x="66" y="40" width="10" height="14" />
        <rect x="80" y="34" width="10" height="20" />
        <rect x="196" y="38" width="10" height="16" />
        <rect x="210" y="34" width="10" height="20" />
        <rect x="52" y="92" width="10" height="18" />
        <rect x="66" y="96" width="10" height="14" />
        <rect x="196" y="90" width="10" height="20" />
        <rect x="52" y="204" width="10" height="18" />
        <rect x="66" y="200" width="10" height="22" />
        <rect x="196" y="204" width="10" height="18" />
        <rect x="210" y="198" width="10" height="24" />
      </g>

      <text
        x="150"
        y="282"
        textAnchor="middle"
        fill="var(--slate)"
        fontSize="10"
        fontWeight="500"
        letterSpacing="1.8"
        fontFamily="var(--font-sans)"
      >
        STORE-IN-A-STORE
      </text>
    </svg>
  );
}
