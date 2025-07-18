// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
            <div className="border-l-10 pl-5 border-maincolor-500">
              <h1 className="text-5xl font-bold mb-10">
                모두의 레퍼런스는 브랜드의 이야기를
                <br /> 시각적으로 아름답게 전합니다.
              </h1>
              <p className="text-3xl uppercase">
                All Reference tells the brand's story <br />
                visually and beautifully.
              </p>
            </div>
          </div>
          <div className="absolute bg-black opacity-30 h-full w-full"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "기업 홍보 영상",
              desc: "기업의 가치를 효과적으로 전달하는 홍보 영상을 제작합니다.",
            },
            {
              title: "제품 소개 영상",
              desc: "제품 특징을 돋보이게 하는 감각적인 소개 영상을 제작합니다.",
            },
            {
              title: "이벤트 영상",
              desc: "행사의 모든 순간을 생생하게 담아내는 이벤트 영상을 제공합니다.",
            },
          ].map((service) => (
            <div
              key={service.title}
              className="bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <PortfolioMain items={works} />

      {/* Call to Action */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">문의하기</h2>
          <p className="text-gray-300 mb-8">
            영상 제작에 대한 문의나 견적 요청은 언제든지 환영합니다.
          </p>
          <button className="px-8 py-4 bg-maincolor-500 hover:bg-maincolor-300 transition rounded-lg">
            지금 문의하기
          </button>
        </div>
      </section>
    </main>
  );
}
