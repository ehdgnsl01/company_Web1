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
      <section className="relative w-full h-screen overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="relative flex flex-col items-left justify-center h-full">
          <div className="z-10 px-50">
            <div className="\pl-5">
              <h1 className="text-5xl font-bold mb-10">
                모두의 레퍼런스는 브랜드의 이야기를
                <br /> 시각적으로 아름답게 전합니다.
              </h1>
              <p className="text-3xl uppercase mb-10">
                All Reference tells the brand's story <br />
                visually and beautifully.
              </p>
            </div>
            <button className="cursor-pointer px-8 py-4 border hover:scale-105 transition ">
              지금 문의하기
            </button>
          </div>
          <div className="absolute bg-black opacity-30 h-full w-full"></div>
        </div>
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
            <button className="px-8 py-2 bg-maincolor-500 hover:bg-maincolor-300 transition">
              지금 문의하기
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
