// src/components/About.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-black text-white px-4 my-80">
      <motion.div
        className=" mx-20 flex items-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: false }}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        {/* Left: 제작진 사진 */}
        <div className="w-full">
          <div className="relative w-full h-120 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/team.jpg" // public/images/team.jpg
              alt="제작진"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right: 회사 소개 */}
        <div className="w-full space-y-6">
          <h2 className="text-4xl font-extrabold">About Us</h2>
          <p className="text-lg leading-relaxed">
            모두의 레퍼런스는 기획부터 촬영, 편집까지 모든 과정을 책임지는
            영상 제작 전문 회사입니다.<br />
            최신 장비와 크리에이티브 팀이 함께 협업하여 고객님의 이야기를
            가장 효과적으로 전달합니다.
          </p>
          <p className="text-lg font-semibold">항상 최선을 다하겠습니다.</p>
        </div>
      </motion.div>
    </section>
  );
}
