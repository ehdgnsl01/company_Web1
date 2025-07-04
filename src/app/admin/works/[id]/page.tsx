"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import type { Portfolio } from "@/models/portfolio";

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [work, setWork] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [client, setClient] = useState("");
  // const [newThumbFile, setNewThumbFile] = useState<File | null>(null);

  // Fetch existing document
  useEffect(() => {
    async function fetchWork() {
      if (!id) return;
      const docRef = doc(db, "works", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Omit<Portfolio, "id">;
        setWork({ id: snap.id, ...data });
        setTitle(data.title);
        setYoutubeUrl(data.youtubeUrl);
        setThumbnailUrl(data.thumbnailUrl);
        setClient(data.client);
      }
      setLoading(false);
    }
    fetchWork();
  }, [id]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // --- Storage 업로드 로직 (나중에 활성화) ---
    // if (newThumbFile) {
    //   const storageRef = ref(storage, `works/${Date.now()}_${newThumbFile.name}`);
    //   const snap = await uploadBytes(storageRef, newThumbFile);
    //   thumbnailUrl = await getDownloadURL(snap.ref);
    // }
    // ------------------------------------------

    await updateDoc(doc(db, "works", id), {
      title,
      youtubeUrl,
      thumbnailUrl,
      client,
      date: serverTimestamp(),
    });
    router.replace("/admin/works");
  };

  if (loading) {
    return <div className="p-6 text-center">Loading…</div>;
  }

  if (!work) {
    return (
      <div className="p-6 text-center text-red-600">
        작업을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 max-w-md bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold">포트폴리오 수정</h2>
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
        <label className="block mb-1">썸네일 이미지 URL</label>
        <input
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
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
      {/* 파일 업로드 UI: 나중에 활성화 */}
      {/*
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setNewThumbFile(e.target.files?.[0] || null)}
      />
      */}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          저장
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          취소
        </button>
      </div>
    </form>
  );
}
