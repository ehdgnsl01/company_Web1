"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditWorkPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    client: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/works/${id}`)
      .then((r) => r.json())
      .then((data) => setForm(data))
      .finally(() => setLoading(false));
  }, [id]);

  const onChange = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/works/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.replace("/admin/works");
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 max-w-md bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-bold">포트폴리오 수정</h2>
      {/* 제목 */}
      <input
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      {/* YouTube URL */}
      <input
        value={form.youtubeUrl}
        onChange={(e) => onChange("youtubeUrl", e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      {/* Client */}
      <input
        value={form.client}
        onChange={(e) => onChange("client", e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        저장
      </button>
    </form>
  );
}
