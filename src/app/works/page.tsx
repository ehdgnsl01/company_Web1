// src/app/works/page.tsx (updated imports and usage)
"use client";
import { useState, useEffect } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AllCategory from "@/components/AllCategory";
import Category from "@/components/Category";
import { CategoryValue, CATEGORIES } from "@/models/categories"

export default function WorksPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("ALL");

  useEffect(() => {
    async function fetchWorks() {
      const q = query(collection(db, "works"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setWorks(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    }
    fetchWorks();
  }, []);

  // 버튼 렌더링 시 ALL 과 동적 카테고리 버튼 구분
  const renderCategoryButtons = () => (
    <>
      {/* All 버튼 */}
      <button
        key="ALL"
        onClick={() => setSelected("ALL")}
        className={`px-4 py-2 rounded transition-all duration-300 ease-in-out cursor-pointer hover:scale-105`}
      >
        <span
          className={`inline-block px-1 transition-all duration-300 ease-in-out ${selected === "ALL"
            ? "border-b-2 border-maincolor-500"
            : "border-black"
            } active:text-maincolor-500`}
        >
          All
        </span>
      </button>

      {/* 동적 카테고리 버튼 */}
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setSelected(value)}
          className={`px-4 py-2 rounded transition-all duration-300 ease-in-out cursor-pointer hover:scale-105`}
        >
          <span
            className={`inline-block px-1 transition-all duration-300 ease-in-out ${selected === value
              ? "border-b-2 border-maincolor-500"
              : "border-black"
              } active:text-maincolor-500`}
          >
            {label}
          </span>
        </button>
      ))}
    </>
  );

  return (
    <main className="bg-black py-16 min-h-screen">
      <div className="container mx-auto max-w-[1350px] text-white px-4 relative">
        <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
          {renderCategoryButtons()}
        </div>
      </div>
      <div>
        {selected === "ALL" ? (
          <div className="container mx-auto max-w-[1350px] text-white px-4">
            <AllCategory
              works={works}
            />
          </div>
        ) : (
          <Category works={works} category={selected as CategoryValue} />
        )}
      </div>
    </main>
  );
}
