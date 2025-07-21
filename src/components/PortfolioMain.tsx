// src/components/PortfolioMain.tsx
"use client";

import React from "react";
import type { Portfolio } from "@/models/portfolio";
import Link from "next/link";
import { motion } from "framer-motion";

interface PortfolioMainProps {
  items: Portfolio[];
}

export default function PortfolioMain({ items }: PortfolioMainProps) {
  const loopItems = [...items, ...items];

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex items-center text-white px-6 my-20">
      {/* Left Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={textVariants}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 w-full mb-8 text-center lg:text-left ms-20"
      >
        <h2 className="text-5xl font-bold mb-4">모두의 레퍼런스와 함께</h2>
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        variants={textVariants}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 w-full grid grid-cols-2 gap-2 me-20 h-150"
      >
        {/* Slider Down */}
        <div className="overflow-hidden relative flex justify-center">
          <div className="absolute top-0 animate-vertical-down w-full">
            {loopItems.map((w, idx) => (
              <div key={`${w.id}-down-${idx}`} className="mb-2">
                <img
                  src={w.thumbnailUrl}
                  alt={w.title}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Up */}
        <div className="overflow-hidden relative">
          <div className="absolute bottom-0 animate-vertical-up w-full">
            {loopItems.map((w, idx) => (
              <div key={`${w.id}-up-${idx}`} className="mb-2">
                <img
                  src={w.thumbnailUrl}
                  alt={w.title}
                  className="w-full h-60 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
