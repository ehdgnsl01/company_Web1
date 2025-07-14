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

  if (loading) return <div className="p-6 text-center">Loading…</div>;
  if (error || !form) return <div className="p-6 text-center">작품을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <main className="bg-black py-16 min-h-screen text-white">
      <div className="container mx-auto w-full max-w-3xl">
        <img
          src={form.thumbnailUrl}
          alt={form.title}
          className="w-full h-auto rounded-lg mb-8 object-cover"
        />
        <h1 className="text-4xl font-bold mb-4">{form.title}</h1>
        <p className="text-gray-400 mb-2">Client: {form.client}</p>
        <p className="text-gray-400 mb-2">Year: {form.year}</p>
        <p className="text-gray-400 mb-6">Date: {form.date}</p>
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${form.youtubeUrl}`}
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
