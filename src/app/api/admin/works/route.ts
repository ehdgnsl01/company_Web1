// src/app/api/admin/works/route.ts
import { NextResponse, NextRequest } from "next/server";
import admin from "firebase-admin";
import { adminDb } from "@/lib/firebaseAdmin";

function formatKRDate(d: Date): string {
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// GET  /api/admin/works  → 모든 포트폴리오 조회
export async function GET(req: NextRequest) {
  try {
    // order 필드 기준으로 오름차순 정렬
    const snap = await adminDb.collection("works").orderBy("order", "asc").get();
    const data = snap.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/admin/works error", e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// POST /api/admin/works  → 새 포트폴리오 추가
export async function POST(req: Request) {
  try {
    const {
      title,
      youtubeUrl,
      client,
      thumbnailUrl = "",
      year,
    } = await req.json();
    const nowStr = formatKRDate(new Date());
    const finalThumbnailUrl = thumbnailUrl;

    // 3) Firestore 저장
    const ref = await adminDb.collection("works").add({
      title,
      youtubeUrl,
      client,
      thumbnailUrl: finalThumbnailUrl,
      year,
      date: nowStr,
    });

    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/works 오류", e);
    return NextResponse.json({ error: "추가 실패" }, { status: 500 });
  }
}
