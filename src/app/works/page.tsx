// src/app/works/page.tsx (updated imports and usage)
"use client";
import { useState, useEffect } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AllCategory from "@/components/AllCategory";
import Category from "@/components/Category";

export default function WorksPage() {
  const [works, setWorks] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("ALL");
  const categories = [
    "ALL",
    "category1",
    "category2",
    "category3",
    "category4",
  ];

  useEffect(() => {
    async function fetchWorks() {
      const q = query(collection(db, "works"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setWorks(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    }
    fetchWorks();
  }, []);

  return (
    <main className="bg-black py-16 min-h-screen">
      <div className="container mx-auto max-w-[1350px] text-white px-4 relative">
        <div className="flex flex-wrap justify-center gap-4 mb-12 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded transition-all duration-300 ease-in-out cursor-pointer hover:scale-105`}
            >
              <span
                className={`inline-block px-1 transition-all duration-300 ease-in-out
                ${
                  selected === cat
                    ? "border-b-2 border-maincolor-500"
                    : "border-black"
                } active:text-maincolor-500`}
              >
                {cat === "ALL" ? "All" : cat}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div>
        {selected === "ALL" ? (
          <div className="container mx-auto max-w-[1350px] text-white px-4">
            <AllCategory works={works} categories={categories} />
          </div>
        ) : (
          <Category works={works} category={selected} />
        )}
      </div>
    </main>
  );
}
