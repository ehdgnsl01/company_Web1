// src/app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        홈으로 돌아가기
      </Link>
    </main>
  );
}
