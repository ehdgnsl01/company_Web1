// src/app/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo_e";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
  ];

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
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-lg font-bold transition-colors duration-300 cursor-pointer ${isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                      } active:text-maincolor-300`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
