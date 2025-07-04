// src/app/admin/works/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';
import type { Portfolio } from '@/models/portfolio';

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<Portfolio>({
    id: '',
    title: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    year: '',
    client: '',
    date: '',
  });;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWork() {
      const res = await fetch(`/api/admin/works/${id}`);
      const data = (await res.json()) as Portfolio;
      setForm(data);
      setLoading(false);
    }
    if (id) fetchWork();
  }, [id]);

  const onChange = (field: keyof Portfolio, value: string) =>
    setForm(f => ({ ...f, [field]: value } as Portfolio));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, youtubeUrl, thumbnailUrl, client, year } = form;
    const res = await fetch(`/api/admin/works/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, youtubeUrl, client, thumbnailUrl, year }),
    });
    if (res.ok) router.replace('/admin/works');
    else alert('수정에 실패했습니다.');
  };

  if (loading) return <div>Loading…</div>;

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">포트폴리오 수정</h2>
      <div>
        <label className="block mb-1">제목</label>
        <input
          value={form.title}
          onChange={e => onChange('title', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">YouTube URL</label>
        <input
          value={form.youtubeUrl}
          onChange={e => onChange('youtubeUrl', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">썸네일 URL</label>
        <input
          value={form.thumbnailUrl}
          onChange={e => onChange('thumbnailUrl', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Client</label>
        <input
          value={form.client}
          onChange={e => onChange('client', e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Year</label>
        <input
          type="number"
          value={form.year}
          onChange={e => onChange('year', e.target.value)}
          min="2000"
          max={new Date().getFullYear()}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        저장
      </button>
    </form>
  );
}
