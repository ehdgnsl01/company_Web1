// GET    /api/admin/works/:id  → 단일 포트폴리오 조회
// PUT    /api/admin/works/:id  → 단일 포트폴리오 수정
// DELETE /api/admin/works/:id  → 단일 포트폴리오 삭제

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const snap = await adminDb.collection("works").doc(params.id).get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ id: snap.id, ...snap.data() });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    await adminDb.collection("works").doc(params.id).update(data);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`PUT /api/admin/works/${params.id} 오류`, e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await adminDb.collection("works").doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`DELETE /api/admin/works/${params.id} 오류`, e);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
