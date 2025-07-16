// src/app/works/page.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function WorksPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("ALL");
  const categories = ["ALL", "category1", "category2", "category3", "category4"];

  useEffect(() => {
    async function fetchWorks() {
      const q = query(collection(db, "works"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setWorks(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    }
    fetchWorks();
  }, []);

  const filtered = selected === "ALL" ? works : works.filter((w) => w.category === selected);

  return (
    <main className="bg-black py-16 min-h-screen">
      <div className="container mx-auto w-full max-w-[1350px] text-white">
        <h1 className="text-4xl font-bold mb-8 w-full text-center">Works</h1>
        {/* 카테고리 선택 탭 */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded ${selected === cat ? 'bg-maincolor-500' : 'bg-gray-700'} hover:bg-maincolor-300`}
            >
              {cat === 'ALL' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* ALL 선택 시 카테고리별 그룹화 */}
        {selected === 'ALL' ? (
          categories
            .filter((c) => c !== 'ALL')
            .map((cat) => {
              const group = works.filter((w) => w.category === cat);
              if (!group.length) return null;
              return (
                <div key={cat} className="mb-12">
                  <h2 className="text-2xl font-semibold mb-4">{cat}</h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {group.map((w) => (
                      <Link key={w.id} href={`/works/${w.id}`}>
                        <div className="block group relative overflow-hidden rounded-lg shadow-sm cursor:pointer">
                          {/* 이미지 */}
                          <img
                            src={w.thumbnailUrl}
                            alt={w.title}
                            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* 배경 오버레이 (z-10) */}
                          <div className="absolute inset-0 bg-maincolor-300 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />

                          {/* 텍스트 레이어 (왼쪽 아래, 두 줄까지 보이고 넘치면 …) */}
                          <div className="absolute left-4 bottom-4 z-20 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                            <h2 className="text-2xl font-bold text-white truncate" title={w.title}>{w.title}</h2>
                            <p className="mt-1 text-sm font-light text-gray-200 truncate">{w.client}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
        ) : (
          /* 단일 카테고리 필터링 */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <Link key={w.id} href={`/works/${w.id}`}>
                <div className="block group relative overflow-hidden rounded-lg shadow-sm cursor:pointer">
                  {/* 이미지 */}
                  <img
                    src={w.thumbnailUrl}
                    alt={w.title}
                    className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* 배경 오버레이 (z-10) */}
                  <div className="absolute inset-0 bg-maincolor-300 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />

                  {/* 텍스트 레이어 (왼쪽 아래, 두 줄까지 보이고 넘치면 …) */}
                  <div className="absolute left-4 bottom-4 z-20 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <h2 className="text-2xl font-bold text-white truncate" title={w.title}>{w.title}</h2>
                    <p className="mt-1 text-sm font-light text-gray-200 truncate">{w.client}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
