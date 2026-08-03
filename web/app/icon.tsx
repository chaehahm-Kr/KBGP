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
            d="M 112 162 H 38 V 38 H 162 V 112"
            stroke="#111111"
            strokeWidth="16"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
          {/* K 자 */}
          <path
            d="M 72 60 H 90 V 98 L 123 60 H 142 L 105 100 L 143 140 H 124 L 90 102 V 140 H 72 Z"
            fill="#111111"
          />
          {/* 체크 마크 */}
          <path
            d="M 105 142 L 132 168 L 174 114"
            stroke="#8a93a6"
            strokeWidth="16"
            strokeLinecap="square"
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
