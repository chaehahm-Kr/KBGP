import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const portalApiUrl = process.env.PORTAL_API_URL;
  const secret = process.env.INQUIRY_INTAKE_SECRET;

  if (!portalApiUrl) {
    console.error("[send-verification] PORTAL_API_URL이 설정되지 않았습니다.");
    return NextResponse.json({ ok: false, errors: ["접수 시스템 연결에 실패했습니다."] }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["요청 데이터를 읽을 수 없습니다."] }, { status: 400 });
  }

  try {
    const res = await fetch(`${portalApiUrl}/api/inquiries/send-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: secret ? `Bearer ${secret}` : "",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, errors: json.errors || ["인증번호 발송에 실패했습니다."] }, { status: res.status });
    }

    return NextResponse.json(json);
  } catch (error) {
    console.error("[send-verification] 포털 호출 실패", error);
    return NextResponse.json({ ok: false, errors: ["접수 서버와의 연결에 실패했습니다."] }, { status: 502 });
  }
}
