// src/app/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo_e";
import React, { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
  ];

  // 스크롤 위치 추적
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // 아래로 스크롤 중 && 어느 정도 내려갔으면 숨기기
      if (currentY > lastY && currentY > 100) {
        setHidden(true);
      }
      // 위로 스크롤 시 보이기
      else if (currentY < lastY) {
        setHidden(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-black shadow z-50 h-20 transform transition-transform duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 로고 */}
        <Link href="/" className="text-maincolor-500" >
          <Logo className="fill-current" />
        </Link>

        {/* 내비게이션 */}
        <nav>
          <ul className="flex space-x-6 pt-5">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-lg font-light font-bold transition-colors duration-300 cursor-pointer ${isActive ? "text-white" : "text-gray-400 hover:text-white"
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
