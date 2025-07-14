// src/app/api/works/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// GET  /api/works/:id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // params를 await로 해제
  const { id } = await context.params;
  try {
    const snap = await adminDb.collection("works").doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id: snap.id, ...(snap.data() as any) });
  } catch (e) {
    console.error(`GET /api/works/${id} 오류`, e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
