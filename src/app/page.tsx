// src/app/page.tsx
import React from "react";

export default function HomePage() {
  // 1) .env에 NEXT_PUBLIC_FB_STORAGE_BUCKET=your-project-id.appspot.com
  const bucket = process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET!;
  // 2) Storage 다운로드 URL을 직접 구성
  const videoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    "home/home.mp4"
  )}?alt=media`;

  return (
    <main className="bg-black min-h-screen flex flex-col items-center">
      <div className="w-full mx-auto">
        {/* 자동 재생, 무음, 반복, 인라인 재생 */}
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full mx-auto max-w-[1350px]">
        <div className="bg-red-500">
        </div>
      </div>
      {/* 아래로 스크롤 시 포트폴리오 간단 영역 추가 예정 */}
    </main>
  );
}
