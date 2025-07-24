// src/app/admin/works/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Portfolio } from "@/models/portfolio";
import { CATEGORIES } from "@/models/categories"

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Portfolio>({
    id: "",
    title: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    //year: "",
    //client: "",
    date: "",
    category: CATEGORIES[0].value,
  });
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(form.thumbnailUrl);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchWork() {
      const snap = await getDoc(doc(db, "works", id!));
      if (snap.exists()) {
        setForm(snap.data() as Portfolio);
      }
      setLoading(false);
    }
    if (id) fetchWork();
    if (thumbFile) {
      const objectUrl = URL.createObjectURL(thumbFile);
      setPreviewUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
    setPreviewUrl(form.thumbnailUrl);
  }, [id, thumbFile, form.thumbnailUrl]);

  const onChange = (field: keyof Portfolio, value: string) =>
    setForm((f) => ({ ...f, [field]: value } as Portfolio));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    let thumbnailUrl = form.thumbnailUrl;
    if (thumbFile) {
      const fileRef = ref(storage, `works/${Date.now()}_${thumbFile.name}`);
      const snap = await uploadBytes(fileRef, thumbFile);
      thumbnailUrl = await getDownloadURL(snap.ref);
    }
    // Client, year 필요 X 사장님 요청사항
    //const { title, youtubeUrl, client, year, category } = form;
    const { title, youtubeUrl, category } = form;
    const res = await fetch(`/api/admin/works/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ title, youtubeUrl, client, thumbnailUrl, year, category }),
      body: JSON.stringify({ title, youtubeUrl, thumbnailUrl, category }),
    });
    if (res.ok) router.replace("/admin/works");
    else alert("수정에 실패했습니다.");
    setSubmitting(false);
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 w-full p-6 rounded bg-white"
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
        <label className="block mb-1">분류</label>
        <div className="relative">
          <select
            value={form.category}
            onChange={(e) => onChange('category', e.target.value)}
            required
            className="w-full border px-3 py-2 rounded appearance-none"
          >
            <option value="" disabled>
              분류 선택
            </option>
            {CATEGORIES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
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
          value={form.youtubeUrl}
          onChange={(e) => onChange("youtubeUrl", e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      {/* Client, Year 필요X (사장님 요청사항)
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
*/}
      <div>
        <label className="block mb-1">썸네일 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
          className="
          rounded w-full 
          file:bg-white file:text-black file:border file:w-20 file:cursor-pointer file:hover:bg-gray-200
        "
        />

        {/* 미리보기 */}
        {previewUrl && (
          <div className="mt-4 w-full max-w-xs">
            <div className="relative w-full pt-[56.25%] bg-gray-100 rounded overflow-hidden">
              {/* 중앙 정렬을 위한 flex 래퍼 */}
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

      <div>
        <label className="block mb-1">등록 일자</label>
        <p className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700">
          {form.date}
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        저장
      </button>
    </form>
  );
}
