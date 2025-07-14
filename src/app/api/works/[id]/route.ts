// src/app/api/works/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// GET  /api/works/:id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("▶ API /api/works/[id] 호출됨, id=", params.id);
  const id = params.id;
  try {
    const snap = await getDoc(doc(db, "works", id));
    if (!snap.exists()) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ id: snap.id, ...(snap.data() as any) });
  } catch (error) {
    console.error(`GET /api/works/${id} error`, error);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}
