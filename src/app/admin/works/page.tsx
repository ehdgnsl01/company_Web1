// src/app/admin/works/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Portfolio } from '@/models/portfolio';

export default function AdminWorksPage() {
  const [works, setWorks] = useState<Portfolio[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchWorks() {
      try {
        const res = await fetch('/api/admin/works');
        if (!res.ok) throw new Error('목록 조회 실패');
        const data = (await res.json()) as Portfolio[];
        setWorks(data);
      } catch (error) {
        console.error(error);
        alert('포트폴리오 목록을 불러오는 데 실패했습니다.');
      }
    }
    fetchWorks();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      const res = await fetch(`/api/admin/works/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');
      setWorks(ws => ws.filter(w => w.id !== id));
    } catch (error) {
      console.error(error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">포트폴리오 관리</h1>
      <button
        onClick={() => router.push('/admin/works/new')}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        새 포트폴리오 추가
      </button>
      <ul className="space-y-4">
        {works.map(w => (
          <li
            key={w.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center space-x-4">
              <img
                src={w.thumbnailUrl}
                alt={w.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div>
                <p className="font-semibold text-lg">{w.title}</p>
                <p className="text-sm text-gray-600">Client: {w.client}</p>
                <p className="text-sm text-gray-600">Year: {w.year}</p>
                <p className="text-xs text-gray-500">
                  {w.date}
                </p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/admin/works/${w.id}`)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                수정
              </button>
              <button
                onClick={() => onDelete(w.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
