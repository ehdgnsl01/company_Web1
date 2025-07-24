// src/components/Footer.tsx
import React from "react";
import Link from "next/link";
import Logo from "./Logo_e"; // 기존 로고 컴포넌트

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8">
      <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* 로고 */}
        <div className="flex items-center justify-center md:justify-start">
          <Logo className="w-60 h-auto fill-current" />
        </div>

        {/* 연락처 */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-semibold">Contact</p>
          <p>전화: 02-1234-5678</p>
          <p>Email: info@allref.com</p>
        </div>

        {/* 주소 */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-semibold">Address</p>
          <p>서울특별시 강남구 테헤란로 123, 4층</p>
        </div>

        {/* 기업 정보 */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-semibold">Company</p>
          <p>사업자번호: 123-45-67890</p>
          <p>대표: 홍길동</p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        © 2025 모두의 레퍼런스. All rights reserved.
      </div>
    </footer>
  );
}
