// GET  /api/admin/works   → 모든 포트폴리오 조회
// POST /api/admin/works   → 새 포트폴리오 추가

import { NextResponse } from "next/server";
import admin from "firebase-admin"; // admin 네임스페이스
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("works").get();
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const ref = await adminDb.collection("works").add({
      ...data,
      date: admin.firestore.FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ id: ref.id }, { status: 201 });
  } catch (e) {
    console.error("POST /api/admin/works 오류", e);
    return NextResponse.json({ error: "추가 실패" }, { status: 500 });
  }
}
