// src/app/admin/page.tsx
"use client";

import React from "react";

export default function AdminHomePage() {
  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* 각 관리 섹션으로 네비게이션 */}
        <button
          onClick={() => (window.location.href = "/admin/works")}
          className="p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          🎥 포트폴리오 관리
        </button>
        <button
          onClick={() => (window.location.href = "/admin/homevideo")}
          className="p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          📹 홈 영상 관리
        </button>
      </div>
      <div className="w-full">
        <button
          onClick={() => (window.location.href = "/")}
          className="p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          홈페이지로 가기
        </button>
      </div>
    </div>
  );
}
