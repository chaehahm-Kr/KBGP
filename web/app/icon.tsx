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
          viewBox="0 0 200 200"
          style={{ width: "100%", height: "100%" }}
        >
          {/* 사각형 프레임 */}
          <path
            d="M 112 170 H 30 V 30 H 170 V 112"
            stroke="#111111"
            strokeWidth="16"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
          />
          {/* K 자 */}
          <path
            d="M 70 55 H 88 V 95 L 123 55 H 142 L 103 98 L 143 145 H 124 L 88 103 V 145 H 70 Z"
            fill="#111111"
          />
          {/* 체크 마크 */}
          <path
            d="M 120 148 L 142 170 L 170 120"
            stroke="#8a93a6"
            strokeWidth="16"
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
