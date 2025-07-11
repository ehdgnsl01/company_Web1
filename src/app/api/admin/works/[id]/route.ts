// src/app/api/admin/works/[id]/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import admin from "firebase-admin";

function formatKRDate(d: Date): string {
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// GET    /api/admin/works/:id  → 단일 포트폴리오 조회
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const snap = await adminDb.collection("works").doc(params.id).get();
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
    console.error(`GET /api/admin/works/${params.id} 오류`, e);
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

// PUT    /api/admin/works/:id  → 단일 포트폴리오 수정
export async function PUT(req: Request, context: { params: { id: string } }) {
  // 1) context에서 id 추출
  const {
    params: { id },
  } = await context;
  try {
    // 2) 요청 바디에서 새 필드들 가져오기
    const {
      title,
      youtubeUrl,
      client,
      thumbnailUrl = "", // 비어있으면 빈 문자열
      year,
    } = await req.json();
    const nowStr = formatKRDate(new Date());

    // 3) Firestore에서 기존 문서 조회
    const docRef = adminDb.collection("works").doc(id);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data() as { thumbnailUrl?: string };
      const oldUrl = data.thumbnailUrl;
      // 새 URL이 있고(oldUrl과 다르다면), 기존 파일 경로 파싱해서 삭제
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

    // 4) Firestore 문서 업데이트
    await docRef.update({
      title,
      youtubeUrl,
      client,
      thumbnailUrl,
      year,
      date: nowStr, // 수정 일자 갱신
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`PUT /api/admin/works/${id} 오류`, e);
    return NextResponse.json({ error: "수정 실패" }, { status: 500 });
  }
}

// DELETE /api/admin/works/:id  → 단일 포트폴리오 삭제
export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  const {
    params: { id },
  } = await context;
  try {
    // 1. Firestore에서 문서 조회
    const docRef = adminDb.collection("works").doc(id);
    const snap = await docRef.get();
    if (snap.exists) {
      const data = snap.data() as { thumbnailUrl?: string };
      if (data.thumbnailUrl) {
        // 2) 스토리지 파일 경로 파싱
        const encoded = data.thumbnailUrl.split("/o/")[1].split("?")[0];
        const filePath = decodeURIComponent(encoded);

        try {
          // 3) 파일 삭제
          const bucket = admin.storage().bucket();
          console.log("Using storage bucket:", bucket.name);
          await bucket.file(filePath).delete();
        } catch (storageErr) {
          console.error(`Storage 삭제 중 오류 (${filePath}):`, storageErr);
          // 계속 진행
        }
      }
    }

    // 4) Firestore 문서 삭제
    await adminDb.collection("works").doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/admin/works/${id} 오류`, error);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
