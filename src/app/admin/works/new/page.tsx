// src/app/admin/works/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function NewWorkPage() {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [client, setClient] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let thumbnailUrl = "";
    if (thumbFile) {
      const fileRef = ref(storage, `works/${Date.now()}_${thumbFile.name}`);
      const snap = await uploadBytes(fileRef, thumbFile);
      thumbnailUrl = await getDownloadURL(snap.ref);
    }
    const res = await fetch("/api/admin/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, youtubeUrl, thumbnailUrl, client, year }),
    });
    if (res.ok) {
      router.replace("/admin/works");
    } else {
      alert("추가에 실패했습니다.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 max-w-md bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold">새 포트폴리오 추가</h2>

      <div>
        <label className="block mb-1">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">YouTube URL</label>
        <input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Client</label>
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="2000"
          max={new Date().getFullYear()}
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
      </div>

      <button
        type="submit"
        disabled={!thumbFile}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        저장
      </button>
    </form>
  );
}
