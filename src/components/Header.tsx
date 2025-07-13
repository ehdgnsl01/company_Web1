"use client";

import Link from "next/link";
import Logo from "./Logo_e";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black shadow z-50 h-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="text-maincolor-500">
          <Logo className="fill-current" />
        </Link>

        {/* 내비게이션 */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-lg text-gray-400 font-bold hover:text-maincolor-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg text-gray-400 hover:text-maincolor-500 font-bold">
                About
              </Link>
            </li>
            <li>
              <Link href="/works" className="text-lg text-gray-400 hover:text-maincolor-500 font-bold">
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-lg text-gray-400 hover:text-maincolor-500 font-bold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header >
  );
}
