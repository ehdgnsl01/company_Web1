// src/app/api/admin/works/route.ts
import { NextResponse } from "next/server";
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
export async function GET() {
  try {
    const snap = await adminDb.collection("works").get();
    const all = snap.docs.map((d) => {
      const data = d.data() as {
        title: string;
        youtubeUrl: string;
        client: string;
        thumbnailUrl: string;
        year: string;
        date: string;
      };
      return {
        id: d.id,
        title: data.title,
        youtubeUrl: data.youtubeUrl,
        client: data.client,
        thumbnailUrl: data.thumbnailUrl,
        year: data.year,
        date: data.date,
      };
    });
    return NextResponse.json(all);
  } catch (e) {
    console.error("GET /api/admin/works 에러:", e);
    return NextResponse.json(
      { error: "포트폴리오 목록 조회 중 서버 오류가 발생했습니다." },
      { status: 500 }
    );
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
