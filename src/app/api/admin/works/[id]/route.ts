// src/app/api/admin/works/[id]/route.ts
import { NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { adminDb } from '@/lib/firebaseAdmin';

function formatKRDate(d: Date): string {
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
}

// GET    /api/admin/works/:id  → 단일 포트폴리오 조회
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const snap = await adminDb.collection('works').doc(params.id).get();
  if (!snap.exists) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ id: snap.id, ...(snap.data() as any) });
}

// PUT    /api/admin/works/:id  → 단일 포트폴리오 수정
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, youtubeUrl, client, thumbnailUrl = '', year } = await req.json();
    const nowStr = formatKRDate(new Date());
    await adminDb.collection('works').doc(params.id).update({
      title,
      youtubeUrl,
      client,
      thumbnailUrl,
      year,
      date: nowStr,  // 수정 시에도 문자열로 덮어쓰기
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`PUT /api/admin/works/${params.id} 오류`, e);
    return NextResponse.json({ error: '수정 실패' }, { status: 500 });
  }
}

// DELETE /api/admin/works/:id  → 단일 포트폴리오 삭제
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await adminDb.collection('works').doc(params.id).delete();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(`DELETE /api/admin/works/${params.id} 오류`, e);
    return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
  }
}
