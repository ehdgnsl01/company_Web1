// src/app/admin/works/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Portfolio } from '@/models/portfolio';
import { CATEGORIES } from '@/models/categories'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function AdminWorksPage() {
  const [works, setWorks] = useState<Portfolio[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('category1');
  const [currentPage, setCurrentPage] = useState(1);
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

  // 드래그 앤 드랍 완료 시 순서 변경
  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(works);
    const [moved] = items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);
    setWorks(items);

    try {
      const res = await fetch('/api/admin/works/order', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: items.map(w => w.id) }),
      });
      console.log("Order API returned:", await res.json());
    } catch (e) {
      console.error('순서 저장 실패', e);
      alert('순서 저장에 실패했습니다.');
    }
  };

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

  // 필터링 후 페이징
  const filteredWorks = works.filter(w => w.category === selectedCategory);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const pagedWorks = filteredWorks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 카테고리 변경 시 페이지 리셋
  useEffect(() => { setCurrentPage(1); }, [selectedCategory]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">포트폴리오 관리</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedCategory(value)}
            className={`px-4 py-2 rounded ${selectedCategory === value
              ? 'bg-maincolor-500 text-white'
              : 'bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        onClick={() => router.push('/admin/works/new')}
        className="mb-6 px-4 py-2 bg-maincolor-500 text-white rounded"
      >
        새 포트폴리오 추가
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="works-list">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {pagedWorks.map((w, index) => (
                <Draggable key={w.id} draggableId={w.id} index={index}>
                  {provided => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex items-center justify-between border p-4 rounded bg-white"
                    >
                      {/* 콘텐츠 생략 (기존 코드 유지) */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={w.thumbnailUrl}
                          alt={w.title}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                          <div className="flex items-baseline">
                            <p className="font-semibold text-lg pr-4">{w.title}</p>
                            <p className="text-sm">{w.category}</p>
                          </div>
                          <p className="text-sm text-gray-600">Client: {w.client}</p>
                          <p className="text-sm text-gray-600">Year: {w.year}</p>
                          <p className="text-xs text-gray-500">{w.date}</p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => router.push(`/admin/works/${w.id}`)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >수정</button>
                        <button
                          onClick={() => onDelete(w.id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                        >삭제</button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-maincolor-500 text-white' : 'bg-gray-200'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
