// src/components/AllCategory.tsx
import Link from "next/link";
import React from "react";

interface AllCategoryProps {
  works: any[];
  categories: string[];
}

export default function AllCategory({ works, categories }: AllCategoryProps) {
  // 각 카테고리별 렌더링 개수 상태
  const [visibleCounts, setVisibleCounts] = React.useState<
    Record<string, number>
  >(categories.reduce((acc, c) => ({ ...acc, [c]: 6 }), {}));

  const handleLoadMore = (cat: string) => {
    setVisibleCounts((prev) => ({ ...prev, [cat]: prev[cat] + 6 }));
  };
  return (
    <>
      {categories
        .filter((c) => c !== "ALL")
        .map((cat) => {
          const group = works.filter((w) => w.category === cat);
          if (!group.length) return null;
          return (
            <div key={cat} className="mb-20">
              <h2 className="text-3xl font-semibold mb-8 w-full text-center border-t pt-4">
                {cat}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {group.slice(0, visibleCounts[cat]).map((w) => (
                  <Link key={w.id} href={`/works/${w.id}`}>
                    <div className="block group relative overflow-hidden rounded-lg cursor:pointer">
                      {/* 이미지 */}
                      <img
                        src={w.thumbnailUrl}
                        alt={w.title}
                        className="w-full h-64 object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:blur-sm"
                      />
                      {/* 배경 오버레이 (z-10) */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10" />
                      {/* 텍스트 레이어 (왼쪽 아래, 두 줄까지 보이고 넘치면 …) */}
                      <div className="absolute left-4 bottom-4 z-20 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                        <h2
                          className="text-2xl font-bold text-white truncate"
                          title={w.title}
                        >
                          {w.title}
                        </h2>
                        <p className="mt-1 text-sm font-light text-gray-200 truncate">
                          {w.client}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {/* 더 보기 버튼 */}
              {group.length > visibleCounts[cat] && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => handleLoadMore(cat)}
                    className="px-10 py-2 border rounded cursor-pointer text-white transition-all duration-300 ease-in-out hover:scale-105"
                  >
                    더 보기
                  </button>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
