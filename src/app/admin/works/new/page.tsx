"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NewWorkPage() {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [client, setClient] = useState("");
  // const [thumbFile, setThumbFile] = useState<File | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let thumbnailUrl = "";

    // --- Storage 업로드 로직 (나중에 활성화) ---
    // if (thumbFile) {
    //   const storageRef = ref(storage, `works/${Date.now()}_${thumbFile.name}`);
    //   const snap = await uploadBytes(storageRef, thumbFile);
    //   thumbnailUrl = await getDownloadURL(snap.ref);
    // }
    // ------------------------------------------

    await addDoc(collection(db, "works"), {
      title,
      youtubeUrl,
      client,
      thumbnailUrl, // 현재는 URL 직접 입력 혹은 추후 자동 생성
      date: serverTimestamp(),
    });
    router.replace("/admin/works");
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
      {/* 파일 업로드 필드: 나중에 활성화 */}
      {/*
      <div>
        <label className="block mb-1">썸네일 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbFile(e.target.files?.[0] || null)}
        />
      </div>
      */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </form>
  );
}
