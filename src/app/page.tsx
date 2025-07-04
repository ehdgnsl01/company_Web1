// src/app/page.tsx (Next.js App Router)
import React from 'react';

// Fetch home video URL from API
async function fetchHomeVideoUrl(): Promise<string | null> {
  // 직접 Firestore Admin SDK를 사용하여 서버에서 데이터 조회
  const snap = await import('@/lib/firebaseAdmin').then(mod =>
    mod.adminDb.collection('video').doc('home').get()
  );
  if (!snap.exists) return null;
  const data = snap.data() as { videoUrl: string };
  return data.videoUrl;
}

export default async function HomePage() {
  const videoUrl = await fetchHomeVideoUrl();

  return (
    <main className="bg-black min-h-screen flex flex-col items-center">
      <div className="w-full max-w-[1350px] mx-auto">
        {videoUrl ? (
          <video
            src={videoUrl}
            muted
            loop
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="text-white p-4">비디오를 불러오는 중 오류가 발생했습니다.</div>
        )}
      </div>
      {/* TODO: Scroll down to show simplified portfolio */}
    </main>
  );
}
