import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          style={{ width: "100%", height: "100%" }}
        >
          {/* 오직 회색 체크 마크만 단독 렌더링 */}
          <path
            d="M 18 52 L 48 82 L 90 28"
            stroke="#8a93a6"
            strokeWidth="18"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
