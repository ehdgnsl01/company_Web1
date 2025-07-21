// src/components/OurService.tsx
"use client";

import React from "react";

const SERVICES = [
  {
    title: "기업 홍보 영상",
    desc: "기업의 가치를 효과적으로 전달하는 홍보 영상을 제작합니다.",
  },
  {
    title: "제품 소개 영상",
    desc: "제품 특징을 돋보이게 하는 감각적인 소개 영상을 제작합니다.",
  },
  {
    title: "이벤트 영상",
    desc: "행사의 모든 순간을 생생하게 담아내는 이벤트 영상을 제공합니다.",
  },
];

export default function OurService() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="w-full mx-auto flex flex-col lg:flex-row items-start">
        {/* Left Heading */}
        <div className="lg:w-1/3 w-full mb-12 lg:mb-0 ms-20">
          <h2 className="text-5xl font-extrabold">Our Service</h2>
        </div>

        {/* Right List */}
        <div className="lg:w-2/3 w-full rounded-4xl flex flex-col gap-8 bg-gray-500 px-5 pt-5 pb-30 ">
          {SERVICES.map((svc, idx) => (
            <div
              key={svc.title}
              className={`
                bg-gray-300 p-8 rounded-xl shadow-lg w-2/3 
                transition-transform transform hover:scale-105
                ${idx % 2 === 0 ? "self-end" : "self-start"}
              `}
            >
              <h3 className="text-2xl font-bold mb-2 text-black">
                {svc.title}
              </h3>
              <p className="text-black">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
