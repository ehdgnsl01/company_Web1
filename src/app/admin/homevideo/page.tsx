// src/app/admin/homevideo/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHomeVideoPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/video');
        if (!res.ok) throw new Error('조회 실패');
        const data = await res.json() as { videoUrl: string | null };
        setVideoUrl(data.videoUrl || '');
      } catch (e) {
        console.error('GET /api/admin/video 오류', e);
        alert('비디오 URL을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/video', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl }),
      });
      if (!res.ok) throw new Error('업데이트 실패');
      router.refresh();
    } catch (e) {
      console.error('PUT /api/admin/video 오류', e);
      alert('비디오 URL 저장에 실패했습니다.');
    }
  };

  if (loading) return <div className="p-6 text-center">Loading…</div>;

  return (
    <form onSubmit={onSave} className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-2xl font-bold">홈 비디오 관리</h1>
      <label className="block">
        비디오 URL
        <input
          type="text"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
          required
          className="mt-1 w-full border px-2 py-1 rounded"
        />
      </label>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        저장
      </button>
    </form>
  );
}
