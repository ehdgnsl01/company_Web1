// src/app/api/works/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// GET  /api/works/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // params를 await로 해제
  const { id } = await context.params;

  try {
    const snap = await getDoc(doc(db, "works", id));
    if (!snap.exists()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // 정상 데이터 응답 + 브라우저 캐시 1시간 설정
    const res = NextResponse.json(
      { id: snap.id, ...(snap.data() as any) },
      { status: 200 }
    );
    res.headers.set("Cache-Control", "public, max-age=3600");
    return res;
  } catch (e) {
    console.error(`GET /api/works/${id} 오류`, e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
