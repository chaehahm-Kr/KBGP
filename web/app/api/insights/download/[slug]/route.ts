import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const portalApiUrl = process.env.PORTAL_API_URL || "http://localhost:3010";
    const preview = request.nextUrl.searchParams.get("preview");
    const targetUrl = `${portalApiUrl}/api/insights/download/${encodeURIComponent(slug)}${
      preview ? `?preview=${encodeURIComponent(preview)}` : ""
    }`;

    const upstream = await fetch(targetUrl, {
      cache: "no-store",
    });

    if (!upstream.ok) {
      const errBody = await upstream.json().catch(() => ({
        error: "PDF 가이드 파일을 현재 다운로드할 수 없습니다.",
      }));
      return NextResponse.json(errBody, { status: upstream.status });
    }

    const headers = new Headers();
    const contentType = upstream.headers.get("content-type") || "application/pdf";
    const contentDisposition = upstream.headers.get("content-disposition");
    const contentLength = upstream.headers.get("content-length");
    const etag = upstream.headers.get("etag");

    headers.set("Content-Type", contentType);
    if (contentDisposition) headers.set("Content-Disposition", contentDisposition);
    if (contentLength) headers.set("Content-Length", contentLength);
    if (etag) headers.set("ETag", etag);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set(
      "Cache-Control",
      preview
        ? "private, no-store, max-age=0"
        : "public, max-age=300, stale-while-revalidate=600"
    );

    const arrayBuffer = await upstream.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers,
    });
  } catch (err) {
    console.error("Public PDF download proxy error:", err);
    return NextResponse.json(
      { error: "PDF 다운로드 연결 중 일시적인 오류가 발생했습니다." },
      { status: 502 }
    );
  }
}
