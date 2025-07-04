// src/app/api/admin/video/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

const DOC_ID = 'home'; // 고정된 홈 비디오 문서 ID

// GET  /api/admin/video  → 현재 홈 비디오 URL 조회
export async function GET() {
  try {
    const snap = await adminDb.collection('video').doc(DOC_ID).get();
    if (!snap.exists) {
      return NextResponse.json({ videoUrl: null }, { status: 200 });
    }
    const data = snap.data() as { videoUrl: string };
    return NextResponse.json({ id: snap.id, videoUrl: data.videoUrl });
  } catch (e) {
    console.error('GET /api/admin/video 오류', e);
    return NextResponse.json({ error: '조회 실패' }, { status: 500 });
  }
}

// PUT  /api/admin/video  → 홈 비디오 URL 업데이트
export async function PUT(req: Request) {
  try {
    const { videoUrl } = await req.json();
    await adminDb
      .collection('video')
      .doc(DOC_ID)
      .set({ videoUrl, updatedAt: new Date().toLocaleString('ko-KR') }, { merge: true });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('PUT /api/admin/video 오류', e);
    return NextResponse.json({ error: '업데이트 실패' }, { status: 500 });
  }
}
