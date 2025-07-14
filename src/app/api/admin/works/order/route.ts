// src/app/api/admin/works/order/route.ts
import { NextResponse, NextRequest } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function PUT(req: NextRequest) {
  try {
    const { order } = (await req.json()) as { order: string[] };
    const batch = adminDb.batch();
    order.forEach((id, idx) => {
      const ref = adminDb.collection("works").doc(id);
      batch.update(ref, { order: idx });
    });
    await batch.commit();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Order update failed", e);
    return NextResponse.json({ error: "Order update failed" }, { status: 500 });
  }
}
