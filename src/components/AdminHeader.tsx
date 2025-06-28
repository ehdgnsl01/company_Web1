"use client";
import Link from "next/link";
import React from "react";

interface Props {
  onSignOut: () => void;
}
export default function AdminHeader({ onSignOut }: Props) {
  return (
    <header className="bg-white shadow mb-4">
      <nav className="container mx-auto flex justify-between p-4">
        <Link href="/admin" className="font-bold text-xl">
          관리자
        </Link>
        <div className="space-x-4">
          <Link href="/admin/works">포트폴리오</Link>
          <Link href="/admin/video">홈 영상</Link>
          <button onClick={onSignOut} className="ml-4 text-red-600">
            로그아웃
          </button>
        </div>
      </nav>
    </header>
  );
}
