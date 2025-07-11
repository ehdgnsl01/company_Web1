// src/app/admin/works/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Portfolio } from "@/models/portfolio";

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Portfolio>({
    id: "",
    title: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    year: "",
    client: "",
    date: "",
  });
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWork() {
      const snap = await getDoc(doc(db, "works", id!));
      if (snap.exists()) {
        setForm(snap.data() as Portfolio);
      }
      setLoading(false);
    }
    if (id) fetchWork();
  }, [id]);

  const onChange = (field: keyof Portfolio, value: string) =>
    setForm((f) => ({ ...f, [field]: value } as Portfolio));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let thumbnailUrl = form.thumbnailUrl;
    if (thumbFile) {
      const fileRef = ref(storage, `works/${Date.now()}_${thumbFile.name}`);
      const snap = await uploadBytes(fileRef, thumbFile);
      thumbnailUrl = await getDownloadURL(snap.ref);
    }
    const { title, youtubeUrl, client, year } = form;
    const res = await fetch(`/api/admin/works/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, youtubeUrl, client, thumbnailUrl, year }),
    });
    if (res.ok) router.replace("/admin/works");
    else alert("수정에 실패했습니다.");
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 max-w-md bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold">포트폴리오 수정</h2>
      <div>
        <label className="block mb-1">제목</label>
        <input
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">YouTube URL</label>
        <input
          value={form.youtubeUrl}
          onChange={(e) => onChange("youtubeUrl", e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">썸네일 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <img
          src={form.thumbnailUrl}
          alt={form.title}
          className="w-24 h-24 object-cover rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Client</label>
        <input
          value={form.client}
          onChange={(e) => onChange("client", e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Year</label>
        <input
          type="number"
          value={form.year}
          onChange={(e) => onChange("year", e.target.value)}
          min="2000"
          max={new Date().getFullYear()}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">등록 일자</label>
        <p className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700">
          {form.date}
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        저장
      </button>
    </form>
  );
}
