// src/app/about/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const sloganVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const quoteVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const processVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const PROCESS_STEPS = [
    {
      img: "/images/process1.jpg",
      title: "1. 발상 & 기획",
      desc: "고객 니즈를 반영한 크리에이티브 콘셉트를 수립합니다.",
    },
    {
      img: "/images/process2.jpg",
      title: "2. 스토리보드 작성",
      desc: "각 장면을 시각화하여 촬영 플랜을 완성합니다.",
    },
    {
      img: "/images/process3.jpg",
      title: "3. 본 촬영",
      desc: "최신 장비와 프로 팀으로 현장 분위기를 살립니다.",
    },
    {
      img: "/images/process4.jpg",
      title: "4. 편집 & 후반작업",
      desc: "색보정, 모션 그래픽, 사운드를 더해 최종 완성합니다.",
    },
  ];

  return (
    <main className="bg-black text-white">
      {/* Hero section with darkened background image */}
      <section
        className="h-[calc(100vh-74px)] relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/team-group.png')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />

        {/* Centered slogan */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          initial="hidden"
          animate="visible"
          variants={sloganVariants}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-4">
            모두의 레퍼런스와 함께,
            <br />
            당신의 이야기를 영상으로 완성합니다
          </h1>
          <p className="text-lg max-w-2xl">
            신뢰와 창의력으로 무장한 우리의 팀이 당신의 메시지를 세상에
            전합니다.
          </p>
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-60 px-16 pb-60">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2
            className="text-4xl font-extrabold text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3, once: false }}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
          >
            Our Process
          </motion.h2>
          <p className="mt-4 text-lg text-gray-300">
            아이디어에서 완성 영상까지, 체계적인 4단계 프로세스로 최고의 결과를
            보장합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              className="relative h-64 overflow-hidden shadow-lg"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: false }}
              variants={processVariants}
            >
              {/* 배경 이미지 */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${step.img}')` }}
              />
              {/* 어두운 오버레이 */}
              <div className="absolute inset-0 bg-black opacity-60" />

              {/* 아이콘 + 텍스트 */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-md text-gray-200">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
