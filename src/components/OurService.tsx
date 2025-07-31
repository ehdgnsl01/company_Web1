// src/components/About.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="pb-20 bg-black text-white mb-80 mt-60">
      <motion.div
        className="flex items-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.1, once: false }}
        variants={variants}
        transition={{ duration: 0.6 }}
      >
        {/* Left: 제작진 사진 */}
        <div className="w-full">
          <div className="relative w-full h-220 overflow-hidden shadow-lg">
            <Image
              src="/images/team.jpg" // public/images/team.jpg
              alt="제작진"
              fill
              style={{ objectFit: "cover" }}
              className="blur-[2px]"
            />
            <div className="relative flex flex-col items-left justify-center h-full">
              <div className="z-10 px-50">
                <div className="pl-5">
                  <h1 className="text-5xl font-bold mb-10">
                    모두의 레퍼런스는 브랜드의 이야기를
                    <br /> 시각적으로 아름답게 전합니다.
                  </h1>
                  <p className="text-3xl uppercase mb-10">
                    All Reference tells the brand's story <br />
                    visually and beautifully.
                  </p>
                  <Link href="/contact">
                    <button className="px-8 py-2 border cursor-pointer hover:scale-105 transition">
                      지금 문의하기
                    </button>
                  </Link>
                </div>
              </div>
              <div className="absolute bg-black opacity-50 h-full w-full" />
              <div className="gradation bg-gradient-to-b from-black absolute w-full top-0 h-36 z-50" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
