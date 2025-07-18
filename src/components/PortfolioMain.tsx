// src/components/PortfolioMain.tsx
"use client";

import React, { useRef, useEffect } from "react";
import type { Portfolio } from "@/models/portfolio";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

interface PortfolioMainProps {
  items: Portfolio[];
}

export default function PortfolioMain({ items }: PortfolioMainProps) {
  // 무한 루프를 위해 두 번 이어붙임
  const loopItems = [...items, ...items];

  // 1) 감시할 ref
  const textRef = useRef<HTMLDivElement>(null);
  // 2) inView 감지 (뷰포트 50% 이상 보이면 true)
  const inView = useInView(textRef, { amount: 0.8 });
  // 3) 애니메이션 컨트롤러
  const controls = useAnimation();

  // 4) inView 변경에 따라 show/hide
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  // 5) variants 정의
  const textVariants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.4 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="flex items-center text-white px-6 my-20">
      {/* Left Text */}
      <motion.div
        ref={textRef}
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="lg:w-1/2 w-full mb-8 text-center lg:text-left ms-30"
      >
        <h2 className="text-4xl font-bold mb-4">모두의 레퍼런스와 함께</h2>
        <p className="text-lg leading-relaxed mb-6">
          다양한 영상 제작 프로젝트를 만나보세요.
          <br />
          고퀄리티 결과물을 제공합니다.
        </p>
        <Link href="/works">
          <button className="px-4 py-2 bg-maincolor-500 text-white hover:bg-maincolor-300 transition">
            전체 포트폴리오 보기
          </button>
        </Link>
      </motion.div>

      {/* Right Vertical Sliders */}
      <div className="lg:w-1/2 w-full grid grid-cols-2 gap-2">
        {/* Slider Down */}
        <div className="overflow-hidden h-120 relative flex justify-center">
          <div className="absolute top-0 animate-vertical-down w-full">
            {loopItems.map((w, idx) => (
              <div key={`${w.id}-down-${idx}`} className="mb-2">
                <img
                  src={w.thumbnailUrl}
                  alt={w.title}
                  className="w-full h-50 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Up */}
        <div className="overflow-hidden h-120 relative">
          <div className="absolute bottom-0 animate-vertical-up w-full">
            {loopItems.map((w, idx) => (
              <div key={`${w.id}-up-${idx}`} className="mb-2">
                <img
                  src={w.thumbnailUrl}
                  alt={w.title}
                  className="w-full h-50 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 스타일 정의 */}
    </section>
  );
}
