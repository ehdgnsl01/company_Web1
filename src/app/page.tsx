// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

import OurService from "@/components/OurService";
import PortfolioMain from "@/components/PortfolioMain";

export default function HomePage() {
  // 1) .env에 NEXT_PUBLIC_FB_STORAGE_BUCKET=your-project-id.appspot.com
  const bucket = process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET!;
  // 2) Storage 다운로드 URL을 직접 구성
  const videoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
    "home/home.mp4"
  )}?alt=media`;

  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWorks() {
      const q = query(collection(db, "works"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setWorks(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    }
    fetchWorks();
  }, []);

  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="w-full h-full overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </section>

      <OurService />
      <PortfolioMain items={works} />

      {/* Call to Action */}
      <section className="py-50">
        <div className="w-full mx-auto text-center bg-gray-900 py-20">
          <h2 className="text-3xl font-semibold mb-6">문의하기</h2>
          <p className="text-gray-300 mb-8">
            영상 제작에 대한 문의나 견적 요청은 언제든지 환영합니다.
          </p>
          <Link href="/contact">
            <button className="px-8 py-2 border cursor-pointer hover:scale-105 transition">
              지금 문의하기
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
