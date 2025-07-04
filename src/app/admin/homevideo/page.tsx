// src/app/admin/homevideo/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminHomeVideoPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const docId = "home";

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "video", docId));
      if (snap.exists()) {
        setVideoUrl(snap.data().videoUrl);
      }
      setLoading(false);
    }
    load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await setDoc(doc(db, "video", docId), {
      videoUrl,
      updatedAt: serverTimestamp(),
    });
    router.refresh();
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <form
      onSubmit={onSave}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">홈 비디오 관리</h1>
      <label className="block">
        비디오 URL
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
          className="mt-1 w-full border px-2 py-1 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        저장
      </button>
    </form>
  );
}
