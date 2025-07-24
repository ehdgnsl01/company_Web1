// src/components/AllCategory.tsx
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { Portfolio } from "@/models/portfolio";
import { CATEGORIES, CategoryValue } from "@/models/categories";

interface AllCategoryProps {
  works: Portfolio[];
}

export default function AllCategory({ works }: AllCategoryProps) {
  // CATEGORIES에서 value 목록 확보 (ALL 제외)
  const categories = CATEGORIES.map((c) => c.value) as CategoryValue[];

  // 각 카테고리별 렌더링 개수 상태 초기화
  const [visibleCounts, setVisibleCounts] = React.useState<
    Record<CategoryValue, number>
  >(
    categories.reduce(
      (acc, c) => ({ ...acc, [c]: 6 }),
      {} as Record<CategoryValue, number>
    )
  );

  const handleLoadMore = (cat: CategoryValue) => {
    setVisibleCounts((prev) => ({ ...prev, [cat]: prev[cat] + 6 }));
  };

  return (
    <>
      {categories.map((cat) => {
        const group = works.filter((w) => w.category === cat);
        if (!group.length) return null;
        return (
          <div key={cat} className="mb-20">
            <h2 className="text-4xl font-bold  w-full pb-5 mb-5 text-center border-b border-gray-500 pt-10">
              {CATEGORIES.find((c) => c.value === cat)?.label || cat}
            </h2>
            <motion.div
              className="grid gap-0 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {group.slice(0, visibleCounts[cat]).map((w) => (
                <motion.div
                  key={w.id}
                  className="block group relative overflow-hidden cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Link key={w.id} href={`/works/${w.id}`}>
                    <div className="block group relative overflow-hidden cursor-pointer">
                      {/* 이미지 */}
                      <img
                        src={w.thumbnailUrl}
                        alt={w.title}
                        className="w-full aspect-[9/5] object-cover transform transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:blur-sm"
                      />
                      {/* 배경 오버레이 */}
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10" />
                      {/* 텍스트 레이어 */}
                      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 max-w-[80%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                        <h2
                          className="text-2xl font-semibold text-white truncate"
                          title={w.title}
                        >
                          {w.title}
                        </h2>
                        {/* Client 필요 X 사장님 요청사항
                        <p className="mt-1 text-sm font-light text-gray-200 truncate">
                          {w.client}
                        </p>
                        */}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
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
