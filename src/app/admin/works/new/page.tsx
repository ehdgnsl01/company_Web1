// src/app/admin/works/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Portfolio } from "@/models/portfolio";

export default function NewWorkPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [client, setClient] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!thumbFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(thumbFile);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [thumbFile]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    let thumbnailUrl = "";
    if (thumbFile) {
      const fileRef = ref(storage, `works/${Date.now()}_${thumbFile.name}`);
      const snap = await uploadBytes(fileRef, thumbFile);
      thumbnailUrl = await getDownloadURL(snap.ref);
    }

    try {
      // 현재 포트폴리오 목록 불러와 새 order 값 결정
      const listRes = await fetch('/api/admin/works');
      if (!listRes.ok) throw new Error('Order 조회 실패');
      const listData = (await listRes.json()) as Portfolio[];
      const newOrder = listData.length;

      const res = await fetch('/api/admin/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          youtubeUrl,
          client,
          year,
          thumbnailUrl,
          order: newOrder,
          category,
        }),
      });
      if (!res.ok) throw new Error('추가 실패');
      router.replace('/admin/works');
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      alert('추가에 실패했습니다.');
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
        <label className="block mb-1">분류</label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded appearance-none"
          >
            <option value="" disabled>
              분류 선택
            </option>
            <option value="category1">분류1</option>
            <option value="category2">분류2</option>
            <option value="category3">분류3</option>
            <option value="category4">분류4</option>
          </select>
          {/* 화살표 아이콘 */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
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
          className="rounded w-full file:bg-white file:text-black file:border file:w-20 file:cursor-pointer file:hover:bg-gray-200"
        />

        {previewUrl && (
          <div className="mt-4 w-full max-w-xs">
            <div className="relative w-full pt-[56.25%] bg-gray-100 rounded overflow-hidden">
              <div className="absolute inset-0 flex justify-center items-center">
                <img
                  src={previewUrl}
                  alt="썸네일 미리보기"
                  className="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!thumbFile || submitting}
        className="w-full bg-maincolor-500 text-white px-4 py-2 rounded hover:bg-maincolor-300 disabled:opacity-50"
      >
        저장
      </button>
    </form>
  );
}
