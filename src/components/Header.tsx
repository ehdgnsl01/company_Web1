"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyVideoCo
        </Link>

        {/* 내비게이션 */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/works" className="text-gray-600 hover:text-gray-900">
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
