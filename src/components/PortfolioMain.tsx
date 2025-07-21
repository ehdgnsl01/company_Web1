// src/components/PortfolioMain.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import type { Portfolio } from "@/models/portfolio";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";

interface PortfolioMainProps {
  items: Portfolio[];
}

export default function PortfolioMain({ items }: PortfolioMainProps) {
  // 무한 루프를 위해 두 번 이어붙임
  const loopItems = [...items, ...items];
  const textRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // 1) 요소의 문서 기준 위치 저장
  const [triggerY, setTriggerY] = useState<number>(0);
  useEffect(() => {
    if (textRef.current) {
      // 요소 최상단이 문서 상단에서 얼마나 떨어져 있는지
      const rect = textRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      setTriggerY(rect.top + scrollTop - window.innerHeight * 0.5);
      // 예: 뷰포트의 30% 지점에 닿으면 트리거
    }
  }, []);

  // 2) 스크롤 리스너에서 비교
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > triggerY) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // 초기 상태 체크
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [triggerY, controls]);

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex items-center text-white px-6 my-20">
      {/* Left Text */}
      <motion.div
        ref={textRef}
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 w-full mb-8 text-center lg:text-left ms-20"
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
      <motion.div
        ref={textRef}
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 w-full grid grid-cols-2 gap-2 me-20"
      >
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
      </motion.div>

      {/* 스타일 정의 */}
    </section>
  );
}
