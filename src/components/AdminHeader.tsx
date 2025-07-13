"use client";
import Link from "next/link";
import React from "react";

interface Props {
  onSignOut: () => void;
}
export default function AdminHeader({ onSignOut }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center h-20">
        <Link href="/admin" className="font-bold text-2xl">
          관리자 페이지
        </Link>
        <div className="space-x-4">
          <Link href="/admin/works" className="cursor-pointer">포트폴리오</Link>
          <Link href="/admin/homevideo" className="cursor-pointer">홈 영상</Link>
          <button onClick={onSignOut} className="ml-4 text-red-600 cursor-pointer">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}
