// src/components/Category.tsx
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import type { Portfolio } from "@/models/portfolio";
import { CategoryValue } from "@/models/categories";

interface CategoryProps {
  works: Portfolio[];
  category: CategoryValue;
}

export default function Category({ works, category }: CategoryProps) {
  const [visibleCount, setVisibleCount] = React.useState(9);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => setVisibleCount((c) => c + 6);

  // 해당 카테고리에 속한 작품만 필터링
  const group = works.filter((w) => w.category === category);

  // 스크롤 시 자동 로드: IntersectionObserver
  React.useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && group.length > visibleCount) {
            handleLoadMore();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(loader);
    return () => {
      observer.disconnect();
    };
  }, [visibleCount, group.length]);

  return (
    <>
      <motion.div
        className="grid gap-0 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {group.slice(0, visibleCount).map((w) => (
          <motion.div
            key={w.id}
            className="block group relative overflow-hidden cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1 }}
          >
            <Link href={`/works/${w.id}`}>
              {/* 이미지 */}
              <img
                src={w.thumbnailUrl}
                alt={w.title}
                className="w-full h-90 object-cover transform transition-transform duration-300 group-hover:scale-105"
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
            </Link>
          </motion.div>
        ))}
      </motion.div>


      {/* 로더 엘리먼트: 스크롤시 감지 */}
      {group.length > visibleCount && (
        <div ref={loaderRef} className="pt-4 text-center text-gray-500">
          Loading more...
        </div>
      )}
    </>
  );
}
