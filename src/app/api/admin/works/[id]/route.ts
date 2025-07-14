// src/app/api/admin/works/[id]/route.ts
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

// GET  /api/admin/works/:id
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const snap = await adminDb.collection("works").doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id: snap.id, ...(snap.data() as any) });
  } catch (e) {
    console.error(`GET /api/admin/works/${id} error`, e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// PUT  /api/admin/works/:id
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const { title, youtubeUrl, client, thumbnailUrl = "", year } = await req.json();
    const nowStr = formatKRDate(new Date());
    await adminDb.collection("works").doc(id).update({
      title,
      youtubeUrl,
      client,
      thumbnailUrl,
      year,
      date: nowStr,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`PUT /api/admin/works/${id} error`, e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// DELETE  /api/admin/works/:id
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const docRef = adminDb.collection("works").doc(id);
    const snap = await docRef.get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const deletedOrder = (snap.data() as any).order;

    // 1) 해당 문서 삭제
    const batch = adminDb.batch();
    batch.delete(docRef);

    // 2) 이후 order > deletedOrder인 문서 order -1
    const laterSnap = await adminDb.collection("works").where("order", ">", deletedOrder).get();
    laterSnap.docs.forEach((d) => {
      const curr = (d.data() as any).order;
      batch.update(d.ref, { order: curr - 1 });
    });

    await batch.commit();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`DELETE /api/admin/works/${id} error`, e);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
