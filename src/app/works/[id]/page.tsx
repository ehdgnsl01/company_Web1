/* src/app/works/[id]/page.tsx (Client Component via API) */

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Portfolio } from "@/models/portfolio";

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/works/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Portfolio) => setForm(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center bg-black py-16 min-h-screen text-white">Loading…</div>;
  if (error || !form) return <div className="text-center bg-black py-16 min-h-screen text-white">작품을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <main className="bg-black min-h-screen text-white">
      <div className="relative w-full flex flex-col">
        <img
          src={form.thumbnailUrl}
          alt={form.title}
          className="absolute top-0 w-full h-200 mb-8 object-cover blur-xs overflow-hidden"
        />
        <div className="absolute inset-x-0 top-0 h-203 bg-black opacity-70 z-10" />
        <div className="z-20 ">
          <div className="flex flex-col py-40 max-w-[1350px] mx-auto">
            <div className="flex">
              <h1 className="text-5xl font-bold mb-10 pt-3 border-t-5 border-maincolor-500">{form.title}</h1>
            </div>
            <div className="flex gap-30 text-xl font-semibold">
              <div>
                <p className="text-lg font-light text-gray-300">Client</p>
                <p className="">{form.client}</p>
              </div>
              <div>
                <p className="text-lg font-light text-gray-300">Year</p>
                <p className="">{form.year}</p>
              </div>
              <div>
                <p className="text-lg font-light text-gray-300">Category</p>
                <p className="">{form.category}</p>
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[1350px] pb-30 flex flex-col items-center">
            <div className="aspect-video w-full mb-20">
              <iframe
                src={form.youtubeUrl.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
