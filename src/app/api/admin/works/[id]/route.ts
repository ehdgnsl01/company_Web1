// src/app/api/admin/works/[id]/route.ts
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

// GET    /api/admin/works/:id  → 단일 포트폴리오 조회
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const snap = await adminDb.collection("works").doc(id).get();
    if (!snap.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const data = snap.data() as {
      title: string;
      youtubeUrl: string;
      client: string;
      thumbnailUrl: string;
      year: string;
      date: string;
    };
    return NextResponse.json({
      id: snap.id,
      title: data.title,
      youtubeUrl: data.youtubeUrl,
      client: data.client,
      thumbnailUrl: data.thumbnailUrl,
      year: data.year,
      date: data.date,
    });
  } catch (e) {
    console.error(`GET /api/admin/works/${id} 오류`, e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// PUT    /api/admin/works/:id  → 단일 포트폴리오 수정
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const {
      title,
      youtubeUrl,
      client,
      thumbnailUrl = "",
      year,
    } = await request.json();
    const nowStr = formatKRDate(new Date());

    const docRef = adminDb.collection("works").doc(id);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data() as { thumbnailUrl?: string };
      const oldUrl = data.thumbnailUrl;
      if (oldUrl && thumbnailUrl && oldUrl !== thumbnailUrl) {
        try {
          const encoded = oldUrl.split("/o/")[1].split("?")[0];
          const filePath = decodeURIComponent(encoded);
          const bucket = admin.storage().bucket();
          await bucket.file(filePath).delete();
        } catch (err) {
          console.error(`기존 썸네일 삭제 중 오류 (${oldUrl}):`, err);
        }
      }
    }

    await docRef.update({
      title,
      youtubeUrl,
      client,
      thumbnailUrl,
      year,
      date: nowStr,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(`PUT /api/admin/works/${id} 오류`, e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// DELETE /api/admin/works/:id  → 단일 포트폴리오 삭제
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const docRef = adminDb.collection("works").doc(id);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data() as { thumbnailUrl?: string };
      if (data.thumbnailUrl) {
        const encoded = data.thumbnailUrl.split("/o/")[1].split("?")[0];
        const filePath = decodeURIComponent(encoded);
        try {
          const bucket = admin.storage().bucket();
          console.log("Using storage bucket:", bucket.name);
          await bucket.file(filePath).delete();
        } catch (storageErr) {
          console.error(`Storage 삭제 중 오류 (${filePath}):`, storageErr);
        }
      }
    }

    await docRef.delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`DELETE /api/admin/works/${id} 오류`, error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
