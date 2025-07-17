// src/components/Category.tsx
import Link from "next/link";
import React from "react";

interface CategoryProps {
  works: any[];
  category: string;
}

export default function Category({ works, category }: CategoryProps) {
  const [visibleCount, setVisibleCount] = React.useState(6);
  const handleLoadMore = () => setVisibleCount((c) => c + 6);
  const group = works.filter((w) => w.category === category);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {group.slice(0, visibleCount).map((w) => (
          <Link key={w.id} href={`/works/${w.id}`}>
            <div className="block group relative overflow-hidden rounded-lg cursor-pointer">
              {/* 이미지 */}
              <img
                src={w.thumbnailUrl}
                alt={w.title}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />

              {/* 배경 오버레이 */}
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />

              {/* 텍스트 레이어 */}
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
      {group.length > visibleCount && (
        <div className="text-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-10 py-2 border rounded cursor-pointer text-white transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-white hover:to-gray-200 hover:text-black hover:scale-105"
          >
            더 보기
          </button>
        </div>
      )}
    </>
  );
}
