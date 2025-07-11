"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

export default function AdminHomeVideoPage() {
  const [videoUrl, setVideoUrl] = useState(""); // 스토리지 내 파일 URL
  const [updatedAt, setUpdatedAt] = useState(""); // 마지막 수정 시각 (ISO)
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // 1) 페이지 로드 시 Storage에서 URL + 메타데이터 조회
  useEffect(() => {
    async function load() {
      try {
        const fileRef = ref(storage, "home/home.mp4");
        const url = await getDownloadURL(fileRef);
        setVideoUrl(url);

        const meta = await getMetadata(fileRef);
        // metadata.updated는 "2025-07-11T03:12:45.000Z" 같은 ISO 문자열
        setUpdatedAt(new Date(meta.updated || "").toLocaleString("ko-KR"));
      } catch (e) {
        console.warn("홈 비디오가 아직 없습니다.", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 2) 업로드 핸들러
  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert("업로드할 비디오 파일을 선택해 주세요.");
      return;
    }

    try {
      const fileRef = ref(storage, "home/home.mp4");
      const uploadTask = uploadBytesResumable(fileRef, videoFile);

      const finalUrl: string = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snap) => {
            const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(Math.round(pct));
          },
          (err) => reject(err),
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      // 메타데이터 재조회
      const meta = await getMetadata(ref(storage, "home/home.mp4"));
      setUpdatedAt(new Date(meta.updated || "").toLocaleString("ko-KR"));

      setVideoUrl(finalUrl);
      setProgress(0);
      alert("홈 비디오가 정상적으로 업데이트되었습니다.");
      router.refresh();
    } catch (err) {
      console.error("비디오 업로드/저장 중 오류", err);
      alert("비디오 저장에 실패했습니다.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <form
      onSubmit={onSave}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      <h1 className="text-2xl font-bold">홈 비디오 관리</h1>

      {videoUrl ? (
        <>
          <video
            src={videoUrl}
            controls
            className="w-full h-auto mb-2 rounded"
          />
          <p className="text-sm text-gray-500">최종 업로드: {updatedAt}</p>
        </>
      ) : (
        <p className="text-gray-500">현재 업로드된 영상이 없습니다.</p>
      )}

      <div>
        <label className="block mb-1 font-medium">새 비디오 파일 선택</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="w-full"
        />
      </div>

      {progress > 0 && (
        <div>
          <div className="w-full bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">업로드 중: {progress}%</p>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </form>
  );
}
