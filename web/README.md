This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 신청서 접수 → 파트너 포털 연동

"파트너십 신청서" 모달(`components/site/apply/apply-modal.tsx`)이 제출하는
`/api/applications`는 더 이상 로컬 파일시스템에 저장하지 않는다. 대신 K Select
Network 파트너 포털(`KSelectNetwork-Portal`)의 `/api/inquiries`로 서버 간
전달(proxy)한다 — 브라우저는 여전히 이 same-origin 라우트만 호출하므로 CORS
설정이 필요 없다.

포털에 접수된 문의는 `/admin/inquiries`(관리자 전용)에만 보이고, 회사·상품
정보와 접수 확인/내부 알림 이메일까지 여기서 처리된다. **Letusto가 실제 거래를
결정해 "전환"하기 전까지는 어떤 포털 로그인 권한도 생기지 않는다** — 거래할
회사에게만 포털을 제공한다는 원칙을 그대로 구현한 것이다.

필요한 환경변수(`.env.local`):

| 변수 | 용도 |
|---|---|
| `PORTAL_API_URL` | 포털 주소. 로컬 개발은 `http://localhost:3010`, 운영은 `https://portal.kselectnetwork.com` |
| `INQUIRY_INTAKE_SECRET` | 포털의 `/api/inquiries`를 호출할 때 쓰는 공유 시크릿. 포털 쪽 `.env.local`의 같은 이름 변수와 값이 일치해야 한다 |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
