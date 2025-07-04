"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

/**
 * 일반 사이트용 헤더를 /admin 경로에서는 숨기는 컴포넌트
 */
export default function SiteHeader() {
  const path = usePathname() || "/";

  // /admin 으로 시작하는 모든 URL에서는 렌더하지 않음
  if (path.startsWith("/admin")) {
    return null;
  }

  return <Header />;
}
