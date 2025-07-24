// src/app/api/admin/works/route.ts
import { NextResponse, NextRequest } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

function formatKRDate(d: Date): string {
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// GET  /api/admin/works  → 모든 포트폴리오 조회 (order 기준)
export async function GET(req: NextRequest) {
  try {
    const snap = await adminDb.collection("works").orderBy("order", "asc").get();
    const data = snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as any) }));
    return NextResponse.json(data);
  } catch (e) {
    console.error("GET /api/admin/works error", e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// POST /api/admin/works  → 새 포트폴리오 추가 (dynamic order)
export async function POST(req: NextRequest) {
  try {
    // Client, Year 필요X (사장님 요청사항)
    //const { title, youtubeUrl, client, thumbnailUrl = "", year, category } = await req.json();
    const { title, youtubeUrl, thumbnailUrl = "", category } = await req.json();
    const nowStr = formatKRDate(new Date());

    // 1) 기존 문서 order 모두 +1
    const allSnap = await adminDb.collection("works").get();
    const batch = adminDb.batch();
    allSnap.docs.forEach((doc) => {
      const curr = (doc.data() as any).order ?? 0;
      batch.update(doc.ref, { order: curr + 1 });
    });

    // 2) 새 문서 order 0 으로 추가
    const newRef = adminDb.collection("works").doc();
    batch.set(newRef, {
      title,
      youtubeUrl,
      //client,
      //year,
      thumbnailUrl,
      date: nowStr,
      order: 0,
      category,
    });

    await batch.commit();
    return NextResponse.json({ id: newRef.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/works error", e);
    return NextResponse.json({ error: "추가 실패" }, { status: 500 });
  }
}